"""Esquemas de entrada y salida de vehiculos."""

from datetime import date, datetime

from pydantic import BaseModel, Field

from app.models.enums import (
    Carroceria,
    Combustible,
    EstadoVehiculo,
    Origen,
    Transmision,
)


class ImagenVehiculo(BaseModel):
    src: str
    alt: str = ""


class VehiculoBase(BaseModel):
    slug: str = Field(max_length=140)
    marca: str
    linea: str
    version: str = ""
    anio: int = Field(ge=1950, le=2100)
    precio: int = Field(ge=0)
    kilometraje: int = Field(ge=0)
    transmision: Transmision
    combustible: Combustible
    carroceria: Carroceria
    color: str = ""
    puertas: int = Field(default=5, ge=2, le=7)
    cilindraje: int = Field(default=0, ge=0)
    traccion: str = "4x2"
    placa_termina_en: int | None = Field(default=None, ge=0, le=9)
    origen: Origen = Origen.PROPIO
    estado: EstadoVehiculo = EstadoVehiculo.DISPONIBLE
    destacado: bool = False
    descripcion: str = ""
    caracteristicas: list[str] = Field(default_factory=list)
    imagenes: list[ImagenVehiculo] = Field(default_factory=list)
    publicado_en: date


class VehiculoCrear(VehiculoBase):
    """Usado por el seed y por la futura administracion del inventario."""


class VehiculoLeer(VehiculoBase):
    id: int
    creado_en: datetime
    actualizado_en: datetime

    model_config = {"from_attributes": True}
