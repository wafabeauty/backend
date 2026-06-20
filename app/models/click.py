from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import Boolean, DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Click(Base):
    __tablename__ = "clicks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    product_slug: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    ip: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    country_code: Mapped[str] = mapped_column(String(10), nullable=False, default="")
    is_vpn: Mapped[bool] = mapped_column(Boolean, default=False)
    is_valid: Mapped[bool] = mapped_column(Boolean, default=True)
    user_agent: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )
