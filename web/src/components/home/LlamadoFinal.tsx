import { MessageCircle } from "lucide-react";

import { BotonEnlace } from "@/components/ui/Boton";
import { siteConfig } from "@/config/site";
import { enlaceWhatsAppDirecto } from "@/lib/leads";

export default function LlamadoFinal() {
  return (
    <section className="bg-arena-50 pb-16 sm:pb-24">
      <div className="contenedor-sitio">
        <div className="trama-marca rounded-card px-7 py-12 sm:px-12 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight font-bold text-arena-50 sm:text-4xl">
              ¿Empezamos hoy?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-arena-200">
              Cuéntanos qué necesitas —comprar, vender, financiar, asegurar o un
              trámite— y te respondemos el mismo día. Sin compromiso y sin
              desplazarte.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BotonEnlace
                href={enlaceWhatsAppDirecto(
                  "quiero asesoría sobre compra, venta o financiación de un vehículo.",
                )}
                variante="acento"
                tamano="lg"
                externo
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                Escribir por WhatsApp
              </BotonEnlace>
              <BotonEnlace href="/contacto" variante="claro" tamano="lg">
                Dejar mis datos
              </BotonEnlace>
            </div>

            <p className="mt-6 text-sm text-arena-400">
              {siteConfig.horarios.texto}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
