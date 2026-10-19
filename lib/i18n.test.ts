// Language selection: Indonesian by default, ?lang= parsing and English fallback.
import { describe, expect, it } from "vitest";
import { copyFor, DEFAULT_LANGUAGE, intlLocale, parseLang } from "./i18n";

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

  it("falls back to English for sections not translated yet", () => {
    expect(copyFor("id").dossier.title).toBe(copyFor("en").dossier.title);
  });
});

describe("intlLocale", () => {
  it("maps to the Intl locale", () => {
    expect(intlLocale("id")).toBe("id-ID");
    expect(intlLocale("en")).toBe("en");
  });
});
