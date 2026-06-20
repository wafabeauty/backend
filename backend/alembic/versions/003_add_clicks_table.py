"""Add clicks table

Revision ID: 003
Revises: 002
Create Date: 2026-06-19 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = "003"
down_revision: Union[str, None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "clicks",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("product_slug", sa.String(100), nullable=True),
        sa.Column("ip", sa.String(50), nullable=True),
        sa.Column("country_code", sa.String(10), nullable=False, server_default=""),
        sa.Column("is_vpn", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("is_valid", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("NOW()"),
            nullable=False,
        ),
    )
    op.create_index("ix_clicks_created_at", "clicks", ["created_at"])
    op.create_index("ix_clicks_product_slug", "clicks", ["product_slug"])
    op.create_index("ix_clicks_is_valid", "clicks", ["is_valid"])


def downgrade() -> None:
    op.drop_index("ix_clicks_is_valid", table_name="clicks")
    op.drop_index("ix_clicks_product_slug", table_name="clicks")
    op.drop_index("ix_clicks_created_at", table_name="clicks")
    op.drop_table("clicks")
