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
  hq: "Jakarta, Indonesia",

  phone: "+62 21 5088 8000",
  phoneHref: "+622150888000",
  whatsapp: "+62 811 100 8000",
  whatsappHref: "https://wa.me/628111008000",
  email: "halo@topkonsultan.co.id",
  emailGlobal: "global@topkonsultan.com",
  address: "Menara TOP Lt. 38, Jl. Jend. Sudirman Kav. 52–53, Jakarta Selatan 12190",

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
