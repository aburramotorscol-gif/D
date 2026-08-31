import type { Metadata } from "next";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { ListaChequeo, ListaPasos } from "@/components/ui/ListaPasos";
import FormularioLead from "@/components/formularios/FormularioLead";

export const metadata: Metadata = {
  title: "Trámites vehiculares: traspaso, RUNT, SOAT y tecnomecánica",
  description:
    "Hacemos por ti el traspaso, la actualización en el RUNT, el SOAT y la revisión técnico-mecánica en Medellín y el Valle de Aburrá. Sin filas y con seguimiento por WhatsApp.",
  alternates: { canonical: "/tramites" },
};

const TRAMITES = [
  {
    titulo: "Traspaso de propiedad",
    tiempo: "3 a 5 días hábiles",
    texto:
      "Cambio de dueño en el registro. Incluye verificación de multas, impuestos y prendas antes de radicar.",
  },
  {
    titulo: "Actualización en el RUNT",
    tiempo: "1 a 2 días hábiles",
    texto:
      "Inscripción o actualización de datos del propietario y del vehículo en el Registro Único Nacional de Tránsito.",
  },
  {
    titulo: "SOAT",
    tiempo: "El mismo día",
    texto:
      "Expedición en línea del seguro obligatorio. Te llega al correo y queda registrado de inmediato.",
  },
  {
    titulo: "Revisión técnico-mecánica",
    tiempo: "1 día",
    texto:
      "Agendamos el turno en un CDA autorizado y, si quieres, llevamos y traemos el vehículo.",
  },
  {
    titulo: "Certificado de tradición",
    tiempo: "1 día hábil",
    texto:
      "Historial completo del vehículo: dueños anteriores, prendas, embargos y limitaciones a la propiedad.",
  },
  {
    titulo: "Levantamiento de prenda",
    tiempo: "5 a 10 días hábiles",
    texto:
      "Cuando terminas de pagar el crédito, gestionamos que la entidad libere la prenda del registro.",
  },
] as const;

const PASOS = [
  {
    titulo: "Nos dices qué necesitas",
    texto:
      "Escoges el trámite en el formulario y nos das la placa. Revisamos el estado del vehículo en el RUNT.",
  },
  {
    titulo: "Te cotizamos en firme",
    texto:
      "Te enviamos el costo total desglosado: impuestos, derechos de tránsito y nuestro honorario. Sin cobros escondidos.",
  },
  {
    titulo: "Recogemos los documentos",
    texto:
      "Coordinamos con un mensajero para recoger lo que se necesite firmado, donde te quede cómodo.",
  },
  {
    titulo: "Te informamos en cada paso",
    texto:
      "Te avisamos por WhatsApp cuando se radica, cuando avanza y cuando queda listo. Te entregamos los documentos finales.",
  },
] as const;

const REQUISITOS = [
  "Placa del vehículo",
  "Tarjeta de propiedad",
  "Cédula del propietario (y del comprador, si es traspaso)",
  "SOAT y tecnomecánica vigentes",
  "Paz y salvo de impuestos y comparendos",
  "Certificado de tradición reciente, si lo tienes",
] as const;

const CAMPOS = [
  {
    nombre: "tipoTramite",
    etiqueta: "¿Qué trámite necesitas?",
    tipo: "select",
    requerido: true,
    ancho: "completo",
    opciones: [
      { valor: "Traspaso de propiedad", texto: "Traspaso de propiedad" },
      { valor: "Actualización en el RUNT", texto: "Actualización en el RUNT" },
      { valor: "SOAT", texto: "SOAT" },
      { valor: "Revisión técnico-mecánica", texto: "Revisión técnico-mecánica" },
      { valor: "Certificado de tradición", texto: "Certificado de tradición" },
      { valor: "Levantamiento de prenda", texto: "Levantamiento de prenda" },
      { valor: "Varios trámites", texto: "Varios trámites a la vez" },
    ],
  },
  {
    nombre: "placa",
    etiqueta: "Placa del vehículo",
    tipo: "texto",
    requerido: true,
    placeholder: "ABC123",
  },
  { nombre: "marca", etiqueta: "Marca y línea", tipo: "texto", requerido: false, placeholder: "Chevrolet Onix" },
] as const;

export default function PaginaTramites() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Trámites"
        titulo="El papeleo lo hacemos nosotros"
        descripcion="Traspasos, RUNT, SOAT, tecnomecánica y levantamiento de prenda. Tú firmas donde estés y nosotros hacemos las filas."
      />

      <Seccion fondo="claro">
        <TituloSeccion
          etiqueta="Qué hacemos"
          titulo="Trámites que gestionamos"
          descripcion="Los tiempos son estimados en condiciones normales y dependen de la secretaría de tránsito donde esté matriculado el vehículo."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRAMITES.map((tramite) => (
            <li
              key={tramite.titulo}
              className="rounded-card border border-celeste/15 bg-panel p-6"
            >
              <h3 className="font-bold text-hueso">{tramite.titulo}</h3>
              <p className="mt-1 text-sm font-semibold text-neon">
                {tramite.tiempo}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-hueso/75">
                {tramite.texto}
              </p>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion fondo="crema">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSeccion etiqueta="El proceso" titulo="Cómo lo hacemos" />
            <div className="mt-8">
              <ListaPasos pasos={PASOS} />
            </div>
          </div>
          <div>
            <TituloSeccion etiqueta="Requisitos" titulo="Qué te vamos a pedir" />
            <div className="mt-8">
              <ListaChequeo items={REQUISITOS} />
            </div>
            <p className="mt-6 rounded-xl border border-celeste/20 bg-fondo px-4 py-3 text-sm leading-relaxed text-hueso/75">
              El costo de cada trámite depende de los impuestos y derechos de
              tránsito vigentes, que fija la autoridad, no nosotros. Te los
              desglosamos en la cotización antes de empezar.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="claro" id="solicitar">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <TituloSeccion
            etiqueta="Solicitud"
            titulo="Pide tu trámite"
            descripcion="Con la placa revisamos el estado del vehículo y te cotizamos en firme, sin cobros escondidos."
          />
          <FormularioLead
            tipo="tramites"
            campos={CAMPOS}
            textoBoton="Solicitar el trámite"
            queSigue="Revisamos el estado del vehículo en el RUNT y te enviamos la cotización desglosada por WhatsApp."
          />
        </div>
      </Seccion>
    </>
  );
}
