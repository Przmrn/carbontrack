// Language plumbing: Indonesian by default, English optional, held in memory
// and mirrored in the ?lang= URL parameter (no storage, no cookies).
import { en, type Copy } from "../content/en";
import { id } from "../content/id";
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
