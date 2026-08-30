import { siteConfig } from "@/config/site";
import { etiquetas, type Vehiculo } from "@/lib/schemas";

/**
 * Datos estructurados (schema.org). Ayudan a que Google entienda que somos
 * una compraventa del Valle de Aburrá y que cada ficha es un vehículo en venta.
 */

type Json = Record<string, unknown>;

const COMBUSTIBLE_SCHEMA: Record<Vehiculo["combustible"], string> = {
  gasolina: "Gasoline",
  diesel: "Diesel",
  hibrido: "Hybrid",
  electrico: "Electric",
  gas: "NaturalGas",
};

/** AutoDealer con localidad Medellín / Valle de Aburrá. Va en el layout raíz. */
export function jsonLdConcesionario(): Json {
  const redes = Object.values(siteConfig.redes).filter(
    (url): url is string => typeof url === "string",
  );

  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${siteConfig.url}/#concesionario`,
    name: siteConfig.nombre,
    description: siteConfig.descripcion,
    url: siteConfig.url,
    telephone: `+${siteConfig.whatsapp}`,
    email: siteConfig.email,
    priceRange: "$$",
    currenciesAccepted: "COP",
    paymentAccepted: "Efectivo, transferencia bancaria, crédito vehicular",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.ciudad,
      addressRegion: siteConfig.departamento,
      addressCountry: siteConfig.codigoPais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    areaServed: siteConfig.cobertura.map((municipio) => ({
      "@type": "City",
      name: municipio,
    })),
    openingHoursSpecification: siteConfig.horarios.estructurado.map((franja) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: franja.dias,
      opens: franja.abre,
      closes: franja.cierra,
    })),
    ...(redes.length > 0 ? { sameAs: redes } : {}),
  };
}

/** Vehicle + Offer para la ficha de detalle. */
export function jsonLdVehiculo(vehiculo: Vehiculo): Json {
  const nombre = `${vehiculo.marca} ${vehiculo.linea} ${vehiculo.version} ${vehiculo.anio}`.trim();
  const urlVehiculo = `${siteConfig.url}/vehiculos/${vehiculo.slug}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: nombre,
    description: vehiculo.descripcion,
    url: urlVehiculo,
    image: vehiculo.imagenes.map((img) => `${siteConfig.url}${img.src}`),
    brand: { "@type": "Brand", name: vehiculo.marca },
    model: vehiculo.linea,
    vehicleModelDate: String(vehiculo.anio),
    productionDate: String(vehiculo.anio),
    color: vehiculo.color || undefined,
    numberOfDoors: vehiculo.puertas,
    vehicleTransmission: etiquetas.transmision[vehiculo.transmision],
    fuelType: COMBUSTIBLE_SCHEMA[vehiculo.combustible],
    bodyType: etiquetas.carroceria[vehiculo.carroceria],
    driveWheelConfiguration: vehiculo.traccion,
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehiculo.kilometraje,
      unitCode: "KMT",
    },
    ...(vehiculo.cilindraje > 0
      ? {
          vehicleEngine: {
            "@type": "EngineSpecification",
            engineDisplacement: {
              "@type": "QuantitativeValue",
              value: vehiculo.cilindraje,
              unitCode: "CMQ",
            },
          },
        }
      : {}),
    itemCondition: "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      price: vehiculo.precio,
      priceCurrency: "COP",
      availability:
        vehiculo.estado === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: urlVehiculo,
      seller: { "@id": `${siteConfig.url}/#concesionario` },
    },
  };
}

/** Migas de pan, para que el resultado de búsqueda muestre la jerarquía. */
export function jsonLdMigas(items: { nombre: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: item.nombre,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

/** FAQPage para el bloque de preguntas frecuentes de la home. */
export function jsonLdPreguntas(
  preguntas: { pregunta: string; respuesta: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((item) => ({
      "@type": "Question",
      name: item.pregunta,
      acceptedAnswer: { "@type": "Answer", text: item.respuesta },
    })),
  };
}
