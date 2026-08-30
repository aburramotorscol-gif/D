import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { obtenerVehiculos } from "@/lib/vehiculos";

/**
 * Sitemap generado en tiempo de build. Con output: "export" se materializa
 * como /sitemap.xml dentro de `out`.
 *
 * Las URLs llevan barra final porque next.config.ts usa trailingSlash: true.
 */
export const dynamic = "force-static";

const PAGINAS_FIJAS: { ruta: string; prioridad: number; frecuencia: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { ruta: "/", prioridad: 1, frecuencia: "daily" },
  { ruta: "/vehiculos", prioridad: 0.9, frecuencia: "daily" },
  { ruta: "/vender", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/financiacion", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/consignacion", prioridad: 0.8, frecuencia: "monthly" },
  { ruta: "/seguros", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/tramites", prioridad: 0.7, frecuencia: "monthly" },
  { ruta: "/nosotros", prioridad: 0.5, frecuencia: "yearly" },
  { ruta: "/contacto", prioridad: 0.6, frecuencia: "yearly" },
  { ruta: "/politica-de-datos", prioridad: 0.2, frecuencia: "yearly" },
  { ruta: "/terminos", prioridad: 0.2, frecuencia: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vehiculos = await obtenerVehiculos();
  const ahora = new Date();

  const fijas: MetadataRoute.Sitemap = PAGINAS_FIJAS.map((pagina) => ({
    url: `${siteConfig.url}${pagina.ruta === "/" ? "/" : `${pagina.ruta}/`}`,
    lastModified: ahora,
    changeFrequency: pagina.frecuencia,
    priority: pagina.prioridad,
  }));

  const fichas: MetadataRoute.Sitemap = vehiculos.map((vehiculo) => ({
    url: `${siteConfig.url}/vehiculos/${vehiculo.slug}/`,
    lastModified: new Date(vehiculo.publicado_en),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...fijas, ...fichas];
}
