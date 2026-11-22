# Phase 2 / Phase 3 integration contract

## Routes

All public URLs end in `/`. Use `src/lib/routes.ts`; the default locale constant is `tr`.

| Route                                                             | Purpose / owner                                                  |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| `/`                                                               | Default Turkish hero, Phase 3                                    |
| `/{locale}/`                                                      | Localized hero, Phase 3                                          |
| `/{locale}/docs/`                                                 | Documentation entry/course list, Phase 2                         |
| `/{locale}/docs/courses/{courseId}/`                              | Ordered chapters/topics, Phase 2                                 |
| `/{locale}/docs/courses/{courseId}/topics/{topicId}/lesson/`      | Lesson in the UI locale, Phase 2                                 |
| `/{locale}/docs/courses/{courseId}/topics/{topicId}/cheat-sheet/` | Turkish content in either UI locale, Phase 2                     |
| `/{locale}/docs/glossary/`                                        | One Turkish–English global glossary, Phase 2                     |
| `/{locale}/docs/labs/`                                            | Basic Labs section, Phase 2                                      |
| `/{locale}/docs/search/`                                          | Published multilingual full-text search, Phase 2                 |
| `/{locale}/docs/search-index.json`                                | Static public search index (route handler, export-time), Phase 2 |

`locale` is exactly `ar` or `tr`. Every topic ID is global; course and topic IDs are the same across languages. Unsupported locales, wrong course/topic combinations, draft-only topics, and unknown forms produce no exported route. Known topics with a missing form/translation have a valid route with an unavailable message. Language switching preserves the topic and form. Cheat-sheet content never changes language with the shell.

No runtime locale negotiation or redirect is needed. The static `/` entry renders the default Turkish hero with explicit language links. A localized landing's Start Studying CTA calls `routes.docs(locale)` and always reaches the actual docs entry, even before course materials exist. The marketing page must not select an arbitrary first topic or fetch the content registry.

## File ownership

| Owner                             | Files                                                                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 2 docs                      | `src/app/[locale]/docs/**`, `src/components/docs/**`, `src/styles/docs.css`, `content/**`, docs-specific UI messages                                                  |
| Phase 3 landing                   | `src/app/[locale]/page.tsx`, `src/app/(entry)/**`, new `src/components/landing/**`, new `src/styles/landing.css`, landing-specific messages/assets                    |
| Shared contract; coordinate edits | `src/app/[locale]/layout.tsx`, `src/lib/i18n.ts`, `src/lib/routes.ts`, `src/lib/content/**`, `src/styles/base.css`, `src/styles/tokens.css`, `package.json`, lockfile |

The locale root layout supplies `<html lang dir>` and shared base styles only. The docs layout supplies its own header/navigation/reading shell. Landing presentation must remain outside `docs/` and must not add its layout around the reading experience. CSS for docs is scoped under `.docs-shell`; scope landing styles under its own wrapper. Keep shared base styles minimal. New branding can coordinate through the existing color/font tokens.

`LanguageSwitch` is a shared small Client Component. It changes only the locale segment; there is no global client provider, persisted progress, or auth context. Separate root layouts mean navigation between `/` and localized pages may perform a full document load, which is acceptable for the entry page.

## Content/data boundary for Phase 2

`getContent()` in `src/lib/content/index.ts` is server-only and loads the validated catalog, with React request-level caching. Use it in Server Components/static generation. `loadContent()` is the underlying filesystem function and supports isolated fixture roots for tests; production never switches to fixtures via an environment variable.

The assembled catalog includes `schemaVersion: 1`, courses, topics with exact Markdown bodies, sources, and the global glossary. Drafts remain present internally to validate authoring relationships; public consumers **must filter status**. Reuse `isPublished`, `docsSegments`, and `resolveDocsRoute`. Never send the unfiltered entire catalog to a Client Component or search index. Export only public document fields needed by that feature. Keep source references/provenance with any Markdown bundle.

Build-time filesystem loading occurs before the static export. Content is not an API or mutable client store. No loader or Node filesystem module belongs in a client import graph. Each production build reruns validation; all metadata and declared body files must pass, including drafts.

Optional catch-all routing intentionally centralizes the docs route list. It always generates docs/glossary indexes, including an empty catalog, avoiding separate dynamic pages with no static parameters. Adding Labs/search routes is a coordinated addition to route helpers, segment generation/resolution, and the view. Do not introduce a second source of truth for paths.

## Phase 2 implementation and integration notes

Issue #2 now implements the docs product and a first verified source unit. `src/lib/docs/` owns docs messages, build-time public projections, search index construction, filtering, exports and Markdown navigation helpers. Client Components receive only fields needed for their feature, after publication filtering. Search indexes include both lesson languages and Turkish cheat sheets; a lesson result opens its explicitly labeled content language, while cheat-sheet results preserve the UI locale. Normal same-topic language switching still preserves the form.

Necessary shared edits: `routes.ts` adds search/Labs paths to helpers, segment generation and resolution; docs metadata recognizes them. `schema.ts`/`load.ts` add private originals (see architecture/authoring). Package/lockfile add only pinned Playwright development tooling and `test:e2e`; TypeScript stays at 6.0.3. `.gitignore` excludes originals and browser outputs. Base styles, tokens, locale layout, landing/entry files and shared language switch are unchanged.

The docs stylesheet stays scoped to `.docs-shell`. Phase 3 can continue calling `routes.docs(locale)` without fetching the catalog. Do not wrap docs in a landing layout. Source inventory and completion claims must follow `docs/source-coverage.json`, not the number of listed chapters. No PDFs should be copied into Phase 3 assets.

No phase should add accounts, backend services, progress tracking, quizzes, flashcards, AI chat, or sophisticated labs as part of this MVP. Source review is recorded in `source-coverage.json`; no deployment destination is selected.

## Consolidation — 2026-11-13

Main now combines Phase 2 docs and Chapter 1 with the unchanged Phase 3 hero copied from the dirty `feat/hero` worktree. No Git merge or commit was performed: both branches still point at `0d188f7`. Hero files occupy the Phase 3 boundaries above; shared routes, layouts, tokens, dependencies and schema were not changed by integration. README route descriptions were reconciled manually, preserving current content totals.

The original hero worktree remains untouched. Main's existing private-source AGENTS policy is retained; the other worktree's Next.js-generated agent block is left there. The old 20-test report comprises 17 foundation tests plus 3 landing tests; main's 27 comprises the same 17 plus 9 docs tests and 1 coverage test. Combined: 30 passing unit tests.

The hero follows system light/dark preference; docs intentionally retain their light reading palette. Landing selectors are scoped to the mounted hero, including the root/body `:has(.landing)` rules. Do not add a theme system for this transition. No favicon was added: shared brand artwork remains undecided. Canonical and hreflang metadata remain deferred until an actual deployment origin is supplied; never emit a guessed domain or localhost canonical. Language navigation uses explicit localized links in the meantime.

See the latest handoff addendum for combined validation and remaining limitations.

## UI/UX refinement — 2026-11-14

A cross-cutting design pass (hero, docs shell, reading flow, glossary, themes) changed these boundaries deliberately:

- **Theme is now shared.** `src/styles/tokens.css` defines equal light and dark palettes; dark applies under `prefers-color-scheme: dark` unless `<html data-theme="light">`, and always under `data-theme="dark"`. `src/lib/theme.ts` holds the storage key and the tiny inline script both root layouts (`src/app/[locale]/layout.tsx`, `src/app/(entry)/layout.tsx`) place in `<head>` so an explicit choice applies before first paint (`suppressHydrationWarning` on `<html>` for that attribute only). `src/components/theme-toggle.tsx` (System / Light / Dark) is used by the hero bar and the docs header. Choice lives only in `localStorage`; no cookie, account or server.
- **Fonts are shared.** The self-hosted Newsreader/Amiri subsets moved from `src/components/landing/fonts/` to `src/fonts/` (provenance/OFL unchanged). Root layouts apply their CSS variables (`--font-newsreader`, `--font-amiri`) to `<html>`; tokens expose `--font-display` / `--font-display-ar`. Body text stays on the system stack.
- **Search index is a static file.** `src/app/[locale]/docs/search-index.json/route.ts` (force-static, one per locale) serves the published index without `bodyIndex` (re-derived client-side). The navbar palette and the search page fetch it lazily; reading pages no longer embed it. Publication filtering is unchanged (`publicContent`).
- `LanguageSwitch` gained an optional `className` (default `language-switch`); behaviour is unchanged.
- `topicOptions()` now also projects `order` so navigation can sort topics within a chapter.
- The browser-local PDF picker (`private-source.tsx`) was removed. Citations are text: source title (which names the split file) plus physical PDF pages. Provenance metadata, SHA-256 validation and Markdown/bundle exports are unchanged.

## StudyMAXIN identity and hosting — 2026-11-14

Current identity is **StudyMAXIN**; earlier phase notes describe historical states. See [deployment readiness](deployment.md) for build-time base paths, optional origin/canonical/hreflang configuration, and separate GitHub Pages/Vercel instructions. Static export and stable content routes remain unchanged.

## Operating Systems Quiz Trainer

The quiz is a separate feature under `/{locale}/quiz/`. It uses the shared locale layout and theme and links from the docs header and mobile drawer. Its routes, UI and content loader live outside the docs catch-all and landing. The scope supersedes the historical Phase 2 deferral for local quizzes and progress. See the [quiz architecture and authoring guide](quiz.md).
