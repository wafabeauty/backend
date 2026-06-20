import hashlib
import hmac
import json
import logging
import time
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from sqlalchemy import func, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.click import Click
from app.models.order import Order
from app.services.geoip import check_order_allowed

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/admin", tags=["admin"])
security = HTTPBearer()

KSA_TZ = timezone(timedelta(hours=3))

# ─── Simple JWT (no dependency) ────────────────────────────────────────────────

def _make_token(username: str) -> str:
    exp = int(time.time()) + 86400  # 24h
    payload = json.dumps({"sub": username, "exp": exp})
    sig = hmac.new(
        settings.ADMIN_JWT_SECRET.encode(),
        payload.encode(),
        hashlib.sha256,
    ).hexdigest()
    import base64
    b64 = base64.urlsafe_b64encode(payload.encode()).decode()
    return f"{b64}.{sig}"


def _verify_token(token: str) -> str:
    import base64
    try:
        b64, sig = token.rsplit(".", 1)
        payload = base64.urlsafe_b64decode(b64 + "==").decode()
        expected = hmac.new(
            settings.ADMIN_JWT_SECRET.encode(),
            payload.encode(),
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(sig, expected):
            raise ValueError("bad signature")
        data = json.loads(payload)
        if data["exp"] < time.time():
            raise ValueError("expired")
        return data["sub"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


def _require_admin(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    return _verify_token(credentials.credentials)


def _get_client_ip(request: Request) -> str:
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else ""


# ─── Auth ──────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login(payload: LoginRequest) -> dict:
    if (
        payload.username != settings.ADMIN_USERNAME
        or payload.password != settings.ADMIN_PASSWORD
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": _make_token(payload.username), "username": payload.username}


# ─── Click tracking ────────────────────────────────────────────────────────────

class ClickRequest(BaseModel):
    product_slug: Optional[str] = None
    user_agent: Optional[str] = None


@router.post("/clicks", status_code=201)
async def track_click(
    payload: ClickRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> dict:
    ip = _get_client_ip(request)
    geo = await check_order_allowed(ip=ip, phone="")

    is_valid = geo.country == "SA" and not (geo.reason in ("not_ksa", "suspicious_ip"))
    is_vpn = geo.reason == "suspicious_ip"

    # Always allow private IPs / dev (count as valid)
    if geo.reason in ("private_ip", "geoip_disabled", "maxmind_not_configured",
                      "maxmind_error", "maxmind_timeout", "error", "whitelisted"):
        is_valid = True
        is_vpn = False

    click = Click(
        id=str(uuid.uuid4()),
        product_slug=payload.product_slug,
        ip=ip,
        country_code=geo.country or "",
        is_vpn=is_vpn,
        is_valid=is_valid,
        user_agent=payload.user_agent,
    )
    db.add(click)
    await db.commit()

    return {"recorded": True, "valid": is_valid}


# ─── Metrics ───────────────────────────────────────────────────────────────────

def _parse_date(date_str: Optional[str]) -> Optional[datetime]:
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str).replace(tzinfo=timezone.utc)
    except Exception:
        return None


@router.get("/metrics")
async def get_metrics(
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(_require_admin),
) -> dict:
    now = datetime.now(timezone.utc)
    date_from = _parse_date(from_date) or (now - timedelta(days=30))
    date_to = _parse_date(to_date) or now

    # ── Totals ──────────────────────────────────────────────────────────────
    clicks_q = await db.execute(
        text(
            "SELECT COUNT(*) FROM clicks "
            "WHERE is_valid = true AND created_at >= :f AND created_at <= :t"
        ),
        {"f": date_from, "t": date_to},
    )
    total_clicks = clicks_q.scalar() or 0

    orders_q = await db.execute(
        text(
            "SELECT COUNT(*), COALESCE(SUM(total_amount), 0) "
            "FROM orders WHERE created_at >= :f AND created_at <= :t"
        ),
        {"f": date_from, "t": date_to},
    )
    orders_row = orders_q.one()
    total_orders = orders_row[0] or 0
    total_revenue = float(orders_row[1] or 0)

    upsell_q = await db.execute(
        text(
            "SELECT COUNT(*) FROM orders "
            "WHERE accepted_upsell = true AND created_at >= :f AND created_at <= :t"
        ),
        {"f": date_from, "t": date_to},
    )
    upsells = upsell_q.scalar() or 0

    conversion_rate = round((total_orders / total_clicks * 100), 2) if total_clicks > 0 else 0.0
    avg_order_value = round(total_revenue / total_orders, 2) if total_orders > 0 else 0.0
    upsell_rate = round((upsells / total_orders * 100), 2) if total_orders > 0 else 0.0

    # ── Daily breakdown (clicks + orders) ───────────────────────────────────
    daily_clicks_q = await db.execute(
        text(
            "SELECT DATE(created_at AT TIME ZONE 'Asia/Riyadh') as day, COUNT(*) "
            "FROM clicks WHERE is_valid = true AND created_at >= :f AND created_at <= :t "
            "GROUP BY day ORDER BY day"
        ),
        {"f": date_from, "t": date_to},
    )
    daily_orders_q = await db.execute(
        text(
            "SELECT DATE(created_at AT TIME ZONE 'Asia/Riyadh') as day, COUNT(*), COALESCE(SUM(total_amount),0) "
            "FROM orders WHERE created_at >= :f AND created_at <= :t "
            "GROUP BY day ORDER BY day"
        ),
        {"f": date_from, "t": date_to},
    )

    clicks_by_day = {str(r[0]): int(r[1]) for r in daily_clicks_q}
    orders_by_day = {}
    revenue_by_day = {}
    for r in daily_orders_q:
        orders_by_day[str(r[0])] = int(r[1])
        revenue_by_day[str(r[0])] = float(r[2])

    # ── Top products ─────────────────────────────────────────────────────────
    clicks_by_product_q = await db.execute(
        text(
            "SELECT product_slug, COUNT(*) FROM clicks "
            "WHERE is_valid = true AND product_slug IS NOT NULL "
            "AND created_at >= :f AND created_at <= :t "
            "GROUP BY product_slug ORDER BY COUNT(*) DESC LIMIT 10"
        ),
        {"f": date_from, "t": date_to},
    )
    top_products = [{"slug": r[0], "clicks": int(r[1])} for r in clicks_by_product_q]

    return {
        "total_clicks": total_clicks,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "avg_order_value": avg_order_value,
        "conversion_rate": conversion_rate,
        "upsell_rate": upsell_rate,
        "upsells_accepted": upsells,
        "clicks_by_day": clicks_by_day,
        "orders_by_day": orders_by_day,
        "revenue_by_day": revenue_by_day,
        "top_products": top_products,
        "date_from": date_from.isoformat(),
        "date_to": date_to.isoformat(),
    }


# ─── Orders ────────────────────────────────────────────────────────────────────

@router.get("/orders")
async def get_orders(
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    page: int = 1,
    limit: int = 25,
    db: AsyncSession = Depends(get_db),
    _: str = Depends(_require_admin),
) -> dict:
    now = datetime.now(timezone.utc)
    date_from = _parse_date(from_date) or (now - timedelta(days=30))
    date_to = _parse_date(to_date) or now
    offset = (page - 1) * limit

    count_q = await db.execute(
        text("SELECT COUNT(*) FROM orders WHERE created_at >= :f AND created_at <= :t"),
        {"f": date_from, "t": date_to},
    )
    total = count_q.scalar() or 0

    rows_q = await db.execute(
        text(
            "SELECT id, full_name, phone, city, address, items, total_amount, "
            "accepted_upsell, upsell_product_id, webhook_sent, created_at "
            "FROM orders WHERE created_at >= :f AND created_at <= :t "
            "ORDER BY created_at DESC LIMIT :lim OFFSET :off"
        ),
        {"f": date_from, "t": date_to, "lim": limit, "off": offset},
    )

    orders = []
    for r in rows_q:
        ksa_time = r[10].astimezone(KSA_TZ) if r[10] else None
        orders.append({
            "id": r[0],
            "order_id_short": r[0][:8].upper(),
            "full_name": r[1],
            "phone": r[2],
            "city": r[3] or "",
            "address": r[4] or "",
            "items": r[5],
            "total_amount": r[6],
            "accepted_upsell": r[7],
            "upsell_product_id": r[8],
            "webhook_sent": r[9],
            "created_at": ksa_time.isoformat() if ksa_time else "",
        })

    return {
        "orders": orders,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit,
    }
