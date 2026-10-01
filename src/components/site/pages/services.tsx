"use client";

import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/content";
import { SERVICE_DETAILS } from "@/data/service-details";
import { Reveal } from "@/components/landing/motion";
import { CTABand, LinkButton, PageHero } from "@/components/site/ui";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="12 Praktik Layanan"
        title={
          <>
            Dua Belas Praktik. <span className="text-gradient-gold">Satu Standar: Mutlak.</span>
          </>
        }
        sub="Dua belas praktik, satu pikir terpadu. Saat firma lain menyerahkan tangan, kami meneruskan — dari input hulu yang paling mentah hingga luaran hilir yang paling matang."
        crumbs={[{ label: "Beranda", to: "/" }, { label: "Praktik" }]}
        meta={["Hulu → hilir", "Satu Partner-in-Chief", "Wawasan pertama 48 jam"]}
      />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8" aria-label="Semua praktik">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const detail = SERVICE_DETAILS.find((d) => d.num === s.num);
            return (
              <Reveal key={s.num} delay={(i % 3) * 0.07} className="h-full">
                <a
                  href={`#/services/${s.num}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-[0_24px_60px_-24px_rgba(139,92,246,0.35)]"
                  aria-label={`Buka praktik ${s.title}`}
                >
                  <span
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute right-5 top-4 font-display text-4xl font-bold text-zinc-800/70 transition-colors duration-300 group-hover:text-violet-400/20"
                    aria-hidden="true"
                  >
                    {s.num}
                  </span>

                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/25 bg-gradient-to-br from-violet-400/15 to-indigo-600/10 text-violet-300 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <h2 className="font-display text-lg font-bold text-zinc-100">{s.title}</h2>
                  {s.enName ? (
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-600">
                      {s.enName}
                    </p>
                  ) : null}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{s.desc}</p>

                  {detail ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {detail.capabilities.slice(0, 3).map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-zinc-700/70 px-2.5 py-1 text-[11px] font-medium text-zinc-500 transition-colors group-hover:border-violet-400/30 group-hover:text-violet-200/80"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-300/90">
                    Lihat detail
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex flex-col items-center gap-5 rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-400/[0.06] to-transparent p-8 text-center sm:p-10">
            <p className="max-w-2xl font-display text-xl italic leading-relaxed text-zinc-200 sm:text-2xl">
              &ldquo;Saat firma lain menyerahkan tangan, kami meneruskan.&rdquo;
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <LinkButton to="/councils" variant="ghost">
                Lihat 46 Dewan di baliknya
              </LinkButton>
              <LinkButton to="/contact" withArrow>
                Tugaskan sebuah praktik
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}
