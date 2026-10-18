"use client";

/**
 * /jasa/{kategori} — halaman kategori Katalog 500 Jasa.
 * Daftar seluruh layanan dalam kategori + persyaratan umum + navigasi kategori lain.
 */

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, FileCheck2, Landmark, ListChecks } from "lucide-react";
import { JASA_CATEGORIES, JASA_COUNT_BY_CAT, findJasaCategory, jasaInCategory } from "@/data/jasa";
import { Link } from "@/lib/router";
import { EASE } from "@/components/landing/motion";
import { Breadcrumb, CTABand, LinkButton, Ornament } from "@/components/site/ui";
import { JASA_CATEGORY_ICONS } from "@/components/site/pages/jasa";

export default function JasaCategoryPage({ catId }: { catId: string }) {
  const cat = findJasaCategory(catId);
  if (!cat) return null;

  const items = jasaInCategory(catId);
  const Icon = JASA_CATEGORY_ICONS[catId] ?? ListChecks;
  const agencies = Array.from(new Set(items.map((s) => s.agency.split(" · ")[0]))).slice(0, 4);

  return (
    <article>
      {/* Hero */}
      <section className="noise-overlay relative overflow-hidden pb-12 pt-36 sm:pt-40">
        <div
          className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_25%,black_25%,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <Breadcrumb
            items={[
              { label: "Beranda", to: "/" },
              { label: "500 Jasa Perizinan", to: "/jasa" },
              { label: cat.name },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300 bg-violet-50 text-violet-600">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-600">
              {JASA_COUNT_BY_CAT[catId] ?? items.length} layanan
            </span>
            <span className="rounded-full border border-slate-200 bg-white/60 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
              Kategori {JASA_CATEGORIES.findIndex((c) => c.id === catId) + 1} dari {JASA_CATEGORIES.length}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-6 font-display text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl"
          >
            {cat.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-violet-700"
          >
            {cat.enName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
          >
            {cat.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {agencies.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/50 px-3.5 py-1.5 text-xs font-medium text-slate-500"
              >
                <Landmark className="h-3 w-3 text-violet-500" aria-hidden="true" />
                {a}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Daftar layanan */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label={`Daftar layanan ${cat.name}`}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((svc, i) => (
            <motion.div
              key={svc.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i % 6, 4) * 0.04, ease: EASE }}
              className="h-full"
            >
              <Link
                to={`/jasa/${svc.cat}/${svc.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/70 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.22)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-[13px] font-black text-violet-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {svc.populer ? (
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                      Unggulan
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3.5 font-display text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700">
                  {svc.title}
                </h2>
                <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {svc.enTitle}
                </p>
                <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
                  {svc.desc}
                </p>
                <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[11px]">
                  <span className="line-clamp-1 font-medium text-slate-500">{svc.agency}</span>
                  <span className="flex shrink-0 items-center gap-1 font-semibold text-violet-700">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {svc.timeline}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Persyaratan umum kategori */}
      <section className="relative overflow-hidden py-16" aria-label="Persyaratan umum">
        <Ornament className="absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-7 backdrop-blur sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-violet-600">
                <FileCheck2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Persyaratan Umum — {cat.name}
                </h2>
                <p className="text-xs text-slate-400">Dokumen dasar yang diminta di hampir seluruh layanan kategori ini</p>
              </div>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {cat.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" aria-hidden="true" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-400">
              Setiap layanan dapat menambah persyaratan spesifik — lihat halaman layanan
              untuk rincian, atau hubungi kami untuk daftar dokumen yang disesuaikan
              dengan profil usaha Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Navigasi kategori lain */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8" aria-label="Kategori lainnya">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Lanjutkan ke kategori lain
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {JASA_CATEGORIES.filter((c) => c.id !== catId).map((c) => (
            <Link
              key={c.id}
              to={`/jasa/${c.id}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-500 transition-all hover:border-violet-400 hover:text-violet-600"
            >
              {c.name}
              <span className="text-[10px] font-bold text-slate-400">{JASA_COUNT_BY_CAT[c.id]}</span>
            </Link>
          ))}
          <Link
            to="/jasa"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-violet-500/70 bg-violet-100 px-4 text-[13px] font-bold text-violet-700"
          >
            Semua 500 jasa
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTABand
        title={
          <>
            {items.length} layanan {cat.name.toLowerCase()} siap dikerjakan{" "}
            <span className="text-gradient-gold">hari ini.</span>
          </>
        }
        sub={`Beri tahu layanan mana yang Anda butuhkan — ${agencies[0]} dan instansi terkait kami hadapi sampai dokumen resmi terbit.`}
      />
    </article>
  );
}
