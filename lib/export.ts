// Pure CSV/JSON export builders (downloading happens in components).
import type { EmissionFactor } from "../data/factors";
import { toKg, totalByScope, type ActivityEntry } from "./emissions";

export const CSV_HEADER =
  "activity,amount,unit,factor_value,scope,emission_kg,status";

export function statusForFactor(factor: EmissionFactor): string {
  if (!factor.verified) return "DEMO FACTOR / UNVERIFIED";
  const origin = [factor.source, factor.year].filter((part) => part !== null).join(" ");
  return origin === "" ? "SOURCED" : `SOURCED: ${origin}`;
}

function escapeCsvCell(cell: string): string {
  if (cell.includes('"') || cell.includes(",") || cell.includes("\n") || cell.includes("\r")) {
    return `"${cell.replace(/"/g, '""')}"`;
  }
  return cell;
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function buildCsv(entries: ActivityEntry[]): string {
  const lines = entries.map((entry) =>
    [
      entry.factor.label,
      String(entry.amount),
      entry.factor.unit,
      String(entry.factor.value),
      `Scope ${entry.factor.scope}`,
      String(round2(toKg(entry.amount, entry.factor))),
      statusForFactor(entry.factor),
    ]
      .map(escapeCsvCell)
      .join(","),
  );
  return "\uFEFF" + CSV_HEADER + "\n" + (lines.length > 0 ? lines.join("\n") + "\n" : "");
}

export interface JsonReport {
  dataset: string;
  lines: {
    activity: string;
    amount: number;
    unit: string;
    factorValue: number;
    scope: number;
    emissionKg: number;
    status: string;
  }[];
  totals: { s1: number; s2: number; s3: number; total: number };
}

export interface FactorRecord {
  id: string;
  label: string;
  unit: string;
  value: number;
  scope: number;
  source: string | null;
  year: number | null;
  status: string;
}

export function toFactorRecords(factors: EmissionFactor[]): FactorRecord[] {
  return factors.map((factor) => ({
    id: factor.id,
    label: factor.label,
    unit: factor.unit,
    value: factor.value,
    scope: factor.scope,
    source: factor.source,
    year: factor.year,
    status: statusForFactor(factor),
  }));
}

const FACTOR_CSV_HEADER = "id,label,unit,value,scope,source,year,status";

export function buildFactorCsv(factors: EmissionFactor[]): string {
  const lines = toFactorRecords(factors).map((record) =>
    [
      record.id,
      record.label,
      record.unit,
      String(record.value),
      `Scope ${record.scope}`,
      record.source ?? "",
      record.year === null ? "" : String(record.year),
      record.status,
    ]
      .map(escapeCsvCell)
      .join(","),
  );
  return "\uFEFF" + FACTOR_CSV_HEADER + "\n" + (lines.length > 0 ? lines.join("\n") + "\n" : "");
}

export function buildFactorJson(factors: EmissionFactor[], dataset: string): string {
  return JSON.stringify(
    { dataset, count: factors.length, factors: toFactorRecords(factors) },
    null,
    2,
  );
}

export function buildJson(entries: ActivityEntry[], dataset: string): string {
  const report: JsonReport = {
    dataset,
    lines: entries.map((entry) => ({
      activity: entry.factor.label,
      amount: entry.amount,
      unit: entry.factor.unit,
      factorValue: entry.factor.value,
      scope: entry.factor.scope,
      emissionKg: round2(toKg(entry.amount, entry.factor)),
      status: statusForFactor(entry.factor),
    })),
    totals: totalByScope(entries),
  };
  return JSON.stringify(report, null, 2);
}
