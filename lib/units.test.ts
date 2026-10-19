// Tests for the locale-aware parsing and the two Calculator conversions.
import { describe, expect, it } from "vitest";
import { fromAnnual, kwhToMwh, mwhToKwh, parseAmount, toAnnual } from "./units";

describe("parseAmount (Indonesian)", () => {
  it("reads 1.500 as one thousand five hundred", () => {
    expect(parseAmount("1.500", "id")).toEqual({ ok: true, value: 1500 });
    expect(parseAmount("12.345.678", "id")).toEqual({ ok: true, value: 12345678 });
  });

  it("reads the comma as the decimal separator", () => {
    expect(parseAmount("1,5", "id")).toEqual({ ok: true, value: 1.5 });
    expect(parseAmount("1.500,25", "id")).toEqual({ ok: true, value: 1500.25 });
    expect(parseAmount(",5", "id")).toEqual({ ok: true, value: 0.5 });
  });

  it("reads a lone dot with up to three digits as a decimal", () => {
    expect(parseAmount("1.5", "id")).toEqual({ ok: true, value: 1.5 });
    expect(parseAmount("12.34", "id")).toEqual({ ok: true, value: 12.34 });
  });

  it("tolerates a trailing separator while typing", () => {
    expect(parseAmount("1.", "id")).toEqual({ ok: true, value: 1 });
    expect(parseAmount("1.500,", "id")).toEqual({ ok: true, value: 1500 });
  });
});

describe("parseAmount (English)", () => {
  it("reads 1,500 as one thousand five hundred", () => {
    expect(parseAmount("1,500", "en")).toEqual({ ok: true, value: 1500 });
    expect(parseAmount("1,500.25", "en")).toEqual({ ok: true, value: 1500.25 });
  });

  it("reads a lone dot as the decimal separator", () => {
    expect(parseAmount("12.5", "en")).toEqual({ ok: true, value: 12.5 });
    expect(parseAmount("250", "en")).toEqual({ ok: true, value: 250 });
  });
});

describe("parseAmount rejection", () => {
  it("rejects negatives", () => {
    expect(parseAmount("-5", "id")).toEqual({ ok: false, reason: "negative" });
    expect(parseAmount("-1.500", "en")).toEqual({ ok: false, reason: "negative" });
  });

  it("rejects empty input", () => {
    expect(parseAmount("", "id")).toEqual({ ok: false, reason: "empty" });
    expect(parseAmount("   ", "en")).toEqual({ ok: false, reason: "empty" });
  });

  it("rejects garbage without throwing", () => {
    expect(parseAmount("abc", "id")).toEqual({ ok: false, reason: "invalid" });
    expect(parseAmount("1a5", "en")).toEqual({ ok: false, reason: "invalid" });
    expect(parseAmount("1,5,5", "id")).toEqual({ ok: false, reason: "invalid" });
    expect(parseAmount("1..5", "id")).toEqual({ ok: false, reason: "invalid" });
  });
});

describe("conversions", () => {
  it("converts monthly to annual and back", () => {
    expect(toAnnual(250, "month")).toBe(3000);
    expect(toAnnual(250, "year")).toBe(250);
    expect(fromAnnual(3000, "month")).toBe(250);
    expect(fromAnnual(3000, "year")).toBe(3000);
  });

  it("converts kWh to MWh and back", () => {
    expect(kwhToMwh(250)).toBe(0.25);
    expect(mwhToKwh(0.25)).toBe(250);
  });
});
