import type { Metadata } from "next";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { ListaChequeo, ListaPasos } from "@/components/ui/ListaPasos";
import FormularioLead from "@/components/formularios/FormularioLead";

export const metadata: Metadata = {
  title: "Consignación de vehículos en el Valle de Aburrá",
  description:
    "Deja tu carro en consignación: lo publicamos, atendemos a los interesados y negociamos por ti. Tú conservas la propiedad y solo pagas comisión cuando se vende.",
  alternates: { canonical: "/consignacion" },
};

const INCLUYE = [
  "Publicación en nuestro catálogo con fotos profesionales",
  "Difusión en redes sociales y portales de clasificados",
  "Filtro de interesados: te evitamos a los curiosos",
  "Atención de llamadas y mensajes en tu nombre",
  "Coordinación de las revisiones técnicas que pidan los compradores",
  "Negociación del precio dentro del rango que autorices",
  "Gestión completa del traspaso y los documentos",
  "Acompañamiento en el pago para que sea seguro para ambos",
] as const;

const PASOS = [
  {
    titulo: "Avalúo y acuerdo de precio",
    texto:
      "Definimos juntos el precio de publicación y el mínimo que estás dispuesto a aceptar. Nunca vendemos por debajo de ese piso sin consultarte.",
  },
  {
    titulo: "Firmamos el contrato",
    texto:
      "Un contrato de consignación claro: vigencia, comisión, quién responde por qué. Tú sigues siendo el propietario del vehículo.",
  },
  {
    titulo: "Publicamos y promocionamos",
    texto:
      "Fotos, ficha técnica completa y difusión. El carro puede quedarse contigo o en nuestro parqueadero aliado, como prefieras.",
  },
  {
    titulo: "Cerramos la venta",
    texto:
      "Te llamamos solo cuando hay una oferta seria. Al cerrar, hacemos el traspaso, te consignamos y descontamos la comisión pactada.",
  },
] as const;

const REQUISITOS = [
  "Tarjeta de propiedad a tu nombre",
  "Cédula del propietario",
  "SOAT y revisión técnico-mecánica vigentes",
  "Paz y salvo de impuestos y comparendos",
  "Sin prenda vigente, o con carta de saldo de la entidad",
  "Vehículo en condiciones de ser mostrado y probado",
] as const;

const CAMPOS = [
  { nombre: "marca", etiqueta: "Marca", tipo: "texto", requerido: true, placeholder: "Kia" },
  { nombre: "linea", etiqueta: "Línea", tipo: "texto", requerido: true, placeholder: "Picanto" },
  { nombre: "anio", etiqueta: "Modelo (año)", tipo: "numero", requerido: true, placeholder: "2021" },
  {
    nombre: "kilometraje",
    etiqueta: "Kilometraje",
    tipo: "numero",
    requerido: true,
    placeholder: "34100",
  },
  {
    nombre: "precioEsperado",
    etiqueta: "Precio que quieres recibir",
    tipo: "numero",
    requerido: true,
    ancho: "completo",
    placeholder: "42500000",
    ayuda: "Este es el valor que esperas recibir tú, antes de la comisión.",
  },
  {
    nombre: "estadoGeneral",
    etiqueta: "Estado general",
    tipo: "select",
    requerido: true,
    ancho: "completo",
    opciones: [
      { valor: "Excelente, sin detalles", texto: "Excelente, sin detalles" },
      { valor: "Bueno, detalles menores", texto: "Bueno, detalles menores" },
      { valor: "Regular, requiere arreglos", texto: "Regular, requiere arreglos" },
    ],
  },
] as const;

export default function PaginaConsignacion() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Consignación"
        titulo="Tu carro en nuestra vitrina, la propiedad sigue siendo tuya"
        descripcion="Nos encargamos de publicarlo, mostrarlo y negociarlo. Tú no atiendes desconocidos ni pierdes sábados enseñando el carro. Solo cobramos cuando se vende."
      />

      <Seccion fondo="claro">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSeccion
              etiqueta="Qué incluye"
              titulo="Lo que hacemos por ti"
              descripcion="La consignación no es solo publicar un aviso: es hacernos cargo de todo el proceso comercial."
            />
            <div className="mt-8">
              <ListaChequeo items={INCLUYE} />
            </div>
          </div>

          <div>
            <TituloSeccion etiqueta="El proceso" titulo="Cómo funciona" />
            <div className="mt-8">
              <ListaPasos pasos={PASOS} />
            </div>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="crema">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSeccion etiqueta="Requisitos" titulo="Qué necesitas para consignar" />
            <div className="mt-8">
              <ListaChequeo items={REQUISITOS} />
            </div>
          </div>

          <div className="rounded-card border border-acento-300 bg-acento-50 p-7">
            <h3 className="text-lg font-bold text-acento-900">
              Sobre la comisión y la vigencia
            </h3>
            <p className="mt-3 leading-relaxed text-acento-900">
              La comisión y la duración del contrato se acuerdan caso por caso,
              según el precio, el tipo de vehículo y qué tan rápido se estime la
              venta. Te lo decimos por escrito antes de firmar y no cambia después.
            </p>
            <p className="mt-4 rounded-lg bg-acento-100 px-4 py-3 text-sm font-medium text-acento-900">
              <strong>Pendiente de definir:</strong> los porcentajes de comisión y
              la vigencia estándar del contrato todavía no están publicados en esta
              página. Hay que fijarlos y agregarlos aquí antes de salir a producción.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="claro" id="consignar">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <TituloSeccion
            etiqueta="Solicitud"
            titulo="Consigna tu vehículo"
            descripcion="Cuéntanos qué carro es y cuánto esperas recibir. Te respondemos con una propuesta de precio de publicación y las condiciones de la consignación."
          />
          <FormularioLead
            tipo="consignacion"
            campos={CAMPOS}
            textoBoton="Consignar mi vehículo"
            queSigue="Te enviamos una propuesta de precio de publicación y las condiciones del contrato de consignación para que las revises con calma."
          />
        </div>
      </Seccion>
    </>
  );
}
