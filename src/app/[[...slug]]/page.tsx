import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteApp from "@/components/site/app";
import {
  buildRouteMetadata,
  buildStaticParams,
  getJsonLdScripts,
  getRouteSeo,
} from "@/lib/seo";

/**
 * Rute catch-all opsional — jantung SEO situs.
 * ----------------------------------------------------------------------------
 * Setiap tampilan situs kini punya URL NYATA yang dapat diindeks Google:
 *   /  /about  /services  /services/01  /perizinan  /perizinan/pendirian-pt
 *   /councils/quantum-strategy  /insights/...  /faq  /contact  dst.
 *
 * - generateMetadata  → <title>, deskripsi, keywords, kanonik, hreflang,
 *                        Open Graph, Twitter Card, robots UNIK per halaman.
 * - JSON-LD           → disuntik server-side (Organization, WebSite,
 *                        LegalService, Service, Article, FAQPage, ItemList,
 *                        BreadcrumbList, Person).
 * - Navigasi hash (#/...) tetap berfungsi penuh — URL nyata hanya menambah
 *   kemampuan pengindeksan, tidak menggantikan pengalaman SPA.
 * - Rute tak dikenal → notFound() → 404 sungguhan.
 * - /vvip → halaman tetap bisa diakses namun dinonindeks (robots noindex,
 *   tidak masuk sitemap).
 */

interface CatchAllParams {
  slug?: string[];
}

function pathFromSlug(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}`;
}

export async function generateStaticParams(): Promise<Array<{ slug: string[] }>> {
  return buildStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CatchAllParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildRouteMetadata(pathFromSlug(slug));
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<CatchAllParams>;
}) {
  const { slug } = await params;
  const path = pathFromSlug(slug);
  const seo = getRouteSeo(path);
  if (!seo) notFound();

  const jsonLd = getJsonLdScripts(path);

  return (
    <>
      {jsonLd.map((json, i) => (
        <script
          key={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
      <SiteApp initialPath={path} />
    </>
  );
}
