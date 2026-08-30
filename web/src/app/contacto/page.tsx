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
                  className="group flex gap-4 rounded-card border border-arena-200 bg-white p-5 transition-colors hover:border-marca-300"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-marca-100 text-marca-800 transition-colors group-hover:bg-marca-800 group-hover:text-arena-50">
                    <MessageCircle aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-marca-900">WhatsApp</h3>
                    <p className="mt-1 text-arena-700">
                      {siteConfig.whatsappVisible}
                    </p>
                    <p className="mt-1 text-sm text-arena-600">
                      El canal más rápido. Se abre en una pestaña nueva.
                    </p>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex gap-4 rounded-card border border-arena-200 bg-white p-5 transition-colors hover:border-marca-300"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-marca-100 text-marca-800 transition-colors group-hover:bg-marca-800 group-hover:text-arena-50">
                    <Mail aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-marca-900">Correo</h3>
                    <p className="mt-1 break-all text-arena-700">{siteConfig.email}</p>
                    <p className="mt-1 text-sm text-arena-600">
                      Para documentos y temas que necesiten constancia escrita.
                    </p>
                  </div>
                </a>
              </li>

              <li className="flex gap-4 rounded-card border border-arena-200 bg-arena-100/60 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-arena-200 text-arena-700">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-marca-900">Dónde estamos</h3>
                  <p className="mt-1 leading-relaxed text-arena-700">
                    Operamos 100 % en línea, sin vitrina física. Cubrimos{" "}
                    {siteConfig.ciudad} y todo el {siteConfig.region},{" "}
                    {siteConfig.departamento}.
                  </p>
                </div>
              </li>

              <li className="flex gap-4 rounded-card border border-arena-200 bg-arena-100/60 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-arena-200 text-arena-700">
                  <Clock aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-marca-900">Horario de atención</h3>
                  <p className="mt-1 leading-relaxed text-arena-700">
                    {siteConfig.horarios.texto}
                  </p>
                  <p className="mt-1 text-sm text-arena-600">
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
