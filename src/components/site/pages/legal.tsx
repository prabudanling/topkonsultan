"use client";

import { CalendarDays, Scale } from "lucide-react";
import { LEGAL_DOCS } from "@/data/legal";
import { BRAND } from "@/data/brand";
import { Reveal } from "@/components/landing/motion";
import { CTABand, LinkButton, PageHero } from "@/components/site/ui";

export default function LegalPage({ docId }: { docId: "privacy" | "terms" | "cookies" }) {
  const doc = LEGAL_DOCS.find((d) => d.id === docId);

  if (!doc) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center px-4 pt-24 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-zinc-100">Dokumen tidak ditemukan.</h1>
          <div className="mt-6 flex justify-center">
            <LinkButton to="/" withArrow>
              Kembali ke Beranda
            </LinkButton>
          </div>
        </div>
      </section>
    );
  }

  const siblings = LEGAL_DOCS.filter((d) => d.id !== docId);

  return (
    <>
      <PageHero
        eyebrow="Doktrin firma"
        title={
          <>
            {doc.title.split(" ")[0]}{" "}
            <span className="text-gradient-gold">{doc.title.split(" ").slice(1).join(" ")}</span>
          </>
        }
        sub={doc.intro}
        crumbs={[{ label: "Beranda", to: "/" }, { label: doc.title }]}
        meta={[`Diperbarui ${doc.updated}`, "Bahasa yang lugas", `Mengikat sejak ${BRAND.founded}`]}
      />

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6" aria-label={doc.title}>
        <Reveal>
          <p className="mb-10 flex items-center gap-2 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 px-5 py-3.5 text-[13px] text-zinc-400">
            <CalendarDays className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
            Version {doc.updated} — menggugurkan seluruh ketentuan sebelumnya.
          </p>
        </Reveal>

        <div className="space-y-5">
          {doc.sections.map((section, i) => (
            <Reveal key={section.heading} delay={Math.min(i * 0.05, 0.3)}>
              <article className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-colors duration-300 hover:border-amber-400/30 sm:p-7">
                <h2 className="flex items-center gap-3 font-display text-lg font-bold text-zinc-100">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-400/40 text-[12px] font-bold text-amber-300">
                    {i + 1}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-3 pl-0 sm:pl-10">
                  {section.text.map((para, j) => (
                    <p key={j} className="text-[15px] leading-relaxed text-zinc-400">
                      {para}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Siblings + contact */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {siblings.map((s) => (
              <a
                key={s.id}
                href={`#/${s.id}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-amber-400/40"
              >
                <span>
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Doktrin lainnya
                  </span>
                  <span className="mt-1 block font-display text-base font-bold text-zinc-100">
                    {s.title}
                  </span>
                </span>
                <Scale className="h-5 w-5 shrink-0 text-zinc-600 transition-colors group-hover:text-amber-400" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-amber-400/15 bg-gradient-to-br from-amber-400/[0.06] to-transparent p-8 text-center">
            <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
              Ada pertanyaan tentang doktrin ini? Dewan Audit Forensik menjawab
              dalam bahasa yang lugas — tulis ke{" "}
              <a
                href={`mailto:${BRAND.email}`}
                className="font-semibold text-amber-300 underline decoration-amber-400/40 underline-offset-4 hover:text-amber-200"
              >
                {BRAND.email}
              </a>
            </p>
            <LinkButton to="/faq" variant="ghost">
              Baca Pertanyaan Umum kami
            </LinkButton>
          </div>
        </Reveal>
      </section>

      <CTABand />
    </>
  );
}
