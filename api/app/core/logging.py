"""Logging estructurado en JSON para poder consumirlo desde cualquier agregador."""

import logging
import sys

from pythonjsonlogger.json import JsonFormatter

from app.core.config import settings

_FORMATO = "%(asctime)s %(levelname)s %(name)s %(message)s"


def configurar_logging() -> None:
    """Deja un unico handler en la raiz, en JSON o en texto plano segun LOG_JSON."""
    raiz = logging.getLogger()
    raiz.handlers.clear()
    raiz.setLevel(settings.log_level.upper())

    handler = logging.StreamHandler(sys.stdout)
    if settings.log_json:
        handler.setFormatter(JsonFormatter(_FORMATO, rename_fields={"asctime": "timestamp"}))
    else:
        handler.setFormatter(logging.Formatter("%(levelname)-8s %(name)s: %(message)s"))
    raiz.addHandler(handler)

    # Uvicorn trae sus propios handlers: los dejamos propagar al nuestro.
    for nombre in ("uvicorn", "uvicorn.access", "uvicorn.error"):
        log_uvicorn = logging.getLogger(nombre)
        log_uvicorn.handlers.clear()
        log_uvicorn.propagate = True


def obtener_logger(nombre: str) -> logging.Logger:
    return logging.getLogger(nombre)
