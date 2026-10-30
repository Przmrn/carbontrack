// Exact evidence labels and mandatory disclosures for the DHL report page.
export const DHL_CLAIM_TAGS = {
  reported: "REPORTED BY DHL",
  standard: "STANDARD FORM",
  calculated: "OUR CALCULATION",
} as const;

export type DhlClaimTag = keyof typeof DHL_CLAIM_TAGS;

export const DHL_PAGE_STATEMENT =
  "Published figures from DHL Group's 2025 reports. Not recomputed from activity data. Not an audited document.";

export const DHL_TABLEAU_PRIVACY =
  "The interactive visualization loads from Tableau Public. Loading it contacts Tableau's servers.";

export const DHL_TABLEAU_SEPARATE =
  "The Tableau visualization is separate from this page's data and is not verified by C—METRIC.";

export const DHL_TABLEAU_OPEN = "Open in Tableau Public ↗";

export const DHL_TABLEAU_NOT_LINKED = "Visualization not linked yet";
