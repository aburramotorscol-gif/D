import Link from "next/link";
import {
  ArrowUpRight,
  Calculator,
  Car,
  FileText,
  Handshake,
  Layers,
  Repeat,
  Shield,
  type LucideIcon,
} from "lucide-react";

import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { servicios } from "@/config/site";

const ICONOS: Record<string, LucideIcon> = {
  car: Car,
  calculator: Calculator,
  repeat: Repeat,
  shield: Shield,
  "file-text": FileText,
  handshake: Handshake,
  layers: Layers,
};

export default function Servicios() {
  return (
    <Seccion fondo="crema" id="servicios">
      <TituloSeccion
        etiqueta="Todo en un solo lugar"
        titulo="Siete servicios para no tener que ir a ninguna parte"
        descripcion="Desde encontrar el carro hasta entregarte los papeles traspasados. Cada servicio termina en una conversación por WhatsApp con una persona, no con un formulario perdido."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio) => {
          const Icono = ICONOS[servicio.icono] ?? Car;
          return (
            <li key={servicio.slug}>
              <Link
                href={servicio.href}
                className="group flex h-full flex-col rounded-card border border-celeste/15 bg-panel p-6 transition-all hover:-translate-y-0.5 hover:border-teal-claro hover:shadow-elevada"
              >
                <span className="mb-4 grid size-11 place-items-center rounded-xl bg-teal/30 text-celeste transition-colors group-hover:bg-teal group-hover:text-hueso">
                  <Icono aria-hidden="true" className="size-5" />
                </span>

                <h3 className="flex items-start justify-between gap-2 text-lg font-bold text-hueso">
                  {servicio.titulo}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 translate-y-1 text-hueso/55 transition-transform group-hover:-translate-y-0 group-hover:text-neon"
                  />
                </h3>

                <p className="mt-2 text-sm font-medium text-neon">
                  {servicio.resumen}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-hueso/60">
                  {servicio.descripcion}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </Seccion>
  );
}
