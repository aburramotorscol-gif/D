import Image from "next/image";

import { siteConfig } from "@/config/site";
import { rutaPublica } from "@/lib/rutas";

/**
 * Logotipo oficial de la marca.
 *
 * Los archivos de `public/marca/` son los entregados por diseño, con el texto
 * ya convertido a curvas (por eso no hacen falta las fuentes Horizon Bold ni
 * Michroma). Vienen en dos colores: verde neón para casi todo el sitio, y
 * blanco roto por si algún bloque lo necesita.
 *
 * Se usan como archivo y no en línea para que el navegador los cachee una sola
 * vez: el imagotipo pesa 16 KB comprimido y aparece en cabecera y pie.
 */

/** Imagotipo completo: isotipo + "ABURRÁ MOTORS". Proporción 743 × 160. */
export default function Logo({
  hueso = false,
  className = "h-8 w-auto lg:h-9",
}: {
  /** Úsalo sobre fondos donde el neón no contrasta bien. */
  hueso?: boolean;
  className?: string;
}) {
  const archivo = hueso
    ? "/marca/aburra-motors-logo-hueso.svg"
    : "/marca/aburra-motors-logo.svg";

  return (
    <Image
      src={rutaPublica(archivo)}
      alt={siteConfig.nombre}
      width={743}
      height={160}
      priority
      className={className}
    />
  );
}

/** Solo el isotipo (la "A" en forma de swoosh). Proporción 239 × 152. */
export function Isotipo({
  hueso = false,
  className = "h-8 w-auto",
}: {
  hueso?: boolean;
  className?: string;
}) {
  const archivo = hueso
    ? "/marca/aburra-motors-isotipo-hueso.svg"
    : "/marca/aburra-motors-isotipo.svg";

  return (
    <Image
      src={rutaPublica(archivo)}
      alt=""
      width={239}
      height={152}
      className={className}
    />
  );
}
