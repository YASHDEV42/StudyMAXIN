# Architecture record: Phase 1

Status: accepted for Issue #1. Evaluated on 2026-11-13 against the live npm registry and primary documentation. The repository began with only `.git/`, no commits and no existing application. Issue #1 had no comments; its requirements are captured in [requirements/issue-1.md](requirements/issue-1.md).

## Decisions

### One static Next.js application

Use Next.js 16.4.6 App Router, React 19.3.1, strict TypeScript, and native CSS. `output: "export"` runs Server Components at build time and produces `out/`. All content is local and read-only, so a database, CMS, API, authentication, server process, workspace monorepo, and deployment infrastructure provide no benefit in this phase. Explicit locale prefixes avoid runtime language negotiation. Future search, filtering, and copy/export can run in small Client Components over public build-generated data.

The [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports) documents build-time Server Components and the limitations of runtime-only features. We chose export as an architectural constraint, not a hosting commitment. No `proxy`, cookies, runtime redirects, Server Actions, or API routes. Native static asset hosting remains possible on many providers. Default to root-domain hosting; a future subdirectory host must explicitly add and verify a base path.

### Small shell over established Markdown tooling

Use `react-markdown` and `remark-gfm` for rendering; `unified`, `remark-parse`, and `unist-util-visit` provide AST-based integrity checks. Zod 4 validates metadata and infers TypeScript types. These established libraries own parsing and rendering. Application code owns only the domain rules and route mapping.

Alternatives evaluated:

| Option                                                                                                                                 | Strength                                                                             | Decision                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Fumadocs](https://www.fumadocs.dev/docs/next/internationalization) + [MDX collections](https://www.fumadocs.dev/docs/mdx/collections) | Ready-made docs UI, typed collections, i18n                                          | Viable for a richer docs product. Its collection/build integration and UI layer are unnecessary for this contract phase; cross-course graphs and three separate document forms would still need domain validation. |
| [Nextra](https://nextra.site/docs)                                                                                                     | Integrated docs theme, MDX, search                                                   | Viable, but theme/file conventions add coupling between content and UI. Its [documented locale proxy](https://nextra.site/docs/guide/i18n) cannot run in a static export; explicit locale routing is simpler here. |
| Plain Next.js + Markdown                                                                                                               | Direct control of domain metadata, stable IDs, empty catalog, and landing boundaries | Selected. We accept owning the small shell; Phase 2 must deliver navigation/search/readability, not reconstruct a generic docs framework.                                                                          |

We do not claim the alternatives cannot support the requirements. This is a scope and complexity choice. A future theme can consume the validated model without changing identity or authoring format.

### Git-managed JSON metadata and Markdown bodies

Courses own ordered chapters. Topics have globally unique, permanent ASCII IDs and belong to a course/chapter. Display names are Arabic/Turkish data and never determine URLs. Related topics are directed links; prerequisites form a directed acyclic graph and may cross course boundaries. Metadata lives in per-course/per-topic JSON files, so future courses do not create a single large catalog merge hotspot.

Each topic may declare three distinct documents: Arabic lesson, Turkish lesson, Turkish cheat sheet. Metadata declares publication state, provenance, citations, title and summary; bodies use deterministic filenames. No duplicated frontmatter or executable MDX. The loader rejects orphan bodies. The schema permits incomplete topics and drafts while preventing draft-only topics from entering public routes. It does not equate a lesson with a summary or require a cheat sheet as a substitute.

[Zod's parsing model](https://zod.dev/basics) supplies runtime validation and inferred types. `schema.ts` is the authority; changes to the contract need a documented migration. `schemaVersion: 1` labels the assembled catalog API; it is not repeated in authored records.

### Locale and content language are separate

Locale is always `ar` or `tr` in the URL. HTML `lang` and `dir` come from the locale root layout, following [Next.js locale segments](https://nextjs.org/docs/app/guides/internationalization). The documentation shell is nested below it; the landing page shares no docs layout. A separate root layout serves the language-neutral `/` entry.

Language switching replaces only the first path segment. It preserves course ID, topic ID, and document form. A missing lesson translation shows an unavailable message; there is no automatic fallback. Both forms have routes for every published topic, even when one form is missing. Cheat-sheet bodies always carry `lang="tr" dir="ltr"`, including under `/ar/`. Navigation and concept links retain the UI locale. Code is LTR and isolated; glossary Turkish/English fields carry explicit language tags. CSS uses logical properties. This follows [W3C direction guidance](https://www.w3.org/International/questions/qa-html-dir); a paragraph's language is not inferred from its characters.

### Content integrity is a required build step

`npm run build` first runs `content:check`; loading content during static generation also validates it. CI runs the complete check. Validation covers strict metadata, identities/order, course/chapter membership, document uniqueness/language, files, citations/page bounds, glossary associations, relation targets, cycles, and Markdown concept links. Drafts remain schema-valid and cannot create public dead links. Published source-based documents require available cited sources. Local source bytes must match a declared SHA-256 and PDF header; PDF page counts remain a manual assertion to verify against the original, not a claim that the tool parsed them.

Remote source links are HTTPS and syntactically validated; builds deliberately do not fetch them. Human reviewers must verify availability, source identity, page counts, rights to redistribute local files, and factual faithfulness. No underlying materials have been processed. Illustrative content must be visibly labeled and must never invent source citations.

The [react-markdown security guidance](https://github.com/remarkjs/react-markdown#security) informs our Markdown boundary: raw HTML/JSX is rejected, raw HTML rendering is disabled, and links are restricted to supported URLs or validated concept references. Do not add `rehype-raw` or relax URL transformation casually. Markdown is also retained as text for future clean copy/export; no custom source compiler is needed.

## Toolchain and future work

- Node 24 is the development/CI baseline; npm lockfile and exact direct dependency versions provide reproducibility.
- TypeScript 7.0.2 was evaluated: type checking/build worked, but `typescript-eslint` failed because 7.0 has no compiler API. Use TypeScript 6.0.3, the newest stable compatible release, per the [support range](https://typescript-eslint.io/users/dependency-versions/) and [TypeScript 7 transition notes](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/). Revisit when parser support lands; do not add two compilers for this small app.
- The lint toolchain still requests minimatch 10, affected by [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). A narrowly scoped npm override replaces only minimatch 10 with stable 11.0.8; the older unaffected minimatch 3 consumers keep their version. This crosses a transitive major boundary, so lint/check and clean installation must remain green. Remove the override once upstream lint dependencies accept a patched version. It affects development tooling, not the exported application.
- No fonts are fetched during builds. System Arabic/Turkish-capable font stacks are the foundation; final typography and self-hosted fonts belong to Phase 2/3.
- Search indexes, glossary filters/TSV, Markdown copy bundles, polished reading UI, and a basic Labs section belong to Issue #2. The catalog already exposes associations, citations, bodies, and relationships needed by those features. No search engine is selected prematurely.
- Issue #3 owns the marketing entry/landing presentation and uses the shared route helper for its CTA. See [integration.md](integration.md).

## Phase 2 addendum — 2026-11-13

The Phase 1 decisions above remain in force. The production catalog is no longer empty; consult the coverage ledger for actual source scope rather than the historical status statements above.

- Docs remain under the optional catch-all route and static export. Search and Labs extend the same route registry. Landing/entry presentation, base styles and shared tokens were left untouched.
- No docs framework migration: Server Components render Markdown and relationships; small Client Components own search, glossary controls, copy/download, sidebar state and local PDF selection. The Markdown parser is used at build time for search indexing and exports, outside the search/filter client graph.
- A single publication projection removes draft documents, draft-only topics and unused source records before discovery or export. `getContent()` remains server-only; no filesystem loader reaches a client graph. The search index is built per UI locale over published document text and associated TR/EN terms. Search is deterministic lexical AND matching with Turkish/Arabic normalization and title/term ranking, not semantic search or stemming. Results identify their actual content language.
- A necessary additive source-schema variant, `private`, supports reviewed copyrighted originals without redistributing them. It records a safe filename, physical page count, SHA-256 and reason. Existing `local`, `remote`, `unavailable` variants keep their meaning; existing records require no migration. Schema version remains 1. Present private originals must match the digest/header; missing private bytes are allowed in public/CI checkouts because review evidence and fingerprints are durable. This does not automatically prove factual fidelity or page counts.
- Cited private originals expose no hosted URL. A browser-local picker verifies the fingerprint and creates a temporary blob PDF URL for the cited physical page. No source upload or backend is added. Local/remote public citations retain ordinary page links. This tradeoff preserves traceability while redistribution permission is unresolved.
- Markdown and bundles include provenance and page references; parsed concept links become site-relative URLs. TSV exports preserve both examples and neutralize formula-like cells. No progress/accounts/chat/exercise system was added. Labs accurately states that the separate workbook was not supplied.
- Pinned `@playwright/test` 1.65.0 is development-only, with browser acceptance over exported output. Python 3 serves that disposable preview; production remains static. `npm run check` retains its existing checks; `npm run test:e2e` runs browser acceptance after building. The matching-private-original test is conditional on those bytes being present.

## UI/UX refinement addendum — 2026-11-14

Earlier decisions stand. This pass replaces several Phase 2/3 presentation choices; the integration contract records the file-level changes.

- **Themes.** Light and dark palettes are shared tokens. The system preference is the default; an explicit choice is stored in `localStorage` and applied by a tiny inline `<head>` script before paint (no cookie, server or account). This supersedes the earlier "docs stay light, no theme system" note.
- **Search in the navbar.** A native `<dialog>` command palette (combobox + listbox ARIA, `⌘K` on Apple platforms, `Ctrl K` elsewhere, `/` outside text fields) reuses the existing lexical search. No UI library was added: native `dialog` provides the top layer, inert background, focus return and Escape. The index ships as a static per-locale JSON route handler fetched on first use, which also removed the ~2 MB inline index from the search page.
- **Sources.** The browser-local PDF picker was removed from reading pages. Citations show the source title and physical PDF pages only. The `private` source variant, SHA-256 validation, citation bounds checks and export provenance are unchanged.
- **Hero.** The canvas field was replaced by a static SVG plate (see `landing.md`).
- **No new dependencies.**

## StudyMAXIN identity and hosting — 2026-11-14

Current identity is **StudyMAXIN**; earlier phase notes describe historical states. See [deployment readiness](deployment.md) for build-time base paths, optional origin/canonical/hreflang configuration, and separate GitHub Pages/Vercel instructions. Static export and stable content routes remain unchanged.
