# StudyMAXIN

Public, read-only study documentation for university courses in Arabic and Turkish.
The static foundation from [Issue #1](https://github.com/YASHDEV42/StudyMAXIN/issues/1) now supports the documentation experience from [Issue #2](https://github.com/YASHDEV42/StudyMAXIN/issues/2). Landing/entry presentation remains independently owned by Issue #3.

**Content coverage is deliberately incremental:** one course, 14 discovered chapters, one hundred published topics covering Chapters 1–8 (sections 1.1–1.13, 2.1–2.11, 3.1–3.17, 4.1–4.11, 5.1–5.12, 6.1–6.11, 7.1–7.13, and 8.1–8.11), 300 documents (Arabic lessons, Turkish lessons, Turkish cheat sheets), and 356 glossary entries. Chapters 1–8 have reviewed first-pass coverage; this is not full textbook coverage. See the exact [source inventory and coverage](docs/source-coverage.md).

Thirteen local PDFs contain 633 page instances / 632 page positions (one overlapping page). Originals are private under ignored `materials/`, never bundled or hosted. The application builds without them. Reading pages show a plain textual citation (source document and physical PDF pages); provenance metadata, including each split file’s SHA-256, stays in the content model, validation and Markdown exports. There is no upload or file-matching interface. Technical fixtures remain only under `tests/`.

## Run locally

Use Node.js 24 (`.nvmrc`) and npm. Node.js 22+ is supported.

```sh
npm ci
npm run dev
```

Open <http://localhost:3000/tr/docs/> or <http://localhost:3000/ar/docs/>.
`/` renders the Turkish hero by default; `/tr/` and `/ar/` render the localized hero.
The language bar selects a localized landing; Start Studying opens its documentation.
No environment variables, accounts, external services, or credentials are required.

```sh
npm run check       # formatting, lint, types, tests, content validation, production build
npm run content:check
npm run build       # validates content, then exports static files to out/
python3 -m http.server 3000 --directory out # local production preview
```

The docs include a collapsible course/chapter sidebar, a navbar search palette (`Ctrl K` / `⌘K`, or `/`) over multilingual full-text search, a prominent Next Topic step after each lesson, concept/prerequisite/related/backlink navigation, a filterable Turkish–English glossary table with TSV copy/download, Markdown copying, complete topic bundles, heading navigation, light/dark themes (system default, explicit choice stored locally), and a simple Labs page that accurately records the missing laboratory workbook.

Browser acceptance runs against **exported** output (Python 3 is used only for local preview):

```sh
npm run build
npx playwright install chromium
npm run test:e2e
# Or use an existing Chromium installation:
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
```

Browser flows and unit tests do not require the private originals. Browser screenshots/results are disposable under ignored `test-results/`.

`out/` is disposable and ignored. A future host must serve directory indexes and return `404.html` with a 404 status for unknown paths. There is no runtime Next.js server (`next start` is inapplicable to this export). Provider-neutral build settings and provider-specific publication steps are in [deployment readiness](docs/deployment.md). No deployment workflow is enabled.

## Repository map

| Path                                             | Responsibility                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `content/`                                       | Git-managed courses, chapters, topic metadata, Markdown, source registry, global glossary |
| `src/lib/content/`                               | Authoritative Zod schemas, filesystem loader, integrity validation                        |
| `src/lib/routes.ts`                              | Shared routes, language switching, stable identity links                                  |
| `src/lib/docs/`                                  | Public projections, search/export/glossary logic and docs-only messages                   |
| `src/lib/i18n.ts`                                | Supported locales, direction, small UI dictionary                                         |
| `src/app/[locale]/docs/`, `src/components/docs/` | Documentation shell; Phase 2 owns the full study experience                               |
| `src/app/[locale]/page.tsx`, `src/app/(entry)/`  | Localized landing hero; Phase 3 owns presentation here                                    |
| `src/styles/tokens.css`, `src/lib/theme.ts`      | Shared light/dark design tokens and the pre-paint theme script                            |
| `src/fonts/`                                     | Self-hosted display fonts shared by the hero and docs headings                            |
| `tests/`                                         | Isolated technical fixtures and contract/rendering tests                                  |
| `docs/`                                          | Decisions, authoring guide, integration contracts, durable handoff                        |

Start with [architecture](docs/architecture.md), [authoring](docs/content-authoring.md), [integration boundaries](docs/integration.md), and the [handoff](docs/handoff.md).

Dependency versions are pinned and locked. TypeScript 6.0.3 is the latest stable version supported by the current `typescript-eslint` API; upgrading to TypeScript 7 requires revisiting that compatibility decision. See the architecture record for research links and limitations.
