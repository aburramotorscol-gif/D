"""Modelo de vehiculo del inventario."""

from datetime import UTC, date, datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import (
    Carroceria,
    Combustible,
    EstadoVehiculo,
    Origen,
    Transmision,
)


def _ahora() -> datetime:
    return datetime.now(UTC)


class Vehiculo(SQLModel, table=True):
    __tablename__ = "vehiculos"

    id: int | None = Field(default=None, primary_key=True)
    slug: str = Field(index=True, unique=True, max_length=140)

    marca: str = Field(index=True, max_length=60)
    linea: str = Field(max_length=80)
    version: str = Field(default="", max_length=120)
    anio: int = Field(index=True, ge=1950, le=2100)

    precio: int = Field(index=True, ge=0, description="Precio en pesos colombianos")
    kilometraje: int = Field(ge=0)

    transmision: Transmision
    combustible: Combustible
    carroceria: Carroceria

    color: str = Field(default="", max_length=60)
    puertas: int = Field(default=5, ge=2, le=7)
    cilindraje: int = Field(default=0, ge=0, description="Cilindraje en centimetros cubicos")
    traccion: str = Field(default="4x2", max_length=20)
    placa_termina_en: int | None = Field(default=None, ge=0, le=9)

    origen: Origen = Field(default=Origen.PROPIO, index=True)
    estado: EstadoVehiculo = Field(default=EstadoVehiculo.DISPONIBLE, index=True)
    destacado: bool = Field(default=False, index=True)

    descripcion: str = Field(default="")
    # Listas guardadas como JSON: en SQLite y en PostgreSQL funciona igual.
    caracteristicas: list[str] = Field(default_factory=list, sa_column=Column(JSON))
    imagenes: list[dict] = Field(default_factory=list, sa_column=Column(JSON))

    publicado_en: date = Field(default_factory=lambda: _ahora().date(), index=True)
    creado_en: datetime = Field(default_factory=_ahora)
    actualizado_en: datetime = Field(default_factory=_ahora)
