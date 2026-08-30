import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Settings2 } from "lucide-react";

import Insignia from "@/components/ui/Insignia";
import { cuotaEstimada } from "@/lib/financiacion";
import {
  formatearKilometraje,
  formatearPesos,
  formatearPesosCompacto,
} from "@/lib/formato";
import { rutaPublica } from "@/lib/rutas";
import { etiquetas, type Vehiculo } from "@/lib/schemas";

interface Props {
  vehiculo: Vehiculo;
  /** La primera fila del catálogo carga con prioridad para mejorar el LCP. */
  prioridad?: boolean;
}

export default function TarjetaVehiculo({ vehiculo, prioridad = false }: Props) {
  const titulo = `${vehiculo.marca} ${vehiculo.linea}`;
  const portada = vehiculo.imagenes[0];
  const cuota = cuotaEstimada(vehiculo.precio);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-arena-200 bg-white shadow-suave transition-shadow hover:shadow-elevada">
      <div className="relative aspect-3/2 overflow-hidden bg-arena-200">
        <Image
          src={rutaPublica(portada.src)}
          alt={portada.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          priority={prioridad}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Insignia tono={vehiculo.origen === "propio" ? "oscuro" : "acento"}>
            {etiquetas.origen[vehiculo.origen]}
          </Insignia>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <header>
          <h3 className="text-lg leading-snug font-bold text-marca-900">
            {/* El enlace cubre toda la tarjeta pero el nombre accesible es el título. */}
            <Link href={`/vehiculos/${vehiculo.slug}`} className="after:absolute after:inset-0">
              {titulo}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-arena-600">
            {vehiculo.version} · {vehiculo.anio}
          </p>
        </header>

        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-arena-700">
          <div className="flex items-center gap-1.5">
            <Gauge aria-hidden="true" className="size-4 text-arena-500" />
            <dt className="sr-only">Kilometraje</dt>
            <dd>{formatearKilometraje(vehiculo.kilometraje)}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 aria-hidden="true" className="size-4 text-arena-500" />
            <dt className="sr-only">Transmisión</dt>
            <dd>{etiquetas.transmision[vehiculo.transmision]}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel aria-hidden="true" className="size-4 text-arena-500" />
            <dt className="sr-only">Combustible</dt>
            <dd>{etiquetas.combustible[vehiculo.combustible]}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-5">
          <p className="text-2xl font-bold text-marca-900">
            <span className="sr-only">Precio: </span>
            <span className="sm:hidden">{formatearPesosCompacto(vehiculo.precio)}</span>
            <span className="hidden sm:inline">{formatearPesos(vehiculo.precio)}</span>
          </p>
          <p className="mt-1 text-sm text-arena-600">
            Desde{" "}
            <span className="font-semibold text-acento-700">
              {formatearPesos(cuota)}
            </span>{" "}
            al mes
          </p>
        </div>
      </div>
    </article>
  );
}
