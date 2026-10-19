// Tests for the real SHA-256 integrity checksum (WebCrypto).
import { describe, expect, it } from "vitest";
import { sha256Hex, shortHash } from "./checksum";

describe("sha256Hex", () => {
  it("matches the known SHA-256 of 'abc'", async () => {
    await expect(sha256Hex("abc")).resolves.toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });

  it("is deterministic for the same payload", async () => {
    expect(await sha256Hex("payload")).toBe(await sha256Hex("payload"));
  });
});

describe("shortHash", () => {
  it("abbreviates long hex without losing ends", () => {
    expect(shortHash("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")).toBe(
      "ba7816…15ad",
    );
  });
});
