"use client";

import { useSearchParams } from "next/navigation";

import SimuladorCredito from "@/components/financiacion/SimuladorCredito";
import type { Vehiculo } from "@/lib/schemas";

/**
 * Envoltura mínima que lee `?vehiculo=<slug>` de la URL.
 *
 * Existe para aislar `useSearchParams` (que obliga a un límite de Suspense en
 * el export estático) del componente del simulador, que ya es bastante grande.
 * Es el enlace "Solicitar financiación" de la ficha de vehículo el que llega aquí.
 */
export default function SimuladorConParametros({
  vehiculos,
}: {
  vehiculos: Pick<
    Vehiculo,
    "slug" | "marca" | "linea" | "version" | "anio" | "precio"
  >[];
}) {
  const parametros = useSearchParams();
  return (
    <SimuladorCredito
      vehiculos={vehiculos}
      slugInicial={parametros.get("vehiculo") ?? undefined}
    />
  );
}
