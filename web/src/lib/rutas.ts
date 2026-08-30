/**
 * Prefijo de las rutas públicas.
 *
 * Con `output: "export"` e `images.unoptimized: true`, `next/image` NO le
 * antepone el `basePath` al `src`: emite la ruta tal cual. En GitHub Pages el
 * sitio cuelga de /AburraMotors, así que una imagen en `/vehiculos/x/1.svg`
 * daría 404. Este helper la convierte en `/AburraMotors/vehiculos/x/1.svg`.
 *
 * `<Link>` y los recursos de /_next sí reciben el prefijo automáticamente:
 * esto es solo para lo que vive en `public/` y se referencia con una ruta
 * absoluta escrita a mano (las imágenes de los vehículos).
 *
 * NEXT_PUBLIC_BASE_PATH se reemplaza en tiempo de build, así que el valor es
 * el mismo en el servidor y en el cliente y no provoca desajustes de hidratación.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function rutaPublica(ruta: string): string {
  // Las URLs absolutas y las data: URI se dejan intactas.
  if (!ruta.startsWith("/")) return ruta;
  return `${BASE_PATH}${ruta}`;
}
