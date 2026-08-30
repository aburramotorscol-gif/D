"""Registro de leads comerciales."""

from datetime import UTC, datetime

from sqlmodel import Session

from app.core.logging import obtener_logger
from app.models.lead import Lead
from app.schemas.lead import LeadCrear

log = obtener_logger(__name__)


def crear_lead(sesion: Session, datos: LeadCrear) -> Lead:
    lead = Lead(
        tipo=datos.tipo,
        nombre=datos.nombre.strip(),
        telefono=datos.telefono.strip(),
        email=datos.email.strip() if datos.email else None,
        ciudad=datos.ciudad.strip() if datos.ciudad else None,
        mensaje=datos.mensaje,
        vehiculo_slug=datos.vehiculo_slug,
        datos=datos.datos,
        origen_url=datos.origen_url,
        utm=datos.utm,
        acepta_politica_datos=datos.acepta_politica_datos,
    )
    lead.actualizado_en = datetime.now(UTC)

    sesion.add(lead)
    sesion.commit()
    sesion.refresh(lead)

    # Sin datos personales en el log: solo lo necesario para operar y medir.
    log.info(
        "Lead registrado",
        extra={"lead_id": lead.id, "tipo": lead.tipo.value, "vehiculo": lead.vehiculo_slug},
    )
    return lead
