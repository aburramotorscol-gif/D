import { siteConfig } from "@/config/site";
import { enlaceWhatsAppDirecto } from "@/lib/leads";

/**
 * Botón flotante de WhatsApp.
 *
 * La mayoría del tráfico llega por celular desde un enlace de WhatsApp, así
 * que el camino de vuelta al chat tiene que estar siempre a la vista. En
 * escritorio se muestra más discreto, en la esquina.
 */
export default function BotonWhatsAppFlotante() {
  return (
    <a
      href={enlaceWhatsAppDirecto("vengo de la página web y quiero información.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-30 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pr-5 pl-4 font-semibold text-[#0b3b22] shadow-elevada transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      {/* Isotipo oficial de WhatsApp, dibujado para no depender de un archivo. */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-6 shrink-0"
        fill="currentColor"
      >
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2.5c-5.23 0-9.48 4.25-9.48 9.48 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.44 9.44 0 0 0 4.64 1.2h.01c5.22 0 9.47-4.25 9.47-9.48 0-2.53-.99-4.91-2.78-6.7a9.4 9.4 0 0 0-6.7-2.74zm0 17.34h-.01c-1.47 0-2.91-.4-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a7.85 7.85 0 0 1-1.21-4.2 7.88 7.88 0 0 1 13.46-5.58 7.83 7.83 0 0 1 2.31 5.58 7.89 7.89 0 0 1-7.87 7.88z" />
      </svg>

      <span className="text-sm sm:text-base">
        <span className="sm:hidden">WhatsApp</span>
        <span className="hidden sm:inline">Escríbenos por WhatsApp</span>
      </span>

      <span className="sr-only">
        Abre una conversación de WhatsApp con {siteConfig.nombre} en una pestaña nueva
      </span>
    </a>
  );
}
