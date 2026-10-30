// English copy and row definitions for the DHL Group FY2025 reference page.
export const dhlEn = {
  metaTitle: "DHL Group FY2025 — C—METRIC",
  metaDescription:
    "Published DHL Group FY2025 emissions, methods, reconciliation checks, targets and sources. Not recomputed from activity data.",
  eyebrow: "MODULE 04 // DHL GROUP FY2025",
  title: "DHL GROUP FY2025",
  subtitle: "PUBLISHED FIGURES, METHODS AND RECONCILIATION CHECKS",
  intro:
    "A separate reference page for the figures DHL Group publishes in its 2025 Annual Report and Sustainability Statbook. The page reproduces the published aggregation and checks; it does not recompute the number from activity data.",
  backLink: "BACK TO METHODOLOGY",
  tocLabel: "ON THIS PAGE",
  statementLabel: "PAGE STATEMENT",
  tagsLabel: "HOW TO READ THE TAGS",
  tags: [
    {
      key: "reported",
      text: "Stated by DHL in the named report page or Statbook sheet and row.",
    },
    {
      key: "standard",
      text: "A standard formula named by DHL. The report does not print the arithmetic.",
    },
    {
      key: "calculated",
      text: "Derived, checked or mapped by this page from DHL's published figures.",
    },
  ],
  sections: [
    { id: "dhl-about", n: "01", label: "ABOUT THE REPORTS" },
    { id: "dhl-figures", n: "02", label: "FY2025 HEADLINE FIGURES" },
    { id: "dhl-method", n: "03", label: "HOW DHL CALCULATES IT" },
    { id: "dhl-tableau", n: "04", label: "VISUALIZATION — TABLEAU" },
    { id: "dhl-checks", n: "05", label: "RECONCILIATION CHECKS" },
    { id: "dhl-targets", n: "06", label: "TARGETS AND PROGRESS" },
    { id: "dhl-limits", n: "07", label: "WHAT DHL DOES NOT DISCLOSE" },
    { id: "dhl-mapping", n: "08", label: "MAPPING TO C—METRIC" },
    { id: "dhl-sources", n: "09", label: "SOURCES" },
  ],
  about: {
    title: "ABOUT THE REPORTS",
    intro:
      "The figures on this page come from two publications. The Annual Report carries the Group Sustainability Statement; the Statbook carries the longer series and the sheet-level detail.",
    introTag: "reported",
    facts: [
      {
        label: "ANNUAL REPORT",
        value:
          "DHL Group 2025 Annual Report, 277 printed pages. The Group Sustainability Statement follows ESRS E1.",
        tag: "reported",
      },
      {
        label: "STATBOOK",
        value:
          "DHL Group 2025 Sustainability Statbook, 21 sheets. It is the source for the longer series, energy, targets and division data.",
        tag: "reported",
      },
      {
        label: "PERIOD",
        value: "1 January to 31 December 2025. Base year: 2021.",
        tag: "reported",
      },
      {
        label: "BOUNDARY",
        value:
          "All subsidiaries under control; the same consolidation scope as the financial statements. The joint operation Aerologic is included on operational control.",
        tag: "reported",
      },
      {
        label: "STANDARDS NAMED",
        value:
          "GHG Protocol, ISO 14083 and the GLEC Framework. Factors named: GLEC Framework 3.1, IEA 2024 and DEFRA.",
        tag: "reported",
      },
      {
        label: "STEERING VIEW",
        value: "Well-to-wheel: upstream fuel production is included.",
        tag: "reported",
      },
      {
        label: "SEPARATE LINES",
        value:
          "Offsets are not netted against emissions. Biogenic CO₂ is reported outside Scopes 1–3. Retired carbon credits are reported separately.",
        tag: "reported",
      },
    ],
  },
  figures: {
    title: "FY2025 HEADLINE FIGURES",
    intro:
      "Values are read directly from data/dhl-fy2025.ts. Scope 2 is shown on both bases. Categories 1, 2, 6 and 7 are marked ESTIMATE.",
    caption: "DHL GROUP FY2025 PUBLISHED FIGURES",
    columns: {
      item: "ITEM",
      base: "2021",
      y2024: "2024",
      y2025: "2025",
      unit: "UNIT",
      evidence: "EVIDENCE",
    },
    estimate: "ESTIMATE",
    rows: [
      { key: "scope1", label: "Scope 1 (gross)", tag: "reported", estimate: false },
      {
        key: "scope2_location",
        label: "Scope 2 — location-based",
        tag: "reported",
        estimate: false,
      },
      {
        key: "scope2_market",
        label: "Scope 2 — market-based",
        tag: "reported",
        estimate: false,
      },
      {
        key: "s1s2_market",
        label: "Scopes 1 + 2 — market-based",
        tag: "reported",
        estimate: false,
      },
      { key: "scope3_total", label: "Scope 3 — total", tag: "reported", estimate: false },
      {
        key: "scope3_logistics",
        label: "Scope 3 — logistics-related (Cat. 3 + 4 + 6)",
        tag: "reported",
        estimate: false,
      },
      {
        key: "cat1",
        label: "Scope 3 Cat. 1 — purchased goods and services",
        tag: "reported",
        estimate: true,
      },
      {
        key: "cat2",
        label: "Scope 3 Cat. 2 — capital goods",
        tag: "reported",
        estimate: true,
      },
      {
        key: "cat3",
        label: "Scope 3 Cat. 3 — fuel- and energy-related activities",
        tag: "reported",
        estimate: false,
      },
      {
        key: "cat4",
        label: "Scope 3 Cat. 4 — upstream transportation and distribution",
        tag: "reported",
        estimate: false,
      },
      {
        key: "cat6",
        label: "Scope 3 Cat. 6 — business travel",
        tag: "reported",
        estimate: true,
      },
      {
        key: "cat7",
        label: "Scope 3 Cat. 7 — employee commuting",
        tag: "reported",
        estimate: true,
      },
      { key: "logistics_total", label: "Logistics-related total", tag: "reported", estimate: false },
      { key: "total_location", label: "Total — location-based", tag: "reported", estimate: false },
      { key: "total_market", label: "Total — market-based", tag: "reported", estimate: false },
      { key: "total_sbt2050", label: "SBT 2050 total", tag: "reported", estimate: false },
      {
        key: "intensity_market",
        label: "Intensity — market-based",
        tag: "reported",
        estimate: false,
      },
      {
        key: "intensity_location",
        label: "Intensity — location-based",
        tag: "reported",
        estimate: false,
      },
    ],
    memoCaption: "MEMO LINES — NOT ADDED TO TOTALS",
    memoRows: [
      { key: "biogenic_total", label: "Biogenic CO₂ — total", tag: "reported" },
      { key: "biogenic_s1", label: "Biogenic CO₂ — Scope 1", tag: "reported" },
      { key: "biogenic_s3", label: "Biogenic CO₂ — Scope 3", tag: "reported" },
      { key: "credits_retired", label: "Carbon credits retired", tag: "reported" },
    ],
    note:
      "Biogenic CO₂ and retired credits are separate lines. They are never added to or subtracted from the scopes.",
    noteTag: "calculated",
  },
  method: {
    title: "HOW DHL CALCULATES IT",
    intro:
      "DHL describes consumption-based and activity-based methods. The report names the standards and sources; it does not print the arithmetic.",
    introTag: "reported",
    caption: "PER-SCOPE METHOD SUMMARY",
    columns: {
      part: "PART",
      method: "METHOD",
      data: "DATA",
      cite: "CITE",
      evidence: "EVIDENCE",
    },
    citeNote: "R = reported by DHL. Page numbers are printed pages of the Annual Report.",
    citeTag: "reported",
    standard: {
      label: "STANDARD FORM BEHIND THE METHODS",
      formula: "E = activity × factor",
      body:
        "This is the standard form the calculator follows. DHL reports the methods below; it does not print these formulas.",
      tag: "standard",
    },
    rows: [
      {
        part: "Scope 1",
        method: "Consumption-based: reported fuel × factor.",
        data: "Directly reported fuel consumption from the financial reporting system.",
        cite: "R p.83",
        tag: "reported",
      },
      {
        part: "Scope 2",
        method:
          "Consumption-based: meter readings and invoices × factor. Reported on both location and market bases.",
        data:
          "IEA 2024 factors. Most electricity is covered by energy-attribute certificates (EACs), both bundled and unbundled.",
        cite: "R p.83, p.85",
        tag: "reported",
      },
      {
        part: "Scope 3 Cat. 3",
        method: "Directly reported fuel consumption × upstream factor.",
        data: "Primary data.",
        cite: "R p.83",
        tag: "reported",
      },
      {
        part: "Scope 3 Cat. 4",
        method: "Activity-based: operational activity data × established parameters.",
        data:
          "Clean Cargo for ocean, HBEFA for road, IATA for air; supplier primary data where available; a small part by expenditure-based extrapolation.",
        cite: "R p.83–84",
        tag: "reported",
      },
      {
        part: "Scope 3 Cat. 6",
        method: "Activity-based, using the same parameter families.",
        data: "Operational data.",
        cite: "R p.83",
        tag: "reported",
      },
      {
        part: "Scope 3 Cat. 1 and 2",
        method: "Cost-based extrapolation with DEFRA factors.",
        data: "Spend.",
        cite: "R p.84",
        tag: "reported",
      },
      {
        part: "Scope 3 Cat. 7",
        method:
          "Employee count, company vehicles, German census commuter statistics and DEFRA factors.",
        data: "Estimates.",
        cite: "R p.84",
        tag: "reported",
      },
      {
        part: "Market-based measures",
        method:
          "Savings calculated from the fuel specification or certificate label, using the Smart Freight Centre Voluntary Market-Based Measures Framework. Verified against SAF and biogas registries.",
        data: "Certificates.",
        cite: "R p.80, p.83",
        tag: "reported",
      },
    ],
    quality: {
      title: "DATA QUALITY — SHARE OF EMISSIONS, FY2025",
      tag: "reported",
      groups: [
        {
          title: "SCOPES 1–2",
          rows: [
            { key: "primary_s12", label: "Primary" },
            { key: "secondary_s12", label: "Modelled" },
          ],
        },
        {
          title: "SCOPE 3",
          rows: [
            { key: "primary_s3", label: "Primary" },
            { key: "secondary_s3", label: "Secondary" },
          ],
        },
        {
          title: "SCOPE 3 SECONDARY — SPLIT",
          rows: [
            { key: "modeled_s3", label: "Modelled" },
            { key: "default_s3", label: "Default" },
          ],
        },
      ],
      note:
        "DHL describes uncertainty qualitatively: factor and measurement error for consumption-based data, estimation error for activity-based data. No numeric uncertainty range is published.",
    },
  },
  tableau: {
    title: "VISUALIZATION — TABLEAU PUBLIC",
    intro:
      "The interactive view is embedded separately from this page's data. This page remains the text alternative and the source of the figures below.",
    mobileNote:
      "On mobile, open the visualization in Tableau Public first. The embedded view is below.",
    load: "LOAD VISUALIZATION",
    todo: "TODO: add the Tableau Public share URL and open URL in content/tableau.ts.",
    openTodo: "TODO: add the public Tableau URL in content/tableau.ts.",
    caption: {
      author: "AUTHOR",
      dataSource: "DATA SOURCE",
      updated: "LAST UPDATED",
      missing: "Not supplied",
    },
    iframeTitle: "DHL Group FY2025 emissions visualization on Tableau Public",
    previewAlt: "Static preview of the DHL Group FY2025 Tableau visualization",
    previewMissing: "Preview image not available.",
    error:
      "The iframe reported a load error. The sandbox was kept in place. Check the Tableau URL and network access.",
    compare: {
      title: "NUMBERS THAT MUST MATCH",
      intro: "Six headline figures from data/dhl-fy2025.ts, for comparison with the visualization.",
      columns: { item: "ITEM", value: "VALUE", unit: "UNIT", evidence: "EVIDENCE" },
      noteTag: "calculated",
      rows: [
        { key: "scope1", label: "Scope 1" },
        { key: "scope2_location", label: "Scope 2 — location-based" },
        { key: "scope2_market", label: "Scope 2 — market-based" },
        { key: "scope3_total", label: "Scope 3 — total" },
        { key: "total_location", label: "Total — location-based" },
        { key: "total_market", label: "Total — market-based" },
      ],
    },
  },
  checks: {
    title: "RECONCILIATION CHECKS — FY2025",
    intro:
      "Each row is computed from DHL's published components by lib/dhl-checks.ts. The checks test DHL's aggregation; they do not recompute the emissions from activity data.",
    caption: "FY2025 CHECKS FROM lib/dhl-checks.ts",
    columns: {
      check: "CHECK",
      computed: "COMPUTED",
      reported: "REPORTED",
      diff: "DIFF",
      tolerance: "TOLERANCE",
      status: "STATUS",
      note: "NOTE",
    },
    statusOk: "OK",
    statusGap: "GAP",
    summary: "All checks pass except the documented location-total gap.",
    summaryTag: "calculated",
    gapTitle: "UNRECONCILED: LOCATION-BASED TOTAL",
    gapBody:
      "The reported location-based total is consistently higher than Scope 1 + Scope 2 location-based + Scope 3. DHL does not state the cause. This page keeps the gap visible and does not adjust inputs to close it.",
    gapDiffLabel: "REPORTED − COMPUTED",
    labels: {
      "s3-cats": "Scope 3 = Cat. 1 + 2 + 3 + 4 + 6 + 7",
      "s3-log": "Logistics Scope 3 = Cat. 3 + 4 + 6",
      "s12-mkt": "Scopes 1 + 2 (market) = S1 + S2 market",
      logistics: "Logistics-related = S1 + S2 market + S3 (Cat. 3, 4, 6)",
      "total-mkt": "Total (market) = S1 + S2 market + S3",
      "total-loc": "Total (location) = S1 + S2 location + S3",
      "int-mkt": "Intensity (market) = total / revenue",
      "int-loc": "Intensity (location) = total / revenue",
      sbt2050: "SBT 2050 total = logistics + Cat. 1 + Cat. 2",
      "fossil-mode": "Fossil energy = air + road + buildings",
      "renew-mode": "Renewable energy = air + road + buildings",
      "energy-total": "Total energy = fossil + nuclear + renewable",
      rde: "Realized Decarbonization Effects = sum of four measures",
    },
    notes: {
      "s3-log": "Years before 2018 use one-decimal inputs, so rounding can explain small differences.",
      "total-loc":
        "UNRECONCILED: reported is consistently higher in 2023, 2024 and 2025. DHL does not state the cause. A possible but unconfirmed reason is that Category 3 upstream is on a market basis in the sum but not in the location total.",
    },
    units: {
      "s3-cats": "Mt CO₂e",
      "s3-log": "Mt CO₂e",
      "s12-mkt": "Mt CO₂e",
      logistics: "Mt CO₂e",
      "total-mkt": "Mt CO₂e",
      "total-loc": "Mt CO₂e",
      "int-mkt": "g CO₂e / EUR",
      "int-loc": "g CO₂e / EUR",
      sbt2050: "Mt CO₂e",
      "fossil-mode": "GWh",
      "renew-mode": "GWh",
      "energy-total": "GWh",
      rde: "kt CO₂e",
    },
  },
  targets: {
    title: "TARGETS AND PROGRESS",
    intro:
      "Targets are DHL's published targets. Progress is computed from the published 2021 base and FY2025 figures by targetProgress().",
    introTag: "calculated",
    targetsTitle: "PUBLISHED TARGETS",
    targetCaption: "DHL GROUP TARGETS",
    targetColumns: { label: "TARGET", base: "2021 BASE", value: "TARGET VALUE", evidence: "EVIDENCE" },
    targetUnit: "Mt CO₂e",
    targets: [
      {
        label: "Logistics-related — 2026",
        targetKey: "target2026_logistics",
        baseKey: "base2021_logistics",
        tag: "reported",
      },
      {
        label: "Logistics-related — 2030",
        targetKey: "target2030_logistics",
        baseKey: "base2021_logistics",
        tag: "reported",
      },
      {
        label: "Scopes 1 + 2 (market) — 2030",
        targetKey: "target2030_s1s2_market",
        baseKey: "base2021_s1s2_market",
        tag: "reported",
      },
      {
        label: "Scope 3 logistics — 2030",
        targetKey: "target2030_s3_logistics",
        baseKey: "base2021_s3_logistics",
        tag: "reported",
      },
      {
        label: "SBT 2050 total",
        targetKey: "target2050_total",
        baseKey: "base2021_total_sbt2050",
        tag: "reported",
      },
    ],
    netZero: {
      text: "DHL's target is net zero by 2050. The SBT 2050 total is the published target line.",
      tag: "reported",
    },
    progressTitle: "PROGRESS — 2025 VS 2021 BASE",
    progressCaption: "PROGRESS COMPUTED BY targetProgress()",
    progressColumns: { label: "MEASURE", value: "CHANGE VS 2021", evidence: "EVIDENCE" },
    progress: [
      { key: "logisticsVsBasePct", label: "Logistics-related", tag: "calculated" },
      { key: "s1s2VsBasePct", label: "Scopes 1 + 2 (market)", tag: "calculated" },
      { key: "s3LogVsBasePct", label: "Scope 3 logistics", tag: "calculated" },
    ],
    gapLabel: "STILL TO CUT FOR THE 2030 LOGISTICS TARGET",
    gapTag: "calculated",
    gapUnit: "Mt CO₂e",
    notDecarbonization: {
      title: "NOT LABELLED DECARBONIZATION",
      text:
        "The 2025 fall is not called decarbonization. The published data cannot separate lower activity from lower intensity.",
      tag: "calculated",
    },
    volumeNote: {
      text: "DHL attributes the Scope 3 fall mainly to lower volumes.",
      tag: "reported",
    },
  },
  limits: {
    title: "WHAT DHL DOES NOT DISCLOSE",
    intro:
      "This is our reading of the report's disclosure gaps. It is why the calculator cannot reproduce DHL's total from activity data.",
    introTag: "calculated",
    items: [
      "Emission-factor values per litre, per kWh or per tonne-km. The report names sources only.",
      "The GWP set (AR5 or AR6) and the gas-by-gas split.",
      "Activity volumes (tonne-km, litres) behind Category 4.",
      "Allocation rules for shared transport and for certificates.",
      "A numeric uncertainty range.",
    ],
    itemTag: "calculated",
    conclusion:
      "The case study can reproduce DHL's published aggregation and cross-checks from its published components. It cannot reproduce the logistics total from raw activity data.",
    conclusionTag: "calculated",
    statbookNote:
      "The Statbook does not change this: it adds longer series, divisions and energy data, but no factor values, tonne-km, GWP set or numeric uncertainty range.",
    statbookTag: "calculated",
  },
  mapping: {
    title: "MAPPING TO C—METRIC",
    intro:
      "This is the build's mapping to the calculator. It is not a claim that the calculator reproduces DHL.",
    introTag: "calculated",
    caption: "C—METRIC ELEMENTS AND THEIR DHL REFERENCE",
    columns: { app: "C—METRIC ELEMENT", basedOn: "BASED ON", evidence: "EVIDENCE" },
    rows: [
      {
        app: "Calculator sections 01–05",
        basedOn:
          "DHL-METHODOLOGY §2 table: Scope 1 → Scope 2 (market and location side by side) → Scope 3 logistics (Cat. 3/4/6) → Scope 3 non-logistics (Cat. 1/2/7) → reduction measures.",
        tag: "calculated",
      },
      {
        app: "Ledger",
        basedOn:
          "Total (market), total (location), logistics-related subtotal, mode share, intensity g/EUR, progress versus base year and target.",
        tag: "calculated",
      },
      {
        app: "Show calculation drawer",
        basedOn: "§3 standard formulas, with factor, source and verified flag per line.",
        tag: "calculated",
      },
      {
        app: "Methodology page",
        basedOn: "§1–§3 and §8.",
        tag: "calculated",
      },
      {
        app: "DHL page (this page)",
        basedOn:
          "§4 table from data/dhl-fy2025.ts, §7 checks including the unreconciled location total.",
        tag: "calculated",
      },
      {
        app: "Never-net rules",
        basedOn: "Offsets separate; biogenic CO₂ separate.",
        tag: "calculated",
      },
    ],
    note:
      "Calculator output is not DHL data. C—METRIC factors are demo values unless a source and year are supplied; DHL publishes no factor values.",
    noteTag: "calculated",
  },
  sources: {
    title: "SOURCES",
    intro:
      "Annual Report citations use printed page numbers. Statbook citations are the generated source strings from data/dhl-fy2025.ts.",
    introTag: "reported",
    caption: "ANNUAL REPORT PAGES AND STATBOOK SHEET + ROW",
    columns: {
      item: "ITEM",
      page: "ANNUAL REPORT",
      statbook: "STATBOOK SHEET + ROW",
      evidence: "EVIDENCE",
    },
    rows: [
      { key: "scope1", label: "Scope 1", page: "p.86", statbook: "" },
      { key: "scope2_location", label: "Scope 2 — location-based", page: "p.86", statbook: "" },
      { key: "scope2_market", label: "Scope 2 — market-based", page: "p.86", statbook: "" },
      { key: "s1s2_market", label: "Scopes 1 + 2 — market-based", page: "p.86", statbook: "" },
      { key: "scope3_total", label: "Scope 3 — total", page: "p.86", statbook: "" },
      { key: "scope3_logistics", label: "Scope 3 — logistics-related", page: "p.86", statbook: "" },
      { key: "cat1", label: "Scope 3 Cat. 1", page: "p.86", statbook: "" },
      { key: "cat2", label: "Scope 3 Cat. 2", page: "p.86", statbook: "" },
      { key: "cat3", label: "Scope 3 Cat. 3", page: "p.86", statbook: "" },
      { key: "cat4", label: "Scope 3 Cat. 4", page: "p.86", statbook: "" },
      { key: "cat6", label: "Scope 3 Cat. 6", page: "p.86", statbook: "" },
      { key: "cat7", label: "Scope 3 Cat. 7", page: "p.86", statbook: "" },
      { key: "logistics_total", label: "Logistics-related total", page: "p.86", statbook: "" },
      { key: "total_location", label: "Total — location-based", page: "p.86", statbook: "" },
      { key: "total_market", label: "Total — market-based", page: "p.86", statbook: "" },
      { key: "total_sbt2050", label: "SBT 2050 total", page: "p.86", statbook: "" },
      { key: "intensity_market", label: "Intensity — market-based", page: "p.85", statbook: "" },
      { key: "intensity_location", label: "Intensity — location-based", page: "p.85", statbook: "" },
      { key: "biogenic_total", label: "Biogenic CO₂", page: "p.87", statbook: "" },
      { key: "credits_retired", label: "Carbon credits retired", page: "p.88", statbook: "" },
      { key: "targets", label: "Targets", page: "p.79–80", statbook: "" },
      {
        key: "method",
        label: "Methods and data quality",
        page: "p.83–84",
        statbook: "Statbook GHG Footprint rows 82–88",
      },
      {
        key: "boundary",
        label: "Boundary and standards",
        page: "p.61, p.78, p.83–84",
        statbook: "—",
      },
      { key: "rde", label: "Realized Decarbonization Effects", page: "p.82", statbook: "" },
      { key: "energy_total", label: "Energy", page: "p.88", statbook: "" },
      { key: "divisions", label: "Division split", page: "p.86", statbook: "" },
    ],
    note:
      "The targets sheet in data/dhl-fy2025.ts has no row number, so only the sheet is shown for targets. The report pages are printed page numbers.",
    noteTag: "calculated",
  },
} as const;
