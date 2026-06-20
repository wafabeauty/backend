import base64
import hashlib
import hmac
import json
import time
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.click import Click
from app.services.geoip import check_order_allowed

router = APIRouter(prefix="/api/admin", tags=["admin"])
security = HTTPBearer()
KSA_TZ = timezone(timedelta(hours=3))


class LoginRequest(BaseModel):
    username: str
    password: str


class ClickRequest(BaseModel):
    product_slug: Optional[str] = None
    user_agent: Optional[str] = None


def _make_token(username: str) -> str:
    payload = json.dumps({"sub": username, "exp": int(time.time()) + 86400})
    signature = hmac.new(
        settings.ADMIN_JWT_SECRET.encode(),
        payload.encode(),
        hashlib.sha256,
    ).hexdigest()
    token_payload = base64.urlsafe_b64encode(payload.encode()).decode()
    return f"{token_payload}.{signature}"


def _verify_token(token: str) -> str:
    try:
        token_payload, signature = token.rsplit(".", 1)
        payload = base64.urlsafe_b64decode(token_payload + "==").decode()
        expected = hmac.new(
            settings.ADMIN_JWT_SECRET.encode(),
            payload.encode(),
            hashlib.sha256,
        ).hexdigest()
        if not hmac.compare_digest(signature, expected):
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


def _parse_date(date_str: Optional[str]) -> Optional[datetime]:
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str).replace(tzinfo=timezone.utc)
    except Exception:
        return None


@router.post("/login")
async def login(payload: LoginRequest) -> dict:
    if (
        payload.username != settings.ADMIN_USERNAME
        or payload.password != settings.ADMIN_PASSWORD
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": _make_token(payload.username), "username": payload.username}


@router.post("/clicks", status_code=201)
async def track_click(
    payload: ClickRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> dict:
    ip = _get_client_ip(request)
    geo = await check_order_allowed(ip=ip, phone="")

    is_valid = geo.country == "SA" and geo.reason not in ("not_ksa", "suspicious_ip")
    is_vpn = geo.reason == "suspicious_ip"

    if geo.reason in (
        "private_ip",
        "geoip_disabled",
        "maxmind_not_configured",
        "maxmind_error",
        "maxmind_timeout",
        "error",
        "whitelisted",
    ):
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

    orders_by_day = {}
    revenue_by_day = {}
    for row in daily_orders_q:
        orders_by_day[str(row[0])] = int(row[1])
        revenue_by_day[str(row[0])] = float(row[2])

    top_products_q = await db.execute(
        text(
            "SELECT product_slug, COUNT(*) FROM clicks "
            "WHERE is_valid = true AND product_slug IS NOT NULL "
            "AND created_at >= :f AND created_at <= :t "
            "GROUP BY product_slug ORDER BY COUNT(*) DESC LIMIT 10"
        ),
        {"f": date_from, "t": date_to},
    )

    return {
        "total_clicks": total_clicks,
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "avg_order_value": round(total_revenue / total_orders, 2) if total_orders else 0.0,
        "conversion_rate": round(total_orders / total_clicks * 100, 2) if total_clicks else 0.0,
        "upsell_rate": round(upsells / total_orders * 100, 2) if total_orders else 0.0,
        "upsells_accepted": upsells,
        "clicks_by_day": {str(row[0]): int(row[1]) for row in daily_clicks_q},
        "orders_by_day": orders_by_day,
        "revenue_by_day": revenue_by_day,
        "top_products": [{"slug": row[0], "clicks": int(row[1])} for row in top_products_q],
        "date_from": date_from.isoformat(),
        "date_to": date_to.isoformat(),
    }


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
    for row in rows_q:
        ksa_time = row[10].astimezone(KSA_TZ) if row[10] else None
        orders.append(
            {
                "id": row[0],
                "order_id_short": row[0][:8].upper(),
                "full_name": row[1],
                "phone": row[2],
                "city": row[3] or "",
                "address": row[4] or "",
                "items": row[5],
                "total_amount": row[6],
                "accepted_upsell": row[7],
                "upsell_product_id": row[8],
                "webhook_sent": row[9],
                "created_at": ksa_time.isoformat() if ksa_time else "",
            }
        )

    return {
        "orders": orders,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit,
    }
