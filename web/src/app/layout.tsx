import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import BotonWhatsAppFlotante from "@/components/layout/BotonWhatsAppFlotante";
import Encabezado from "@/components/layout/Encabezado";
import PieDePagina from "@/components/layout/PieDePagina";
import JsonLd from "@/components/JsonLd";
import { jsonLdConcesionario } from "@/lib/jsonld";
import { siteConfig } from "@/config/site";

import "./globals.css";

/**
 * Fuentes auto-alojadas desde src/fuentes/.
 *
 * Se descargaron una sola vez de Google Fonts y viven en el repositorio, en
 * lugar de usar next/font/google. Tres razones:
 *   1. El build no depende de que fonts.gstatic.com responda. Ya nos tumbo
 *      una compilacion.
 *   2. El sitio publicado no hace peticiones a servidores de Google, que es
 *      mejor para la privacidad de los visitantes.
 *   3. Menos conexiones externas en el primer render.
 *
 * Son las variables de ambas familias (un archivo cubre de 400 a 700).
 */

// Oswald: titulares, mayusculas, precios y numeros del proceso.
const oswald = localFont({
  src: [
    { path: "../fuentes/oswald-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../fuentes/oswald-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  display: "swap",
  variable: "--fuente-display",
  fallback: ["Arial Narrow", "system-ui", "sans-serif"],
});

// Inter: parrafos, navegacion, botones y campos del buscador.
const inter = localFont({
  src: [
    { path: "../fuentes/inter-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../fuentes/inter-latin-ext.woff2", weight: "400 700", style: "normal" },
  ],
  display: "swap",
  variable: "--fuente-sans",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nombre} — ${siteConfig.eslogan}`,
    template: `%s · ${siteConfig.nombre}`,
  },
  description: siteConfig.descripcion,
  applicationName: siteConfig.nombre,
  keywords: [
    "compraventa de carros Medellín",
    "vehículos usados Valle de Aburrá",
    "financiación de vehículos Colombia",
    "vender mi carro Medellín",
    "consignación de vehículos",
    "seguros y trámites vehiculares",
  ],
  authors: [{ name: siteConfig.nombre }],
  creator: siteConfig.nombre,
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteConfig.url,
    siteName: siteConfig.nombre,
    title: `${siteConfig.nombre} — ${siteConfig.eslogan}`,
    description: siteConfig.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nombre} — ${siteConfig.eslogan}`,
    description: siteConfig.descripcion,
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(siteConfig.googleSiteVerification
    ? { verification: { google: siteConfig.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#0B0D0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${oswald.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-fondo text-hueso antialiased">
        <a href="#contenido" className="salto-contenido">
          Saltar al contenido principal
        </a>

        <JsonLd datos={jsonLdConcesionario()} />

        <Encabezado />

        <main id="contenido" className="flex-1">
          {children}
        </main>

        <PieDePagina />
        <BotonWhatsAppFlotante />
      </body>
    </html>
  );
}
