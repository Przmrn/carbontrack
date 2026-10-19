// Locale-aware amount parsing plus the only conversions the Calculator needs:
// monthly ↔ annual and kWh ↔ MWh. Pure, no React, never throws.
export type Language = "en" | "id";
export type Period = "month" | "year";

export type ParseResult =
  | { ok: true; value: number }
  | { ok: false; reason: "empty" | "negative" | "invalid" };

const SEPARATORS: Record<Language, { decimal: string; group: string }> = {
  id: { decimal: ",", group: "." },
  en: { decimal: ".", group: "," },
};

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Digits, or digits split into thousands groups (1.500 / 1,500). */
function isGroupedInt(value: string, group: string): boolean {
  if (/^\d+$/.test(value)) return true;
  return new RegExp(`^\\d{1,3}(?:${escapeRe(group)}\\d{3})+$`).test(value);
}

function stripGroup(value: string, group: string): string {
  return value.split(group).join("");
}

function fromDigits(digits: string, fraction: string): ParseResult {
  const value = Number(fraction === "" ? digits : `${digits}.${fraction}`);
  return Number.isFinite(value) && value >= 0
    ? { ok: true, value }
    : { ok: false, reason: "invalid" };
}

/**
 * Parse a typed amount. Indonesian: "." groups thousands, "," is the decimal.
 * English: reversed. Valid thousands groups win; a lone separator with 1–3
 * digits after it is read as a decimal ("1.500" is 1500, "1.5" is 1.5).
 */
export function parseAmount(raw: string, lang: Language): ParseResult {
  const cleaned = raw.trim().replace(/[\s\u00A0\u202F]/g, "");
  if (cleaned === "") return { ok: false, reason: "empty" };
  if (cleaned.includes("-")) return { ok: false, reason: "negative" };
  const body = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
  if (body === "") return { ok: false, reason: "invalid" };
  const { decimal, group } = SEPARATORS[lang];

  // A trailing separator is an unfinished typing step, not an error.
  if (body.endsWith(decimal) || body.endsWith(group)) {
    return parseAmount(body.slice(0, -1), lang);
  }

  const decimalIndex = body.lastIndexOf(decimal);
  if (decimalIndex !== -1) {
    const head = body.slice(0, decimalIndex);
    const tail = body.slice(decimalIndex + 1);
    if (!/^\d+$/.test(tail)) return { ok: false, reason: "invalid" };
    if (head === "") return fromDigits("0", tail);
    if (!isGroupedInt(head, group)) return { ok: false, reason: "invalid" };
    return fromDigits(stripGroup(head, group), tail);
  }

  if (body.includes(group)) {
    if (isGroupedInt(body, group)) return fromDigits(stripGroup(body, group), "");
    const parts = body.split(group);
    if (parts.length === 2 && /^\d*$/.test(parts[0]) && /^\d{1,3}$/.test(parts[1])) {
      return fromDigits(parts[0] === "" ? "0" : parts[0], parts[1]);
    }
    return { ok: false, reason: "invalid" };
  }

  if (!/^\d+$/.test(body)) return { ok: false, reason: "invalid" };
  return fromDigits(body, "");
}

/** Monthly amounts count twelve times a year. */
export function toAnnual(value: number, period: Period): number {
  return period === "month" ? value * 12 : value;
}

/** Inverse of toAnnual, used to show a stored annual value in the field. */
export function fromAnnual(annual: number, period: Period): number {
  return period === "month" ? annual / 12 : annual;
}

export function kwhToMwh(kwh: number): number {
  return kwh / 1000;
}

export function mwhToKwh(mwh: number): number {
  return mwh * 1000;
}
