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
          <p className="etiqueta-seccion mb-3 text-neon">
            {etiqueta}
          </p>
        )}
        <h1 className="titular-alto max-w-3xl text-4xl text-hueso sm:text-5xl lg:text-6xl">
          {titulo}
        </h1>
        {descripcion && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-hueso/80">
            {descripcion}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
