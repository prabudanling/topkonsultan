import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

/**
 * /robots.txt — dihasilkan dinamis oleh Next.js (menggantikan berkas statis
 * public/robots.txt yang kini dihapus agar tidak bertentangan).
 * - Seluruh situs boleh dirayap.
 * - /api/* disekat (endpoint bukan konten untuk indeks).
 * - Sitemap & host eksplisit mempercepat penemuan Googlebot.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot", "YandexBot", "Baiduspider"],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
