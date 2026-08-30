"""Recepcion de solicitudes comerciales (semilla del CRM)."""

from fastapi import APIRouter, Depends, status
from sqlmodel import Session

from app.db.session import get_session
from app.schemas.lead import LeadCrear, LeadLeer
from app.services import leads as servicio

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post(
    "",
    response_model=LeadLeer,
    status_code=status.HTTP_201_CREATED,
    summary="Registrar una solicitud",
    description=(
        "Recibe solicitudes de compra, venta, financiacion, retoma, seguros, "
        "tramites y consignacion. El campo `tipo` las discrimina."
    ),
)
def crear(datos: LeadCrear, sesion: Session = Depends(get_session)) -> LeadLeer:
    return LeadLeer.model_validate(servicio.crear_lead(sesion, datos))
