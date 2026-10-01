"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, KeyRound, Linkedin, Twitter, UserRound } from "lucide-react";
import { INSIGHTS } from "@/data/insights";
import { EASE, Reveal } from "@/components/landing/motion";
import { CTABand, LinkButton, Ornament } from "@/components/site/ui";

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${iso}T00:00:00Z`));
  } catch {
    return iso;
  }
}

export default function InsightDetailPage({ slug }: { slug: string }) {
  const idx = INSIGHTS.findIndex((i) => i.slug === slug);
  const insight = INSIGHTS[idx];

  if (!insight) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 pt-24 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-zinc-100">Wawasan tidak ditemukan.</h1>
          <p className="mt-3 text-sm text-zinc-500">Esai ini belum diterbitkan.</p>
          <div className="mt-6 flex justify-center">
            <LinkButton to="/insights" withArrow>
              Semua wawasan
            </LinkButton>
          </div>
        </div>
      </section>
    );
  }

  const prev = INSIGHTS[(idx - 1 + INSIGHTS.length) % INSIGHTS.length];
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = encodeURIComponent(`${insight.title} — PT TOP KONSULTAN INTERNASIONAL`);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-36 sm:pt-40" aria-label="Kepala artikel">
        <div
          className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_25%,black_25%,transparent_80%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <a
              href="#/insights"
              className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition-colors hover:text-amber-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Semua wawasan
            </a>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                {insight.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-500">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(insight.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-500">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                Waktu baca {insight.readTime} menit
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl"
          >
            {insight.title}
          </motion.h1>

          {insight.enTitle ? (
            <p className="mt-3 font-display text-[13px] font-semibold uppercase tracking-[0.24em] text-amber-300/70 sm:text-sm">
              {insight.enTitle}
            </p>
          ) : null}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="mt-5 text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            {insight.excerpt}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-6 flex flex-wrap items-center justify-between gap-4"
          >
            <p className="flex items-center gap-2.5 text-sm text-zinc-400">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10">
                <UserRound className="h-4 w-4 text-amber-300" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-zinc-200">{insight.author.name}</span>
                <span className="block text-[12px] text-zinc-500">{insight.author.role}</span>
              </span>
            </p>
            <div className="flex items-center gap-2">
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Berbagi
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Berbagi ke X / Twitter"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-amber-300"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Berbagi ke LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-amber-300"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover */}
      <Reveal className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative aspect-[2/1] overflow-hidden rounded-3xl border border-zinc-800/80">
          <Image
            src={insight.cover}
            alt={`Ilustrasi sampul untuk ${insight.title}`}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
        </div>
      </Reveal>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 pb-4 pt-12 sm:px-6">
        {insight.body.map((block, i) =>
          block.startsWith("## ") ? (
            <Reveal key={i}>
              <h2 className="mb-4 mt-10 font-display text-2xl font-bold text-zinc-50 sm:text-3xl">
                <span className="text-gradient-gold">{block.replace(/^##\s*/, "")}</span>
              </h2>
            </Reveal>
          ) : (
            <Reveal key={i}>
              <p className="mb-5 text-[15.5px] leading-[1.85] text-zinc-300 sm:text-base">
                {block}
              </p>
            </Reveal>
          )
        )}

        {/* Key points */}
        <Reveal>
          <aside className="mt-12 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.07] to-transparent p-7 sm:p-8">
            <h2 className="flex items-center gap-2.5 font-display text-lg font-bold text-zinc-50">
              <KeyRound className="h-5 w-5 text-amber-400" aria-hidden="true" />
              Poin Kunci
            </h2>
            <ul className="mt-5 space-y-3.5">
              {insight.keyPoints.map((k) => (
                <li key={k} className="flex items-start gap-3 text-[15px] leading-relaxed text-zinc-200">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-400" aria-hidden="true" />
                  {k}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {insight.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-700/70 px-3.5 py-1.5 text-[11px] font-medium text-zinc-500"
            >
              {t}
            </span>
          ))}
        </div>

        <Ornament className="mt-12" />

        {/* Author box */}
        <div className="mt-10 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400/70">
            Ditulis dari ruang dewan
          </p>
          <p className="mt-2 font-display text-lg font-bold text-zinc-100">{insight.author.name}</p>
          <p className="text-[13px] text-zinc-500">{insight.author.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Diterbitkan di bawah doktrin transparansi ruang dewan — penilaian yang berani
            mencantumkan nama, dalam tradisi Piagam TOP sejak 2001.
          </p>
        </div>
      </article>

      {/* Prev / next */}
      <nav
        className="mx-auto flex max-w-7xl flex-col items-stretch justify-between gap-4 px-4 py-14 sm:flex-row sm:px-6 lg:px-8"
        aria-label="Wawasan lainnya"
      >
        <a
          href={`#/insights/${prev.slug}`}
          className="group flex items-center gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-amber-400/40"
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-zinc-600 transition-colors group-hover:text-amber-300" aria-hidden="true" />
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Wawasan sebelumnya
            </span>
            <span className="block max-w-[240px] truncate font-display text-sm font-bold text-zinc-200">
              {prev.title}
            </span>
          </span>
        </a>
        <a
          href={`#/insights/${next.slug}`}
          className="group flex items-center justify-end gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 text-right transition-all duration-300 hover:border-amber-400/40"
        >
          <span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Wawasan berikutnya
            </span>
            <span className="block max-w-[240px] truncate font-display text-sm font-bold text-zinc-200">
              {next.title}
            </span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-zinc-600 transition-colors group-hover:text-amber-300" aria-hidden="true" />
        </a>
      </nav>

      <CTABand />
    </>
  );
}
