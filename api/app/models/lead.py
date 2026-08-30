"""Modelo de lead: toda solicitud comercial que entra por el sitio."""

from datetime import UTC, datetime

from sqlalchemy import JSON, Column
from sqlmodel import Field, SQLModel

from app.models.enums import EstadoLead, TipoLead


def _ahora() -> datetime:
    return datetime.now(UTC)


class Lead(SQLModel, table=True):
    """Una sola tabla para compra, venta, financiacion, seguros, tramites y consignacion.

    El campo `tipo` las discrimina y `datos` guarda lo especifico de cada
    formulario sin obligar a migrar el esquema cada vez que cambie un campo.
    """

    __tablename__ = "leads"

    id: int | None = Field(default=None, primary_key=True)
    tipo: TipoLead = Field(index=True)
    estado: EstadoLead = Field(default=EstadoLead.NUEVO, index=True)

    nombre: str = Field(max_length=120)
    telefono: str = Field(index=True, max_length=40)
    email: str | None = Field(default=None, max_length=160)
    ciudad: str | None = Field(default=None, max_length=80)
    mensaje: str | None = Field(default=None)

    # Referencia opcional al vehiculo de interes (o al que el cliente ofrece).
    vehiculo_slug: str | None = Field(default=None, index=True, max_length=140)

    # Campos propios de cada tipo de solicitud (marca y modelo del carro que
    # vende, aseguradora actual, tramite solicitado, etc.).
    datos: dict = Field(default_factory=dict, sa_column=Column(JSON))

    # Trazabilidad de origen, util para medir campanas mas adelante.
    origen_url: str | None = Field(default=None, max_length=500)
    utm: dict = Field(default_factory=dict, sa_column=Column(JSON))

    acepta_politica_datos: bool = Field(default=False)

    creado_en: datetime = Field(default_factory=_ahora, index=True)
    actualizado_en: datetime = Field(default_factory=_ahora)
