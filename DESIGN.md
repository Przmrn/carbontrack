# C—METRIC: Design Spec (v2, replaces the CarbonTrack spec)

Product: ecological accounting web app, Swiss / International Typographic Style.
Inputs this spec is merged from: `DESIGN.md` (International Ecological Typographic System), `c_metric_project_prd_brief.md`, 7 reference screens, `c_metric_studio_geometric_logo` (SVG).
UI language: **Indonesian by default**, with an `ID | EN` toggle in the header that applies to every product page; English remains available. Struk Karbon keeps Indonesian/English bilingual tier labels (e.g. `RENDAH / LOW`, `SEDANG / MODERATE`). Technical terms (Scope, GHG Protocol, unit symbols) keep their standard forms.

---

## 0. Read first (agent)

1. **Source-of-truth order when files disagree:** this file > the design-system `DESIGN.md` > PRD > screenshots. Screenshots are mockups with bugs (see §9); never copy a visual that breaks a rule here.
2. **This replaces the earlier CarbonTrack spec completely.** The 10 colour directions, the glass-loop 3D object, the lime/peach/rose palettes and the 3D/scroll-motion stack are **dropped**. The new design system explicitly forbids ornament, blur and 3D ("Zero Ornamentation", "zero heavy 3D rendering").
3. **Nothing in this app is verified data.** Emission factors, peer registry, auditor names, hashes and "compliance" badges in the mockups are placeholders. Follow §8 strictly.
4. **One emission-factor file feeds every screen** (§7). No screen may hardcode its own number.
5. **The calculation logic comes from DHL Group FY2025; the layout does not.** Read `docs/DHL-METHODOLOGY.md` before building the Calculator (§6.1) or the Methodology case study (§6.4). It labels what the report states, what is a standard formula, and what was derived.

---

## 1. Principles

1. **Typography and grid are the interface.** No decorative imagery; icons only where they carry meaning.
2. **Structure by hairlines, not cards.** Panels touch edge to edge, separated by 1px rules.
3. **Scale contrast over colour contrast.** Huge metric next to tiny labels.
4. **Instrument feel:** deterministic maths, tabular numbers, every number traceable to a factor + source.
5. **Zero radius, zero shadow, zero blur, zero gradient.**
6. **Instant response.** Sliders and steppers update outputs synchronously (no animated counters).

---

## 2. Brand

- **Logo:** `public/brand/c-metric-logo.svg` (160×48): 48px square frame (1.5px stroke) containing a circle, crosshair and centre dot; wordmark `C—METRIC` (Inter 700, ls −0.04em) and sub-label `STUDIO / LAB` (Inter 500, 8.5px, ls 0.14em, #666). Ink `#111111`. Also build it as an inline React component. The grey "img" boxes in the screenshots are placeholders for this logo.
- Header lockup in app: logo mark + `C—METRIC` / `ECOLOGICAL ACCOUNTING`.
- Footer mark and favicon: the square-circle-crosshair glyph only.

---

## 3. Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `--surface` | `#F9F9F8` | page canvas |
| `--surface-white` | `#FFFFFF` | active workspaces, inputs, receipt, A4 sheet |
| `--surface-inset` | `#F3F4F3` | inset blocks (sliders, steppers, summaries) |
| `--row-hover` | `#F0F0EE` | table row hover |
| `--ink` | `#111111` | text, active borders, primary buttons |
| `--olive` | `#2E382E` | Scope 2, verified/optimised state, button hover |
| `--vermilion` | `#E05333` | alerts, threshold breaches, increases vs baseline. **< 2% of visual weight** |
| `--sage-tint` | `#D4DED2` | subtotal chips, "moderate" badges (from PRD) |
| `--rule` | `#E4E4E2` | all passive 1px borders (PRD's `#DADAD9` is NOT used) |
| `--muted` | `#686865` | labels, units, index numbers |
| `--curtain` | `rgba(17,17,17,.2)` | modal backdrop, flat, no blur |

Scope chips: S1 = 1px `--ink`; S2 = 1px `--olive`; S3 = 1px `--rule` with `--muted` text. Delta: increase = `--vermilion`, decrease/optimised = `--olive`.

### Typography (Inter + JetBrains Mono, loaded with `next/font`, NOT a CDN, NEVER serif)
The PRD says IBM Plex Mono; the design system and the prototype code use **JetBrains Mono**. Use JetBrains Mono.

| Token | Spec |
|---|---|
| display-xl | Inter 600, 80/84, ls −0.04em (mobile 44/48, −0.03em) |
| headline-lg | Inter 500, 48/52, ls −0.03em (mobile 32/36) |
| headline-md | Inter 500, 32/38 |
| headline-sm | Inter 500, 22/28 |
| title-md | Inter 600, 16/22 |
| body-lg / md / sm | Inter 400, 18/28 · 14/22 · 12/18 |
| data-metric | JetBrains Mono 500, 36/40, ls −0.03em (mobile 28/32) |
| label-code | JetBrains Mono 500, 11/14, ls 0.06em, uppercase |
| label-caps | Inter 600, 10/12, ls 0.08em, uppercase |

Rules: every number, input and table figure uses `font-feature-settings:"tnum" 1,"zero" 1`. Section headers get a mono index (`01/ SCOPE 1 EMISSIONS`). Page titles are uppercase as in the screens; body copy stays sentence case. The one giant ledger total (~96px+) is allowed as an extension of `data-metric`.

### Grid and spacing
| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| ≥1280 | 12 | 48 | 24 |
| 768–1279 | 8 | 32 | 16 |
| ≤767 | 4 | 16 | 16 |

Spacing scale: 4 / 8 / 16 / 24 / 48 only. Max content width 1440. The tablet layout is not shown in any screenshot: derive it from the 8-column rule and keep it simple.

### Shape, elevation, motion
- `border-radius: 0` everywhere (override Tailwind's defaults; the prototype's 0.25rem/0.5rem is wrong). Radio and checkbox are squares.
- `box-shadow: none` everywhere, including the A4 preview and mobile cards. Depth = flat tone change + 1px border.
- Focus: swap to a 1px solid `--ink` border, no glow rings. Keep a visible 2px outline for keyboard focus; accessibility wins.
- Motion: instant, or a 100ms colour cut on hover. No scroll animation, no parallax, no 3D. Honour `prefers-reduced-motion`. The one exception is the one-time opening curtain on hard load (§6.1).

---

## 4. Components

- **Primary button:** `--ink` fill, white mono/bold text, 12px 24px. Hover → `--olive`. Label style `[ GENERATE FORMAL AUDIT DOSSIER ↓ ]`.
- **Outline button:** 1px `--ink`, transparent; hover inverts.
- **Tertiary:** mono underline link, 4px offset.
- **Segmented toggle** (cycle, unit, tariff %): bordered row, selected = solid `--ink` + white text.
- **Input:** white, 1px `--rule`, label above in label-caps, value in JetBrains Mono 14px, static unit right-aligned in label-code. Focus → 1px `--ink`.
- **Slider:** flat track, square thumb, live value in mono at right.
- **Stepper:** `[−] n [+]` squares, min 44px touch target on mobile.
- **Chips:** 0 radius, label-code, `2px 6px`, scope colours above.
- **Metric block:** index (`01.1`) top-left, label-caps title, data-metric value, delta marker.
- **Data table:** edge to edge, 1px bottom rules, text left, numbers right, header label-caps on `--surface-inset`.
- **Stacked bar:** 3 segments, S1 `--ink`, S2 `--olive`, S3 `--rule`; percentages inside, must total 100%.
- **Modal/drawer:** white, 1px `--ink` border, `--curtain` backdrop. Use native `<dialog>`.
- **Receipt (Struk Karbon):** white slip, JetBrains Mono, `=====` and dashed separators, itemised rows `NN. label (qty)  value kg`, net balance block, tier stamp (inverted black label), equivalencies, procedural barcode, check-code footer, jagged tear edge made with a CSS mask or SVG. No shadow.
- **Icons:** a small set of inline SVGs only (menu, download, copy, share, check, chevron, user). No icon font.

---

## 5. Global layout

**Header:** logo lockup · static status label (see §8) · five tabs `01 CALCULATOR · 02 STRUK KARBON · 03 REGISTRY & BENCHMARKS · 04 METHODOLOGY · 05 AUDIT EXPORT`. Active tab = white bg + 1px bottom `--ink`, larger label. The mockup nav overflows and truncates at 1280px: use a horizontally scrollable strip on tablet and a menu on mobile.
**Footer:** 4 metadata columns (Origin / Alignment / Math base / Audit hash) + legal strip. Rewrite the "Zürich & Basel", "Swiss Accredited", "VERIFIED" copy per §8.
**Mobile (≤767):** fixed top bar (logo + quick switcher), fixed bottom tab bar `RECEIPT · LEDGER · ANALYSIS · SCOPES`, single column, full-width receipt.

---

## 6. The five modules

### 6.1 Calculator (`/`): plain-language cards

**Revision (2026-10-19), supersedes the activity-list layout.** The Calculator is written for someone who has never heard of a Scope: one card per emission source, plain words, one result line per card. The **calculation structure** still follows DHL Group (consumption-based factors; Scope 2 reported market- and location-based, never netted); the **layout is ours**, not DHL's report.

- Header: section tag, h1 `CALCULATE YOUR EMISSIONS`, one-sentence intro, and `HOW TO USE`.
- Cards, in order: `01 Listrik` (kWh, `PER BULAN | PER TAHUN`, default per bulan; advanced: grid + green share 0/15/50/75/100%), `02 Gas` (kWh; MMBtu only in advanced), `03 Kendaraan` (two diesel fields in litres: vans and cars; period), `04 Penerbangan` (three annual steppers: ≤500 km, 500–3,700 km, >3,700 km), `05 Lainnya` (optional, collapsed by default: district heating, cloud, freight, R-410A, HFC-134a, each with a one-line hint).
- Every card carries `ADA | TIDAK ADA`. **`TIDAK ADA` is an explicit zero; an empty field means "not entered"** and the result line reads `Isi angkanya untuk melihat hasil.`
- Technical units and settings live behind `Pengaturan lanjutan` and the collapsed `Lainnya` group, never in the default visible flow.
- Each card keeps a `Lihat cara hitungnya` disclosure, closed by default: the formula with the user's real numbers, the **derived** scope label (the only place in the Calculator where the word Scope appears), and the factor with source, year and the `DEMO FACTOR / UNVERIFIED` status.
- Electricity also shows the location-based reference in that disclosure, labelled as not added to the total. Offsets and biogenic CO₂ stay separate lines and are never netted.
- Below the cards: a collapsed `SUMBER & ASUMSI` table of included activities, factors and status.
- Result panel, sticky on desktop and a fixed bottom bar on mobile (tap to expand): `Total emisi per tahun` with the number and unit on the same baseline (or `—` when nothing is entered), a persistent strip `ESTIMASI DEMO · faktor emisi belum terverifikasi`, the 3-segment scope bar with plain legends (only when total > 0), and a per-card bar chart (`Emisi per kartu`: sorted biggest first, bar = share of the yearly total, value in t CO₂e and %), then `[ LIHAT LAPORAN ]` (disabled until total > 0), `[ MULAI ULANG ]`, and `[ COBA DENGAN DATA CONTOH ]` only when empty, with a visible sample-data note while it is loaded.
- Below the panel: `Cara hitung mengikuti struktur laporan DHL Group; angka faktor emisi adalah contoh, bukan angka DHL.` The checksum stays on the Dossier, not in this panel.
- First load is empty: no fabricated prefilled numbers, totals or baselines. The sample button loads clearly labelled demo numbers, not the old mockup prefill.
- The Calculator is instant-only: no 3D, no scroll animation, no transitions on numbers. The only exception is the one-time opening curtain (`components/BootCurtain.tsx`): it runs once on a hard load, before any interaction, waits for real page/font readiness (no fake progress, minimum 600ms), never runs on client-side route changes, and is disabled entirely under `prefers-reduced-motion`.
- Language (all product pages): Indonesian first, with an `ID | EN` toggle in the header. Strings live in `content/id.ts` and `content/en.ts` with the same typed keys; `?lang=en` selects English on load, the choice survives client-side navigation in memory, and the URL keeps `?lang=en` so a reload or shared link opens in English. Metadata (`<title>` and description) follows the active language after hydration. Nothing is stored in localStorage.

### 6.2 Struk Karbon (`/struk`): the public, shareable module
- Left sections: A Identity (handle + date), B Commute (5 mode pills + 0–100 km slider), C Diet (4 steppers), D Domestic (AC 0–24 h, workstation 0–18 h sliders), E Consumables (parcel, cups), F collapsed "Coefficient methodology & citation ledger".
- Right sticky: receipt, actions `DOWNLOAD (PNG)` · `9:16 STORY CARD` · `COPY CAPTION`, caption preview box.
- Tier stamp: `< 3.0 kg RENDAH/LOW`, `3.0–7.0 SEDANG/MODERATE`, `> 7.0 TINGGI/HIGH`.
- PNG and 9:16 export are client-side only (canvas or `html-to-image`). No upload, no account, no PII.
- **Do not build** the "Prototype reference model / Specification archive ref / image_2" cards; they are design-process artefacts.

### 6.3 Registry & Benchmarks (`/registry`)
Header with aggregate intensity pool + SBTi 2030 bar · three filter rows (typology, audit status, FTE scale) · sortable table (code, practice, classification, FTE, annual gross, intensity bar, S1:S2:S3 ratio, tier, actions) · 3 intelligence panels · intensity-spread histogram (median bar `--ink`, others `--rule`). **All data is a labelled sample dataset** (§8).

### 6.4 Methodology (`/methodology`): includes the DHL Group FY2025 summary
Left codex index + formula card + principle quote · right sections:
- 01 Scope demarcation and boundary (consolidation scope, base year, WTW view, what is excluded: offsets, biogenic CO₂).
- 02 Formulas, rendered as real maths (KaTeX or clean monospace), from `docs/DHL-METHODOLOGY.md` §3, each tagged `[STANDARD FORM]` because the DHL report does not print them.
- 03 Factor lineage table (id, factor, unit, scope, source, year, verified). Sources named by DHL: GLEC 3.1, IEA 2024, DEFRA, Clean Cargo, HBEFA, IATA, SmartWay.
- 04 ASCII boundary topology on an `--ink` panel (Scope 1 / 2 / 3 categories; mark the categories DHL includes in its target).
- 05 Uncertainty: qualitative only (consumption-based vs activity-based, primary vs secondary data). No Monte Carlo chart unless implemented.
- **06 DHL Group FY2025**: short summary and link to [`/methodology/dhl`](/methodology/dhl). The page sections are 01 About the reports; 02 FY2025 headline figures; 03 How DHL calculates it; 04 Tableau visualization; 05 Reconciliation checks; 06 Targets and progress; 07 What DHL does not disclose; 08 Mapping to C—METRIC; 09 Sources. It reproduces DHL's published aggregation and cross-checks, not its activity-level calculation; the location-total gap stays visible.

### 6.5 Audit Export (`/dossier`)
Left parameters: reporting interval, framework checklist, integrity block, format toggle (PDF / JSON / CSV / XBRL), compile button. Right: **A4 vector preview** (210:297, white, 1px border, no shadow) with executive summary, inventory breakdown, intensity, sign-off block. `@media print` must produce a clean A4. Real exports: **CSV and JSON**, and PDF via the print stylesheet. XBRL is out of scope (show it disabled).

---

## 7. Calculation spec (single source of truth)

`E = A × EF × (1 − ER)`; Struk Karbon: `Daily CO₂e = Σ(parameterᵢ × factorᵢ) − offsets`.
All factors live in `data/factors.ts`, typed `{ id, label, unit, value, scope, source: string | null, year: number | null, verified: boolean }`. Every screen, the receipt, the dossier and the methodology table read from it.

**Struk Karbon factors (from the PRD, all `verified:false`):** transport g/km: walk/bike 0 · rail/transit 28 · e-scooter 45 · motorcycle 103 · car 192. Food kg/serving: beef/lamb 3.50 · poultry/fish 0.85 · eggs 0.30 · plant/tofu 0.15. AC 0.65 kg/h · workstation 0.06 kg/h · parcel 0.85 kg · single-use cup 0.15 kg.

**Conflicts found between screens. Resolve in `factors.ts` and delete the losers:**
| Item | Values seen |
|---|---|
| Beef per serving | 3.50 (PRD) vs 4.50 (desktop receipt) |
| Parcel | 0.85 (PRD, desktop) vs 0.25 (mobile) |
| Natural gas | 0.202 kg/kWh (calculator) vs 0.1825 (methodology) |
| Diesel | 2.68 (calculator) vs 2.6871 (methodology) |
| EU grid | 251.7 g/kWh (calculator) vs 0.2310 kg/kWh (methodology) |
| Motorcycle 14 km | 1.26 kg shown; 14 × 103 g = 1.44 kg |
| Fleet diesel | 47.90 t (calculator) vs 112.80 t (dossier) |
| Daily benchmark | 4.11 kg (desktop) vs 6.80 kg "Indonesia" (mobile) |

**Calculator factors and DHL (revised):** the **method** comes from the DHL report; the **layout does not** (§6.1), and the **values are not DHL's either**. DHL names GLEC 3.1, IEA 2024 and DEFRA and publishes none of their numbers. Enter values in `factors.ts` only when the owner supplies value + source + year; until then every Calculator factor is `verified:false` and shows the demo marker. Activities map to factors in `data/activities.ts`, and each activity's scope is read from its factor, never written by hand. Published DHL figures live separately in `data/dhl-fy2025.ts`, **generated from the DHL Statbook workbook** (series 2016–2025 with sheet + row refs). Never hand-edit it. Calculation logic is in `lib/emissions.ts` and `lib/dhl-checks.ts` (already written and tested; see `docs/DHL-METHODOLOGY.md` §12); the checks are shown on the Methodology page, not in the Calculator.

Rules: format with `Intl.NumberFormat` (`id-ID` default; `en` when English is selected); 2 decimals for kg and t. Tier thresholds as in §6.2. Equivalencies (km driven, phone charges, tree-days) only from constants with a source in `factors.ts`; otherwise remove them.

---

## 8. Content-integrity rules (non-negotiable)

The mockups contain claims that would be false or misleading in a real product. Replace as follows.

| In the mockup | Do this instead |
|---|---|
| "KPMG Sustainability Assurance Services Basel", "Dr. Beatrix von Haller, Lead Auditor", ACC-ID | Never use a real firm or person. Sign-off block reads `[ AUDITOR NAME / PLACEHOLDER ]` and `NOT AN AUDITED DOCUMENT` |
| "Verified ISO 14064", "ESRS E1 aligned", "GHG Protocol compliant", "Certified net-zero", "Audited quarterly by Swiss Accredited Metrology Institutes" | Say `Methodology follows GHG Protocol structure (not certified)`. No certification or assurance badges |
| "SHA-256 attestation", "block height #1,842,910", "ledger anchoring" | Compute a **real** SHA-256 of the exported dataset with `crypto.subtle.digest`, labelled `Integrity checksum (not an attestation)`. No block height |
| `[ SEND ENCRYPTED TO INDEPENDENT AUDITOR ]` | Remove, or disable with `Not available in this version` |
| "142 verified studios", peer names, registry rows, histogram, "64% peers on track", "Monte Carlo 10,000 runs ±4.2%" | Ship as a **clearly labelled sample dataset** (`ILLUSTRATIVE SAMPLE, NOT REAL PEER DATA`) in `data/sample-registry.ts`. Only show an uncertainty figure if a simulation is actually implemented |
| Status chips `SYSTEM V2.4 / ACTIVE RECORD`, `SYS_STAT ACTIVE_STABLE`, `418.2 PPM` "live" | Static label `PROTOTYPE v0.x`, or remove. No fake live telemetry |
| "Paris 1.5°C benchmark ceiling 4.11 kg/day" | Needs a cited source and derivation; otherwise label `ILLUSTRATIVE` |
| "Offset credit: rail preference −1.20" | Remove; there is no defined basis for it |
| Footer "Zürich & Basel" lab | Neutral address or remove |
| Anything implying C—METRIC recomputes or matches DHL's emissions | State plainly: the case study reproduces DHL's published aggregation and cross-checks, not its activity-level calculation. Never present calculator output as DHL data |
| Tableau embed without local context | Show the caption fields from `content/tableau.ts` (author, data source, last updated), state that the visualization is separate from the page's data and not verified by C—METRIC, and keep the six-number comparison table. Load only after a click; no Tableau script. On mobile, show the open-in-Tableau link first |
| Calculator mock values (482.64 t, the 562.4 t sector baseline, target progress) | Removed. The Calculator has no fabricated baseline, target or benchmark. Do not reintroduce one |

Every unverified factor shows a `DEMO FACTOR / UNVERIFIED` marker in the UI and in every export (a `status` column / JSON field). In the Calculator the marker sits on the persistent result strip and inside each card's `Lihat cara hitungnya` detail — not repeated on every visible row; the Dossier, receipts and source tables keep the per-row status. Real factors (DEFRA, IPCC AR6, IEA, national grid) may only be added with a `source` and `year` supplied by the owner.

---

## 9. Known mockup bugs: do NOT reproduce

1. The receipt shows `6.82` as **net** while a `−1.20` offset row exists. The items sum to exactly 6.82, so the offset is not applied. Net must equal items minus offsets (and the offset row is removed anyway, §8).
2. Serif fonts in many labels and tables (a fallback-font leak). Only Inter and JetBrains Mono.
3. Soft shadows on cards and the A4 sheet, and rounded corners from the Tailwind defaults.
4. Nav overflow and text clipping at 1280px (`GLOB…` cut off, wrapped tab labels).
5. Raw LaTeX source shown in Methodology §02.
6. The prototype loads Tailwind from a CDN and icons from Google's Material Symbols font. The build uses installed Tailwind and inline SVG icons.
7. Mixed bracket styles. Use `[ LABEL ]` for actions and plain label-caps for headings.

---

## 10. Scope and phases

Client-side only, in-memory. No backend, auth, database or API ingest.
1. **Foundation:** tokens, fonts, grid, header/footer, logo, `data/factors.ts` + `lib/emissions.ts` + tests.
2. **Struk Karbon** (desktop + mobile), PNG + 9:16 export, caption copy.
3. **Calculator** (activity-first, §6.1): activity list with auto-derived scope, `SHOW CALCULATION` disclosures, simplified ledger. `data/dhl-fy2025.ts` and `lib/dhl-checks.ts` feed the Methodology case study (§6.4, panel 06).
4. **Dossier:** A4 preview, print CSS, CSV/JSON export, real SHA-256 checksum.
5. **Methodology:** static content, rendered formulas, DHL case-study panel.
6. **Registry:** sample dataset, filters, sorting.
7. Responsive + accessibility + print pass.

Out of scope: enterprise API/ERP ingest, ledger anchoring, XBRL, auditor messaging, accounts, payments, 3D, scroll-driven motion.

### Acceptance checks
Matches the reference at 1440 and 390 · no radius, shadow or gradient anywhere · all numbers tabular · totals reconcile across Calculator, Ledger and Dossier · no unlabelled demo number · keyboard operable, 44px touch targets on mobile · CSV/JSON/PNG exports download and open · print preview is a clean A4.
