// DHL route metadata: the nested route must not inherit the Methodology title.
import { describe, expect, it } from "vitest";
import { copyFor, metaFor } from "./i18n";

describe("DHL route metadata", () => {
  it("uses the DHL copy for the nested methodology route", () => {
    for (const lang of ["id", "en"] as const) {
      const copy = copyFor(lang);
      expect(metaFor(copy, "/methodology/dhl")).toEqual({
        title: copy.dhl.metaTitle,
        description: copy.dhl.metaDescription,
      });
      expect(metaFor(copy, "/methodology/dhl/")).toEqual({
        title: copy.dhl.metaTitle,
        description: copy.dhl.metaDescription,
      });
    }
  });
});
