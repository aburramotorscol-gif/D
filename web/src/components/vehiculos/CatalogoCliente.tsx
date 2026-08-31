"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { RotateCcw, SlidersHorizontal, X } from "lucide-react";

import TarjetaVehiculo from "@/components/vehiculos/TarjetaVehiculo";
import { BotonEnlace } from "@/components/ui/Boton";
import { formatearPesosCompacto, formatearNumero } from "@/lib/formato";
import { etiquetas, type Vehiculo } from "@/lib/schemas";

/**
 * Catálogo con filtros del lado del cliente.
 *
 * El sitio es un export estático, así que no hay servidor que interprete la
 * query: el inventario completo (8 vehículos) llega en el HTML y filtramos en
 * memoria. Es instantáneo y funciona sin JavaScript para ver la lista completa.
 *
 * Cuando el inventario crezca lo suficiente como para que esto pese, la fase 2
 * mueve el filtrado a `GET /vehiculos` del backend, que ya acepta los mismos
 * parámetros.
 */

type Orden = "recientes" | "precio_asc" | "precio_desc";

interface Filtros {
  marca: string;
  precioMax: string;
  precioMin: string;
  anioMin: string;
  kmMax: string;
  transmision: string;
  combustible: string;
  origen: string;
  orden: Orden;
}

const FILTROS_VACIOS: Filtros = {
  marca: "",
  precioMin: "",
  precioMax: "",
  anioMin: "",
  kmMax: "",
  transmision: "",
  combustible: "",
  origen: "",
  orden: "recientes",
};

const OPCIONES_KM = [30_000, 50_000, 80_000, 120_000];

const CLASES_CAMPO =
  "w-full rounded-xl border border-celeste/20 bg-panel px-3.5 py-2.5 text-sm text-hueso " +
  "focus:border-teal-claro focus:outline-none";

const CLASES_ETIQUETA =
  "mb-1.5 block text-xs font-semibold tracking-wider text-hueso/60 uppercase";

function escalonesDePrecio(min: number, max: number): number[] {
  const piso = Math.floor(min / 10_000_000) * 10_000_000;
  const techo = Math.ceil(max / 10_000_000) * 10_000_000;
  const escalones: number[] = [];
  for (let v = Math.max(piso, 10_000_000); v <= techo; v += 20_000_000) {
    escalones.push(v);
  }
  if (escalones.at(-1) !== techo) escalones.push(techo);
  return escalones;
}

interface Props {
  vehiculos: Vehiculo[];
  marcas: string[];
  rangoPrecios: { min: number; max: number };
  rangoAnios: { min: number; max: number };
}

export default function CatalogoCliente({
  vehiculos,
  marcas,
  rangoPrecios,
  rangoAnios,
}: Props) {
  const parametros = useSearchParams();

  // Valores iniciales tomados de la query (los pone la búsqueda rápida del hero).
  const [filtros, setFiltros] = useState<Filtros>(() => ({
    ...FILTROS_VACIOS,
    marca: parametros.get("marca") ?? "",
    precioMin: parametros.get("precioMin") ?? "",
    precioMax: parametros.get("precioMax") ?? "",
    anioMin: parametros.get("anioMin") ?? "",
    kmMax: parametros.get("kmMax") ?? "",
    transmision: parametros.get("transmision") ?? "",
    combustible: parametros.get("combustible") ?? "",
    origen: parametros.get("origen") ?? "",
  }));

  const [panelAbierto, setPanelAbierto] = useState(false);

  function actualizar<C extends keyof Filtros>(campo: C, valor: Filtros[C]) {
    setFiltros((previos) => ({ ...previos, [campo]: valor }));
  }

  const resultados = useMemo(() => {
    const filtrados = vehiculos.filter((v) => {
      if (filtros.marca && v.marca !== filtros.marca) return false;
      if (filtros.precioMin && v.precio < Number(filtros.precioMin)) return false;
      if (filtros.precioMax && v.precio > Number(filtros.precioMax)) return false;
      if (filtros.anioMin && v.anio < Number(filtros.anioMin)) return false;
      if (filtros.kmMax && v.kilometraje > Number(filtros.kmMax)) return false;
      if (filtros.transmision && v.transmision !== filtros.transmision) return false;
      if (filtros.combustible && v.combustible !== filtros.combustible) return false;
      if (filtros.origen && v.origen !== filtros.origen) return false;
      return true;
    });

    switch (filtros.orden) {
      case "precio_asc":
        return [...filtrados].sort((a, b) => a.precio - b.precio);
      case "precio_desc":
        return [...filtrados].sort((a, b) => b.precio - a.precio);
      default:
        return [...filtrados].sort((a, b) =>
          b.publicado_en.localeCompare(a.publicado_en),
        );
    }
  }, [vehiculos, filtros]);

  const activos = Object.entries(filtros).filter(
    ([clave, valor]) => clave !== "orden" && valor !== "",
  ).length;

  const combustiblesEnInventario = [...new Set(vehiculos.map((v) => v.combustible))];

  const panelFiltros = (
    <div className="space-y-5">
      <div>
        <label htmlFor="filtro-marca" className={CLASES_ETIQUETA}>
          Marca
        </label>
        <select
          id="filtro-marca"
          value={filtros.marca}
          onChange={(e) => actualizar("marca", e.target.value)}
          className={CLASES_CAMPO}
        >
          <option value="">Todas</option>
          {marcas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={CLASES_ETIQUETA}>Rango de precio</legend>
        <div className="grid grid-cols-2 gap-2">
          <select
            aria-label="Precio mínimo"
            value={filtros.precioMin}
            onChange={(e) => actualizar("precioMin", e.target.value)}
            className={CLASES_CAMPO}
          >
            <option value="">Desde</option>
            {escalonesDePrecio(rangoPrecios.min, rangoPrecios.max).map((v) => (
              <option key={v} value={v}>
                {formatearPesosCompacto(v)}
              </option>
            ))}
          </select>
          <select
            aria-label="Precio máximo"
            value={filtros.precioMax}
            onChange={(e) => actualizar("precioMax", e.target.value)}
            className={CLASES_CAMPO}
          >
            <option value="">Hasta</option>
            {escalonesDePrecio(rangoPrecios.min, rangoPrecios.max).map((v) => (
              <option key={v} value={v}>
                {formatearPesosCompacto(v)}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <div>
        <label htmlFor="filtro-anio" className={CLASES_ETIQUETA}>
          Modelo desde
        </label>
        <select
          id="filtro-anio"
          value={filtros.anioMin}
          onChange={(e) => actualizar("anioMin", e.target.value)}
          className={CLASES_CAMPO}
        >
          <option value="">Cualquier año</option>
          {Array.from(
            { length: rangoAnios.max - rangoAnios.min + 1 },
            (_, i) => rangoAnios.max - i,
          ).map((anio) => (
            <option key={anio} value={anio}>
              {anio}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-km" className={CLASES_ETIQUETA}>
          Kilometraje hasta
        </label>
        <select
          id="filtro-km"
          value={filtros.kmMax}
          onChange={(e) => actualizar("kmMax", e.target.value)}
          className={CLASES_CAMPO}
        >
          <option value="">Cualquiera</option>
          {OPCIONES_KM.map((km) => (
            <option key={km} value={km}>
              Hasta {formatearNumero(km)} km
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filtro-transmision" className={CLASES_ETIQUETA}>
          Transmisión
        </label>
        <select
          id="filtro-transmision"
          value={filtros.transmision}
          onChange={(e) => actualizar("transmision", e.target.value)}
          className={CLASES_CAMPO}
        >
          <option value="">Cualquiera</option>
          <option value="manual">{etiquetas.transmision.manual}</option>
          <option value="automatica">{etiquetas.transmision.automatica}</option>
        </select>
      </div>

      <div>
        <label htmlFor="filtro-combustible" className={CLASES_ETIQUETA}>
          Combustible
        </label>
        <select
          id="filtro-combustible"
          value={filtros.combustible}
          onChange={(e) => actualizar("combustible", e.target.value)}
          className={CLASES_CAMPO}
        >
          <option value="">Cualquiera</option>
          {combustiblesEnInventario.map((c) => (
            <option key={c} value={c}>
              {etiquetas.combustible[c]}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={CLASES_ETIQUETA}>Procedencia</legend>
        <div className="flex flex-col gap-2">
          {(
            [
              ["", "Todos"],
              ["propio", etiquetas.origen.propio],
              ["consignacion", etiquetas.origen.consignacion],
            ] as const
          ).map(([valor, texto]) => (
            <label
              key={valor || "todos"}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-hueso/85"
            >
              <input
                type="radio"
                name="origen"
                value={valor}
                checked={filtros.origen === valor}
                onChange={(e) => actualizar("origen", e.target.value)}
                className="size-4 accent-neon"
              />
              {texto}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={() => setFiltros(FILTROS_VACIOS)}
        disabled={activos === 0}
        className="inline-flex items-center gap-2 text-sm font-semibold text-celeste hover:text-hueso disabled:cursor-not-allowed disabled:text-hueso/55"
      >
        <RotateCcw aria-hidden="true" className="size-4" />
        Limpiar filtros
      </button>
    </div>
  );

  return (
    <div className="contenedor-sitio py-10 sm:py-14">
      <div className="lg:grid lg:grid-cols-[17rem_1fr] lg:gap-10">
        {/* Filtros: barra lateral en escritorio, panel desplegable en móvil */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <button
            type="button"
            onClick={() => setPanelAbierto(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-teal px-5 py-3 font-semibold text-hueso lg:hidden"
            aria-expanded={panelAbierto}
          >
            <SlidersHorizontal aria-hidden="true" className="size-5" />
            Filtrar
            {activos > 0 && (
              <span className="ml-1 grid size-6 place-items-center rounded-full bg-neon text-xs text-tinta">
                {activos}
              </span>
            )}
          </button>

          <div className="hidden rounded-card border border-celeste/15 bg-panel p-6 lg:block">
            <h2 className="mb-5 font-bold text-hueso">Filtrar</h2>
            {panelFiltros}
          </div>
        </div>

        {/* Resultados */}
        <div className="mt-8 lg:mt-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p aria-live="polite" className="text-sm text-hueso/75">
              <strong className="font-semibold text-hueso">
                {resultados.length}
              </strong>{" "}
              {resultados.length === 1
                ? "vehículo encontrado"
                : "vehículos encontrados"}
            </p>

            <div className="flex items-center gap-2">
              <label
                htmlFor="orden"
                className="text-xs font-semibold tracking-wider text-hueso/60 uppercase"
              >
                Ordenar
              </label>
              <select
                id="orden"
                value={filtros.orden}
                onChange={(e) => actualizar("orden", e.target.value as Orden)}
                className="rounded-xl border border-celeste/20 bg-panel px-3.5 py-2 text-sm text-hueso focus:border-teal-claro focus:outline-none"
              >
                <option value="recientes">Más recientes</option>
                <option value="precio_asc">Precio: de menor a mayor</option>
                <option value="precio_desc">Precio: de mayor a menor</option>
              </select>
            </div>
          </div>

          {resultados.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {resultados.map((vehiculo, indice) => (
                <li key={vehiculo.slug}>
                  <TarjetaVehiculo vehiculo={vehiculo} prioridad={indice < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-card border border-dashed border-celeste/20 bg-panel/70 px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-hueso">
                Ningún vehículo cumple con esos filtros
              </h2>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-hueso/75">
                Prueba a ampliar el rango de precio o el año. También podemos
                buscarte el carro que necesitas aunque no esté publicado: díganos
                qué busca y lo conseguimos.
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setFiltros(FILTROS_VACIOS)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-hueso hover:bg-panel"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Quitar los filtros
                </button>
                <BotonEnlace href="/contacto" variante="contorno">
                  Pedir un vehículo a la medida
                </BotonEnlace>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panel de filtros a pantalla completa en móvil */}
      {panelAbierto && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-fondo/75"
            onClick={() => setPanelAbierto(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filtros del catálogo"
            className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-fondo p-6 pb-24"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-hueso">Filtrar</h2>
              <button
                type="button"
                onClick={() => setPanelAbierto(false)}
                className="grid size-10 place-items-center rounded-full hover:bg-panel-alto"
              >
                <span className="sr-only">Cerrar los filtros</span>
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            {panelFiltros}

            <div className="fixed inset-x-0 bottom-0 border-t border-celeste/15 bg-fondo p-4">
              <button
                type="button"
                onClick={() => setPanelAbierto(false)}
                className="w-full rounded-full bg-teal px-6 py-3.5 font-semibold text-hueso"
              >
                Ver {resultados.length}{" "}
                {resultados.length === 1 ? "vehículo" : "vehículos"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
