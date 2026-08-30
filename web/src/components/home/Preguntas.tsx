import Seccion, { TituloSeccion } from "@/components/ui/Seccion";

/** Se exporta para poder reutilizarlo en el JSON-LD de la home (FAQPage). */
export const PREGUNTAS = [
  {
    pregunta: "¿Cómo compro un carro si no tienen vitrina?",
    respuesta:
      "Escoges el vehículo en el catálogo y nos escribes por WhatsApp. Te enviamos fotos y videos adicionales, coordinamos una videollamada para que lo veas en detalle y, si quieres, agendamos una revisión con el mecánico de tu confianza antes de cerrar. La entrega la hacemos donde estés en el Valle de Aburrá.",
  },
  {
    pregunta: "¿Cuánto se demora el avalúo de mi carro?",
    respuesta:
      "El avalúo inicial lo damos el mismo día con las fotos y los datos que nos envíes por el formulario. Es un rango estimado. El precio en firme sale después de la revisión técnica, que coordinamos en menos de 48 horas.",
  },
  {
    pregunta: "¿La cuota del simulador es la que voy a pagar?",
    respuesta:
      "No. El simulador da un estimado con una tasa de referencia para que te hagas una idea. La cuota final depende de la entidad financiera, de tu perfil crediticio y del plazo aprobado. No es una oferta ni una aprobación de crédito.",
  },
  {
    pregunta: "¿Qué diferencia hay entre un carro propio y uno en consignación?",
    respuesta:
      "Los vehículos de inventario propio son nuestros: respondemos directamente por ellos. Los de consignación son de un tercero que nos autorizó a venderlos; nosotros verificamos los papeles, gestionamos la venta y acompañamos el traspaso. En cada ficha decimos claramente cuál es cuál.",
  },
  {
    pregunta: "¿Reciben mi carro actual como parte de pago?",
    respuesta:
      "Sí, eso es la retoma. Avaluamos tu vehículo, descontamos ese valor del precio del carro que vas a comprar y financiamos la diferencia si la necesitas. Todo queda en un solo trámite.",
  },
  {
    pregunta: "¿Ustedes hacen los trámites o me toca a mí?",
    respuesta:
      "Los hacemos nosotros: traspaso, actualización en el RUNT, SOAT y revisión técnico-mecánica. Te vamos informando en qué va cada paso y te entregamos los documentos finales.",
  },
  {
    pregunta: "¿Atienden fuera de Medellín?",
    respuesta:
      "Cubrimos los diez municipios del Valle de Aburrá. Para otras ciudades de Antioquia lo evaluamos caso por caso: escríbenos por WhatsApp y te confirmamos si podemos.",
  },
] as const;

export default function Preguntas() {
  return (
    <Seccion fondo="crema" id="preguntas">
      <TituloSeccion
        etiqueta="Preguntas frecuentes"
        titulo="Lo que más nos preguntan"
        descripcion="Si tu duda no está aquí, escríbenos por WhatsApp: contestamos el mismo día."
      />

      <div className="mt-10 max-w-3xl divide-y divide-arena-300 border-y border-arena-300">
        {PREGUNTAS.map((item) => (
          <details key={item.pregunta} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-marca-900 marker:content-none">
              {item.pregunta}
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full border border-arena-400 text-arena-600 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-5 leading-relaxed text-arena-700">{item.respuesta}</p>
          </details>
        ))}
      </div>
    </Seccion>
  );
}
