// Struk Karbon daily-state shape and entry selection (pure, no formatting).
import { findFactor } from "../data/factors";
import type { ActivityEntry } from "./emissions";

export type CommuteModeId =
  | "commute-walk-bike"
  | "commute-rail-transit"
  | "commute-e-scooter"
  | "commute-motorcycle"
  | "commute-car";

export const COMMUTE_MODE_IDS: CommuteModeId[] = [
  "commute-walk-bike",
  "commute-rail-transit",
  "commute-e-scooter",
  "commute-motorcycle",
  "commute-car",
];

export interface DietCounts {
  beef: number;
  poultry: number;
  eggs: number;
  plant: number;
}

export interface StrukState {
  handle: string;
  modeId: CommuteModeId;
  distanceKm: number;
  diet: DietCounts;
  acHours: number;
  wsHours: number;
  parcels: number;
  cups: number;
}

export const defaultStrukState: StrukState = {
  handle: "",
  modeId: "commute-rail-transit",
  distanceKm: 24.5,
  diet: { beef: 0, poultry: 1, eggs: 0, plant: 1 },
  acHours: 5,
  wsHours: 8,
  parcels: 1,
  cups: 1,
};

function mustFind(id: string) {
  const factor = findFactor(id);
  if (!factor) throw new Error(`unknown struk factor ${id}`);
  return factor;
}

// Zero-amount lines are omitted so the receipt only itemises what happened.
export function buildStrukEntries(state: StrukState): ActivityEntry[] {
  const entries: ActivityEntry[] = [];
  if (state.distanceKm > 0) {
    entries.push({ key: "commute", factor: mustFind(state.modeId), amount: state.distanceKm });
  }
  const diet: [keyof DietCounts, string][] = [
    ["beef", "diet-beef-lamb"],
    ["poultry", "diet-poultry-fish"],
    ["eggs", "diet-eggs"],
    ["plant", "diet-plant-tofu"],
  ];
  for (const [slot, id] of diet) {
    if (state.diet[slot] > 0) {
      entries.push({ key: `diet-${slot}`, factor: mustFind(id), amount: state.diet[slot] });
    }
  }
  if (state.acHours > 0) {
    entries.push({ key: "ac", factor: mustFind("power-ac"), amount: state.acHours });
  }
  if (state.wsHours > 0) {
    entries.push({ key: "ws", factor: mustFind("power-workstation"), amount: state.wsHours });
  }
  if (state.parcels > 0) {
    entries.push({ key: "parcels", factor: mustFind("goods-parcel"), amount: state.parcels });
  }
  if (state.cups > 0) {
    entries.push({ key: "cups", factor: mustFind("goods-cup"), amount: state.cups });
  }
  return entries;
}
