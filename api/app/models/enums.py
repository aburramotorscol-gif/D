"""Enumeraciones compartidas por modelos y esquemas.

Los valores son los mismos strings que usa el frontend en
web/src/lib/vehiculos.ts, para que el dia que el catalogo venga de la API
no haya que traducir nada.
"""

from enum import StrEnum


class Transmision(StrEnum):
    MANUAL = "manual"
    AUTOMATICA = "automatica"


class Combustible(StrEnum):
    GASOLINA = "gasolina"
    DIESEL = "diesel"
    HIBRIDO = "hibrido"
    ELECTRICO = "electrico"
    GAS = "gas"


class Carroceria(StrEnum):
    SEDAN = "sedan"
    HATCHBACK = "hatchback"
    SUV = "suv"
    PICKUP = "pickup"
    CAMIONETA = "camioneta"
    VAN = "van"


class Origen(StrEnum):
    """De quien es el vehiculo: del inventario propio o de un tercero."""

    PROPIO = "propio"
    CONSIGNACION = "consignacion"


class EstadoVehiculo(StrEnum):
    DISPONIBLE = "disponible"
    RESERVADO = "reservado"
    VENDIDO = "vendido"


class TipoLead(StrEnum):
    """Discrimina que quiere el cliente. Es el eje del futuro CRM."""

    COMPRA = "compra"
    VENTA = "venta"
    FINANCIACION = "financiacion"
    RETOMA = "retoma"
    SEGUROS = "seguros"
    TRAMITES = "tramites"
    CONSIGNACION = "consignacion"
    CONTACTO = "contacto"


class EstadoLead(StrEnum):
    """Embudo comercial minimo, listo para crecer en la fase 3."""

    NUEVO = "nuevo"
    CONTACTADO = "contactado"
    EN_PROCESO = "en_proceso"
    GANADO = "ganado"
    PERDIDO = "perdido"
