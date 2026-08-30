/**
 * Configuracion editable del sitio.
 *
 * ESTE ES EL UNICO ARCHIVO QUE HAY QUE TOCAR para cambiar datos de contacto,
 * numero de WhatsApp, redes, horarios o la tasa por defecto del simulador.
 *
 * Los valores marcados con TODO son placeholders: reemplazalos por los reales
 * antes de publicar. Ver la seccion "Placeholders" del README.
 */

export const siteConfig = {
  nombre: "Aburrá Motors",
  nombreCorto: "Aburrá Motors",
  eslogan: "Compra, vende y financia tu vehículo 100% online.",
  descripcion:
    "Compraventa de vehículos 100% virtual en el Valle de Aburrá. Compra, venta, financiación, retoma, seguros, trámites y consignación sin desplazarte.",

  // TODO: reemplazar por el dominio real cuando exista.
  // Hoy apunta a GitHub Pages porque es donde se publica la fase 1.
  url: "https://cbaldor19.github.io/AburraMotors",

  // ---------------------------------------------------------------------
  // Contacto
  // ---------------------------------------------------------------------

  /**
   * TODO: NUMERO DE WHATSAPP REAL.
   * Formato internacional, solo digitos, sin "+" ni espacios.
   * Ejemplo Colombia: 57 + celular de 10 digitos -> 573001234567
   */
  whatsapp: "573001112233",

  /** Version legible del mismo numero, para mostrar en pantalla. */
  whatsappVisible: "+57 300 111 2233", // TODO: reemplazar

  email: "contacto@aburramotors.com", // TODO: reemplazar

  /**
   * Operacion 100% virtual: no hay vitrina. Se muestra la zona de cobertura,
   * no una direccion. Si algun dia hay oficina, agregala aqui.
   */
  ciudad: "Medellín",
  region: "Valle de Aburrá",
  departamento: "Antioquia",
  pais: "Colombia",
  codigoPais: "CO",
  cobertura: [
    "Medellín",
    "Envigado",
    "Sabaneta",
    "Itagüí",
    "Bello",
    "La Estrella",
    "Caldas",
    "Copacabana",
    "Girardota",
    "Barbosa",
  ],

  /** Coordenadas aproximadas del centro de Medellín, para el JSON-LD. */
  geo: { lat: 6.2442, lng: -75.5812 },

  horarios: {
    // TODO: confirmar horarios reales de atencion.
    texto: "Lunes a viernes 8:00 a.m. – 6:00 p.m. · Sábados 9:00 a.m. – 2:00 p.m.",
    estructurado: [
      { dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], abre: "08:00", cierra: "18:00" },
      { dias: ["Saturday"], abre: "09:00", cierra: "14:00" },
    ],
  },

  redes: {
    // TODO: reemplazar por los perfiles reales (o dejar en null para ocultarlos).
    instagram: "https://instagram.com/aburramotors",
    facebook: "https://facebook.com/aburramotors",
    tiktok: "https://tiktok.com/@aburramotors",
    youtube: null as string | null,
  },

  // ---------------------------------------------------------------------
  // Financiacion
  // ---------------------------------------------------------------------

  financiacion: {
    /**
     * TODO: CONFIRMAR CON LAS ENTIDADES ALIADAS.
     * Tasa mensual en porcentaje usada por defecto en el simulador.
     * Debe coincidir con api/.env -> TASA_MENSUAL_POR_DEFECTO
     */
    tasaMensualPorDefecto: 1.45,
    tasaMensualMinima: 0.8,
    tasaMensualMaxima: 2.5,

    plazoMinimoMeses: 12,
    plazoMaximoMeses: 84,
    plazoPorDefectoMeses: 60,

    /** Porcentaje de cuota inicial sugerido sobre el precio del vehículo. */
    cuotaInicialSugeridaPct: 20,

    /** Porcentaje máximo del precio que se puede financiar. */
    porcentajeMaximoFinanciable: 90,
  },

  // ---------------------------------------------------------------------
  // Metadatos y analitica
  // ---------------------------------------------------------------------

  /** TODO: agregar cuando exista (ej. "G-XXXXXXXXXX"). null = desactivado. */
  googleAnalyticsId: null as string | null,

  /** TODO: codigo de verificacion de Google Search Console. */
  googleSiteVerification: null as string | null,
} as const;

export type SiteConfig = typeof siteConfig;

/** Los 7 servicios del negocio, en el orden en que se comunican. */
export const servicios = [
  {
    slug: "compra-venta",
    titulo: "Compra y venta",
    resumen: "Vehículos revisados, con papeles al día y precio de mercado.",
    descripcion:
      "Publicamos, mostramos y negociamos tu vehículo por ti. Tú decides el precio, nosotros ponemos el alcance y el respaldo.",
    href: "/vehiculos",
    icono: "car",
  },
  {
    slug: "financiacion",
    titulo: "Financiación y créditos",
    resumen: "Simula tu cuota y radica tu crédito sin salir de casa.",
    descripcion:
      "Trabajamos con varias entidades para conseguirte el mejor plazo y la mejor tasa según tu perfil.",
    href: "/financiacion",
    icono: "calculator",
  },
  {
    slug: "retoma",
    titulo: "Retoma",
    resumen: "Entrega tu carro actual como parte de pago del siguiente.",
    descripcion:
      "Avaluamos tu vehículo y descontamos su valor del que vas a comprar. Un solo trámite, un solo día.",
    href: "/vender",
    icono: "repeat",
  },
  {
    slug: "seguros",
    titulo: "Seguros",
    resumen: "SOAT y todo riesgo con las principales aseguradoras del país.",
    descripcion:
      "Comparamos coberturas y deducibles, te explicamos la letra menuda y expedimos en línea.",
    href: "/seguros",
    icono: "shield",
  },
  {
    slug: "tramites",
    titulo: "Trámites",
    resumen: "Traspasos, RUNT, SOAT y tecnomecánica sin filas.",
    descripcion:
      "Nos encargamos del papeleo de principio a fin y te mantenemos informado del estado en cada paso.",
    href: "/tramites",
    icono: "file-text",
  },
  {
    slug: "consignacion",
    titulo: "Consignación",
    resumen: "Tu carro en nuestra vitrina virtual, tú conservas la propiedad.",
    descripcion:
      "Lo publicamos, atendemos a los interesados y solo cobramos cuando se vende.",
    href: "/consignacion",
    icono: "handshake",
  },
  {
    slug: "inventario",
    titulo: "Inventario propio y de terceros",
    resumen: "Carros nuestros y en consignación, todos verificados.",
    descripcion:
      "Cada ficha dice claramente si el vehículo es de nuestro inventario o de un tercero en consignación.",
    href: "/vehiculos",
    icono: "layers",
  },
] as const;

export type Servicio = (typeof servicios)[number];
