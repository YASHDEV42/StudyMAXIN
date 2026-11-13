# StudyLike Genius

Read `README.md`, `docs/architecture.md`, `docs/content-authoring.md`, `docs/integration.md`, and `docs/handoff.md` before extending this foundation. The active GitHub issue defines phase scope.

- Next.js App Router, static export, Arabic (`ar`, RTL) and Turkish (`tr`, LTR). Keep all generated routes compatible with `output: "export"`.
- `src/lib/content/schema.ts` is the authoritative content model. Do not translate stable IDs or add a second metadata schema.
- Course materials are currently absent. Never invent source material, citations, page numbers, or processing claims. Technical fixtures remain under `tests/`.
- Lessons and Turkish-only cheat sheets are distinct forms. Missing translations are explicit; never silently substitute Turkish lessons for Arabic.
- Content loading is server-only. Filter drafts out of any public client data/search/copy feature.
- Phase 2 owns documentation UI; Phase 3 owns landing/entry presentation. Preserve file/route boundaries in `docs/integration.md`.
- Use Node 24 and `npm ci`. Run `npm run check` after meaningful changes. Do not upgrade TypeScript to 7 until the ESLint toolchain supports its API.
- Do not commit, push, merge, or deploy without user authorization. Save a durable handoff before context exhaustion.
