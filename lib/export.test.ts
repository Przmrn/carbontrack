// Tests for CSV/JSON export builders and demo-status labelling.
import { describe, expect, it } from "vitest";
import { buildCsv, buildFactorCsv, buildFactorJson, buildJson, CSV_HEADER, statusForFactor } from "./export";
import { findFactor, strukFactors, type EmissionFactor } from "../data/factors";

function entry(id: string, amount: number, key = id) {
  const factor = findFactor(id);
  if (!factor) throw new Error(`unknown factor ${id}`);
  return { key, factor, amount };
}

describe("statusForFactor", () => {
  it("marks every unverified factor as demo", () => {
    const factor = findFactor("commute-rail-transit");
    if (!factor) throw new Error("missing fixture factor");
    expect(statusForFactor(factor)).toBe("DEMO FACTOR / UNVERIFIED");
  });

  it("cites source and year for verified factors", () => {
    const sourced: EmissionFactor = {
      id: "x",
      label: "X",
      unit: "kg",
      value: 1,
      scope: 1,
      source: "DEFRA",
      year: 2024,
      verified: true,
    };
    expect(statusForFactor(sourced)).toBe("SOURCED: DEFRA 2024");
  });
});

describe("buildCsv", () => {
  it("starts with a BOM plus header and labels demo rows", () => {
    const csv = buildCsv([entry("power-ac", 5)]);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv.slice(1).startsWith(CSV_HEADER)).toBe(true);
    expect(csv).toContain("Air Conditioning,5,kg/h,0.65,Scope 2,3.25");
    expect(csv).toContain("DEMO FACTOR / UNVERIFIED");
  });
});

describe("buildFactorCsv and buildFactorJson", () => {
  it("serialises the full factor database with demo statuses", () => {
    const csv = buildFactorCsv(strukFactors);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv).toContain("commute-rail-transit,Rail / Transit,g/km,28,Scope 3");
    expect(csv).toContain("DEMO FACTOR / UNVERIFIED");
    const report = JSON.parse(buildFactorJson(strukFactors, "factors-v1"));
    expect(report.count).toBe(strukFactors.length);
    expect(report.factors[0]).toHaveProperty("status", "DEMO FACTOR / UNVERIFIED");
  });
});
describe("buildJson", () => {
  it("reconciles line emissions with scope totals", () => {
    const entries = [entry("power-ac", 5), entry("goods-parcel", 1)];
    const report = JSON.parse(buildJson(entries, "struk-sample"));
    expect(report.dataset).toBe("struk-sample");
    expect(report.lines).toHaveLength(2);
    const lineSum = report.lines.reduce(
      (sum: number, line: { emissionKg: number }) => sum + line.emissionKg,
      0,
    );
    expect(lineSum).toBeCloseTo(report.totals.total, 10);
    expect(report.totals.total).toBeCloseTo(4.1, 10);
    for (const line of report.lines) {
      expect(line.status).toBe("DEMO FACTOR / UNVERIFIED");
    }
  });
});
