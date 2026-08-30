"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { rutaPublica } from "@/lib/rutas";
import type { Imagen } from "@/lib/schemas";

/**
 * Galería de la ficha de vehículo. Isla de cliente: solo cambia la imagen
 * mostrada. Sin JavaScript se ve la primera foto, que es lo que importa.
 */
export default function GaleriaVehiculo({ imagenes }: { imagenes: Imagen[] }) {
  const [indice, setIndice] = useState(0);
  const total = imagenes.length;
  const actual = imagenes[indice];

  const ir = (paso: number) => setIndice((i) => (i + paso + total) % total);

  return (
    <div>
      <div className="relative aspect-3/2 overflow-hidden rounded-card bg-arena-200">
        <Image
          src={rutaPublica(actual.src)}
          alt={actual.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="object-cover"
        />

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => ir(-1)}
              className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-arena-50/90 text-marca-900 shadow-suave transition-colors hover:bg-arena-50"
            >
              <span className="sr-only">Imagen anterior</span>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => ir(1)}
              className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-arena-50/90 text-marca-900 shadow-suave transition-colors hover:bg-arena-50"
            >
              <span className="sr-only">Imagen siguiente</span>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>

            <p className="absolute right-3 bottom-3 rounded-full bg-arena-950/70 px-3 py-1 text-xs font-medium text-arena-50">
              {indice + 1} / {total}
            </p>
          </>
        )}
      </div>

      {total > 1 && (
        <ul className="sin-barra mt-3 flex gap-3 overflow-x-auto pb-1">
          {imagenes.map((imagen, i) => (
            <li key={imagen.src} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndice(i)}
                aria-current={i === indice ? "true" : undefined}
                className={`relative block aspect-3/2 w-24 overflow-hidden rounded-lg border-2 transition-colors sm:w-28 ${
                  i === indice
                    ? "border-marca-800"
                    : "border-transparent hover:border-arena-400"
                }`}
              >
                <span className="sr-only">Ver {imagen.alt}</span>
                <Image
                  src={rutaPublica(imagen.src)}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
