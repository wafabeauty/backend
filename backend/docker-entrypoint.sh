#!/bin/sh
set -e

echo "⏳ Waiting for database to be ready..."
MAX_TRIES=30
TRIES=0
until python -c "
import asyncio, asyncpg, os, sys
async def check():
    url = os.environ.get('DATABASE_URL', '')
    # asyncpg uses postgresql://, not postgresql+asyncpg://
    url = url.replace('postgresql+asyncpg://', 'postgresql://')
    try:
        conn = await asyncpg.connect(url, timeout=3)
        await conn.close()
        sys.exit(0)
    except Exception as e:
        sys.exit(1)
asyncio.run(check())
" 2>/dev/null; do
    TRIES=$((TRIES + 1))
    if [ "$TRIES" -ge "$MAX_TRIES" ]; then
        echo "❌ Database not ready after ${MAX_TRIES} attempts. Exiting."
        exit 1
    fi
    echo "  DB not ready yet (attempt $TRIES/$MAX_TRIES) — retrying in 3s..."
    sleep 3
done

echo "✅ Database is ready."
echo "⏳ Running database migrations..."
alembic upgrade head
echo "✅ Migrations complete."

echo "🚀 Starting Wafa Beauty API..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2
