"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

import { formatearPesosCompacto } from "@/lib/formato";

/**
 * Búsqueda rápida del hero: marca, precio máximo y año mínimo.
 *
 * Navega a /vehiculos con los filtros en la query. El catálogo los lee en el
 * cliente (el sitio es estático, no hay servidor que interprete la query).
 */

interface Props {
  marcas: string[];
  rangoPrecios: { min: number; max: number };
  rangoAnios: { min: number; max: number };
  totalVehiculos: number;
}

const CLASES_CAMPO =
  "w-full rounded-xl border border-teal bg-fondo/60 px-4 py-3 text-hueso/90 " +
  "focus:border-neon/50 focus:outline-none";

const CLASES_ETIQUETA =
  "mb-1.5 block text-xs font-semibold tracking-wider text-hueso/55 uppercase";

/** Escalones de precio en millones, calculados sobre el inventario real. */
function escalonesDePrecio(max: number): number[] {
  const tope = Math.ceil(max / 10_000_000) * 10_000_000;
  const escalones: number[] = [];
  for (let valor = 30_000_000; valor <= tope; valor += 20_000_000) {
    escalones.push(valor);
  }
  if (escalones.at(-1) !== tope) escalones.push(tope);
  return escalones;
}

export default function BusquedaRapida({
  marcas,
  rangoPrecios,
  rangoAnios,
  totalVehiculos,
}: Props) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [anioMin, setAnioMin] = useState("");

  function buscar(evento: FormEvent) {
    evento.preventDefault();

    const parametros = new URLSearchParams();
    if (marca) parametros.set("marca", marca);
    if (precioMax) parametros.set("precioMax", precioMax);
    if (anioMin) parametros.set("anioMin", anioMin);

    const query = parametros.toString();
    router.push(query ? `/vehiculos?${query}` : "/vehiculos");
  }

  const anios = Array.from(
    { length: rangoAnios.max - rangoAnios.min + 1 },
    (_, i) => rangoAnios.min + i,
  ).reverse();

  return (
    <form
      onSubmit={buscar}
      className="rounded-card border border-teal bg-fondo/50 p-5 backdrop-blur sm:p-6"
      aria-labelledby="titulo-busqueda-rapida"
    >
      <h2
        id="titulo-busqueda-rapida"
        className="mb-5 text-sm font-semibold text-hueso/80"
      >
        Busca entre nuestros {totalVehiculos} vehículos disponibles
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="busqueda-marca" className={CLASES_ETIQUETA}>
            Marca
          </label>
          <select
            id="busqueda-marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className={CLASES_CAMPO}
          >
            <option value="">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="busqueda-precio" className={CLASES_ETIQUETA}>
            Precio hasta
          </label>
          <select
            id="busqueda-precio"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
            className={CLASES_CAMPO}
          >
            <option value="">Cualquier precio</option>
            {escalonesDePrecio(rangoPrecios.max).map((valor) => (
              <option key={valor} value={valor}>
                {formatearPesosCompacto(valor)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="busqueda-anio" className={CLASES_ETIQUETA}>
            Modelo desde
          </label>
          <select
            id="busqueda-anio"
            value={anioMin}
            onChange={(e) => setAnioMin(e.target.value)}
            className={CLASES_CAMPO}
          >
            <option value="">Cualquier año</option>
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neon px-6 py-3 font-semibold text-tinta transition-colors hover:bg-neon-claro lg:w-auto"
          >
            <Search aria-hidden="true" className="size-5" />
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
