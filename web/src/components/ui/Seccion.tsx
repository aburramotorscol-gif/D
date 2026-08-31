import type { ReactNode } from "react";

/**
 * Contenedor de sección con el ritmo vertical del sitio. Evita que cada
 * página invente su propio espaciado.
 *
 * El sitio es oscuro: los fondos alternan entre el negro de página y el panel
 * en tinta, con el teal reservado para bloques de estructura.
 */

const FONDOS = {
  /** Negro de página. El fondo por defecto. */
  claro: "bg-fondo",
  /** Panel en tinta: alterna con el negro para separar secciones. */
  crema: "bg-panel",
  /** Teal sólido: bloques de estructura, como "cómo funciona". */
  oscuro: "bloque-teal",
  /** Degradado de marca, para los bloques de mayor peso. */
  marca: "trama-marca",
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
  /** Se conserva por compatibilidad: en el tema oscuro el texto ya es claro. */
  claro?: boolean;
  /** Nivel semántico del encabezado. */
  como?: "h1" | "h2";
}

/** Encabezado de sección: etiqueta pequeña, título en Oswald y bajada. */
export function TituloSeccion({
  etiqueta,
  titulo,
  descripcion,
  centrado = false,
  como: Como = "h2",
}: PropsTitulo) {
  return (
    <div className={`max-w-2xl ${centrado ? "mx-auto text-center" : ""}`}>
      {etiqueta && (
        <p className="etiqueta-seccion mb-3 text-neon">{etiqueta}</p>
      )}
      <Como className="titular-alto text-3xl text-hueso sm:text-4xl lg:text-[2.75rem]">
        {titulo}
      </Como>
      {descripcion && (
        <p className="mt-4 text-base leading-relaxed text-hueso/70 sm:text-lg">
          {descripcion}
        </p>
      )}
    </div>
  );
}
