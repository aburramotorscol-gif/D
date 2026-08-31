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
            className="cifra grid size-9 shrink-0 place-items-center rounded-full bg-neon text-lg font-bold text-tinta"
          >
            {indice + 1}
          </span>
          <div>
            <h3 className="font-bold text-hueso">{paso.titulo}</h3>
            <p className="mt-1.5 leading-relaxed text-hueso/75">{paso.texto}</p>
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
      {titulo && <h3 className="mb-4 font-bold text-hueso">{titulo}</h3>}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-neon"
            />
            <span className="leading-relaxed text-hueso/85">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
