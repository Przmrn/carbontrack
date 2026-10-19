// Types for the abbreviation glossary shown on /glossary.
export type GlossaryGroupId = "accounting" | "units" | "methods" | "sources" | "formats";

/** Which part of the app the abbreviation shows up in. */
export type GlossaryModule = "app" | "calculator" | "struk" | "registry" | "methodology" | "dossier";

export interface GlossaryEntry {
  /** The abbreviation exactly as the app writes it. */
  abbr: string;
  /** What the letters stand for. */
  expansion: string;
  /** What it is, in plain language. */
  plain: string;
  where: GlossaryModule;
}

export interface GlossaryGroup {
  id: GlossaryGroupId;
  entries: GlossaryEntry[];
}