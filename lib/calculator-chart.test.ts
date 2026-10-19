// Chart grouping: card sums add back to the ledger total, the location-based
// reference row is excluded, and empty input yields no chart rows.
import { describe, expect, it } from "vitest";
import { computeLedger, emptyCalculatorState, sampleCalculatorState } from "./calculator";
import { emissionsByCard } from "./calculator-chart";

describe("emissionsByCard", () => {
  it("returns nothing when the calculator is empty", () => {
    expect(emissionsByCard(computeLedger(emptyCalculatorState))).toEqual([]);
  });

  it("adds back to the ledger total and includes every populated card once", () => {
    const ledger = computeLedger(sampleCalculatorState);
    const cards = emissionsByCard(ledger);
    expect(cards).toHaveLength(5);
    expect(new Set(cards.map((card) => card.key)).size).toBe(cards.length);
    expect(cards.reduce((sum, card) => sum + card.kg, 0)).toBeCloseTo(ledger.total * 1000, 6);
    expect(cards.reduce((sum, card) => sum + card.share, 0)).toBeCloseTo(1, 9);
  });

  it("groups the two vehicles and three flight bands onto their cards", () => {
    const ledger = computeLedger(sampleCalculatorState);
    const included = ledger.rows.filter((row) => row.included);
    const kgOf = (ids: string[]): number =>
      included
        .filter((row) => ids.includes(row.id))
        .reduce((sum, row) => sum + row.kg, 0);
    const cards = new Map(emissionsByCard(ledger).map((card) => [card.key, card]));
    expect(cards.get("kendaraan")?.kg).toBeCloseTo(
      kgOf(["fleetVansL", "fleetExecL"]),
      9,
    );
    expect(cards.get("penerbangan")?.kg).toBeCloseTo(
      kgOf(["flightsShort", "flightsMedium", "flightsLong"]),
      9,
    );
  });

  it("uses the market-based electricity line only", () => {
    const ledger = computeLedger({ ...sampleCalculatorState, ppa: 0.5 });
    const listrik = emissionsByCard(ledger).find((card) => card.key === "listrik");
    expect(listrik?.kg).toBeCloseTo(ledger.electricityMarket * 1000, 9);
    expect(listrik?.kg).toBeLessThan(ledger.electricityGross * 1000);
  });

  it("sorts biggest first and omits zero cards", () => {
    const ledger = computeLedger({
      ...emptyCalculatorState,
      electricityMwh: 10,
      flightsShort: 1,
    });
    const cards = emissionsByCard(ledger);
    expect(cards.map((card) => card.key)).toEqual(["listrik", "penerbangan"]);
    expect(cards[0].kg).toBeGreaterThan(cards[1].kg);
  });
});
