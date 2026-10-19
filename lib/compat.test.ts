// Tests for the back-compat helpers at the end of lib/emissions.ts (Struk,
// Calculator ledger, Registry and Dossier still call these) plus the daily
// reconciliation between a Struk day's lines, its net balance and its tier.
import { describe, expect, it } from "vitest";
import { findFactor } from "../data/factors";
import {
  classifyTier,
  intensityPerFte,
  kgToTonnes,
  percentOf,
  receiptNet,
  splitScopes,
  toKg,
  totalByScope,
  validateAmount,
  type ActivityEntry,
} from "./emissions";
import { buildStrukEntries, defaultStrukState } from "./struk";

function factor(id: string) {
  const found = findFactor(id);
  if (!found) throw new Error(`unknown factor ${id}`);
  return found;
}

function entry(id: string, amount: number, key = id): ActivityEntry {
  return { key, factor: factor(id), amount };
}

describe("toKg", () => {
  it("divides gram-based factors by 1000 and leaves kg-based ones alone", () => {
    expect(toKg(24.5, factor("commute-rail-transit"))).toBeCloseTo(0.686, 10); // 24.5 km x 28 g/km
    expect(toKg(5, factor("power-ac"))).toBeCloseTo(3.25, 10); // 5 h x 0.65 kg/h
    expect(toKg(1000, { value: 251.7, unit: "g/kWh" })).toBeCloseTo(251.7, 10);
    expect(toKg(1, { value: 2088, unit: "kg CO₂e/kg" })).toBeCloseTo(2088, 10);
  });

  it("rejects negative and non-finite inputs", () => {
    expect(() => toKg(-1, factor("power-ac"))).toThrow();
    expect(() => toKg(Number.NaN, factor("power-ac"))).toThrow();
  });
});

describe("totalByScope and kgToTonnes", () => {
  it("splits entries by their factor scope and sums to the total", () => {
    const entries = [
      entry("commute-rail-transit", 24.5, "commute"),
      entry("power-ac", 5, "ac"),
      entry("goods-cup", 2, "cups"),
    ];
    const totals = totalByScope(entries);
    expect(totals.s3).toBeCloseTo(0.986, 10); // 0.686 rail + 0.30 cups
    expect(totals.s2).toBeCloseTo(3.25, 10);
    expect(totals.s1).toBe(0);
    expect(totals.total).toBeCloseTo(4.236, 10);
    expect(kgToTonnes(totals.total)).toBeCloseTo(0.004236, 12);
  });

  it("is zero for an empty list", () => {
    expect(totalByScope([])).toEqual({ s1: 0, s2: 0, s3: 0, total: 0 });
  });
});

describe("classifyTier", () => {
  it("uses the DESIGN.md §6.2 boundaries", () => {
    expect(classifyTier(0)).toBe("LOW");
    expect(classifyTier(2.999)).toBe("LOW");
    expect(classifyTier(3)).toBe("MODERATE");
    expect(classifyTier(7)).toBe("MODERATE");
    expect(classifyTier(7.001)).toBe("HIGH");
  });
});

describe("receiptNet", () => {
  it("equals the sum of the item lines", () => {
    expect(receiptNet([{ kg: 1.25 }, { kg: 0.75 }])).toBeCloseTo(2, 10);
    expect(receiptNet([])).toBe(0);
  });
});

describe("registry helpers", () => {
  it("percentOf returns a percentage and survives a zero whole", () => {
    expect(percentOf(25, 50)).toBeCloseTo(50, 10);
    expect(percentOf(0.74, 1)).toBeCloseTo(74, 10);
    expect(percentOf(5, 0)).toBe(0);
  });

  it("splitScopes multiplies gross tonnes by the shares", () => {
    const split = splitScopes(100, [0.04, 0.22, 0.74]);
    expect(split.s1).toBeCloseTo(4, 10);
    expect(split.s2).toBeCloseTo(22, 10);
    expect(split.s3).toBeCloseTo(74, 10);
  });

  it("intensityPerFte divides by FTE and guards a zero team", () => {
    expect(intensityPerFte(38.2, 18)).toBeCloseTo(2.1222, 4);
    expect(intensityPerFte(38.2, 0)).toBe(0);
  });
});

describe("validateAmount", () => {
  it("accepts finite numbers >= 0 and rejects anything else", () => {
    expect(validateAmount("12.5")).toEqual({ ok: true, value: 12.5 });
    expect(validateAmount("0")).toEqual({ ok: true, value: 0 });
    expect(validateAmount("")).toEqual({ ok: false, value: 0 });
    expect(validateAmount("-3")).toEqual({ ok: false, value: 0 });
    expect(validateAmount("abc")).toEqual({ ok: false, value: 0 });
  });
});

describe("Struk daily reconciliation", () => {
  it("the default day's net is the sum of its lines and sets the tier stamp", () => {
    const lines = buildStrukEntries(defaultStrukState).map((item) => toKg(item.amount, item.factor));
    const net = receiptNet(lines.map((kg) => ({ kg })));
    // rail 0.686 + poultry 0.85 + plant 0.15 + AC 3.25 + workstation 0.48 + parcel 0.85 + cup 0.15
    expect(net).toBeCloseTo(6.416, 10);
    expect(net).toBeCloseTo(totalByScope(buildStrukEntries(defaultStrukState)).total, 10);
    expect(classifyTier(net)).toBe("MODERATE");
  });
});