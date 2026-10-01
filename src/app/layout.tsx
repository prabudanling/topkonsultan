import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "PT TOP KONSULTAN INTERNASIONAL — Konsultasi & Perizinan Terlengkap di Dunia",
  description:
    "Gerbang tunggal konsultasi & perizinan terlengkap di dunia: pendirian PT/PMA, NIB OSS RBA, BPOM, halal, SNI, KITAS, PSE, OJK, hingga strategi korporat. 46 Dewan Pakar internasional, 6.900 tahun pengalaman gabungan, 190 negara. Layanan global dalam 40+ bahasa.",
  keywords: [
    "top konsultan internasional",
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
  ],
  authors: [{ name: "PT TOP KONSULTAN INTERNASIONAL" }],
  openGraph: {
    title: "PT TOP KONSULTAN INTERNASIONAL — Satu Gerbang untuk Segala Izin & Strategi",
    description:
      "36+ jenis izin, 12 praktik konsultasi, 46 Dewan Pakar dunia. Dari pendirian PT hingga ekspansi global — pertama di dunia, berakar di Jakarta.",
    siteName: "PT TOP KONSULTAN INTERNASIONAL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT TOP KONSULTAN INTERNASIONAL — Konsultasi & Perizinan Terlengkap",
    description:
      "46 Dewan Pakar. 6.900 tahun pengalaman gabungan. 36+ jenis izin. Satu jawaban absolut.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafc",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
