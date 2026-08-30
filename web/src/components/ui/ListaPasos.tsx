import { Check } from "lucide-react";

/** Lista numerada de pasos, usada en las páginas de servicio. */
export function ListaPasos({
  pasos,
}: {
  pasos: readonly { titulo: string; texto: string }[];
}) {
  return (
    <ol className="space-y-6">
      {pasos.map((paso, indice) => (
        <li key={paso.titulo} className="flex gap-4">
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-marca-800 font-bold text-arena-50"
          >
            {indice + 1}
          </span>
          <div>
            <h3 className="font-bold text-marca-900">{paso.titulo}</h3>
            <p className="mt-1.5 leading-relaxed text-arena-700">{paso.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Lista de requisitos o de lo que incluye un servicio. */
export function ListaChequeo({
  items,
  titulo,
}: {
  items: readonly string[];
  titulo?: string;
}) {
  return (
    <div>
      {titulo && <h3 className="mb-4 font-bold text-marca-900">{titulo}</h3>}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-marca-600"
            />
            <span className="leading-relaxed text-arena-800">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
