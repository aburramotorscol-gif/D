import { Quote } from "lucide-react";

import Seccion, { TituloSeccion } from "@/components/ui/Seccion";

/**
 * TODO: TESTIMONIOS PLACEHOLDER.
 *
 * Estos textos son de ejemplo y NO corresponden a clientes reales. Publicar
 * testimonios inventados como si fueran reales es publicidad engañosa (Ley
 * 1480 de 2011, Estatuto del Consumidor). Reemplázalos por reseñas reales con
 * autorización de las personas, o borra la sección entera de la home.
 *
 * Mientras sean de ejemplo, la sección se muestra con un aviso visible.
 */
const TESTIMONIOS = [
  {
    texto:
      "Vendí mi carro sin sacarlo del parqueadero. Me hicieron el avalúo por fotos, acordamos precio y a los tres días ya tenía la plata y el traspaso hecho.",
    autor: "Nombre de ejemplo",
    detalle: "Vendió un Mazda 3 · Envigado",
  },
  {
    texto:
      "Todo lo hice por WhatsApp desde el trabajo. Me consiguieron el crédito a 60 meses y me entregaron la camioneta en la casa con el SOAT ya expedido.",
    autor: "Nombre de ejemplo",
    detalle: "Compró una SUV · Sabaneta",
  },
  {
    texto:
      "Dejé el carro en consignación. Ellos atendieron a todos los interesados y solo me llamaron cuando había una oferta seria sobre la mesa.",
    autor: "Nombre de ejemplo",
    detalle: "Consignación · Bello",
  },
] as const;

export default function Testimonios() {
  return (
    <Seccion fondo="claro" compacta>
      <TituloSeccion
        etiqueta="Lo que dicen"
        titulo="Clientes del Valle de Aburrá"
      />

      <p
        role="note"
        className="mt-6 rounded-xl border border-neon/35 bg-neon/10 px-4 py-3 text-sm leading-relaxed font-medium text-hueso/85"
      >
        <strong>Contenido de ejemplo.</strong> Estos testimonios son
        marcadores de posición y no corresponden a clientes reales. Antes de
        publicar el sitio hay que reemplazarlos por reseñas reales con
        autorización, o eliminar esta sección.
      </p>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {TESTIMONIOS.map((testimonio, indice) => (
          <li
            key={indice}
            className="flex flex-col rounded-card border border-celeste/15 bg-panel/70 p-6"
          >
            <Quote
              aria-hidden="true"
              className="size-7 shrink-0 text-neon/60"
            />
            <blockquote className="mt-4 flex-1 leading-relaxed text-hueso/85">
              {testimonio.texto}
            </blockquote>
            <footer className="mt-5 border-t border-celeste/20 pt-4">
              <p className="font-semibold text-hueso">{testimonio.autor}</p>
              <p className="text-sm text-hueso/60">{testimonio.detalle}</p>
            </footer>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
