Build Wafa Beauty (وفاء للجمال), a premium Arabic DTC beauty ecommerce store for Saudi Arabia.

Create two folders:
- frontend/: Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, RTL Arabic UI.
- backend/: Python FastAPI, PostgreSQL, asyncpg, Alembic migrations, Docker, Google Sheets webhook, CAPI integrations.

Before coding, read every file in docs/, especially:
- docs/01-brand-and-icp.md
- docs/02-tech-stack-and-architecture.md
- docs/03-funnel-and-cro.md
- docs/04-ui-ux-and-copy.md
- docs/05-tracking-and-capi.md
- docs/06-coding-rules.md

Key Requirements:
- DB Name: `wafabeauty`
- Internal DB URL: `postgres://wafabeauty:wafabeauty@wafabeauty_database:5432/wafabeauty?sslmode=disable`
- Implement the 199/279/349 SAR pricing tiers.
- Build the Cart Drawer and the 2-field Checkout Pop-up (Name + KSA Phone).
- Implement the 10-15s Flash Upsell (99 SAR) post-checkout.
- Set up Dockerfiles for both frontend and backend, plus a root docker-compose.yml.