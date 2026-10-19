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
import type { Copy } from "../content/en";
import { copyFor, DEFAULT_LANGUAGE, parseLang, type Language } from "../lib/i18n";

interface LanguageValue {
  lang: Language;
  copy: Copy;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

export default function LanguageProvider({ children }: { children: ReactNode }) {
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

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
