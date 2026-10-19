// Glossary assembly: one group per file, exported in reading order for /glossary.
import { accountingEntries } from "./accounting";
import { formatEntries } from "./formats";
import { methodEntries } from "./methods";
import { sourceEntries } from "./sources";
import { unitEntries } from "./units";
import type { GlossaryGroup, GlossaryGroupId } from "./types";

export const glossary: GlossaryGroup[] = [
  { id: "accounting", entries: accountingEntries },
  { id: "units", entries: unitEntries },
  { id: "methods", entries: methodEntries },
  { id: "sources", entries: sourceEntries },
  { id: "formats", entries: formatEntries },
];

export const glossaryEntryCount: number = glossary.reduce(
  (total, group) => total + group.entries.length,
  0,
);

export const glossaryAbbreviations: string[] = glossary.flatMap((group) =>
  group.entries.map((entry) => entry.abbr),
);

export type { GlossaryEntry, GlossaryGroup, GlossaryGroupId, GlossaryModule } from "./types";

/** All group ids, used to keep the copy file in step with the data. */
export const glossaryGroupIds: GlossaryGroupId[] = glossary.map((group) => group.id);