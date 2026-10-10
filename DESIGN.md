# CarbonTrack — Design Principles (for agent-driven build)

Source: `carbontrack-10-designs.html` (10 visual studies of ONE landing page + demo calculator).
Language of UI copy: **Indonesian (id)**. Keep copy in Indonesian.

> **READ FIRST — Agent instructions**
> 1. The source contains 10 *alternative* directions. They are NOT meant to be merged.
> 2. Build exactly ONE direction. Default: **`workbench`** (§6.10), because it is the only one that behaves like a real app. If the owner says otherwise, use that one.
> 3. Everything in §1–§5 is shared by all 10 and always applies.
> 4. All numbers/emission factors are **demo placeholders**. Do not present them as real data (see §8).

---

## 1. Core principles (shared by all 10 studies)

1. **Typography is the hero.** One huge headline (`clamp(48px, 6.9vw, 108px)`), tight tracking (`-0.065em`), line-height ~0.96. Little decoration.
2. **One accent colour per direction**, used only for: primary button, focus ring, small marks. Everything else is paper / ink / muted / line.
3. **Hairlines, not boxes.** Sections are separated by 1px `--line` borders. No card stacks, no shadows (only the modal has one).
4. **Sans-serif only.** `Arial, Helvetica, sans-serif`. No webfonts, no serif. Hierarchy comes from size, weight and tracking.
5. **One primary action per screen:** open the calculator. Every CTA triggers the same dialog.
6. **Generous empty space, short copy.** Headlines are 2 short sentences broken with `<br>`. Body copy max-width ~370px.
7. **12-column grid**, 24px gap, container max 1600px, side padding 5% (6% on mobile). Each direction picks its own column split.
8. **Works offline, no dependencies.** Plain HTML/CSS/vanilla JS. No frameworks, no network calls, no storage.
9. **Calm motion only.** 0.15–0.45s transitions, small hover lifts; everything disabled under `prefers-reduced-motion`.
10. **Accessible by default:** `aria-pressed` on toggles, `aria-live="polite"` on results, `role="status"` on notes, 3px focus outline, native `<dialog>`.

---

## 2. Design tokens

Every direction defines the same 7 CSS variables on its body class. Components only read the variables.

```css
:root{
  --paper:  /* page background */;
  --ink:    /* main text */;
  --accent: /* primary button, focus ring */;
  --on:     /* text on accent */;
  --tint:   /* selected/hover fill, ::selection */;
  --line:   /* all hairlines & input borders */;
  --muted:  /* secondary text */;
  --radius: 0; /* only loop (7px) and mint (30px) override */
}
```

### Typography scale
| Role | Spec |
|---|---|
| h1 | `clamp(48px,6.9vw,108px)`, weight 600, ls `-.065em`, lh .96, `text-wrap:balance` |
| h2 | `clamp(30px,4vw,56px)`, weight 500, ls `-.05em`, lh 1.02 |
| h3 | 22px, weight 500, ls `-.025em` |
| Body copy | 16px / 1.6, `--muted`, max-width 370px |
| Small | 13px / 1.5 |
| Eyebrow | 11px, weight 600, uppercase, ls `.12em` |
| Brand | 23px, weight 700, ls `-1.1px`, with a tiny `↗` superscript |
| Numbers | `font-variant-numeric: tabular-nums` (class `.num`) |

### Spacing / sizing
- Nav height 94px (76px mobile). Hero padding `68px 0 56px`, min-height ~550px.
- Button: min-height 52px, padding `17px 23px`, label left, `↗` arrow right, gap 38px.
- Scope row: 3 equal columns, 24px padding, top+bottom hairline.
- Mobile breakpoint: **760px** (hero stacks to flex column, `.optional` nav link hidden, 4-col grid overlay).

---

## 3. Shared page anatomy (top → bottom)

1. **Nav** — brand "CarbonTrack↗" left; right: `Metodologi` (opens how-it-works dialog, hidden on mobile) + `Buka kalkulator ↗` (opens calculator).
2. **Hero** — eyebrow, h1, copy, CTA. Right side is direction-specific (image / geometry / instrument / ledger / etc.).
3. **Scope row** — 3 toggle buttons: Scope 1 / 2 / 3 (`aria-pressed`). Selected = `--tint` background.
4. **Scope note** — one line that swaps text when a scope is chosen:
   - Scope 1: "Emisi langsung dari sumber yang dimiliki atau dikendalikan organisasi."
   - Scope 2: "Emisi dari pembelian listrik, panas, uap, atau pendinginan."
   - Scope 3: "Emisi tidak langsung lainnya dalam rantai nilai organisasi."
5. **Footer** — left "CarbonTrack / Konsep antarmuka"; right "Data & faktor ilustratif · Bukan laporan terverifikasi". 11px muted.

Optional dev tool: a 12-column blue overlay (`.grid-layer`, toggled with `body.show-grid` or `?grid=1`).

---

## 4. Shared components

### Button (`.cta`)
Solid `--accent`, text `--on`, radius `var(--radius)`. Hover: `filter:brightness(.92)` + `translateY(-2px)`, arrow slides 4px right. Active: back to 0.

### Text button
No border, underlined (`underline-offset:5px`), 13px.

### Scope toggle row
See §3. Hover and pressed both use `--tint`.

### Filter pills (`.filter button`)
Bordered, 12px; pressed = filled accent.

### Calculator dialog (native `<dialog>`, `showModal()`)
- Width `min(92vw,620px)`, backdrop `#11201866` + 4px blur, shadow `0 24px 90px #0002`.
- Header: eyebrow "Kalkulator / Demo" + h2 "Tambah aktivitas." + × close (38px square).
- Demo note (bordered top/bottom): "Faktor ilustratif untuk mencoba interaksi. Hasil tidak disimpan ke server."
- Fields (2-col, 1-col on mobile): **Aktivitas** (select, full width), **Jumlah** (number, default 12500, min 0, max 1e12, step any), **Satuan** (readonly).
- Result: scope label ("Scope N · Estimasi"), big `<output aria-live>` 54px, unit "kg CO₂e", formula line.
- Actions: `Ekspor CSV ↗` (submit) + `Reset`.
- Close on ×, backdrop click, or Esc.

### How-it-works dialog ("Dari data ke dampak.")
3 numbered steps: 01 Catat aktivitas → 02 Periksa faktor → 03 Tinjau hasil. Ends with demo disclaimer.

### Table (workbench)
Full-width, 13px, header 11px muted, row borders `--line`, last column right-aligned, wrapper `overflow-x:auto`.

---

## 5. Calculator logic (functional spec)

```js
const choices = [
  { label:'Listrik kantor', unit:'kWh',   factor:0.85, scope:2 },
  { label:'Solar genset',   unit:'liter', factor:2.68, scope:1 },
  { label:'LPG kantin',     unit:'kg',    factor:3.00, scope:1 },
];
emission_kg = amount * factor;        // kg CO₂e
```
- Number format: `Intl.NumberFormat('id-ID', {maximumFractionDigits:2})` (comma decimal, dot thousands).
- Invalid/empty amount → output `—`, formula line shows "Masukkan jumlah 0–1.000.000.000.000."
- Formula line: `12.500 kWh × 0,85 kg CO₂e/kWh (faktor demo)`.
- **CSV export** (client-side Blob, no server): BOM + header `aktivitas,jumlah,satuan,faktor_demo,scope,emisi_kg_co2e,status`, status = `DEMO - belum diverifikasi`, filename `carbontrack-demo.csv`.
- Nothing is persisted. Reset → Listrik kantor / 12500.

Sample dataset used by ledger/workbench: Listrik kantor 12.500 kWh = 10.625 kg (S2); Solar genset 350 L = 938 kg (S1); LPG kantin 120 kg = 360 kg (S1). Total 11,92 t; S1 1,30 t (10.89%), S2 10,63 t (89.11%), S3 "Belum ada data".

---

## 6. The 10 directions

All share §1–§5. Only palette, hero layout and one interaction differ.

| # | id | Name | paper | ink | accent | tint | line | muted | Grid split | Signature interaction |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `loop` | Loop Studio | #fff | #15271e | #095335 | #e7f3eb | #d5dfd8 | #59655c | 6 / 6, radius 7px | Glass image follows cursor |
| 2 | `swiss` | Swiss Signal | #fafaf7 | #232321 | #c43123 | #f5e4df | #cececa | #63635d | 9 / 3 | Giant h1 (up to 160px), one red dot |
| 3 | `index` | Blue Index | #f4f7fc | #152c56 | #245bcc | #e2ebff | #c5d3e8 | #52647f | 3 / 1 gap / 8 | Big chapter number (01–03) changes with scope |
| 4 | `mint` | Mint Balance | #eff8f2 | #1e4336 | #225b44 | #dcece1 | #bed4c6 | #4e6c5b | centered, 3/6/3 simulator, radius 30px | kWh slider → live ton CO₂e |
| 5 | `solar` | Solar Form | #fffdf3 | #2c2c22 | #292d22 | #fff09e | #d8d5bd | #696650 | 6 / 1 / 5 | 2×2 geometry (yellow #ffe87c) shrinks on hover |
| 6 | `ledger` | Apricot Ledger | #fff3eb | #4c3025 | #a04726 | #f5dfcf | #dbc2b1 | #795b4c | 6 / 1 / 5 | Filter Semua/S1/S2 updates rows + total |
| 7 | `blueprint` | Cyan Instrument | #f6fbfc | #183c43 | #096873 | #d9f3f6 | #b6d7dc | #4b6c73 | 6 / 1 / 5 | Slider panel with 24px grid background |
| 8 | `rose` | Rose Edition | #fff4f5 | #592c36 | #9d3f56 | #f5dfe4 | #dfc5cc | #805963 | 9 / 3 (+ 4/4/4 bottom) | Vertical line + tint circle mark |
| 9 | `gallery` | White Gallery | #fff | #233326 | #2b4931 | #e7efe6 | #d7dfd4 | #62705e | masthead / 4 / 1 / 7 | Masthead "CarbonTrack." up to 220px |
| 10 | `workbench` | Lime Workspace | #fafbf6 | #2b3520 | #3e5126 | #e7efc7 | #cfd7bd | #64704f | sidebar 160px + fluid | Real tabs, add-activity dialog, CSV |

### Per-direction notes
1. **loop** — h1 "Ukur emisi. Pahami dampaknya." Needs `assets/glass-loop.png` (1672×941, clear glass ribbon loop with green core; `mix-blend-mode:multiply`, hover rotates −3°/scale 1.035). Subtitle row: `01 / Input · 02 / Hitung · 03 / Tinjau`.
2. **swiss** — h1 "Data jelas. Aksi tepat." Right column has left hairline, eyebrow, 74px red dot, small note. No radius anywhere.
3. **index** — h1 "Setiap emisi. Ada datanya." Left column shows 155px chapter number. Scope row becomes a vertical list with `01/02/03` + short label ("Emisi langsung", "Energi yang dibeli", "Rantai nilai").
4. **mint** — h1 "Langkah kecil. Gambaran besar." weight 400, pill-ish radius 30px. Simulator: slider 0–20.000 kWh, step 100, default 12.500 → `kWh × 0.85 / 1000` shown in ton.
5. **solar** — h1 "Mulai dari yang terukur." Yellow is ONLY inside the geometry graphic; the CTA stays dark green-black. Caption "Aktivitas → faktor → hasil".
6. **ledger** — h1 "Rapi datanya. Jelas jejaknya." Right side is a record list, values 32px right-aligned, total 44px.
7. **blueprint** — h1 "Ketelitian dalam setiap perhitungan." The grid texture exists on ONE panel only. Reading 72px; footer row "12.500 kWh × 0,85 kg CO₂e/kWh".
8. **rose** — h1 "Kenali dampak. Tentukan langkah." Hidden on mobile: right mark column.
9. **gallery** — h1 "Emisi organisasi, lebih terbaca." Image sits in a 310px-high strip, `object-fit:contain`.
10. **workbench** — Product-first. Summary card (total 90px, scope bars on `#cbd5aa` track), table of 3 activities, tabs Ringkasan / Aktivitas / Faktor (panels toggled with `hidden`). Mobile: sidebar becomes horizontal tab strip.

---

## 7. Suggested build order for the agent

1. Static shell: nav, hero, scope row, scope note, footer, tokens, responsive rules.
2. Scope toggle + note text swap.
3. Calculator `<dialog>` + live emission + CSV export.
4. "Metodologi" dialog.
5. Direction-specific piece (slider / ledger filter / workbench tabs / image hover).
6. Polish: focus states, reduced-motion, 390px mobile check.

Acceptance checks: works with JS only (no build step), keyboard-operable, readable at 390px, no horizontal scroll, number formatting is `id-ID`, disclaimer visible in footer.

---

## 8. Known problems / do-not-copy list (honest notes)

- **Emission factors are fake.** 0.85 (electricity), 2.68 (diesel), 3.00 (LPG) are placeholders, not Indonesian official factors. A real product must source factors (e.g., national grid factor, IPCC/GHG Protocol/DEFRA), version them, and show the source per number. Do not ship these.
- **Scope 3 has no calculation** — only a text blurb and "Belum ada data". It is not designed yet.
- **No persistence, auth, or data model.** This is a visual prototype; "Tambah aktivitas" doesn't add rows to the table.
- **Only one hero image exists** (`glass-loop.png`, 1.3 MB — compress before shipping). Directions 1 and 9 depend on it; the rest use CSS shapes.
- **Mint slider output** divides by 1000 to show tons while the calculator shows kg — keep units consistent when building.
- **Language/locale:** copy is Indonesian but some labels are English (`Workspace`, `Carbon accounting Study / 02`). Decide and unify.
- **Don't combine directions.** Mixing 3 palettes or layouts will break the "one accent, hairlines only" rule that makes this look clean.
