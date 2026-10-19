// Pure calculation logic for the C—METRIC Calculator, structured like DHL Group's reporting.
// No React, no I/O. All outputs in kg CO2e unless stated. Factor VALUES are inputs: DHL publishes none.

export type Factor = {
  id: string; label: string; unit: string; value: number;
  source: string | null; year: number | null; verified: boolean;
};

const finite = (n: number, what: string) => {
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`${what} must be a finite number >= 0`);
  return n;
};
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

// ---- Scope 1 (consumption-based, tank-to-wheel): fuel quantity x factor
export const scope1 = (lines: { qty: number; ef: Factor }[]) =>
  sum(lines.map(l => finite(l.qty, 'fuel quantity') * l.ef.value));

// ---- Scope 2 (reported twice, always)
export const scope2Location = (lines: { kwh: number; efGrid: Factor }[]) =>
  sum(lines.map(l => finite(l.kwh, 'kWh') * l.efGrid.value));

/** Market-based: kWh covered by energy-attribute certificates (EAC) count as zero; the rest uses the residual-mix factor. */
export const scope2Market = (lines: { kwh: number; eacKwh: number; efResidual: Factor }[]) =>
  sum(lines.map(l => {
    finite(l.kwh, 'kWh'); finite(l.eacKwh, 'EAC kWh');
    if (l.eacKwh > l.kwh) throw new RangeError('EAC-covered kWh cannot exceed total kWh');
    return (l.kwh - l.eacKwh) * l.efResidual.value;
  }));

// ---- Scope 3, logistics-related
/** Category 3: upstream (well-to-tank) of fuels burned, plus upstream of purchased energy. */
export const scope3Cat3 = (lines: { qty: number; efWTT: Factor }[]) =>
  sum(lines.map(l => finite(l.qty, 'quantity') * l.efWTT.value));

/** Category 4 / 6, activity-based: tonne-km (or passenger-km) x intensity per mode. */
export const scope3Activity = (lines: { activity: number; ef: Factor }[]) =>
  sum(lines.map(l => finite(l.activity, 'activity') * l.ef.value));

// ---- Scope 3, non-logistics (estimates)
export const spendBased = (lines: { eur: number; efPerEur: Factor }[]) =>
  sum(lines.map(l => finite(l.eur, 'spend') * l.efPerEur.value));

export type InventoryInput = {
  scope1Kg: number; scope2LocationKg: number; scope2MarketKg: number;
  cat3Kg: number; cat3LocationKg?: number;     // optional: upstream on a location basis (see docs, location-total gap)
  cat4Kg: number; cat6Kg: number;
  cat1Kg: number; cat2Kg: number; cat7Kg: number;
  offsetsKg?: number; biogenicKg?: number;      // reported separately, NEVER netted or added
  revenueEur?: number; energyKwh?: number;
};

export type Inventory = {
  scope1: number; scope2Market: number; scope2Location: number;
  scope3Logistics: number; scope3Other: number; scope3Total: number;
  logisticsRelated: number;        // S1 + S2(market) + cat 3 + cat 4 + cat 6   (DHL's steering number)
  totalMarket: number; totalLocation: number;
  intensityGPerEur: { market: number; location: number } | null;
  energyIntensityKwhPerEur: number | null;
  separate: { offsetsKg: number; biogenicKg: number };
};

export function inventory(i: InventoryInput): Inventory {
  Object.entries(i).forEach(([k, v]) => { if (typeof v === 'number') finite(v, k); });
  const s3Log = i.cat3Kg + i.cat4Kg + i.cat6Kg;
  const s3Other = i.cat1Kg + i.cat2Kg + i.cat7Kg;
  const s3 = s3Log + s3Other;
  const s3LogLoc = (i.cat3LocationKg ?? i.cat3Kg) + i.cat4Kg + i.cat6Kg;
  const totalMarket = i.scope1Kg + i.scope2MarketKg + s3;
  const totalLocation = i.scope1Kg + i.scope2LocationKg + s3LogLoc + s3Other;
  const rev = i.revenueEur && i.revenueEur > 0 ? i.revenueEur : null;
  return {
    scope1: i.scope1Kg, scope2Market: i.scope2MarketKg, scope2Location: i.scope2LocationKg,
    scope3Logistics: s3Log, scope3Other: s3Other, scope3Total: s3,
    logisticsRelated: i.scope1Kg + i.scope2MarketKg + s3Log,
    totalMarket, totalLocation,
    intensityGPerEur: rev ? { market: (totalMarket * 1000) / rev, location: (totalLocation * 1000) / rev } : null,
    energyIntensityKwhPerEur: rev && i.energyKwh ? i.energyKwh / rev : null,
    separate: { offsetsKg: i.offsetsKg ?? 0, biogenicKg: i.biogenicKg ?? 0 },
  };
}

// ---- Benchmarks and progress
/** kg CO2e per kWh implied by reported emissions and energy: a plausibility check, not a factor. */
export const impliedFactor = (emissionsKg: number, energyKwh: number) =>
  energyKwh > 0 ? emissionsKg / energyKwh : null;

export function progress(current: number, base: number, target: number, yearsLeft: number) {
  if (base <= 0) throw new RangeError('base must be > 0');
  return {
    changeVsBasePct: ((current - base) / base) * 100,
    remainingToTarget: Math.max(0, current - target),
    remainingPctOfCurrent: Math.max(0, ((current - target) / current) * 100),
    requiredAnnualCutPct: yearsLeft > 0 && current > target ? (1 - Math.pow(target / current, 1 / yearsLeft)) * 100 : 0,
  };
}

/** Market-based Scope 2 should be <= location-based when certificates are used. Returns a warning string or null. */
export const scope2Sanity = (location: number, market: number) =>
  market > location * 1.0001 ? 'Market-based Scope 2 exceeds location-based; check residual-mix factor and EAC inputs.' : null;

// ---------------------------------------------------------------------------
// Back-compat layer for the pre-DHL modules (Struk Karbon, Calculator ledger,
// Registry, Dossier). The DHL-structured logic above is the source of truth.
// These helpers only translate the legacy factor file (data/factors.ts, which
// carries a `scope`) into kg and totals, so the existing pages and their tests
// keep compiling and reconciling until each module is rebuilt in its phase.
// ---------------------------------------------------------------------------

/** A data/factors.ts factor seen from the calculator side: same fields plus scope. */
export type ScopedFactor = Factor & { scope: 1 | 2 | 3 };

export interface ActivityEntry {
  key: string;
  factor: ScopedFactor;
  amount: number;
}

/** Gram-based factor units (g/km, g/kWh) need a 1/1000 step; kg-based ones do not. */
const kgPerFactorUnit = (unit: string): number =>
  unit.startsWith('g') && !unit.startsWith('kg') ? 0.001 : 1;

/** activity x factor value, converted to kg CO2e. */
export const toKg = (amount: number, factor: { value: number; unit: string }): number =>
  finite(amount, 'activity amount') * finite(factor.value, 'factor value') * kgPerFactorUnit(factor.unit);

export type ScopeTotals = { s1: number; s2: number; s3: number; total: number };

export function totalByScope(entries: ActivityEntry[]): ScopeTotals {
  const totals: ScopeTotals = { s1: 0, s2: 0, s3: 0, total: 0 };
  for (const entry of entries) {
    const kg = toKg(entry.amount, entry.factor);
    if (entry.factor.scope === 1) totals.s1 += kg;
    else if (entry.factor.scope === 2) totals.s2 += kg;
    else totals.s3 += kg;
    totals.total += kg;
  }
  return totals;
}

export const kgToTonnes = (kg: number): number => finite(kg, 'kg') / 1000;

export const percentOf = (part: number, whole: number): number => {
  finite(part, 'part');
  const base = finite(whole, 'whole');
  return base > 0 ? (part / base) * 100 : 0;
};

/** Split a gross tonnage by the sample registry's S1:S2:S3 shares. */
export const splitScopes = (grossTonnes: number, shares: readonly [number, number, number]) => {
  finite(grossTonnes, 'gross tonnes');
  return { s1: grossTonnes * shares[0], s2: grossTonnes * shares[1], s3: grossTonnes * shares[2] };
};

/** t CO2e per full-time equivalent (the registry intensity column). */
export const intensityPerFte = (grossTonnes: number, fte: number): number =>
  fte > 0 ? finite(grossTonnes, 'gross tonnes') / fte : 0;

export type Tier = 'LOW' | 'MODERATE' | 'HIGH';

/** Receipt tier stamp (DESIGN.md §6.2): <3.0 LOW, 3.0-7.0 MODERATE, >7.0 HIGH. */
export function classifyTier(kg: number): Tier {
  const net = finite(kg, 'kg');
  return net < 3 ? 'LOW' : net <= 7 ? 'MODERATE' : 'HIGH';
}

/** Receipt net = sum of item lines. Offsets are not netted: DESIGN.md §8 removes the offset row. */
export const receiptNet = (lines: readonly { kg: number }[]): number =>
  lines.reduce((total, line) => total + finite(line.kg, 'line kg'), 0);

/** Parse a text amount from a number field; anything not a finite number >= 0 is rejected. */
export const validateAmount = (raw: string): { ok: boolean; value: number } => {
  const trimmed = raw.trim();
  if (trimmed === '') return { ok: false, value: 0 };
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) && parsed >= 0 ? { ok: true, value: parsed } : { ok: false, value: 0 };
};
