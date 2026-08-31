import { AlertTriangle } from "lucide-react";

/**
 * Aviso de que un documento legal todavía no ha pasado por revisión de un
 * abogado. Va arriba de /politica-de-datos y /terminos, y hay que borrarlo
 * cuando el texto quede aprobado.
 */
export default function AvisoLegal() {
  return (
    <div
      role="note"
      className="flex gap-4 rounded-card border-2 border-neon/40 bg-neon/10 p-5"
    >
      <AlertTriangle
        aria-hidden="true"
        className="mt-0.5 size-6 shrink-0 text-neon"
      />
      <div>
        <p className="font-bold text-neon">
          Documento pendiente de revisión legal
        </p>
        <p className="mt-2 leading-relaxed text-hueso/85">
          Este texto es un borrador de referencia redactado para dar estructura al
          sitio. <strong>No sustituye el concepto de un abogado.</strong> Antes de
          publicar, debe ser revisado y aprobado por un profesional del derecho en
          Colombia, y hay que completar los datos del responsable del tratamiento
          (razón social, NIT, domicilio y correo de contacto para el ejercicio de
          derechos).
        </p>
      </div>
    </div>
  );
}
