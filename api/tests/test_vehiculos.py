"""GET /vehiculos y GET /vehiculos/{slug}"""

from fastapi.testclient import TestClient


def test_listar_devuelve_el_inventario_paginado(cliente: TestClient, inventario) -> None:
    respuesta = cliente.get("/vehiculos")

    assert respuesta.status_code == 200
    cuerpo = respuesta.json()
    assert cuerpo["total"] == 3
    assert cuerpo["pagina"] == 1
    assert cuerpo["total_paginas"] == 1
    assert len(cuerpo["items"]) == 3


def test_listar_ordena_por_recientes_de_forma_predeterminada(
    cliente: TestClient, inventario
) -> None:
    items = cliente.get("/vehiculos").json()["items"]

    fechas = [item["publicado_en"] for item in items]
    assert fechas == sorted(fechas, reverse=True)


def test_filtrar_por_marca_ignora_mayusculas(cliente: TestClient, inventario) -> None:
    cuerpo = cliente.get("/vehiculos", params={"marca": "mAzDa"}).json()

    assert cuerpo["total"] == 1
    assert cuerpo["items"][0]["marca"] == "Mazda"


def test_filtrar_por_rango_de_precio(cliente: TestClient, inventario) -> None:
    cuerpo = cliente.get(
        "/vehiculos", params={"precio_min": 50_000_000, "precio_max": 70_000_000}
    ).json()

    assert cuerpo["total"] == 1
    assert cuerpo["items"][0]["slug"] == "renault-duster-intens-2021"


def test_filtrar_por_origen_consignacion(cliente: TestClient, inventario) -> None:
    cuerpo = cliente.get("/vehiculos", params={"origen": "consignacion"}).json()

    assert cuerpo["total"] == 1
    assert cuerpo["items"][0]["origen"] == "consignacion"


def test_filtrar_por_destacados(cliente: TestClient, inventario) -> None:
    cuerpo = cliente.get("/vehiculos", params={"destacado": True}).json()

    assert cuerpo["total"] == 2
    assert all(item["destacado"] for item in cuerpo["items"])


def test_ordenar_por_precio_ascendente(cliente: TestClient, inventario) -> None:
    items = cliente.get("/vehiculos", params={"orden": "precio_asc"}).json()["items"]

    precios = [item["precio"] for item in items]
    assert precios == sorted(precios)


def test_paginacion_respeta_el_tamano(cliente: TestClient, inventario) -> None:
    cuerpo = cliente.get("/vehiculos", params={"tamano": 2, "pagina": 2}).json()

    assert cuerpo["total"] == 3
    assert cuerpo["total_paginas"] == 2
    assert len(cuerpo["items"]) == 1


def test_marcas_devuelve_las_del_inventario_disponible(cliente: TestClient, inventario) -> None:
    marcas = cliente.get("/vehiculos/marcas").json()

    assert marcas == ["Kia", "Mazda", "Renault"]


def test_detalle_por_slug(cliente: TestClient, inventario) -> None:
    respuesta = cliente.get("/vehiculos/kia-picanto-ion-2021")

    assert respuesta.status_code == 200
    cuerpo = respuesta.json()
    assert cuerpo["linea"] == "Picanto"
    assert cuerpo["imagenes"][0]["src"].startswith("/vehiculos/")


def test_detalle_de_un_slug_inexistente_devuelve_404(cliente: TestClient) -> None:
    respuesta = cliente.get("/vehiculos/no-existe-este-carro")

    assert respuesta.status_code == 404
    assert "error" in respuesta.json()
