import asyncio
import logging
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.order import Order
from app.schemas.order import CreateOrderRequest, UpsellUpdateRequest, OrderResponse
from app.services.webhook import send_to_google_sheet
from app.services.capi import fire_all_capi
from app.services.geoip import check_order_allowed

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/orders", tags=["orders"])


def _get_client_ip(request: Request) -> Optional[str]:
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host if request.client else None


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
async def create_order(
    payload: CreateOrderRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> OrderResponse:
    order_id = str(uuid.uuid4())
    client_ip = _get_client_ip(request)

    # GeoIP validation — block non-KSA and suspicious/VPN IPs
    geo = await check_order_allowed(ip=payload.clientIp or client_ip or "", phone=payload.phone)
    if not geo.allowed:
        raise HTTPException(status_code=403, detail=geo.message or "الطلب غير مسموح به من موقعك الحالي")

    order = Order(
        id=order_id,
        full_name=payload.fullName,
        phone=payload.phone,
        address=payload.address,
        items=payload.items,
        total_amount=payload.totalAmount,
        event_id=payload.eventId,
        client_ip=payload.clientIp or client_ip,
        user_agent=payload.userAgent,
        accepted_upsell=False,
    )

    db.add(order)
    await db.commit()
    await db.refresh(order)

    # Fire webhook + CAPI in background so they don't block the response
    asyncio.create_task(_post_order_tasks(order))

    return OrderResponse(
        orderId=order_id,
        success=True,
        message="تم استلام طلبك بنجاح",
    )


@router.patch("/{order_id}/upsell", status_code=status.HTTP_200_OK)
async def update_upsell(
    order_id: str,
    payload: UpsellUpdateRequest,
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = await db.execute(select(Order).where(Order.id == order_id))
    order = result.scalar_one_or_none()

    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    order.accepted_upsell = payload.accepted
    if payload.accepted:
        order.total_amount = order.total_amount + 99

    await db.commit()
    await db.refresh(order)

    # Re-fire webhook with updated total
    asyncio.create_task(send_to_google_sheet(order))

    return {"success": True, "accepted": payload.accepted}


async def _post_order_tasks(order: Order) -> None:
    """Run webhook and CAPI calls asynchronously after order creation."""
    webhook_ok = await send_to_google_sheet(order)
    if webhook_ok:
        from sqlalchemy.ext.asyncio import AsyncSession
        from app.database import AsyncSessionLocal

        async with AsyncSessionLocal() as db:
            result = await db.execute(select(Order).where(Order.id == order.id))
            fresh = result.scalar_one_or_none()
            if fresh:
                fresh.webhook_sent = True
                await db.commit()

    await fire_all_capi(order, order.event_id)

    from app.database import AsyncSessionLocal

    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Order).where(Order.id == order.id))
        fresh = result.scalar_one_or_none()
        if fresh:
            fresh.capi_sent = True
            await db.commit()
