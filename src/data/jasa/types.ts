/**
 * src/data/jasa/types.ts — Tipe data Katalog 500 Jasa Perizinan.
 * ----------------------------------------------------------------------------
 * 500 layanan tambahan (riset benchmark 10 website perizinan/konsultan
 * teratas Asia & dunia, termasuk IATA & lembaga akreditasi) dikelompokkan
 * dalam 33 kategori. Dipakai oleh:
 *   - src/lib/seo.ts          (metadata, sitemap, JSON-LD per halaman)
 *   - src/components/site/pages/jasa*.tsx (tampilan SPA)
 */

/** Bentuk ringkas saat penulisan data (keywords masih string CSV). */
export interface JasaInput {
  /** Slug unik URL, huruf kecil, dipisah tanda hubung. */
  slug: string;
  /** Judul layanan (Bahasa Indonesia) — dipakai H1 & title tag. */
  title: string;
  /** Nama Inggris — alternateName JSON-LD & sub-judul halaman. */
  enTitle: string;
  /** Instansi / otoritas penerbit. */
  agency: string;
  /** Estimasi durasi penyelesaian. */
  timeline: string;
  /** Deskripsi unik 1-2 kalimat — meta description & pengantar halaman. */
  desc: string;
  /** Kata kunci SEO, dipisah koma. */
  keywords: string;
}

/** Sekelompok layanan milik satu kategori. */
export interface JasaGroup {
  /** ID kategori (harus ada di JASA_CATEGORIES). */
  cat: string;
  items: JasaInput[];
}

/** Bentuk final layanan setelah dinormalisasi. */
export interface JasaService {
  slug: string;
  title: string;
  enTitle: string;
  cat: string;
  agency: string;
  timeline: string;
  desc: string;
  keywords: string[];
  /** Layanan unggulan (tampil di beranda katalog). */
  populer: boolean;
}

/** Kategori jasa — 33 kelompok, masing-masing punya intro & persyaratan umum. */
export interface JasaCategory {
  id: string;
  name: string;
  enName: string;
  /** Pengantar kategori (2-3 kalimat, dipakai halaman kategori & SEO). */
  intro: string;
  /** Persyaratan umum dokumen untuk seluruh layanan dalam kategori ini. */
  requirements: string[];
}
