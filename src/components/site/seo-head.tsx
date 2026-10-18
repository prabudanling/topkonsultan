"use client";

/**
 * SeoHead — sinkronisasi <head> untuk navigasi hash (SPA).
 * ----------------------------------------------------------------------------
 * Saat pengunjung berpindah tampilan lewat hash (#/perizinan/…), server tidak
 * terlibat — komponen ini memperbarui <title>, meta description/keywords,
 * robots, canonical, Open Graph, Twitter Card, dan JSON-LD rute sesuai data
 * src/lib/seo.ts (sumber yang sama dengan metadata server-side).
 *
 * - JSON-LD buatan server (disuntik app/[[...slug]]/page.tsx di <body>)
 *   tidak disentuh; JSON-LD klien hanya disuntik untuk rute yang BERBEDA
 *   dari initialPath agar tidak terjadi duplikasi.
 * - Rute tak dikenal (view 404 klien) otomatis dinonindeks.
 */

import { useEffect } from "react";
import { useRoute } from "@/lib/router";
import { abs, getJsonLdScripts, getRouteSeo, TITLE_SUFFIX } from "@/lib/seo";

const NOT_FOUND_TITLE = `Halaman Tidak Ditemukan — ${TITLE_SUFFIX}`;
const NOT_FOUND_DESC =
  "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda PT TOP KONSULTAN INTERNASIONAL atau jelajahi Gerbang Perizinan.";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SeoHead({ initialPath = "/" }: { initialPath?: string }) {
  const route = useRoute();
  const path = route.path;

  useEffect(() => {
    const seo = getRouteSeo(path);
    const isNotFound = !seo;
    const title = seo?.title ?? NOT_FOUND_TITLE;
    const description = seo?.description ?? NOT_FOUND_DESC;
    const canonical = seo?.url ?? abs(path);
    const robots = seo && !seo.noindex
      ? "index, follow, max-image-preview:large, max-snippet:-1"
      : "noindex, nofollow";
    const image = seo?.image ? abs(seo.image) : abs("/og-image.png");

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", (seo?.keywords ?? []).join(", "));
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:type", seo?.ogType ?? "website");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertCanonical(canonical);

    /* JSON-LD: hanya untuk rute yang berbeda dari initialPath —
       versi server untuk initialPath sudah ada di <body>. */
    document.querySelectorAll("script[data-seo-route]").forEach((n) => n.remove());
    if (!isNotFound && path !== normalize(initialPath)) {
      for (const json of getJsonLdScripts(path)) {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.setAttribute("data-seo-route", "1");
        s.textContent = json;
        document.head.appendChild(s);
      }
    }
  }, [path, initialPath]);

  return null;
}

function normalize(p: string): string {
  return p === "" ? "/" : p;
}
