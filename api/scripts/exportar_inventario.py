"""Exporta el inventario de la base de datos al formato del frontend estatico.

Es el camino inverso de seed.py y el puente entre la fase 1 y la fase 2:
mientras el sitio siga siendo un export estatico, el inventario se puede
administrar en la API y volcarse a web/src/data/vehiculos/ para publicarlo.

Uso desde la carpeta api/ con el entorno virtual activado:

    python scripts/exportar_inventario.py
    python scripts/exportar_inventario.py --destino ../web/src/data/vehiculos
    python scripts/exportar_inventario.py --incluir-vendidos
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

RAIZ_API = Path(__file__).resolve().parents[1]
if str(RAIZ_API) not in sys.path:
    sys.path.insert(0, str(RAIZ_API))

from sqlmodel import Session, select  # noqa: E402

from app.db.session import engine  # noqa: E402
from app.models.enums import EstadoVehiculo  # noqa: E402
from app.models.vehiculo import Vehiculo  # noqa: E402

DESTINO_POR_DEFECTO = RAIZ_API.parent / "web" / "src" / "data" / "vehiculos"

# Orden de las claves en el JSON, igual al que espera el esquema Zod del
# frontend (web/src/lib/schemas.ts). Mantenerlo estable evita diffs ruidosos.
CLAVES = [
    "slug",
    "marca",
    "linea",
    "version",
    "anio",
    "precio",
    "kilometraje",
    "transmision",
    "combustible",
    "carroceria",
    "color",
    "puertas",
    "cilindraje",
    "traccion",
    "placa_termina_en",
    "origen",
    "estado",
    "destacado",
    "descripcion",
    "caracteristicas",
    "publicado_en",
    "imagenes",
]


def a_diccionario(vehiculo: Vehiculo) -> dict:
    """Convierte el modelo a la forma exacta que valida Zod en el frontend."""
    datos = {}
    for clave in CLAVES:
        valor = getattr(vehiculo, clave)
        # Los enums de SQLModel son StrEnum: los queremos como string plano.
        datos[clave] = valor.value if hasattr(valor, "value") else valor
    datos["publicado_en"] = vehiculo.publicado_en.isoformat()
    return datos


def exportar(destino: Path, incluir_vendidos: bool = False) -> int:
    destino.mkdir(parents=True, exist_ok=True)

    with Session(engine) as sesion:
        consulta = select(Vehiculo)
        if not incluir_vendidos:
            consulta = consulta.where(Vehiculo.estado == EstadoVehiculo.DISPONIBLE)
        vehiculos = list(sesion.exec(consulta.order_by(Vehiculo.slug)))

    if not vehiculos:
        print("No hay vehiculos que exportar. Corre antes scripts/seed.py.")
        return 0

    slugs_exportados = set()
    for vehiculo in vehiculos:
        archivo = destino / f"{vehiculo.slug}.json"
        contenido = json.dumps(a_diccionario(vehiculo), ensure_ascii=False, indent=2)
        archivo.write_text(contenido + "\n", encoding="utf-8")
        slugs_exportados.add(vehiculo.slug)
        print(f"  escrito {archivo.name}")

    sobrantes = [
        archivo for archivo in destino.glob("*.json") if archivo.stem not in slugs_exportados
    ]
    if sobrantes:
        print("\nEstos archivos ya no corresponden a un vehiculo de la base de datos:")
        for archivo in sobrantes:
            print(f"  {archivo.name}")
        print("Revisalos y borralos a mano si el vehiculo ya se vendio.")

    print(f"\n{len(vehiculos)} vehiculos exportados a {destino}")
    print(
        "Recuerda actualizar la lista de imports de web/src/lib/vehiculos.ts "
        "si agregaste o quitaste vehiculos."
    )
    return len(vehiculos)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--destino",
        type=Path,
        default=DESTINO_POR_DEFECTO,
        help="Carpeta de salida (por defecto web/src/data/vehiculos).",
    )
    parser.add_argument(
        "--incluir-vendidos",
        action="store_true",
        help="Exporta tambien los vehiculos reservados o vendidos.",
    )
    argumentos = parser.parse_args()
    exportar(argumentos.destino.resolve(), argumentos.incluir_vendidos)


if __name__ == "__main__":
    main()
