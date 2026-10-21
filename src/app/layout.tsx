import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE, KEYWORDS, SITE_LASTMOD, buildLanguageAlternates } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

/**
 * METADATA GLOBAL SITUS — "terlengkap yang pernah ada".
 * Metadata per halaman (judul/deskripsi/kanonik/JSON-LD unik) dihasilkan
 * oleh src/lib/seo.ts melalui app/[[...slug]]/page.tsx.
 *
 * ── VERIFIKASI PEMILIKAN (aktifkan setelah mendaftar) ──────────────────────
 * Setelah verifikasi properti di Google Search Console / Bing Webmaster
 * Tools / Yandex Webmaster, tambahkan token ke objek `verification`:
 *
 *   verification: {
 *     google: "TOKEN-GOOGLE-SEARCH-CONSOLE",
 *     yandex: "TOKEN-YANDEX",
 *     other: { "msvalidate.01": "TOKEN-BING" },
 *   },
 *
 * Token diperoleh dari masing-masing konsol — jangan pernah menaruh token
 * tebakan; meta verifikasi kosong justru merugikan.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: "PT TOP KONSULTAN INTERNASIONAL — Konsultasi & Perizinan Terlengkap di Dunia",
    template: "%s — TOP Konsultan Internasional",
  },
  description: SITE.description,
  keywords: [...KEYWORDS],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: "Gugun Gunara — PT TOP KONSULTAN INTERNASIONAL",
  publisher: SITE.name,
  category: "Konsultasi Manajemen & Perizinan Usaha",
  classification: "Business Consulting, Legal Licensing, Professional Services",
  generator: "Next.js (React)",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
    languages: buildLanguageAlternates("/"),
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: "PT TOP KONSULTAN INTERNASIONAL — Satu Gerbang untuk Segala Izin & Strategi",
    description:
      "36+ jenis izin, 12 praktik konsultasi, 46 Dewan Pakar dunia, 6.900 tahun pengalaman gabungan, 190 negara, 195 bahasa. Dari pendirian PT hingga ekspansi global — pertama di dunia, berakar di Jakarta.",
    siteName: SITE.name,
    locale: "id_ID",
    alternateLocale: [
      "en_US", "ms_MY", "ja_JP", "ko_KR", "zh_CN", "zh_TW", "ar_AR", "es_ES",
      "fr_FR", "de_DE", "pt_PT", "it_IT", "ru_RU", "nl_NL", "tr_TR", "hi_IN",
      "th_TH", "vi_VN", "sv_SE", "pl_PL", "el_GR", "uk_UA", "fa_IR", "he_IL", "ur_PK",
    ],
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: SITE.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT TOP KONSULTAN INTERNASIONAL — Konsultasi & Perizinan Terlengkap",
    description:
      "46 Dewan Pakar. 6.900 tahun pengalaman gabungan. 36+ jenis izin. 190 negara. 195 bahasa. Satu jawaban absolut.",
    images: [SITE.ogImage],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TOP Konsultan",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    /* ── Dublin Core (DCMI) ── */
    "DC.title": "PT TOP KONSULTAN INTERNASIONAL — Konsultasi & Perizinan Terlengkap di Dunia",
    "DC.creator": "PT TOP KONSULTAN INTERNASIONAL",
    "DC.subject": KEYWORDS.slice(0, 8).join(", "),
    "DC.description": SITE.description,
    "DC.publisher": "PT TOP KONSULTAN INTERNASIONAL",
    "DC.contributor": "46 Dewan Pakar Lintas Bidang",
    "DC.date": SITE_LASTMOD,
    "DC.type": "Business.Services",
    "DC.format": "text/html",
    "DC.identifier": SITE.url,
    "DC.source": SITE.url,
    "DC.language": "id, en, ja, ko, zh-CN, zh-TW, ar, es, fr, de, pt, it, ru, ms, dan 181 bahasa lainnya",
    "DC.coverage": "Indonesia, Global (190 negara)",
    "DC.rights": `Copyright © ${new Date().getFullYear()} PT TOP KONSULTAN INTERNASIONAL. Seluruh hak cipta dilindungi.`,

    /* ── Geo (meta klasik mesin lokal) — kantor utama IDX Tower 1, Jakarta Selatan ── */
    "geo.region": "ID-JK",
    "geo.placename": "Senayan, Kebayoran Baru, Jakarta Selatan, DKI Jakarta, Indonesia",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,

    /* ── Open Graph Business (Facebook Pages) — alamat utama IDX Tower 1 ── */
    "business:contact_data:street_address":
      "Indonesia Stock Exchange Tower 1, Level 3, Unit 304, Jl. Jendral Sudirman Kav 52-53",
    "business:contact_data:locality": "Senayan, Kebayoran Baru, Jakarta Selatan",
    "business:contact_data:region": "DKI Jakarta",
    "business:contact_data:postal_code": "12190",
    "business:contact_data:country_name": "Indonesia",
    "business:contact_data:phone_number": SITE.phone,
    "business:contact_data:website": SITE.url,

    /* ── Meta pelengkap klasik ── */
    distribution: "global",
    rating: "General",
    "revisit-after": "7 days",
    language: "Indonesian (default) + 194 bahasa pilihan pengunjung",
    target: "all",
    handheldFriendly: "true",
    MobileOptimized: "width",
    "msapplication-TileColor": "#7c3aed",
    "msapplication-TileImage": "/icons/icon-192.png",
    "msapplication-config": "/browserconfig.xml",
    "apple-mobile-web-app-title": "TOP Konsultan",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" dir="ltr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
