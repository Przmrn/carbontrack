// Indonesian glossary coverage: every abbreviation has a translation and no
// translation refers to an abbreviation that no longer exists.
import { describe, expect, it } from "vitest";
import { glossary } from "./index";
import { glossaryId } from "./id";

describe("glossaryId", () => {
  const abbreviations = glossary.flatMap((group) =>
    group.entries.map((entry) => entry.abbr),
  );

  it("covers every glossary entry", () => {
    for (const abbr of abbreviations) {
      expect(glossaryId[abbr], `missing Indonesian definition for ${abbr}`).toBeDefined();
    }
  });

  it("has no orphan translations", () => {
    expect(Object.keys(glossaryId).sort()).toEqual([...abbreviations].sort());
  });

  it("does not leave empty definitions", () => {
    for (const [abbr, entry] of Object.entries(glossaryId)) {
      expect(entry.expansion.trim(), `empty expansion for ${abbr}`).not.toBe("");
      expect(entry.plain.trim(), `empty plain text for ${abbr}`).not.toBe("");
    }
  });
});
