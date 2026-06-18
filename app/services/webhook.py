import logging
from datetime import datetime, timezone, timedelta
from typing import Any

import httpx

from app.config import settings
from app.models.order import Order

logger = logging.getLogger(__name__)

KSA_TZ = timezone(timedelta(hours=3))


def _extract_sheet_fields(items: list[Any]) -> tuple[str, str, int]:
    """Return (product_names, skus, total_quantity) from order items list."""
    names, skus, total_qty = [], [], 0
    for item in items:
        if not isinstance(item, dict):
            continue
        product = item.get("product", {})
        tier = item.get("tier", {})
        upsell = " (عرض)" if item.get("isUpsell") or item.get("is_upsell") else ""
        name = product.get("nameAr") or product.get("nameEn") or "منتج"
        sku = product.get("sku") or product.get("id") or product.get("slug") or "—"
        qty = tier.get("quantity") or item.get("quantity") or 1
        names.append(f"{name}{upsell}")
        skus.append(sku)
        total_qty += int(qty)
    return " | ".join(names) or "—", " | ".join(skus) or "—", total_qty


async def send_to_google_sheet(order: Order) -> bool:
    if not settings.WEBHOOK_SHEET_URL:
        logger.warning("WEBHOOK_SHEET_URL not configured, skipping webhook")
        return False

    items_list = order.items if isinstance(order.items, list) else []
    products, skus, total_qty = _extract_sheet_fields(items_list)

    created = order.created_at or datetime.now(timezone.utc)
    ksa_time = created.astimezone(KSA_TZ)
    date_str = ksa_time.strftime("%Y-%m-%d %H:%M")

    payload = {
        "date": date_str,
        "orderId": order.id[:8].upper(),
        "address": order.city or order.address or "—",
        "name": order.full_name,
        "phone": order.phone,
        "product": products,
        "sku": skus,
        "quantity": total_qty,
        "totalPrice": order.total_amount,
        "currency": "SAR",
        "status": "جديد",
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
