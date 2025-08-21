from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging
from app.db.session import engine
from app.db.base import Base
from app.api.routers.license import router as license_router
from app.api.routers.vehicles import router as vehicles_router

log = setup_logging()

def create_app() -> FastAPI:
    app = FastAPI(title=settings.APP_NAME)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # DB init (sync models)
    Base.metadata.create_all(bind=engine)
    # Routes
    app.include_router(license_router, prefix=settings.API_V1_STR)
    app.include_router(vehicles_router, prefix=settings.API_V1_STR)

    @app.get("/healthz")
    def healthz():
        return {"status": "ok"}

    return app

app = create_app()
