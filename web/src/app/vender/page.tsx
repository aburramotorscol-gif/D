import type { Metadata } from "next";
import { Banknote, Handshake, Repeat } from "lucide-react";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { ListaChequeo, ListaPasos } from "@/components/ui/ListaPasos";
import FormularioLead from "@/components/formularios/FormularioLead";

export const metadata: Metadata = {
  title: "Vende tu carro en Medellín — avalúo gratis",
  description:
    "Vende tu carro sin sacarlo del parqueadero. Compra directa, consignación o retoma como parte de pago. Avalúo el mismo día y pago en 48 horas en el Valle de Aburrá.",
  alternates: { canonical: "/vender" },
};

const RUTAS = [
  {
    icono: Banknote,
    titulo: "Te lo compramos",
    resumen: "Pago en 48 horas",
    texto:
      "Compramos tu carro de contado. Hacemos el avalúo, verificamos los papeles y te consignamos. Tú no tienes que atender a nadie ni mostrar el vehículo.",
    ideal: "Ideal si necesitas la plata rápido y sin vueltas.",
  },
  {
    icono: Handshake,
    titulo: "Lo dejas en consignación",
    resumen: "Sacas más por él",
    texto:
      "Publicamos tu carro en nuestro catálogo, atendemos a los interesados, filtramos curiosos y negociamos por ti. Solo cobramos comisión cuando se vende.",
    ideal: "Ideal si no tienes afán y quieres el mejor precio del mercado.",
  },
  {
    icono: Repeat,
    titulo: "Lo entregas en retoma",
    resumen: "Un solo trámite",
    texto:
      "Descontamos el valor de tu carro actual del precio del que vas a comprar y financiamos la diferencia. Cambias de vehículo en un mismo día.",
    ideal: "Ideal si ya sabes cuál quieres que sea tu próximo carro.",
  },
] as const;

const PASOS = [
  {
    titulo: "Nos cuentas del carro",
    texto:
      "Llenas el formulario con marca, modelo, kilometraje y estado. Te pedimos unas fotos por WhatsApp.",
  },
  {
    titulo: "Te damos un rango de precio",
    texto:
      "El mismo día hábil te enviamos un avalúo estimado con base en el mercado del Valle de Aburrá y el estado que nos describiste.",
  },
  {
    titulo: "Revisión técnica",
    texto:
      "Coordinamos una revisión en menos de 48 horas, donde te quede cómodo. De ahí sale el precio en firme.",
  },
  {
    titulo: "Cierre y traspaso",
    texto:
      "Si aceptas, hacemos el traspaso y te consignamos. Nosotros nos encargamos del papeleo y de los pendientes de tránsito.",
  },
] as const;

const REQUISITOS = [
  "Tarjeta de propiedad a tu nombre (o poder del propietario)",
  "SOAT y revisión técnico-mecánica vigentes",
  "Cédula del propietario",
  "Paz y salvo de multas e impuestos, o disposición a descontarlos del pago",
  "Sin prenda vigente, o con carta de saldo de la entidad",
] as const;

const CAMPOS = [
  {
    nombre: "rutaPreferida",
    etiqueta: "¿Qué te sirve más?",
    tipo: "select",
    requerido: true,
    ancho: "completo",
    opciones: [
      { valor: "Compra directa (pago de contado)", texto: "Que me lo compren de contado" },
      { valor: "Consignación", texto: "Dejarlo en consignación" },
      { valor: "Retoma", texto: "Entregarlo en retoma por otro carro" },
      { valor: "Todavía no sé", texto: "Todavía no sé, quiero que me asesoren" },
    ],
  },
  { nombre: "marca", etiqueta: "Marca", tipo: "texto", requerido: true, placeholder: "Renault" },
  { nombre: "linea", etiqueta: "Línea", tipo: "texto", requerido: true, placeholder: "Duster" },
  { nombre: "anio", etiqueta: "Modelo (año)", tipo: "numero", requerido: true, placeholder: "2021" },
  {
    nombre: "kilometraje",
    etiqueta: "Kilometraje",
    tipo: "numero",
    requerido: true,
    placeholder: "48500",
  },
  {
    nombre: "placa",
    etiqueta: "Placa",
    tipo: "texto",
    requerido: false,
    placeholder: "ABC123",
    ayuda: "Nos sirve para revisar multas y estado en el RUNT.",
  },
  {
    nombre: "precioEsperado",
    etiqueta: "Precio que esperas",
    tipo: "numero",
    requerido: false,
    placeholder: "62000000",
  },
  {
    nombre: "estadoGeneral",
    etiqueta: "Estado general",
    tipo: "select",
    requerido: true,
    opciones: [
      { valor: "Excelente, sin detalles", texto: "Excelente, sin detalles" },
      { valor: "Bueno, detalles menores de latonería o pintura", texto: "Bueno, detalles menores" },
      { valor: "Regular, requiere arreglos", texto: "Regular, requiere arreglos" },
      { valor: "Con siniestro reportado", texto: "Con siniestro reportado" },
    ],
  },
] as const;

export default function PaginaVender() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Vende tu carro"
        titulo="Vende tu carro sin sacarlo del parqueadero"
        descripcion="Avalúo el mismo día hábil y tres caminos según lo que necesites: te lo compramos, lo dejas en consignación o lo entregas en retoma."
      />

      <Seccion fondo="claro">
        <TituloSeccion
          etiqueta="Tres rutas"
          titulo="Escoge cómo quieres venderlo"
          descripcion="No todas las ventas son iguales. Estas son las tres formas en que trabajamos, con lo que gana y lo que cuesta cada una."
        />

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {RUTAS.map(({ icono: Icono, ...ruta }) => (
            <li
              key={ruta.titulo}
              className="flex flex-col rounded-card border border-arena-200 bg-white p-7"
            >
              <span className="mb-4 grid size-11 place-items-center rounded-xl bg-marca-100 text-marca-800">
                <Icono aria-hidden="true" className="size-5" />
              </span>
              <h3 className="text-lg font-bold text-marca-900">{ruta.titulo}</h3>
              <p className="mt-1 text-sm font-semibold text-acento-700">
                {ruta.resumen}
              </p>
              <p className="mt-3 flex-1 leading-relaxed text-arena-700">{ruta.texto}</p>
              <p className="mt-5 border-t border-arena-200 pt-4 text-sm text-arena-600">
                {ruta.ideal}
              </p>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion fondo="crema">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSeccion
              etiqueta="Paso a paso"
              titulo="Qué pasa después de enviar el formulario"
              descripcion="Tiempos reales, no promesas. Todo el proceso se coordina por WhatsApp."
            />
            <div className="mt-8">
              <ListaPasos pasos={PASOS} />
            </div>
          </div>

          <div>
            <TituloSeccion etiqueta="Requisitos" titulo="Documentos que vas a necesitar" />
            <div className="mt-8">
              <ListaChequeo items={REQUISITOS} />
            </div>
            <p className="mt-6 rounded-xl border border-arena-300 bg-arena-50 px-4 py-3 text-sm leading-relaxed text-arena-700">
              ¿Tu carro tiene prenda, multas pendientes o el traspaso quedó a medias?
              Escríbenos igual: eso se resuelve, solo hay que saberlo desde el
              principio para no perder tiempo.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="claro" id="avaluo">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <TituloSeccion
            etiqueta="Avalúo gratis"
            titulo="Cuéntanos de tu carro"
            descripcion="Entre más preciso seas con el estado y el kilometraje, más ajustado será el rango de precio que te demos. El avalúo no tiene costo ni compromiso."
          />
          <FormularioLead
            tipo="venta"
            campos={CAMPOS}
            textoBoton="Pedir mi avalúo gratis"
            etiquetaMensaje="Detalles adicionales (opcional)"
            queSigue="Te enviamos un rango de precio estimado el mismo día hábil y coordinamos la revisión técnica si te interesa seguir."
          />
        </div>
      </Seccion>
    </>
  );
}
