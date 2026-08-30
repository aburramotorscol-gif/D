import type { NextConfig } from "next";

/**
 * Fase 1: export estatico para publicar en GitHub Pages sin costo de servidor.
 *
 * El repositorio se llama "AburraMotors", asi que el sitio queda publicado en
 * https://cbaldor19.github.io/AburraMotors y necesita basePath/assetPrefix.
 * Se controla con NEXT_PUBLIC_BASE_PATH para que `npm run dev` siga sirviendo
 * en la raiz (http://localhost:3000) y solo el build de CI use el prefijo.
 *
 * Para migrar a Vercel o a un servidor propio, ver README.md -> "De export
 * estatico a servidor".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",

  // GitHub Pages sirve directorios: /vehiculos/ -> /vehiculos/index.html
  trailingSlash: true,

  basePath,
  assetPrefix: basePath || undefined,

  images: {
    // Obligatorio con output: "export": no hay servidor que optimice imagenes.
    unoptimized: true,
  },

  typescript: {
    // Un error de tipos rompe el build a proposito: no se publica codigo roto.
    ignoreBuildErrors: false,
  },
  // Next 16 ya no acepta la clave `eslint` aqui. El lint corre aparte
  // (`npm run lint`) y esta en el workflow de CI.
};

export default nextConfig;
