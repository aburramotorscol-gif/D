import type { ReactNode } from "react";

/**
 * Contenedor de sección con el ritmo vertical del sitio. Evita que cada
 * página invente su propio espaciado.
 */

const FONDOS = {
  claro: "bg-arena-50",
  crema: "bg-arena-100",
  oscuro: "bg-marca-900 text-arena-50",
  marca: "trama-marca text-arena-50",
} as const;

interface Props {
  children: ReactNode;
  fondo?: keyof typeof FONDOS;
  id?: string;
  className?: string;
  /** Reduce el espaciado vertical, para secciones de apoyo. */
  compacta?: boolean;
}

export default function Seccion({
  children,
  fondo = "claro",
  id,
  className = "",
  compacta = false,
}: Props) {
  return (
    <section
      id={id}
      className={`${FONDOS[fondo]} ${compacta ? "py-12 sm:py-16" : "py-16 sm:py-24"} ${className}`}
    >
      <div className="contenedor-sitio">{children}</div>
    </section>
  );
}

interface PropsTitulo {
  etiqueta?: string;
  titulo: string;
  descripcion?: string;
  /** Centra el bloque. Por defecto va alineado a la izquierda. */
  centrado?: boolean;
  claro?: boolean;
  /** Nivel semántico del encabezado. La home usa h2; las páginas internas h2 también. */
  como?: "h1" | "h2";
}

/** Encabezado de sección: etiqueta pequeña, título y bajada. */
export function TituloSeccion({
  etiqueta,
  titulo,
  descripcion,
  centrado = false,
  claro = false,
  como: Como = "h2",
}: PropsTitulo) {
  return (
    <div className={`max-w-2xl ${centrado ? "mx-auto text-center" : ""}`}>
      {etiqueta && (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.18em] uppercase ${
            claro ? "text-acento-300" : "text-acento-700"
          }`}
        >
          {etiqueta}
        </p>
      )}
      <Como
        className={`text-3xl leading-tight font-bold sm:text-4xl ${
          claro ? "text-arena-50" : "text-marca-900"
        }`}
      >
        {titulo}
      </Como>
      {descripcion && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            claro ? "text-arena-200" : "text-arena-700"
          }`}
        >
          {descripcion}
        </p>
      )}
    </div>
  );
}
