"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./logo";
import { EASE } from "./motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const DURATION = 1250;
    const id = window.setInterval(() => {
      const p = Math.min(100, Math.round(((performance.now() - start) / DURATION) * 100));
      setProgress(p);
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setDone(true), 320);
      }
    }, 40);
    return () => window.clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-[#07070a]"
          exit={{
            y: "-100%",
            borderBottomLeftRadius: "50% 10%",
            borderBottomRightRadius: "50% 10%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <LogoMark className="h-20 w-20 drop-shadow-[0_0_30px_rgba(139,92,246,0.45)]" />
          </motion.div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
              className="font-display text-lg font-bold tracking-[0.4em] text-zinc-100"
            >
              TOP KONSULTAN
            </motion.p>
          </div>

          <div className="flex w-60 flex-col items-center gap-3">
            <div className="h-px w-full overflow-hidden bg-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-violet-300 via-indigo-400 to-indigo-600 transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-semibold tracking-[0.35em] text-violet-300/90">
              {progress}%
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-[0.42em] text-zinc-600">
            Menghadirkan 46 Dewan Pakar
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
