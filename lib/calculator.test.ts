// Tests for the activity calculator: every line, the scope it derives from its
// factor, and the total. Expected values are unchanged from the previous ledger
// tests — only the expression moved from Ledger fields to activity rows.
import { describe, expect, it } from "vitest";
import { findCalculatorFactor } from "../data/factors";
import type { ActivityId } from "../data/activities";
import {
  buildActivityRows,
  computeLedger,
  defaultCalculatorState,
  electricityLocationKg,
  MJ_TO_KWH,
  MMBTU_TO_KWH,
  type CalculatorState,
} from "./calculator";

const rows = (state: CalculatorState = defaultCalculatorState) => buildActivityRows(state);
const included = (state?: CalculatorState) => rows(state).filter((row) => row.included);
const tonnesOf = (id: ActivityId, state?: CalculatorState): number =>
  included(state)
    .filter((row) => row.id === id)
    .reduce((sum, row) => sum + row.tonnes, 0);

const ZERO: CalculatorState = {
  gasAmount: 0,
  fleetVansL: 0,
  fleetExecL: 0,
  electricityMwh: 0,
  districtMj: 0,
  flightsShort: 0,
  flightsMedium: 0,
  flightsLong: 0,
  cloudVcpuHrs: 0,
  freightTonneKm: 0,
  r410aKg: 0,
  hfc134aKg: 0,
  gasUnit: "KWH",
  gridId: "grid-central-europe",
  ppa: 0,
};

describe("activity rows", () => {
  it("computes the Scope 1 lines from gas, vehicles and cooling gas", () => {
    expect(tonnesOf("gasAmount")).toBeCloseTo(94.09, 2);
    // The mockup showed 47.90 by truncating decimals; the correct product is 47.9184.
    expect(tonnesOf("fleetVansL") + tonnesOf("fleetExecL")).toBeCloseTo(47.9184, 4);
    expect(tonnesOf("r410aKg") + tonnesOf("hfc134aKg")).toBeCloseTo(0.104, 3);
    expect(computeLedger(defaultCalculatorState).s1).toBeCloseTo(142.1144, 4);
  });

  it("applies the green share and converts MJ to kWh", () => {
    const ledger = computeLedger(defaultCalculatorState);
    expect(ledger.electricityGross).toBeCloseTo(188.32, 2);
    expect(ledger.electricityMarket).toBeCloseTo(160.07, 2);
    expect(tonnesOf("districtMj")).toBeCloseTo((38200 * MJ_TO_KWH * 0.12) / 1000, 4);
    expect(ledger.s2).toBeCloseTo(ledger.electricityMarket + tonnesOf("districtMj"), 10);
  });

  it("computes the Scope 3 lines from flights, cloud and freight", () => {
    const ledger = computeLedger(defaultCalculatorState);
    expect(tonnesOf("flightsShort")).toBeCloseTo(22.8, 1);
    expect(tonnesOf("flightsMedium")).toBeCloseTo(18.4, 1);
    expect(tonnesOf("flightsLong")).toBeCloseTo(45.2, 1);
    expect(tonnesOf("cloudVcpuHrs")).toBeCloseTo(65.8, 1);
    expect(tonnesOf("freightTonneKm")).toBeCloseTo(31.0, 1);
    expect(ledger.s3).toBeCloseTo(
      tonnesOf("flightsShort") +
        tonnesOf("flightsMedium") +
        tonnesOf("flightsLong") +
        tonnesOf("cloudVcpuHrs") +
        tonnesOf("freightTonneKm"),
      10,
    );
  });

  it("reconciles the sum of the lines with the ledger total", () => {
    const ledger = computeLedger(defaultCalculatorState);
    const lineSum = included().reduce((sum, row) => sum + row.tonnes, 0);
    expect(lineSum).toBeCloseTo(ledger.total, 10);
    expect(ledger.total).toBeCloseTo(ledger.s1 + ledger.s2 + ledger.s3, 10);
    const ratioSum = included().reduce((sum, row) => sum + row.ratio, 0);
    expect(ratioSum).toBeCloseTo(1, 6);
  });

  it("keeps the location-based electricity line as a reference, never in the total", () => {
    const reference = rows().filter((row) => !row.included);
    expect(reference).toHaveLength(1);
    expect(reference[0].variant).toBe("location");
    expect(reference[0].tonnes).toBeCloseTo(electricityLocationKg(defaultCalculatorState) / 1000, 10);
    expect(computeLedger(defaultCalculatorState).electricityGross).toBeCloseTo(
      reference[0].tonnes,
      10,
    );
  });

  it("derives every line's scope from its factor, never from a label", () => {
    for (const row of included()) {
      expect(row.factorId).not.toBeNull();
      const factor = findCalculatorFactor(row.factorId as string);
      expect(factor).toBeDefined();
      expect(row.scope).toBe(factor?.scope);
    }
  });

  it("returns zeros, not NaN, for an empty inventory", () => {
    const ledger = computeLedger(ZERO);
    expect(ledger.total).toBe(0);
    expect(ledger.rows.every((row) => Number.isFinite(row.kg))).toBe(true);
  });
});

describe("unit conversions", () => {
  it("converts MMBTU gas input to kWh", () => {
    const state = { ...defaultCalculatorState, gasAmount: 100, gasUnit: "MMBTU" as const };
    expect(tonnesOf("gasAmount", state)).toBeCloseTo((100 * MMBTU_TO_KWH * 0.202) / 1000, 6);
  });

  it("removes the green-share deduction at 0%", () => {
    const ledger = computeLedger({ ...defaultCalculatorState, ppa: 0 });
    expect(ledger.electricityMarket).toBeCloseTo(ledger.electricityGross, 10);
  });
});