"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { BUDGETS, GUARANTEES } from "@/data/content";
import { BRAND } from "@/data/brand";
import { EASE, Reveal, SectionHeading } from "./motion";

const CONTACT_ROWS = [
  {
    Icon: MessageCircle,
    label: "WhatsApp bisnis resmi — 24/7",
    value: BRAND.whatsapp,
    href: BRAND.whatsappHref,
  },
  { Icon: Mail, label: "Email resmi", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { Icon: Phone, label: "Telepon langsung", value: BRAND.phone, href: `tel:${BRAND.phoneHref}` },
  { Icon: MapPin, label: "Kantor pusat — Tasikmalaya I", value: BRAND.address },
];

const inputCls =
  "w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all duration-300 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20";

const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500";

export default function Contact({
  initialRole = null,
}: {
  initialRole?: string | null;
} = {}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [engagementId, setEngagementId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"),
          budget: fd.get("budget"),
          challenge: fd.get("challenge"),
          role: initialRole ?? "",
          type: initialRole ? "career" : "general",
        }),
      });
      const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Brief Anda gagal terkirim. Coba lagi.");
        setStatus("error");
        return;
      }
      setEngagementId(data.id ?? "TOP-0000");
      setStatus("sent");
      form.reset();
    } catch {
      setErrorMsg("Sinyal terputus di tengah jalan. Coba lagi.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden border-t border-zinc-900/70 py-24 sm:py-28"
      aria-label="Konsultasikan dengan Dewan"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-500/[0.07] blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Mulai Penugasan"
          title={
            <>
              Konsultasikan dengan{" "}
              <span className="text-gradient-gold">46 Dewan Pakar.</span>
            </>
          }
          sub="Sampaikan brief Anda. Wawasan pertama hadir dalam ≤ 48 jam — jawaban lengkap, saat terbukti layak."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* Left: info & guarantees */}
          <Reveal className="h-full">
            <div className="glass flex h-full flex-col gap-7 rounded-3xl p-7 sm:p-8">
              <ul className="space-y-5">
                {CONTACT_ROWS.map(({ Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/25 bg-gradient-to-br from-violet-400/15 to-indigo-600/10 text-violet-300">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                          {label}
                        </span>
                        <span className="block text-sm font-semibold text-zinc-100">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label} className="flex items-center gap-4">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="flex w-full items-center gap-4 transition-opacity hover:opacity-85"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" aria-hidden="true" />

              {/* Jaringan kantor resmi */}
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Jaringan kantor resmi
                </p>
                <ul className="space-y-2.5">
                  {BRAND.addresses.map((a) => (
                    <li key={a.label} className="flex items-start gap-2.5 text-[13px]">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400/70" aria-hidden="true" />
                      <span>
                        <span className="font-semibold text-zinc-200">{a.label}</span>
                        <span className="block text-[12px] leading-relaxed text-zinc-500">{a.value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-violet-400/25 to-transparent" aria-hidden="true" />

              <ul className="space-y-5">
                {GUARANTEES.map((g) => (
                  <li key={g.title} className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-violet-400/25 bg-violet-400/10 text-violet-300">
                      <g.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                      <span>
                        <span className="block text-sm font-bold text-zinc-100">{g.title}</span>
                        <span className="block text-[13px] text-zinc-500">{g.desc}</span>
                      </span>
                    </li>
                ))}
              </ul>

              <blockquote className="mt-auto border-l-2 border-violet-400/50 pl-4 font-display text-base italic text-violet-100/90">
                &ldquo;Mustahil&rdquo; adalah brief favorit kami.
              </blockquote>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.12} className="h-full">
            <div className="glass h-full rounded-3xl p-7 sm:p-8">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="flex h-full min-h-[420px] flex-col items-center justify-center gap-5 text-center"
                  role="status"
                >
                  <span className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inset-0 animate-ping-slow rounded-full bg-violet-400/30" />
                    <CheckCircle2 className="h-16 w-16 text-violet-400" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-bold text-zinc-50">
                    Brief diterima.
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                    46 Dewan Pakar telah menghadir — wawasan pertama datang
                    dalam ≤ 48 jam. ID penugasan Anda{" "}
                    <span className="font-bold text-violet-300">#{engagementId}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-2 inline-flex min-h-11 items-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-violet-400/50 hover:text-violet-300"
                  >
                    Kirim brief baru
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate={false}>
                  {initialRole ? (
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-400/10 px-4 py-2 text-[12px] font-semibold text-violet-200" role="status">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Mandat lamaran: {initialRole}
                    </p>
                  ) : null}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelCls}>
                        Nama Lengkap *
                      </label>
                      <input id="name" name="name" required minLength={2} placeholder="A. Visioner" className={inputCls} autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelCls}>
                        Email Kantor *
                      </label>
                      <input id="email" name="email" type="email" required placeholder="nama@perusahaan.co.id" className={inputCls} autoComplete="email" />
                    </div>
                    <div>
                      <label htmlFor="company" className={labelCls}>
                        Perusahaan (opsional)
                      </label>
                      <input id="company" name="company" placeholder="PT Cakrawala Nusantara" className={inputCls} autoComplete="organization" />
                    </div>
                    <div>
                      <label htmlFor="budget" className={labelCls}>
                        Anggaran
                      </label>
                      <select id="budget" name="budget" className={`${inputCls} appearance-none`} defaultValue={BUDGETS[2]}>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-zinc-950">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="challenge" className={labelCls}>
                        Jelaskan Tantangan/kebutuhan Anda *
                      </label>
                      <textarea
                        id="challenge"
                        name="challenge"
                        required
                        minLength={10}
                        rows={5}
                        placeholder="Ceritakan tantangan Anda — semakin mustahil, semakin baik."
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="shine mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-500 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_12px_44px_-10px_rgba(139,92,246,0.7)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Dewan sedang berdeliberasi…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Kirim Brief ke Dewan
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-center text-[11px] text-zinc-600">
                    Kerahasiaan mutlak terjamin. Brief Anda tidak pernah keluar dari firma.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
