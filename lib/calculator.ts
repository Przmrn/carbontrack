// Calculator state, activity lines and ledger (pure, tonnes). Activities are
// listed in data/activities.ts; each line's scope is read from its factor.
import { findCalculatorFactor, type EmissionFactor, type Scope } from "../data/factors";
import { activities, activityFactor, type ActivityId } from "../data/activities";

export type GasUnit = "KWH" | "MMBTU";

export interface CalculatorState extends Record<ActivityId, number> {
  gasUnit: GasUnit;
  gridId: string;
  ppa: number;
}

export const defaultCalculatorState: CalculatorState = {
  gasAmount: 465800,
  gasUnit: "KWH",
  fleetVansL: 12400,
  fleetExecL: 5480,
  r410aKg: 0.05,
  hfc134aKg: 0,
  electricityMwh: 748.2,
  gridId: "grid-central-europe",
  ppa: 0.15,
  districtMj: 38200,
  flightsShort: 148,
  flightsMedium: 64,
  flightsLong: 38,
  cloudVcpuHrs: 428000,
  freightTonneKm: 142500,
};

// The Calculator starts empty: no fabricated numbers on first load.
export const emptyCalculatorState: CalculatorState = {
  gasAmount: 0,
  gasUnit: "KWH",
  fleetVansL: 0,
  fleetExecL: 0,
  r410aKg: 0,
  hfc134aKg: 0,
  electricityMwh: 0,
  gridId: "grid-central-europe",
  ppa: 0,
  districtMj: 0,
  flightsShort: 0,
  flightsMedium: 0,
  flightsLong: 0,
  cloudVcpuHrs: 0,
  freightTonneKm: 0,
};

/** True when every activity amount is zero (the Calculator's first-load state). */
export function isEmptyState(state: CalculatorState): boolean {
  return (
    state.electricityMwh === 0 &&
    state.gasAmount === 0 &&
    state.fleetVansL === 0 &&
    state.fleetExecL === 0 &&
    state.r410aKg === 0 &&
    state.hfc134aKg === 0 &&
    state.districtMj === 0 &&
    state.flightsShort === 0 &&
    state.flightsMedium === 0 &&
    state.flightsLong === 0 &&
    state.cloudVcpuHrs === 0 &&
    state.freightTonneKm === 0
  );
}

// Demo numbers for the "try sample data" button: new numbers, not the old
// mockup prefill, and labelled as sample data wherever they are shown.
export const sampleCalculatorState: CalculatorState = {
  gasAmount: 2400,
  gasUnit: "KWH",
  fleetVansL: 3840,
  fleetExecL: 1080,
  r410aKg: 0.1,
  hfc134aKg: 0,
  electricityMwh: 28.8,
  gridId: "grid-central-europe",
  ppa: 0,
  districtMj: 0,
  flightsShort: 12,
  flightsMedium: 4,
  flightsLong: 2,
  cloudVcpuHrs: 24000,
  freightTonneKm: 18000,
};

/** True when every field still holds the sample numbers. */
export function isSampleState(state: CalculatorState): boolean {
  const keys = Object.keys(sampleCalculatorState) as (keyof CalculatorState)[];
  return keys.every((key) => state[key] === sampleCalculatorState[key]);
}

// Physical unit constants (not emission factors).
export const MMBTU_TO_KWH = 293.071;
export const MJ_TO_KWH = 1 / 3.6;

/** One calculated line, as the activity list renders it. */
export interface ActivityRow {
  id: ActivityId;
  kg: number;
  factorId: string | null;
  factor: EmissionFactor | null;
  /** Derived from the factor; null when no factor is available. */
  scope: Scope | null;
  tonnes: number;
  /** Share of the included total. */
  ratio: number;
  /** Reference lines (location-based electricity) are displayed but never added up. */
  included: boolean;
  variant?: "market" | "location";
}

function mustFactor(id: string): EmissionFactor {
  const factor = findCalculatorFactor(id);
  if (!factor) throw new Error(`unknown calculator factor ${id}`);
  return factor;
}

const kgToTonnes = (kg: number): number => kg / 1000;

/** Green (PPA / certificate) share, clamped to 0–1. */
export const ppaShare = (state: CalculatorState): number =>
  Math.min(1, Math.max(0, state.ppa));

export const gasKwhOf = (state: CalculatorState): number =>
  state.gasUnit === "MMBTU" ? state.gasAmount * MMBTU_TO_KWH : state.gasAmount;

/** Electricity at the grid factor, before any green share is applied. */
export const electricityLocationKg = (state: CalculatorState): number =>
  state.electricityMwh * 1000 * (mustFactor(state.gridId).value / 1000);

/** kg CO2e for one activity, measured with the factor the activity points at. */
export function activityKg(state: CalculatorState, id: ActivityId, factorId: string): number {
  const ef = mustFactor(factorId).value;
  switch (id) {
    case "gasAmount":
      return gasKwhOf(state) * ef;
    case "fleetVansL":
      return state.fleetVansL * ef;
    case "fleetExecL":
      return state.fleetExecL * ef;
    case "electricityMwh":
      return electricityLocationKg(state) * (1 - ppaShare(state));
    case "districtMj":
      return state.districtMj * MJ_TO_KWH * ef;
    case "flightsShort":
      return state.flightsShort * ef;
    case "flightsMedium":
      return state.flightsMedium * ef;
    case "flightsLong":
      return state.flightsLong * ef;
    case "cloudVcpuHrs":
      return state.cloudVcpuHrs * ef;
    case "freightTonneKm":
      return state.freightTonneKm * ef;
    case "r410aKg":
      return state.r410aKg * ef;
    case "hfc134aKg":
      return state.hfc134aKg * ef;
  }
}

/** Every activity as a row, with the extra location-based electricity reference line. */
export function buildActivityRows(state: CalculatorState): ActivityRow[] {
  const rows: ActivityRow[] = [];
  for (const activity of activities) {
    const factor = activityFactor(activity, state.gridId);
    const kg = factor === null ? 0 : activityKg(state, activity.id, factor.id);
    rows.push({
      id: activity.id,
      kg,
      factorId: factor?.id ?? null,
      factor,
      scope: factor?.scope ?? null,
      tonnes: kgToTonnes(kg),
      ratio: 0,
      included: true,
      variant: activity.id === "electricityMwh" ? "market" : undefined,
    });
    if (activity.id === "electricityMwh") {
      const locationKg = electricityLocationKg(state);
      rows.push({
        id: "electricityMwh",
        kg: locationKg,
        factorId: state.gridId,
        factor,
        scope: factor?.scope ?? null,
        tonnes: kgToTonnes(locationKg),
        ratio: 0,
        included: false,
        variant: "location",
      });
    }
  }
  const total = rows.filter((row) => row.included).reduce((sum, row) => sum + row.kg, 0);
  return rows.map((row) => ({
    ...row,
    ratio: row.included && total > 0 ? row.kg / total : 0,
  }));
}

export interface Ledger {
  rows: ActivityRow[];
  s1: number;
  s2: number;
  s3: number;
  total: number;
  electricityGross: number;
  electricityMarket: number;
}

export function computeLedger(state: CalculatorState): Ledger {
  const rows = buildActivityRows(state);
  const included = rows.filter((row) => row.included);
  const byScope = (scope: Scope): number =>
    kgToTonnes(
      included.filter((row) => row.scope === scope).reduce((sum, row) => sum + row.kg, 0),
    );
  const s1 = byScope(1);
  const s2 = byScope(2);
  const s3 = byScope(3);
  return {
    rows,
    s1,
    s2,
    s3,
    total: s1 + s2 + s3,
    electricityGross: kgToTonnes(electricityLocationKg(state)),
    electricityMarket: kgToTonnes(
      rows.find((row) => row.variant === "market")?.kg ?? 0,
    ),
  };
}