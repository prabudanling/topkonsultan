/**
 * src/data/jasa/index.ts — Katalog 500 Jasa Perizinan.
 * ----------------------------------------------------------------------------
 * 500 layanan dalam 33 kategori — hasil riset benchmark 10 website
 * perizinan/konsultan teratas Asia & dunia (IATA, Dezan Shira, MSA Asia,
 * LegalBison, Sleek, OSOME, dst.), disesuaikan dengan regulasi Indonesia.
 *
 * Validasi build-time: total tepat 500, slug unik, kategori valid.
 */

import { JASA_CATEGORIES } from "./categories";
import type { JasaService } from "./types";
import { PART_1 } from "./part1";
import { PART_2 } from "./part2";
import { PART_3 } from "./part3";
import { PART_4 } from "./part4";
import { PART_5 } from "./part5";
import { PART_6 } from "./part6";
import { PART_7 } from "./part7";
import { PART_8 } from "./part8";
import { PART_9 } from "./part9";

export type { JasaService, JasaCategory } from "./types";
export { JASA_CATEGORIES } from "./categories";

/** Slug layanan unggulan — tampil di beranda katalog & sitemap prioritas. */
const POPULER_SLUGS = new Set([
  "pendirian-pt", "pendirian-pt-pma", "pengurusan-nib", "izin-edar-md",
  "sertifikasi-halal-produk", "amdal", "pbg", "sertifikasi-smk3",
  "iso-9001", "iso-27001", "akreditasi-17025-uji", "akreditasi-lsp-bnsp",
  "iata-cargo-agent", "iata-travel-agency", "iata-dgr-training",
  "rptka", "golden-visa", "pendaftaran-merek", "pelaporan-spt-tahunan",
  "iuptl", "izin-niaga-bbm-umum", "iup-operasi-produksi", "sertifikasi-ispo",
  "izin-usaha-benih", "siup-perikanan-tangkap", "izin-operasional-klinik",
  "izin-edar-alkes-akl-akd", "klasifikasi-hotel", "iuta-travel-agency",
  "siujpt-angkutan-orang", "siupal", "ppjk-keagenan-kargo", "registrasi-pse",
  "izin-lpbbti-lending", "izin-pjp-payment", "sbu-konstruksi",
  "akreditasi-ban-pt", "sertifikasi-sni-produk", "sertifikasi-tkdn",
  "izin-tps-b3", "registrasi-bpjs-ketenagakerjaan", "apostille-legalisasi-dokumen",
]);

const GROUPS = [...PART_1, ...PART_2, ...PART_3, ...PART_4, ...PART_5, ...PART_6, ...PART_7, ...PART_8, ...PART_9];

const CATEGORY_IDS = new Set(JASA_CATEGORIES.map((c) => c.id));

const ALL: JasaService[] = GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    enTitle: item.enTitle,
    cat: g.cat,
    agency: item.agency,
    timeline: item.timeline,
    desc: item.desc,
    keywords: item.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    populer: POPULER_SLUGS.has(item.slug),
  }))
);

/* ── Validasi build-time (build gagal bila data salah) ─────────────────── */

if (ALL.length !== 500) {
  throw new Error(
    `Katalog 500 Jasa: ditemukan ${ALL.length} layanan — harus tepat 500. Periksa src/data/jasa/part*.ts.`
  );
}

const slugSet = new Set<string>();
for (const svc of ALL) {
  if (slugSet.has(svc.slug)) {
    throw new Error(`Katalog 500 Jasa: slug duplikat "${svc.slug}".`);
  }
  slugSet.add(svc.slug);
  if (!CATEGORY_IDS.has(svc.cat)) {
    throw new Error(`Katalog 500 Jasa: kategori tidak dikenal "${svc.cat}" (slug "${svc.slug}").`);
  }
}

/* ── API publik ─────────────────────────────────────────────────────────── */

/** Seluruh 500 layanan (urut kategori lalu urutan penulisan). */
export const JASA_ITEMS: readonly JasaService[] = ALL;

/** Statistik katalog — dipakai hero & JSON-LD. */
export const JASA_STATS = {
  total: ALL.length,
  categories: JASA_CATEGORIES.length,
  populer: ALL.filter((s) => s.populer).length,
} as const;

/** Cari layanan berdasarkan slug (unik global). */
export function findJasa(slug: string): JasaService | undefined {
  return ALL.find((s) => s.slug === slug);
}

/** Layanan dalam satu kategori (urut penulisan). */
export function jasaInCategory(cat: string): JasaService[] {
  return ALL.filter((s) => s.cat === cat);
}

/** Kategori berdasarkan id. */
export function findJasaCategory(cat: string): (typeof JASA_CATEGORIES)[number] | undefined {
  return JASA_CATEGORIES.find((c) => c.id === cat);
}

/** Jumlah layanan per kategori (id → jumlah). */
export const JASA_COUNT_BY_CAT: Record<string, number> = JASA_CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = jasaInCategory(c.id).length;
    return acc;
  },
  {} as Record<string, number>
);

/** Layanan unggulan (flag populer). */
export const JASA_POPULER: JasaService[] = ALL.filter((s) => s.populer);

/** Pencarian cepat untuk katalog interaktif. */
export function searchJasa(query: string, limit = 60): JasaService[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return ALL.filter((svc) => {
    const haystack = `${svc.title} ${svc.enTitle} ${svc.agency} ${svc.desc} ${svc.keywords.join(" ")} ${svc.cat}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  }).slice(0, limit);
}
