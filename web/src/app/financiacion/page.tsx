import type { Metadata } from "next";
import { Suspense } from "react";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { ListaChequeo, ListaPasos } from "@/components/ui/ListaPasos";
import FormularioLead from "@/components/formularios/FormularioLead";
import SimuladorConParametros from "@/components/financiacion/SimuladorConParametros";
import { obtenerVehiculos } from "@/lib/vehiculos";

export const metadata: Metadata = {
  title: "Financiación de vehículos y simulador de crédito",
  description:
    "Simula la cuota de tu crédito vehicular en segundos y radica tu solicitud desde el celular. Financiamos hasta el 90 % del valor del carro, de 12 a 84 meses, en el Valle de Aburrá.",
  alternates: { canonical: "/financiacion" },
};

const PASOS = [
  {
    titulo: "Simula tu cuota",
    texto:
      "Ajusta precio, cuota inicial, plazo y tasa hasta que la cuota te cuadre con el presupuesto. Toma menos de un minuto.",
  },
  {
    titulo: "Envíanos la simulación",
    texto:
      "Con un botón te abrimos WhatsApp con todos los números ya escritos. No tienes que volver a explicar nada.",
  },
  {
    titulo: "Radicamos el estudio",
    texto:
      "Te pedimos los documentos y presentamos tu solicitud a varias entidades a la vez, para comparar tasas y plazos.",
  },
  {
    titulo: "Firmas y te entregamos",
    texto:
      "Cuando salga la aprobación, coordinamos firma, desembolso, traspaso y entrega del vehículo donde estés.",
  },
] as const;

const REQUISITOS = [
  "Cédula de ciudadanía vigente",
  "Ser mayor de edad y menor de 70 años al terminar el crédito",
  "Certificación laboral no mayor a 30 días, o RUT y extractos si eres independiente",
  "Desprendibles de pago de los últimos tres meses",
  "Extractos bancarios de los últimos tres meses",
  "Cuota inicial desde el 10 % del valor del vehículo",
] as const;

const CAMPOS = [
  {
    nombre: "precioVehiculo",
    etiqueta: "Precio aproximado del vehículo",
    tipo: "numero",
    requerido: true,
    placeholder: "60000000",
    ayuda: "En pesos, sin puntos ni comas.",
  },
  {
    nombre: "cuotaInicial",
    etiqueta: "Cuota inicial con la que cuentas",
    tipo: "numero",
    requerido: true,
    placeholder: "12000000",
  },
  {
    nombre: "plazoMeses",
    etiqueta: "Plazo que te sirve",
    tipo: "select",
    requerido: true,
    opciones: [
      { valor: "24", texto: "24 meses" },
      { valor: "36", texto: "36 meses" },
      { valor: "48", texto: "48 meses" },
      { valor: "60", texto: "60 meses" },
      { valor: "72", texto: "72 meses" },
      { valor: "84", texto: "84 meses" },
    ],
  },
  {
    nombre: "ingresosMensuales",
    etiqueta: "Ingresos mensuales aproximados",
    tipo: "numero",
    requerido: false,
    ayuda: "Nos ayuda a saber a qué entidades presentar tu caso.",
  },
] as const;

export default async function PaginaFinanciacion() {
  const vehiculos = await obtenerVehiculos();
  const resumen = vehiculos.map(
    ({ slug, marca, linea, version, anio, precio }) => ({
      slug,
      marca,
      linea,
      version,
      anio,
      precio,
    }),
  );

  return (
    <>
      <EncabezadoPagina
        etiqueta="Financiación"
        titulo="Sabe cuánto vas a pagar antes de pedir el crédito"
        descripcion="Mueve los valores hasta que la cuota te cuadre, envíanos la simulación por WhatsApp y radicamos tu estudio con varias entidades a la vez."
      />

      <Seccion fondo="claro" id="simulador">
        <TituloSeccion
          etiqueta="Simulador"
          titulo="Simulador de crédito"
          descripcion="Cuota fija mensual con amortización francesa, el sistema que usan los bancos en Colombia."
        />
        <div className="mt-10">
          {/* Lee ?vehiculo= de la URL, así que necesita límite de Suspense. */}
          <Suspense
            fallback={
              <p className="text-hueso/60">Cargando el simulador…</p>
            }
          >
            <SimuladorConParametros vehiculos={resumen} />
          </Suspense>
        </div>
      </Seccion>

      <Seccion fondo="crema">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <TituloSeccion etiqueta="El proceso" titulo="Cómo se pide el crédito" />
            <div className="mt-8">
              <ListaPasos pasos={PASOS} />
            </div>
          </div>

          <div>
            <TituloSeccion etiqueta="Requisitos" titulo="Qué necesitas tener a mano" />
            <div className="mt-8">
              <ListaChequeo items={REQUISITOS} />
            </div>
            <p className="mt-6 rounded-xl border border-celeste/20 bg-fondo px-4 py-3 text-sm leading-relaxed text-hueso/75">
              Los requisitos varían según la entidad. Si eres independiente,
              pensionado o tienes reportes en centrales de riesgo, escríbenos igual:
              trabajamos con entidades que estudian esos perfiles.
            </p>
          </div>
        </div>
      </Seccion>

      <Seccion fondo="claro" id="solicitar">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <TituloSeccion
            etiqueta="Solicitud"
            titulo="Radica tu solicitud de crédito"
            descripcion="Déjanos estos datos y te decimos en menos de 24 horas hábiles a qué entidades podemos presentar tu caso y con qué condiciones aproximadas."
          />
          <FormularioLead
            tipo="financiacion"
            campos={CAMPOS}
            textoBoton="Solicitar mi crédito"
            etiquetaMensaje="¿Algo que debamos saber de tu situación? (opcional)"
            queSigue="Revisamos tu caso y te contamos a qué entidades lo podemos presentar. Si necesitamos documentos adicionales, te los pedimos por el mismo chat."
          />
        </div>
      </Seccion>
    </>
  );
}
