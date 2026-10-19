// Data-integrity tests for the glossary: unique terms, complete definitions,
// and copy keys that match the data (so /glossary never renders a blank cell).
import { describe, expect, it } from "vitest";
import { glossary, glossaryAbbreviations, glossaryEntryCount, glossaryGroupIds } from "../data/glossary";
import { en } from "../content/en";

describe("glossary data", () => {
  it("has no duplicate abbreviations across groups", () => {
    const keys = glossaryAbbreviations.map((abbr) => abbr.trim().toLowerCase());
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("gives every entry an abbreviation, an expansion and a plain explanation", () => {
    for (const group of glossary) {
      expect(group.entries.length).toBeGreaterThan(0);
      for (const entry of group.entries) {
        expect(entry.abbr.trim().length).toBeGreaterThan(0);
        expect(entry.expansion.trim().length).toBeGreaterThan(0);
        expect(entry.plain.trim().length).toBeGreaterThan(20);
      }
    }
  });

  it("counts every entry exactly once", () => {
    expect(glossaryEntryCount).toBe(
      glossary.reduce((total, group) => total + group.entries.length, 0),
    );
  });

  it("has copy for every group id and every module label", () => {
    for (const id of glossaryGroupIds) {
      expect(en.glossary.groups[id]).toBeTruthy();
    }
    for (const group of glossary) {
      for (const entry of group.entries) {
        expect(en.glossary.where[entry.where]).toBeTruthy();
      }
    }
  });
});