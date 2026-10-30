// Labelled fictional sample dataset (NOT real peer data, see DESIGN.md §8).
export type Typology = "ARCHITECTURE" | "DIGITAL LAB" | "EDITORIAL" | "INDUSTRIAL";
export type AssuranceTier = "REPORTED" | "REDUCTION TRACK" | "UNREVIEWED";
export type FteScale = "1–25" | "25–100" | "100+";

export interface SampleStudio {
  code: string;
  practice: string;
  classification: Typology;
  fte: number;
  grossTonnes: number;
  shares: [number, number, number];
  tier: AssuranceTier;
}

export const sampleStudios: SampleStudio[] = [
  { code: "ST-8801", practice: "Meridian Atelier", classification: "ARCHITECTURE", fte: 18, grossTonnes: 38.2, shares: [0.04, 0.22, 0.74], tier: "REPORTED" },
  { code: "ST-9412", practice: "Nordlicht Studio", classification: "DIGITAL LAB", fte: 45, grossTonnes: 98.4, shares: [0, 0.15, 0.85], tier: "REPORTED" },
  { code: "ST-7720", practice: "Kontext & Form", classification: "EDITORIAL", fte: 32, grossTonnes: 64.1, shares: [0.02, 0.31, 0.67], tier: "REDUCTION TRACK" },
  { code: "ST-3109", practice: "Basel Workshop", classification: "DIGITAL LAB", fte: 12, grossTonnes: 26.1, shares: [0, 0.08, 0.92], tier: "REPORTED" },
  { code: "ST-6421", practice: "Oslo Collective", classification: "INDUSTRIAL", fte: 85, grossTonnes: 194.8, shares: [0.11, 0.18, 0.71], tier: "REPORTED" },
];

export const fteScaleOf = (fte: number): FteScale => {
  if (fte <= 25) return "1–25";
  if (fte <= 100) return "25–100";
  return "100+";
};

export const typologyValues: Typology[] = [
  "ARCHITECTURE",
  "DIGITAL LAB",
  "EDITORIAL",
  "INDUSTRIAL",
];

export const tierValues: AssuranceTier[] = [
  "REPORTED",
  "REDUCTION TRACK",
  "UNREVIEWED",
];

export const scaleValues: FteScale[] = ["1–25", "25–100", "100+"];
