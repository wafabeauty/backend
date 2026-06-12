# 💻 Coding Guidelines & Rules

## 1. Frontend (Next.js 14 App Router)
*   **Language:** TypeScript (Strict mode).
*   **Styling:** Tailwind CSS. Use arbitrary values sparingly; rely on `tailwind.config.ts` for brand colors.
*   **State Management:** Use `Zustand` for the Cart Drawer state and Checkout data.
*   **Components:** Keep components small, modular, and reusable. Separate UI components from business logic.
*   **Forms:** Use `react-hook-form` for the checkout pop-up to handle validation efficiently without re-renders.

## 2. Backend (FastAPI)
*   **Language:** Python 3.11+.
*   **Architecture:** Use a modular router structure (e.g., `app/api/routes/orders.py`).
*   **Database:** Use `SQLAlchemy` 2.0 with `asyncpg` for asynchronous database operations.
*   **Migrations:** Use `Alembic`. The `docker-entrypoint.sh` script must run `alembic upgrade head` before `uvicorn`.
*   **Validation:** Use `Pydantic` v2 models for all request/response payloads.
*   **External Requests:** Use `httpx` for async calls to the Google Sheet Webhook and CAPI endpoints.

## 3. Repository Structure
The AI coder must deliver two main folders at the root:
*   `/frontend`
*   `/backend`
*   `/scripts` (Contains the Google Apps Script and CSV template).