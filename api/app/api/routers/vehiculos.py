"""Catalogo de vehiculos."""

from fastapi import APIRouter, Depends, Query
from sqlmodel import Session

from app.core.config import settings
from app.db.session import get_session
from app.models.enums import Carroceria, Combustible, EstadoVehiculo, Origen, Transmision
from app.schemas.common import Pagina
from app.schemas.vehiculo import VehiculoLeer
from app.services import vehiculos as servicio

router = APIRouter(prefix="/vehiculos", tags=["vehiculos"])


@router.get("", response_model=Pagina[VehiculoLeer], summary="Listar vehiculos")
def listar(
    sesion: Session = Depends(get_session),
    marca: str | None = Query(default=None, description="Marca exacta, sin distinguir mayusculas"),
    precio_min: int | None = Query(default=None, ge=0),
    precio_max: int | None = Query(default=None, ge=0),
    anio_min: int | None = Query(default=None, ge=1950),
    anio_max: int | None = Query(default=None, le=2100),
    km_max: int | None = Query(default=None, ge=0),
    transmision: Transmision | None = None,
    combustible: Combustible | None = None,
    carroceria: Carroceria | None = None,
    origen: Origen | None = Query(default=None, description="propio o consignacion"),
    estado: EstadoVehiculo | None = EstadoVehiculo.DISPONIBLE,
    destacado: bool | None = None,
    orden: str = Query(
        default="recientes",
        description="recientes | precio_asc | precio_desc | km_asc | anio_desc",
    ),
    pagina: int = Query(default=1, ge=1),
    tamano: int | None = Query(default=None, ge=1),
) -> Pagina[VehiculoLeer]:
    tamano_real = min(tamano or settings.page_size_default, settings.page_size_max)

    items, total = servicio.listar_vehiculos(
        sesion,
        marca=marca,
        precio_min=precio_min,
        precio_max=precio_max,
        anio_min=anio_min,
        anio_max=anio_max,
        km_max=km_max,
        transmision=transmision,
        combustible=combustible,
        carroceria=carroceria,
        origen=origen,
        estado=estado,
        destacado=destacado,
        orden=orden,
        pagina=pagina,
        tamano=tamano_real,
    )

    total_paginas = (total + tamano_real - 1) // tamano_real if total else 0
    return Pagina[VehiculoLeer](
        items=[VehiculoLeer.model_validate(v) for v in items],
        total=total,
        pagina=pagina,
        tamano=tamano_real,
        total_paginas=total_paginas,
    )


@router.get("/marcas", response_model=list[str], summary="Marcas con inventario disponible")
def marcas(sesion: Session = Depends(get_session)) -> list[str]:
    return servicio.marcas_disponibles(sesion)


@router.get("/{slug}", response_model=VehiculoLeer, summary="Detalle de un vehiculo")
def detalle(slug: str, sesion: Session = Depends(get_session)) -> VehiculoLeer:
    return VehiculoLeer.model_validate(servicio.obtener_por_slug(sesion, slug))
