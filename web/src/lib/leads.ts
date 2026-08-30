import { siteConfig } from "@/config/site";
import { formatearKilometraje, formatearPesos } from "@/lib/formato";

/**
 * ====================================================================
 * PUNTO ÚNICO DE CAMBIO PARA TODOS LOS ENVÍOS DE FORMULARIO DEL SITIO
 * ====================================================================
 *
 * Hoy (fase 1, sitio estático): `enviarLead` compone un mensaje prellenado y
 * abre WhatsApp (https://wa.me/<numero>?text=...). No hay servidor, así que no
 * hay a dónde hacer POST.
 *
 * Mañana (fase 2, con backend): la única función que cambia es `enviarLead`.
 * Abajo está la implementación de `POST /leads` lista, comentada. Ninguna
 * vista ni ningún formulario tiene que tocarse: todos llaman a `enviarLead`.
 *
 * Los nombres de campo coinciden con `api/app/schemas/lead.py` a propósito.
 */

export type TipoLead =
  | "compra"
  | "venta"
  | "financiacion"
  | "retoma"
  | "seguros"
  | "tramites"
  | "consignacion"
  | "contacto";

/** Datos específicos de cada formulario (marca del carro que vende, etc.). */
export type DatosExtra = Record<string, string | number | boolean | null | undefined>;

export interface Lead {
  tipo: TipoLead;
  nombre: string;
  telefono: string;
  email?: string;
  ciudad?: string;
  mensaje?: string;
  /** Slug del vehículo de interés, si la solicitud nace de una ficha. */
  vehiculoSlug?: string;
  /** Título legible del vehículo, solo para redactar el mensaje. */
  vehiculoTitulo?: string;
  datos?: DatosExtra;
  aceptaPoliticaDatos: boolean;
}

export interface ResultadoEnvio {
  ok: boolean;
  /** Por dónde salió la solicitud. Útil para analítica más adelante. */
  canal: "whatsapp" | "api";
  /** URL abierta, cuando el canal es WhatsApp. */
  url?: string;
  error?: string;
}

const TITULOS: Record<TipoLead, string> = {
  compra: "Solicitud de compra",
  venta: "Quiero vender mi carro",
  financiacion: "Solicitud de financiación",
  retoma: "Solicitud de retoma",
  seguros: "Cotización de seguro",
  tramites: "Solicitud de trámite",
  consignacion: "Solicitud de consignación",
  contacto: "Contacto general",
};

// ---------------------------------------------------------------------------
// Composición del mensaje de WhatsApp
// ---------------------------------------------------------------------------

/** Etiquetas legibles para las claves de `datos`, en el orden de aparición. */
const ETIQUETAS_DATOS: Record<string, string> = {
  marca: "Marca",
  linea: "Línea",
  modelo: "Modelo (año)",
  anio: "Año",
  kilometraje: "Kilometraje",
  placa: "Placa",
  estadoGeneral: "Estado general",
  rutaPreferida: "Qué busca",
  precioEsperado: "Precio esperado",
  precioVehiculo: "Precio del vehículo",
  cuotaInicial: "Cuota inicial",
  plazoMeses: "Plazo",
  tasaMensual: "Tasa mensual",
  cuotaMensual: "Cuota mensual estimada",
  totalAPagar: "Total a pagar estimado",
  totalIntereses: "Total intereses estimado",
  tipoSeguro: "Tipo de seguro",
  aseguradoraActual: "Aseguradora actual",
  tipoTramite: "Trámite solicitado",
  ingresosMensuales: "Ingresos mensuales aproximados",
};

function formatearValor(clave: string, valor: unknown): string {
  if (valor === null || valor === undefined || valor === "") return "";

  if (typeof valor === "boolean") return valor ? "Sí" : "No";

  if (typeof valor === "number") {
    if (/precio|cuota|total|ingresos/i.test(clave)) return formatearPesos(valor);
    if (/kilometraje/i.test(clave)) return formatearKilometraje(valor);
    if (/plazo/i.test(clave)) return `${valor} meses`;
    if (/tasa/i.test(clave)) return `${valor.toString().replace(".", ",")} % mensual`;
    return valor.toString();
  }

  return String(valor);
}

/**
 * Redacta el mensaje que el cliente verá ya escrito en WhatsApp.
 * Se mantiene corto y escaneable: llega a un celular, no a un correo.
 */
export function componerMensaje(lead: Lead): string {
  const lineas: string[] = [];

  lineas.push(`*${TITULOS[lead.tipo]}* — ${siteConfig.nombre}`);
  lineas.push("");
  lineas.push(`Hola, soy ${lead.nombre}.`);

  if (lead.vehiculoTitulo) {
    lineas.push("");
    lineas.push(`Me interesa este vehículo: *${lead.vehiculoTitulo}*`);
    if (lead.vehiculoSlug) {
      lineas.push(`${siteConfig.url}/vehiculos/${lead.vehiculoSlug}/`);
    }
  }

  const detalles = Object.entries(lead.datos ?? {})
    .map(([clave, valor]) => [clave, formatearValor(clave, valor)] as const)
    .filter(([, valor]) => valor !== "");

  if (detalles.length > 0) {
    lineas.push("");
    for (const [clave, valor] of detalles) {
      lineas.push(`• ${ETIQUETAS_DATOS[clave] ?? clave}: ${valor}`);
    }
  }

  if (lead.mensaje?.trim()) {
    lineas.push("");
    lineas.push(lead.mensaje.trim());
  }

  lineas.push("");
  lineas.push("--- Mis datos de contacto ---");
  lineas.push(`Teléfono: ${lead.telefono}`);
  if (lead.email?.trim()) lineas.push(`Correo: ${lead.email.trim()}`);
  if (lead.ciudad?.trim()) lineas.push(`Ciudad: ${lead.ciudad.trim()}`);

  return lineas.join("\n");
}

/** Enlace `wa.me` con el mensaje ya prellenado y codificado. */
export function construirEnlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/**
 * Enlace directo para los botones que no son formulario (hero, ficha de
 * vehículo, botón flotante). Se puede renderizar en el servidor.
 */
export function enlaceWhatsAppDirecto(texto: string): string {
  return construirEnlaceWhatsApp(`Hola, ${texto}`);
}

// ---------------------------------------------------------------------------
// Envío
// ---------------------------------------------------------------------------

/**
 * Envía la solicitud. ESTA es la función que hay que cambiar en la fase 2.
 *
 * Fase 1: abre WhatsApp con el mensaje prellenado.
 * Fase 2: descomentar `enviarLeadAlBackend` y llamarla desde aquí.
 */
export async function enviarLead(lead: Lead): Promise<ResultadoEnvio> {
  if (!lead.aceptaPoliticaDatos) {
    return {
      ok: false,
      canal: "whatsapp",
      error: "Debes aceptar la política de tratamiento de datos para continuar.",
    };
  }

  const url = construirEnlaceWhatsApp(componerMensaje(lead));

  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return { ok: true, canal: "whatsapp", url };
}

/**
 * FASE 2 — implementación contra el backend FastAPI.
 *
 * Para activarla:
 *   1. Definir NEXT_PUBLIC_API_URL en el entorno del frontend.
 *   2. Reemplazar el cuerpo de `enviarLead` por:
 *        return enviarLeadAlBackend(lead);
 *   3. Quitar `output: "export"` de next.config.ts si además se quiere usar
 *      route handlers o Server Actions (ver README).
 *
 * Se deja escrita y tipada para que el cambio sea de una línea.
 */
export async function enviarLeadAlBackend(lead: Lead): Promise<ResultadoEnvio> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) {
    return { ok: false, canal: "api", error: "NEXT_PUBLIC_API_URL no está configurada." };
  }

  try {
    const respuesta = await fetch(`${base}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: lead.tipo,
        nombre: lead.nombre,
        telefono: lead.telefono,
        email: lead.email || null,
        ciudad: lead.ciudad || null,
        mensaje: lead.mensaje || null,
        vehiculo_slug: lead.vehiculoSlug || null,
        datos: lead.datos ?? {},
        origen_url: typeof window !== "undefined" ? window.location.href : null,
        acepta_politica_datos: lead.aceptaPoliticaDatos,
      }),
    });

    if (!respuesta.ok) {
      const cuerpo = await respuesta.json().catch(() => null);
      return {
        ok: false,
        canal: "api",
        error: cuerpo?.error?.mensaje ?? "No pudimos registrar tu solicitud.",
      };
    }

    return { ok: true, canal: "api" };
  } catch {
    return {
      ok: false,
      canal: "api",
      error: "No pudimos conectarnos. Revisa tu conexión e intenta de nuevo.",
    };
  }
}
