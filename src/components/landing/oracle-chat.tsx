"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ORACLE_PROMPTS } from "@/data/content";
import { LogoMark } from "./logo";
import { EASE } from "./motion";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Selamat datang. Saya Oracle — suara tersatukan 46 Dewan Pakar. Tanyakan apa pun: bisnis, perizinan, strategi.",
};

export default function OracleChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content }];
    setMsgs(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = (await res.json()) as { ok: boolean; reply?: string };
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            data.reply ??
            "Dewan sedang berdeliberasi. Coba rumuskan dengan cara lain — atau tanyakan kembali.",
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Sinyal terputus. Coba sekali lagi." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void send();
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-5 right-4 z-[85] sm:right-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup Oracle" : "Buka Oracle"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-600 text-zinc-950 shadow-[0_10px_40px_-8px_rgba(245,158,11,0.85)] transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {!open && (
            <span
              className="absolute inset-0 animate-ping-slow rounded-full bg-amber-400/50"
              aria-hidden="true"
            />
          )}
          {open ? (
            <X className="relative h-6 w-6" aria-hidden="true" />
          ) : (
            <Sparkles className="relative h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="oracle-panel"
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.96 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass fixed bottom-24 right-4 z-[86] flex h-[min(600px,72svh)] w-[min(92vw,400px)] flex-col overflow-hidden rounded-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] sm:right-6"
            role="dialog"
            aria-label="Konsultasi dengan Oracle"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-amber-400/20 bg-gradient-to-r from-amber-400/15 to-transparent p-4">
              <LogoMark className="h-8 w-8" />
              <div className="flex-1">
                <p className="font-display text-sm font-bold tracking-[0.22em] text-zinc-50">
                  ORACLE
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
                  Kecerdasan 46 Dewan Pakar
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup"
                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-4"
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto rounded-tr-sm bg-amber-400 font-medium text-zinc-950"
                      : "mr-auto rounded-tl-sm bg-zinc-800/90 text-zinc-200"
                  }`}
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-zinc-800/90 px-4 py-3">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-amber-300"
                      style={{ animationDelay: `${d * 0.18}s` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              )}

              {msgs.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {ORACLE_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => void send(p)}
                      className="rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1.5 text-left text-[11px] font-medium text-amber-200/90 transition-colors hover:bg-amber-400/15"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-zinc-800 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan apa saja — izin, strategi, pajak…"
                aria-label="Pertanyaan Anda untuk Oracle"
                className="h-11 flex-1 rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Kirim"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-950 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
