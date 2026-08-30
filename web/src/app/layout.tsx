import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import BotonWhatsAppFlotante from "@/components/layout/BotonWhatsAppFlotante";
import Encabezado from "@/components/layout/Encabezado";
import PieDePagina from "@/components/layout/PieDePagina";
import JsonLd from "@/components/JsonLd";
import { jsonLdConcesionario } from "@/lib/jsonld";
import { siteConfig } from "@/config/site";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--fuente-display",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--fuente-sans",
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
  themeColor: "#133531",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${sora.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-arena-50 text-arena-900 antialiased">
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
