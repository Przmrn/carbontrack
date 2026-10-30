// Language plumbing: Indonesian by default, English optional, held in memory
// and mirrored in the ?lang= URL parameter (no storage, no cookies).
import { en, type Copy } from "../content/en";
import { id } from "../content/id";
import type { EmissionFactor } from "../data/factors";
import type { Language } from "./units";

export type { Language };
export const DEFAULT_LANGUAGE: Language = "id";

export function parseLang(search: string): Language | null {
  const value = new URLSearchParams(search).get("lang");
  return value === "en" || value === "id" ? value : null;
}

/** English copy with the Indonesian sections merged on top. */
export function copyFor(lang: Language): Copy {
  return lang === "id" ? { ...en, ...id } : en;
}

export function intlLocale(lang: Language): "en" | "id-ID" {
  return lang === "id" ? "id-ID" : "en";
}

export interface PageMeta {
  title: string;
  description: string;
}

/** Title and description for the current route in the active language. */
export function metaFor(copy: Copy, pathname: string): PageMeta {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") {
    return { title: copy.calculator.metaTitle, description: copy.calculator.metaDescription };
  }
  if (path.startsWith("/struk")) {
    return { title: copy.struk.metaTitle, description: copy.struk.metaDescription };
  }
  if (path.startsWith("/dossier")) {
    return { title: copy.dossier.metaTitle, description: copy.dossier.metaDescription };
  }
  if (path === "/methodology/dhl" || path.startsWith("/methodology/dhl/")) {
    return { title: copy.dhl.metaTitle, description: copy.dhl.metaDescription };
  }
  if (path.startsWith("/methodology")) {
    return { title: copy.methodology.metaTitle, description: copy.methodology.metaDescription };
  }
  if (path.startsWith("/registry")) {
    return { title: copy.registry.metaTitle, description: copy.registry.metaDescription };
  }
  if (path.startsWith("/glossary")) {
    return { title: copy.glossary.metaTitle, description: copy.glossary.metaDescription };
  }
  if (path.startsWith("/dev/")) {
    return { title: copy.dev.metaTitle, description: copy.dev.intro };
  }
  return { title: copy.brand.metaTitle, description: copy.brand.metaDescription };
}

/** Factor name in the active language; numeric values and sources stay unchanged. */
export function factorLabel(factor: Pick<EmissionFactor, "label" | "labelId">, lang: Language): string {
  return lang === "id" ? factor.labelId ?? factor.label : factor.label;
}
