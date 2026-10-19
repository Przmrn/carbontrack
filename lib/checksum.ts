// Real SHA-256 via WebCrypto. Labelled "integrity checksum", never attestation.
export async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Short display form ("a1b2c3…9f0e"); full hex stays in the export payload.
export function shortHash(hex: string, head = 6, tail = 4): string {
  if (hex.length <= head + tail) return hex;
  return `${hex.slice(0, head)}…${hex.slice(-tail)}`;
}
