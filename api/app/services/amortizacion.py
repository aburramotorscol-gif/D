"""Calculo de credito con sistema de amortizacion frances (cuota fija).

Es la misma formula que implementa el frontend en web/src/lib/financiacion.ts.
Si cambias una, cambia la otra: hay un test que fija los valores esperados.
"""

from dataclasses import dataclass


@dataclass(frozen=True)
class ResultadoCredito:
    monto_financiado: int
    cuota_mensual: int
    total_a_pagar: int
    total_intereses: int


def calcular_credito(
    precio: int,
    cuota_inicial: int,
    plazo_meses: int,
    tasa_mensual_pct: float,
) -> ResultadoCredito:
    """Cuota fija mensual por el sistema frances.

        cuota = P * i / (1 - (1 + i)^-n)

    donde P es el monto financiado, i la tasa mensual en tanto por uno y n el
    plazo en meses. Con tasa 0 la cuota es simplemente P / n.

    Todos los valores monetarios se redondean a pesos enteros: en Colombia no
    se factura con centavos.
    """
    if precio <= 0:
        raise ValueError("El precio debe ser mayor que cero.")
    if cuota_inicial < 0:
        raise ValueError("La cuota inicial no puede ser negativa.")
    if cuota_inicial >= precio:
        raise ValueError("La cuota inicial debe ser menor que el precio.")
    if plazo_meses < 1:
        raise ValueError("El plazo debe ser de al menos un mes.")
    if tasa_mensual_pct < 0:
        raise ValueError("La tasa no puede ser negativa.")

    monto_financiado = precio - cuota_inicial
    i = tasa_mensual_pct / 100.0

    if i == 0:
        cuota = monto_financiado / plazo_meses
    else:
        cuota = monto_financiado * i / (1 - (1 + i) ** (-plazo_meses))

    cuota_mensual = round(cuota)
    total_a_pagar = cuota_mensual * plazo_meses

    return ResultadoCredito(
        monto_financiado=monto_financiado,
        cuota_mensual=cuota_mensual,
        total_a_pagar=total_a_pagar,
        total_intereses=total_a_pagar - monto_financiado,
    )
