"""POST /leads"""

from fastapi.testclient import TestClient
from sqlmodel import Session, select

from app.models.lead import Lead

BASE = {
    "nombre": "Ana Maria Restrepo",
    "telefono": "3001234567",
    "acepta_politica_datos": True,
}


def test_crear_lead_de_compra(cliente: TestClient, sesion: Session) -> None:
    respuesta = cliente.post(
        "/leads",
        json={**BASE, "tipo": "compra", "vehiculo_slug": "renault-duster-intens-2021"},
    )

    assert respuesta.status_code == 201
    cuerpo = respuesta.json()
    assert cuerpo["tipo"] == "compra"
    assert cuerpo["estado"] == "nuevo"
    assert cuerpo["vehiculo_slug"] == "renault-duster-intens-2021"

    guardados = sesion.exec(select(Lead)).all()
    assert len(guardados) == 1


def test_crear_lead_de_venta_conserva_los_datos_del_formulario(
    cliente: TestClient,
) -> None:
    datos = {"marca": "Renault", "linea": "Duster", "anio": 2021, "kilometraje": 48500}

    respuesta = cliente.post("/leads", json={**BASE, "tipo": "venta", "datos": datos})

    assert respuesta.status_code == 201
    assert respuesta.json()["datos"] == datos


def test_todos_los_tipos_de_solicitud_son_validos(cliente: TestClient) -> None:
    tipos = [
        "compra",
        "venta",
        "financiacion",
        "retoma",
        "seguros",
        "tramites",
        "consignacion",
        "contacto",
    ]

    for tipo in tipos:
        respuesta = cliente.post("/leads", json={**BASE, "tipo": tipo})
        assert respuesta.status_code == 201, f"fallo el tipo {tipo}"


def test_rechaza_un_tipo_desconocido(cliente: TestClient) -> None:
    respuesta = cliente.post("/leads", json={**BASE, "tipo": "permuta"})

    assert respuesta.status_code == 422


def test_exige_la_autorizacion_de_tratamiento_de_datos(cliente: TestClient) -> None:
    respuesta = cliente.post(
        "/leads",
        json={**BASE, "tipo": "contacto", "acepta_politica_datos": False},
    )

    assert respuesta.status_code == 422


def test_rechaza_un_telefono_demasiado_corto(cliente: TestClient) -> None:
    respuesta = cliente.post("/leads", json={**BASE, "tipo": "contacto", "telefono": "300"})

    assert respuesta.status_code == 422
