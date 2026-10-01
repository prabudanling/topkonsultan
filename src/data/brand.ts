/**
 * PT TOP KONSULTAN INTERNASIONAL — single source of brand truth.
 * Every component, page and document pulls identity facts from here so the
 * brand can never drift.
 */

export const BRAND = {
  /** Full legal entity name */
  legal: "PT TOP KONSULTAN INTERNASIONAL",
  /** Wordmark line 1 */
  name: "TOP KONSULTAN",
  /** Wordmark line 2 */
  sub: "INTERNASIONAL",
  /** Monogram / logo seed */
  monogram: "TOP",

  tagline: "Konsultasi & Perizinan Terlengkap di Dunia",
  taglineEn: "The World's Most Complete Consulting & Licensing House",

  promise:
    "Satu gerbang untuk segala izin, strategi, dan eksekusi — dari pendirian PT hingga ekspansi 190 negara.",
  promiseEn:
    "One gateway for every license, strategy and execution — from company incorporation to 190-country expansion.",

  founded: 2001,
  hq: "Tasikmalaya · Jakarta, Indonesia",

  /** Official business line — WhatsApp & telepon satu nomor, aktif 24/7 */
  phone: "+62 811-1116-5165",
  phoneHref: "+6281111165165",
  whatsapp: "+62 811-1116-5165",
  whatsappHref: "https://wa.me/6281111165165",
  whatsappIntl: "6281111165165",
  email: "halo@topkonsultan.web.id",
  emailGlobal: "halo@topkonsultan.web.id",

  /** Kantor pusat — Alamat I */
  address:
    "Perumahan Arjamukti Kencana Raya Blok B7 No. 2, Leuwisari, Arjasari, Tasikmalaya, Jawa Barat",

  /** Empat kantor resmi — tampil di footer, halaman kontak, dan Kantor Kami */
  addresses: [
    {
      label: "Kantor Pusat — Tasikmalaya I",
      short: "Arjamukti, Arjasari",
      value:
        "Perumahan Arjamukti Kencana Raya Blok B7 No. 2, Leuwisari, Arjasari, Kab. Tasikmalaya, Jawa Barat",
    },
    {
      label: "Kantor Tasikmalaya II",
      short: "Andalusia Garden, Mangkubumi",
      value:
        "Perumahan Andalusia Garden, Cluster Granada No. 11, Mangkubumi, Kota Tasikmalaya, Jawa Barat",
    },
    {
      label: "Kantor Jakarta",
      short: "PHI Kwitang, Jakarta Pusat",
      value: "Kantor PHI Kwitang, Kwitang, Senen, Jakarta Pusat, DKI Jakarta",
    },
    {
      label: "Perwakilan IPHI Pusat",
      short: "Ikatan Penasihat Hukum Indonesia",
      value: "Sekretariat IPHI Pusat — Ikatan Penasihat Hukum Indonesia, Jakarta",
    },
  ] as const,

  /** Signature numbers — keep in sync with STATS in content.ts */
  councils: 46,
  yearsMastery: 150,
  yearsCombined: "6.900",
  countries: 190,
  projects: "12.000+",
  success: "99,97%",
  /** Indonesian formatting of the combined expertise promise */
  firstInsightHours: 48,
} as const;

export type Brand = typeof BRAND;
