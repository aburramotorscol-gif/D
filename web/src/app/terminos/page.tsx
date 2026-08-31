import type { Metadata } from "next";

import AvisoLegal from "@/components/ui/AvisoLegal";
import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso del sitio web de Aburrá Motors y de los servicios de compra, venta, financiación, seguros, trámites y consignación de vehículos.",
  alternates: { canonical: "/terminos" },
};

const H2 = "mt-10 text-xl font-bold text-hueso sm:text-2xl";
const P = "mt-4 leading-relaxed text-hueso/75";
const UL = "mt-4 list-disc space-y-2 pl-6 leading-relaxed text-hueso/75";

export default function PaginaTerminos() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Legal"
        titulo="Términos y condiciones"
        descripcion="Condiciones de uso del sitio y de los servicios de Aburrá Motors"
      />

      <div className="contenedor-sitio py-12 sm:py-16">
        <div className="max-w-3xl">
          <AvisoLegal />

          <p className="mt-8 text-sm text-hueso/60">
            Última actualización: pendiente de definir al aprobar el documento.
          </p>

          <h2 className={H2}>1. Aceptación</h2>
          <p className={P}>
            Al navegar por este sitio o enviar cualquiera de sus formularios,
            aceptas estos términos y condiciones. Si no estás de acuerdo, te
            pedimos abstenerte de usar el sitio.
          </p>

          <h2 className={H2}>2. Naturaleza del servicio</h2>
          <p className={P}>
            {siteConfig.nombre} es una compraventa de vehículos que opera de forma
            virtual en {siteConfig.ciudad} y el {siteConfig.region}. Comercializa
            vehículos propios y actúa como intermediario autorizado en la venta de
            vehículos de terceros bajo la modalidad de consignación.
          </p>
          <p className={P}>
            En los servicios de financiación y seguros actuamos como gestores ante
            entidades financieras y aseguradoras. <strong>No somos una entidad
            financiera ni una compañía de seguros</strong> y no otorgamos créditos
            ni expedimos pólizas por cuenta propia.
          </p>

          <h2 className={H2}>3. Información del catálogo</h2>
          <p className={P}>
            La información de cada vehículo (precio, kilometraje, características y
            estado) se publica de buena fe con base en la revisión realizada y en la
            información suministrada por el propietario. Puede contener errores u
            omisiones y está sujeta a verificación.
          </p>
          <ul className={UL}>
            <li>
              Los precios están expresados en pesos colombianos y no incluyen
              trámites, seguros ni impuestos, salvo que se indique lo contrario.
            </li>
            <li>
              La publicación no constituye una oferta mercantil irrevocable en los
              términos del artículo 845 del Código de Comercio.
            </li>
            <li>
              Los precios y la disponibilidad pueden cambiar sin previo aviso hasta
              el momento de la firma del contrato.
            </li>
            <li>
              Las imágenes son de referencia. Antes de comprar puedes solicitar
              fotos y videos adicionales del vehículo real.
            </li>
          </ul>

          <h2 className={H2}>4. Simulador de crédito</h2>
          <p className={P}>
            El simulador es una herramienta informativa que calcula una cuota
            estimada mediante amortización francesa a partir de los valores que tú
            ingresas.
          </p>
          <ul className={UL}>
            <li>
              <strong>No constituye una oferta ni una aprobación de crédito.</strong>
            </li>
            <li>
              La tasa por defecto es de referencia y no corresponde necesariamente a
              la que te aprueben.
            </li>
            <li>
              El cálculo no incluye seguros, cuotas de manejo, estudios de crédito ni
              otros costos que la entidad financiera pueda cobrar.
            </li>
            <li>
              La aprobación, el monto, el plazo y la tasa dependen exclusivamente de
              la entidad financiera y de tu perfil crediticio.
            </li>
          </ul>

          <h2 className={H2}>5. Avalúos</h2>
          <p className={P}>
            El avalúo inicial que entregamos a partir de los datos y fotos que nos
            envías es un rango estimado y no vinculante. El precio en firme se
            define después de la revisión técnica presencial del vehículo y puede
            diferir del estimado inicial.
          </p>

          <h2 className={H2}>6. Trámites y tiempos</h2>
          <p className={P}>
            Los tiempos de los trámites publicados en el sitio son estimados en
            condiciones normales y dependen de las secretarías de tránsito, del RUNT
            y de terceros ajenos a nosotros. No respondemos por demoras atribuibles a
            esas entidades, pero sí te mantendremos informado del estado.
          </p>
          <p className={P}>
            Los costos de impuestos, derechos de tránsito y demás valores fijados por
            la autoridad no son determinados por nosotros y se te informan por
            separado de nuestro honorario.
          </p>

          <h2 className={H2}>7. Consignación</h2>
          <p className={P}>
            La consignación se rige por el contrato que se firme en cada caso, donde
            se pacta el precio de publicación, el precio mínimo autorizado, la
            comisión y la vigencia. Durante la consignación el propietario conserva
            la titularidad del vehículo.
          </p>

          <h2 className={H2}>8. Comunicaciones por WhatsApp</h2>
          <p className={P}>
            Los formularios del sitio abren una conversación de WhatsApp con el
            mensaje ya redactado. El envío efectivo depende de que lo confirmes en la
            aplicación. WhatsApp es un servicio de un tercero y se rige por sus
            propios términos y su propia política de privacidad.
          </p>

          <h2 className={H2}>9. Propiedad intelectual</h2>
          <p className={P}>
            Los contenidos, textos, diseño y elementos gráficos de este sitio son de
            titularidad de {siteConfig.nombre}, salvo las marcas de fabricantes de
            vehículos, que pertenecen a sus respectivos titulares y se usan
            únicamente con fines identificativos del producto ofrecido.
          </p>

          <h2 className={H2}>10. Derechos del consumidor</h2>
          <p className={P}>
            Estos términos se interpretan sin perjuicio de los derechos que la Ley
            1480 de 2011 (Estatuto del Consumidor) reconoce a los consumidores en
            Colombia, incluidos los relativos a garantía, información veraz y
            protección contractual.
          </p>

          <h2 className={H2}>11. Ley aplicable</h2>
          <p className={P}>
            Estos términos se rigen por la legislación de la República de Colombia.
            Cualquier controversia se someterá a los jueces competentes del domicilio
            de {siteConfig.nombre}.
          </p>

          <h2 className={H2}>12. Contacto</h2>
          <p className={P}>
            Para cualquier duda sobre estos términos: {siteConfig.email} o WhatsApp{" "}
            {siteConfig.whatsappVisible}.
          </p>
        </div>
      </div>
    </>
  );
}
