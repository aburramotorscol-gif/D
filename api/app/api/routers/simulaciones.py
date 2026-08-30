"""Simulaciones de credito."""

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.session import get_session
from app.schemas.simulacion import SimulacionCrear, SimulacionLeer
from app.services import simulaciones as servicio

router = APIRouter(prefix="/simulaciones", tags=["financiacion"])


@router.post(
    "",
    response_model=SimulacionLeer,
    status_code=status.HTTP_201_CREATED,
    summary="Calcular y guardar una simulacion de credito",
    description=(
        "Calcula la cuota con amortizacion francesa y guarda la simulacion. "
        "Es un estimado con fines informativos, no una aprobacion de credito."
    ),
)
def crear(datos: SimulacionCrear, sesion: Session = Depends(get_session)) -> SimulacionLeer:
    return SimulacionLeer.model_validate(servicio.crear_simulacion(sesion, datos))
