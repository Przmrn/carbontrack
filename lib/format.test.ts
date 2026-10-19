// Tests for locale-aware formatting (en default, id-ID on selection).
import { describe, expect, it } from "vitest";
import { formatAmount, formatFactor, formatKg, formatReceiptDate, formatShare, formatTonnes } from "./format";

describe("formatKg", () => {
  it("always shows 2 decimals", () => {
    expect(formatKg(10625)).toBe("10,625.00");
    expect(formatKg(10625, "id-ID")).toBe("10.625,00");
  });
});

describe("formatTonnes", () => {
  it("formats tonnes like kg", () => {
    expect(formatTonnes(482.64)).toBe("482.64");
  });
});

describe("formatAmount", () => {
  it("groups integers per locale", () => {
    expect(formatAmount(12500)).toBe("12,500");
    expect(formatAmount(12500, "id-ID")).toBe("12.500");
    expect(formatAmount(24.5, "id-ID")).toBe("24,5");
  });
});

describe("formatFactor", () => {
  it("keeps up to 4 decimals", () => {
    expect(formatFactor(0.1825)).toBe("0.1825");
    expect(formatFactor(0.85)).toBe("0.85");
  });
});

describe("formatReceiptDate", () => {
  it("renders a short day-month-year stamp", () => {
    expect(formatReceiptDate(new Date(2024, 10, 14))).toBe("14 Nov 2024");
  });
});
describe("formatShare", () => {
  it("formats fractions as percent", () => {
    expect(formatShare(0.1089)).toBe("10.89%");
    expect(formatShare(0.1089, "id-ID")).toBe("10,89%");
  });
});
