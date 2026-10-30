// Display formatting for generated DHL series; no emissions calculations.
import { formatAmount, formatShare, formatTonnes, type Locale } from "../../lib/format";

export function formatDhlValue(
  value: number | null | undefined,
  unit: string,
  locale: Locale,
): string {
  if (value === null || value === undefined) return "—";
  if (unit === "share %") return formatShare(value / 100, locale);
  if (unit.includes("Mt")) return formatTonnes(value, locale);
  if (unit.includes("g CO")) return formatAmount(value, locale);
  return formatAmount(value, locale);
}

// Units come from the generated data as CO2e; the page displays the subscript form.
export function displayDhlUnit(unit: string): string {
  return unit.replace(/CO2e/g, "CO₂e").replace(/CO2/g, "CO₂");
}
