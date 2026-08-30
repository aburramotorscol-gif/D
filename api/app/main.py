"""Punto de entrada de la API de Aburra Motors."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import health, leads, simulaciones, vehiculos
from app.core.config import settings
from app.core.errors import registrar_manejadores
from app.core.logging import configurar_logging, obtener_logger

configurar_logging()
log = obtener_logger(__name__)


@asynccontextmanager
async def ciclo_de_vida(app: FastAPI):
    """En desarrollo creamos el esquema al arrancar; en produccion manda Alembic."""
    if settings.app_env == "local":
        from app.db.session import crear_tablas

        crear_tablas()
    log.info("API iniciada", extra={"entorno": settings.app_env})
    yield
    log.info("API detenida")


app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description=(
        "API de Aburra Motors: inventario de vehiculos, leads comerciales y "
        "simulaciones de credito. Documentacion interactiva en /docs."
    ),
    lifespan=ciclo_de_vida,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

registrar_manejadores(app)

app.include_router(health.router)
app.include_router(vehiculos.router)
app.include_router(leads.router)
app.include_router(simulaciones.router)


@app.get("/", include_in_schema=False)
def raiz() -> dict[str, str]:
    return {"servicio": settings.app_name, "documentacion": "/docs"}
