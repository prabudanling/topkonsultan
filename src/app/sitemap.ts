import type { MetadataRoute } from "next";
import {
  SITE,
  SITE_LASTMOD,
  FULL_LANGS,
  buildLanguageAlternates,
  buildSitemapEntries,
} from "@/lib/seo";

/**
 * /sitemap.xml — seluruh 661 URL nyata situs:
 *   127 halaman inti (hreflang 26 bahasa penuh + x-default)
 * + 534 halaman Katalog 500 Jasa Perizinan (hreflang inti id+en+x-default,
 *   jujur terhadap bahasa konten & menjaga sitemap tetap ringkas).
 * Rute VVIP sengaja dikeluarkan.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries().map((entry) => ({
    url: SITE.url + (entry.path === "/" ? "" : entry.path),
    lastModified: entry.lastModified ?? SITE_LASTMOD,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: buildLanguageAlternates(
        entry.path,
        entry.languageSet === "core" ? ["id", "en"] : FULL_LANGS
      ),
    },
  }));
}
