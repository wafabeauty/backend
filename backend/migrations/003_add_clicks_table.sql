-- Migration 003: Add clicks table for admin dashboard analytics
-- Run this in your PostgreSQL database if you are NOT using alembic

CREATE TABLE IF NOT EXISTS clicks (
    id              VARCHAR(36) PRIMARY KEY,
    product_slug    VARCHAR(100),
    ip              VARCHAR(50),
    country_code    VARCHAR(10) NOT NULL DEFAULT '',
    is_vpn          BOOLEAN     NOT NULL DEFAULT false,
    is_valid        BOOLEAN     NOT NULL DEFAULT true,
    user_agent      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ix_clicks_created_at    ON clicks (created_at);
CREATE INDEX IF NOT EXISTS ix_clicks_product_slug  ON clicks (product_slug);
CREATE INDEX IF NOT EXISTS ix_clicks_is_valid      ON clicks (is_valid);

-- Also insert the alembic version so future migrations don't break
INSERT INTO alembic_version (version_num)
VALUES ('003')
ON CONFLICT DO NOTHING;
