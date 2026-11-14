# Phase 3 landing hero — handoff

Date: 2026-11-13. Task: GitHub Issue #3. Branch `feat/hero`. Nothing is committed, pushed, merged or deployed.

## What exists

A single-viewport hero, "Lines of force": a two-colour plate (ink on paper, rubric red for the poles) in which several thousand filings align to a field shaped by three poles — the Start Studying button, a drifting lodestone, and the visitor's pointer or finger. Light and dark palettes follow `prefers-color-scheme`.

- `/tr/`, `/ar/` render the localized hero; `/` renders it in the default locale (`tr`) with the language choice in the bar.
- The one action is `routes.docs(locale)`. Nothing reads the content registry.
- No new npm dependencies; `package.json` and the lockfile are untouched.

## Files (all Phase 3-owned)

- `src/app/[locale]/page.tsx`, `src/app/(entry)/page.tsx` — route files; import the fonts and `landing.css`, set `viewport`/metadata.
- `src/components/landing/hero.tsx` — markup (server component, no CSS/font imports, so it is testable).
- `src/components/landing/copy.ts` — landing-only Arabic/Turkish messages.
- `src/components/landing/field-engine.ts`, `field-canvas.tsx` — the canvas field and the opening choreography.
- `src/components/landing/magnetic-link.tsx`, `stage-bus.ts` — the magnetic CTA and its channel to the field.
- `src/components/landing/fonts.ts`, `fonts/` — self-hosted Newsreader and Amiri subsets (OFL texts and provenance in `fonts/README.md`).
- `src/styles/landing.css` — everything scoped under `.landing`; `:has(.landing)` rules cannot reach the docs shell.
- `tests/landing.test.tsx` — CTA target, language links, one `h1`, no cross-language copy.

No shared contract file (`layout.tsx`, `i18n.ts`, `routes.ts`, `base.css`, `tokens.css`, `package.json`, lockfile) was modified.

## Verified

- `npm run check` on Node 24: formatting, lint, types, 20 tests, content check and static export all pass.
- Chromium against the exported `out/`, 36 of 36 checks: no scroll, nothing clipped and no overlap at 16 viewports (320×568 to 2560×1440, portrait and landscape) for `/`, `/tr/`, `/ar/`; magnetic lean (starts 150px out, peaks about 12px, bounded below the 18px fixed hit area, soft overshoot on release); click, Enter and tap reach `/{locale}/docs/`; tab order and focus ring; reduced motion gives a still plate and a still button; the hero is visible without JavaScript.

## Rendering cost

The field is drawn as one small `fillRect` per filing (scattered filings are untransformed specks), not as stroked paths. A governor in `FieldEngine.govern()` watches frame pace: if frames stay above about 24ms it lowers the canvas resolution a step at a time and, last, the filing density. Each step is a trial that is undone if it does not buy a faster pace (so a 30 Hz display cap does not cost quality), and it never steps back up.

Measured in headless Chromium with software rasterization only (no GPU), on the exported build:

| Viewport      | Pointer moving                                 | Idle   |
| ------------- | ---------------------------------------------- | ------ |
| 390×844 @3x   | 16.7ms median                                  | 16.7ms |
| 1440×900 @2x  | 33ms at full resolution, 16.7ms after one step | 16.7ms |
| 2560×1440 @1x | 33ms                                           | 16.7ms |

The earlier stroked-path renderer measured 67–83ms per frame in the same setup; WebGL2 instancing was tried and was far slower without a GPU (267ms), so Canvas 2D stays. **Not verified on GPU-backed hardware or a physical phone** — worth a look on a real device before release.

## Integration notes for Issue #2

- `README.md` was touched in two lines only (the route description and the repository-map row for the landing); expect a trivial conflict if Issue #2 edits the same lines.
- Running `next dev` appends a Next.js agent-rules block to `AGENTS.md`. That edit is tool-generated, not part of this work; keep or discard it deliberately.
- The hero follows the system colour scheme; the docs tokens are light-only, so a dark-mode visitor moves from a dark hero to light docs.
- There is no favicon (`/favicon.ico` 404s, as before this work); it is a shared-brand decision.
- No canonical or `hreflang` alternates are emitted because no deployment origin is configured; `/` and `/tr/` serve the same hero.
- The landing does not use the shared `LanguageSwitch` (on `/` it would route to the docs); it links to `routes.home(locale)` directly.

## Revision — 2026-11-14: "Equipotential lines"

The animated filings field was removed: several thousand moving marks across the viewport proved visually stressful. The hero keeps its typography, single action, paper grain and rubric pole, and now carries a still plate:

- `hero-plate.tsx` (server component) draws the geometry of a dipole at build time: eight Apollonian circles around one pole (the equipotentials) and eight faint dotted circles through both poles (the field lines). The second pole lies off-sheet, so the rings nest eccentrically. A radial mask fades everything well before the type column; Arabic mirrors the plate to the opposite side. Portrait viewports move the pole above the type.
- Motion is a single arrival: rings settle outward from the pole (opacity + 6% scale, staggered) after fonts load, then nothing moves. Reduced motion and no-JS show the finished plate immediately.
- `hero-stage.tsx` replaces the canvas engine's only remaining duty: setting `data-ready` once fonts are in (CSS failsafe unchanged). `field-canvas.tsx`, `field-engine.ts` and `stage-bus.ts` were deleted; the magnetic CTA no longer reports to a field but keeps its springs, bounded pull and stable hit area.
- The caption now reads "Şek. 1 — Eşpotansiyel çizgiler. Sakin bir alan, tek bir odak." / "شكل ١ — خطوط تساوي الجهد. حقلٌ هادئ، وتركيزٌ واحد."
- Palettes follow the shared theme (`data-theme` or system), and a theme switcher sits beside the language links. Fonts moved to `src/fonts/` (see integration.md).
