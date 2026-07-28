import logging
import re
from datetime import datetime, timezone, timedelta
from typing import Any

import httpx

from app.config import settings
from app.models.order import Order

logger = logging.getLogger(__name__)

KSA_TZ = timezone(timedelta(hours=3))

SKU_ALIASES = {
    "WF-DSC-3192": "WF-BE",
    "dark-spot-corrector-cream": "WF-BE",
    "WF-RBS-5913": "WF-RB",
    "razor-bump-serum": "WF-RB",
    "WF-CGG-8374": "WF-CG",
    "collagen-glow-gummies": "WF-CG",
}

# CODToop product IDs from seller dashboard
FULFILLMENT_PRODUCT_IDS = {
    "WF-BE": "CTNSPOCXNR",
    "WF-RB": "CTNSPJXUC0",
    "WF-CG": "CTNSP5SYSQ",
}

PRODUCT_NAMES = {
    "WF-BE": "Wafa Beauty Brightening Advanced Body Essence Lotion",
    "WF-RB": "Wafa Beauty Ingrown Hair & Razor Bump Serum",
    "WF-CG": "Wafa Beauty Collagen Glow Gummies",
}


def _clean_store_sku(raw_sku: str) -> str:
    return SKU_ALIASES.get(raw_sku, raw_sku)


def _pick_first_value(*values: Any) -> Any:
    for value in values:
        if value not in (None, ""):
            return value
    return ""


def _split_name(full_name: str) -> tuple[str, str]:
    parts = [p for p in str(full_name or "").strip().split() if p]
    if not parts:
        return "Customer", "Wafa"
    if len(parts) == 1:
        return parts[0], parts[0]
    return parts[0], " ".join(parts[1:])


def _normalize_phone_e164(phone: str) -> str:
    digits = re.sub(r"\D", "", str(phone or ""))
    if digits.startswith("05") and len(digits) == 10:
        return f"+966{digits[1:]}"
    if digits.startswith("5") and len(digits) == 9:
        return f"+966{digits}"
    if digits.startswith("966"):
        return f"+{digits}"
    if digits.startswith("00966"):
        return f"+{digits[2:]}"
    if str(phone or "").startswith("+"):
        return str(phone).strip()
    return str(phone or "").strip()


def _parse_city_and_address(order: Order) -> tuple[str, str]:
    raw_address = (order.address or "").strip()
    city = (order.city or "").strip()

    if " - " in raw_address:
        left, right = raw_address.split(" - ", 1)
        if not city:
            city = left.strip()
        address_1 = right.strip() or raw_address
    else:
        address_1 = raw_address

    if not city:
        city = "Saudi Arabia"
    if not address_1:
        address_1 = city

    return city, address_1


def _extract_line_items(items: list[Any]) -> list[dict[str, Any]]:
    """Build CODToop line_items using CODToop product SKUs."""
    merged: dict[str, int] = {}

    for item in items:
        if not isinstance(item, dict):
            continue
        product = item.get("product", {}) if isinstance(item.get("product"), dict) else {}
        tier = item.get("tier", {}) if isinstance(item.get("tier"), dict) else {}
        raw_sku = _pick_first_value(
            product.get("sku"),
            product.get("id"),
            product.get("slug"),
            item.get("sku"),
            item.get("productId"),
            item.get("product_id"),
            item.get("slug"),
        )
        store_sku = _clean_store_sku(str(raw_sku))
        codtoop_sku = FULFILLMENT_PRODUCT_IDS.get(store_sku)
        if not codtoop_sku:
            logger.warning(f"No CODToop SKU mapping for store SKU: {store_sku}")
            continue
        qty = int(_pick_first_value(tier.get("quantity"), item.get("quantity"), 1) or 1)
        merged[codtoop_sku] = merged.get(codtoop_sku, 0) + qty

    return [{"sku": sku, "quantity": qty} for sku, qty in merged.items()]


def _extract_sheet_fields(items: list[Any]) -> dict[str, Any]:
    """Return fulfillment-friendly product fields from order items list."""
    names, skus, fulfillment_ids, unit_prices = [], [], [], []
    total_qty = 0

    for item in items:
        if not isinstance(item, dict):
            continue
        product = item.get("product", {}) if isinstance(item.get("product"), dict) else {}
        tier = item.get("tier", {}) if isinstance(item.get("tier"), dict) else {}
        upsell = " (عرض)" if item.get("isUpsell") or item.get("is_upsell") else ""
        raw_sku = _pick_first_value(
            product.get("sku"),
            product.get("id"),
            product.get("slug"),
            item.get("sku"),
            item.get("productId"),
            item.get("product_id"),
            item.get("slug"),
        )
        sku = _clean_store_sku(str(raw_sku))
        name = _pick_first_value(
            product.get("nameAr"),
            product.get("nameEn"),
            product.get("name"),
            item.get("nameAr"),
            item.get("nameEn"),
            item.get("name"),
            item.get("productName"),
            PRODUCT_NAMES.get(sku),
            "منتج",
        )
        qty = _pick_first_value(tier.get("quantity"), item.get("quantity"), 1)
        price = _pick_first_value(tier.get("price"), product.get("price"), item.get("price"))
        names.append(f"{name}{upsell}")
        skus.append(sku)
        fulfillment_ids.append(FULFILLMENT_PRODUCT_IDS.get(sku, "ADD_FULFILLMENT_ID_HERE"))
        unit_prices.append(str(price))
        total_qty += int(qty or 1)

    return {
        "product_name": " | ".join(names) or "—",
        "store_sku": " | ".join(skus) or "—",
        "fulfillment_product_id": " | ".join(fulfillment_ids) or "—",
        "quantity": total_qty,
        "unit_price": " | ".join(unit_prices) or "—",
    }


async def send_to_codtoop(order: Order) -> bool:
    """Send final order to CODToop General API."""
    if not settings.ENABLE_CODTOOP_API:
        logger.info("CODToop API disabled, skipping")
        return False

    if not settings.CODTOOP_WEBHOOK_URL:
        logger.warning("CODTOOP_WEBHOOK_URL not configured, skipping CODToop")
        return False

    items_list = order.items if isinstance(order.items, list) else []
    line_items = _extract_line_items(items_list)
    if not line_items:
        logger.error(f"CODToop skipped for order {order.id}: no mapped line items")
        return False

    first_name, last_name = _split_name(order.full_name)
    city, address_1 = _parse_city_and_address(order)

    payload = {
        "line_items": line_items,
        "shipping": {
            "first_name": first_name,
            "last_name": last_name,
            "phone": _normalize_phone_e164(order.phone),
            "city": city,
            "state": city,
            "address_1": address_1,
            "address_2": "",
            "country": "SA",
        },
        "total": float(order.total_amount or 0),
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                settings.CODTOOP_WEBHOOK_URL,
                json=payload,
                headers={"Content-Type": "application/json"},
            )
            if response.status_code == 200:
                logger.info(f"CODToop order sent successfully for {order.id}: {response.text}")
                return True
            logger.error(
                f"CODToop failed for order {order.id} with status {response.status_code}: {response.text}"
            )
            return False
    except httpx.TimeoutException:
        logger.error(f"CODToop timed out for order {order.id}")
        return False
    except Exception as e:
        logger.error(f"CODToop error for order {order.id}: {e}")
        return False


async def send_to_google_sheet(order: Order) -> bool:
    if not settings.WEBHOOK_SHEET_URL:
        logger.warning("WEBHOOK_SHEET_URL not configured, skipping webhook")
        return False

    items_list = order.items if isinstance(order.items, list) else []
    product_fields = _extract_sheet_fields(items_list)
    city, address_1 = _parse_city_and_address(order)

    created = order.created_at or datetime.now(timezone.utc)
    ksa_time = created.astimezone(KSA_TZ)
    date_str = ksa_time.strftime("%Y-%m-%d %H:%M")

    payload = {
        "orderId": order.id[:8].upper(),
        "createdAt": date_str,
        "customerName": order.full_name,
        "phone": order.phone,
        "country": "Saudi Arabia",
        "city": city if city != "Saudi Arabia" else (order.city or ""),
        "address": address_1 or order.address or "",
        "productName": product_fields["product_name"],
        "storeSku": product_fields["store_sku"],
        "fulfillmentProductId": product_fields["fulfillment_product_id"],
        "quantity": product_fields["quantity"],
        "unitPrice": product_fields["unit_price"],
        "totalCodAmount": order.total_amount,
        "currency": "SAR",
        "paymentMethod": "COD",
        "orderStatus": "New",
        "confirmationStatus": "Pending Call",
        "confirmationAttempts": 0,
        "confirmedAt": "",
        "fulfillmentCompany": "CODToop",
        "readyToShip": "No",
        "shippingStatus": "Not Shipped",
        "trackingNumber": "",
        "codRemittanceStatus": "Not Collected",
        "source": "Website",
        "campaign": "",
        "notes": "Upsell accepted" if order.accepted_upsell else "",
    }
    if settings.SHEETS_WEBHOOK_SECRET:
        payload["secret"] = settings.SHEETS_WEBHOOK_SECRET

    headers: dict[str, str] = {"Content-Type": "application/json"}
    if settings.SHEETS_WEBHOOK_SECRET:
        headers["X-Webhook-Secret"] = settings.SHEETS_WEBHOOK_SECRET

    try:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
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
