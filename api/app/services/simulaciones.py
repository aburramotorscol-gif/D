"""Registro de simulaciones de credito."""

from sqlmodel import Session

from app.core.config import settings
from app.core.logging import obtener_logger
from app.models.simulacion import Simulacion
from app.schemas.simulacion import SimulacionCrear
from app.services.amortizacion import calcular_credito

log = obtener_logger(__name__)


def crear_simulacion(sesion: Session, datos: SimulacionCrear) -> Simulacion:
    """Recalcula siempre en el servidor: no se confia en lo que envie el navegador."""
    tasa = (
        datos.tasa_mensual if datos.tasa_mensual is not None else settings.tasa_mensual_por_defecto
    )

    resultado = calcular_credito(
        precio=datos.precio,
        cuota_inicial=datos.cuota_inicial,
        plazo_meses=datos.plazo_meses,
        tasa_mensual_pct=tasa,
    )

    simulacion = Simulacion(
        precio=datos.precio,
        cuota_inicial=datos.cuota_inicial,
        plazo_meses=datos.plazo_meses,
        tasa_mensual=tasa,
        monto_financiado=resultado.monto_financiado,
        cuota_mensual=resultado.cuota_mensual,
        total_a_pagar=resultado.total_a_pagar,
        total_intereses=resultado.total_intereses,
        vehiculo_slug=datos.vehiculo_slug,
    )

    sesion.add(simulacion)
    sesion.commit()
    sesion.refresh(simulacion)

    log.info(
        "Simulacion registrada",
        extra={
            "simulacion_id": simulacion.id,
            "plazo_meses": simulacion.plazo_meses,
            "vehiculo": simulacion.vehiculo_slug,
        },
    )
    return simulacion
