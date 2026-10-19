// Tests: dossier entries reconcile with the calculator ledger by construction.
import { describe, expect, it } from "vitest";
import { buildDossierEntries } from "./dossier";
import { computeLedger, defaultCalculatorState } from "./calculator";
import { kgToTonnes, totalByScope } from "./emissions";

describe("buildDossierEntries", () => {
  it("covers all ledger vectors with unique keys", () => {
    const entries = buildDossierEntries(defaultCalculatorState);
    expect(entries).toHaveLength(11);
    const keys = entries.map((entry) => entry.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("reconciles totals with the live ledger", () => {
    const entries = buildDossierEntries(defaultCalculatorState);
    const ledger = computeLedger(defaultCalculatorState);
    const totals = totalByScope(entries);
    // totalByScope works in kg; the ledger works in tonnes.
    expect(kgToTonnes(totals.total)).toBeCloseTo(ledger.total, 8);
    expect(kgToTonnes(totals.s1)).toBeCloseTo(ledger.s1, 8);
    // Market-based S2 (PPA applied) matches the ledger, not gross electricity.
    expect(kgToTonnes(totals.s2)).toBeCloseTo(ledger.s2, 6);
    expect(kgToTonnes(totals.s3)).toBeCloseTo(ledger.s3, 8);
  });
});
