// Client language state: Indonesian by default, ?lang= wins on load, no storage.
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import type { Copy } from "../content/en";
import { copyFor, DEFAULT_LANGUAGE, metaFor, parseLang, type Language } from "../lib/i18n";

interface LanguageValue {
  lang: Language;
  copy: Copy;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const fromUrl = parseLang(window.location.search);
    if (fromUrl === null) return;
    const timer = window.setTimeout(() => setLangState(fromUrl), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const value = useMemo(() => ({ lang, copy: copyFor(lang), setLang }), [lang, setLang]);

  useEffect(() => {
    const meta = metaFor(value.copy, pathname);
    document.title = meta.title;
    const tag = document.querySelector('meta[name="description"]');
    if (tag) tag.setAttribute("content", meta.description);
  }, [pathname, value.copy]);

  // Keep the chosen English language in the URL across client-side navigation,
  // so a reload or a shared link still opens in English. No storage is used.
  useEffect(() => {
    if (lang !== "en") return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("lang") === "en") return;
    url.searchParams.set("lang", "en");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [lang, pathname]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
