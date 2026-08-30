import { siteConfig } from "@/config/site";

/**
 * Logotipo tipográfico dibujado en SVG/HTML: sin archivo de imagen, nítido en
 * cualquier densidad de pantalla y sin una petición extra.
 *
 * TODO: si algún día hay un logo definitivo del diseñador, reemplaza este
 * componente por el SVG real manteniendo el mismo nombre y tamaño.
 */
export default function Logo({ claro = false }: { claro?: boolean }) {
  const colorTexto = claro ? "text-arena-50" : "text-marca-900";
  const colorApellido = claro ? "text-arena-300" : "text-arena-600";

  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-xl bg-marca-800 lg:size-10"
      >
        {/* Monograma AM: la A y la M compartiendo el trazo diagonal. */}
        <svg viewBox="0 0 24 24" className="size-5 lg:size-[1.375rem]" fill="none">
          <path
            d="M3 19 L8.5 5 L11.5 12.5"
            stroke="var(--color-acento-400)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19 L12 8 L16 14 L20 8 L20 19"
            stroke="var(--color-arena-50)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-display)] text-[1.05rem] font-bold tracking-tight lg:text-lg ${colorTexto}`}
        >
          Aburrá<span className={colorApellido}> Motors</span>
        </span>
        <span
          className={`mt-0.5 hidden text-[0.62rem] font-medium tracking-[0.14em] uppercase sm:block ${colorApellido}`}
        >
          100 % online · {siteConfig.region}
        </span>
      </span>
    </span>
  );
}
