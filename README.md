# StudyLike Genius

Public, read-only study documentation for university courses in Arabic and Turkish.
This repository implements [Issue #1](https://github.com/YASHDEV42/StudyLike-Genius/issues/1): architecture, content contracts, multilingual routing, and a minimal working shell.

**There are no course PDFs or published educational materials in this repository.**
The production catalog is deliberately empty. Technical fixtures live only in `tests/`.
The complete study experience and marketing page belong to Issues #2 and #3.

## Run locally

Use Node.js 24 (`.nvmrc`) and npm. Node.js 22+ is supported.

```sh
npm ci
npm run dev
```

Open <http://localhost:3000/tr/docs/> or <http://localhost:3000/ar/docs/>.
`/` is a static language chooser; `/tr/` and `/ar/` are landing placeholders.
No environment variables, accounts, external services, or credentials are required.

```sh
npm run check       # formatting, lint, types, tests, content validation, production build
npm run content:check
npm run build       # validates content, then exports static files to out/
python3 -m http.server 3000 --directory out # local production preview
```

`out/` is disposable and ignored. A future host must serve directory indexes and return `404.html` with a 404 status for unknown paths. There is no runtime Next.js server (`next start` is inapplicable to this export). Hosting and deployment are intentionally unconfigured.

## Repository map

| Path                                             | Responsibility                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `content/`                                       | Git-managed courses, chapters, topic metadata, Markdown, source registry, global glossary |
| `src/lib/content/`                               | Authoritative Zod schemas, filesystem loader, integrity validation                        |
| `src/lib/routes.ts`                              | Shared routes, language switching, stable identity links                                  |
| `src/lib/i18n.ts`                                | Supported locales, direction, small UI dictionary                                         |
| `src/app/[locale]/docs/`, `src/components/docs/` | Documentation shell; Phase 2 owns the full study experience                               |
| `src/app/[locale]/page.tsx`, `src/app/(entry)/`  | Landing/entry placeholders; Phase 3 owns presentation here                                |
| `src/styles/tokens.css`                          | Shared design tokens                                                                      |
| `tests/`                                         | Isolated technical fixtures and contract/rendering tests                                  |
| `docs/`                                          | Decisions, authoring guide, integration contracts, durable handoff                        |

Start with [architecture](docs/architecture.md), [authoring](docs/content-authoring.md), [integration boundaries](docs/integration.md), and the [handoff](docs/handoff.md).

Dependency versions are pinned and locked. TypeScript 6.0.3 is the latest stable version supported by the current `typescript-eslint` API; upgrading to TypeScript 7 requires revisiting that compatibility decision. See the architecture record for research links and limitations.
