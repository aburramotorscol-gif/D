"""Consultas del catalogo de vehiculos."""

from sqlmodel import Session, func, select

from app.core.errors import NoEncontrado
from app.models.enums import Carroceria, Combustible, EstadoVehiculo, Origen, Transmision
from app.models.vehiculo import Vehiculo

ORDENES_VALIDOS = {
    "recientes": (Vehiculo.publicado_en, True),
    "precio_asc": (Vehiculo.precio, False),
    "precio_desc": (Vehiculo.precio, True),
    "km_asc": (Vehiculo.kilometraje, False),
    "anio_desc": (Vehiculo.anio, True),
}


def listar_vehiculos(
    sesion: Session,
    *,
    marca: str | None = None,
    precio_min: int | None = None,
    precio_max: int | None = None,
    anio_min: int | None = None,
    anio_max: int | None = None,
    km_max: int | None = None,
    transmision: Transmision | None = None,
    combustible: Combustible | None = None,
    carroceria: Carroceria | None = None,
    origen: Origen | None = None,
    estado: EstadoVehiculo | None = EstadoVehiculo.DISPONIBLE,
    destacado: bool | None = None,
    orden: str = "recientes",
    pagina: int = 1,
    tamano: int = 12,
) -> tuple[list[Vehiculo], int]:
    """Devuelve una tupla: items de la pagina y total de coincidencias."""
    consulta = select(Vehiculo)
    conteo = select(func.count()).select_from(Vehiculo)

    filtros = []
    if marca:
        filtros.append(func.lower(Vehiculo.marca) == marca.lower())
    if precio_min is not None:
        filtros.append(Vehiculo.precio >= precio_min)
    if precio_max is not None:
        filtros.append(Vehiculo.precio <= precio_max)
    if anio_min is not None:
        filtros.append(Vehiculo.anio >= anio_min)
    if anio_max is not None:
        filtros.append(Vehiculo.anio <= anio_max)
    if km_max is not None:
        filtros.append(Vehiculo.kilometraje <= km_max)
    if transmision is not None:
        filtros.append(Vehiculo.transmision == transmision)
    if combustible is not None:
        filtros.append(Vehiculo.combustible == combustible)
    if carroceria is not None:
        filtros.append(Vehiculo.carroceria == carroceria)
    if origen is not None:
        filtros.append(Vehiculo.origen == origen)
    if estado is not None:
        filtros.append(Vehiculo.estado == estado)
    if destacado is not None:
        filtros.append(Vehiculo.destacado == destacado)

    for filtro in filtros:
        consulta = consulta.where(filtro)
        conteo = conteo.where(filtro)

    columna, descendente = ORDENES_VALIDOS.get(orden, ORDENES_VALIDOS["recientes"])
    consulta = consulta.order_by(columna.desc() if descendente else columna.asc())

    total = sesion.exec(conteo).one()
    items = sesion.exec(consulta.offset((pagina - 1) * tamano).limit(tamano)).all()
    return list(items), int(total)


def obtener_por_slug(sesion: Session, slug: str) -> Vehiculo:
    vehiculo = sesion.exec(select(Vehiculo).where(Vehiculo.slug == slug)).first()
    if vehiculo is None:
        raise NoEncontrado("No encontramos el vehiculo solicitado: " + slug)
    return vehiculo


def marcas_disponibles(sesion: Session) -> list[str]:
    """Marcas con al menos un vehiculo disponible, para poblar los filtros."""
    filas = sesion.exec(
        select(Vehiculo.marca)
        .where(Vehiculo.estado == EstadoVehiculo.DISPONIBLE)
        .distinct()
        .order_by(Vehiculo.marca)
    ).all()
    return list(filas)
