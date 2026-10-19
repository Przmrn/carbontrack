// Dossier dataset builder: calculator state becomes exportable entries.
import { mustCalculatorFactor } from "../data/factors";
import type { ActivityEntry } from "./emissions";
import { MJ_TO_KWH, MMBTU_TO_KWH, type CalculatorState } from "./calculator";

export function buildDossierEntries(state: CalculatorState): ActivityEntry[] {
  const gasKwh = state.gasUnit === "MMBTU" ? state.gasAmount * MMBTU_TO_KWH : state.gasAmount;
  // Market-based electricity (PPA deduction applied), matching the ledger.
  const marketShare = 1 - Math.min(1, Math.max(0, state.ppa));
  return [
    { key: "S1.01", factor: mustCalculatorFactor("fleet-diesel"), amount: state.fleetVansL + state.fleetExecL },
    { key: "S1.02", factor: mustCalculatorFactor("gas-natural"), amount: gasKwh },
    { key: "S1.03", factor: mustCalculatorFactor("fgas-r410a"), amount: state.r410aKg },
    { key: "S1.04", factor: mustCalculatorFactor("fgas-hfc134a"), amount: state.hfc134aKg },
    { key: "S2.01", factor: mustCalculatorFactor(state.gridId), amount: state.electricityMwh * 1000 * marketShare },
    { key: "S2.02", factor: mustCalculatorFactor("district-heating"), amount: state.districtMj * MJ_TO_KWH },
    { key: "S3.01", factor: mustCalculatorFactor("flight-short-haul"), amount: state.flightsShort },
    { key: "S3.02", factor: mustCalculatorFactor("flight-medium-haul"), amount: state.flightsMedium },
    { key: "S3.03", factor: mustCalculatorFactor("flight-long-haul"), amount: state.flightsLong },
    { key: "S3.04", factor: mustCalculatorFactor("cloud-compute"), amount: state.cloudVcpuHrs },
    { key: "S3.05", factor: mustCalculatorFactor("freight-intermodal"), amount: state.freightTonneKm },
  ];
}
