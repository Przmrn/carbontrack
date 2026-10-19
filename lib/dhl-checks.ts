// Reconciliation checks on DHL's published figures (DHL Group 2025 Statbook). Pure functions, no React.
import { DHL, REVENUE_EUR_M, TARGETS, type Year } from '../data/dhl-fy2025';

export type Check = {
  id: string; label: string; year: Year;
  computed: number; reported: number; diff: number; tolerance: number;
  status: 'ok' | 'gap'; note?: string;
};

type Key = keyof typeof DHL;
const get = (k: Key, y: Year): number => {
  const v = (DHL[k].v as Partial<Record<Year, number | null>>)[y];
  if (v == null) throw new Error(`missing ${String(k)} ${y}`);
  return v;
};
const mk = (id: string, label: string, year: Year, computed: number, reported: number, tolerance: number, note?: string): Check => {
  const diff = +(reported - computed).toFixed(4);
  return { id, label, year, computed: +computed.toFixed(4), reported, diff, tolerance, status: Math.abs(diff) <= tolerance ? 'ok' : 'gap', note };
};

export function runChecks(year: Year): Check[] {
  const out: Check[] = [];
  const g = (k: Key) => get(k, year);
  out.push(mk('s3-cats', 'Scope 3 = cat 1+2+3+4+6+7', year, g('cat1') + g('cat2') + g('cat3') + g('cat4') + g('cat6') + g('cat7'), g('scope3_total'), 0.015));
  out.push(mk('s3-log', 'Logistics Scope 3 = cat 3+4+6', year, g('cat3') + g('cat4') + g('cat6'), g('scope3_logistics'), 0.075, 'Years before 2018 use 1-decimal inputs, so rounding can reach ~0.07.'));
  out.push(mk('s12-mkt', 'Scopes 1+2 (market) = S1 + S2 market', year, g('scope1') + g('scope2_market'), g('s1s2_market'), 0.015));
  out.push(mk('logistics', 'Logistics-related = S1 + S2 market + S3 (3,4,6)', year, g('scope1') + g('scope2_market') + g('scope3_logistics'), g('logistics_total'), 0.025));
  if (year >= '2023') {
    out.push(mk('total-mkt', 'Total (market) = S1 + S2 market + S3', year, g('scope1') + g('scope2_market') + g('scope3_total'), g('total_market'), 0.015));
    out.push(mk('total-loc', 'Total (location) = S1 + S2 location + S3', year, g('scope1') + g('scope2_location') + g('scope3_total'), g('total_location'), 0.015,
      'UNRECONCILED: reported is consistently ~0.10 Mt higher in 2023, 2024 and 2025. Cause not stated by DHL. Possible reason (unconfirmed): category 3 upstream is on a market basis in the sum but not in the location total.'));
    const rev = REVENUE_EUR_M[year]!;
    out.push(mk('int-mkt', 'Intensity (market) = total / revenue [g/EUR]', year, (g('total_market') * 1e12) / (rev * 1e6), g('intensity_market'), 1));
    out.push(mk('int-loc', 'Intensity (location) = total / revenue [g/EUR]', year, (g('total_location') * 1e12) / (rev * 1e6), g('intensity_location'), 1));
  }
  if (year >= '2021') {
    out.push(mk('sbt2050', 'SBT 2050 total = logistics + cat 1 + cat 2', year, g('logistics_total') + g('cat1') + g('cat2'), g('total_sbt2050'), 0.025));
  }
  if (year >= '2024') {
    out.push(mk('fossil-mode', 'Fossil energy = air + road + buildings [GWh]', year, g('fossil_air') + g('fossil_road') + g('fossil_buildings'), g('energy_fossil'), 1.5));
    out.push(mk('renew-mode', 'Renewable energy = air + road + buildings [GWh]', year, g('renewable_air') + g('renewable_road') + g('renewable_buildings'), g('renewable_total'), 1.5));
    out.push(mk('energy-total', 'Total energy = fossil + nuclear + renewable [GWh]', year, g('energy_fossil') + g('nuclear') + g('renewable_total'), g('energy_total'), 1.5));
    out.push(mk('rde', 'Realized Decarbonization Effects = sum of 4 measures [kt]', year, g('rde_sustainable_fuels') + g('rde_electrification') + g('rde_renewable_electricity') + g('rde_further'), g('rde'), 1.5));
  }
  return out;
}

/** Implied average factors (plausibility only, NOT DHL's published factors). */
export function impliedFactors(year: '2024' | '2025') {
  const fuelGwh = get('fossil_crude', year) + get('fossil_gas', year);
  const purchasedGwh = get('fossil_purchased', year) + get('renewable_purchased', year);
  return {
    scope1KgPerKwhFossilFuel: (get('scope1', year) * 1e9) / (fuelGwh * 1e6),
    scope2LocationKgPerKwhPurchased: (get('scope2_location', year) * 1e9) / (purchasedGwh * 1e6),
    scope2MarketOverLocation: get('scope2_market', year) / get('scope2_location', year),
  };
}

export function targetProgress() {
  const cur = get('logistics_total', '2025');
  return {
    logisticsVsBasePct: ((cur - TARGETS.base2021_logistics) / TARGETS.base2021_logistics) * 100,
    s1s2VsBasePct: ((get('s1s2_market', '2025') - TARGETS.base2021_s1s2_market) / TARGETS.base2021_s1s2_market) * 100,
    s3LogVsBasePct: ((get('scope3_logistics', '2025') - TARGETS.base2021_s3_logistics) / TARGETS.base2021_s3_logistics) * 100,
    gapTo2030Mt: cur - TARGETS.target2030_logistics,
  };
}
