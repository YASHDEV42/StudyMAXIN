# StudyMAXIN rebranding handoff — 2026-11-14

## Scope and preserved work

Rebranded the current product from StudyLike Genius to **StudyMAXIN**. No commits, pushes, merges, repository renames or deployments. Started with extensive dirty tracked files and untracked content/UI files; preserved them. No educational content, schema, stable IDs, route structure, dependencies or visual styles were changed by this task. Node 24.22.0 and `npm ci` used.

Main and sibling `feat/hero` remain at `0d188f7`. The sibling worktree was not modified. Local origin remains `https://github.com/YASHDEV42/StudyLike-Genius.git`; the authorized task requested documenting the correction, now recorded in deployment.md. Canonical repository is https://github.com/YASHDEV42/StudyMAXIN. Local directories were not renamed.

## Files changed by this task

- `AGENTS.md`, `README.md`: current brand and repository references; README links deployment guidance.
- `package.json`, `package-lock.json`: package name `studymaxin`, dependency versions preserved.
- `src/components/landing/hero.tsx`, `copy.ts`: wordmark, screen-reader brand and localized metadata titles. Existing emphasis typography preserved with `Study<em>MAXIN</em>`.
- `src/components/docs/header.tsx`: matching wordmark.
- `src/components/docs/glossary.tsx`: branded TSV filename.
- `src/components/docs/search.tsx`, `search-palette.tsx`: private query event renamed consistently.
- `src/components/docs/search-data.ts`: static index fetch respects build-time base path.
- `src/components/docs/markdown.tsx`: plain internal concept anchors respect base path, preserving trailing slashes.
- `src/lib/docs/export.ts`: copied Markdown/bundle links and local source links respect base path.
- `src/lib/site.ts` (new): localized shared metadata, application identity, favicon, Open Graph/Twitter text; origin-gated canonical/hreflang/absolute OG URL and configuration validation.
- `src/app/[locale]/layout.tsx`: branded default title/template.
- `src/app/[locale]/page.tsx`, `src/app/(entry)/page.tsx`, `src/app/[locale]/docs/[[...segments]]/page.tsx`: route-specific shared metadata. Default entry canonical targets Turkish landing when origin is supplied.
- `next.config.ts`: optional build-time NEXT_PUBLIC_BASE_PATH, static export retained.
- `public/icon.svg` (new): simple vector monogram using existing paper/ink/red colors; no generated bitmap or external font.
- `docs/architecture.md`, `docs/integration.md`: current identity/hosting addenda.
- `docs/deployment.md` (new): exact build variables and separate provider steps, indexing assumptions, custom domains, remote correction.
- `docs/handoff.md` and this file: durable task record.

## Intentional old references

Historical issue requirement snapshots and handoff entries retain the former name/repository at the time recorded, absolute existing worktree paths, and `/tmp/studylike-*` evidence names. `docs/source-coverage.md` retains harmless temporary extraction filenames. `studylike-theme` remains the internal localStorage key and matching event in theme.ts/theme-toggle.tsx to preserve existing browser preferences. No obsolete public brand remains in application source or package metadata. Git history was not rewritten.

## Verification and exact stopping point

Initial full `npm run check` passed all stages including 34 unit tests and the root static export (417 pages). An early formatting issue was corrected. A temporary Next Link implementation of concept anchors caused a unit-test trailing-slash mismatch outside Next; replaced it with plain anchors plus the explicit base path, and all 34 tests pass again.

Root export: all **20 Playwright tests passed** using `/usr/bin/chromium`, including real search, language/form switching, glossary TSV, themes, sidebar, next-topic/completion flow, CTA, no-JavaScript hero, internal links and 404s. Additional browser smoke passed 16 combinations of hero/docs, Arabic/Turkish, light/dark and 390/1440 widths, checking title brand, direction, overflow and static search JSON. Screenshots in `/tmp/studymaxin-*.png`; browser suite screenshots in ignored test-results. No PDFs found under public/ or out/. `git diff --check` passed. Logs: `/tmp/studymaxin-{install,check,final-check,browser,smoke,final-tests}.log`.

Final verification complete: the isolated `npm run check` returned exit 0 after formatting, lint, typecheck, all 34 tests, content validation and 417/417 static pages (`/tmp/studymaxin-confirm-check.log`). A preceding combined smoke/check shell returned 143 after completed build output; the isolated rerun resolved that ambiguous termination. Final exported-output Playwright rerun also passed 20/20 (`/tmp/studymaxin-final-browser.log`). Subpath metadata assertions passed for canonical, Turkish hreflang and prefixed favicon; this is not a full subpath export test. Reviewed screenshots include Arabic mobile light docs/dark hero and Turkish desktop light docs/dark hero, with no branding overflow. No actual provider deployment or repository-subpath export has been tested; base-path handling is implemented but the GitHub Pages build/mount must receive acceptance before publication. Vercel setup is documented only. Final output is intended to remain a root-hosted export with no SITE_ORIGIN. Select the provider/origin, rebuild with its documented variables, test on a preview and obtain publication authorization. No dedicated raster social card, sitemap, custom domain, deployment workflow or hosting dependency was introduced.
