// Tests for Struk entry selection (zero-amount lines are omitted).
import { describe, expect, it } from "vitest";
import { buildStrukEntries, defaultStrukState } from "./struk";

describe("buildStrukEntries", () => {
  it("builds the default day (rail, poultry, plant, AC, workstation, parcel, cups)", () => {
    const keys = buildStrukEntries(defaultStrukState).map((entry) => entry.key);
    expect(keys).toEqual(["commute", "diet-poultry", "diet-plant", "ac", "ws", "parcels", "cups"]);
  });

  it("omits zero-amount lines", () => {
    const entries = buildStrukEntries({
      ...defaultStrukState,
      distanceKm: 0,
      diet: { beef: 0, poultry: 0, eggs: 0, plant: 0 },
      acHours: 0,
      wsHours: 0,
      parcels: 0,
      cups: 0,
    });
    expect(entries).toEqual([]);
  });

  it("switches the commute factor with the mode", () => {
    const entries = buildStrukEntries({ ...defaultStrukState, modeId: "commute-car" });
    expect(entries[0].factor.id).toBe("commute-car");
  });
});
