// Language selection: Indonesian by default, ?lang= parsing and English fallback.
import { describe, expect, it } from "vitest";
import { calculatorFactors, strukFactors } from "../data/factors";
import { copyFor, DEFAULT_LANGUAGE, intlLocale, metaFor, parseLang } from "./i18n";

describe("parseLang", () => {
  it("accepts only en and id", () => {
    expect(parseLang("?lang=en")).toBe("en");
    expect(parseLang("?lang=id")).toBe("id");
    expect(parseLang("?lang=fr")).toBeNull();
    expect(parseLang("")).toBeNull();
  });
});

describe("copyFor", () => {
  it("defaults to Indonesian and keeps English available", () => {
    expect(DEFAULT_LANGUAGE).toBe("id");
    expect(copyFor("id").calculator.ledger.tag).toBe("Total emisi per tahun");
    expect(copyFor("en").calculator.ledger.tag).toBe("Total emissions per year");
  });

  it("translates every product section, not only the calculator", () => {
    expect(copyFor("id").dossier.title).toBe("LAPORAN EMISI TAHUNAN (A4)");
    expect(copyFor("id").methodology.title).toBe("CARA ANGKA INI BEKERJA");
    expect(copyFor("id").registry.title).toBe("BENCHMARK CONTOH");
    expect(copyFor("id").glossary.title).toBe("GLOSARIUM");
    expect(copyFor("en").dossier.title).toBe("ANNUAL EMISSIONS REPORT (A4)");
  });
});

describe("intlLocale", () => {
  it("maps to the Intl locale", () => {
    expect(intlLocale("id")).toBe("id-ID");
    expect(intlLocale("en")).toBe("en");
  });
});

describe("metaFor", () => {
  it("returns the page title and description in the active language", () => {
    expect(metaFor(copyFor("id"), "/struk").title).toBe("Struk Karbon — C—METRIC");
    expect(metaFor(copyFor("en"), "/struk").title).toBe("Struk Karbon — C—METRIC");
    expect(metaFor(copyFor("id"), "/dossier").title).toBe("Ekspor Audit — C—METRIC");
    expect(metaFor(copyFor("en"), "/dossier").title).toBe("Audit Export — C—METRIC");
    expect(metaFor(copyFor("id"), "/methodology/").title).toBe("Metodologi — C—METRIC");
  });
});

describe("factor labels", () => {
  it("gives every factor a non-empty Indonesian label", () => {
    for (const factor of [...strukFactors, ...calculatorFactors]) {
      expect(factor.labelId?.trim(), `missing Indonesian label for ${factor.id}`).not.toBe("");
    }
  });
});
