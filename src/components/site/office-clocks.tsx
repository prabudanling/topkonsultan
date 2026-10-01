"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { OFFICES } from "@/data/offices";
import { Reveal, SectionHeading } from "@/components/landing/motion";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    let intervalId: number | undefined;
    // Defer the first tick so the effect body stays free of synchronous setState
    const raf = requestAnimationFrame(() => {
      setNow(new Date());
      intervalId = window.setInterval(() => setNow(new Date()), 30_000);
    });
    return () => {
      cancelAnimationFrame(raf);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);
  return now;
}

function formatTime(now: Date | null, timeZone: string) {
  if (!now) return "--:--";
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
      hour12: false,
    }).format(now);
  } catch {
    return "--:--";
  }
}

export default function OfficeClocks() {
  const now = useNow();

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8" aria-label="Kantor global">
      <SectionHeading
        eyebrow="10 Kursi Piagam TOP"
        title={
          <>
            Matahari tak pernah terbenam di atas{" "}
            <span className="text-gradient-gold">ruang dewan.</span>
          </>
        }
        sub="Sepuluh hub, satu instrumen. Masuki kursi Piagam mana pun — doktrin yang sama menyambut Anda, dalam bahasa setempat, pada jam setempat."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {OFFICES.map((o, i) => {
          const local = formatTime(now, o.timezone);
          return (
            <Reveal key={o.city} delay={(i % 5) * 0.06} className="h-full">
              <article
                className={`group relative flex h-full flex-col gap-3 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                  o.flagship
                    ? "border-amber-400/40 bg-gradient-to-br from-amber-400/[0.09] to-transparent"
                    : "border-zinc-800/80 bg-zinc-900/40 hover:border-amber-400/30"
                }`}
              >
                {o.flagship ? (
                  <span className="absolute right-4 top-4 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-amber-300">
                    Markas Global
                  </span>
                ) : null}
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-400/70">
                  {o.country}
                </p>
                <h3 className="font-display text-lg font-bold text-zinc-100">{o.city}</h3>
                <p className="flex items-center gap-1.5 text-[12px] leading-relaxed text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-400/60" aria-hidden="true" />
                  {o.address}
                </p>
                <p className="mt-auto flex items-baseline gap-2 pt-2">
                  <span className="font-display text-2xl font-bold tabular-nums text-gradient-gold">
                    {local}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
                    waktu setempat
                  </span>
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
