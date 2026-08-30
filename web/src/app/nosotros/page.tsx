import type { Metadata } from "next";
import { Eye, HandCoins, MapPinned, ShieldCheck } from "lucide-react";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { BotonEnlace } from "@/components/ui/Boton";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Somos una compraventa de vehículos 100 % virtual del Valle de Aburrá. Sin vitrina, sin intermediarios de más y sin letra menuda: así trabajamos.",
  alternates: { canonical: "/nosotros" },
};

const PRINCIPIOS = [
  {
    icono: Eye,
    titulo: "Decimos las cosas como son",
    texto:
      "Si un carro tuvo un choque, lo decimos. Si la cuota puede subir, lo decimos. Preferimos perder una venta a ganarnos un reclamo.",
  },
  {
    icono: HandCoins,
    titulo: "Precios sin sorpresas",
    texto:
      "El precio publicado es el precio. Los costos de trámites y seguros se desglosan aparte, antes de que firmes nada.",
  },
  {
    icono: ShieldCheck,
    titulo: "Verificamos antes de publicar",
    texto:
      "Revisamos tradición, prendas, multas e impuestos de cada vehículo antes de que salga al catálogo, sea nuestro o en consignación.",
  },
  {
    icono: MapPinned,
    titulo: "Cerca sin necesidad de vitrina",
    texto:
      "No tener local no es un ahorro que nos guardamos: es tiempo que no pierdes y un costo menos dentro del precio del carro.",
  },
] as const;

export default function PaginaNosotros() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Nosotros"
        titulo="Una compraventa que cabe en tu celular"
        descripcion="Nacimos con la idea de que comprar o vender un carro no debería costarte tres sábados de vueltas. Todo el proceso pasa por WhatsApp y solo nos vemos el día de la entrega."
      />

      <Seccion fondo="claro">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <TituloSeccion etiqueta="Quiénes somos" titulo="Sin vitrina, con respaldo" />
            <div className="mt-6 space-y-5 leading-relaxed text-arena-700">
              <p>
                {siteConfig.nombre} es una compraventa automotriz que opera 100 %
                en línea en {siteConfig.ciudad} y todo el {siteConfig.region}. No
                tenemos local con banderines: tenemos un catálogo verificado, un
                equipo que contesta y una operación montada para que el carro y los
                papeles lleguen a donde tú estés.
              </p>
              <p>
                Trabajamos con vehículos propios y con vehículos de terceros en
                consignación, y en cada ficha decimos cuál es cuál. Además de
                comprar y vender, gestionamos la financiación con varias entidades,
                cotizamos seguros y hacemos los trámites de tránsito, para que no
                tengas que coordinar a cinco personas distintas.
              </p>
              <p>
                Esta página web es apenas la primera etapa. En los próximos meses
                vamos a automatizar el proceso comercial, montar un CRM propio,
                integrar WhatsApp y abrir un portal donde puedas consultar en qué va
                tu trámite sin tener que preguntarnos.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BotonEnlace href="/vehiculos" variante="primario">
                Ver el catálogo
              </BotonEnlace>
              <BotonEnlace href="/contacto" variante="contorno">
                Hablar con nosotros
              </BotonEnlace>
            </div>
          </div>

          <div>
            <TituloSeccion etiqueta="Cómo trabajamos" titulo="Cuatro cosas que no negociamos" />
            <ul className="mt-8 space-y-6">
              {PRINCIPIOS.map(({ icono: Icono, ...principio }) => (
                <li key={principio.titulo} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-marca-100 text-marca-800">
                    <Icono aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-marca-900">{principio.titulo}</h3>
                    <p className="mt-1.5 leading-relaxed text-arena-700">
                      {principio.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="crema" compacta>
        <TituloSeccion
          etiqueta="Cobertura"
          titulo={`Atendemos los ${siteConfig.cobertura.length} municipios del ${siteConfig.region}`}
          descripcion="Llevamos el vehículo, recogemos documentos y coordinamos revisiones en cualquiera de estos municipios sin costo adicional."
        />
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {siteConfig.cobertura.map((municipio) => (
            <li
              key={municipio}
              className="rounded-full border border-arena-300 bg-arena-50 px-4 py-2 text-sm font-medium text-arena-800"
            >
              {municipio}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-arena-600">
          ¿Estás en otro municipio de Antioquia? Escríbenos y lo evaluamos caso por
          caso.
        </p>
      </Seccion>
    </>
  );
}
