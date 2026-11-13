# Phase 2 / Phase 3 integration contract

## Routes

All public URLs end in `/`. Use `src/lib/routes.ts`; the default locale constant is `tr`.

| Route                                                             | Purpose / owner                                                |
| ----------------------------------------------------------------- | -------------------------------------------------------------- |
| `/`                                                               | Static language entry, Phase 3 may redesign it                 |
| `/{locale}/`                                                      | Localized landing placeholder, Phase 3                         |
| `/{locale}/docs/`                                                 | Documentation entry/course list, Phase 2                       |
| `/{locale}/docs/courses/{courseId}/`                              | Ordered chapters/topics, Phase 2                               |
| `/{locale}/docs/courses/{courseId}/topics/{topicId}/lesson/`      | Lesson in the UI locale, Phase 2                               |
| `/{locale}/docs/courses/{courseId}/topics/{topicId}/cheat-sheet/` | Turkish content in either UI locale, Phase 2                   |
| `/{locale}/docs/glossary/`                                        | One Turkish–English global glossary, Phase 2                   |
| `/{locale}/docs/labs/`                                            | Reserved for the basic Phase 2 Labs section; not generated yet |

`locale` is exactly `ar` or `tr`. Every topic ID is global; course and topic IDs are the same across languages. Unsupported locales, wrong course/topic combinations, draft-only topics, and unknown forms produce no exported route. Known topics with a missing form/translation have a valid route with an unavailable message. Language switching preserves the topic and form. Cheat-sheet content never changes language with the shell.

No runtime locale negotiation or redirect is needed. The static `/` entry lets the visitor choose. A localized landing's Start Studying CTA calls `routes.docs(locale)` and always reaches the actual docs entry, even before course materials exist. The marketing page must not select an arbitrary first topic or fetch the content registry.

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

## Explicit Phase 2 work remaining

Issue #2 owns full teaching/demo material (clearly labeled if original PDFs are unavailable), polished responsive reading/navigation, basic Labs, Arabic/Turkish/technical-English full-text search with course discovery, glossary filters/TSV, Markdown copy/topic bundles, richer relationships/concept navigation, and real PDF click-through verification when supplied. This foundation provides basic server rendering and contract tests, not acceptance of those product journeys. The next agent must read the complete issue and validate those journeys with browser tests.

No phase should add accounts, backend services, progress tracking, quizzes, flashcards, AI chat, or sophisticated labs as part of this MVP. No PDFs have been processed and no deployment destination is selected.
