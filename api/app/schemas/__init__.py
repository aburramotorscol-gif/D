"""Esquemas Pydantic de entrada y salida de la API."""

from app.schemas.common import Pagina
from app.schemas.lead import LeadCrear, LeadLeer
from app.schemas.simulacion import SimulacionCrear, SimulacionLeer
from app.schemas.vehiculo import ImagenVehiculo, VehiculoCrear, VehiculoLeer

__all__ = [
    "ImagenVehiculo",
    "LeadCrear",
    "LeadLeer",
    "Pagina",
    "SimulacionCrear",
    "SimulacionLeer",
    "VehiculoCrear",
    "VehiculoLeer",
]
