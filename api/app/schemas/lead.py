"""Esquemas de leads: la puerta de entrada del futuro CRM."""

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field, field_validator

from app.models.enums import EstadoLead, TipoLead


class LeadCrear(BaseModel):
    """Un solo cuerpo para los seis formularios del sitio.

    `tipo` discrimina la solicitud y `datos` lleva lo especifico de cada
    formulario (marca del carro que vende, tramite solicitado, etc.).
    """

    tipo: TipoLead
    nombre: str = Field(min_length=2, max_length=120)
    telefono: str = Field(min_length=7, max_length=40)
    email: str | None = Field(default=None, max_length=160)
    ciudad: str | None = Field(default=None, max_length=80)
    mensaje: str | None = None

    vehiculo_slug: str | None = Field(default=None, max_length=140)
    datos: dict[str, Any] = Field(default_factory=dict)

    origen_url: str | None = Field(default=None, max_length=500)
    utm: dict[str, Any] = Field(default_factory=dict)

    acepta_politica_datos: bool = Field(
        default=False,
        description="Ley 1581 de 2012: debe ser true para poder tratar los datos.",
    )

    @field_validator("telefono")
    @classmethod
    def _validar_telefono(cls, valor: str) -> str:
        digitos = "".join(c for c in valor if c.isdigit())
        if len(digitos) < 7:
            raise ValueError("El telefono debe tener al menos 7 digitos.")
        return valor.strip()

    @field_validator("acepta_politica_datos")
    @classmethod
    def _exigir_politica(cls, valor: bool) -> bool:
        if not valor:
            raise ValueError(
                "Debes aceptar la politica de tratamiento de datos para enviar la solicitud."
            )
        return valor


class LeadLeer(BaseModel):
    id: int
    tipo: TipoLead
    estado: EstadoLead
    nombre: str
    telefono: str
    email: str | None
    ciudad: str | None
    mensaje: str | None
    vehiculo_slug: str | None
    datos: dict[str, Any]
    creado_en: datetime

    model_config = {"from_attributes": True}
