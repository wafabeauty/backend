"""Initial orders table

Revision ID: 001
Revises: 
Create Date: 2026-06-12 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "orders",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("full_name", sa.String(200), nullable=False),
        sa.Column("phone", sa.String(20), nullable=False),
        sa.Column("items", sa.JSON(), nullable=False),
        sa.Column("total_amount", sa.Float(), nullable=False),
        sa.Column("event_id", sa.String(36), nullable=False, unique=True),
        sa.Column("client_ip", sa.String(50), nullable=True),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column("accepted_upsell", sa.Boolean(), default=False, nullable=False),
        sa.Column("upsell_product_id", sa.String(100), nullable=True),
        sa.Column("webhook_sent", sa.Boolean(), default=False, nullable=False),
        sa.Column("capi_sent", sa.Boolean(), default=False, nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("NOW()"),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("NOW()"),
            onupdate=sa.text("NOW()"),
            nullable=False,
        ),
    )
    op.create_index("ix_orders_phone", "orders", ["phone"])
    op.create_index("ix_orders_created_at", "orders", ["created_at"])


def downgrade() -> None:
    op.drop_index("ix_orders_created_at", table_name="orders")
    op.drop_index("ix_orders_phone", table_name="orders")
    op.drop_table("orders")
