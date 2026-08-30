import { siteConfig } from "@/config/site";

/**
 * Simulador de crédito: amortización francesa (cuota fija).
 *
 * Es la misma fórmula que implementa el backend en
 * `api/app/services/amortizacion.py`. Si cambias una, cambia la otra: hay un
 * test en `api/tests/test_simulaciones.py` que fija los valores esperados.
 *
 * IMPORTANTE: el resultado es un ESTIMADO con fines informativos. No
 * constituye una oferta ni una aprobación de crédito.
 */

export interface EntradaCredito {
  /** Precio del vehículo en pesos. */
  precio: number;
  /** Cuota inicial en pesos. */
  cuotaInicial: number;
  /** Plazo en meses. */
  plazoMeses: number;
  /** Tasa mensual en porcentaje (ej. 1.45 para 1,45 % mensual). */
  tasaMensual: number;
}

export interface ResultadoCredito {
  montoFinanciado: number;
  cuotaMensual: number;
  totalAPagar: number;
  totalIntereses: number;
  /** Tasa efectiva anual equivalente, para poder comparar ofertas. */
  tasaEfectivaAnual: number;
}

/**
 * cuota = P · i / (1 − (1 + i)^−n)
 *
 * donde P es el monto financiado, i la tasa mensual en tanto por uno y n el
 * plazo en meses. Con tasa 0 la cuota es simplemente P / n.
 *
 * Todo se redondea a pesos enteros: en Colombia no se factura con centavos.
 */
export function calcularCredito({
  precio,
  cuotaInicial,
  plazoMeses,
  tasaMensual,
}: EntradaCredito): ResultadoCredito {
  const montoFinanciado = Math.max(0, Math.round(precio - cuotaInicial));
  const meses = Math.max(1, Math.round(plazoMeses));
  const i = Math.max(0, tasaMensual) / 100;

  const cuotaExacta =
    i === 0
      ? montoFinanciado / meses
      : (montoFinanciado * i) / (1 - Math.pow(1 + i, -meses));

  const cuotaMensual = Math.round(cuotaExacta);
  const totalAPagar = cuotaMensual * meses;

  return {
    montoFinanciado,
    cuotaMensual,
    totalAPagar,
    totalIntereses: totalAPagar - montoFinanciado,
    tasaEfectivaAnual: (Math.pow(1 + i, 12) - 1) * 100,
  };
}

/**
 * Cuota estimada de un vehículo con los valores por defecto del sitio.
 * Se usa en las tarjetas del catálogo y en la ficha de detalle.
 */
export function cuotaEstimada(precio: number): number {
  const { cuotaInicialSugeridaPct, plazoPorDefectoMeses, tasaMensualPorDefecto } =
    siteConfig.financiacion;

  return calcularCredito({
    precio,
    cuotaInicial: Math.round((precio * cuotaInicialSugeridaPct) / 100),
    plazoMeses: plazoPorDefectoMeses,
    tasaMensual: tasaMensualPorDefecto,
  }).cuotaMensual;
}

/** Cuota inicial mínima admitida por el simulador, en pesos. */
export function cuotaInicialMinima(precio: number): number {
  const { porcentajeMaximoFinanciable } = siteConfig.financiacion;
  return Math.round((precio * (100 - porcentajeMaximoFinanciable)) / 100);
}
