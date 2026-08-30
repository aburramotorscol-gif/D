import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";

import Logo from "@/components/layout/Logo";
import { servicios, siteConfig } from "@/config/site";
import { enlaceWhatsAppDirecto } from "@/lib/leads";

const REDES = [
  { clave: "instagram", nombre: "Instagram" },
  { clave: "facebook", nombre: "Facebook" },
  { clave: "tiktok", nombre: "TikTok" },
  { clave: "youtube", nombre: "YouTube" },
] as const;

export default function PieDePagina() {
  const anio = new Date().getFullYear();
  const redesActivas = REDES.filter(
    (red) => typeof siteConfig.redes[red.clave] === "string",
  );

  return (
    <footer className="mt-auto bg-marca-950 text-arena-300">
      <div className="contenedor-sitio py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca y contacto */}
          <div className="lg:col-span-1">
            <Logo claro />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-arena-400">
              Compraventa de vehículos 100 % virtual. Compra, vende y financia sin
              desplazarte por todo el {siteConfig.region}.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={enlaceWhatsAppDirecto("quiero información.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-arena-200 hover:text-acento-300"
                >
                  <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
                  {siteConfig.whatsappVisible}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-arena-200 hover:text-acento-300"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-arena-400">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  {siteConfig.ciudad} y todo el {siteConfig.region},{" "}
                  {siteConfig.departamento}
                </span>
              </li>
              <li className="flex items-start gap-2 text-arena-400">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.horarios.texto}</span>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <nav aria-labelledby="pie-servicios">
            <h2
              id="pie-servicios"
              className="text-sm font-semibold tracking-wider text-arena-50 uppercase"
            >
              Servicios
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={servicio.href}
                    className="text-arena-400 transition-colors hover:text-acento-300"
                  >
                    {servicio.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navegación */}
          <nav aria-labelledby="pie-sitio">
            <h2
              id="pie-sitio"
              className="text-sm font-semibold tracking-wider text-arena-50 uppercase"
            >
              El sitio
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/vehiculos" className="text-arena-400 hover:text-acento-300">
                  Catálogo de vehículos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-arena-400 hover:text-acento-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-arena-400 hover:text-acento-300">
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-datos"
                  className="text-arena-400 hover:text-acento-300"
                >
                  Política de tratamiento de datos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-arena-400 hover:text-acento-300">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </nav>

          {/* Cobertura y redes */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-arena-50 uppercase">
              Cobertura
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-arena-400">
              {siteConfig.cobertura.join(" · ")}
            </p>

            {redesActivas.length > 0 && (
              <>
                <h2 className="mt-8 text-sm font-semibold tracking-wider text-arena-50 uppercase">
                  Síguenos
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {redesActivas.map((red) => (
                    <li key={red.clave}>
                      <a
                        href={siteConfig.redes[red.clave] as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-marca-800 px-3.5 py-1.5 text-xs font-medium text-arena-300 transition-colors hover:border-acento-500 hover:text-acento-300"
                      >
                        {red.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-marca-900 pt-8">
          <p className="text-xs leading-relaxed text-arena-500">
            © {anio} {siteConfig.nombre}. Todos los derechos reservados.{" "}
            {siteConfig.ciudad}, {siteConfig.departamento}, {siteConfig.pais}.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-arena-500">
            Los precios publicados están sujetos a verificación y disponibilidad. Las
            cuotas del simulador son estimados con fines informativos y no constituyen
            una oferta ni una aprobación de crédito. El otorgamiento del crédito
            depende del estudio de cada entidad financiera.
          </p>
        </div>
      </div>
    </footer>
  );
}
