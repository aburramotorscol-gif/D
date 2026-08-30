"""Configuracion compartida de los tests.

Cada test corre contra una base SQLite en memoria propia: no toca el
aburra_motors.db de desarrollo y no deja estado entre pruebas.
"""

from collections.abc import Generator
from datetime import date

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine

from app.db.session import get_session
from app.main import app
from app.models.vehiculo import Vehiculo


@pytest.fixture(name="sesion")
def fixture_sesion() -> Generator[Session, None, None]:
    """Base en memoria. StaticPool mantiene la misma conexion en todo el test."""
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)

    with Session(engine) as sesion:
        yield sesion

    SQLModel.metadata.drop_all(engine)


@pytest.fixture(name="cliente")
def fixture_cliente(sesion: Session) -> Generator[TestClient, None, None]:
    """Cliente HTTP con la dependencia de sesion apuntando a la base del test."""

    def obtener_sesion_de_prueba() -> Generator[Session, None, None]:
        yield sesion

    app.dependency_overrides[get_session] = obtener_sesion_de_prueba
    with TestClient(app) as cliente:
        yield cliente
    app.dependency_overrides.clear()


def construir_vehiculo(**sobrescrituras) -> Vehiculo:
    """Vehiculo de prueba con valores por defecto razonables."""
    datos = {
        "slug": "renault-duster-intens-2021",
        "marca": "Renault",
        "linea": "Duster",
        "version": "Intens 1.6 MT",
        "anio": 2021,
        "precio": 62_900_000,
        "kilometraje": 48_500,
        "transmision": "manual",
        "combustible": "gasolina",
        "carroceria": "suv",
        "color": "Gris",
        "puertas": 5,
        "cilindraje": 1598,
        "traccion": "4x2",
        "placa_termina_en": 7,
        "origen": "propio",
        "estado": "disponible",
        "destacado": True,
        "descripcion": "Vehiculo de prueba.",
        "caracteristicas": ["Aire acondicionado"],
        "imagenes": [{"src": "/vehiculos/prueba/1.svg", "alt": "Vehiculo de prueba"}],
        "publicado_en": date(2026, 8, 18),
    }
    datos.update(sobrescrituras)
    return Vehiculo(**datos)


@pytest.fixture(name="inventario")
def fixture_inventario(sesion: Session) -> list[Vehiculo]:
    """Tres vehiculos que cubren las combinaciones que usan los filtros."""
    vehiculos = [
        construir_vehiculo(),
        construir_vehiculo(
            slug="mazda-3-grand-touring-2020",
            marca="Mazda",
            linea="Mazda 3",
            version="Grand Touring 2.0 AT",
            anio=2020,
            precio=78_500_000,
            kilometraje=39_200,
            transmision="automatica",
            carroceria="sedan",
            origen="propio",
            destacado=True,
            publicado_en=date(2026, 8, 22),
        ),
        construir_vehiculo(
            slug="kia-picanto-ion-2021",
            marca="Kia",
            linea="Picanto",
            version="Ion 1.2 MT",
            anio=2021,
            precio=42_500_000,
            kilometraje=34_100,
            carroceria="hatchback",
            origen="consignacion",
            destacado=False,
            publicado_en=date(2026, 8, 20),
        ),
    ]
    for vehiculo in vehiculos:
        sesion.add(vehiculo)
    sesion.commit()
    for vehiculo in vehiculos:
        sesion.refresh(vehiculo)
    return vehiculos
