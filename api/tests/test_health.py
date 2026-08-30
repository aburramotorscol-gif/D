"""GET /health"""

from fastapi.testclient import TestClient


def test_health_responde_ok(cliente: TestClient) -> None:
    respuesta = cliente.get("/health")

    assert respuesta.status_code == 200
    cuerpo = respuesta.json()
    assert cuerpo["estado"] == "ok"
    assert "servicio" in cuerpo


def test_raiz_apunta_a_la_documentacion(cliente: TestClient) -> None:
    respuesta = cliente.get("/")

    assert respuesta.status_code == 200
    assert respuesta.json()["documentacion"] == "/docs"
