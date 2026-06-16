import base64
import logging
from dataclasses import dataclass

import httpx

from app.config import settings

logger = logging.getLogger(__name__)

PRIVATE_IP_PREFIXES = ("127.", "::1", "192.168.", "10.", "172.16.", "172.17.",
                       "172.18.", "172.19.", "172.20.", "172.21.", "172.22.",
                       "172.23.", "172.24.", "172.25.", "172.26.", "172.27.",
                       "172.28.", "172.29.", "172.30.", "172.31.")


@dataclass
class GeoIPResult:
    allowed: bool
    reason: str = "ok"
    country: str = ""
    message: str = ""


def _is_private_ip(ip: str) -> bool:
    return any(ip.startswith(prefix) for prefix in PRIVATE_IP_PREFIXES)


def _is_whitelisted_phone(phone: str) -> bool:
    normalized = phone.strip().replace(" ", "").replace("+", "")
    for whitelisted in settings.geoip_whitelisted_phones_list:
        if normalized.endswith(whitelisted.replace("+", "").replace(" ", "")):
            return True
    return False


async def check_order_allowed(ip: str, phone: str = "") -> GeoIPResult:
    """
    Returns GeoIPResult(allowed=True) if the order should be accepted.
    Blocks:
      - Non-KSA IPs (country != SA)
      - VPN / proxy / Tor / hosting IPs
    Always allows:
      - Whitelisted phone numbers (for testing)
      - Private / local IPs (dev environment)
      - When MaxMind is not configured (fail open)
    """
    # Phone whitelist bypass
    if phone and _is_whitelisted_phone(phone):
        logger.info(f"GeoIP: whitelisted phone {phone[-4:]}**** — order allowed")
        return GeoIPResult(allowed=True, reason="whitelisted")

    # Skip GeoIP if disabled
    if not settings.ENABLE_GEOIP:
        return GeoIPResult(allowed=True, reason="geoip_disabled")

    # Allow private/local IPs (dev / docker internal)
    if not ip or _is_private_ip(ip):
        return GeoIPResult(allowed=True, reason="private_ip")

    # Fail open if MaxMind not configured
    if not settings.MAXMIND_ACCOUNT_ID or not settings.MAXMIND_LICENSE_KEY:
        logger.warning("MaxMind not configured — GeoIP check skipped, allowing order")
        return GeoIPResult(allowed=True, reason="maxmind_not_configured")

    credentials = base64.b64encode(
        f"{settings.MAXMIND_ACCOUNT_ID}:{settings.MAXMIND_LICENSE_KEY}".encode()
    ).decode()

    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            response = await client.get(
                f"https://geoip.maxmind.com/geoip/v2.1/insights/{ip}",
                headers={"Authorization": f"Basic {credentials}", "Accept": "application/json"},
            )

        if response.status_code != 200:
            logger.error(f"MaxMind API error {response.status_code} for IP {ip} — failing open")
            return GeoIPResult(allowed=True, reason="maxmind_error")

        data = response.json()
        country = data.get("country", {}).get("iso_code", "")
        traits = data.get("traits", {})

        is_suspicious = (
            traits.get("is_anonymous") is True
            or traits.get("is_anonymous_vpn") is True
            or traits.get("is_tor_exit_node") is True
            or traits.get("is_public_proxy") is True
            or traits.get("is_hosting_provider") is True
        )

        if country != "SA":
            logger.warning(f"GeoIP: blocked order from {country} ({ip})")
            return GeoIPResult(
                allowed=False,
                reason="not_ksa",
                country=country,
                message="عذراً، الطلبات متاحة فقط داخل المملكة العربية السعودية",
            )

        if is_suspicious:
            logger.warning(f"GeoIP: blocked suspicious IP {ip} (VPN/proxy/Tor)")
            return GeoIPResult(
                allowed=False,
                reason="suspicious_ip",
                country=country,
                message="تعذّر التحقق من موقعك. يرجى إيقاف تشغيل VPN والمحاولة مرة أخرى",
            )

        logger.info(f"GeoIP: allowed order from SA ({ip})")
        return GeoIPResult(allowed=True, reason="ok", country=country)

    except httpx.TimeoutException:
        logger.error(f"MaxMind timeout for IP {ip} — failing open")
        return GeoIPResult(allowed=True, reason="maxmind_timeout")
    except Exception as e:
        logger.error(f"GeoIP unexpected error for IP {ip}: {e} — failing open")
        return GeoIPResult(allowed=True, reason="error")
