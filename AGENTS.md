<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# AGENTS.md: C—METRIC

Standing rules for any AI agent working in this repo. Read fully before every task.
The owner is a student who understands workflows but not code in depth. Explain decisions briefly, never hide problems, and tell the owner when something is a bad idea.

## 1. Project
## 1. Project  (replace the authority list)
Source files, in order of authority when they conflict:
1. `AGENTS.md`
2. `DESIGN.md`
3. `docs/DHL-METHODOLOGY.md` (how the DHL Group FY2025 number is built; labels [R] stated / [S] standard formula / [D] derived)
4. `docs/PRD.md`
5. reference screenshots (mockups with known bugs)
Reference report: `docs/DHL-Group-2025-Annual-Report.pdf`.

## 2. Stack (do not add or swap without asking)
- Next.js App Router, TypeScript strict
- Tailwind CSS with the design tokens as CSS variables (override default radius and shadow to 0 / none)
- `next/font` for Inter + JetBrains Mono (no CDN fonts, no serif)
- Inline SVG icons (no icon fonts or icon libraries)
- three, @react-three/fiber, @react-three/drei for 3D scenes (outside the Calculator, see §5)
- GSAP + ScrollTrigger, Lenis for scroll motion (outside the Calculator, see §5)
- Zustand only if shared state is genuinely needed; otherwise React state
- `html-to-image` (or canvas) for PNG export; KaTeX only for the Methodology formulas
- Vitest for tests
- NOT allowed: Framer Motion, UI kits (shadcn, MUI, etc.).

## 3. Commands
Keep these working; update this section when they change.
```
npm run dev
npm run build    # must pass before a task is "done"
npm run lint     # must pass
npm test         # must pass
```

## 4. Folder conventions
```
app/                  routes only, keep thin
components/           UI, one component per file, PascalCase
components/ui/        primitives: Button, Input, Slider, Stepper, Chip, Table, Dialog
components/receipt/   Struk Karbon receipt + export
lib/                  pure logic: emissions.ts, format.ts, checksum.ts, export.ts (no React)
data/                 factors.ts, sample-registry.ts (typed static data)
content/en.ts         all UI strings (Indonesian labels live here too)
public/brand/         c-metric-logo.svg
docs/                 PRD.md and reference screenshots
data/dhl-fy2025.ts    published DHL figures, read-only, each with its printed page number
lib/dhl-checks.ts     reconciliation checks computed from dhl-fy2025.ts (pure, tested)
```
- Every file starts with a 1–2 line comment saying what it does.
- No file over ~250 lines; split it.
- No `any`; no `@ts-ignore` without an explanatory comment.

## 5. Non-negotiable rules

### DHL alignment  (replaces the earlier block)
- `data/dhl-fy2025.ts` is GENERATED from the DHL Statbook. Never edit by hand. To change it, regenerate from the xlsx and say so.
- `lib/emissions.ts` and `lib/dhl-checks.ts` already exist with passing tests. Extend them; do not rewrite or loosen tolerances. Run `npm test` after any change.
- The Calculator follows DHL's structure (DESIGN.md §6.1). Factor VALUES are never DHL's and are never hard-coded in `lib/`: they are `Factor` inputs with source, year and `verified`.
- Never present calculator output as DHL data, or the case study as a recomputation.
- Scope 2 is always shown market-based AND location-based. Offsets and biogenic CO₂ are separate lines, never added or subtracted.
- Keep the location-total gap (about 0.10 Mt) visible in the case study. Never adjust inputs to close it.
- Do not describe DHL's emission fall as "decarbonization"; the data cannot separate lower volumes from lower intensity (DHL-METHODOLOGY.md §11.6).
- Mark Scope 3 cat. 1, 2, 6, 7 as ESTIMATE.

### Design system (see DESIGN.md §3–§4)
- Use the CSS-variable tokens. No hardcoded hex values in components.
- `border-radius: 0`, `box-shadow: none`, no gradients, no blur, no 3D. This includes the A4 preview and mobile cards.
- Fonts: Inter (UI) and JetBrains Mono (numbers, labels, receipt). Never serif, never a CDN.
- All numbers use tabular figures (`tnum`, `zero`).
- Structure uses 1px hairlines (`--rule` passive, `--ink` active), not cards with shadows.
- Motion: the Calculator (`/`) is instant-only (synchronous slider updates, no animation). Other routes may use 3D and scroll motion under the guardrails below. Always respect `prefers-reduced-motion`.
- Vermilion is for alerts and increases only (< 2% of visual weight).
- Do not copy anything listed in DESIGN.md §9 (mockup bugs).

### 3D / motion (everywhere except `/`)
- 3D and scroll motion are allowed on `/struk`, `/registry`, `/methodology`, `/dossier` (heroes, section accents). The Calculator stays a flat instrument: no 3D, no scroll animation, synchronous updates.
- Interactive controls (sliders, steppers, inputs) always respond instantly everywhere; all numbers stay tabular and readable.
- Canvas via `next/dynamic` (`ssr:false`) + `Suspense`, with a static fallback when loading or when WebGL is unavailable.
- Respect `prefers-reduced-motion`: disable autorotate, scrub, pointer effects and intros.
- Cap DPR (<= 2), pause rendering when off-screen, dispose geometries/materials/textures on unmount.
- Mobile (<768px): reduced quality, no pointer effects.
- LCP element must be text, never the canvas. No layout shift from the canvas.
- No scroll hijacking. Native scroll must stay usable.

### Emissions data
- All calculation lives in `lib/emissions.ts` as pure functions. UI never does its own maths.
- All factors live in `data/factors.ts`: `{ id, label, unit, value, scope, source: string | null, year: number | null, verified: boolean }`. Every screen, receipt, dossier and export reads from it. Never hardcode a number in a component.
- Every unverified factor shows a visible `DEMO FACTOR / UNVERIFIED` marker in the UI and a `status` field in every export.
- Never invent a factor, source, citation, or standard. If a real factor is needed and not provided, stop and ask.
- Totals must reconcile across Calculator, ledger and Dossier. Receipt net = items − offsets.
- Any change to `lib/` requires tests updated and passing.

### Content integrity (DESIGN.md §8)
- Never use a real firm, auditor or person's name.
- Never show certification, assurance, "verified", "audited", "compliant" or "aligned" badges. Wording is "follows GHG Protocol structure (not certified)".
- The only hash allowed is a real SHA-256 computed with `crypto.subtle.digest`, labelled `Integrity checksum (not an attestation)`. No fake block height or ledger.
- Registry and benchmark data is a labelled sample (`ILLUSTRATIVE SAMPLE, NOT REAL PEER DATA`). No fake live telemetry or "system status".
- Equivalencies (km driven, phone charges, trees) only with a sourced constant; otherwise leave them out.

### Privacy and security
- No personal data leaves the browser. No analytics, tracking or third-party network calls.
- No secrets, keys or `.env` files committed.

### Accessibility
- Keyboard operable, visible focus, 44px minimum touch targets on mobile.
- `aria-live="polite"` on live results; native `<dialog>` for modals; real semantic tables.

### Language
- UI in English with the Indonesian bilingual labels from DESIGN.md. Strings live in `content/en.ts`. Code, comments and commits in English.

## 6. Working agreement
1. **Plan before code** for anything bigger than a small fix: list the files you will touch and why. Wait for approval on large tasks.
2. **Self-assess feasibility first.** If a task will not fit well in one pass, say so up front and split it, rather than delivering a rushed half version.
3. **One phase at a time** (DESIGN.md §10). Stop and report after each; the owner will say "next".
4. **Verify, don't claim.** Run build, lint and tests and paste the real results. Never write "should work" or "done" without running them.
5. **Report honestly** after every task: files changed, commands run with actual output, what is NOT done or uncertain, any shortcut or workaround.
6. **No silent scope changes.** No unrequested features, refactors, renames, or dependency changes. Propose, don't do.
7. **Push back.** If a request or a mockup detail conflicts with these rules, say so and offer an alternative.
8. **Ask when ambiguous**, especially about factors, data and wording of claims.
9. When two spec files disagree, follow the authority order in §1 and tell the owner which conflict you resolved.

## 7. Never do
- Never run destructive commands (`rm -rf` outside build output, `git reset --hard`, force-push) without explicit approval.
- Never delete or overwrite files outside the task's scope.
- Never fake results: mocked data presented as real, tests that don't test anything, skipped tests to get green.
- Never add a backend, database, auth or external service.
- Never put 3D, WebGL or scroll animation inside the Calculator (`/`) or on interactive controls.

## 8. Definition of done (per task)
- [ ] `npm run build`, `npm run lint`, `npm test` pass (real output reported)
- [ ] Matches the reference layout at 1440px and 390px, no horizontal scroll
- [ ] No radius, shadow, gradient or serif font anywhere
- [ ] Numbers tabular and sourced from `data/factors.ts`; totals reconcile
- [ ] Every demo factor and sample dataset is labelled
- [ ] New strings are in `content/en.ts`
- [ ] No console errors
- [ ] Honest report delivered (§6.5)

## 9. Known open issues  (replace)
- Calculator factor values unverified (GLEC 3.1, DEFRA, IEA values not supplied; IEA set may be licensed).
- DHL's location-based total has an unexplained ~0.10 Mt gap (2023 to 2025).
- DHL publishes no factors, tonne-km, GWP set or numeric uncertainty.

<!-- END:nextjs-agent-rules -->
