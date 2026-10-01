"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { COUNCILS, COUNCIL_CATEGORIES } from "@/data/content";
import { slugify } from "@/data/extended-types";
import { EASE, Reveal, SectionHeading } from "./motion";

type Filter = "All" | (typeof COUNCIL_CATEGORIES)[number];
const FILTERS: Filter[] = ["All", ...COUNCIL_CATEGORIES];

export default function Councils() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? COUNCILS : COUNCILS.filter((c) => c.category === filter);
  const countFor = (f: Filter) =>
    f === "All" ? COUNCILS.length : COUNCILS.filter((c) => c.category === f).length;

  return (
    <section
      id="councils"
      className="relative scroll-mt-20 overflow-hidden border-t border-zinc-900/70 py-24 sm:py-28"
      aria-label="46 Dewan Pakar"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.05] blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dewan Pakar"
          title={
            <>
              46 Pikiran. <span className="text-gradient-gold">Satu Vonis.</span>
            </>
          }
          sub="Setiap dewan membawa 150 tahun penguasaan yang terdistilasi di ranahnya. Bersama-sama: 6.900 tahun kejeniusan manusia — bersidang untuk kepentingan Anda sejak jam nol."
        />

        {/* Filters */}
        <Reveal delay={0.15}>
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-2.5"
            role="tablist"
            aria-label="Filter dewan menurut ranah"
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-[13px] ${
                    active
                      ? "bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-950 shadow-[0_8px_28px_-8px_rgba(245,158,11,0.7)]"
                      : "border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-amber-400/40 hover:text-amber-300"
                  }`}
                >
                  {f === "All" ? "Semua" : f}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      active ? "bg-zinc-950/20 text-zinc-950" : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {countFor(f)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid — scrollable when showing all 46 */}
        <div
          key={filter}
          className={`mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${
            filter === "All"
              ? "max-h-[640px] overflow-y-auto custom-scrollbar pr-1.5 sm:pr-2"
              : ""
          }`}
        >
          {shown.map((c, i) => (
            <motion.a
              key={c.name}
              href={`#/councils/${slugify(c.name)}`}
              aria-label={`Buka Dewan ${c.name}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.035, 0.5), ease: EASE }}
              className="group flex items-start gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-zinc-900/70 hover:shadow-[0_16px_44px_-18px_rgba(245,158,11,0.3)]"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-400/25 bg-amber-400/10 text-amber-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <c.icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/70">
                  {c.category}
                </p>
                <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-zinc-100">
                  {c.name}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">{c.blurb}</p>
              </div>

              <span className="shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[10px] font-bold text-amber-300">
                150 th
              </span>
            </motion.a>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs text-zinc-600">
            Menampilkan {shown.length} dari 46 dewan ·{" "}
            <a
              href={
                filter === "All"
                  ? "#/councils"
                  : `#/councils?filter=${encodeURIComponent(filter)}`
              }
              className="font-semibold text-amber-300 transition-colors hover:text-amber-200"
            >
              Lihat semua 46 dewan di ruang sidang lengkap →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
