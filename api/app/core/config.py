"""Configuracion central de la aplicacion, leida del entorno (.env)."""

from functools import lru_cache
from typing import Annotated

from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    """Todos los ajustes vienen de variables de entorno.

    La cadena de conexion es una variable para poder pasar de SQLite (desarrollo)
    a PostgreSQL (produccion) sin tocar una sola linea de codigo.
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "Aburra Motors API"
    app_env: str = "local"
    app_debug: bool = True

    database_url: str = "sqlite:///./aburra_motors.db"

    # NoDecode evita que pydantic-settings intente leer el valor del .env
    # como JSON: lo dejamos crudo para que lo parta el validador de abajo.
    cors_origins: Annotated[list[str], NoDecode] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    page_size_default: int = 12
    page_size_max: int = 100

    log_level: str = "INFO"
    log_json: bool = True

    tasa_mensual_por_defecto: float = 1.45

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _split_origins(cls, valor: object) -> object:
        """Permite declarar CORS_ORIGINS como lista separada por comas."""
        if isinstance(valor, str):
            return [origen.strip() for origen in valor.split(",") if origen.strip()]
        return valor

    @property
    def es_sqlite(self) -> bool:
        return self.database_url.startswith("sqlite")


@lru_cache
def get_settings() -> Settings:
    """Instancia unica de configuracion (cacheada)."""
    return Settings()


settings = get_settings()
