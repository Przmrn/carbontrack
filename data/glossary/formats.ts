// Glossary: the export formats the Dossier can produce.
import type { GlossaryEntry } from "./types";

export const formatEntries: GlossaryEntry[] = [
  {
    abbr: "PDF",
    expansion: "Portable Document Format",
    plain:
      "Fixed-layout print format. The Dossier's A4 sheet is printed from your own browser, so nothing is uploaded.",
    where: "dossier",
  },
  {
    abbr: "A4",
    expansion: "A4 paper, 210 × 297 mm",
    plain: "The paper size the Dossier preview reproduces at 1:1.",
    where: "dossier",
  },
  {
    abbr: "CSV",
    expansion: "Comma-separated values",
    plain:
      "A plain-text table, one line per activity row. Opens in any spreadsheet program.",
    where: "dossier",
  },
  {
    abbr: "JSON",
    expansion: "JavaScript Object Notation",
    plain:
      "A structured text export that carries every factor and its status field, for reuse in other tools.",
    where: "dossier",
  },
  {
    abbr: "XBRL",
    expansion: "eXtensible Business Reporting Language",
    plain:
      "A regulatory tagging format used for filings. It is disabled in this version.",
    where: "dossier",
  },
  {
    abbr: "PNG",
    expansion: "Portable Network Graphics",
    plain: "The image format of the downloaded carbon receipt and of the 9:16 story card.",
    where: "struk",
  },
];