// Locale-aware number formatting (Intl only, no maths).
export type Locale = "en" | "id-ID";

type FormatKind = "kg" | "amount" | "factor" | "share";

const cache = new Map<string, Intl.NumberFormat>();

function formatter(locale: Locale, kind: FormatKind): Intl.NumberFormat {
  const key = `${locale}:${kind}`;
  const hit = cache.get(key);
  if (hit) return hit;
  let created: Intl.NumberFormat;
  if (kind === "share") {
    created = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 2,
    });
  } else {
    created = new Intl.NumberFormat(locale, {
      minimumFractionDigits: kind === "kg" ? 2 : 0,
      maximumFractionDigits: kind === "factor" ? 4 : 2,
    });
  }
  cache.set(key, created);
  return created;
}

// Kilograms with 2 decimals: 10625 -> "10,625.00" (en) / "10.625,00" (id-ID).
export function formatKg(value: number, locale: Locale = "en"): string {
  return formatter(locale, "kg").format(value);
}

// Tonnes with 2 decimals.
export function formatTonnes(value: number, locale: Locale = "en"): string {
  return formatter(locale, "kg").format(value);
}

// Plain amounts (grouped, up to 2 decimals): 12500 -> "12,500".
export function formatAmount(value: number, locale: Locale = "en"): string {
  return formatter(locale, "amount").format(value);
}

// Factor values (up to 4 decimals to keep values like 0.1825 exact).
export function formatFactor(value: number, locale: Locale = "en"): string {
  return formatter(locale, "factor").format(value);
}

// Receipt timestamp ("14 Nov 2024"); dates carry no emission maths.
export function formatReceiptDate(date: Date, locale: Locale = "en"): string {
  return new Intl.DateTimeFormat(locale === "id-ID" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

// Share as a fraction (0.1089 -> "10.89%"); guards division by zero upstream.
export function formatShare(fraction: number, locale: Locale = "en"): string {
  return formatter(locale, "share").format(fraction);
}
