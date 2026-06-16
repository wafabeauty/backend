"""add city and address to orders

Revision ID: 002
Revises: 001
Create Date: 2026-06-14
"""
from alembic import op
import sqlalchemy as sa

revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('orders', sa.Column('city', sa.String(100), nullable=True))
    op.add_column('orders', sa.Column('address', sa.String(500), nullable=True))


def downgrade() -> None:
    op.drop_column('orders', 'address')
    op.drop_column('orders', 'city')
