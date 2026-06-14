from typing import Optional, List, Any
from pydantic import BaseModel, field_validator
import re


class CartItemSchema(BaseModel):
    product_id: str
    product_name_ar: str
    quantity: int
    price: float
    is_upsell: bool = False


class CreateOrderRequest(BaseModel):
    fullName: str
    phone: str
    address: Optional[str] = None
    items: List[Any]
    totalAmount: float
    eventId: str
    clientIp: Optional[str] = None
    userAgent: Optional[str] = None
    acceptedUpsell: Optional[bool] = False
    upsellProduct: Optional[Any] = None

    @field_validator("phone")
    @classmethod
    def validate_ksa_phone(cls, v: str) -> str:
        v = v.strip()
        if not re.match(r"^05\d{8}$", v):
            raise ValueError("رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام")
        return v

    @field_validator("fullName")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 3:
            raise ValueError("الاسم يجب أن يكون 3 أحرف على الأقل")
        return v


class UpsellUpdateRequest(BaseModel):
    accepted: bool


class OrderResponse(BaseModel):
    orderId: str
    success: bool
    message: str
