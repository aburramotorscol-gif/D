import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Botón del sistema de diseño. Se renderiza como <Link>, <a> o <button>
 * según lo que reciba, para no perder semántica ni accesibilidad.
 */

type Variante = "primario" | "acento" | "contorno" | "fantasma" | "claro";
type Tamano = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55";

const VARIANTES: Record<Variante, string> = {
  primario: "bg-marca-800 text-arena-50 hover:bg-marca-900",
  acento: "bg-acento-500 text-arena-950 hover:bg-acento-400",
  contorno:
    "border-2 border-marca-800 text-marca-900 hover:bg-marca-800 hover:text-arena-50",
  fantasma: "text-marca-900 hover:bg-marca-100",
  claro: "bg-arena-50 text-marca-900 hover:bg-arena-200",
};

const TAMANOS: Record<Tamano, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

interface Comun {
  variante?: Variante;
  tamano?: Tamano;
  anchoCompleto?: boolean;
  children: ReactNode;
  className?: string;
}

function clases({
  variante = "primario",
  tamano = "md",
  anchoCompleto = false,
  className = "",
}: Comun): string {
  return [
    BASE,
    VARIANTES[variante],
    TAMANOS[tamano],
    anchoCompleto ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type PropsEnlace = Comun & {
  href: string;
  externo?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** Botón que navega. Usa <Link> para rutas internas y <a> para externas. */
export function BotonEnlace({
  href,
  externo = false,
  variante,
  tamano,
  anchoCompleto,
  className,
  children,
  ...resto
}: PropsEnlace) {
  const cn = clases({ variante, tamano, anchoCompleto, className, children });

  if (externo || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cn}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...resto}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn} {...resto}>
      {children}
    </Link>
  );
}

type PropsBoton = Comun &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** Botón que ejecuta una acción (submit de formulario, abrir un panel). */
export function Boton({
  variante,
  tamano,
  anchoCompleto,
  className,
  children,
  type = "button",
  ...resto
}: PropsBoton) {
  return (
    <button
      type={type}
      className={clases({ variante, tamano, anchoCompleto, className, children })}
      {...resto}
    >
      {children}
    </button>
  );
}
