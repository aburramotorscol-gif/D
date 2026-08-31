import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";

import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import Seccion, { TituloSeccion } from "@/components/ui/Seccion";
import FormularioLead from "@/components/formularios/FormularioLead";
import { siteConfig } from "@/config/site";
import { enlaceWhatsAppDirecto } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp o déjanos tus datos. Atendemos toda el área metropolitana del Valle de Aburrá y respondemos el mismo día hábil.",
  alternates: { canonical: "/contacto" },
};

const CAMPOS = [
  {
    nombre: "rutaPreferida",
    etiqueta: "¿En qué te podemos ayudar?",
    tipo: "select",
    requerido: true,
    ancho: "completo",
    opciones: [
      { valor: "Comprar un vehículo", texto: "Quiero comprar un vehículo" },
      { valor: "Vender un vehículo", texto: "Quiero vender mi vehículo" },
      { valor: "Financiación", texto: "Necesito financiación" },
      { valor: "Seguros", texto: "Quiero cotizar un seguro" },
      { valor: "Trámites", texto: "Necesito un trámite" },
      { valor: "Consignación", texto: "Quiero consignar mi vehículo" },
      { valor: "Otro", texto: "Otra cosa" },
    ],
  },
] as const;

export default function PaginaContacto() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Contacto"
        titulo="Hablemos"
        descripcion="La vía más rápida es WhatsApp: ahí contestamos el mismo día hábil. Si prefieres, déjanos tus datos y te escribimos nosotros."
      />

      <Seccion fondo="claro">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <TituloSeccion etiqueta="Canales" titulo="Cómo contactarnos" />

            <ul className="mt-8 space-y-6">
              <li>
                <a
                  href={enlaceWhatsAppDirecto("quiero información.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-card border border-celeste/15 bg-panel p-5 transition-colors hover:border-teal-claro"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal/30 text-celeste transition-colors group-hover:bg-teal group-hover:text-hueso">
                    <MessageCircle aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-hueso">WhatsApp</h3>
                    <p className="mt-1 text-hueso/75">
                      {siteConfig.whatsappVisible}
                    </p>
                    <p className="mt-1 text-sm text-hueso/60">
                      El canal más rápido. Se abre en una pestaña nueva.
                    </p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex gap-4 rounded-card border border-celeste/15 bg-panel p-5 transition-colors hover:border-teal-claro"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal/30 text-celeste transition-colors group-hover:bg-teal group-hover:text-hueso">
                    <Mail aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-hueso">Correo</h3>
                    <p className="mt-1 break-all text-hueso/75">{siteConfig.email}</p>
                    <p className="mt-1 text-sm text-hueso/60">
                      Para documentos y temas que necesiten constancia escrita.
                    </p>
                  </div>
                </a>
              </li>

              <li className="flex gap-4 rounded-card border border-celeste/15 bg-panel/70 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-panel-alto text-hueso/75">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-hueso">Dónde estamos</h3>
                  <p className="mt-1 leading-relaxed text-hueso/75">
                    Operamos 100 % en línea, sin vitrina física. Cubrimos{" "}
                    {siteConfig.ciudad} y todo el {siteConfig.region},{" "}
                    {siteConfig.departamento}.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-card border border-celeste/15 bg-panel/70 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-panel-alto text-hueso/75">
                  <Clock aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-hueso">Horario de atención</h3>
                  <p className="mt-1 leading-relaxed text-hueso/75">
                    {siteConfig.horarios.texto}
                  </p>
                  <p className="mt-1 text-sm text-hueso/60">
                    Fuera de horario puedes escribirnos igual: contestamos apenas
                    abrimos.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <TituloSeccion
              etiqueta="Formulario"
              titulo="Déjanos tus datos"
              descripcion="Te escribimos nosotros. Si es urgente, mejor usa WhatsApp."
            />
            <div className="mt-8">
              <FormularioLead
                tipo="contacto"
                campos={CAMPOS}
                textoBoton="Enviar mensaje"
                etiquetaMensaje="Tu mensaje"
                queSigue="Te contactamos el mismo día hábil por WhatsApp o por el canal que prefieras."
              />
            </div>
          </div>
        </div>
      </Seccion>
    </>
  );
}
