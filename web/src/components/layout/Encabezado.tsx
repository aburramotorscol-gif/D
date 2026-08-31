"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { enlaceWhatsAppDirecto } from "@/lib/leads";
import Logo from "@/components/layout/Logo";

/**
 * Isla de cliente: solo por el menú desplegable de móvil y por marcar la ruta
 * activa. El resto del sitio se renderiza en el servidor.
 */

const NAVEGACION = [
  { href: "/vehiculos", texto: "Vehículos" },
  { href: "/vender", texto: "Vender mi carro" },
  { href: "/financiacion", texto: "Financiación" },
  { href: "/seguros", texto: "Seguros" },
  { href: "/tramites", texto: "Trámites" },
  { href: "/consignacion", texto: "Consignación" },
  { href: "/nosotros", texto: "Nosotros" },
] as const;

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();

  // El menú se cierra en el onClick de cada enlace, no en un efecto sobre la
  // ruta: hacerlo con useEffect provoca un render en cascada innecesario.

  // Bloquea el scroll del fondo mientras el menú está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const esActiva = (href: string) => ruta === href || ruta.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-celeste/15 bg-fondo/95 backdrop-blur supports-[backdrop-filter]:bg-fondo/80">
      <div className="contenedor-sitio flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${siteConfig.nombre}, ir al inicio`}
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAVEGACION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={esActiva(item.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                esActiva(item.href)
                  ? "bg-teal/30 text-hueso"
                  : "text-hueso/75 hover:bg-panel hover:text-hueso"
              }`}
            >
              {item.texto}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={enlaceWhatsAppDirecto("quiero información sobre sus vehículos.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-hueso transition-colors hover:bg-panel sm:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4" />
            Escríbenos
          </a>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            className="inline-flex size-11 items-center justify-center rounded-full text-hueso hover:bg-panel lg:hidden"
          >
            <span className="sr-only">
              {abierto ? "Cerrar el menú" : "Abrir el menú"}
            </span>
            {abierto ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </div>

      {abierto && (
        <div
          id="menu-movil"
          className="border-t border-celeste/15 bg-fondo lg:hidden"
        >
          <nav aria-label="Navegación móvil" className="contenedor-sitio py-4">
            <ul className="flex flex-col gap-1">
              {NAVEGACION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAbierto(false)}
                    aria-current={esActiva(item.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      esActiva(item.href)
                        ? "bg-teal/30 text-hueso"
                        : "text-hueso/85 hover:bg-panel"
                    }`}
                  >
                    {item.texto}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/contacto"
                  onClick={() => setAbierto(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-hueso/85 hover:bg-panel"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
