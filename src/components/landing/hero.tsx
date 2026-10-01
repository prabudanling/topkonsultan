"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Gauge, Hourglass, Sparkles, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EASE, SplitWords } from "./motion";

const SOLVING = [
  "NIB & OSS RBA.",
  "Pendirian PT & PMA.",
  "Izin BPOM & Halal.",
  "SNI & KITAS.",
  "Strategi & Ekspansi Global.",
];

const HERO_CHIPS = [
  { Icon: Users, label: "46 Dewan Pakar" },
  { Icon: Hourglass, label: "6.900 Tahun Pengalaman" },
  { Icon: Gauge, label: "99,97% Keberhasilan" },
  { Icon: Clock, label: "Respons ≤ 48 Jam" },
];

/* ------------------------------- Typewriter ------------------------------- */

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let w = 0;
    let c = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const word = words[w];
      if (!deleting) {
        c++;
        setText(word.slice(0, c));
        if (c === word.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 62);
      } else {
        c--;
        setText(word.slice(0, c));
        if (c === 0) {
          deleting = false;
          w = (w + 1) % words.length;
          timer = window.setTimeout(tick, 420);
          return;
        }
        timer = window.setTimeout(tick, 26);
      }
    };

    timer = window.setTimeout(tick, 1400);
    return () => window.clearTimeout(timer);
  }, [words]);

  return text;
}

/* -------------------------------- Mandala --------------------------------- */

const MANDALA_RINGS = [
  { r: 58, n: 6, dot: 5, o: 0.95 },
  { r: 98, n: 12, dot: 4, o: 0.7 },
  { r: 138, n: 18, dot: 3.4, o: 0.5 },
  { r: 176, n: 10, dot: 3, o: 0.35 },
];

function Mandala() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="core-gold" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>

      {MANDALA_RINGS.map((ring) => (
        <circle
          key={`guide-${ring.r}`}
          cx="200"
          cy="200"
          r={ring.r}
          fill="none"
          stroke="rgba(251,191,36,0.14)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
      ))}

      {MANDALA_RINGS.map((ring, ri) => (
        <g
          key={`dots-${ring.r}`}
          className={
            ri % 2 === 0
              ? "animate-[spin360_64s_linear_infinite]"
              : "animate-[spin-reverse360_78s_linear_infinite]"
          }
          style={{ transformOrigin: "200px 200px" }}
        >
          {Array.from({ length: ring.n }).map((_, i) => {
            const a = (i / ring.n) * Math.PI * 2;
            // Deterministic rounding prevents SSR/client float precision mismatch
            const cx = Number((200 + ring.r * Math.cos(a)).toFixed(2));
            const cy = Number((200 + ring.r * Math.sin(a)).toFixed(2));
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={ring.dot}
                fill="#fbbf24"
                opacity={ring.o}
              />
            );
          })}
        </g>
      ))}

      <circle
        cx="200"
        cy="200"
        r="34"
        fill="none"
        stroke="#fbbf24"
        strokeWidth="1"
        opacity="0.5"
        className="animate-[ping-slow_3.2s_ease-out_infinite]"
        style={{ transformOrigin: "200px 200px" }}
      />
      <circle cx="200" cy="200" r="26" fill="url(#core-gold)" opacity="0.95" />
      <path
        d="M200 185 L203.8 194.8 L214.3 195.4 L206.1 202 L208.8 212.1 L200 206.4 L191.2 212.1 L193.9 202 L185.7 195.4 L196.2 194.8 Z"
        fill="#07070a"
        opacity="0.85"
      />
    </svg>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const typed = useTypewriter(SOLVING);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yDrift = useTransform(scrollYProgress, [0, 1], [0, 170]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="noise-overlay relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-24 pt-28"
      aria-label="PT TOP Konsultan Internasional — konsultan dan perizinan terlengkap di dunia"
    >
      {/* Grid backdrop */}
      <div
        className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_72%_62%_at_50%_42%,black_28%,transparent_78%)]"
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <motion.div style={{ y: yDrift }} className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-[6%] top-[16%] h-72 w-72 animate-float rounded-full bg-amber-500/15 blur-[110px]" />
        <div className="absolute right-[4%] top-[28%] h-80 w-80 animate-float-slow rounded-full bg-amber-600/10 blur-[120px]" />
        <div className="absolute bottom-[6%] left-[36%] h-64 w-64 animate-float rounded-full bg-yellow-200/10 blur-[100px]" />
      </motion.div>

      {/* 46-node Mandala */}
      <motion.div
        style={{ y: yDrift }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(92vw,640px)] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 0.24, scale: 1 }}
          transition={{ duration: 1.7, delay: 1.45, ease: EASE }}
        >
          <Mandala />
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: yContent, opacity: fade }}
        className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.45, ease: EASE }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-amber-400/[0.07] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            EST. 2001 — JAKARTA · MELAYANI 190 NEGARA
          </span>
        </motion.div>

        <h1 className="mt-7 font-display text-[11.5vw] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          <SplitWords text="Satu Gerbang untuk" delay={1.55} className="block text-zinc-100" />
          <SplitWords text="Segala Izin dan" delay={1.78} className="block text-zinc-100" />
          <SplitWords text="Kejayaan Bisnis Anda" delay={2.01} allGold className="block" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 2.35, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Konsultan &amp; perizinan terlengkap di dunia — 46 Dewan Pakar internasional
          dengan 6.900 tahun pengalaman gabungan menuntaskan semua kebutuhan bisnis
          Anda,{" "}
          <span className="font-semibold text-zinc-200">
            dari pendirian PT hingga penguasaan pasar di 190 negara.
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.55, ease: EASE }}
          className="mt-4 text-sm tracking-wide text-zinc-500"
          aria-live="off"
        >
          Sedang menuntaskan:{" "}
          <span className="font-semibold text-amber-300">{typed}</span>
          <span className="animate-blink font-semibold text-amber-300" aria-hidden="true">
            ▍
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 2.7, ease: EASE }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#/contact"
            className="shine inline-flex min-h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 px-8 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_12px_44px_-10px_rgba(245,158,11,0.8)] transition-transform duration-300 hover:scale-[1.04] active:scale-95"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Mulai Konsultasi
          </a>
          <a
            href="#/perizinan"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-900/40 px-8 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur transition-all duration-300 hover:border-amber-400/50 hover:text-amber-300"
          >
            Jelajahi 36 Izin
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 2.88, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {HERO_CHIPS.map(({ Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-900/50 px-4 py-2 text-xs font-medium text-zinc-400 backdrop-blur"
            >
              <Icon className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
              {label}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.3 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <a
          href="#benchmarks"
          aria-label="Gulir ke bawah untuk melihat konten"
          className="flex flex-col items-center gap-2 text-zinc-500 transition-colors hover:text-amber-300"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em]">Gulir</span>
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-current" aria-hidden="true" />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
