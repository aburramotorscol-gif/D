/**
 * Formateo para Colombia. Se usa en servidor y en cliente, así que no puede
 * depender de nada del entorno.
 */

const FORMATO_PESOS = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const FORMATO_NUMERO = new Intl.NumberFormat("es-CO", {
  maximumFractionDigits: 0,
});

/**
 * Precio en pesos con el formato que se usa en Colombia: `$ 45.900.000`.
 *
 * Intl produce "$ 45.900.000" con un espacio duro; lo normalizamos a un
 * espacio fino no separable para que no parta de línea en móvil.
 */
export function formatearPesos(valor: number): string {
  return FORMATO_PESOS.format(valor).replace(/ /g, " ");
}

/** Versión compacta para tarjetas apretadas: `$ 45,9 M`. */
export function formatearPesosCompacto(valor: number): string {
  if (valor >= 1_000_000) {
    const millones = valor / 1_000_000;
    const texto = millones % 1 === 0 ? millones.toFixed(0) : millones.toFixed(1);
    return `$ ${texto.replace(".", ",")} M`;
  }
  return formatearPesos(valor);
}

/** Kilometraje con separador de miles: `48.500 km`. */
export function formatearKilometraje(km: number): string {
  return `${FORMATO_NUMERO.format(km)} km`;
}

/** Número entero con separador de miles. */
export function formatearNumero(valor: number): string {
  return FORMATO_NUMERO.format(valor);
}

/** Cilindraje: `1.598 cc`. */
export function formatearCilindraje(cc: number): string {
  return cc > 0 ? `${FORMATO_NUMERO.format(cc)} cc` : "No especificado";
}

/** Fecha AAAA-MM-DD a texto legible: `18 de agosto de 2026`. */
export function formatearFecha(iso: string): string {
  const [anio, mes, dia] = iso.split("-").map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(fecha);
}

/** Porcentaje con una decimal cuando hace falta: `1,45 %`. */
export function formatearPorcentaje(valor: number, decimales = 2): string {
  return `${valor.toFixed(decimales).replace(".", ",")} %`;
}
