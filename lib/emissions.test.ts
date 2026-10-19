import { describe, it, expect } from 'vitest';
import { scope2Market, scope2Location, inventory, progress, scope2Sanity } from './emissions';
import { runChecks, impliedFactors, targetProgress } from './dhl-checks';

const F = (value: number) => ({ id: 't', label: 't', unit: 'u', value, source: null, year: null, verified: false });

describe('emissions', () => {
  it('market-based gives zero for fully certificate-covered kWh', () => {
    expect(scope2Market([{ kwh: 1000, eacKwh: 1000, efResidual: F(0.5) }])).toBe(0);
    expect(scope2Market([{ kwh: 1000, eacKwh: 0, efResidual: F(0.5) }])).toBe(500);
    expect(scope2Location([{ kwh: 1000, efGrid: F(0.4) }])).toBe(400);
  });
  it('rejects EAC > kWh and negatives', () => {
    expect(() => scope2Market([{ kwh: 10, eacKwh: 11, efResidual: F(1) }])).toThrow();
    expect(() => scope2Location([{ kwh: -1, efGrid: F(1) }])).toThrow();
  });
  it('never nets offsets or biogenic', () => {
    const base = { scope1Kg: 100, scope2LocationKg: 50, scope2MarketKg: 10, cat3Kg: 5, cat4Kg: 200, cat6Kg: 1, cat1Kg: 20, cat2Kg: 10, cat7Kg: 2 };
    const a = inventory(base), b = inventory({ ...base, offsetsKg: 999, biogenicKg: 999 });
    expect(b.totalMarket).toBe(a.totalMarket);
    expect(b.separate).toEqual({ offsetsKg: 999, biogenicKg: 999 });
    expect(a.totalMarket).toBe(100 + 10 + 5 + 200 + 1 + 20 + 10 + 2);
    expect(a.logisticsRelated).toBe(100 + 10 + 5 + 200 + 1);
  });
  it('location total can use a separate cat3 basis', () => {
    const base = { scope1Kg: 0, scope2LocationKg: 0, scope2MarketKg: 0, cat3Kg: 10, cat4Kg: 0, cat6Kg: 0, cat1Kg: 0, cat2Kg: 0, cat7Kg: 0 };
    expect(inventory({ ...base, cat3LocationKg: 15 }).totalLocation).toBe(15);
  });
  it('intensity', () => {
    const r = inventory({ scope1Kg: 38.71e9, scope2LocationKg: 0, scope2MarketKg: 0, cat3Kg: 0, cat4Kg: 0, cat6Kg: 0, cat1Kg: 0, cat2Kg: 0, cat7Kg: 0, revenueEur: 82855e6 });
    expect(Math.round(r.intensityGPerEur!.market)).toBe(467);
  });
  it('progress and sanity', () => {
    const p = progress(32.31, 40.22, 28.89, 5);
    expect(p.changeVsBasePct).toBeCloseTo(-19.67, 1);
    expect(p.remainingToTarget).toBeCloseTo(3.42, 2);
    expect(scope2Sanity(1, 2)).not.toBeNull();
  });
});

describe('DHL published figures reconcile', () => {
  it('every check passes except the documented location-total gap', () => {
    for (const y of ['2021', '2022', '2023', '2024', '2025'] as const) {
      for (const c of runChecks(y)) {
        if (c.id === 'total-loc') { expect(c.status).toBe('gap'); expect(c.diff).toBeGreaterThan(0.09); expect(c.diff).toBeLessThan(0.12); }
        else expect(c.status, `${c.id} ${y} diff ${c.diff}`).toBe('ok');
      }
    }
  });
  it('implied factors and target progress', () => {
    expect(impliedFactors('2025').scope1KgPerKwhFossilFuel).toBeCloseTo(0.265, 3);
    expect(impliedFactors('2024').scope1KgPerKwhFossilFuel).toBeCloseTo(0.2646, 3);
    const t = targetProgress();
    expect(t.s1s2VsBasePct).toBeCloseTo(-13.3, 1);
    expect(t.s3LogVsBasePct).toBeCloseTo(-21.1, 1);
    expect(t.gapTo2030Mt).toBeCloseTo(3.42, 2);
  });
});
