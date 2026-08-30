"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/site";
import { calcularCredito, cuotaInicialMinima } from "@/lib/financiacion";
import { formatearPesos, formatearPorcentaje } from "@/lib/formato";
import { construirEnlaceWhatsApp } from "@/lib/leads";
import type { Vehiculo } from "@/lib/schemas";

/**
 * Simulador de crédito interactivo.
 *
 * Calcula en el navegador con la misma fórmula del backend
 * (`api/app/services/amortizacion.py`). Cuando exista el backend, además del
 * cálculo local se hará `POST /simulaciones` para poder analizar la demanda.
 */

interface Props {
  /** Vehículos del catálogo, para poder precargar el precio de uno. */
  vehiculos: Pick<Vehiculo, "slug" | "marca" | "linea" | "version" | "anio" | "precio">[];
  /** Slug preseleccionado (llega desde /vehiculos/[slug] con ?vehiculo=). */
  slugInicial?: string;
}

const CLASES_CAMPO =
  "w-full rounded-xl border border-arena-300 bg-white px-4 py-3 text-arena-900 " +
  "focus:border-marca-600 focus:outline-none";

const CLASES_ETIQUETA = "mb-2 block text-sm font-semibold text-arena-800";

const PRECIO_POR_DEFECTO = 60_000_000;

export default function SimuladorCredito({ vehiculos, slugInicial }: Props) {
  const { plazoMinimoMeses, plazoMaximoMeses, plazoPorDefectoMeses, tasaMensualPorDefecto, tasaMensualMinima, tasaMensualMaxima, cuotaInicialSugeridaPct } =
    siteConfig.financiacion;

  const vehiculoInicial = vehiculos.find((v) => v.slug === slugInicial);

  const [slug, setSlug] = useState(vehiculoInicial?.slug ?? "");
  const [precio, setPrecio] = useState(vehiculoInicial?.precio ?? PRECIO_POR_DEFECTO);
  const [cuotaInicial, setCuotaInicial] = useState(() =>
    Math.round(((vehiculoInicial?.precio ?? PRECIO_POR_DEFECTO) * cuotaInicialSugeridaPct) / 100),
  );
  const [plazo, setPlazo] = useState<number>(plazoPorDefectoMeses);
  const [tasa, setTasa] = useState<number>(tasaMensualPorDefecto);

  /** Al escoger un vehículo se recalcula precio y cuota inicial sugerida. */
  function escogerVehiculo(nuevoSlug: string) {
    setSlug(nuevoSlug);
    const vehiculo = vehiculos.find((v) => v.slug === nuevoSlug);
    if (vehiculo) {
      setPrecio(vehiculo.precio);
      setCuotaInicial(Math.round((vehiculo.precio * cuotaInicialSugeridaPct) / 100));
    }
  }

  const minima = cuotaInicialMinima(precio);
  const inicialValida = Math.min(Math.max(cuotaInicial, minima), precio - 1_000_000);

  const resultado = useMemo(
    () =>
      calcularCredito({
        precio,
        cuotaInicial: inicialValida,
        plazoMeses: plazo,
        tasaMensual: tasa,
      }),
    [precio, inicialValida, plazo, tasa],
  );

  const vehiculoElegido = vehiculos.find((v) => v.slug === slug);
  const nombreVehiculo = vehiculoElegido
    ? `${vehiculoElegido.marca} ${vehiculoElegido.linea} ${vehiculoElegido.version} ${vehiculoElegido.anio}`
    : null;

  const mensaje = [
    `*Simulación de crédito* — ${siteConfig.nombre}`,
    "",
    "Hola, hice esta simulación en la página y quiero solicitar el crédito:",
    "",
    nombreVehiculo ? `• Vehículo: ${nombreVehiculo}` : null,
    `• Precio: ${formatearPesos(precio)}`,
    `• Cuota inicial: ${formatearPesos(inicialValida)}`,
    `• Monto a financiar: ${formatearPesos(resultado.montoFinanciado)}`,
    `• Plazo: ${plazo} meses`,
    `• Tasa usada: ${formatearPorcentaje(tasa)} mensual`,
    `• Cuota mensual estimada: ${formatearPesos(resultado.cuotaMensual)}`,
    "",
    "¿Me ayudan con el estudio de crédito?",
  ]
    .filter((linea) => linea !== null)
    .join("\n");

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_23rem] lg:items-start">
      {/* Controles */}
      <div className="rounded-card border border-arena-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-marca-900">Arma tu crédito</h2>

        <div className="mt-6 space-y-6">
          {vehiculos.length > 0 && (
            <div>
              <label htmlFor="sim-vehiculo" className={CLASES_ETIQUETA}>
                Vehículo del catálogo{" "}
                <span className="font-normal text-arena-500">(opcional)</span>
              </label>
              <select
                id="sim-vehiculo"
                value={slug}
                onChange={(e) => escogerVehiculo(e.target.value)}
                className={CLASES_CAMPO}
              >
                <option value="">Escribir un precio manualmente</option>
                {vehiculos.map((v) => (
                  <option key={v.slug} value={v.slug}>
                    {v.marca} {v.linea} {v.anio} — {formatearPesos(v.precio)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="sim-precio" className={CLASES_ETIQUETA}>
              Precio del vehículo
            </label>
            <input
              id="sim-precio"
              type="number"
              inputMode="numeric"
              min={5_000_000}
              step={500_000}
              value={precio}
              onChange={(e) => setPrecio(Math.max(5_000_000, Number(e.target.value) || 0))}
              className={CLASES_CAMPO}
            />
            <p className="mt-1.5 text-sm text-arena-600">{formatearPesos(precio)}</p>
          </div>

          <div>
            <label htmlFor="sim-inicial" className={CLASES_ETIQUETA}>
              Cuota inicial
            </label>
            <input
              id="sim-inicial"
              type="range"
              min={minima}
              max={Math.max(minima, precio - 1_000_000)}
              step={500_000}
              value={inicialValida}
              onChange={(e) => setCuotaInicial(Number(e.target.value))}
              className="w-full accent-marca-800"
              aria-describedby="sim-inicial-valor"
            />
            <p
              id="sim-inicial-valor"
              className="mt-1.5 flex items-baseline justify-between text-sm"
            >
              <span className="font-semibold text-arena-900">
                {formatearPesos(inicialValida)}
              </span>
              <span className="text-arena-600">
                {Math.round((inicialValida / precio) * 100)} % del precio
              </span>
            </p>
          </div>

          <div>
            <label htmlFor="sim-plazo" className={CLASES_ETIQUETA}>
              Plazo
            </label>
            <input
              id="sim-plazo"
              type="range"
              min={plazoMinimoMeses}
              max={plazoMaximoMeses}
              step={12}
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full accent-marca-800"
              aria-describedby="sim-plazo-valor"
            />
            <p id="sim-plazo-valor" className="mt-1.5 text-sm font-semibold text-arena-900">
              {plazo} meses ({Math.round((plazo / 12) * 10) / 10} años)
            </p>
          </div>

          <div>
            <label htmlFor="sim-tasa" className={CLASES_ETIQUETA}>
              Tasa mensual
            </label>
            <input
              id="sim-tasa"
              type="range"
              min={tasaMensualMinima}
              max={tasaMensualMaxima}
              step={0.05}
              value={tasa}
              onChange={(e) => setTasa(Number(e.target.value))}
              className="w-full accent-marca-800"
              aria-describedby="sim-tasa-valor"
            />
            <p id="sim-tasa-valor" className="mt-1.5 text-sm text-arena-900">
              <span className="font-semibold">{formatearPorcentaje(tasa)} mensual</span>
              <span className="text-arena-600">
                {" "}
                · {formatearPorcentaje(resultado.tasaEfectivaAnual, 1)} efectivo anual
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Resultado */}
      <div className="lg:sticky lg:top-24">
        <div className="trama-marca rounded-card p-6 sm:p-7">
          <p className="text-sm font-semibold tracking-wider text-acento-300 uppercase">
            Cuota mensual estimada
          </p>
          <p
            aria-live="polite"
            className="mt-2 text-4xl font-bold text-arena-50 sm:text-[2.75rem]"
          >
            {formatearPesos(resultado.cuotaMensual)}
          </p>

          <dl className="mt-6 space-y-3 border-t border-marca-800 pt-5 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-arena-400">Monto financiado</dt>
              <dd className="font-semibold text-arena-100">
                {formatearPesos(resultado.montoFinanciado)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-arena-400">Total a pagar</dt>
              <dd className="font-semibold text-arena-100">
                {formatearPesos(resultado.totalAPagar)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-arena-400">Total intereses</dt>
              <dd className="font-semibold text-acento-300">
                {formatearPesos(resultado.totalIntereses)}
              </dd>
            </div>
          </dl>

          <a
            href={construirEnlaceWhatsApp(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-acento-500 px-6 py-3.5 font-semibold text-arena-950 transition-colors hover:bg-acento-400"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            Enviar esta simulación
          </a>
        </div>

        <div className="mt-4 flex gap-3 rounded-card border border-acento-300 bg-acento-50 p-4">
          <AlertTriangle
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-acento-700"
          />
          <p className="text-sm leading-relaxed text-acento-900">
            <strong>Esto es un estimado, no una aprobación de crédito.</strong> La
            cuota real depende del estudio que haga la entidad financiera según tu
            perfil, y puede incluir seguros y costos de administración no
            contemplados aquí.
          </p>
        </div>
      </div>
    </div>
  );
}
