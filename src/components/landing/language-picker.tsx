"use client";

/**
 * Pemilih bahasa — 195 bahasa dunia.
 * Tombol pill (ikon bola dunia + kode bahasa) di navbar; membuka dialog
 * pencarian dengan bagian Populer + seluruh daftar bahasa. Nama bahasa
 * ditampilkan dalam aksara aslinya supaya mudah dikenali penutur asli.
 */

import { useEffect, useState } from "react";
import { Check, Globe, Languages, Sparkles } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { LANGUAGE_COUNT, POPULAR_LANGUAGES, LANGUAGES, type LanguageEntry } from "@/data/languages";
import { TRANSLATED_LANGS } from "@/data/translations";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Kode tampilan ringkas untuk pill navbar (mis. "zh-CN" → "ZH"). */
function shortCode(code: string): string {
  return code.split("-")[0]!.toUpperCase();
}

/* Catatan hidrasi: judul & deskripsi dialog (sr-only) memakai id Radix ber-
   basis useId() yang bergantung posisi tree render. Pada hidrasi streaming
   dev-mode Next 16 (lazy chunk + resync useSyncExternalStore rute/bahasa),
   posisi tersebut bisa berbeda SSR vs klien → React 19 melaporkan
   "attributes didn't match" untuk id radix-… pada <DialogTitle>.
   Solusi: render dialog hanya setelah mount — elemen id-tak-stabil tidak
   pernah masuk HTML server, jadi tidak ada perbandingan hidrasi untuknya;
   id klien konsisten dengan aria-labelledby saat dialog dibuka. */

function LangRow({ lang, active }: { lang: LanguageEntry; active: boolean }) {
  const hasUI = TRANSLATED_LANGS.has(lang.code);
  return (
    <>
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          active ? "font-bold text-violet-700" : "font-medium text-slate-700"
        )}
      >
        {lang.native}
      </span>
      <span className="hidden shrink-0 text-[11px] text-slate-400 sm:inline">
        {lang.id}
      </span>
      {hasUI ? (
        <span
          className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-violet-600"
          title="Antarmuka tersedia dalam bahasa ini"
        >
          UI
        </span>
      ) : (
        <span
          className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-400"
          title="Oracle AI menjawab dalam bahasa ini"
        >
          AI
        </span>
      )}
      {active ? (
        <Check className="h-4 w-4 shrink-0 text-violet-600" aria-hidden="true" />
      ) : null}
    </>
  );
}

export default function LanguagePicker({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { lang, langNative, setLang, t } = useI18n();

  useEffect(() => setMounted(true), []);

  const popular = POPULAR_LANGUAGES;
  const popularCodes = new Set(popular.map((p) => p.code));
  const rest = LANGUAGES.filter((l) => !popularCodes.has(l.code));

  const choose = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${t("pick.title")} — ${langNative}`}
        title={`${t("pick.title")} — ${langNative}`}
        className={cn(
          "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 text-[12px] font-bold uppercase tracking-wider text-slate-600 transition-colors hover:border-violet-500/60 hover:text-violet-600",
          className
        )}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        {shortCode(lang)}
      </button>

      {mounted && (
        <CommandDialog
          open={open}
          onOpenChange={setOpen}
          title={t("pick.title")}
          description={`${LANGUAGE_COUNT} ${t("pick.all").toLowerCase()}`}
          className="sm:max-w-[520px]"
        >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-white">
              <Languages className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900">{t("pick.title")}</p>
              <p className="text-[11px] text-slate-500">
                {t("pick.current")}: <span className="font-semibold text-violet-600">{langNative}</span>
              </p>
            </div>
          </div>
          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-600">
            {LANGUAGE_COUNT} {t("pick.all").toLowerCase()}
          </span>
        </div>

        <CommandInput placeholder={t("pick.search")} />

        <CommandList className="max-h-[min(56vh,380px)]">
          <CommandEmpty>
            <span className="text-sm text-slate-400">—</span>
          </CommandEmpty>

          <CommandGroup heading={t("pick.popular")}>
            {popular.map((l) => (
              <CommandItem
                key={l.code}
                value={`${l.native} ${l.id} ${l.en} ${l.code}`}
                onSelect={() => choose(l.code)}
                className="gap-3"
              >
                <LangRow lang={l} active={l.code === lang} />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading={t("pick.all")}>
            {rest.map((l) => (
              <CommandItem
                key={l.code}
                value={`${l.native} ${l.id} ${l.en} ${l.code} ${l.region}`}
                onSelect={() => choose(l.code)}
                className="gap-3"
              >
                <LangRow lang={l} active={l.code === lang} />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>

        <div className="flex items-center gap-2 border-t px-4 py-3 text-[11px] text-slate-400">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-500" aria-hidden="true" />
          <span className="leading-snug">{t("pick.note")}</span>
          <span className="ml-auto hidden shrink-0 gap-1 sm:flex" aria-hidden="true">
            <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[9px] font-bold text-violet-600">UI</span>
            <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">AI</span>
          </span>
        </div>
        </CommandDialog>
      )}
    </>
  );
}
