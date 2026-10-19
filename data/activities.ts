// One entry per calculator activity: the factor that measures it. The scope is
// NEVER written here — it is read from the factor in data/factors.ts.
import { findCalculatorFactor, type EmissionFactor } from "./factors";

export type ActivityId =
  | "gasAmount"
  | "fleetVansL"
  | "fleetExecL"
  | "electricityMwh"
  | "districtMj"
  | "flightsShort"
  | "flightsMedium"
  | "flightsLong"
  | "cloudVcpuHrs"
  | "freightTonneKm"
  | "r410aKg"
  | "hfc134aKg";

export interface Activity {
  id: ActivityId;
  /** null = no factor supplied yet: the line emits nothing. */
  factorId: string | null;
  /** The factor follows the grid the user picked instead of a fixed one. */
  followsGrid?: boolean;
}

export const activities: Activity[] = [
  { id: "gasAmount", factorId: "gas-natural" },
  { id: "fleetVansL", factorId: "fleet-diesel" },
  { id: "fleetExecL", factorId: "fleet-diesel" },
  { id: "electricityMwh", factorId: null, followsGrid: true },
  { id: "districtMj", factorId: "district-heating" },
  { id: "flightsShort", factorId: "flight-short-haul" },
  { id: "flightsMedium", factorId: "flight-medium-haul" },
  { id: "flightsLong", factorId: "flight-long-haul" },
  { id: "cloudVcpuHrs", factorId: "cloud-compute" },
  { id: "freightTonneKm", factorId: "freight-intermodal" },
  { id: "r410aKg", factorId: "fgas-r410a" },
  { id: "hfc134aKg", factorId: "fgas-hfc134a" },
];

/** The factor a line is measured with, or null when none is available. */
export function activityFactor(activity: Activity, gridId: string): EmissionFactor | null {
  const id = activity.followsGrid === true ? gridId : activity.factorId;
  return id === null ? null : (findCalculatorFactor(id) ?? null);
}
