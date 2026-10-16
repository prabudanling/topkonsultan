"use client";

/**
 * TOP Hash Router v2 — hash-first, pathname-aware, SSR-safe.
 * ----------------------------------------------------------------------------
 * - Sumber rute utama tetap hash ("#/perizinan") — kompatibel hosting statis
 *   tanpa rewrite (shared hosting friendly).
 * - Bila hash kosong (atau hanya jangkar dalam-halaman biasa), rute dibaca
 *   dari PATHNAME URL nyata — hasil rute catch-all app/[[...slug]] yang
 *   memberi setiap tampilan URL per-SEO-nya sendiri.
 * - <RouteProvider initialPath> menerima jalur awal dari server sehingga
 *   tampilan pertama ter-render benar sejak HTML (SSR/prarender) dan tetap
 *   aman terhadap hidrasi React (useSyncExternalStore resync otomatis).
 * - Navigasi programatik tetap berbasis hash → refresh di mana pun selalu aman.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface RouteInfo {
  /** Normalized path, always starts with "/", no query. "/" for home & anchors. */
  path: string;
  /** Path segments, e.g. "/councils/quantum-strategy" → ["councils", "quantum-strategy"] */
  segments: string[];
  /** Parsed query params from the hash (atau search URL nyata) */
  query: URLSearchParams;
  /** Full raw target (path + query) or null when the hash is a bare anchor */
  target: string | null;
}

function readHash(): string {
  if (typeof window === "undefined") return "";
  return window.location.hash.replace(/^#/, "");
}

/**
 * Sumber rute klien: hash jika berupa rute ("/..."); jika tidak, gunakan
 * pathname URL nyata (+ search, mis. "?lang=ja" untuk hreflang).
 */
function readLocation(): string {
  if (typeof window === "undefined") return "";
  const hash = readHash();
  if (hash.startsWith("/")) return hash;
  let path = window.location.pathname;
  path = path
    .replace(/\/index\.html$/i, "")
    .replace(/\.html$/i, "")
    .replace(/\/+$/, "");
  if (path === "" || path === ".") {
    return window.location.search ? `/${window.location.search}` : "/";
  }
  return `${path}${window.location.search}`;
}

export function parseHash(raw: string): RouteInfo {
  const empty: URLSearchParams = new URLSearchParams();
  if (!raw) return { path: "/", segments: [], query: empty, target: null };
  if (!raw.startsWith("/")) return { path: "/", segments: [], query: empty, target: null };
  const [pathPart, queryPart] = raw.split("?");
  const segments = pathPart.split("/").filter(Boolean).map(decodeURIComponent);
  return {
    path: pathPart,
    segments,
    query: queryPart ? new URLSearchParams(queryPart) : empty,
    target: raw,
  };
}

/** Reactive route state driven by hashchange & popstate (hydration-safe) */
function subscribeRoute(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}
const getRouteSnapshot = () => (typeof window === "undefined" ? "" : readLocation());
const getServerRouteSnapshot = () => "";

/* ------------------------ Provider rute (SSR-aware) ------------------------ */

const RouteContext = createContext<RouteInfo | null>(null);

const EMPTY_QUERY = new URLSearchParams();
const FALLBACK_ROUTE: RouteInfo = {
  path: "/",
  segments: [],
  query: EMPTY_QUERY,
  target: null,
};

/**
 * Membungkus aplikasi dengan state rute. `initialPath` datang dari server
 * (app/[[...slug]]/page.tsx) sehingga HTML pertama sudah memuat tampilan
 * yang benar — bukan sekadar kerangka beranda.
 */
export function RouteProvider({
  initialPath = "/",
  children,
}: {
  initialPath?: string;
  children: ReactNode;
}) {
  const getServerSnapshot = useCallback(() => initialPath, [initialPath]);
  const raw = useSyncExternalStore(subscribeRoute, getRouteSnapshot, getServerSnapshot);
  const route = useMemo(() => parseHash(raw), [raw]);
  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}

/** State rute reaktif — selalu dipakai di dalam <RouteProvider>. */
export function useRoute(): RouteInfo {
  const ctx = useContext(RouteContext);
  return ctx ?? FALLBACK_ROUTE;
}

/** Programmatic navigation — tetap berbasis hash agar refresh aman di mana pun. */
export function navigate(to: string) {
  const target = to.startsWith("/") ? to : `/${to}`;
  if (readHash() === target) return;
  window.location.hash = target;
}

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
  onClick?: () => void;
}

/**
 * Universal link. Internal routes render "#/…"; http/mailto/tel pass through
 * (with target=_blank for external web links). Every link is a real <a> —
 * middle-click, right-click and long-press all behave natively.
 */
export function Link({ to, children, className, ariaLabel, title, onClick }: LinkProps) {
  const isHttp = to.startsWith("http://") || to.startsWith("https://");
  if (isHttp) {
    return (
      <a
        href={to}
        className={className}
        aria-label={ariaLabel}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  const href = to.startsWith("/") ? `#${to}` : to;
  return (
    <a href={href} className={className} aria-label={ariaLabel} title={title} onClick={onClick}>
      {children}
    </a>
  );
}

/** Smooth-scrolls to top on route change (call once in the app shell) */
export function useScrollTopOnRoute(path: string) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);
}

/** Sets the document title per route (dipakai bila luar seo-head) */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/** Returns a memoized callback that keeps focus accessible after route change */
export function useFocusMain() {
  return useCallback(() => {
    requestAnimationFrame(() => {
      const main = document.getElementById("main");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
      }
    });
  }, []);
}
