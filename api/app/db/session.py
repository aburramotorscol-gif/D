"""Motor y sesiones de base de datos."""

from collections.abc import Generator

from sqlmodel import Session, SQLModel, create_engine

from app.core.config import settings

# check_same_thread solo aplica a SQLite; en PostgreSQL no se envia nada especial.
_connect_args = {"check_same_thread": False} if settings.es_sqlite else {}

engine = create_engine(
    settings.database_url,
    echo=False,
    connect_args=_connect_args,
    pool_pre_ping=not settings.es_sqlite,
)


def crear_tablas() -> None:
    """Crea el esquema. En produccion manda Alembic; esto es util en tests y seeds."""
    import app.models  # noqa: F401  (registra los modelos en SQLModel.metadata)

    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """Dependencia de FastAPI: una sesion por request."""
    with Session(engine) as sesion:
        yield sesion
