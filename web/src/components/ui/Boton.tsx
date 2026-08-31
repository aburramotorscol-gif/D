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
  // El acento neón es la llamada a la acción principal del sitio.
  acento: "bg-neon text-tinta hover:bg-neon-claro",
  // Teal: acción secundaria, la estructura de la marca.
  primario: "bg-teal text-hueso hover:bg-teal-claro",
  contorno:
    "border-2 border-celeste/50 text-celeste hover:border-celeste hover:bg-celeste hover:text-tinta",
  fantasma: "text-celeste hover:bg-panel-alto",
  claro: "bg-hueso text-tinta hover:bg-celeste",
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
