import logging
from datetime import datetime, timezone
from typing import Any

import httpx

from app.config import settings
from app.models.order import Order

logger = logging.getLogger(__name__)


def _format_items(items: list[Any]) -> str:
    parts = []
    for item in items:
        if isinstance(item, dict):
            name = item.get("product", {}).get("nameAr", item.get("product_name_ar", "منتج"))
            qty = item.get("tier", {}).get("quantity", item.get("quantity", 1))
            price = item.get("tier", {}).get("price", item.get("price", 0))
            upsell = " (عرض)" if item.get("isUpsell") or item.get("is_upsell") else ""
            parts.append(f"{name} x{qty} = {price} ريال{upsell}")
    return " | ".join(parts)


async def send_to_google_sheet(order: Order) -> bool:
    if not settings.WEBHOOK_SHEET_URL:
        logger.warning("WEBHOOK_SHEET_URL not configured, skipping webhook")
        return False

    payload = {
        "orderId": order.id,
        "fullName": order.full_name,
        "phone": order.phone,
        "city": order.city or "",
        "address": order.address or "",
        "items": _format_items(order.items if isinstance(order.items, list) else []),
        "totalAmount": order.total_amount,
        "acceptedUpsell": order.accepted_upsell,
        "clientIp": order.client_ip or "",
        "createdAt": order.created_at.isoformat() if order.created_at else datetime.now(timezone.utc).isoformat(),
    }

    headers: dict[str, str] = {"Content-Type": "application/json"}
    if settings.SHEETS_WEBHOOK_SECRET:
        headers["X-Webhook-Secret"] = settings.SHEETS_WEBHOOK_SECRET

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(settings.WEBHOOK_SHEET_URL, json=payload, headers=headers)
            if response.status_code == 200:
                logger.info(f"Webhook sent successfully for order {order.id}")
                return True
            else:
                logger.error(f"Webhook failed with status {response.status_code}: {response.text}")
                return False
    except httpx.TimeoutException:
        logger.error(f"Webhook timed out for order {order.id}")
        return False
    except Exception as e:
        logger.error(f"Webhook error for order {order.id}: {e}")
        return False
