// Per-card chart data derived from the ledger: sums included activity rows
// back into the five Calculator cards, biggest first. Pure, no React.
import type { ActivityId } from "../data/activities";
import type { Ledger } from "./calculator";

export type CardKey = "listrik" | "gas" | "kendaraan" | "penerbangan" | "lainnya";

export interface CardEmission {
  key: CardKey;
  kg: number;
  tonnes: number;
  /** Share of the included yearly total (0–1). */
  share: number;
}

// The activity ids that belong to each card, in card order.
const CARD_ACTIVITIES: ReadonlyArray<{ key: CardKey; ids: readonly ActivityId[] }> = [
  { key: "listrik", ids: ["electricityMwh"] },
  { key: "gas", ids: ["gasAmount"] },
  { key: "kendaraan", ids: ["fleetVansL", "fleetExecL"] },
  { key: "penerbangan", ids: ["flightsShort", "flightsMedium", "flightsLong"] },
  {
    key: "lainnya",
    ids: ["districtMj", "cloudVcpuHrs", "freightTonneKm", "r410aKg", "hfc134aKg"],
  },
];

/**
 * Card totals for the chart, largest first. Reference rows (location-based
 * electricity) are never added; cards with no emissions are left out.
 */
export function emissionsByCard(ledger: Ledger): CardEmission[] {
  if (ledger.total <= 0) return [];
  const included = ledger.rows.filter((row) => row.included);
  return CARD_ACTIVITIES.map(({ key, ids }) => {
    const kg = included
      .filter((row) => ids.includes(row.id))
      .reduce((sum, row) => sum + row.kg, 0);
    const tonnes = kg / 1000;
    return {
      key,
      kg,
      tonnes,
      share: tonnes / ledger.total,
    };
  })
    .filter((card) => card.kg > 0)
    .sort((a, b) => b.kg - a.kg);
}
