"""POST /simulaciones y la formula de amortizacion."""

import pytest
from fastapi.testclient import TestClient

from app.services.amortizacion import calcular_credito


def test_crear_simulacion(cliente: TestClient) -> None:
    respuesta = cliente.post(
        "/simulaciones",
        json={
            "precio": 60_000_000,
            "cuota_inicial": 12_000_000,
            "plazo_meses": 60,
            "tasa_mensual": 1.45,
        },
    )

    assert respuesta.status_code == 201
    cuerpo = respuesta.json()
    assert cuerpo["monto_financiado"] == 48_000_000
    assert cuerpo["cuota_mensual"] > 0
    assert cuerpo["total_a_pagar"] == cuerpo["cuota_mensual"] * 60
    assert cuerpo["total_intereses"] == cuerpo["total_a_pagar"] - 48_000_000


def test_usa_la_tasa_del_sistema_si_no_se_envia(cliente: TestClient) -> None:
    respuesta = cliente.post(
        "/simulaciones",
        json={"precio": 50_000_000, "cuota_inicial": 10_000_000, "plazo_meses": 48},
    )

    assert respuesta.status_code == 201
    assert respuesta.json()["tasa_mensual"] > 0


def test_rechaza_una_inicial_mayor_o_igual_al_precio(cliente: TestClient) -> None:
    respuesta = cliente.post(
        "/simulaciones",
        json={"precio": 30_000_000, "cuota_inicial": 30_000_000, "plazo_meses": 36},
    )

    assert respuesta.status_code == 422


def test_rechaza_un_plazo_fuera_de_rango(cliente: TestClient) -> None:
    respuesta = cliente.post(
        "/simulaciones",
        json={"precio": 30_000_000, "cuota_inicial": 5_000_000, "plazo_meses": 0},
    )

    assert respuesta.status_code == 422


# ---------------------------------------------------------------------------
# La formula. Estos valores son el contrato con web/src/lib/financiacion.ts:
# si cambian aqui, hay que cambiarlos alla.
# ---------------------------------------------------------------------------


def test_cuota_conocida_del_sistema_frances() -> None:
    """48.000.000 a 60 meses al 1,45 % mensual.

    cuota = 48.000.000 * 0,0145 / (1 - 1,0145^-60) = 1.203.271,67...
    """
    resultado = calcular_credito(60_000_000, 12_000_000, 60, 1.45)

    assert resultado.monto_financiado == 48_000_000
    assert resultado.cuota_mensual == 1_203_272
    assert resultado.total_a_pagar == 1_203_272 * 60
    assert resultado.total_intereses == resultado.total_a_pagar - 48_000_000


def test_con_tasa_cero_la_cuota_es_el_capital_dividido_en_el_plazo() -> None:
    resultado = calcular_credito(24_000_000, 0, 24, 0)

    assert resultado.cuota_mensual == 1_000_000
    assert resultado.total_intereses == 0


def test_a_mayor_plazo_menor_cuota_pero_mas_intereses() -> None:
    corto = calcular_credito(60_000_000, 12_000_000, 36, 1.45)
    largo = calcular_credito(60_000_000, 12_000_000, 72, 1.45)

    assert largo.cuota_mensual < corto.cuota_mensual
    assert largo.total_intereses > corto.total_intereses


@pytest.mark.parametrize(
    ("precio", "inicial", "plazo", "tasa"),
    [
        (0, 0, 60, 1.45),
        (60_000_000, 60_000_000, 60, 1.45),
        (60_000_000, 12_000_000, 0, 1.45),
        (60_000_000, 12_000_000, 60, -1),
    ],
)
def test_entradas_invalidas_lanzan_error(precio, inicial, plazo, tasa) -> None:
    with pytest.raises(ValueError):
        calcular_credito(precio, inicial, plazo, tasa)
