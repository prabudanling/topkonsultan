/**
 * src/lib/seo.ts — Mesin SEO terpusat PT TOP KONSULTAN INTERNASIONAL.
 * ----------------------------------------------------------------------------
 * SATU sumber kebenaran untuk seluruh metadata halaman, canonical, hreflang,
 * JSON-LD (schema.org), dan sitemap. Dipakai oleh:
 *   - app/layout.tsx            (metadata global situs)
 *   - app/[[...slug]]/page.tsx  (metadata + JSON-LD per URL nyata — server)
 *   - app/sitemap.ts, app/robots.ts, app/manifest.ts
 *   - components/site/seo-head.tsx (sinkronisasi <head> saat navigasi hash — client)
 *
 * Domain resmi: https://pusatperizinan.com (domain .id sudah diambil pihak lain).
 */

import type { Metadata } from "next";
import { BRAND } from "@/data/brand";
import { COUNCILS, SERVICES } from "@/data/content";
import { COUNCIL_PROFILES } from "@/data/council-profiles";
import { PERIZINAN, PERIZINAN_CATEGORIES } from "@/data/perizinan";
import { INDUSTRIES } from "@/data/industries";
import { INSIGHTS } from "@/data/insights";
import { FAQS } from "@/data/legal";
import { LANGUAGES } from "@/data/languages";
import { slugify } from "@/data/extended-types";
import {
  JASA_CATEGORIES,
  JASA_ITEMS,
  JASA_STATS,
  findJasa,
  findJasaCategory,
  jasaInCategory,
} from "@/data/jasa";

/* ============================== KONSTANTA SITUS ============================= */

export const SITE = {
  url: BRAND.url,
  domain: BRAND.domain,
  name: BRAND.legal,
  short: "TOP Konsultan Internasional",
  wordmark: "PUSAT PERIZINAN.COM",
  tagline: BRAND.tagline,
  taglineEn: BRAND.taglineEn,
  description:
    "Gerbang tunggal konsultasi & perizinan terlengkap di dunia: pendirian PT/PMA, NIB OSS RBA, BPOM, halal, SNI, KITAS, PSE, OJK, hingga strategi korporat. 46 Dewan Pakar internasional, 6.900 tahun pengalaman gabungan, 190 negara — layanan global dalam 195 bahasa.",
  email: BRAND.email,
  phone: BRAND.phone,
  phoneIntl: BRAND.phoneHref,
  whatsapp: BRAND.whatsappHref,
  logo: "/images/logo-pusat-perizinan.png",
  ogImage: "/og-image.png",
  ogImageAlt:
    "PT TOP KONSULTAN INTERNASIONAL — PUSAT PERIZINAN.COM: satu gerbang untuk segala izin, strategi, dan eksekusi, dari pendirian PT hingga ekspansi 190 negara.",
  /** Koordinat kantor pusat (Tasikmalaya, Jawa Barat) — meta geo & JSON-LD. */
  geo: { lat: -7.3274, lng: 108.2207 },
} as const;

/** Tanggal basis terakhir modifikasi konten (ISO 8601) — deterministik antar-build. */
export const SITE_LASTMOD = "2026-10-17";

/** Suffix judul — format konsisten dengan navigasi lama. */
export const TITLE_SUFFIX = "TOP Konsultan Internasional";

export const BASE_TITLE = `${BRAND.legal} — ${BRAND.tagline}`;

/** Kata kunci induk — dipakai halaman beranda dan sebagai dasar halaman lain. */
export const KEYWORDS: string[] = [
  "top konsultan internasional",
  "pusatperizinan.com",
  "pusat perizinan",
  "konsultan perizinan",
  "jasa pengurusan izin usaha",
  "pendirian PT",
  "pendirian PMA",
  "NIB OSS RBA",
  "izin edar BPOM",
  "sertifikasi halal BPJPH",
  "SNI",
  "KITAS pekerja asing",
  "RPTKA",
  "PSE Komdigi",
  "izin OJK",
  "konsultan bisnis Indonesia",
  "management consulting Indonesia",
  "market entry Indonesia",
  "konsultan strategi korporat",
  "46 dewan pakar",
  "konsultan hukum Indonesia",
  "notaris pendirian perusahaan",
];

/* ============================ BAHASA & HREFLANG ============================= */

/**
 * 26 bahasa dengan terjemahan antarmuka PENUH (translations-major1/2).
 * Hanya bahasa ini yang layak mendapat hreflang — targetnya benar-benar
 * menampilkan antarmuka dalam bahasa tersebut (via parameter ?lang=).
 */
export const FULL_LANGS: readonly string[] = [
  "id", "en", "ms", "ja", "ko", "zh-CN", "zh-TW", "ar", "es", "fr", "de",
  "pt", "it", "ru", "nl", "tr", "hi", "th", "vi", "sv", "pl", "el", "uk",
  "fa", "he", "ur",
];

/** 195 kode bahasa yang dapat dipilih pengunjung (identitas multibahasa situs). */
export const ALL_LANG_CODES: string[] = LANGUAGES.map((l) => l.code);

/** Peta kode bahasa → locale Open Graph (og:locale / og:locale:alternate). */
const OG_LOCALE: Record<string, string> = {
  id: "id_ID", en: "en_US", ms: "ms_MY", ja: "ja_JP", ko: "ko_KR",
  "zh-CN": "zh_CN", "zh-TW": "zh_TW", ar: "ar_AR", es: "es_ES", fr: "fr_FR",
  de: "de_DE", pt: "pt_PT", it: "it_IT", ru: "ru_RU", nl: "nl_NL",
  tr: "tr_TR", hi: "hi_IN", th: "th_TH", vi: "vi_VN", sv: "sv_SE",
  pl: "pl_PL", el: "el_GR", uk: "uk_UA", fa: "fa_IR", he: "he_IL", ur: "ur_PK",
};

export function ogLocale(code: string): string {
  return OG_LOCALE[code] ?? code;
}

/** URL absolut untuk path rute (tanpa trailing slash, home = domain polos). */
export function abs(path: string): string {
  if (!path || path === "/") return SITE.url;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Peta hreflang untuk sebuah path:
 * - id (default) → URL bersih; bahasa lainnya → ?lang=kode
 * - x-default → URL bersih
 * `langs` penuh (26) untuk halaman inti; inti (id+en) untuk 500+ halaman katalog jasa
 *   agar sitemap tetap ringkas dan setiap entri jujur secara bahasa konten.
 */
export function buildLanguageAlternates(
  path: string,
  langs: readonly string[] = FULL_LANGS
): Record<string, string> {
  const map: Record<string, string> = {};
  for (const code of langs) {
    map[code] = code === "id" ? abs(path) : `${abs(path)}?lang=${code}`;
  }
  map["x-default"] = abs(path);
  return map;
}

/* ============================ REGISTRI HALAMAN ============================== */

export type RouteKind =
  | "home" | "about" | "services" | "perizinan" | "councils" | "industries"
  | "insights" | "careers" | "method" | "results" | "contact" | "faq"
  | "legal" | "vvip" | "service-detail" | "perizinan-detail"
  | "council-detail" | "industry-detail" | "insight-detail" | "not-found"
  | "jasa" | "jasa-category" | "jasa-detail";

/** Bahasa hreflang inti untuk halaman katalog 500 jasa (ringkas & jujur). */
const JASA_LANGS: readonly string[] = ["id", "en"];

export interface RouteSeo {
  /** Jalur ternormalisasi, selalu diawali "/", tanpa query & trailing slash. */
  path: string;
  /** URL absolut kanonik. */
  url: string;
  kind: RouteKind;
  title: string;
  description: string;
  keywords: string[];
  /** true untuk rute diskret (VVIP) & 404. */
  noindex: boolean;
  ogType: "website" | "article";
  publishedTime?: string;
  modifiedTime: string;
  image?: string;
  /** Slug entitas untuk detail (dipakai JSON-LD). */
  entitySlug?: string;
}

interface StaticSeo {
  kind: RouteKind;
  title: string;
  description: string;
  keywords?: string[];
  noindex?: boolean;
}

const S = TITLE_SUFFIX;

/** Metadata halaman statis — 15 rute tingkat atas. */
const STATIC_SEO: Record<string, StaticSeo> = {
  "/": {
    kind: "home",
    title: BASE_TITLE,
    description: SITE.description,
  },
  "/about": {
    kind: "about",
    title: `Tentang Kami — ${S}`,
    description:
      "PT TOP KONSULTAN INTERNASIONAL berdiri sejak 2001: 46 Dewan Pakar lintas disiplin, 6.900 tahun pengalaman gabungan, satu Partner-in-Chief — dari Tasikmalaya dan Jakarta melayani 190 negara dalam 195 bahasa.",
    keywords: ["tentang top konsultan", "sejarah firma konsultan", "46 dewan pakar", "partner-in-chief", "firma konsultan Indonesia"],
  },
  "/services": {
    kind: "services",
    title: `12 Praktik Layanan — ${S}`,
    description:
      "12 praktik konsultasi terlengkap — strategi & transformasi, AI & data, teknologi, keuangan, operasional, SDM, ESG, hukum, growth, inovasi, kesehatan, sektor publik — dieksekusi 46 Dewan Pakar sampai desimal terakhir.",
    keywords: ["praktik konsultasi", "layanan konsultan manajemen", "konsultan strategi", "konsultan AI", "konsultan ESG"],
  },
  "/perizinan": {
    kind: "perizinan",
    title: `Gerbang Perizinan — 36+ Jenis Izin — ${S}`,
    description:
      "Gerbang Perizinan terlengkap di dunia: 36 jenis izin dalam 8 kategori — pendirian PT/PMA, NIB OSS RBA, BPOM, halal BPJPH, SNI, KITAS, PSE, OJK — diurus dewan pakar sampai tuntas tanpa bolong.",
    keywords: ["gerbang perizinan", "katalog izin usaha", "pengurusan NIB", "izin BPOM", "sertifikasi halal", "izin usaha lengkap"],
  },
  "/councils": {
    kind: "councils",
    title: `46 Dewan Pakar — ${S}`,
    description:
      "46 Dewan Pakar dunia lintas bidang — dari Quantum Strategy hingga Longevity Science. Setiap dewan membawa 150 tahun penguasaan terdistilasi, dihimpun khusus untuk penugasan Anda.",
    keywords: ["dewan pakar", "council of experts", "46 dewan", "quantum strategy", "longevity science"],
  },
  "/industries": {
    kind: "industries",
    title: `Industri — ${S}`,
    description:
      "12 sektor industri kami dampingi: keuangan & fintech, teknologi, energi, kesehatan, ritel, manufaktur, properti, hukum, media, logistik, agrikultur, antariksa — dari strategi hulu hingga perizinan dan eksekusi hilir.",
    keywords: ["konsultan industri", "konsultan fintech", "konsultan kesehatan", "konsultan energi", "market entry sektor"],
  },
  "/insights": {
    kind: "insights",
    title: `Wawasan — ${S}`,
    description:
      "Wawasan para dewan: analisis strategi, makroekonomi, dan teknologi yang ditulis para ahli lapangan — bukan konten SEO generik. Setiap artikel lahir dari medan perang keputusan, bukan ruang redaksi.",
    keywords: ["wawasan strategi", "analisis makroekonomi", "artikel konsultan", "insight bisnis"],
  },
  "/careers": {
    kind: "careers",
    title: `Karier — ${S}`,
    description:
      "Karier di PT TOP KONSULTAN INTERNASIONAL: bergabung dengan firma yang menyelesaikan masalah yang tidak bisa diselesaikan siapa pun. Lihat peran terbuka, budaya dewan, dan cara melamar.",
    keywords: ["lowongan konsultan", "karier konsultan", "rekrutmen konsultan Jakarta"],
  },
  "/method": {
    kind: "method",
    title: `Metode Oracle — ${S}`,
    description:
      "Metode Oracle: 5 fase — Orientasi, Diagnosa, Penghimpunan Dewan, Eksekusi, War-Game. Satu Partner-in-Chief menjawab segalanya; wawasan pertama tiba dalam 48 jam, eksekusi berjalan sampai tuntas.",
    keywords: ["metode oracle", "metodologi konsultasi", "partner-in-chief", "war-game strategi"],
  },
  "/results": {
    kind: "results",
    title: `Hasil & Bukti — ${S}`,
    description:
      "Hasil & bukti: studi kasus lintas industri, 12.000+ penugasan, tingkat keberhasilan 99,97% sejak 2001. Kami menyerahkan lintasan — bukan sekadar slide presentasi.",
    keywords: ["studi kasus konsultan", "hasil konsultasi", "portofolio konsultan", "track record"],
  },
  "/contact": {
    kind: "contact",
    title: `Kontak — ${S}`,
    description:
      "Hubungi PT TOP KONSULTAN INTERNASIONAL: WhatsApp +62 811-1116-5165 aktif 24/7, email halo@topkonsultan.web.id, empat kantor resmi di Tasikmalaya & Jakarta. Wawasan pertama dalam 48 jam.",
    keywords: ["kontak konsultan", "whatsapp konsultan", "kantor konsultan Jakarta", "kantor Tasikmalaya"],
  },
  "/faq": {
    kind: "faq",
    title: `Pertanyaan Umum — ${S}`,
    description:
      "10 pertanyaan yang selalu diajukan calon klien — siapa kami, bagaimana 46 dewan bekerja, berapa biayanya, seberapa cepat jawaban pertama tiba — dijawab presisi, jujur, dan tertulis.",
    keywords: ["faq konsultan", "pertanyaan umum perizinan", "biaya konsultan"],
  },
  "/privacy": {
    kind: "legal",
    title: `Kebijakan Privasi — ${S}`,
    description:
      "Kebijakan Privasi PT TOP KONSULTAN INTERNASIONAL — bagaimana kami mengumpulkan, memakai, menyimpan, dan melindungi data pribadi Anda sesuai UU Perlindungan Data Pribadi, beserta hak Anda atas data tersebut.",
    keywords: ["kebijakan privasi", "UU PDP", "perlindungan data pribadi"],
  },
  "/terms": {
    kind: "legal",
    title: `Syarat & Ketentuan — ${S}`,
    description:
      "Syarat & Ketentuan penggunaan situs pusatperizinan.com dan layanan konsultasi PT TOP KONSULTAN INTERNASIONAL — lingkup penugasan, kewajiban klien, kerahasiaan, tunduk hukum, dan penyelesaian sengketa.",
    keywords: ["syarat dan ketentuan", "terms of service konsultan"],
  },
  "/cookies": {
    kind: "legal",
    title: `Kebijakan Cookie — ${S}`,
    description:
      "Kebijakan Cookie situs PT TOP KONSULTAN INTERNASIONAL — jenis cookie yang kami gunakan, untuk apa kami menggunakannya, dan bagaimana Anda mengendalikannya kapan pun dari peramban Anda.",
    keywords: ["kebijakan cookie", "cookie policy"],
  },
  "/jasa": {
    kind: "jasa",
    title: `Katalog 500 Jasa Perizinan — ${S}`,
    description:
      "Katalog 500 jasa perizinan terlengkap di Indonesia dalam 33 kategori: pendirian PT/PMA, NIB OSS, BPOM, halal, ISO, akreditasi KAN/BNSP, IATA, KITAS, SNI, TKDN, OJK — diurus tuntas 46 Dewan Pakar.",
    keywords: [
      "katalog jasa perizinan", "500 jasa perizinan", "jasa pengurusan izin",
      "izin usaha lengkap", "sertifikasi indonesia", "iata", "akreditasi", "bpom", "halal",
    ],
  },
  "/vvip": {
    kind: "vvip",
    title: `Member Lounge — ${S}`,
    description:
      "Member Lounge VVIP PT TOP KONSULTAN INTERNASIONAL — akses eksklusif dengan kode undangan.",
    noindex: true,
  },
};

/** Normalisasi path: leading "/", tanpa trailing "/", tanpa index.html, tanpa query. */
export function normalizePath(input: string): string {
  let p = (input ?? "/").split("?")[0].split("#")[0];
  p = p.replace(/\/index\.html$/i, "").replace(/\.html$/i, "");
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/** Panjang deskripsi aman untuk snippet meta (~165 karakter). */
function clampDesc(text: string, max = 165): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 120 ? lastSpace : max).trimEnd()}…`;
}

/* ============================ RESOLVER PER RUTE ============================= */

export function getRouteSeo(input: string): RouteSeo | null {
  const path = normalizePath(input);
  const segments = path.split("/").filter(Boolean);
  const [seg1, seg2] = segments;

  /* --- Halaman statis --- */
  if (!seg1) {
    const st = STATIC_SEO["/"];
    return {
      path, url: abs(path), kind: st.kind, title: st.title,
      description: st.description, keywords: KEYWORDS,
      noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD,
    };
  }

  const st = STATIC_SEO[path];
  if (st && !seg2) {
    return {
      path, url: abs(path), kind: st.kind, title: st.title,
      description: st.description,
      keywords: [...(st.keywords ?? []), ...KEYWORDS.slice(0, 8)],
      noindex: Boolean(st.noindex), ogType: "website", modifiedTime: SITE_LASTMOD,
    };
  }

  /* --- Detail layanan: /services/01..12 --- */
  if (seg1 === "services") {
    const svc = seg2 ? SERVICES.find((x) => x.num === seg2) : undefined;
    if (!svc) return null;
    return {
      path, url: abs(path), kind: "service-detail",
      title: `${svc.title} — Praktik ${svc.num} — ${S}`,
      description: clampDesc(
        `${svc.desc} Praktik ${svc.num} dari 12 — mencakup ${svc.tags.join(", ").toLowerCase()}, dieksekusi dewan pakar PT TOP KONSULTAN INTERNASIONAL untuk klien Indonesia dan global.`
      ),
      keywords: [svc.title, svc.enName ?? "", ...svc.tags, "praktik konsultasi", "jasa konsultasi"].filter(Boolean),
      noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD, entitySlug: svc.num,
    };
  }

  /* --- Detail perizinan: /perizinan/{slug} --- */
  if (seg1 === "perizinan") {
    const item = seg2 ? PERIZINAN.find((x) => x.slug === seg2) : undefined;
    if (!item) return null;
    const cat = PERIZINAN_CATEGORIES.find((c) => c.id === item.categoryId);
    return {
      path, url: abs(path), kind: "perizinan-detail",
      title: `${item.name} — Gerbang Perizinan — ${S}`,
      description: clampDesc(
        `${item.tagline} Diurus sampai tuntas bersama ${item.agency}; estimasi ${item.timeline}, kompleksitas ${item.complexity.toLowerCase()} — kategori ${cat?.name ?? "perizinan"}.`
      ),
      keywords: [item.name, item.enName, "pengurusan izin", item.agency, cat?.name ?? "perizinan", "jasa perizinan"].filter(Boolean),
      noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD, entitySlug: item.slug,
    };
  }

  /* --- Detail dewan: /councils/{slug} --- */
  if (seg1 === "councils") {
    const council = seg2 ? COUNCILS.find((c) => slugify(c.name) === seg2) : undefined;
    if (!council) return null;
    return {
      path, url: abs(path), kind: "council-detail",
      title: `Dewan ${council.name} — ${S}`,
      description: clampDesc(
        `${council.blurb} Dewan ${council.name} (${council.category}) membawa 150 tahun penguasaan terdistilasi — dihimpun bersama 45 dewan lain untuk penugasan Anda.`
      ),
      keywords: [`dewan ${council.name}`, council.category, "46 dewan pakar", "dewan ahli", "konsultan pakar"].filter(Boolean),
      noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD, entitySlug: seg2,
    };
  }

  /* --- Detail industri: /industries/{slug} --- */
  if (seg1 === "industries") {
    const ind = seg2 ? INDUSTRIES.find((x) => x.slug === seg2) : undefined;
    if (!ind) return null;
    return {
      path, url: abs(path), kind: "industry-detail",
      title: `${ind.name} — Industri — ${S}`,
      description: clampDesc(
        `${ind.tagline} Kami mendampingi sektor ${ind.name} (${ind.enName ?? ""}) dari strategi hulu, kepatuhan & perizinan, hingga eksekusi hilir — di Indonesia dan 190 negara.`
      ),
      keywords: [ind.name, ind.enName ?? "", `konsultan ${ind.name.toLowerCase()}`, "strategi industri", "market entry"].filter(Boolean),
      noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD, entitySlug: ind.slug,
    };
  }

  /* --- Detail wawasan: /insights/{slug} --- */
  if (seg1 === "insights") {
    const ins = seg2 ? INSIGHTS.find((x) => x.slug === seg2) : undefined;
    if (!ins) return null;
    return {
      path, url: abs(path), kind: "insight-detail",
      title: `${ins.title} — Wawasan — ${S}`,
      description: clampDesc(ins.excerpt),
      keywords: [ins.title, ins.enTitle ?? "", ins.category, "wawasan dewan", "analisis strategi"],
      noindex: false, ogType: "article",
      publishedTime: ins.date, modifiedTime: ins.date,
      image: ins.cover, entitySlug: ins.slug,
    };
  }

  /* --- Katalog 500 jasa: /jasa, /jasa/{kategori}, /jasa/{kategori}/{slug} --- */
  if (seg1 === "jasa") {
    if (!seg2) {
      const st = STATIC_SEO["/jasa"];
      return {
        path, url: abs(path), kind: "jasa", title: st.title as string,
        description: st.description as string,
        keywords: [...((st.keywords ?? []) as string[]), ...KEYWORDS.slice(0, 8)],
        noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD,
      };
    }
    if (seg2 && !segments[2]) {
      const cat = findJasaCategory(seg2);
      if (!cat) return null;
      const count = jasaInCategory(cat.id).length;
      return {
        path, url: abs(path), kind: "jasa-category",
        title: `${cat.name} — 500 Jasa Perizinan — ${S}`,
        description: clampDesc(
          `${cat.intro} ${count} layanan dalam kategori ini: dari instansi ${firstAgencyOf(cat.id)} hingga selesai tuntas.`
        ),
        keywords: [cat.name, cat.enName, ...categoryKeywordSample(cat.id), "jasa perizinan", "konsultan perizinan"],
        noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD, entitySlug: cat.id,
      };
    }
    const [c, itemSlug] = [seg2, segments[2]];
    const item = itemSlug ? findJasa(itemSlug) : undefined;
    if (!item || item.cat !== c) return null;
    const cat = findJasaCategory(item.cat);
    return {
      path, url: abs(path), kind: "jasa-detail",
      title: `${item.title} — Jasa Pengurusan — ${S}`,
      description: clampDesc(item.desc),
      keywords: [item.title, item.enTitle, ...item.keywords.slice(0, 4), "jasa perizinan", cat?.name ?? ""].filter(Boolean),
      noindex: false, ogType: "website", modifiedTime: SITE_LASTMOD, entitySlug: item.slug,
    };
  }

  /* --- Rute tidak dikenal → 404 --- */
  return null;
}

/** Instansi pertama sebuah kategori jasa — untuk deskripsi halaman kategori. */
function firstAgencyOf(cat: string): string {
  const items = jasaInCategory(cat);
  return items[0]?.agency ?? "instansi terkait";
}

/** Sampel kata kunci layanan sebuah kategori (maks 6, unik). */
function categoryKeywordSample(cat: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of jasaInCategory(cat)) {
    for (const kw of item.keywords) {
      if (!seen.has(kw)) {
        seen.add(kw);
        out.push(kw);
        if (out.length >= 6) return out;
      }
    }
  }
  return out;
}

/* ========================= METADATA NEXT.JS PER RUTE ======================== */

export function buildRouteMetadata(input: string): Metadata {
  const seo = getRouteSeo(input);
  if (!seo) {
    return {
      title: { absolute: `Halaman Tidak Ditemukan — ${S}` },
      robots: { index: false, follow: false },
    };
  }

  const image = seo.image ?? SITE.ogImage;
  const isArticle = seo.ogType === "article";

  const isJasa = seo.kind === "jasa" || seo.kind === "jasa-category" || seo.kind === "jasa-detail";

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.url,
      languages: buildLanguageAlternates(seo.path, isJasa ? JASA_LANGS : FULL_LANGS),
    },
    openGraph: {
      ...(isArticle
        ? {
            type: "article",
            publishedTime: seo.publishedTime,
            modifiedTime: seo.modifiedTime,
            authors: [SITE.url],
            section: "Wawasan",
          }
        : { type: "website" }),
      title: seo.title,
      description: seo.description,
      url: seo.url,
      siteName: SITE.name,
      locale: "id_ID",
      alternateLocale: (isJasa ? JASA_LANGS : FULL_LANGS).filter((c) => c !== "id").map(ogLocale),
      images: [{ url: image, width: 1200, height: 630, alt: SITE.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
    robots: seo.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/* ================== PARAMS STAIK & ENTRI SITEMAP (SERVER) ==================== */

/** Daftar seluruh jalur valid — dipakai generateStaticParams & sitemap. */
export function allRoutePaths(): string[] {
  const paths: string[] = ["/"];
  for (const key of Object.keys(STATIC_SEO)) {
    if (key !== "/") paths.push(key); // termasuk /vvip (dinonindeks, tidak masuk sitemap)
  }
  for (const s of SERVICES) paths.push(`/services/${s.num}`);
  for (const p of PERIZINAN) paths.push(`/perizinan/${p.slug}`);
  for (const c of COUNCILS) paths.push(`/councils/${slugify(c.name)}`);
  for (const i of INDUSTRIES) paths.push(`/industries/${i.slug}`);
  for (const x of INSIGHTS) paths.push(`/insights/${x.slug}`);
  paths.push("/jasa");
  for (const cat of JASA_CATEGORIES) paths.push(`/jasa/${cat.id}`);
  for (const item of JASA_ITEMS) paths.push(`/jasa/${item.cat}/${item.slug}`);
  return paths;
}

/** Params untuk generateStaticParams pada rute catch-all opsional. */
export function buildStaticParams(): Array<{ slug: string[] }> {
  return allRoutePaths().map((path) => ({
    slug: path === "/" ? [] : path.replace(/^\//, "").split("/"),
  }));
}

export interface SitemapEntry {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastModified?: string;
  /** "core" → hreflang id+en+x-default (halaman katalog 500 jasa); default "full". */
  languageSet?: "full" | "core";
}

/** Entri sitemap.xml — 661 URL: 127 halaman inti + 534 halaman katalog 500 jasa (VVIP dikeluarkan). */
export function buildSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { path: "/", priority: 1.0, changeFrequency: "daily", lastModified: SITE_LASTMOD },
    { path: "/perizinan", priority: 0.9, changeFrequency: "weekly", lastModified: SITE_LASTMOD },
    { path: "/jasa", priority: 0.9, changeFrequency: "weekly", lastModified: SITE_LASTMOD, languageSet: "core" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly", lastModified: SITE_LASTMOD },
    { path: "/councils", priority: 0.8, changeFrequency: "weekly", lastModified: SITE_LASTMOD },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/method", priority: 0.8, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/results", priority: 0.8, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/industries", priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly", lastModified: SITE_LASTMOD },
    { path: "/careers", priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LASTMOD },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly", lastModified: SITE_LASTMOD },
  ];
  for (const p of PERIZINAN) {
    entries.push({ path: `/perizinan/${p.slug}`, priority: 0.7, changeFrequency: "monthly", lastModified: SITE_LASTMOD });
  }
  for (const s of SERVICES) {
    entries.push({ path: `/services/${s.num}`, priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LASTMOD });
  }
  for (const c of COUNCILS) {
    entries.push({ path: `/councils/${slugify(c.name)}`, priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LASTMOD });
  }
  for (const i of INDUSTRIES) {
    entries.push({ path: `/industries/${i.slug}`, priority: 0.6, changeFrequency: "monthly", lastModified: SITE_LASTMOD });
  }
  for (const x of INSIGHTS) {
    entries.push({ path: `/insights/${x.slug}`, priority: 0.5, changeFrequency: "monthly", lastModified: x.date });
  }
  for (const cat of JASA_CATEGORIES) {
    entries.push({
      path: `/jasa/${cat.id}`, priority: 0.7, changeFrequency: "weekly",
      lastModified: SITE_LASTMOD, languageSet: "core",
    });
  }
  for (const item of JASA_ITEMS) {
    entries.push({
      path: `/jasa/${item.cat}/${item.slug}`,
      priority: item.populer ? 0.7 : 0.6,
      changeFrequency: "monthly",
      lastModified: SITE_LASTMOD,
      languageSet: "core",
    });
  }
  return entries;
}

/* ===================== JSON-LD / DATA TERSTRUKTUR ============================ */

type JsonLd = Record<string, unknown>;

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
const LEGAL_ID = `${SITE.url}/#legalservice`;

/** Wilayah layar layanan — sampel 60+ pasar utama (naratif situs: 190 negara). */
const AREA_SERVED: string[] = [
  "Indonesia", "Global", "ASEAN",
  "United States", "United Kingdom", "Germany", "France", "Netherlands", "Spain", "Portugal",
  "Italy", "Switzerland", "Sweden", "Norway", "Denmark", "Finland", "Ireland", "Belgium",
  "Austria", "Poland", "Czechia", "Hungary", "Romania", "Greece", "Turkey", "Russia", "Ukraine",
  "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain", "Israel",
  "Egypt", "Morocco", "Nigeria", "Kenya", "Ethiopia", "South Africa", "Tanzania",
  "China", "Japan", "South Korea", "Taiwan", "Hong Kong", "Macau", "Mongolia",
  "Singapore", "Malaysia", "Thailand", "Vietnam", "Philippines", "Cambodia", "Laos", "Myanmar",
  "India", "Pakistan", "Bangladesh", "Sri Lanka", "Nepal", "Kazakhstan", "Uzbekistan",
  "Australia", "New Zealand", "Papua New Guinea", "Timor-Leste", "Fiji",
  "Brazil", "Mexico", "Argentina", "Chile", "Colombia", "Peru", "Canada",
];

/** Entri Organisasi — identitas hukum firma (dirujuk @id dari semua halaman). */
function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.legal,
    alternateName: [SITE.short, SITE.wordmark, BRAND.legal.toLowerCase()],
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}${SITE.logo}`,
      width: 800,
      height: 800,
    },
    description: SITE.description,
    slogan: BRAND.tagline,
    foundingDate: String(BRAND.founded),
    founder: {
      "@type": "Person",
      name: "Gugun Gunara",
      jobTitle: "Founder",
      image: `${SITE.url}/images/founder-gugun-gunara.jpg`,
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Perumahan Arjamukti Kencana Raya Blok B7 No. 2, Leuwisari",
        addressLocality: "Arjasari, Kabupaten Tasikmalaya",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Perumahan Andalusia Garden, Cluster Granada No. 11, Mangkubumi",
        addressLocality: "Kota Tasikmalaya",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      {
        "@type": "PostalAddress",
        streetAddress:
          "Indonesia Stock Exchange Tower 1, Level 3, Unit 304, Jl. Jendral Sudirman Kav 52-53",
        addressLocality: "Senayan, Kebayoran Baru, Jakarta Selatan",
        addressRegion: "DKI Jakarta",
        postalCode: "12190",
        addressCountry: "ID",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Kantor PHI Kwitang, Kwitang, Senen",
        addressLocality: "Jakarta Pusat",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${BRAND.phoneHref.replace(/^\+/, "")}`,
        email: SITE.email,
        url: SITE.whatsapp,
        availableLanguage: ALL_LANG_CODES,
        areaServed: AREA_SERVED,
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${BRAND.phoneHref.replace(/^\+/, "")}`,
        email: SITE.email,
        availableLanguage: ["id", "en", "ms", "ja", "ko", "zh-CN", "ar", "es", "fr", "de", "pt", "ru"],
        areaServed: AREA_SERVED,
      },
    ],
    knowsAbout: KEYWORDS.slice(0, 18),
    areaServed: AREA_SERVED,
    sameAs: [] as string[],
  };
}

/** LegalService (LocalBusiness) — unit usaha PUSAT PERIZINAN.COM. */
function legalServiceJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": LEGAL_ID,
    name: `${SITE.wordmark} — ${BRAND.tagline}`,
    alternateName: SITE.wordmark,
    description:
      "Layanan pengurusan perizinan terlengkap di Indonesia: pendirian badan hukum, NIB OSS RBA, BPOM, halal, SNI, KITAS, PSE, OJK — dijalankan PT TOP KONSULTAN INTERNASIONAL bersama 46 Dewan Pakar.",
    url: SITE.url,
    telephone: `+${BRAND.phoneHref.replace(/^\+/, "")}`,
    email: SITE.email,
    image: [`${SITE.url}${SITE.logo}`, `${SITE.url}${SITE.ogImage}`],
    logo: `${SITE.url}${SITE.logo}`,
    priceRange: "Rp3.000.000+",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Transfer Bank",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Perumahan Arjamukti Kencana Raya Blok B7 No. 2, Leuwisari",
      addressLocality: "Arjasari, Kabupaten Tasikmalaya",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
        description: "Layanan WhatsApp aktif 24/7.",
      },
    ],
    areaServed: AREA_SERVED,
    slogan: BRAND.promise,
    foundingDate: String(BRAND.founded),
    founder: { "@type": "Person", name: "Gugun Gunara" },
    parentOrganization: { "@id": ORG_ID },
    serviceType: [
      "Konsultasi manajemen strategi",
      "Pengurusan perizinan usaha",
      "Pendirian badan hukum",
      "Sertifikasi produk & sistem",
      "Izin tenaga kerja asing",
      "Izin sektor keuangan & digital",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Katalog Layanan PT TOP KONSULTAN INTERNASIONAL",
      description: "36 jenis izin + 12 praktik konsultasi — satu gerbang untuk segala izin, strategi, dan eksekusi.",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Gerbang Perizinan — 36 Jenis Izin",
          itemListElement: PERIZINAN.map((p) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: p.name,
              alternateName: p.enName,
              description: p.tagline,
              url: abs(`/perizinan/${p.slug}`),
              provider: { "@id": ORG_ID },
            },
          })),
        },
        {
          "@type": "OfferCatalog",
          name: "12 Praktik Konsultasi",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              alternateName: s.enName,
              description: s.desc,
              url: abs(`/services/${s.num}`),
              provider: { "@id": ORG_ID },
            },
          })),
        },
      ],
    },
  };
}

/** WebSite — 195 bahasa antarmuka + Oracle AI multibahasa. */
function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND.legal,
    alternateName: SITE.domain,
    url: SITE.url,
    description: SITE.description,
    inLanguage: ALL_LANG_CODES,
    publisher: { "@id": ORG_ID },
    copyrightHolder: { "@id": ORG_ID },
  };
}

/** WebPage + BreadcrumbList untuk sebuah rute. */
function webPageJsonLd(seo: RouteSeo): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seo.url}#webpage`,
    url: seo.url,
    name: seo.title,
    description: seo.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "id",
    dateModified: seo.modifiedTime,
    breadcrumb: { "@id": `${seo.url}#breadcrumb` },
    ...(seo.image
      ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(seo.image) } }
      : {}),
  };
}

/** Label breadcrumb untuk sebuah rute (mengikuti remah roti di UI). */
function crumbsFor(seo: RouteSeo): Array<{ name: string; url: string }> {
  const home = { name: "Beranda", url: SITE.url };
  const seg = seo.path.split("/").filter(Boolean);
  const label = (s: string): string => {
    switch (s) {
      case "about": return "Tentang Kami";
      case "services": return "Layanan";
      case "perizinan": return "Gerbang Perizinan";
      case "jasa": return "500 Jasa Perizinan";
      case "councils": return "Dewan Pakar";
      case "industries": return "Industri";
      case "insights": return "Wawasan";
      case "careers": return "Karier";
      case "method": return "Metode Oracle";
      case "results": return "Hasil & Bukti";
      case "contact": return "Kontak";
      case "faq": return "Pertanyaan Umum";
      case "privacy": return "Kebijakan Privasi";
      case "terms": return "Syarat & Ketentuan";
      case "cookies": return "Kebijakan Cookie";
      default: return s;
    }
  };
  if (seg.length === 0) return [home];
  if (seg.length === 1) return [home, { name: label(seg[0]), url: abs(`/${seg[0]}`) }];
  if (seg[0] === "jasa" && seg.length === 3) {
    const cat = findJasaCategory(seg[1]);
    return [
      home,
      { name: "500 Jasa Perizinan", url: abs("/jasa") },
      { name: cat?.name ?? seg[1], url: abs(`/jasa/${seg[1]}`) },
      { name: seo.title.split(" — ")[0], url: seo.url },
    ];
  }
  return [
    home,
    { name: label(seg[0]), url: abs(`/${seg[0]}`) },
    { name: seo.title.split(" — ")[0], url: seo.url },
  ];
}

function breadcrumbJsonLd(seo: RouteSeo): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${seo.url}#breadcrumb`,
    itemListElement: crumbsFor(seo).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/** Service — dipakai /services/{num} dan /perizinan/{slug}. */
function serviceJsonLd(seo: RouteSeo): JsonLd | null {
  if (seo.kind === "service-detail") {
    const svc = SERVICES.find((x) => x.num === seo.entitySlug);
    if (!svc) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${seo.url}#service`,
      name: svc.title,
      alternateName: svc.enName,
      description: `${svc.desc} Mencakup ${svc.tags.join(", ").toLowerCase()}.`,
      serviceType: "Praktik konsultasi manajemen",
      url: seo.url,
      provider: { "@id": ORG_ID },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Indonesia" },
        { "@type": "AdministrativeArea", name: "Global" },
      ],
      termsOfService: abs("/terms"),
    };
  }
  if (seo.kind === "perizinan-detail") {
    const item = PERIZINAN.find((x) => x.slug === seo.entitySlug);
    if (!item) return null;
    const cat = PERIZINAN_CATEGORIES.find((c) => c.id === item.categoryId);
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${seo.url}#service`,
      name: item.name,
      alternateName: item.enName,
      description: `${item.tagline} Estimasi ${item.timeline} — kompleksitas ${item.complexity.toLowerCase()}.`,
      serviceType: `Pengurusan izin — ${cat?.name ?? "perizinan"}`,
      category: cat?.name,
      url: seo.url,
      provider: { "@id": LEGAL_ID },
      broker: item.agency,
      areaServed: [{ "@type": "AdministrativeArea", name: "Indonesia" }],
      termsOfService: abs("/terms"),
      potentialAction: {
        "@type": "OrderAction",
        name: `Ajukan pengurusan ${item.name}`,
        target: abs("/contact"),
      },
    };
  }
  if (seo.kind === "jasa-detail") {
    const item = findJasa(seo.entitySlug as string);
    if (!item) return null;
    const cat = findJasaCategory(item.cat);
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${seo.url}#service`,
      name: item.title,
      alternateName: item.enTitle,
      description: item.desc,
      serviceType: `Jasa pengurusan — ${cat?.name ?? "perizinan"}`,
      category: cat?.name,
      url: seo.url,
      provider: { "@id": LEGAL_ID },
      broker: item.agency,
      areaServed: [{ "@type": "AdministrativeArea", name: "Indonesia" }],
      termsOfService: abs("/terms"),
      potentialAction: {
        "@type": "OrderAction",
        name: `Ajukan ${item.title}`,
        target: abs("/contact"),
      },
    };
  }
  return null;
}

/** Article — dipakai /insights/{slug}. */
function articleJsonLd(seo: RouteSeo): JsonLd | null {
  const ins = INSIGHTS.find((x) => x.slug === seo.entitySlug);
  if (!ins) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${seo.url}#article`,
    headline: ins.title,
    alternateHeadline: ins.enTitle,
    description: clampDesc(ins.excerpt, 300),
    image: abs(ins.cover),
    datePublished: ins.date,
    dateModified: ins.date,
    articleSection: ins.category,
    wordCount: ins.body.join(" ").split(/\s+/).length,
    inLanguage: ["id", "en"],
    author: {
      "@type": "Person",
      name: ins.author.name,
      jobTitle: ins.author.role,
      worksFor: { "@id": ORG_ID },
    },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@id": `${seo.url}#webpage` },
  };
}

/** FAQPage — 10 tanya-jawab /faq. */
function faqJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/faq#faqpage`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Person — ketua dewan pada halaman detail dewan. */
function councilChairJsonLd(seo: RouteSeo): JsonLd | null {
  if (seo.kind !== "council-detail") return null;
  const council = COUNCILS.find((c) => slugify(c.name) === seo.entitySlug);
  if (!council) return null;
  const profile = COUNCIL_PROFILES.find((p) => p.name === council.name);
  if (!profile) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${seo.url}#chair`,
    name: profile.chair,
    jobTitle: profile.chairTitle,
    worksFor: { "@id": ORG_ID },
    knowsAbout: [council.name, council.category],
    description: `Ketua Dewan ${council.name} — ${council.blurb}`,
  };
}

/** ItemList — halaman katalog/daftar. */
function itemListJsonLd(seo: RouteSeo): JsonLd | null {
  interface Named { name?: string; slug?: string; num?: string; title?: string }
  const build = (label: string, items: Named[], urlOf: (x: Named) => string): JsonLd => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seo.url}#itemlist`,
    name: label,
    numberOfItems: items.length,
    itemListElement: items.map((x, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: (x.name ?? x.title) as string,
      url: urlOf(x),
    })),
  });
  switch (seo.kind) {
    case "perizinan":
      return build("Gerbang Perizinan — 36 Jenis Izin", PERIZINAN as unknown as Named[], (x) => abs(`/perizinan/${x.slug}`));
    case "jasa":
      return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${seo.url}#itemlist`,
        name: `Katalog 500 Jasa Perizinan — ${JASA_STATS.total} layanan dalam ${JASA_STATS.categories} kategori`,
        numberOfItems: JASA_CATEGORIES.length,
        itemListElement: JASA_CATEGORIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${c.name} (${jasaInCategory(c.id).length} layanan)`,
          url: abs(`/jasa/${c.id}`),
        })),
      };
    case "jasa-category": {
      const cat = findJasaCategory(seo.entitySlug as string);
      if (!cat) return null;
      const items = jasaInCategory(cat.id);
      return build(
        `${cat.name} — ${items.length} Layanan`,
        items as unknown as Named[],
        (x) => abs(`/jasa/${cat.id}/${x.slug}`)
      );
    }
    case "services":
      return build("12 Praktik Konsultasi", SERVICES as unknown as Named[], (x) => abs(`/services/${x.num}`));
    case "councils":
      return build("46 Dewan Pakar", COUNCILS as unknown as Named[], (x) => abs(`/councils/${slugify(x.name as string)}`));
    case "industries":
      return build("12 Sektor Industri", INDUSTRIES as unknown as Named[], (x) => abs(`/industries/${x.slug}`));
    case "insights":
      return build("Wawasan Dewan", INSIGHTS as unknown as Named[], (x) => abs(`/insights/${x.slug}`));
    default:
      return null;
  }
}

/**
 * Graf JSON-LD lengkap untuk sebuah rute.
 * - Beranda: Organization + WebSite + LegalService + WebPage + Breadcrumb
 * - Halaman lain: WebPage + Breadcrumb + tipe spesifik (Service/Article/FAQ/ItemList/Person)
 * - Rute noindex (VVIP): kosong.
 */
export function getJsonLd(input: string): JsonLd[] {
  const seo = getRouteSeo(input);
  if (!seo || seo.noindex) return [];

  const graph: JsonLd[] = [];
  if (seo.kind === "home") {
    graph.push(organizationJsonLd(), websiteJsonLd(), legalServiceJsonLd());
  }
  graph.push(webPageJsonLd(seo), breadcrumbJsonLd(seo));
  const extra =
    serviceJsonLd(seo) ??
    articleJsonLd(seo) ??
    councilChairJsonLd(seo) ??
    itemListJsonLd(seo) ??
    (seo.kind === "faq" ? faqJsonLd() : null);
  if (extra) graph.push(extra);
  return graph.filter(Boolean);
}

/** JSON-LD siap suntik ke <script type="application/ld+json">. */
export function getJsonLdScripts(input: string): string[] {
  return getJsonLd(input).map((g) => JSON.stringify(g));
}

