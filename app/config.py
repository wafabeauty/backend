from typing import List

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── Database ──────────────────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+asyncpg://wafabeauty:wafabeauty@wafabeauty_database:5432/wafabeauty"

    # ── CORS ──────────────────────────────────────────────────────────────────
    # Comma-separated list of allowed origins
    CORS_ORIGINS: str = "https://wafabeauty.shop,https://www.wafabeauty.shop,http://localhost:3000,http://frontend:3000"

    @property
    def cors_origins_list(self) -> List[str]:
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

    # ── Google Sheets Webhook ─────────────────────────────────────────────────
    WEBHOOK_SHEET_URL: str = ""
    # Secret sent as X-Webhook-Secret header — verify it in your Apps Script
    SHEETS_WEBHOOK_SECRET: str = ""

    # ── CODToop Fulfillment API ───────────────────────────────────────────────
    ENABLE_CODTOOP_API: bool = True
    # Full webhook URL including ?token=... from CODToop dashboard
    CODTOOP_WEBHOOK_URL: str = ""

    # ── Facebook CAPI ─────────────────────────────────────────────────────────
    ENABLE_FB_CAPI: bool = True
    FB_API_VERSION: str = "v20.0"
    FB_ACCESS_TOKEN: str = ""
    FB_PIXEL_ID: str = ""

    # ── TikTok CAPI ───────────────────────────────────────────────────────────
    ENABLE_TIKTOK_CAPI: bool = True
    TIKTOK_API_VERSION: str = "v1.3"
    TIKTOK_ACCESS_TOKEN: str = ""
    TIKTOK_PIXEL_ID: str = ""

    # ── Snapchat CAPI ─────────────────────────────────────────────────────────
    ENABLE_SNAP_CAPI: bool = True
    SNAP_ACCESS_TOKEN: str = ""
    SNAP_PIXEL_ID: str = ""

    # ── MaxMind GeoIP2 ────────────────────────────────────────────────────────
    # Get credentials at: https://www.maxmind.com/en/accounts/current/license-key
    ENABLE_GEOIP: bool = True
    MAXMIND_ACCOUNT_ID: str = ""
    MAXMIND_LICENSE_KEY: str = ""
    # Comma-separated whitelisted phone numbers that bypass GeoIP check (for testing)
    GEOIP_WHITELISTED_PHONES: str = "+971558406027,971558406027,0558406027"

    @property
    def geoip_whitelisted_phones_list(self) -> List[str]:
        return [p.strip() for p in self.GEOIP_WHITELISTED_PHONES.split(",") if p.strip()]

    class Config:
        env_file = ".env"


settings = Settings()
