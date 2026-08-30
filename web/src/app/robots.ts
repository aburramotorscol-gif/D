import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/** Se materializa como /robots.txt en el export estático. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
