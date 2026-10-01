"use client";

/**
 * TOP shared page primitives — used by every inner page so the whole
 * site feels like one hand-crafted object.
 */

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@/lib/router";
import { BRAND } from "@/data/brand";
import { EASE, Reveal } from "@/components/landing/motion";

/* ------------------------------- Link Button ------------------------------- */

export function LinkButton({
  to,
  children,
  variant = "gold",
  className = "",
  withArrow = false,
}: {
  to: string;
  children: ReactNode;
  variant?: "gold" | "ghost";
  className?: string;
  withArrow?: boolean;
}) {
  if (variant === "gold") {
    return (
      <Link
        to={to}
        className={`shine inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-500 px-7 py-3 text-sm font-bold text-zinc-950 shadow-[0_12px_44px_-10px_rgba(139,92,246,0.7)] transition-transform duration-300 hover:scale-[1.04] active:scale-95 ${className}`}
      >
        {children}
        {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
      </Link>
    );
  }
  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-900/40 px-7 py-3 text-sm font-semibold text-zinc-200 backdrop-blur transition-all duration-300 hover:border-violet-400/50 hover:text-violet-300 ${className}`}
    >
      {children}
      {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </Link>
  );
}

/* --------------------------------- Breadcrumb -------------------------------- */

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? (
              <ChevronRight className="h-3 w-3 text-zinc-700" aria-hidden="true" />
            ) : null}
            {item.to && !last ? (
              <Link
                to={item.to}
                className="font-medium text-zinc-500 transition-colors hover:text-violet-300"
              >
                {item.label}
              </Link>
            ) : (
              <span className={last ? "font-semibold text-violet-300/90" : "font-medium text-zinc-500"}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* --------------------------------- Page Hero --------------------------------- */

export function PageHero({
  eyebrow,
  title,
  sub,
  crumbs,
  children,
  meta,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  crumbs: { label: string; to?: string }[];
  children?: ReactNode;
  /** Small meta chips shown under the sub copy */
  meta?: string[];
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <section className="noise-overlay relative overflow-hidden pb-14 pt-36 sm:pb-16 sm:pt-40">
      <div
        className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_75%_70%_at_50%_25%,black_25%,transparent_80%)]"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute right-[5%] top-10 h-80 w-80 rounded-full bg-violet-600/10 blur-[130px]" />
      </motion.div>

      <div
        className={`relative z-10 mx-auto flex max-w-5xl flex-col px-4 sm:px-6 ${alignCls}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Breadcrumb items={crumbs} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-violet-400/30 bg-violet-400/[0.07] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-violet-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {sub ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26, ease: EASE }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            {sub}
          </motion.p>
        ) : null}

        {meta && meta.length > 0 ? (
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: EASE }}
            className="mt-7 flex flex-wrap justify-center gap-2.5"
          >
            {meta.map((m) => (
              <li
                key={m}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-900/50 px-4 py-2 text-xs font-medium text-zinc-400 backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
                {m}
              </li>
            ))}
          </motion.ul>
        ) : null}

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.44, ease: EASE }}
            className={`mt-9 flex flex-col gap-4 ${align === "center" ? "sm:flex-row sm:justify-center" : ""}`}
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

/* ---------------------------------- Stat Band --------------------------------- */

export function StatBand({
  stats,
  className = "",
}: {
  stats: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-800/80 sm:grid-cols-3 ${className}`}
    >
      {stats.map((s, i) => (
        <div key={`${s.label}-${i}`} className="flex flex-col items-center gap-1.5 bg-zinc-950/90 px-6 py-7 text-center">
          <span className="font-display text-2xl font-bold text-gradient-gold sm:text-3xl">
            {s.value}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- CTA Band --------------------------------- */

export function CTABand({
  title,
  sub,
}: {
  title?: ReactNode;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28" aria-label="Konsultasikan dengan Dewan">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-violet-300/80">
            Dewan Pakar menanti Anda
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-zinc-50 sm:text-5xl">
            {title ?? (
              <>
                Dekade berikutnya tidak menunggu.{" "}
                <span className="text-gradient-gold">Anda pun tidak seharusnya.</span>
              </>
            )}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            {sub ??
              "Brieving hari ini, kejelasan dalam 48 jam. Dari izin pertama hingga penguasaan pasar — 46 Dewan Pakar bergerak sejak menit pertama."}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LinkButton to="/contact" withArrow>
              Mulai Konsultasi
            </LinkButton>
            <a
              href={`${BRAND.whatsappHref}?text=${encodeURIComponent("Halo TOP Konsultan, saya ingin konsultasi perizinan bisnis.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-8 py-3.5 text-sm font-bold text-emerald-300 backdrop-blur transition-all duration-300 hover:border-emerald-400/70 hover:bg-emerald-400/20"
            >
              WhatsApp {BRAND.phone}
            </a>
            <LinkButton to="/councils" variant="ghost">
              Kenali 46 Dewan
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ Ornament divider ----------------------------- */

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-violet-400/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-violet-400" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-violet-400/50" />
    </div>
  );
}
