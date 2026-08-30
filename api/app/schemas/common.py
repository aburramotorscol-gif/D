"""Esquemas compartidos."""

from pydantic import BaseModel, Field


class Pagina[T](BaseModel):
    """Respuesta paginada estandar del catalogo."""

    items: list[T]
    total: int = Field(description="Total de resultados que cumplen el filtro")
    pagina: int = Field(description="Numero de pagina, empezando en 1")
    tamano: int = Field(description="Cantidad de items por pagina")
    total_paginas: int
