"use client";

import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/landing/motion";
import { BRAND } from "@/data/brand";

/** Alamat utama firma — IDX Tower 1, Jakarta Selatan. */
const IDX_ADDRESS =
  "Indonesia Stock Exchange Tower 1 Level 3, Unit 304, Jl. Jendral Sudirman Kav 52-53, Desa/Kelurahan Senayan, Kec. Kebayoran Baru, Kota Adm. Jakarta Selatan, Provinsi DKI Jakarta";

/** Query peta — bentuk ringkas agar penanda presis di menara. */
const MAPS_QUERY = encodeURIComponent(
  "Indonesia Stock Exchange Tower 1, Jl. Jendral Sudirman Kav 52-53, Senayan, Jakarta Selatan"
);

/** Embed resmi Google Maps tanpa API key — label peta bahasa Indonesia. */
const MAPS_EMBED = `https://www.google.com/maps?q=${MAPS_QUERY}&z=16&hl=id&output=embed`;

/** Tautan petunjuk arah (Maps URLs API — buka aplikasi Maps pengguna). */
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

/**
 * Peta kantor utama — ditampilkan di halaman Kontak di antara form brief
 * dan jaringan kantor. SSR-aman: iframe statis, tanpa state klien.
 */
export default function OfficeMap() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      aria-label="Peta lokasi kantor utama IDX Tower 1 Jakarta Selatan"
    >
      <Reveal>
        <div className="glass overflow-hidden rounded-3xl">
          {/* Header kartu — alamat + petunjuk arah */}
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-slate-200/70 bg-white/60 px-6 py-5 sm:px-8">
            <div className="flex min-w-0 items-start gap-3.5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-300 bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600">
                <MapPin className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-600">
                  Kantor Utama — Jakarta Selatan
                </p>
                <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-600">
                  {IDX_ADDRESS}
                </p>
              </div>
            </div>
            <a
              href={MAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_44px_-12px_rgba(139,92,246,0.42)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Petunjuk Arah
            </a>
          </div>

          {/* Embed peta */}
          <iframe
            src={MAPS_EMBED}
            title="Peta Google Maps — kantor PT TOP KONSULTAN INTERNASIONAL di Indonesia Stock Exchange Tower 1, Senayan, Jakarta Selatan"
            className="block h-[360px] w-full border-0 sm:h-[440px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Footer kartu — jam layanan */}
          <p className="border-t border-slate-200/70 bg-white/60 px-6 py-3.5 text-center text-[12px] font-medium text-slate-500 sm:px-8">
            Segitiga Emas Sudirman · akses langsung dari Stasiun MRT Istora
            Mandiri &amp; Senayan — layanan WhatsApp{" "}
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-violet-600 transition-colors hover:text-violet-700"
            >
              {BRAND.whatsapp}
            </a>{" "}
            aktif 24/7.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
