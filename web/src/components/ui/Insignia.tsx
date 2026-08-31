import type { ReactNode } from "react";

/** Etiqueta pequeña para estados: propio / consignación, destacado, etc. */

const TONOS = {
  neutro: "bg-panel-alto text-hueso/80",
  marca: "bg-teal text-hueso",
  acento: "bg-neon text-tinta",
  oscuro: "bg-fondo/85 text-celeste ring-1 ring-celeste/30",
  contorno: "border border-celeste/30 bg-fondo/70 text-celeste",
} as const;

interface Props {
  children: ReactNode;
  tono?: keyof typeof TONOS;
  className?: string;
}

export default function Insignia({ children, tono = "neutro", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${TONOS[tono]} ${className}`}
    >
      {children}
    </span>
  );
}
