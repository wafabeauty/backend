from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://wafabeauty:wafabeauty@wafabeauty_database:5432/wafabeauty"
    WEBHOOK_SHEET_URL: str = ""
    FB_ACCESS_TOKEN: str = ""
    FB_PIXEL_ID: str = ""
    TIKTOK_ACCESS_TOKEN: str = ""
    TIKTOK_PIXEL_ID: str = ""
    SNAP_ACCESS_TOKEN: str = ""
    SNAP_PIXEL_ID: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
