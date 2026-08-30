import type { ReactNode } from "react";

/** Etiqueta pequeña para estados: propio / consignación, destacado, etc. */

const TONOS = {
  neutro: "bg-arena-200 text-arena-800",
  marca: "bg-marca-100 text-marca-800",
  acento: "bg-acento-100 text-acento-800",
  oscuro: "bg-marca-900 text-arena-50",
  contorno: "border border-arena-300 bg-arena-50/80 text-arena-700",
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
