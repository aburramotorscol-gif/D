"""Modelos de base de datos. Importarlos aqui los registra en SQLModel.metadata."""

from app.models.enums import (
    Carroceria,
    Combustible,
    EstadoLead,
    EstadoVehiculo,
    Origen,
    TipoLead,
    Transmision,
)
from app.models.lead import Lead
from app.models.simulacion import Simulacion
from app.models.vehiculo import Vehiculo

__all__ = [
    "Carroceria",
    "Combustible",
    "EstadoLead",
    "EstadoVehiculo",
    "Lead",
    "Origen",
    "Simulacion",
    "TipoLead",
    "Transmision",
    "Vehiculo",
]
