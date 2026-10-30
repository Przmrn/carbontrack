// Typed emission factors. Single source of truth: every screen reads from here.
// Struk values follow the PRD via DESIGN.md §7 (all unverified, source null).
// calculatorFactors below are LEGACY mockup-derived demo values kept only for
// the pre-DHL Calculator that is still on screen: DESIGN.md §7 says values enter
// here only with an owner-supplied value + source + year, so Phase 3 replaces
// this set. Never cite them as real sources.
export type Scope = 1 | 2 | 3;

export interface EmissionFactor {
  id: string;
  label: string;
  /** Indonesian label, shown when the header language is ID. */
  labelId?: string;
  unit: string;
  value: number;
  scope: Scope;
  source: string | null;
  year: number | null;
  verified: boolean;
}

// Scopes for personal Struk lines are indicative only: purchased energy (AC,
// workstation) maps to Scope 2, everything else to Scope 3.
export const strukFactors: EmissionFactor[] = [
  { id: "commute-walk-bike", label: "Walk / Bike", labelId: "Jalan / Sepeda", unit: "g/km", value: 0, scope: 3, source: null, year: null, verified: false },
  { id: "commute-rail-transit", label: "Rail / Transit", labelId: "Kereta / Transit", unit: "g/km", value: 28, scope: 3, source: null, year: null, verified: false },
  { id: "commute-e-scooter", label: "E-Scooter", labelId: "Skuter listrik", unit: "g/km", value: 45, scope: 3, source: null, year: null, verified: false },
  { id: "commute-motorcycle", label: "Motorcycle", labelId: "Motor", unit: "g/km", value: 103, scope: 3, source: null, year: null, verified: false },
  { id: "commute-car", label: "Car", labelId: "Mobil", unit: "g/km", value: 192, scope: 3, source: null, year: null, verified: false },
  { id: "diet-beef-lamb", label: "Beef / Lamb", labelId: "Daging sapi / kambing", unit: "kg/serving", value: 3.5, scope: 3, source: null, year: null, verified: false },
  { id: "diet-poultry-fish", label: "Poultry / Fish", labelId: "Unggas / ikan", unit: "kg/serving", value: 0.85, scope: 3, source: null, year: null, verified: false },
  { id: "diet-eggs", label: "Eggs", labelId: "Telur", unit: "kg/serving", value: 0.3, scope: 3, source: null, year: null, verified: false },
  { id: "diet-plant-tofu", label: "Plant / Tofu", labelId: "Nabati / tahu", unit: "kg/serving", value: 0.15, scope: 3, source: null, year: null, verified: false },
  { id: "power-ac", label: "Air Conditioning", labelId: "Pendingin ruangan", unit: "kg/h", value: 0.65, scope: 2, source: null, year: null, verified: false },
  { id: "power-workstation", label: "Workstation", labelId: "Komputer kerja", unit: "kg/h", value: 0.06, scope: 2, source: null, year: null, verified: false },
  { id: "goods-parcel", label: "Parcel", labelId: "Paket", unit: "kg", value: 0.85, scope: 3, source: null, year: null, verified: false },
  { id: "goods-cup", label: "Single-use cup", labelId: "Gelas sekali pakai", unit: "kg", value: 0.15, scope: 3, source: null, year: null, verified: false },
];

export function findFactor(id: string): EmissionFactor | undefined {
  return strukFactors.find((factor) => factor.id === id);
}

// Calculator factors transcribed from the calculator mockup (all unverified
// demo). Losers from the DESIGN.md §7 conflict table were deleted per the
// owner's picks: gas 0.202, diesel 2.68, EU grid 251.7 g/kWh. Flight, cloud
// and freight values are derived from the mockup's own activity/result pairs.
export const calculatorFactors: EmissionFactor[] = [
  { id: "gas-natural", label: "Natural Gas", labelId: "Gas bumi", unit: "kg/kWh", value: 0.202, scope: 1, source: "Calculator mockup (unverified)", year: null, verified: false },
  { id: "fleet-diesel", label: "Diesel", labelId: "Solar", unit: "kg/L", value: 2.68, scope: 1, source: "DEFRA 2024 (per mockup, unverified)", year: null, verified: false },
  { id: "fgas-r410a", label: "R-410A Refrigerant", labelId: "Refrigeran R-410A", unit: "kg CO₂e/kg", value: 2088, scope: 1, source: "IPCC AR6 GWP100 (per mockup, unverified)", year: null, verified: false },
  { id: "fgas-hfc134a", label: "HFC-134a", labelId: "HFC-134a", unit: "kg CO₂e/kg", value: 1430, scope: 1, source: "IPCC AR6 GWP100 (per mockup, unverified)", year: null, verified: false },
  { id: "grid-central-europe", label: "Central Europe (GER/CH)", labelId: "Eropa Tengah (JER/CH)", unit: "g/kWh", value: 251.7, scope: 2, source: "IEA/AIB model (per mockup, unverified)", year: null, verified: false },
  { id: "grid-nordic", label: "Nordic", labelId: "Nordik", unit: "g/kWh", value: 42.1, scope: 2, source: "IEA/AIB model (per mockup, unverified)", year: null, verified: false },
  { id: "grid-uk", label: "United Kingdom", labelId: "Britania Raya", unit: "g/kWh", value: 207.3, scope: 2, source: "IEA/AIB model (per mockup, unverified)", year: null, verified: false },
  { id: "grid-us-rfc", label: "US RFC", labelId: "AS RFC", unit: "g/kWh", value: 385.4, scope: 2, source: "IEA/AIB model (per mockup, unverified)", year: null, verified: false },
  { id: "grid-camx", label: "US CAMX", labelId: "AS CAMX", unit: "g/kWh", value: 214.8, scope: 2, source: "IEA/AIB model (per mockup, unverified)", year: null, verified: false },
  { id: "district-heating", label: "District Heating", labelId: "Pemanas distrik", unit: "kg/kWh", value: 0.12, scope: 2, source: "Swiss municipal grid baseline (per mockup, unverified)", year: null, verified: false },
  { id: "flight-short-haul", label: "Short-haul flight", labelId: "Penerbangan jarak dekat", unit: "kg/flight", value: 154.05, scope: 3, source: "Derived from mockup totals (unverified)", year: null, verified: false },
  { id: "flight-medium-haul", label: "Medium-haul flight", labelId: "Penerbangan jarak sedang", unit: "kg/flight", value: 287.5, scope: 3, source: "Derived from mockup totals (unverified)", year: null, verified: false },
  { id: "flight-long-haul", label: "Long-haul flight", labelId: "Penerbangan jarak jauh", unit: "kg/flight", value: 1189.47, scope: 3, source: "Derived from mockup totals (unverified)", year: null, verified: false },
  { id: "cloud-compute", label: "Cloud compute", labelId: "Komputasi cloud", unit: "kg/vCPU-hr", value: 0.15374, scope: 3, source: "Derived from mockup totals (unverified)", year: null, verified: false },
  { id: "freight-intermodal", label: "Intermodal freight", labelId: "Angkutan intermodal", unit: "kg/tonne-km", value: 0.21754, scope: 3, source: "Derived from mockup totals (unverified)", year: null, verified: false },
];

export function findCalculatorFactor(id: string): EmissionFactor | undefined {
  return calculatorFactors.find((factor) => factor.id === id);
}

export function mustCalculatorFactor(id: string): EmissionFactor {
  const factor = findCalculatorFactor(id);
  if (!factor) throw new Error(`unknown calculator factor ${id}`);
  return factor;
}
