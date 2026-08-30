"""Endpoint de salud, usado por el CI y por cualquier monitor externo."""

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(tags=["sistema"])


@router.get("/health", summary="Estado del servicio")
def health() -> dict[str, str]:
    return {
        "estado": "ok",
        "servicio": settings.app_name,
        "entorno": settings.app_env,
    }
