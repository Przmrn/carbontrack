// Empty and sample states: the first load emits nothing; the sample reconciles
// with the dossier maths exactly.
import { describe, expect, it } from "vitest";
import {
  computeLedger,
  emptyCalculatorState,
  isEmptyState,
  isSampleState,
  sampleCalculatorState,
} from "./calculator";
import { buildDossierEntries } from "./dossier";
import { totalByScope } from "./emissions";

describe("emptyCalculatorState", () => {
  it("has no activity amounts and produces zero emissions", () => {
    expect(isEmptyState(emptyCalculatorState)).toBe(true);
    const ledger = computeLedger(emptyCalculatorState);
    expect(ledger.total).toBe(0);
    expect(ledger.s1).toBe(0);
    expect(ledger.s2).toBe(0);
    expect(ledger.s3).toBe(0);
    expect(ledger.rows.every((row) => row.kg === 0)).toBe(true);
  });
});

describe("sampleCalculatorState", () => {
  it("is recognisable as sample data and can be edited away from it", () => {
    expect(isEmptyState(sampleCalculatorState)).toBe(false);
    expect(isSampleState(sampleCalculatorState)).toBe(true);
    expect(isSampleState({ ...sampleCalculatorState, flightsShort: 99 })).toBe(false);
  });

  it("reconciles the calculator ledger with the dossier entries", () => {
    const ledger = computeLedger(sampleCalculatorState);
    const dossier = totalByScope(buildDossierEntries(sampleCalculatorState));
    expect(dossier.total / 1000).toBeCloseTo(ledger.total, 9);
  });
});
