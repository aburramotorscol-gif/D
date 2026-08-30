import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { BotonEnlace } from "@/components/ui/Boton";
import { enlaceWhatsAppDirecto } from "@/lib/leads";

export const metadata = {
  title: "Página no encontrada",
};

const ATAJOS = [
  { href: "/vehiculos", texto: "Catálogo de vehículos" },
  { href: "/vender", texto: "Vender mi carro" },
  { href: "/financiacion", texto: "Simulador de crédito" },
  { href: "/contacto", texto: "Contacto" },
] as const;

export default function NoEncontrada() {
  return (
    <div className="trama-marca">
      <div className="contenedor-sitio flex min-h-[65dvh] flex-col justify-center py-20">
        <div className="max-w-2xl">
          <p
            aria-hidden="true"
            className="font-[family-name:var(--font-display)] text-7xl font-bold text-acento-500/80 sm:text-8xl"
          >
            404
          </p>

          <h1 className="mt-4 text-3xl leading-tight font-bold text-arena-50 sm:text-4xl">
            Esta página se nos fue del inventario
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-arena-300">
            El enlace que seguiste no existe o el vehículo que buscabas ya se
            vendió. Si venías por un carro en particular, escríbenos: puede que
            tengamos algo parecido o lo consigamos.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/vehiculos" variante="acento" tamano="lg">
              Ver el catálogo
            </BotonEnlace>
            <BotonEnlace
              href={enlaceWhatsAppDirecto(
                "estaba buscando un vehículo en la página y no lo encontré. ¿Me ayudan?",
              )}
              variante="claro"
              tamano="lg"
              externo
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              Escribir por WhatsApp
            </BotonEnlace>
          </div>

          <nav aria-label="Atajos" className="mt-12">
            <p className="text-sm font-semibold tracking-wider text-arena-400 uppercase">
              O ve directo a
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {ATAJOS.map((atajo) => (
                <li key={atajo.href}>
                  <Link
                    href={atajo.href}
                    className="inline-block rounded-full border border-marca-700 px-4 py-2 text-sm font-medium text-arena-200 transition-colors hover:border-acento-500 hover:text-acento-300"
                  >
                    {atajo.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
