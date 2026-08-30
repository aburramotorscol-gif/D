"""Manejo de errores centralizado: una sola forma de respuesta de error."""

from fastapi import FastAPI, Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.logging import obtener_logger

log = obtener_logger(__name__)

# Starlette renombro la constante 422; getattr mantiene compatibilidad con
# versiones anteriores sin disparar el DeprecationWarning en las nuevas.
HTTP_422 = getattr(status, "HTTP_422_UNPROCESSABLE_CONTENT", 422)


class ErrorDeNegocio(Exception):
    """Error esperado de la capa de servicios (por ejemplo, recurso inexistente)."""

    def __init__(self, mensaje: str, codigo: int = status.HTTP_400_BAD_REQUEST) -> None:
        super().__init__(mensaje)
        self.mensaje = mensaje
        self.codigo = codigo


class NoEncontrado(ErrorDeNegocio):
    def __init__(self, mensaje: str = "El recurso solicitado no existe.") -> None:
        super().__init__(mensaje, status.HTTP_404_NOT_FOUND)


def _respuesta(codigo: int, mensaje: str, detalles: object = None) -> JSONResponse:
    cuerpo: dict[str, object] = {"error": {"codigo": codigo, "mensaje": mensaje}}
    if detalles is not None:
        cuerpo["error"]["detalles"] = detalles  # type: ignore[index]
    return JSONResponse(status_code=codigo, content=jsonable_encoder(cuerpo))


def registrar_manejadores(app: FastAPI) -> None:
    """Engancha los manejadores de excepciones en la aplicacion."""

    @app.exception_handler(ErrorDeNegocio)
    async def _negocio(_: Request, exc: ErrorDeNegocio) -> JSONResponse:
        return _respuesta(exc.codigo, exc.mensaje)

    @app.exception_handler(RequestValidationError)
    async def _validacion(_: Request, exc: RequestValidationError) -> JSONResponse:
        return _respuesta(
            HTTP_422,
            "Los datos enviados no son validos.",
            exc.errors(),
        )

    @app.exception_handler(StarletteHTTPException)
    async def _http(_: Request, exc: StarletteHTTPException) -> JSONResponse:
        return _respuesta(exc.status_code, str(exc.detail))

    @app.exception_handler(Exception)
    async def _inesperado(request: Request, exc: Exception) -> JSONResponse:
        log.exception("Error no controlado en %s %s", request.method, request.url.path)
        return _respuesta(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            "Ocurrio un error inesperado. Intenta de nuevo en unos minutos.",
        )
