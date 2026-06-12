import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.orders import router as orders_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    logger.info("🚀 Wafa Beauty API starting up...")
    yield
    logger.info("👋 Wafa Beauty API shutting down...")


app = FastAPI(
    title="Wafa Beauty API | وفاء للجمال",
    description="Backend API for Wafa Beauty – KSA DTC Beauty Store",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://wafabeauty.shop",
        "https://www.wafabeauty.shop",
        "http://localhost:3000",
        "http://frontend:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders_router)


@app.get("/health")
async def health_check() -> dict:
    return {"status": "ok", "service": "wafabeauty-api"}


@app.get("/")
async def root() -> dict:
    return {"message": "وفاء للجمال API", "version": "1.0.0"}
