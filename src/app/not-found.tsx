import type { Metadata } from "next";
import NotFoundPage from "@/components/site/pages/not-found";

export const metadata: Metadata = {
  title: { absolute: "Halaman Tidak Ditemukan — TOP Konsultan Internasional" },
  description:
    "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda PT TOP KONSULTAN INTERNASIONAL atau jelajahi Gerbang Perizinan — 36 jenis izin dalam satu pintu.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}
