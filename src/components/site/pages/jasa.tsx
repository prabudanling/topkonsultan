"use client";

/**
 * /jasa — Katalog 500 Jasa Perizinan.
 * Indeks utama: pencarian seluruh 500 layanan, 33 kartu kategori,
 * dan 42 layanan unggulan — setiap layanan punya URL nyata (SEO penuh).
 */

import { motion } from "framer-motion";
import {
  ArrowRight, Award, BadgeCheck, Briefcase, Building, Building2, Calculator,
  Coins, Copyright, Factory, Fish, FlaskConical, Globe, GraduationCap,
  HardHat, HeartPulse, Landmark, Leaf, MoonStar, Package, Palmtree, Pill,
  PiggyBank, Plane, Search, Ship, ShoppingCart, Sparkles, Stethoscope,
  TreePine, Truck, Users, Wifi, Wrench, X, Zap, type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  JASA_CATEGORIES, JASA_COUNT_BY_CAT, JASA_STATS, JASA_POPULER, searchJasa,
} from "@/data/jasa";
import { Link } from "@/lib/router";
import { EASE } from "@/components/landing/motion";
import { CTABand, LinkButton, PageHero, StatBand } from "@/components/site/ui";

/** Ikon per kategori (33) — padanan visual di kartu & halaman kategori. */
export const JASA_CATEGORY_ICONS: Record<string, LucideIcon> = {
  "badan-usaha": Building2,
  "oss-nib": Landmark,
  perdagangan: ShoppingCart,
  bpom: Pill,
  halal: MoonStar,
  lingkungan: Leaf,
  bangunan: Building,
  k3: HardHat,
  iso: Award,
  akreditasi: BadgeCheck,
  "iata-penerbangan": Plane,
  imigrasi: Globe,
  investasi: PiggyBank,
  hki: Copyright,
  pajak: Calculator,
  "energi-migas": Zap,
  kehutanan: TreePine,
  pertanian: GraduationCap,
  perikanan: Fish,
  kesehatan: HeartPulse,
  alkes: Stethoscope,
  pariwisata: Palmtree,
  transportasi: Truck,
  maritim: Ship,
  "bea-cukai": Package,
  digital: Wifi,
  keuangan: Coins,
  konstruksi: Wrench,
  pendidikan: GraduationCap,
  industri: Factory,
  "b3-kimia": FlaskConical,
  ketenagakerjaan: Users,
  "jasa-lainnya": Briefcase,
};

export default function JasaPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchJasa(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <>
      <PageHero
        eyebrow="Katalog 500 Jasa Perizinan"
        title={
          <>
            500 Layanan Perizinan.{" "}
            <span className="text-gradient-gold">33 Kategori.</span>
          </>
        }
        sub="Hasil riset benchmark website perizinan teratas Asia & dunia — katalog jasa pengurusan izin terlengkap di Indonesia: pendirian badan usaha, BPOM, halal, ISO, akreditasi KAN/BNSP, IATA, imigrasi, SNI, TKDN, hingga lisensi OJK. Setiap layanan punya halaman resmi sendiri."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "500 Jasa Perizinan" }]}
        meta={[
          `${JASA_STATS.total} Layanan`,
          `${JASA_STATS.categories} Kategori Regulasi`,
          "Termasuk IATA & Akreditasi",
          "Diurus 46 Dewan Pakar",
        ]}
      >
        <LinkButton to="/contact" withArrow>
          Konsultasi Gratis 48 Jam
        </LinkButton>
        <LinkButton to="/perizinan" variant="ghost">
          36 Izin Utama (Gerbang)
        </LinkButton>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Statistik katalog">
        <StatBand
          stats={[
            { value: String(JASA_STATS.total), label: "Layanan Perizinan" },
            { value: String(JASA_STATS.categories), label: "Kategori Regulasi" },
            { value: String(JASA_STATS.populer), label: "Layanan Unggulan" },
            { value: "23+", label: "Instansi Mitra" },
          ]}
        />
      </section>

      {/* Pencarian */}
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8" aria-label="Pencarian layanan">
        <div className="relative mx-auto w-full max-w-2xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari di 500 layanan: NIB, halal, IATA, ISO 17025, Golden Visa, AEO…"
            aria-label="Cari layanan perizinan"
            className="w-full rounded-full border border-slate-200 bg-white/60 py-3.5 pl-11 pr-11 text-sm text-slate-900 outline-none backdrop-blur transition-colors placeholder:text-slate-400 focus:border-violet-500/60"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Bersihkan pencarian"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition-colors hover:text-violet-600"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        {searching ? (
          <p className="mt-3 text-center text-xs font-medium text-slate-400" role="status">
            {results.length > 0
              ? `${results.length} layanan cocok dengan “${query}”${results.length >= 60 ? " (menampilkan 60 pertama)" : ""}`
              : `Tidak ditemukan di 500 katalog — 46 Dewan Pakar tetap bisa mengurusnya.`}
          </p>
        ) : null}
      </section>

      {/* Hasil pencarian ATAU kategori + unggulan */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Daftar layanan">
        {searching ? (
          results.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white/60 px-6 py-16 text-center">
              <Sparkles className="h-8 w-8 text-violet-500" aria-hidden="true" />
              <p className="text-lg font-semibold text-slate-600">
                Tidak ada layanan yang cocok — tapi bukan berarti tidak bisa.
              </p>
              <p className="max-w-md text-sm text-slate-500">
                46 Dewan Pakar menangani kombinasi izin apa pun di luar katalog.
                Ceritakan kebutuhan Anda, kami petakan jalannya.
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <LinkButton to="/contact" withArrow>
                  Tanyakan Kebutuhan Izin
                </LinkButton>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-7 text-sm font-semibold text-slate-600 transition-colors hover:border-violet-500/60 hover:text-violet-600"
                >
                  Reset Pencarian
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((svc, i) => (
                <JasaCard key={svc.slug} cat={svc.cat} slug={svc.slug} title={svc.title} enTitle={svc.enTitle} agency={svc.agency} timeline={svc.timeline} desc={svc.desc} index={i} />
              ))}
            </div>
          )
        ) : (
          <>
            {/* 33 kategori */}
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Jelajahi 33 Kategori
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                  Dari pendirian badan usaha hingga lisensi fintech — setiap kategori
                  memuat 10–28 layanan dengan halaman resmi masing-masing.
                </p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {JASA_CATEGORIES.map((cat, i) => {
                const Icon = JASA_CATEGORY_ICONS[cat.id] ?? Briefcase;
                const count = JASA_COUNT_BY_CAT[cat.id] ?? 0;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: Math.min(i % 6, 4) * 0.04, ease: EASE }}
                  >
                    <Link
                      to={`/jasa/${cat.id}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.22)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-600">
                          {count} layanan
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
                        {cat.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {cat.enName}
                      </p>
                      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
                        {cat.intro}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 border-t border-slate-200 pt-3.5 text-xs font-bold text-violet-600 transition-opacity opacity-70 group-hover:opacity-100">
                        Lihat {count} layanan
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* 42 layanan unggulan */}
            <div className="mt-16">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Layanan Paling Sering Diurus
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                    {JASA_STATS.populer} layanan unggulan lintas kategori — pintu masuk
                    paling populer klien kami menuju kepatuhan penuh.
                  </p>
                </div>
                <LinkButton to="/perizinan" variant="ghost">
                  Lihat Gerbang 36 Izin
                </LinkButton>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {JASA_POPULER.map((svc, i) => (
                  <JasaCard key={svc.slug} cat={svc.cat} slug={svc.slug} title={svc.title} enTitle={svc.enTitle} agency={svc.agency} timeline={svc.timeline} desc={svc.desc} index={i} unggulan />
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <CTABand
        title={
          <>
            500 katalog, satu pintu.{" "}
            <span className="text-gradient-gold">Sisanya perencanaan presisi.</span>
          </>
        }
        sub="Beri tahu kami sektor dan tahap bisnis Anda — dewan pakar yang tepat akan memetakan seluruh izin yang Anda butuhkan dalam satu peta jalan."
      />
    </>
  );
}

/** Kartu layanan (dipakai di hasil pencarian & unggulan). */
export function JasaCard({
  cat, slug, title, enTitle, agency, timeline, desc, index, unggulan,
}: {
  cat: string; slug: string; title: string; enTitle: string;
  agency: string; timeline: string; desc: string; index: number; unggulan?: boolean;
}) {
  const catName = JASA_CATEGORIES.find((c) => c.id === cat)?.name ?? cat;
  const Icon = JASA_CATEGORY_ICONS[cat] ?? Briefcase;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index % 6, 4) * 0.04, ease: EASE }}
      className="h-full"
    >
      <Link
        to={`/jasa/${cat}/${slug}`}
        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.22)]"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          {unggulan ? (
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
              Unggulan
            </span>
          ) : null}
        </div>
        <h3 className="mt-3.5 font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
          {title}
        </h3>
        <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
          {enTitle}
        </p>
        <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
          {desc}
        </p>
        <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[11px]">
          <span className="line-clamp-1 font-medium text-slate-500">{agency}</span>
          <span className="shrink-0 font-semibold text-violet-700">{timeline}</span>
        </div>
        <span className="mt-2 truncate text-[10px] font-medium uppercase tracking-wider text-slate-400">
          {catName}
        </span>
      </Link>
    </motion.div>
  );
}
