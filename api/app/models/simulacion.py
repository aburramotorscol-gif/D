"""Modelo de simulacion de credito: guardarlas permite analizar la demanda."""

from datetime import UTC, datetime

from sqlmodel import Field, SQLModel


def _ahora() -> datetime:
    return datetime.now(UTC)


class Simulacion(SQLModel, table=True):
    __tablename__ = "simulaciones"

    id: int | None = Field(default=None, primary_key=True)

    precio: int = Field(ge=0)
    cuota_inicial: int = Field(default=0, ge=0)
    plazo_meses: int = Field(ge=1, le=120)
    tasa_mensual: float = Field(ge=0, description="Tasa mensual en porcentaje, ej. 1.45")

    # Resultados calculados en el servidor (no se confia en lo que envie el navegador).
    monto_financiado: int = Field(ge=0)
    cuota_mensual: int = Field(ge=0)
    total_a_pagar: int = Field(ge=0)
    total_intereses: int = Field(ge=0)

    vehiculo_slug: str | None = Field(default=None, index=True, max_length=140)
    lead_id: int | None = Field(default=None, foreign_key="leads.id", index=True)

    creado_en: datetime = Field(default_factory=_ahora, index=True)
