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
    <footer className="mt-auto bg-fondo text-hueso/70">
      <div className="contenedor-sitio py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca y contacto */}
          <div className="lg:col-span-1">
            <Logo className="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-hueso/55">
              Compraventa de vehículos 100 % virtual. Compra, vende y financia sin
              desplazarte por todo el {siteConfig.region}.
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href={enlaceWhatsAppDirecto("quiero información.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-hueso/80 hover:text-neon"
                >
                  <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
                  {siteConfig.whatsappVisible}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-hueso/80 hover:text-neon"
                >
                  <Mail aria-hidden="true" className="size-4 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-hueso/55">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  {siteConfig.ciudad} y todo el {siteConfig.region},{" "}
                  {siteConfig.departamento}
                </span>
              </li>
              <li className="flex items-start gap-2 text-hueso/55">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.horarios.texto}</span>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <nav aria-labelledby="pie-servicios">
            <h2
              id="pie-servicios"
              className="text-sm font-semibold tracking-wider text-hueso uppercase"
            >
              Servicios
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {servicios.map((servicio) => (
                <li key={servicio.slug}>
                  <Link
                    href={servicio.href}
                    className="text-hueso/55 transition-colors hover:text-neon"
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
              className="text-sm font-semibold tracking-wider text-hueso uppercase"
            >
              El sitio
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/vehiculos" className="text-hueso/55 hover:text-neon">
                  Catálogo de vehículos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-hueso/55 hover:text-neon">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-hueso/55 hover:text-neon">
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-datos"
                  className="text-hueso/55 hover:text-neon"
                >
                  Política de tratamiento de datos
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-hueso/55 hover:text-neon">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </nav>

          {/* Cobertura y redes */}
          <div>
            <h2 className="text-sm font-semibold tracking-wider text-hueso uppercase">
              Cobertura
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-hueso/55">
              {siteConfig.cobertura.join(" · ")}
            </p>

            {redesActivas.length > 0 && (
              <>
                <h2 className="mt-8 text-sm font-semibold tracking-wider text-hueso uppercase">
                  Síguenos
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {redesActivas.map((red) => (
                    <li key={red.clave}>
                      <a
                        href={siteConfig.redes[red.clave] as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-teal px-3.5 py-1.5 text-xs font-medium text-hueso/70 transition-colors hover:border-neon/50 hover:text-neon"
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

        <div className="mt-12 border-t border-teal pt-8">
          <p className="text-xs leading-relaxed text-hueso/50">
            © {anio} {siteConfig.nombre}. Todos los derechos reservados.{" "}
            {siteConfig.ciudad}, {siteConfig.departamento}, {siteConfig.pais}.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-hueso/50">
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
