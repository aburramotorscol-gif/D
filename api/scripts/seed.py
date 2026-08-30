"""Carga en la base de datos los vehiculos de ejemplo.

La fuente son los mismos JSON que consume el frontend estatico
(web/src/data/vehiculos/*.json), asi que no hay dos catalogos que mantener
sincronizados: hay uno solo, y este script lo importa.

Uso desde la carpeta api/ con el entorno virtual activado:

    python scripts/seed.py           # inserta lo que falte
    python scripts/seed.py --reset   # borra el inventario y lo vuelve a cargar
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import UTC, datetime
from pathlib import Path

# Permite ejecutar el script directamente sin instalar el paquete.
RAIZ_API = Path(__file__).resolve().parents[1]
if str(RAIZ_API) not in sys.path:
    sys.path.insert(0, str(RAIZ_API))

from sqlmodel import Session, delete, select  # noqa: E402

from app.db.session import crear_tablas, engine  # noqa: E402
from app.models.vehiculo import Vehiculo  # noqa: E402
from app.schemas.vehiculo import VehiculoCrear  # noqa: E402

DIR_DATOS = RAIZ_API.parent / "web" / "src" / "data" / "vehiculos"


def leer_json_del_frontend() -> list[VehiculoCrear]:
    """Lee y valida los JSON del frontend con los esquemas Pydantic de la API."""
    if not DIR_DATOS.is_dir():
        raise SystemExit(
            f"No encontre la carpeta de datos del frontend en {DIR_DATOS}.\n"
            "Ejecuta el script desde el repositorio completo, no solo desde api/."
        )

    archivos = sorted(DIR_DATOS.glob("*.json"))
    if not archivos:
        raise SystemExit(f"No hay archivos JSON en {DIR_DATOS}.")

    vehiculos: list[VehiculoCrear] = []
    for archivo in archivos:
        crudo = json.loads(archivo.read_text(encoding="utf-8"))
        try:
            vehiculos.append(VehiculoCrear.model_validate(crudo))
        except Exception as error:  # noqa: BLE001 - queremos el nombre del archivo
            raise SystemExit(f"{archivo.name} no es valido:\n{error}") from error

    return vehiculos


def sembrar(reset: bool = False) -> None:
    crear_tablas()

    vehiculos = leer_json_del_frontend()
    ahora = datetime.now(UTC)

    with Session(engine) as sesion:
        if reset:
            sesion.exec(delete(Vehiculo))
            sesion.commit()
            print("Inventario anterior borrado.")

        insertados = 0
        actualizados = 0

        for datos in vehiculos:
            existente = sesion.exec(select(Vehiculo).where(Vehiculo.slug == datos.slug)).first()

            campos = datos.model_dump()
            # Pydantic devuelve las imagenes como objetos; la columna es JSON.
            campos["imagenes"] = [imagen.model_dump() for imagen in datos.imagenes]

            if existente is None:
                sesion.add(Vehiculo(**campos, creado_en=ahora, actualizado_en=ahora))
                insertados += 1
            else:
                for clave, valor in campos.items():
                    setattr(existente, clave, valor)
                existente.actualizado_en = ahora
                sesion.add(existente)
                actualizados += 1

        sesion.commit()

    print(f"Listo: {insertados} vehiculos insertados, {actualizados} actualizados.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Borra el inventario existente antes de cargar.",
    )
    argumentos = parser.parse_args()
    sembrar(reset=argumentos.reset)


if __name__ == "__main__":
    main()
