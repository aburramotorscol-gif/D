"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";

import { enviarLead, type DatosExtra, type TipoLead } from "@/lib/leads";

/**
 * Formulario de solicitud, compartido por todas las páginas de servicio.
 *
 * Cada página declara sus campos propios en `campos`; los datos de contacto
 * (nombre, teléfono, correo, ciudad, mensaje) siempre son los mismos. El envío
 * siempre pasa por `enviarLead`, el punto único de cambio de src/lib/leads.ts.
 */

export interface CampoExtra {
  /** Clave con la que viaja en `datos`. Ver ETIQUETAS_DATOS en lib/leads.ts. */
  nombre: string;
  etiqueta: string;
  tipo: "texto" | "numero" | "select" | "textarea";
  opciones?: readonly { valor: string; texto: string }[];
  requerido?: boolean;
  ayuda?: string;
  placeholder?: string;
  /** En escritorio: ocupa media fila o la fila completa. */
  ancho?: "mitad" | "completo";
}

interface Props {
  tipo: TipoLead;
  campos?: readonly CampoExtra[];
  textoBoton?: string;
  /** Texto del campo libre. Si es null, no se muestra. */
  etiquetaMensaje?: string | null;
  vehiculoSlug?: string;
  vehiculoTitulo?: string;
  /** Qué pasa después de enviar, en la confirmación. */
  queSigue?: string;
}

const CLASES_CAMPO =
  "w-full rounded-xl border border-celeste/20 bg-panel px-4 py-3 text-hueso " +
  "placeholder:text-hueso/55 focus:border-teal-claro focus:outline-none";

const CLASES_ETIQUETA = "mb-2 block text-sm font-semibold text-hueso/85";

export default function FormularioLead({
  tipo,
  campos = [],
  textoBoton = "Enviar solicitud",
  etiquetaMensaje = "Cuéntanos más (opcional)",
  vehiculoSlug,
  vehiculoTitulo,
  queSigue,
}: Props) {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState<{ url?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setError(null);
    setEnviando(true);

    const formulario = new FormData(evento.currentTarget);
    const leer = (clave: string) => String(formulario.get(clave) ?? "").trim();

    const datos: DatosExtra = {};
    for (const campo of campos) {
      const valor = leer(campo.nombre);
      if (valor === "") continue;
      datos[campo.nombre] = campo.tipo === "numero" ? Number(valor) : valor;
    }

    const resultado = await enviarLead({
      tipo,
      nombre: leer("nombre"),
      telefono: leer("telefono"),
      email: leer("email") || undefined,
      ciudad: leer("ciudad") || undefined,
      mensaje: leer("mensaje") || undefined,
      vehiculoSlug,
      vehiculoTitulo,
      datos,
      aceptaPoliticaDatos: formulario.get("politica") === "on",
    });

    setEnviando(false);

    if (resultado.ok) {
      setEnviado({ url: resultado.url });
    } else {
      setError(resultado.error ?? "No pudimos enviar tu solicitud.");
    }
  }

  if (enviado) {
    return (
      <div
        role="status"
        className="rounded-card border border-teal-claro bg-panel p-7 text-center"
      >
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto size-11 text-neon"
        />
        <h3 className="mt-4 text-xl font-bold text-hueso">
          Abrimos WhatsApp con tu solicitud
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-hueso/75">
          {queSigue ??
            "Solo tienes que darle enviar en el chat. Te respondemos el mismo día en horario de atención."}
        </p>

        {enviado.url && (
          <a
            href={enviado.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-hueso hover:bg-panel"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            ¿No se abrió? Abrir WhatsApp
          </a>
        )}

        <p className="mt-5 text-sm text-hueso/60">
          <button
            type="button"
            onClick={() => setEnviado(null)}
            className="font-semibold text-celeste underline underline-offset-2"
          >
            Enviar otra solicitud
          </button>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={manejarEnvio}
      noValidate={false}
      className="rounded-card border border-celeste/15 bg-panel p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="nombre" className={CLASES_ETIQUETA}>
            Nombre completo <span aria-hidden="true">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Como aparece en tu cédula"
            className={CLASES_CAMPO}
          />
        </div>

        <div>
          <label htmlFor="telefono" className={CLASES_ETIQUETA}>
            Celular (WhatsApp) <span aria-hidden="true">*</span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="300 123 4567"
            className={CLASES_CAMPO}
          />
        </div>

        <div>
          <label htmlFor="email" className={CLASES_ETIQUETA}>
            Correo <span className="font-normal text-hueso/50">(opcional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            className={CLASES_CAMPO}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="ciudad" className={CLASES_ETIQUETA}>
            Municipio <span className="font-normal text-hueso/50">(opcional)</span>
          </label>
          <input
            id="ciudad"
            name="ciudad"
            type="text"
            autoComplete="address-level2"
            placeholder="Medellín, Envigado, Bello…"
            className={CLASES_CAMPO}
          />
        </div>

        {campos.map((campo) => {
          const id = `campo-${campo.nombre}`;
          const idAyuda = campo.ayuda ? `${id}-ayuda` : undefined;
          const colSpan =
            campo.ancho === "completo" || campo.tipo === "textarea"
              ? "sm:col-span-2"
              : "";

          return (
            <div key={campo.nombre} className={colSpan}>
              <label htmlFor={id} className={CLASES_ETIQUETA}>
                {campo.etiqueta}{" "}
                {campo.requerido ? (
                  <span aria-hidden="true">*</span>
                ) : (
                  <span className="font-normal text-hueso/50">(opcional)</span>
                )}
              </label>

              {campo.tipo === "select" ? (
                <select
                  id={id}
                  name={campo.nombre}
                  required={campo.requerido}
                  defaultValue=""
                  aria-describedby={idAyuda}
                  className={CLASES_CAMPO}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {campo.opciones?.map((opcion) => (
                    <option key={opcion.valor} value={opcion.valor}>
                      {opcion.texto}
                    </option>
                  ))}
                </select>
              ) : campo.tipo === "textarea" ? (
                <textarea
                  id={id}
                  name={campo.nombre}
                  required={campo.requerido}
                  rows={4}
                  placeholder={campo.placeholder}
                  aria-describedby={idAyuda}
                  className={CLASES_CAMPO}
                />
              ) : (
                <input
                  id={id}
                  name={campo.nombre}
                  type={campo.tipo === "numero" ? "number" : "text"}
                  inputMode={campo.tipo === "numero" ? "numeric" : undefined}
                  min={campo.tipo === "numero" ? 0 : undefined}
                  required={campo.requerido}
                  placeholder={campo.placeholder}
                  aria-describedby={idAyuda}
                  className={CLASES_CAMPO}
                />
              )}

              {campo.ayuda && (
                <p id={idAyuda} className="mt-1.5 text-sm text-hueso/60">
                  {campo.ayuda}
                </p>
              )}
            </div>
          );
        })}

        {etiquetaMensaje && (
          <div className="sm:col-span-2">
            <label htmlFor="mensaje" className={CLASES_ETIQUETA}>
              {etiquetaMensaje}
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={4}
              placeholder="Escríbenos cualquier detalle que nos ayude a atenderte mejor."
              className={CLASES_CAMPO}
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="politica"
          name="politica"
          type="checkbox"
          required
          className="mt-1 size-4 shrink-0 accent-neon"
        />
        <label htmlFor="politica" className="text-sm leading-relaxed text-hueso/75">
          Autorizo el tratamiento de mis datos personales conforme a la{" "}
          <Link
            href="/politica-de-datos"
            className="font-medium text-celeste underline underline-offset-2"
          >
            política de tratamiento de datos
          </Link>{" "}
          (Ley 1581 de 2012). <span aria-hidden="true">*</span>
        </label>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neon px-7 py-3.5 font-semibold text-tinta transition-colors hover:bg-neon-claro disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send aria-hidden="true" className="size-5" />
        {enviando ? "Enviando…" : textoBoton}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-hueso/50">
        Al enviar se abre WhatsApp con el mensaje ya escrito. Revísalo y dale
        enviar: así queda la conversación en tu propio chat.
      </p>
    </form>
  );
}
