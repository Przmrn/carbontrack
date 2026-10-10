<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# AGENTS.md: CarbonTrack

Standing rules for any AI agent working in this repo. Read fully before every task.
The owner is a student who understands workflows but not code in depth. Be explicit, explain decisions briefly, never hide problems.

## 1. Project
CarbonTrack: a studio-portfolio-style landing page (3D, motion) plus a flat, functional carbon-footprint calculator app.
- `/` landing: WebGL + scroll motion (direction `loop` from DESIGN.md)
- `/app` calculator workspace: flat, fast, NO 3D

Source of truth for visuals and calculator behavior: `DESIGN.md`. If this file and DESIGN.md conflict on motion/3D, this file wins for `/`. For everything else, DESIGN.md wins.

## 2. Stack (do not add or swap without asking)
- Next.js App Router, TypeScript strict, Tailwind with CSS variables
- three, @react-three/fiber, @react-three/drei
- GSAP + ScrollTrigger, Lenis
- Vitest for tests
- Do NOT add other animation, UI, state or icon libraries. If you think one is needed, ask first and explain why.

## 3. Commands
Keep these working. Update this section if they change.
```
npm run dev      # local dev
npm run build    # must pass before any task is "done"
npm run lint     # must pass
npm test         # Vitest, must pass
```

## 4. Folder conventions
```
app/              routes only (page.tsx, layout.tsx), keep thin
components/       UI components, one per file, PascalCase
components/three/ everything that touches WebGL
lib/              pure logic (emissions.ts, format.ts), no React
data/             typed static data (factors.ts)
content/id.ts     ALL user-facing Indonesian strings
public/assets/    images (glass-loop.png is a reference/fallback only)
```
- Every file starts with a 1–2 line comment: what it does.
- No file over ~250 lines; split it.
- No `any`. No `@ts-ignore` without a comment explaining why.

## 5. Non-negotiable rules

### Emissions data
- Calculation lives ONLY in `lib/emissions.ts` (pure functions). UI never does its own math.
- Every factor is typed `{ id, label, unit, factor, scope, source: string | null, verified: boolean }`.
- Unverified factors MUST show a visible "faktor demo / belum diverifikasi" badge in the UI and in CSV export status.
- Never invent a factor, a source, or a citation. If a real factor is needed and not provided, stop and ask.
- Format numbers with `Intl.NumberFormat('id-ID')`.
- Any change to `lib/emissions.ts` requires tests updated and passing.

### 3D / motion (landing only)
- Canvas via `next/dynamic` (`ssr:false`) + `Suspense`. Static image fallback when loading or when WebGL is unavailable.
- Respect `prefers-reduced-motion`: disable autorotate, scrub, cursor effects, intro.
- Cap DPR (<= 2), pause rendering when off-screen, dispose geometries/materials/textures on unmount.
- Mobile (<760px): reduced quality, no pointer effects.
- LCP element must be text (h1), never the canvas. No layout shift from the canvas.
- No scroll hijacking. Native scroll must stay usable.

### Accessibility
- All content exists as real HTML; canvas is `aria-hidden`.
- Keyboard operable, visible focus ring, `aria-pressed` on toggles, `aria-live="polite"` on results.
- Use native `<dialog>` for modals.

### Design system
- Use the CSS variable tokens from DESIGN.md. No hardcoded hex colors in components.
- Single accent color, hairline borders, Arial/Helvetica only, 12-col grid. Do not mix other directions' palettes.

### Language
- UI copy is Indonesian, stored in `content/id.ts`. Code, comments, commits in English.

## 6. Working agreement
1. **Plan before code** on any task bigger than a small fix: list the files you will touch and why. Wait for approval on large tasks.
2. **Small steps.** One phase/feature at a time. Stop and report after each.
3. **Verify, don't claim.** Run build, lint and tests, and paste the real result. Never say "should work" or "done" without running them.
4. **Report honestly** at the end of every task:
    - what changed (files)
    - what you ran and the actual output
    - what is NOT done or is uncertain
    - any shortcut or workaround you took
5. **Don't silently change scope.** No unrequested features, refactors, renames or dependency upgrades. If you spot something worth changing, propose it, don't do it.
6. **Push back.** If a request is a bad idea, impossible, or conflicts with these rules, say so and offer an alternative.
7. **Ask when ambiguous** instead of guessing, especially about data, factors, and visuals.
8. **Respect your limits.** If a task won't fit well in one pass, say so up front and split it, rather than delivering a rushed half version.

## 7. Never do
- Never commit secrets, `.env` files, or API keys.
- Never delete or overwrite files outside the task's scope.
- Never run destructive commands (`rm -rf`, `git reset --hard`, force-push) without explicit approval.
- Never fake results: mocked data presented as real, passing tests that don't test anything, or skipped tests to get green.
- Never use localStorage/network calls for emission data unless asked. The app is client-side and in-memory by default.
- Never ship the 1.3 MB `glass-loop.png` as-is. Compress it or use it only as fallback.

## 8. Definition of done (per task)
- [ ] `npm run build`, `npm run lint`, `npm test` all pass (real output reported)
- [ ] Works at 390px and desktop widths, no horizontal scroll
- [ ] No console errors
- [ ] Unverified factors are labeled
- [ ] New strings are in `content/id.ts`
- [ ] Honest report delivered (section 6.4)

## 9. Known open issues (keep updated)
- Emission factors are demo placeholders (0.85 electricity, 2.68 diesel, 3.00 LPG), not verified.
- Scope 3 has no calculation yet.
- No persistence or auth.

<!-- END:nextjs-agent-rules -->
