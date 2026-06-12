# 🏗 Architecture & Tech Stack

## 1. Overview
*   **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Zustand (State Management).
*   **Backend:** Python FastAPI, SQLAlchemy, asyncpg, Alembic (Migrations), HTTPX (for CAPI).
*   **Database:** PostgreSQL.
*   **Deployment:** Docker, Docker Compose, EasyPanel.
*   **Domains:** Frontend (`wafabeauty.shop`), Backend (`api.wafabeauty.shop`).

## 2. Database Configuration
*   **DB Name:** `wafabeauty`
*   **Internal URL:** `postgres://wafabeauty:wafabeauty@wafabeauty_database:5432/wafabeauty?sslmode=disable`
*   **Startup Rule:** The backend Docker container MUST run database migrations (`alembic upgrade head`) automatically on startup before starting the FastAPI server.

## 3. Environment Variables (.env.example)

### Frontend (`frontend/.env.example`)
```env
NEXT_PUBLIC_API_URL=https://api.wafabeauty.shop
NEXT_PUBLIC_FB_PIXEL_ID=your_fb_pixel_id
NEXT_PUBLIC_TIKTOK_PIXEL_ID=your_tiktok_pixel_id
NEXT_PUBLIC_SNAP_PIXEL_ID=your_snap_pixel_id
```

### Backend (`backend/.env.example`)
```env
DATABASE_URL=postgresql+asyncpg://wafabeauty:wafabeauty@wafabeauty_database:5432/wafabeauty
WEBHOOK_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
FB_ACCESS_TOKEN=your_fb_capi_token
FB_PIXEL_ID=your_fb_pixel_id
TIKTOK_ACCESS_TOKEN=your_tiktok_capi_token
TIKTOK_PIXEL_ID=your_tiktok_pixel_id
SNAP_ACCESS_TOKEN=your_snap_capi_token
SNAP_PIXEL_ID=your_snap_pixel_id
```

## 4. Dockerization
Both `frontend` and `backend` must have their own `Dockerfile`. A `docker-compose.yml` should be provided at the root for local development and easy deployment to EasyPanel.