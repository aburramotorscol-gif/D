/**
 * Inyecta un bloque de datos estructurados JSON-LD.
 *
 * El contenido lo generamos nosotros en src/lib/jsonld.ts (nunca viene del
 * usuario), por eso es seguro serializarlo directo. Se escapa `<` para evitar
 * que un valor con "</script>" cierre la etiqueta antes de tiempo.
 */
export default function JsonLd({ datos }: { datos: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, "\u003c"),
      }}
    />
  );
}
