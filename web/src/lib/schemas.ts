import { z } from "zod";

/**
 * Esquemas Zod del dominio.
 *
 * Son el contrato entre los datos y las vistas. Hoy validan los JSON locales
 * de `src/data/vehiculos/`; cuando el catálogo venga de la API (fase 2) van a
 * validar exactamente la misma forma, porque los nombres de campo coinciden
 * con los de `api/app/schemas/vehiculo.py`.
 */

export const transmisionSchema = z.enum(["manual", "automatica"]);
export const combustibleSchema = z.enum([
  "gasolina",
  "diesel",
  "hibrido",
  "electrico",
  "gas",
]);
export const carroceriaSchema = z.enum([
  "sedan",
  "hatchback",
  "suv",
  "pickup",
  "camioneta",
  "van",
]);
export const origenSchema = z.enum(["propio", "consignacion"]);
export const estadoVehiculoSchema = z.enum(["disponible", "reservado", "vendido"]);

export const imagenSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1),
});

export const vehiculoSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "El slug solo admite minúsculas, números y guiones"),
  marca: z.string().min(1),
  linea: z.string().min(1),
  version: z.string().default(""),
  anio: z.number().int().min(1950).max(2100),
  precio: z.number().int().nonnegative(),
  kilometraje: z.number().int().nonnegative(),
  transmision: transmisionSchema,
  combustible: combustibleSchema,
  carroceria: carroceriaSchema,
  color: z.string().default(""),
  puertas: z.number().int().min(2).max(7).default(5),
  cilindraje: z.number().int().nonnegative().default(0),
  traccion: z.string().default("4x2"),
  placa_termina_en: z.number().int().min(0).max(9).nullable().default(null),
  origen: origenSchema.default("propio"),
  estado: estadoVehiculoSchema.default("disponible"),
  destacado: z.boolean().default(false),
  descripcion: z.string().default(""),
  caracteristicas: z.array(z.string()).default([]),
  imagenes: z.array(imagenSchema).min(1, "Cada vehículo necesita al menos una imagen"),
  publicado_en: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato AAAA-MM-DD"),
});

export type Transmision = z.infer<typeof transmisionSchema>;
export type Combustible = z.infer<typeof combustibleSchema>;
export type Carroceria = z.infer<typeof carroceriaSchema>;
export type Origen = z.infer<typeof origenSchema>;
export type EstadoVehiculo = z.infer<typeof estadoVehiculoSchema>;
export type Imagen = z.infer<typeof imagenSchema>;
export type Vehiculo = z.infer<typeof vehiculoSchema>;

/** Etiquetas legibles, para no repetir los `switch` por toda la interfaz. */
export const etiquetas = {
  transmision: {
    manual: "Mecánica",
    automatica: "Automática",
  } satisfies Record<Transmision, string>,

  combustible: {
    gasolina: "Gasolina",
    diesel: "Diésel",
    hibrido: "Híbrido",
    electrico: "Eléctrico",
    gas: "Gas",
  } satisfies Record<Combustible, string>,

  carroceria: {
    sedan: "Sedán",
    hatchback: "Hatchback",
    suv: "SUV",
    pickup: "Pick-up",
    camioneta: "Camioneta",
    van: "Van",
  } satisfies Record<Carroceria, string>,

  origen: {
    propio: "Inventario propio",
    consignacion: "En consignación",
  } satisfies Record<Origen, string>,

  estado: {
    disponible: "Disponible",
    reservado: "Reservado",
    vendido: "Vendido",
  } satisfies Record<EstadoVehiculo, string>,
} as const;
