import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import CatalogoCliente from "@/components/vehiculos/CatalogoCliente";
import { jsonLdMigas } from "@/lib/jsonld";
import {
  obtenerMarcas,
  obtenerRangoAnios,
  obtenerRangoPrecios,
  obtenerVehiculos,
} from "@/lib/vehiculos";

export const metadata: Metadata = {
  title: "Catálogo de vehículos usados en Medellín",
  description:
    "Carros y camionetas usados verificados en Medellín y el Valle de Aburrá. Filtra por marca, precio, año, kilometraje, transmisión y combustible. Inventario propio y en consignación.",
  alternates: { canonical: "/vehiculos" },
  openGraph: {
    title: "Catálogo de vehículos · Aburrá Motors",
    description:
      "Carros y camionetas usados verificados en el Valle de Aburrá, con financiación y trámites incluidos.",
    url: "/vehiculos",
  },
};

export default async function PaginaCatalogo() {
  const [vehiculos, marcas, rangoPrecios, rangoAnios] = await Promise.all([
    obtenerVehiculos(),
    obtenerMarcas(),
    obtenerRangoPrecios(),
    obtenerRangoAnios(),
  ]);

  return (
    <>
      <JsonLd
        datos={jsonLdMigas([
          { nombre: "Inicio", href: "/" },
          { nombre: "Vehículos", href: "/vehiculos" },
        ])}
      />

      <div className="border-b border-arena-200 bg-arena-100">
        <div className="contenedor-sitio py-10 sm:py-14">
          <h1 className="text-3xl font-bold text-marca-900 sm:text-4xl">
            Catálogo de vehículos
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-arena-700">
            {vehiculos.length} vehículos disponibles entre inventario propio y
            consignación, todos con papeles verificados. Cada ficha te dice de quién
            es el carro y cuánto te quedaría la cuota.
          </p>
        </div>
      </div>

      {/* useSearchParams necesita un límite de Suspense en el export estático. */}
      <Suspense
        fallback={
          <div className="contenedor-sitio py-16">
            <p className="text-arena-600">Cargando el catálogo…</p>
          </div>
        }
      >
        <CatalogoCliente
          vehiculos={vehiculos}
          marcas={marcas}
          rangoPrecios={rangoPrecios}
          rangoAnios={rangoAnios}
        />
      </Suspense>
    </>
  );
}
