import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, MessageCircle, Repeat, Wallet } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import Insignia from "@/components/ui/Insignia";
import { BotonEnlace } from "@/components/ui/Boton";
import GaleriaVehiculo from "@/components/vehiculos/GaleriaVehiculo";
import TarjetaVehiculo from "@/components/vehiculos/TarjetaVehiculo";
import { siteConfig } from "@/config/site";
import { cuotaEstimada } from "@/lib/financiacion";
import {
  formatearCilindraje,
  formatearFecha,
  formatearKilometraje,
  formatearPesos,
} from "@/lib/formato";
import { jsonLdMigas, jsonLdVehiculo } from "@/lib/jsonld";
import { construirEnlaceWhatsApp } from "@/lib/leads";
import { etiquetas } from "@/lib/schemas";
import {
  obtenerRelacionados,
  obtenerSlugsVehiculos,
  obtenerVehiculoPorSlug,
} from "@/lib/vehiculos";

/** Obligatorio con output: "export": prerenderiza una ficha por vehículo. */
export async function generateStaticParams() {
  const slugs = await obtenerSlugsVehiculos();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehiculo = await obtenerVehiculoPorSlug(slug);

  if (!vehiculo) {
    return { title: "Vehículo no encontrado" };
  }

  const titulo = `${vehiculo.marca} ${vehiculo.linea} ${vehiculo.version} ${vehiculo.anio}`;
  const descripcion = `${titulo} por ${formatearPesos(vehiculo.precio)}. ${formatearKilometraje(vehiculo.kilometraje)}, ${etiquetas.transmision[vehiculo.transmision].toLowerCase()}, ${etiquetas.combustible[vehiculo.combustible].toLowerCase()}. Financiación y trámites incluidos en el Valle de Aburrá.`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: `/vehiculos/${vehiculo.slug}` },
    openGraph: {
      title: `${titulo} · ${siteConfig.nombre}`,
      description: descripcion,
      url: `/vehiculos/${vehiculo.slug}`,
      images: [{ url: vehiculo.imagenes[0].src, alt: vehiculo.imagenes[0].alt }],
    },
  };
}

export default async function PaginaDetalleVehiculo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehiculo = await obtenerVehiculoPorSlug(slug);

  if (!vehiculo) notFound();

  const relacionados = await obtenerRelacionados(slug, 3);

  const titulo = `${vehiculo.marca} ${vehiculo.linea}`;
  const tituloCompleto = `${titulo} ${vehiculo.version} ${vehiculo.anio}`.trim();
  const cuota = cuotaEstimada(vehiculo.precio);
  const { cuotaInicialSugeridaPct, plazoPorDefectoMeses, tasaMensualPorDefecto } =
    siteConfig.financiacion;
  const cuotaInicial = Math.round((vehiculo.precio * cuotaInicialSugeridaPct) / 100);

  const enlaceConsulta = construirEnlaceWhatsApp(
    `Hola, me interesa el *${tituloCompleto}* que vi en la página (${formatearPesos(vehiculo.precio)}).\n${siteConfig.url}/vehiculos/${vehiculo.slug}/\n\n¿Sigue disponible?`,
  );

  const enlaceRetoma = construirEnlaceWhatsApp(
    `Hola, me interesa el *${tituloCompleto}* y quiero ofrecer mi carro actual en retoma como parte de pago.\n${siteConfig.url}/vehiculos/${vehiculo.slug}/`,
  );

  const FICHA: { etiqueta: string; valor: string }[] = [
    { etiqueta: "Marca", valor: vehiculo.marca },
    { etiqueta: "Línea", valor: vehiculo.linea },
    { etiqueta: "Versión", valor: vehiculo.version || "No especificada" },
    { etiqueta: "Modelo", valor: String(vehiculo.anio) },
    { etiqueta: "Kilometraje", valor: formatearKilometraje(vehiculo.kilometraje) },
    { etiqueta: "Transmisión", valor: etiquetas.transmision[vehiculo.transmision] },
    { etiqueta: "Combustible", valor: etiquetas.combustible[vehiculo.combustible] },
    { etiqueta: "Carrocería", valor: etiquetas.carroceria[vehiculo.carroceria] },
    { etiqueta: "Cilindraje", valor: formatearCilindraje(vehiculo.cilindraje) },
    { etiqueta: "Tracción", valor: vehiculo.traccion },
    { etiqueta: "Puertas", valor: String(vehiculo.puertas) },
    { etiqueta: "Color", valor: vehiculo.color || "No especificado" },
    {
      etiqueta: "Pico y placa",
      valor:
        vehiculo.placa_termina_en !== null
          ? `Placa termina en ${vehiculo.placa_termina_en}`
          : "No especificado",
    },
    { etiqueta: "Procedencia", valor: etiquetas.origen[vehiculo.origen] },
    { etiqueta: "Publicado", valor: formatearFecha(vehiculo.publicado_en) },
  ];

  return (
    <>
      <JsonLd datos={jsonLdVehiculo(vehiculo)} />
      <JsonLd
        datos={jsonLdMigas([
          { nombre: "Inicio", href: "/" },
          { nombre: "Vehículos", href: "/vehiculos" },
          { nombre: tituloCompleto, href: `/vehiculos/${vehiculo.slug}` },
        ])}
      />

      <div className="contenedor-sitio py-6">
        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-hueso/60">
            <li>
              <Link href="/" className="hover:text-celeste">
                Inicio
              </Link>
            </li>
            <ChevronRight aria-hidden="true" className="size-4 text-hueso/55" />
            <li>
              <Link href="/vehiculos" className="hover:text-celeste">
                Vehículos
              </Link>
            </li>
            <ChevronRight aria-hidden="true" className="size-4 text-hueso/55" />
            <li aria-current="page" className="font-medium text-hueso/85">
              {titulo}
            </li>
          </ol>
        </nav>
      </div>

      <div className="contenedor-sitio pb-16">
        <div className="lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-10">
          <div>
            <GaleriaVehiculo imagenes={vehiculo.imagenes} />
          </div>

          {/* Panel de compra */}
          <div className="mt-8 lg:sticky lg:top-24 lg:mt-0">
            <div className="flex flex-wrap gap-2">
              <Insignia tono={vehiculo.origen === "propio" ? "oscuro" : "acento"}>
                {etiquetas.origen[vehiculo.origen]}
              </Insignia>
              <Insignia tono="contorno">
                {etiquetas.estado[vehiculo.estado]}
              </Insignia>
            </div>

            <h1 className="mt-4 text-3xl leading-tight font-bold text-hueso sm:text-4xl">
              {titulo}
            </h1>
            <p className="mt-2 text-lg text-hueso/60">
              {vehiculo.version} · {vehiculo.anio}
            </p>

            <div className="mt-6 rounded-card border border-celeste/15 bg-panel p-6">
              <p className="cifra text-4xl font-bold text-hueso">
                {formatearPesos(vehiculo.precio)}
              </p>

              <dl className="mt-5 space-y-2 border-t border-celeste/15 pt-5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-hueso/60">Cuota mensual estimada</dt>
                  <dd className="cifra text-lg font-bold text-neon">
                    {formatearPesos(cuota)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-hueso/60">Con cuota inicial de</dt>
                  <dd className="font-medium text-hueso/85">
                    {formatearPesos(cuotaInicial)} ({cuotaInicialSugeridaPct} %)
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-hueso/60">A</dt>
                  <dd className="font-medium text-hueso/85">
                    {plazoPorDefectoMeses} meses ·{" "}
                    {tasaMensualPorDefecto.toString().replace(".", ",")} % mensual
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-xs leading-relaxed text-hueso/50">
                Estimado con fines informativos. No es una oferta ni una aprobación
                de crédito: la cuota final depende del estudio de la entidad
                financiera.{" "}
                <Link
                  href="/financiacion"
                  className="font-medium text-celeste underline underline-offset-2"
                >
                  Simular con mis propios valores
                </Link>
                .
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <BotonEnlace
                  href={enlaceConsulta}
                  variante="acento"
                  tamano="lg"
                  anchoCompleto
                  externo
                >
                  <MessageCircle aria-hidden="true" className="size-5" />
                  Escríbenos por este vehículo
                </BotonEnlace>

                <BotonEnlace
                  href={`/financiacion?vehiculo=${vehiculo.slug}`}
                  variante="primario"
                  anchoCompleto
                >
                  <Wallet aria-hidden="true" className="size-5" />
                  Solicitar financiación
                </BotonEnlace>

                <BotonEnlace
                  href={enlaceRetoma}
                  variante="contorno"
                  anchoCompleto
                  externo
                >
                  <Repeat aria-hidden="true" className="size-5" />
                  Ofrecer mi carro en retoma
                </BotonEnlace>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción, ficha técnica y equipamiento */}
        <div className="mt-14 lg:grid lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <div>
            <section aria-labelledby="titulo-descripcion">
              <h2
                id="titulo-descripcion"
                className="text-2xl font-bold text-hueso"
              >
                Sobre este vehículo
              </h2>
              <p className="mt-4 leading-relaxed text-hueso/75">
                {vehiculo.descripcion}
              </p>
            </section>

            <section aria-labelledby="titulo-ficha" className="mt-12">
              <h2 id="titulo-ficha" className="text-2xl font-bold text-hueso">
                Ficha técnica
              </h2>
              <dl className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {FICHA.map((fila) => (
                  <div
                    key={fila.etiqueta}
                    className="flex items-baseline justify-between gap-4 border-b border-celeste/15 py-3"
                  >
                    <dt className="text-sm text-hueso/60">{fila.etiqueta}</dt>
                    <dd className="text-right text-sm font-medium text-hueso">
                      {fila.valor}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <section aria-labelledby="titulo-equipamiento" className="mt-12 lg:mt-0">
            <h2
              id="titulo-equipamiento"
              className="text-2xl font-bold text-hueso"
            >
              Equipamiento
            </h2>
            <ul className="mt-5 space-y-3">
              {vehiculo.caracteristicas.map((caracteristica) => (
                <li key={caracteristica} className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-neon"
                  />
                  <span className="text-hueso/85">{caracteristica}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-card bg-teal/30 p-6">
              <h3 className="font-bold text-hueso">
                ¿Quieres verlo antes de decidir?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-hueso/75">
                Te enviamos fotos y videos adicionales, hacemos una videollamada o
                coordinamos una revisión con el mecánico de tu confianza. Sin
                compromiso.
              </p>
              <BotonEnlace
                href={enlaceConsulta}
                variante="primario"
                tamano="sm"
                className="mt-4"
                externo
              >
                Pedir más información
              </BotonEnlace>
            </div>
          </section>
        </div>

        {relacionados.length > 0 && (
          <section aria-labelledby="titulo-relacionados" className="mt-16">
            <h2
              id="titulo-relacionados"
              className="text-2xl font-bold text-hueso"
            >
              También te puede interesar
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((otro) => (
                <li key={otro.slug}>
                  <TarjetaVehiculo vehiculo={otro} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
