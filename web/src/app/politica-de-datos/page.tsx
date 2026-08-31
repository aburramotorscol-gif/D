import type { Metadata } from "next";

import AvisoLegal from "@/components/ui/AvisoLegal";
import EncabezadoPagina from "@/components/ui/EncabezadoPagina";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description:
    "Política de tratamiento de datos personales de Aburrá Motors conforme a la Ley 1581 de 2012 y al Decreto 1074 de 2015.",
  alternates: { canonical: "/politica-de-datos" },
  robots: { index: true, follow: true },
};

/** Clases del contenido legal: texto largo, ancho cómodo de lectura. */
const H2 = "mt-10 text-xl font-bold text-hueso sm:text-2xl";
const P = "mt-4 leading-relaxed text-hueso/75";
const UL = "mt-4 list-disc space-y-2 pl-6 leading-relaxed text-hueso/75";

export default function PaginaPoliticaDatos() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Legal"
        titulo="Política de tratamiento de datos personales"
        descripcion="Ley 1581 de 2012 y Decreto 1074 de 2015 · República de Colombia"
      />

      <div className="contenedor-sitio py-12 sm:py-16">
        <div className="max-w-3xl">
          <AvisoLegal />

          <p className="mt-8 text-sm text-hueso/60">
            Última actualización: pendiente de definir al aprobar el documento.
          </p>

          <h2 className={H2}>1. Responsable del tratamiento</h2>
          <p className={P}>
            {siteConfig.nombre}, con domicilio en {siteConfig.ciudad},{" "}
            {siteConfig.departamento}, {siteConfig.pais}, es el responsable del
            tratamiento de los datos personales recolectados a través de este sitio
            web y de los canales de contacto asociados.
          </p>
          <p className={P}>
            <strong>Pendiente de completar:</strong> razón social exacta, NIT,
            dirección de notificaciones judiciales y correo electrónico habilitado
            para el ejercicio de derechos de los titulares.
          </p>
          <p className={P}>
            Canales de contacto actuales: {siteConfig.email} y WhatsApp{" "}
            {siteConfig.whatsappVisible}.
          </p>

          <h2 className={H2}>2. Datos que recolectamos</h2>
          <p className={P}>
            A través de los formularios del sitio y de las conversaciones de
            WhatsApp podemos recolectar:
          </p>
          <ul className={UL}>
            <li>Nombre completo.</li>
            <li>Número de celular y correo electrónico.</li>
            <li>Municipio de residencia.</li>
            <li>
              Información del vehículo de interés o del vehículo que deseas vender:
              marca, línea, modelo, kilometraje, placa y estado general.
            </li>
            <li>
              Datos de la simulación de crédito: precio, cuota inicial, plazo e
              ingresos aproximados cuando decides informarlos.
            </li>
            <li>
              Datos técnicos de navegación asociados al origen de la solicitud.
            </li>
          </ul>
          <p className={P}>
            No solicitamos datos sensibles en el sentido del artículo 5 de la Ley
            1581 de 2012. Tampoco solicitamos por este medio contraseñas, claves
            bancarias ni números completos de tarjetas.
          </p>

          <h2 className={H2}>3. Finalidades del tratamiento</h2>
          <ul className={UL}>
            <li>Atender y responder las solicitudes que nos envías.</li>
            <li>
              Elaborar avalúos, cotizaciones de seguros y estudios de crédito
              vehicular.
            </li>
            <li>
              Gestionar la compra, venta, consignación, retoma y los trámites de
              tránsito del vehículo.
            </li>
            <li>
              Compartir la información estrictamente necesaria con entidades
              financieras, aseguradoras y organismos de tránsito para adelantar el
              servicio que solicitaste.
            </li>
            <li>
              Informarte sobre el estado de tu proceso por los canales que nos
              autorizaste.
            </li>
            <li>
              Enviarte información comercial sobre vehículos y servicios, siempre
              que lo hayas autorizado y hasta que solicites lo contrario.
            </li>
            <li>
              Elaborar estadísticas internas de forma agregada para mejorar el
              servicio.
            </li>
          </ul>

          <h2 className={H2}>4. Autorización del titular</h2>
          <p className={P}>
            Al marcar la casilla de autorización en cualquiera de los formularios
            del sitio, o al enviarnos tus datos por WhatsApp con la misma
            finalidad, autorizas de manera previa, expresa e informada el
            tratamiento de tus datos personales en los términos de esta política.
          </p>

          <h2 className={H2}>5. Derechos del titular</h2>
          <p className={P}>
            Conforme al artículo 8 de la Ley 1581 de 2012, como titular tienes
            derecho a:
          </p>
          <ul className={UL}>
            <li>
              Conocer, actualizar y rectificar tus datos personales frente a
              nosotros.
            </li>
            <li>
              Solicitar prueba de la autorización otorgada, salvo en los casos en
              que la ley no la exija.
            </li>
            <li>
              Ser informado del uso que se ha dado a tus datos personales, previa
              solicitud.
            </li>
            <li>
              Presentar quejas ante la Superintendencia de Industria y Comercio por
              infracciones a la ley.
            </li>
            <li>
              Revocar la autorización o solicitar la supresión de tus datos cuando
              no exista un deber legal o contractual que lo impida.
            </li>
            <li>Acceder de forma gratuita a tus datos personales.</li>
          </ul>

          <h2 className={H2}>6. Cómo ejercer tus derechos</h2>
          <p className={P}>
            Puedes ejercer estos derechos escribiendo a {siteConfig.email} con el
            asunto &ldquo;Protección de datos personales&rdquo;, indicando tu
            nombre completo, número de documento, la solicitud concreta y un canal
            de respuesta.
          </p>
          <p className={P}>
            Las consultas se atienden en un término máximo de diez (10) días
            hábiles, prorrogables por cinco (5) más. Los reclamos se atienden en un
            término máximo de quince (15) días hábiles, prorrogables por ocho (8)
            más, conforme a los artículos 14 y 15 de la Ley 1581 de 2012.
          </p>

          <h2 className={H2}>7. Vigencia y conservación</h2>
          <p className={P}>
            Los datos se conservan mientras exista una relación comercial vigente y,
            después de terminada, durante el tiempo que exijan las obligaciones
            legales, contables y tributarias aplicables. Terminado ese periodo, se
            suprimen o se anonimizan.
          </p>

          <h2 className={H2}>8. Seguridad de la información</h2>
          <p className={P}>
            Adoptamos medidas técnicas, humanas y administrativas razonables para
            proteger los datos frente a acceso no autorizado, pérdida o uso
            indebido. Ninguna medida elimina por completo el riesgo, por lo que te
            pedimos no enviarnos por estos canales información que no sea necesaria
            para el servicio.
          </p>

          <h2 className={H2}>9. Cambios en esta política</h2>
          <p className={P}>
            Podemos actualizar esta política. Cualquier cambio sustancial se
            publicará en esta misma página con su fecha de actualización.
          </p>
        </div>
      </div>
    </>
  );
}
