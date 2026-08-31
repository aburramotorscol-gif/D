import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import JsonLd from "@/components/JsonLd";
import ComoFunciona from "@/components/home/ComoFunciona";
import Hero from "@/components/home/Hero";
import LlamadoFinal from "@/components/home/LlamadoFinal";
import Preguntas, { PREGUNTAS } from "@/components/home/Preguntas";
import Servicios from "@/components/home/Servicios";
import Testimonios from "@/components/home/Testimonios";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import TarjetaVehiculo from "@/components/vehiculos/TarjetaVehiculo";
import { jsonLdPreguntas } from "@/lib/jsonld";
import {
  obtenerDestacados,
  obtenerMarcas,
  obtenerRangoAnios,
  obtenerRangoPrecios,
  obtenerVehiculos,
} from "@/lib/vehiculos";

export const metadata: Metadata = {
  title: "Compra, vende y financia tu vehículo 100 % online",
  description:
    "Compraventa de vehículos 100 % virtual en Medellín y el Valle de Aburrá. Catálogo verificado, financiación, retoma, seguros, trámites y consignación sin desplazarte.",
  alternates: { canonical: "/" },
};

export default async function PaginaInicio() {
  const [destacados, marcas, rangoPrecios, rangoAnios, todos] = await Promise.all([
    obtenerDestacados(6),
    obtenerMarcas(),
    obtenerRangoPrecios(),
    obtenerRangoAnios(),
    obtenerVehiculos(),
  ]);

  return (
    <>
      <JsonLd datos={jsonLdPreguntas([...PREGUNTAS])} />

      <Hero
        marcas={marcas}
        rangoPrecios={rangoPrecios}
        rangoAnios={rangoAnios}
        totalVehiculos={todos.length}
      />

      <Seccion fondo="claro" id="destacados">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <TituloSeccion
            etiqueta="Inventario"
            titulo="Vehículos destacados"
            descripcion="Una selección de lo que tenemos disponible ahora mismo, entre inventario propio y vehículos en consignación."
          />
          <Link
            href="/vehiculos"
            className="inline-flex items-center gap-2 rounded-full border-2 border-teal px-5 py-2.5 text-sm font-semibold text-hueso transition-colors hover:bg-teal hover:text-hueso"
          >
            Ver los {todos.length} vehículos
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((vehiculo, indice) => (
            <li key={vehiculo.slug}>
              <TarjetaVehiculo vehiculo={vehiculo} prioridad={indice < 3} />
            </li>
          ))}
        </ul>
      </Seccion>

      <Servicios />
      <ComoFunciona />
      <Testimonios />
      <Preguntas />
      <LlamadoFinal />
    </>
  );
}
