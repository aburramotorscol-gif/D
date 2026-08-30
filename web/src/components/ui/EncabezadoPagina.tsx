import type { ReactNode } from "react";

/** Cabecera común de las páginas internas: título, bajada y acciones. */
export default function EncabezadoPagina({
  etiqueta,
  titulo,
  descripcion,
  children,
}: {
  etiqueta?: string;
  titulo: string;
  descripcion?: string;
  children?: ReactNode;
}) {
  return (
    <div className="trama-marca">
      <div className="contenedor-sitio py-14 sm:py-20">
        {etiqueta && (
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-acento-300 uppercase">
            {etiqueta}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl leading-tight font-bold text-arena-50 sm:text-5xl">
          {titulo}
        </h1>
        {descripcion && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-arena-200">
            {descripcion}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
