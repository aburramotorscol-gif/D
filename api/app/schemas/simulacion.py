"""Esquemas del simulador de credito."""

from datetime import datetime

from pydantic import BaseModel, Field, model_validator


class SimulacionCrear(BaseModel):
    precio: int = Field(gt=0, description="Precio del vehiculo en pesos")
    cuota_inicial: int = Field(default=0, ge=0)
    plazo_meses: int = Field(ge=1, le=120)
    tasa_mensual: float | None = Field(
        default=None,
        ge=0,
        le=10,
        description="Tasa mensual en porcentaje. Si se omite, se usa la del sistema.",
    )
    vehiculo_slug: str | None = Field(default=None, max_length=140)

    @model_validator(mode="after")
    def _inicial_menor_que_precio(self) -> "SimulacionCrear":
        if self.cuota_inicial >= self.precio:
            raise ValueError("La cuota inicial debe ser menor que el precio del vehiculo.")
        return self


class SimulacionLeer(BaseModel):
    id: int
    precio: int
    cuota_inicial: int
    plazo_meses: int
    tasa_mensual: float
    monto_financiado: int
    cuota_mensual: int
    total_a_pagar: int
    total_intereses: int
    vehiculo_slug: str | None
    creado_en: datetime

    model_config = {"from_attributes": True}
