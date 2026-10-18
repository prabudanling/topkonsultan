"use client";

/**
 * Provider i18n ringan untuk situs TOP Konsultan.
 * - Bahasa default: id (Bahasa Indonesia).
 * - Pilihan pengunjung disimpan di localStorage (topkonsultan_lang).
 * - State bahasa dibaca lewat useSyncExternalStore: aman untuk SSR/hidrasi
 *   dan bebas setState-sinkron-di-dalam-effect.
 * - Atribut <html lang> diperbarui mengikuti bahasa terpilih (aksesibilitas & SEO).
 * - Fallback per kunci: teks bahasa terpilih → Bahasa Indonesia.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { TRANSLATIONS, type TranslationKey } from "@/data/translations";
import { getLanguage } from "@/data/languages";

const STORAGE_KEY = "topkonsultan_lang";
export const DEFAULT_LANG = "id";

/* ------------------------- Store eksternal sederhana ------------------------ */

const listeners = new Set<() => void>();
let cachedLang: string | null = null;

function readStoredLang(): string {
  if (cachedLang !== null) return cachedLang;
  try {
    /* Prioritas: parameter URL ?lang=xx ( landing hreflang / tautan bahasa )
       → localStorage → default. Parameter URL juga dipersist agar navigasi
       antar-halaman mempertahankan bahasa. */
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const raw = urlLang ?? stored;
    cachedLang = normalize(raw);
    if (urlLang) {
      try {
        window.localStorage.setItem(STORAGE_KEY, cachedLang);
      } catch {
        /* abaikan kegagalan penyimpanan */
      }
    }
  } catch {
    cachedLang = DEFAULT_LANG;
  }
  return cachedLang;
}

function serverLang(): string {
  return DEFAULT_LANG;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(): void {
  listeners.forEach((l) => l());
}

function normalize(code: string | null): string {
  if (!code) return DEFAULT_LANG;
  const trimmed = code.trim();
  return getLanguage(trimmed) ? trimmed : DEFAULT_LANG;
}

/* ---------------------------------- Konteks --------------------------------- */

interface I18nContextValue {
  /** Kode bahasa terpilih (BCP-47, mis. "id", "ja", "zh-CN"). */
  lang: string;
  /** Nama asli bahasa terpilih (mis. "日本語"); "Bahasa Indonesia" untuk default. */
  langNative: string;
  /** Ganti bahasa + simpan ke localStorage. */
  setLang: (code: string) => void;
  /** Ambil teks terjemahan; jatuh ke Bahasa Indonesia bila kunci tak ada. */
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, serverLang);

  // Sinkronkan atribut <html lang> kapan pun bahasa berubah.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code: string) => {
    const next = normalize(code);
    cachedLang = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* abaikan kegagalan penyimpanan */
    }
    notify();
  }, []);

  const t = useCallback(
    (key: TranslationKey): string =>
      TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS[DEFAULT_LANG][key] ?? key,
    [lang]
  );

  const langNative = getLanguage(lang)?.native ?? "Bahasa Indonesia";

  return (
    <I18nContext.Provider value={{ lang, langNative, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n harus dipakai di dalam <LanguageProvider>");
  }
  return ctx;
}
