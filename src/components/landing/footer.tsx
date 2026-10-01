"use client";

import { ArrowRight, Instagram, Linkedin, Loader2, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { useState, type FormEvent } from "react";
import { COUNCIL_CATEGORIES, SERVICES } from "@/data/content";
import { PERIZINAN_CATEGORIES } from "@/data/perizinan";
import { BRAND } from "@/data/brand";
import { useToast } from "@/hooks/use-toast";
import { Link } from "@/lib/router";
import { LogoMark } from "./logo";

const FIRM_LINKS = [
  { to: "/about", label: "Tentang Perusahaan" },
  { to: "/method", label: "Metode Oracle" },
  { to: "/results", label: "Hasil & Bukti" },
  { to: "/insights", label: "Wawasan" },
  { to: "/careers", label: "Karier" },
  { to: "/contact", label: "Hubungi Kami" },
];

const LEGAL_LINKS = [
  { to: "/privacy", label: "Kebijakan Privasi" },
  { to: "/terms", label: "Syarat & Ketentuan" },
  { to: "/cookies", label: "Kebijakan Cookie" },
  { to: "/faq", label: "Pertanyaan Umum" },
];

const SOCIALS = [
  { label: "LinkedIn", Icon: Linkedin },
  { label: "Twitter / X", Icon: Twitter },
  { label: "YouTube", Icon: Youtube },
  { label: "Instagram", Icon: Instagram },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast({
        title: "Alamat email diperlukan",
        description: "Masukkan email yang valid — kearifan perlu tahu harus mendarat di mana.",
      });
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string; error?: string };
      if (!res.ok || !data.ok) {
        toast({ title: "Sinyal tertolak", description: data.error ?? "Coba lagi sebentar lagi." });
      } else {
        toast({ title: "Selamat bergabung di Dispatch", description: data.message });
        setEmail("");
      }
    } catch {
      toast({ title: "Sinyal hilang di udara", description: "Coba lagi sebentar lagi." });
    } finally {
      setSending(false);
    }
  }

  function onSocial(label: string) {
    toast({
      title: `${label} — segera diluncurkan`,
      description: "Kanal resmi kami segera dibuka. Berlangganan Dispatch di bawah untuk akses pertama.",
    });
  }

  return (
    <footer className="mt-auto border-t border-amber-400/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand + Dispatch + Kontak */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3" ariaLabel="PT TOP KONSULTAN INTERNASIONAL — beranda">
              <LogoMark className="h-10 w-10" />
              <span className="leading-none">
                <span className="block font-display text-sm font-bold tracking-[0.28em] text-zinc-50">
                  TOP KONSULTAN
                </span>
                <span className="mt-1 block text-[9px] font-semibold tracking-[0.5em] text-amber-400/90">
                  INTERNASIONAL
                </span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Konsultan &amp; perizinan terlengkap di dunia — 46 Dewan Pakar internasional dengan
              6.900 tahun pengalaman gabungan. Dari strategi hulu hingga eksekusi hilir, dari NIB
              hingga ekspansi 190 negara.
            </p>

            <address className="flex flex-col gap-2 text-sm not-italic text-zinc-500">
              <a
                href={`tel:${BRAND.phoneHref}`}
                className="flex items-center gap-2.5 transition-colors hover:text-amber-300"
                aria-label={`Telepon ${BRAND.phone}`}
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-amber-400/80" aria-hidden="true" />
                {BRAND.phone}
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-amber-300"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-amber-400/80" aria-hidden="true" />
                {BRAND.email}
              </a>
              <span className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/80" aria-hidden="true" />
                {BRAND.address}
              </span>
            </address>

            {/* Newsletter — the Oracle Dispatch */}
            <form onSubmit={onSubscribe} className="mt-1" aria-label="Berlangganan Oracle Dispatch">
              <label
                htmlFor="dispatch-email"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500"
              >
                Oracle Dispatch
              </label>
              <div className="flex overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 transition-colors focus-within:border-amber-400/50">
                <input
                  id="dispatch-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  autoComplete="email"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-11 w-12 shrink-0 items-center justify-center bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-60"
                  aria-label="Berlangganan Oracle Dispatch"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">
                Satu kirim per bulan. Nol derau. Tanpa pelacak — lihat{" "}
                <Link to="/cookies" className="text-zinc-500 underline decoration-amber-400/40 underline-offset-2 hover:text-amber-300">
                  Kebijakan Cookie
                </Link>
                .
              </p>
            </form>

            <div className="flex gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => onSocial(label)}
                  aria-label={`${label} — segera hadir`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:text-amber-300"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Perusahaan */}
          <nav aria-label="Perusahaan">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Perusahaan
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FIRM_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-zinc-400 transition-colors hover:text-amber-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Perizinan */}
          <nav aria-label="Perizinan">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Perizinan
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PERIZINAN_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/perizinan?kategori=${c.id}`}
                    className="text-zinc-400 transition-colors hover:text-amber-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/perizinan" className="font-semibold text-amber-300/90 transition-colors hover:text-amber-200">
                  Lihat semua 36 izin →
                </Link>
              </li>
            </ul>
          </nav>

          {/* Layanan + Dewan + Hukum */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-1">
            <nav aria-label="Layanan">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Layanan
              </h3>
              <ul className="space-y-2.5 text-sm">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.num}>
                    <Link
                      to={`/services/${s.num}`}
                      className="text-zinc-400 transition-colors hover:text-amber-300"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/services" className="font-semibold text-amber-300/90 transition-colors hover:text-amber-200">
                    Lihat 12 layanan utama →
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex flex-col gap-8">
              <nav aria-label="Dewan Pakar">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Dewan Pakar
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {COUNCIL_CATEGORIES.slice(0, 4).map((c) => (
                    <li key={c}>
                      <Link
                        to={`/councils?filter=${encodeURIComponent(c)}`}
                        className="text-zinc-400 transition-colors hover:text-amber-300"
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/councils" className="font-semibold text-amber-300/90 transition-colors hover:text-amber-200">
                      Hadapi 46 Dewan →
                    </Link>
                  </li>
                </ul>
              </nav>

              <nav aria-label="Hukum">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                  Hukum
                </h3>
                <ul className="space-y-2.5 text-sm">
                  {LEGAL_LINKS.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-zinc-400 transition-colors hover:text-amber-300">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900">
        <div
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-600 sm:flex-row sm:px-6 lg:px-8"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <p>© {year} {BRAND.legal}. Seluruh masa depan dilindungi.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            Semua 46 Dewan Pakar sedang online — respons ≤ 48 jam
          </p>
        </div>
      </div>
    </footer>
  );
}
