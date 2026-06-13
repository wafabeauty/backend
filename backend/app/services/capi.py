import asyncio
import hashlib
import logging
import time

import httpx

from app.config import settings
from app.models.order import Order

logger = logging.getLogger(__name__)


def _sha256(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


def _normalize_phone_ksa(phone: str) -> str:
    """Convert 05XXXXXXXX → 9665XXXXXXXX (no + prefix, for FB & Snap)."""
    phone = phone.strip().lstrip("+")
    if phone.startswith("05"):
        phone = "966" + phone[1:]
    elif phone.startswith("5") and len(phone) == 9:
        phone = "966" + phone
    return phone


def _normalize_phone_e164(phone: str) -> str:
    """Convert 05XXXXXXXX → +9665XXXXXXXX (with + prefix, for TikTok)."""
    return "+" + _normalize_phone_ksa(phone)


async def send_fb_capi(order: Order, event_id: str) -> bool:
    if not settings.ENABLE_FB_CAPI:
        logger.info("Facebook CAPI disabled via ENABLE_FB_CAPI=false, skipping")
        return False
    if not settings.FB_ACCESS_TOKEN or not settings.FB_PIXEL_ID:
        logger.warning("Facebook CAPI not configured, skipping")
        return False

    hashed_phone = _sha256(_normalize_phone_ksa(order.phone))
    hashed_name = _sha256(order.full_name)

    payload = {
        "data": [
            {
                "event_name": "Purchase",
                "event_time": int(time.time()),
                "event_id": event_id,
                "action_source": "website",
                "user_data": {
                    "ph": [hashed_phone],
                    "fn": [hashed_name],
                    "client_ip_address": order.client_ip,
                    "client_user_agent": order.user_agent,
                },
                "custom_data": {
                    "currency": "SAR",
                    "value": order.total_amount,
                    "content_type": "product",
                },
            }
        ]
    }

    url = f"https://graph.facebook.com/{settings.FB_API_VERSION}/{settings.FB_PIXEL_ID}/events"
    params = {"access_token": settings.FB_ACCESS_TOKEN}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload, params=params)
            if response.status_code == 200:
                logger.info(f"FB CAPI sent for order {order.id}")
                return True
            else:
                logger.error(f"FB CAPI failed: {response.status_code} {response.text}")
                return False
    except Exception as e:
        logger.error(f"FB CAPI error: {e}")
        return False


async def send_tiktok_capi(order: Order, event_id: str) -> bool:
    if not settings.ENABLE_TIKTOK_CAPI:
        logger.info("TikTok CAPI disabled via ENABLE_TIKTOK_CAPI=false, skipping")
        return False
    if not settings.TIKTOK_ACCESS_TOKEN or not settings.TIKTOK_PIXEL_ID:
        logger.warning("TikTok CAPI not configured, skipping")
        return False

    hashed_phone = _sha256(_normalize_phone_e164(order.phone))
    hashed_name = _sha256(order.full_name)

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_ID,
        "event": "CompletePayment",
        "event_id": event_id,
        "timestamp": int(time.time()),
        "context": {
            "user": {
                "phone_number": hashed_phone,
                "name": hashed_name,
                "ip": order.client_ip,
                "user_agent": order.user_agent,
            }
        },
        "properties": {
            "currency": "SAR",
            "value": order.total_amount,
        },
    }

    url = f"https://business-api.tiktok.com/open_api/{settings.TIKTOK_API_VERSION}/pixel/track/"
    headers = {"Access-Token": settings.TIKTOK_ACCESS_TOKEN}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                logger.info(f"TikTok CAPI sent for order {order.id}")
                return True
            else:
                logger.error(f"TikTok CAPI failed: {response.status_code} {response.text}")
                return False
    except Exception as e:
        logger.error(f"TikTok CAPI error: {e}")
        return False


async def send_snap_capi(order: Order, event_id: str) -> bool:
    if not settings.ENABLE_SNAP_CAPI:
        logger.info("Snapchat CAPI disabled via ENABLE_SNAP_CAPI=false, skipping")
        return False
    if not settings.SNAP_ACCESS_TOKEN or not settings.SNAP_PIXEL_ID:
        logger.warning("Snapchat CAPI not configured, skipping")
        return False

    hashed_phone = _sha256(_normalize_phone_ksa(order.phone))
    hashed_name = _sha256(order.full_name)

    payload = {
        "pixel_id": settings.SNAP_PIXEL_ID,
        "test_event_code": "",
        "data": [
            {
                "event_name": "PURCHASE",
                "event_time": int(time.time()),
                "event_source_url": "https://wafabeauty.shop",
                "client_dedup_id": event_id,
                "user_data": {
                    "ph": hashed_phone,
                    "fn": hashed_name,
                    "client_ip_address": order.client_ip,
                    "client_user_agent": order.user_agent,
                },
                "custom_data": {
                    "currency": "SAR",
                    "price": str(order.total_amount),
                    "transaction_id": event_id,
                },
            }
        ],
    }

    url = "https://tr.snapchat.com/v2/conversion"
    headers = {"Authorization": f"Bearer {settings.SNAP_ACCESS_TOKEN}"}

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload, headers=headers)
            if response.status_code == 200:
                logger.info(f"Snap CAPI sent for order {order.id}")
                return True
            else:
                logger.error(f"Snap CAPI failed: {response.status_code} {response.text}")
                return False
    except Exception as e:
        logger.error(f"Snap CAPI error: {e}")
        return False


async def fire_all_capi(order: Order, event_id: str) -> None:
    """Fire all enabled CAPI events concurrently. Errors are swallowed — never block the response."""
    results = await asyncio.gather(
        send_fb_capi(order, event_id),
        send_tiktok_capi(order, event_id),
        send_snap_capi(order, event_id),
        return_exceptions=True,
    )
    logger.info(f"CAPI results for order {order.id}: FB={results[0]}, TikTok={results[1]}, Snap={results[2]}")
