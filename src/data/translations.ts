/**
 * Gabungan seluruh kamus terjemahan antarmuka.
 * - 26 bahasa "penuh" (31 kunci): navigasi, hero, chip, dan teks dialog pemilih bahasa.
 * - 49 bahasa "parsial" (19 kunci): navigasi + judul/CTA hero.
 * - Bahasa lainnya (dari 195 pilihan) tetap menikmati Oracle AI dalam bahasanya,
 *   sementara teks antarmuka kembali ke Bahasa Indonesia.
 */

import type { FullDict } from "./translations-major1";
import type { PartialDict } from "./translations-partial1";
import { ID, EN, MS, JA, KO, ZH_CN, ZH_TW, AR, ES, FR, DE, PT, IT } from "./translations-major1";
import { RU, NL, TR, HI, TH, VI, SV, PL, EL, UK, FA, HE, UR } from "./translations-major2";
import { DA, NB, FI, IS, ET, LV, LT, CS, SK, HU, RO, BG, SR, HR, SL, SQ, BE, CA, EU, GL, CY, GA, MT, TL, KM } from "./translations-partial1";
import { MY, LO, BN, TA, TE, KN, ML, MR, GU, PA, NE, SI, SW, ZU, AF, AM, HA, YO, KK, UZ, AZ, HY, KA, MN } from "./translations-partial2";

export type TranslationKey =
  | "nav.perizinan" | "nav.jasa" | "nav.layanan" | "nav.dewan" | "nav.industri" | "nav.wawasan" | "nav.tentang"
  | "nav.metode" | "nav.hasil" | "nav.karier" | "nav.faq" | "nav.kontak" | "nav.cta"
  | "hero.t1" | "hero.t2" | "hero.t3" | "hero.sub1" | "hero.sub2"
  | "hero.cta1" | "hero.cta2" | "hero.cta3"
  | "hero.chip1" | "hero.chip2" | "hero.chip3" | "hero.chip4"
  | "hero.scroll"
  | "pick.title" | "pick.search" | "pick.popular" | "pick.all" | "pick.note" | "pick.current";

export type TranslationDict = Partial<Record<TranslationKey, string>>;

export const TRANSLATIONS: Record<string, TranslationDict> = {
  id: ID,
  en: EN,
  ms: MS,
  ja: JA,
  ko: KO,
  "zh-CN": ZH_CN,
  "zh-TW": ZH_TW,
  ar: AR,
  es: ES,
  fr: FR,
  de: DE,
  pt: PT,
  it: IT,
  ru: RU,
  nl: NL,
  tr: TR,
  hi: HI,
  th: TH,
  vi: VI,
  sv: SV,
  pl: PL,
  el: EL,
  uk: UK,
  fa: FA,
  he: HE,
  ur: UR,
  da: DA,
  nb: NB,
  fi: FI,
  is: IS,
  et: ET,
  lv: LV,
  lt: LT,
  cs: CS,
  sk: SK,
  hu: HU,
  ro: RO,
  bg: BG,
  sr: SR,
  hr: HR,
  sl: SL,
  sq: SQ,
  be: BE,
  ca: CA,
  eu: EU,
  gl: GL,
  cy: CY,
  ga: GA,
  mt: MT,
  tl: TL,
  km: KM,
  my: MY,
  lo: LO,
  bn: BN,
  ta: TA,
  te: TE,
  kn: KN,
  ml: ML,
  mr: MR,
  gu: GU,
  pa: PA,
  ne: NE,
  si: SI,
  sw: SW,
  zu: ZU,
  af: AF,
  am: AM,
  ha: HA,
  yo: YO,
  kk: KK,
  uz: UZ,
  az: AZ,
  hy: HY,
  ka: KA,
  mn: MN,
};

/** Jumlah bahasa yang punya terjemahan antarmuka. */
export const TRANSLATED_COUNT = Object.keys(TRANSLATIONS).length;

/** Kumpulan kode bahasa yang antarmukanya diterjemahkan (dipakai pemilih bahasa). */
export const TRANSLATED_LANGS = new Set(Object.keys(TRANSLATIONS));

export type { FullDict, PartialDict };

export { ID };
