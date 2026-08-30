import "server-only";

import { vehiculoSchema, type Vehiculo } from "@/lib/schemas";

/**
 * Acceso a datos del catálogo. ÚNICO punto que sabe de dónde salen los vehículos.
 *
 * Hoy: archivos JSON locales en `src/data/vehiculos/`, leídos e importados en
 * tiempo de build (el sitio es un export estático).
 *
 * Mañana (fase 2): estas mismas funciones harán `fetch` contra
 * `GET /vehiculos` y `GET /vehiculos/{slug}` del backend FastAPI. Las firmas ya
 * son asíncronas y devuelven exactamente lo mismo, así que cambiar la fuente
 * NO obliga a tocar ninguna vista. Ver README -> "De export estático a servidor".
 */

// import.meta.glob no existe en Next; usamos require.context vía import estático.
// La lista explícita mantiene el build determinista y falla fuerte si un JSON
// no cumple el esquema.
import chevroletOnix from "@/data/vehiculos/chevrolet-onix-turbo-rs-2022.json";
import chevroletTracker from "@/data/vehiculos/chevrolet-tracker-premier-2023.json";
import kiaPicanto from "@/data/vehiculos/kia-picanto-ion-2021.json";
import mazda3 from "@/data/vehiculos/mazda-3-grand-touring-2020.json";
import nissanKicks from "@/data/vehiculos/nissan-kicks-advance-2022.json";
import renaultDuster from "@/data/vehiculos/renault-duster-intens-2021.json";
import renaultLogan from "@/data/vehiculos/renault-logan-life-2020.json";
import toyotaHilux from "@/data/vehiculos/toyota-hilux-4x4-2019.json";

const CRUDOS: unknown[] = [
  renaultDuster,
  mazda3,
  chevroletOnix,
  toyotaHilux,
  kiaPicanto,
  nissanKicks,
  chevroletTracker,
  renaultLogan,
];

/**
 * Valida una sola vez al arrancar el build. Si un JSON está mal, el build
 * falla con un mensaje claro en vez de romper en tiempo de render.
 */
function cargarInventario(): Vehiculo[] {
  return CRUDOS.map((crudo, indice) => {
    const resultado = vehiculoSchema.safeParse(crudo);
    if (!resultado.success) {
      const detalle = resultado.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(
        `El vehículo en la posición ${indice} de src/data/vehiculos no es válido -> ${detalle}`,
      );
    }
    return resultado.data;
  });
}

const INVENTARIO: Vehiculo[] = cargarInventario();

// ---------------------------------------------------------------------------
// API pública del módulo
// ---------------------------------------------------------------------------

export type OrdenCatalogo = "recientes" | "precio_asc" | "precio_desc";

export interface FiltrosVehiculos {
  marca?: string;
  precioMin?: number;
  precioMax?: number;
  anioMin?: number;
  anioMax?: number;
  kmMax?: number;
  transmision?: Vehiculo["transmision"];
  combustible?: Vehiculo["combustible"];
  carroceria?: Vehiculo["carroceria"];
  origen?: Vehiculo["origen"];
  destacado?: boolean;
  orden?: OrdenCatalogo;
}

function ordenar(lista: Vehiculo[], orden: OrdenCatalogo): Vehiculo[] {
  const copia = [...lista];
  switch (orden) {
    case "precio_asc":
      return copia.sort((a, b) => a.precio - b.precio);
    case "precio_desc":
      return copia.sort((a, b) => b.precio - a.precio);
    case "recientes":
    default:
      return copia.sort((a, b) => b.publicado_en.localeCompare(a.publicado_en));
  }
}

/** Todos los vehículos disponibles, aplicando filtros opcionales. */
export async function obtenerVehiculos(
  filtros: FiltrosVehiculos = {},
): Promise<Vehiculo[]> {
  const {
    marca,
    precioMin,
    precioMax,
    anioMin,
    anioMax,
    kmMax,
    transmision,
    combustible,
    carroceria,
    origen,
    destacado,
    orden = "recientes",
  } = filtros;

  const filtrados = INVENTARIO.filter((v) => {
    if (v.estado !== "disponible") return false;
    if (marca && v.marca.toLowerCase() !== marca.toLowerCase()) return false;
    if (precioMin !== undefined && v.precio < precioMin) return false;
    if (precioMax !== undefined && v.precio > precioMax) return false;
    if (anioMin !== undefined && v.anio < anioMin) return false;
    if (anioMax !== undefined && v.anio > anioMax) return false;
    if (kmMax !== undefined && v.kilometraje > kmMax) return false;
    if (transmision && v.transmision !== transmision) return false;
    if (combustible && v.combustible !== combustible) return false;
    if (carroceria && v.carroceria !== carroceria) return false;
    if (origen && v.origen !== origen) return false;
    if (destacado !== undefined && v.destacado !== destacado) return false;
    return true;
  });

  return ordenar(filtrados, orden);
}

/** Un vehículo por su slug, o null si no existe. */
export async function obtenerVehiculoPorSlug(
  slug: string,
): Promise<Vehiculo | null> {
  return INVENTARIO.find((v) => v.slug === slug) ?? null;
}

/** Slugs de todos los vehículos, para `generateStaticParams`. */
export async function obtenerSlugsVehiculos(): Promise<string[]> {
  return INVENTARIO.map((v) => v.slug);
}

/** Los vehículos marcados como destacados, para la home. */
export async function obtenerDestacados(limite = 6): Promise<Vehiculo[]> {
  const destacados = await obtenerVehiculos({ destacado: true });
  return destacados.slice(0, limite);
}

/** Marcas con inventario disponible, ordenadas alfabéticamente. */
export async function obtenerMarcas(): Promise<string[]> {
  const marcas = new Set(
    INVENTARIO.filter((v) => v.estado === "disponible").map((v) => v.marca),
  );
  return [...marcas].sort((a, b) => a.localeCompare(b, "es"));
}

/** Rango de precios del inventario, para calibrar el filtro de precio. */
export async function obtenerRangoPrecios(): Promise<{ min: number; max: number }> {
  const precios = INVENTARIO.filter((v) => v.estado === "disponible").map(
    (v) => v.precio,
  );
  if (precios.length === 0) return { min: 0, max: 0 };
  return { min: Math.min(...precios), max: Math.max(...precios) };
}

/** Rango de años del inventario, para el filtro de año. */
export async function obtenerRangoAnios(): Promise<{ min: number; max: number }> {
  const anios = INVENTARIO.filter((v) => v.estado === "disponible").map((v) => v.anio);
  if (anios.length === 0) {
    const actual = new Date().getFullYear();
    return { min: actual, max: actual };
  }
  return { min: Math.min(...anios), max: Math.max(...anios) };
}

/**
 * Vehículos relacionados: misma carrocería o marca, excluyendo el actual.
 * Se usa al pie de la ficha de detalle.
 */
export async function obtenerRelacionados(
  slug: string,
  limite = 3,
): Promise<Vehiculo[]> {
  const actual = await obtenerVehiculoPorSlug(slug);
  if (!actual) return [];

  const puntuar = (v: Vehiculo) =>
    (v.carroceria === actual.carroceria ? 2 : 0) + (v.marca === actual.marca ? 1 : 0);

  return INVENTARIO.filter((v) => v.slug !== slug && v.estado === "disponible")
    .map((v) => ({ v, puntaje: puntuar(v) }))
    .sort((a, b) => b.puntaje - a.puntaje || a.v.precio - b.v.precio)
    .slice(0, limite)
    .map(({ v }) => v);
}
