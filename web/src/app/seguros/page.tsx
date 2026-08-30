import type { Metadata } from "next";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { ListaChequeo, ListaPasos } from "@/components/ui/ListaPasos";
import FormularioLead from "@/components/formularios/FormularioLead";

export const metadata: Metadata = {
  title: "Seguros para vehículos: SOAT y todo riesgo",
  description:
    "Expedimos SOAT en línea y cotizamos pólizas todo riesgo con las principales aseguradoras del país. Comparamos coberturas y deducibles y te explicamos la letra menuda.",
  alternates: { canonical: "/seguros" },
};

const COBERTURAS = [
  "SOAT con expedición inmediata y envío al correo",
  "Póliza todo riesgo con daños a terceros",
  "Pérdida total y parcial por daños o hurto",
  "Asistencia en vía y grúa 24 horas",
  "Carro de reemplazo según el plan contratado",
  "Responsabilidad civil extracontractual",
  "Amparo patrimonial y defensa jurídica",
  "Protección de accesorios y equipos especiales",
] as const;

const PASOS = [
  {
    titulo: "Nos dices qué carro es",
    texto:
      "Marca, línea, modelo y placa. Con eso ya podemos consultar tarifas en varias aseguradoras.",
  },
  {
    titulo: "Comparamos por ti",
    texto:
      "Te enviamos dos o tres opciones con la prima anual, el deducible y qué cubre cada una, en un cuadro claro.",
  },
  {
    titulo: "Te explicamos la letra menuda",
    texto:
      "Antes de que firmes te decimos qué NO cubre la póliza y en qué casos el deducible se dispara. Sin sorpresas.",
  },
  {
    titulo: "Expedimos y te llega al correo",
    texto:
      "Pagas en línea y recibes la póliza el mismo día. Te avisamos un mes antes de cada renovación.",
  },
] as const;

const CAMPOS = [
  {
    nombre: "tipoSeguro",
    etiqueta: "¿Qué necesitas?",
    tipo: "select",
    requerido: true,
    ancho: "completo",
    opciones: [
      { valor: "SOAT", texto: "Solo SOAT" },
      { valor: "Todo riesgo", texto: "Póliza todo riesgo" },
      { valor: "SOAT y todo riesgo", texto: "SOAT y todo riesgo" },
      { valor: "Renovación", texto: "Renovar una póliza que ya tengo" },
    ],
  },
  { nombre: "marca", etiqueta: "Marca", tipo: "texto", requerido: true, placeholder: "Mazda" },
  { nombre: "linea", etiqueta: "Línea", tipo: "texto", requerido: true, placeholder: "Mazda 3" },
  { nombre: "anio", etiqueta: "Modelo (año)", tipo: "numero", requerido: true, placeholder: "2020" },
  {
    nombre: "placa",
    etiqueta: "Placa",
    tipo: "texto",
    requerido: false,
    placeholder: "ABC123",
  },
  {
    nombre: "aseguradoraActual",
    etiqueta: "Aseguradora actual",
    tipo: "texto",
    requerido: false,
    ancho: "completo",
    ayuda: "Si ya tienes póliza, nos ayuda a compararla contra lo que podemos ofrecerte.",
  },
] as const;

export default function PaginaSeguros() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Seguros"
        titulo="Asegura tu carro sin leerte 40 páginas de póliza"
        descripcion="Cotizamos con varias aseguradoras, te mostramos las diferencias en un cuadro y te decimos con claridad qué queda por fuera antes de que firmes."
      />

      <Seccion fondo="claro">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSeccion
              etiqueta="Coberturas"
              titulo="Qué podemos cotizarte"
              descripcion="Trabajamos con las principales aseguradoras del país. La cobertura final depende del plan y del vehículo."
            />
            <div className="mt-8">
              <ListaChequeo items={COBERTURAS} />
            </div>
          </div>

          <div>
            <TituloSeccion etiqueta="El proceso" titulo="Cómo funciona" />
            <div className="mt-8">
              <ListaPasos pasos={PASOS} />
            </div>
            <p className="mt-8 rounded-xl border border-acento-300 bg-acento-50 px-4 py-3 text-sm leading-relaxed text-acento-900">
              <strong>Importante:</strong> el SOAT es obligatorio por ley y no cubre
              daños a tu propio vehículo, solo lesiones a personas. Si quieres
              protección para el carro, necesitas además una póliza todo riesgo.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="crema" id="cotizar">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <TituloSeccion
            etiqueta="Cotización"
            titulo="Pide tu cotización"
            descripcion="Te enviamos las opciones en menos de 24 horas hábiles, con la prima, el deducible y las exclusiones de cada una."
          />
          <FormularioLead
            tipo="seguros"
            campos={CAMPOS}
            textoBoton="Cotizar mi seguro"
            queSigue="Consultamos tarifas con las aseguradoras y te enviamos la comparación por WhatsApp en menos de 24 horas hábiles."
          />
        </div>
      </Seccion>
    </>
  );
}
