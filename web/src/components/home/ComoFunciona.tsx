import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import { BotonEnlace } from "@/components/ui/Boton";

const PASOS = [
  {
    numero: "01",
    titulo: "Escoge o cotiza",
    texto:
      "Mira el catálogo y filtra por lo que te sirve, o cuéntanos qué carro quieres vender. Simula tu cuota en segundos con el simulador de crédito.",
  },
  {
    numero: "02",
    titulo: "Hablamos por WhatsApp",
    texto:
      "Te contactamos el mismo día. Resolvemos dudas, coordinamos el estudio de crédito o el avalúo y te enviamos fotos y videos adicionales si los necesitas.",
  },
  {
    numero: "03",
    titulo: "Firmamos y te entregamos",
    texto:
      "Hacemos el traspaso, el SOAT y la tecnomecánica. Te llevamos el vehículo y los papeles donde estés, en cualquier municipio del Valle de Aburrá.",
  },
] as const;

export default function ComoFunciona() {
  return (
    <Seccion fondo="oscuro" id="como-funciona">
      <TituloSeccion
        etiqueta="Cómo funciona"
        titulo="Tres pasos, cero filas"
        descripcion="No hay vitrina que visitar ni turnos que sacar. Todo el proceso avanza desde tu celular, y solo nos vemos el día de la entrega."
        claro
      />

      <ol className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-6">
        {PASOS.map((paso) => (
          <li
            key={paso.numero}
            className="relative rounded-card border border-marca-800 bg-marca-950/40 p-7"
          >
            <span
              aria-hidden="true"
              className="font-[family-name:var(--font-display)] text-4xl font-bold text-acento-500/70"
            >
              {paso.numero}
            </span>
            <h3 className="mt-3 text-xl font-bold text-arena-50">{paso.titulo}</h3>
            <p className="mt-3 leading-relaxed text-arena-300">{paso.texto}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <BotonEnlace href="/vehiculos" variante="acento" tamano="lg">
          Empezar por el catálogo
        </BotonEnlace>
        <BotonEnlace href="/financiacion" variante="claro" tamano="lg">
          Simular mi cuota
        </BotonEnlace>
      </div>
    </Seccion>
  );
}
