import { ArrowRight, BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

import { BotonEnlace } from "@/components/ui/Boton";
import BusquedaRapida from "@/components/home/BusquedaRapida";
import { siteConfig } from "@/config/site";

interface Props {
  marcas: string[];
  rangoPrecios: { min: number; max: number };
  rangoAnios: { min: number; max: number };
  totalVehiculos: number;
}

const GARANTIAS = [
  { icono: BadgeCheck, texto: "Vehículos verificados y con papeles al día" },
  { icono: Clock3, texto: "Respuesta el mismo día por WhatsApp" },
  { icono: ShieldCheck, texto: "Acompañamiento en todo el trámite" },
] as const;

export default function Hero({
  marcas,
  rangoPrecios,
  rangoAnios,
  totalVehiculos,
}: Props) {
  return (
    <section className="trama-marca relative overflow-hidden">
      <div className="contenedor-sitio pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal bg-fondo/40 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-neon uppercase">
            {siteConfig.region} · 100 % online
          </p>

          <h1 className="text-4xl leading-[1.08] font-bold text-hueso sm:text-5xl lg:text-6xl">
            Compra, vende y financia tu vehículo{" "}
            <span className="text-neon">sin salir de casa</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-hueso/80 sm:text-xl">
            Somos una compraventa 100 % virtual. Hacemos el avalúo, la
            financiación, el seguro y los trámites por ti, y te entregamos el carro
            donde estés en el {siteConfig.region}.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BotonEnlace href="/vehiculos" variante="acento" tamano="lg">
              Ver vehículos
              <ArrowRight aria-hidden="true" className="size-5" />
            </BotonEnlace>
            <BotonEnlace href="/vender" variante="claro" tamano="lg">
              Vender mi carro
            </BotonEnlace>
          </div>

          <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6">
            {GARANTIAS.map(({ icono: Icono, texto }) => (
              <li
                key={texto}
                className="flex items-center gap-2.5 text-sm text-hueso/70"
              >
                <Icono aria-hidden="true" className="size-5 shrink-0 text-neon" />
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 sm:mt-16">
          <BusquedaRapida
            marcas={marcas}
            rangoPrecios={rangoPrecios}
            rangoAnios={rangoAnios}
            totalVehiculos={totalVehiculos}
          />
        </div>
      </div>
    </section>
  );
}
