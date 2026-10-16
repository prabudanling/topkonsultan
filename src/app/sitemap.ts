import type { MetadataRoute } from "next";
import {
  SITE,
  SITE_LASTMOD,
  buildLanguageAlternates,
  buildSitemapEntries,
} from "@/lib/seo";

/**
 * /sitemap.xml — seluruh 127 URL nyata situs (rute VVIP sengaja dikeluarkan).
 * Setiap URL membawa hreflang untuk 26 bahasa terjemahan penuh + x-default,
 * prioritas, dan frekuensi perubahan yang sesuai bobot kontennya.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries().map((entry) => ({
    url: SITE.url + (entry.path === "/" ? "" : entry.path),
    lastModified: entry.lastModified ?? SITE_LASTMOD,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: buildLanguageAlternates(entry.path),
    },
  }));
}
