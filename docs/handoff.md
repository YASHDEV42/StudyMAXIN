# Content-production handoff

Date: 2026-11-13. Repository: `YASHDEV42/StudyLike-Genius`. Current assignment: continue real textbook production under Issue #2. This session was content-only: **no application source, styles, routes, dependencies, schema or landing files were changed**. The shared checkout also contains the previous session’s uncommitted implementation; preserve it. No commits, pushes, merges, deployments or external messages were made.

## Restored and verified baseline

Read AGENTS, README, architecture, authoring, integration, source coverage and the previous handoff; inspected the authoritative schema/validation, current metadata/bodies/glossary and the actual first PDF. The reported baseline was confirmed against the working tree: **three topics, nine published documents, 25 glossary entries**, covering only **1.3–1.4**. The 13-file inventory and private-source registry remain unchanged. Node 24.22.0 was used with `npm ci`; baseline `npm run check` passed with 27 tests and static export.

A session-start SHA-256 manifest at `/tmp/studylike-content-session/baseline.json` distinguishes this session’s edits from the pre-existing dirty checkout. All nine original Markdown bodies were checked against that manifest and are **unchanged**.

## Completed this session

Followed the prior stopping point **1.5**, then returned to fill **1.1–1.2 before advancing further**. No opening gap remains within 1.1–1.5.

| New topic ID                    | Source section                     | First PDF physical pages | Printed pages |
| ------------------------------- | ---------------------------------- | ------------------------ | ------------- |
| `threat-modeling-stride`        | 1.5 opening + 1.5.1                | 27–29                    | 16–18         |
| `threat-prioritization-methods` | 1.5.2–1.5.3                        | 30–31                    | 19–20         |
| `attack-trees-portal-model`     | 1.5.4–1.5.6                        | 32–34                    | 21–23         |
| `log4shell-trust-boundaries`    | 1.1 opening through definition box | 13–16                    | 2–5           |
| `security-mindset`              | 1.1.1–1.1.2 + ethical warning      | 16–18                    | 5–7           |
| `security-history`              | 1.2–1.2.3                          | 18–21                    | 7–10          |

Each new topic has an independently useful Arabic teaching lesson, Turkish teaching lesson and distinct Turkish exam sheet: **six new topics / eighteen new documents**. Lessons explain motivation, mechanisms, examples, distinctions and relationships, with author additions/corrections labeled. All are published source-based documents with the actual private source ID `teori-1-1-42` and accurate physical-page ranges.

**Glossary:** 43 new entries (19 for threat modeling, 24 for opening/history), taking the total from 25 to **68**. Each has TR/EN terms and newly authored natural examples in both languages. Twenty original entries gained useful new topic associations. Existing entries were reused rather than duplicated.

**Current totals:** one course, fourteen discovered chapters, nine topics, twenty-seven published documents, sixty-eight glossary entries. First-pass teaching coverage is **1.1–1.5 only**. Topic metadata is ordered by source sequence (0, 5, 10, 20, 30, 40, 50, 60, 70); the original three IDs/URLs/bodies are preserved.

## Source review and pedagogical decisions

All text and rendered pages **27–34** and **13–21** of `materials/teori-1-1-42.pdf` were read. The Stuxnet diagram was enlarged separately to read its SCADA/PLC/physical-layer relationship. No textbook images, raw extraction dumps or PDF bytes were placed in tracked/public assets.

- **STRIDE:** preserved the cycle, six category/goal mappings and full per-element matrix, including data-store R(log). Applicability is explained as a questioning guide, not proof that unmarked threats cannot exist. DFD’s four element types are separate from trust boundaries.
- **DREAD/PASTA:** all source scores, dimensions, formula ranges, seven PASTA stages and method comparisons preserved. Arithmetic independently checked: raw A=33/B=37/C=28; Damage×2 gives 42/42/31, not A strictly first; Damage×3 gives 51/47/34. Weighted averages and subjective/ordinal limits are labeled additions.
- **Attack trees/portal:** both diagrams reconstructed as accessible text/tree/table, preserving leaves, gate assumptions, costs and the full portal risk register. AND gates for the password/recovery branches are source example assumptions, not universal attack requirements. Costs are not real prices; min/sum are not reused as probability rules. Control labels are distinguished from verified/perfect effectiveness; role checks and object-level authorization remain distinct.
- **Log4Shell:** text extraction corrupted slashes/comments, so code was read from rendered pages. Logger call retained, simplified JNDI call path and all LDAP reference fields explained; six steps retain runtime conditions. No exploit was executed. Historical mitigations are explicitly not a current patch runbook. Apache release notes correct the PDF’s 2.15.0 date/protocol simplification; the exact OpenJDK 8u191 code verifies the default. API/core and configuration-write conditions are qualified. The current central Apache table has an inconsistent 44832 fixed-version row; historical chronology uses the explicit 2.17.1 release notes instead of silently changing the PDF’s correct milestone.
- **Security mindset:** all parking-lot questions, positive/negative requirements, adaptive adversary, three habits and ethical warning covered. Fail-closed is separated from general fail-safe behavior; the source’s “99%/1%” and absence-of-bugs language is not presented as measured probability or universal proof.
- **History:** retained Multics/Unix, Ware/TCSEC, Morris reinfection and approximate scale, CERT/CSIRT, all named cases and the source’s 2025–2026 outlook. Diagrams/photos/maps are explained without inventing quantitative evidence. Morris’s attributed motive and possible Stuxnet USB entry retain uncertainty. MS17-010 is a bulletin/update, not one CVE; ML-KEM and ML-DSA purposes are distinguished. FBI, CMU SEI, Microsoft and NIST primary references support selected factual clarifications.

Supplementary verification URLs/findings are in `docs/source-coverage.json` and linked in the relevant lessons, separately from PDF citations. Source verification does not mean an independent educator has approved the lessons. A full-book factual audit has not been done.

## Exact coverage boundaries and remaining gaps

See [source-coverage.md](source-coverage.md) and [source-coverage.json](source-coverage.json). The 13 PDFs still total **633 page instances / 632 page positions** because position 307 overlaps. The first source remains **42 physical pages**, SHA-256 **637247b15e9c2f239ae9d012373fcc2b83f7eaaa525907fcae5e083e3a90f128**.

The completed teaching span **physical 13–34** is not a claim that all boundary-page text is taught: the weekly objectives above 1.1 on page 13 and 1.6 starting on page 34 are excluded. Chapter opener/objectives were inspected for orientation only. Shared-page sections are attributed precisely in each topic and ledger entry. Original 1.3–1.4 coverage is retained rather than regenerated.

**Unprocessed:** 1.6–1.13 and all chapters 2–14. Later glossary extraction is pending. The separate Laboratory Workbook remains unavailable. Redistribution permission for the private originals remains unestablished. Independent educational/editorial review is pending.

## Files changed in this session

- New `content/topics/{threat-modeling-stride,threat-prioritization-methods,attack-trees-portal-model,log4shell-trust-boundaries,security-mindset,security-history}/`, each with `topic.json`, `lesson.ar.md`, `lesson.tr.md`, `cheat-sheet.tr.md` (24 new files).
- `content/glossary.json`; `content/courses/information-systems-security/course.json` (truthful coverage description); original three `topic.json` files (only ordering).
- `docs/source-coverage.{md,json}`, `docs/handoff.md`, README coverage totals.
- Only test maintenance: `tests/browser/docs.spec.ts` reads the current glossary count instead of hardcoding 25. This lets valid content expansion pass the existing acceptance test; no product/infrastructure changes were necessary.

The previous frontend implementation remains as found. Do not infer this session’s scope from the whole `git diff`, which includes earlier uncommitted work. Issue #3 landing files, application source and styles are unchanged relative to session start.

## Verification

Environment login shell resolves Node 20, so use:

```sh
export PATH=/home/yash/.local/share/mise/installs/node/24.22.0/bin:$PATH
```

- Baseline: Node 24, `npm ci`, content validation, 27 tests and complete `npm run check` passed.
- After completing 1.5: `npm run content:check` passed at 6 topics/44 glossary entries; complete `npm run check` passed with 27 tests and static export (39 generated pages).
- After backfilling 1.1–1.2: `npm run content:check` passed at **9 topics / 68 entries**. Complete `npm run check` passed: format, lint, types, **27 tests**, content integrity and **51 generated static pages**. The coverage-consistency test checks every completed unit’s three forms, exact citation ranges, source fingerprints and glossary count.
- `git diff --check` passed. Hash comparison confirms the nine prior Markdown bodies are unchanged; all application source remains unchanged.
- DREAD and tree arithmetic were recomputed during review, and Arabic/Turkish essential coverage plus cheat-sheet facts were compared against source checklists. Automated checks validate structure/links/publication, not pedagogical truth.
- Browser acceptance passed **10/10**, no skips: `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e -- --workers=2`, including the matching private PDF and all original study journeys. The glossary assertion now follows the actual 68-entry catalog. No browser/application failure occurred.
- Supplementary Apache citation fragments were checked against actual HTML IDs and corrected to `release-notes-2-15-0`; CVE fragment IDs were confirmed. Complete `npm run check` passed again after that correction. This is citation accuracy work, not a product change.

## Exact next section and stopping point

That earlier stopping point is superseded by the section 1.6 addendum below. The current stop point is after 1.6, before 1.7. The browser preview server has stopped. All 13 private originals remain present; exported PDF count is zero. Preserve all local work; no authorization to commit or deploy exists. Temporary review images/text/manifests live under `/tmp/studylike-content-session/`; they are not production content.

## Content production addendum — section 1.6 (2026-11-13)

Completed `risk-management` for section 1.6 only: Arabic lesson, independent Turkish lesson, Turkish exam sheet, nine glossary terms and relationships. Scope is physical pages 34–38, from the 1.6 heading through the residual-risk conclusion. Page 34’s preceding 1.5 risk-register example and page 38’s following 1.7 text are explicitly excluded. Reviewed extracted source text and rendered page set; checked SLE/ALE/ROSI arithmetic (40,000; 120,000; 20,000; ROSI 1 / 100%). The PDF code and risk matrix are taught in prose/tables; no source assets were copied.

Changed: `content/topics/risk-management/{topic.json,lesson.ar.md,lesson.tr.md,cheat-sheet.tr.md}`, `content/glossary.json`, `docs/source-coverage.{json,md}`, and this handoff. Total: 10 topics, 30 documents, 77 glossary entries. No app/style/navigation/landing code changed. Next source scope is 1.7 beginning on physical page 38; do not begin 1.8. Remaining work includes 1.7–1.13 and chapters 2–14, independent educator review, and later glossary extraction. No commit/deploy actions taken.

Checks: `npm run content:check` passed (10 topics, 77 glossary entries). Full `npm run check` passed: format, lint, typecheck, 27 tests and static build/export. `git diff --check` passed.

## Content-production addendum — section 1.7

Completed `security-design-principles` for section 1.7 only: independent Arabic and Turkish lessons, a separate Turkish exam sheet, eight new glossary entries, and relationships to the existing security-mindset, CIA, identity/access, attack-tree and risk topics. Exact scope is `teori-1-1-42.pdf` physical pages **38–40** (printed pages 27–29), beginning at the 1.7 heading after the 1.6 conclusion and ending before 1.8 on physical page 41. Text and rendered pages were reviewed, including the design examples and the defense-in-depth ring diagram. The lessons distinguish the eight classical Saltzer–Schroeder principles from defense in depth and identify explanatory additions. No source images were copied.

Current verified total: **11 topics, 33 documents, 85 glossary entries**. Updated the course description, README coverage count, source ledger and source-coverage summary. No UI, style, route or architecture files changed in this unit. Independent educator review remains pending.

Checks for this unit: `npm run content:check` and `git diff --check` passed. Full `npm run check` is scheduled after completing 1.7–1.9.

**Exact next point:** begin section **1.8** at `teori-1-1-42.pdf` physical page **41** (printed page 30); stop before the 1.9 heading on physical page 42. Do not begin 1.9 until the 1.8 unit has been validated.

## Content-production addendum — section 1.8

Completed `threat-actors` for section 1.8 only: independent Arabic and Turkish lessons, a separate Turkish exam sheet, nine new glossary entries, and stable-ID relationships to threat modeling, risk management, design principles, security history and core vocabulary. Exact scope is `teori-1-1-42.pdf` physical pages **41–42** (printed pages 30–31), ending before the 1.9 heading on the next split PDF. Text and rendered pages were reviewed, including the six-actor motivation/capability/persistence matrix, APT naming table, SolarWinds callout, insider-threat distinctions and security-researcher discussion. Provider naming claims are attributed to the source’s stated table; no outside facts or attribution certainty were added.

Current verified total: **12 topics, 36 documents, 94 glossary entries**. Updated the course description, README, source ledger and source-coverage summary. No UI, style, route or architecture files changed in this unit. Independent educator review remains pending.

Checks for this unit: `npm run content:check` and `git diff --check` passed. Full `npm run check` is scheduled after completing 1.7–1.9.

**Exact next point:** begin section **1.9** in `teori-1-43-89.pdf` physical page **1** (printed page 32); include its seven-stage diagram and discussion on physical page 2, then stop before the 1.10 heading (printed page 33). Do not start 1.10.

## Content-production addendum — section 1.9 and task stop

Completed `cyber-kill-chain` for section 1.9 only: independent Arabic and Turkish lessons, a distinct Turkish exam sheet, eight glossary entries and relationships to threat actors, design principles, threat modeling/prioritization, attack trees and security history. Exact scope is `teori-1-43-89.pdf` physical pages **1–2** (printed pages 32–33), beginning at the 1.9 heading and ending after the seven-stage diagram and closing discussion, before the 1.10 heading on physical page 2. Text and both rendered pages were reviewed, including each colored diagram label. The lessons cover the stages, defense opportunities, the source’s linear-model limitation, and its MITRE ATT&CK cross-reference. No source diagrams or PDF content were copied.

Current verified total: **13 topics, 39 documents, 102 glossary entries**. Updated README, course coverage description, source ledger, source-coverage summary and this handoff. No UI, style, route or architecture files changed. Independent educator review remains pending; these are reviewed first-pass educational materials, not externally reviewed instruction.

Final validation for this task: `npm run content:check` passed (1 course, 13 topics, 13 source records, 102 glossary entries); `npm run check` passed format, lint, typecheck, all 27 tests and the static production build/export (67 generated pages); `git diff --check` passed. No section 1.10 content has been authored.

**Exact next source location:** `teori-1-43-89.pdf` physical page **2** (printed page 33), at the section **1.10** heading after the 1.9 closing paragraph. Stop here; section 1.10 is outside the completed scope.

## Content-production addendum — section 1.10

Completed `security-economics-human-factor` for section 1.10 and subsections 1.10.1–1.10.3: independent Arabic and Turkish lessons, a Turkish exam sheet and 13 new glossary entries. Scope is `teori-1-43-89.pdf` physical pages **2–5** (printed pages 33–36), beginning at the 1.10 heading after 1.9 and ending before 1.11. Reviewed text and rendered pages, including the ROA formula/example, Mitnick and Schneier captions, social-engineering types and persuasion callout, and SOC image/caption. The two lessons explain the ROA/ROSI distinction, all three defender levers, the listed social-engineering variants and psychological cues, the source’s AI discussion, and how culture enables reporting and response. No source images copied.

Current verified total: **14 topics, 42 documents, 115 glossary entries**. Updated the course description, README, source ledger and source-coverage summary. No application, UI, style, route, dependency or architecture files were edited. Independent educator review remains pending.

Section-unit validation: `npm run content:check` and `git diff --check` passed. Full `npm run check` is reserved for after 1.10–1.13.

**Exact next point:** section **1.11**, `teori-1-43-89.pdf` physical page **6** (printed page 37), through the legal-framework warning box on physical page 7, before section 1.12.

## Content-production addendum — section 1.11

Completed `security-governance-ethics-law` for section 1.11 and subsections 1.11.1–1.11.2: independent Arabic and Turkish lessons, a Turkish exam sheet, nine new glossary entries and links to existing risk, identity/access, responsible-disclosure, personal-data and threat-actor concepts. Scope is `teori-1-43-89.pdf` physical pages **6–7** (printed pages 37–38), through the explicit authorization warning box and before 1.12. Text and rendered pages were reviewed, including the six-function NIST diagram. The lesson clarifies that official NIST treats functions concurrently, so the PDF’s arrows are not a required linear process. TCK/KVKK/GDPR claims were checked against official sources and kept at the textbook’s high-level scope; no legal deadlines or case-specific advice were added. No source figures copied.

Current verified total: **15 topics, 45 documents, 124 glossary entries**. Updated course description, README, source ledger and source-coverage summary. No application, UI, style, route, dependency or architecture files were edited. Independent educator review remains pending.

Section-unit validation: `npm run content:check` and `git diff --check` passed. Full `npm run check` is reserved for after 1.10–1.13.

**Exact next point:** section **1.12**, `teori-1-43-89.pdf` physical page **7** (printed page 38), after the 1.11 warning box and before the 1.13 exercises on the same page.

## Content-production addendum — section 1.12

Completed `course-roadmap` for section 1.12: independent Arabic and Turkish lessons, a separate Turkish reference, and re-associations for existing encryption, post-quantum, zero-trust and governance glossary terms. Exact scope is `teori-1-43-89.pdf` physical page **7** (printed page 38), from the 1.12 heading through all seven weekly groups, ending before 1.13 on that page. The rendered roadmap and all listed subtopics were checked. The lesson treats it as a study map, not as a strict dependency order, and does not author future-week material.

Current verified total: **16 topics, 48 documents, 124 glossary entries**. Updated course description, README, source ledger and source-coverage summary. No application, UI, style, route, dependency or architecture files were edited. Independent educator review remains pending.

Section-unit validation: `npm run content:check` and `git diff --check` passed. Full `npm run check` is reserved for after 1.10–1.13.

**Exact next point:** section **1.13**, `teori-1-43-89.pdf` physical page **7** (printed page 38). Include the 15 worked exercises, eight self-test questions and answer key, and week summary through physical page 11 (printed 42). The summary concludes Chapter 1. Stop before the Chapter 2 divider on physical page 12; the 2.1 heading begins on physical page 14.

## Content-production addendum — section 1.13 and Chapter 1 completion (2026-11-13)

Completed `chapter-one-worked-exercises` for section 1.13. Created a comprehensive Arabic lesson, an independently written Turkish lesson, and a concise Turkish exam sheet. The unit covers all 15 worked examples, all eight self-test prompts and source answer key, and the full week summary. Exact citation scope is `teori-1-43-89.pdf` physical pages **7–11** (printed pages 38–42): section 1.13 starts after the section 1.12 roadmap on physical page 7; the source’s week summary ends on physical page 11. The source’s boundary confirms Chapter 1 ends after that summary. The Chapter 2 divider is physical page 12, objectives are on page 13, and section 2.1 starts on physical page 14 (printed 44). No Chapter 2 lesson was started.

Reviewed source text and rendered pages 7–11, including every worked exercise and self-test, the answer key, and summary; inspected the nearby roadmap and Chapter 2 opening to verify boundaries. The 1.13 material uses no essential omitted figure. Exercise 6 contains an arithmetic inconsistency: the stated DREAD scores total X=44 and Y=44 with Damage weighted three times, although the textbook prose says X can lead. Both lessons and the exam sheet disclose the discrepancy and show the arithmetic; a four-times result is labeled as an author recalculation where used. Existing glossary concepts were reused; no new entry was required. Added the topic’s prerequisite and related links using existing stable topic IDs.

Current verified total: **17 topics, 51 educational documents, 124 glossary entries**. Updated `content/topics/chapter-one-worked-exercises/`, `content/courses/information-systems-security/course.json`, `README.md`, `docs/source-coverage.{md,json}`, and this handoff. No unrelated completed lesson bodies, UI, styling, navigation, routing, architecture, or dependencies were changed by this unit. Pre-existing application work remains in the working tree. No commit/push/deploy actions taken.

Chapter 1 is now complete on a reviewed first-pass basis (sections 1.1–1.13). Independent educator/editorial review remains pending; automated checks cannot establish pedagogical correctness. The 1.11 legal overview remains high-level and linked to official sources; this is educational content, not case-specific legal guidance. The separate Laboratory Workbook was not supplied.

Final validation after this unit: `npm run content:check` passed (1 course, 17 topics, 13 sources, 124 glossary entries). `npm run check` passed Prettier format check, ESLint, TypeScript, all **27 tests** (0 failures), content integrity, and static production export with **83 generated pages**. `git diff --check` passed. The first full-check attempt stopped at format check because these new content files were not formatted; only affected content Markdown/JSON files were formatted, then the complete suite passed. No known task-introduced validation errors remain.

Reconciled the machine-readable section index: 1.7, 1.8 and 1.9 had stale `unprocessed` labels despite existing reviewed topics/units; they now correctly point to `security-design-principles`, `threat-actors` and `cyber-kill-chain`. Sections 1.1–1.13 are all `completed-first-pass`; later sections remain unprocessed.

**Exact next source point:** Chapter 2 of _Bilgi Sistemleri ve Güvenliği_, `teori-1-43-89.pdf` physical page **12** is the divider; physical page **13** contains objectives; section **2.1 — Gizlemenin Uzun Tarihi** begins on physical page **14** (printed 44). Stop before that section unless separately tasked.

## Integration and stabilization handoff — 2026-11-13

This addendum supersedes earlier application/landing status. Integrated the completed docs/Chapter 1 working tree with the Phase 3 hero. No Chapter 2 work was begun. No commit, push, Git merge or deployment occurred.

Method: inspected both dirty worktrees and their diffs, then copied only hero-owned files into main. There were no code conflicts. Main's README retained its content coverage while its two stale landing descriptions were reconciled. Original work was snapshotted with SHA-256 manifests and file copies under `/tmp/studylike-integration-baseline/{main,hero}` before copying. This temporary snapshot is supplementary; both actual working trees retain their work. Hash comparison confirmed all pre-existing main files unchanged except the intentionally updated README, integration/source-coverage summaries and this handoff; every pre-existing content file is unchanged. The hero worktree is entirely unchanged.

Integration files: `src/app/(entry)/page.tsx`, `src/app/[locale]/page.tsx`, `src/components/landing/**` (including licensed self-hosted fonts), `src/styles/landing.css`, `tests/landing.test.tsx`, `docs/landing.md` copied from hero; new `tests/browser/integration.spec.ts`; reconciled `README.md`, `docs/integration.md`, `docs/source-coverage.md` and this addendum. The source-coverage summary had an obsolete incremental count sentence; it now points to the verified current totals. The machine-readable ledger and all educational content were untouched.

AGENTS review: main's sole diff from HEAD replaces the obsolete absent-materials rule with the current private-source policy. Retained. Hero's diff adds a Next.js-generated agent-rules block; left untouched in its source worktree rather than importing unrelated instructions. No shared route/schema/layout/token/dependency changes were needed. The source handoff's 20 tests = 17 foundation + 3 hero; docs' 27 = 17 foundation + 9 docs + 1 coverage. Combined = 30.

Validation on Node 24.22.0 (prepend `/home/yash/.local/share/mise/installs/node/24.22.0/bin` to PATH):

- `npm ci` succeeded, 0 audit vulnerabilities (npm reported esbuild's install-script approval notice; subsequent build/tests succeeded).
- `npm run content:check` passed: 1 course, 17 topics, 13 source records, 124 glossary entries. Coverage test verifies all 51 documents and exact citation scopes against the ledger.
- `npm run check` passed formatting, lint, types, all 30 unit tests, content validation and static export (83 pages).
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e -- --workers=2` passed all 16 browser tests, no skips. Ten original docs tests plus six integration tests cover `/`, `/tr/`, `/ar/`, localized CTA targets, Arabic RTL/Turkish LTR, desktop/mobile light/dark journeys, stable magnetic hit area and bounded pull, touch/keyboard activation, no-JS hero, reading/TOC/concepts/backlinks, Turkish sheets under Arabic UI, search, glossary TSV, Markdown copy/bundles and private PDF match/mismatch/page opening.
- `git diff --check` passed. All 13 private originals remain ignored; no tracked, public or exported PDFs. Browser server is managed/stopped by Playwright. Logs are `/tmp/studylike-integration-{check,browser}.log`; screenshots are ignored under `test-results/`.

Remaining limitations: dark hero transitions to intentionally light docs; mounted-hero CSS scope was verified after navigation, and no theme redesign was introduced. Favicon remains absent pending a shared-brand asset decision. Canonical/hreflang metadata remain absent until a real deployment origin is configured; language links work and no domain was invented. Physical phone/GPU-backed behavior remains unverified (Chromium software browser tests only); previous hero performance measurements are historical, not repeated measurements here. Independent educator/editorial review and redistribution permission remain pending. No educational source re-review is claimed by integration.

Ready to resume Chapter 2 content production when separately authorized: integration checks pass, Chapter 1's 17 topics/51 documents/124 terms remain intact. Next source is `teori-1-43-89.pdf`: divider physical page 12, objectives 13, section 2.1 begins physical page 14 (printed 44). Do not automatically begin it.

Exact repository state: main worktree `/home/yash/Work/StudyLike-Genius` on `main`; source worktree `/home/yash/Work/StudyLike-Genius-Hero` on `feat/hero`; both HEADs remain `0d188f7` (also origin/main at inspection). Nothing staged. Main includes all inherited dirty docs/content changes plus the integration files listed above. Hero retains its original dirty AGENTS, README, landing route changes and untracked landing assets/test/handoff. Preserve both worktrees. The following main status is recorded before this final handoff write (directory entries include their children):

```text
 M .gitignore
 M AGENTS.md
 M README.md
 M content/glossary.json
 M content/sources.json
 M docs/architecture.md
 M docs/content-authoring.md
 M docs/handoff.md
 M docs/integration.md
 M package-lock.json
 M package.json
 M src/app/(entry)/page.tsx
 M src/app/[locale]/docs/[[...segments]]/page.tsx
 M src/app/[locale]/docs/layout.tsx
 M src/app/[locale]/page.tsx
 M src/components/docs/content-view.tsx
 M src/components/docs/markdown.tsx
 M src/lib/content/load.ts
 M src/lib/content/schema.ts
 M src/lib/routes.ts
 M src/styles/docs.css
 M tests/routes.test.ts
?? content/courses/information-systems-security/
?? content/topics/attack-trees-portal-model/
?? content/topics/chapter-one-worked-exercises/
?? content/topics/cia-security-goals/
?? content/topics/course-roadmap/
?? content/topics/cyber-kill-chain/
?? content/topics/identity-access-accountability/
?? content/topics/log4shell-trust-boundaries/
?? content/topics/risk-management/
?? content/topics/security-core-vocabulary/
?? content/topics/security-design-principles/
?? content/topics/security-economics-human-factor/
?? content/topics/security-governance-ethics-law/
?? content/topics/security-history/
?? content/topics/security-mindset/
?? content/topics/threat-actors/
?? content/topics/threat-modeling-stride/
?? content/topics/threat-prioritization-methods/
?? docs/landing.md
?? docs/requirements/issue-2.md
?? docs/source-coverage.json
?? docs/source-coverage.md
?? playwright.config.ts
?? src/components/docs/actions.tsx
?? src/components/docs/glossary.tsx
?? src/components/docs/navigation.tsx
?? src/components/docs/private-source.tsx
?? src/components/docs/search.tsx
?? src/components/landing/
?? src/lib/docs/
?? src/styles/landing.css
?? tests/browser/
?? tests/coverage.test.ts
?? tests/docs.test.ts
?? tests/landing.test.tsx
```

## Chapter 2 section 2.1 handoff (2026-11-13)

Completed first-pass educational content for `cryptography-history` using `teori-1-43-89.pdf` physical pages 14–20 (printed 44–50). The source boundary is verified: section 2.2 starts on physical page 21 (printed 51). Added Arabic and Turkish lessons, Turkish exam cheat sheet, topic metadata, and seven glossary concepts. Reviewed the source descriptions/captions for scytale, Alberti disk, Bletchley Park, Colossus and the classical-cipher comparison table. Independent subject-matter/editorial review remains pending.

Changed files: `content/topics/cryptography-history/{topic.json,lesson.ar.md,lesson.tr.md,cheat-sheet.tr.md}`, `content/glossary.json`, `docs/source-coverage.{md,json}`, and this handoff. Next source position: section 2.2 at `teori-1-43-89.pdf` physical page 21. No commits or staging performed.

## Chapter 2 content production handoff (2026-11-13)

Completed first-pass content for Chapter 2 sections **2.1–2.11** from the actual private PDFs. Verified working-tree baseline: 2.1 and 2.2 bodies were already present, but coverage ledger claims were stale. Reconciled citations against the actual PDF physical numbering: section 2.1 is physical pages 13–19 (printed 44–50), and section 2.2 is 20–22 (printed 51–53). Updated these existing topic citations and ledger records.

Added section topics: `symmetric-encryption-foundations` (2.3), `aes-encryption` (2.4), `block-cipher-modes` (2.5), `cryptographic-hash-functions` (2.6), `message-authentication` (2.7.1), `encrypt-then-mac` (2.7.2 continuation), `password-storage` (2.8), `randomness-foundations` (2.9), `quantum-symmetric-impact` (2.10), and `chapter-two-worked-exercises` (2.11). Each has an Arabic Levantine-friendly lesson with Turkish terminology mappings, an independent Turkish lesson, a distinct Turkish exam sheet and topic metadata. Section 2.7 is split across two topics because its source crosses the split-PDF boundary, allowing exact file/page citations.

Reviewed source files `teori-1-43-89.pdf` physical pages 13–47 and `teori-1-90-142.pdf` physical pages 1–12 for scope; rendered a contact sheet of pages 23–47 and 1–12, then checked extracted text and section boundaries. Section 2.11’s twelve worked examples, nine self-test items, answers and summary end on physical page 11. Physical page 12 is the Chapter 3 divider and page 13 begins section 3.1 (printed page 91); Chapter 3 was not authored or claimed complete. Figures, tables and technical examples reviewed are listed in `docs/source-coverage.md`. No PDFs or source images were added to public assets.

Glossary was expanded from the verified 131 entries to **166**; new terms/relationships were added and existing hash, HMAC, encryption, integrity, confidentiality and post-quantum entries were associated with relevant topics. Current catalog total is **29 topics / 87 published documents / 166 glossary entries** (17 Chapter 1 topics and 12 Chapter 2 topic records including the section 2.7 split). Updated `docs/source-coverage.md`, JSON ledger, README coverage statement and course description. No application/UI/style/routing/dependency changes were made. Existing unrelated dirty worktree changes were preserved. No commit, push, merge or deploy.

After section 2.7 was split and glossary coverage completed, `npm run content:check` passed at 29 topics / 166 entries. The Chapter 2 full check passed all 30 tests and static export; `git diff --check` passed. Later Chapter 3 progress and current verification status are recorded in the Chapter 3 addendum below. Use Node 24 by prepending `/home/yash/.local/share/mise/installs/node/24.22.0/bin` to PATH. The laboratory workbook was not supplied; independent educator/editorial review remains pending.

## Chapter 3 content production handoff (2026-11-13)

Completed first-pass educational content for all Chapter 3 sections **3.1–3.17**, using the actual private PDFs: `teori-1-90-142.pdf` physical pages 13–53 (printed 91–131), then `teori-1-143-178.pdf` physical pages 1–11 (printed 131–142). Chapter 3’s summary/self-test ends on the second PDF page 11. Page 12 is the Chapter 4 divider; section 4.1 begins on page 13 (printed 144). Chapter 4 was not started.

Added ten topics for the previously unfinished sections 3.9–3.17: `pki-certificates`, `tls-13`, `heartbleed-memory-disclosure`, `side-channel-attacks`, `key-management-lifecycle`, `quantum-threat-and-pqc`, `pqc-algorithms-migration`, `public-key-cryptography-practices`, `chapter-three-worked-exercises`, and `chapter-three-review`. Every topic has Arabic and Turkish teaching lessons plus a separate Turkish exam sheet and topic metadata. Coverage cites and physical ranges are recorded in `docs/source-coverage.json`; detailed source review evidence is in `docs/source-coverage.md`.

Expanded `content/glossary.json` from 204 to **224 entries**, covering PKI/X.509, certificate validation and transparency, TLS/HKDF/0-RTT, Heartbleed, side channels, HSM/TPM/key rotation, LWE/KEM and crypto-agility. Existing entries were associated with relevant Chapter 3 topics. Total catalog: **46 topics / 138 published educational documents / 224 glossary entries**. Updated README, `docs/source-coverage.md`, `docs/source-coverage.json`, and this handoff. New content is under the ten topic folders named above, each with `topic.json`, `lesson.ar.md`, `lesson.tr.md`, and `cheat-sheet.tr.md`.

Rendered and reviewed the source pages alongside extracted text, including the certificate chain and X.509 validation material; TLS handshake, command output, nonce/key schedule, replay and mTLS; Heartbleed’s record bytes and vulnerable/fixed code; quantum hardware, period equations, LWE, NIST algorithms/size table, hybrid code and migration timeline; best-practice comparison; all fifteen solved exercises; and all ten summary self-test questions/answers. All section boundaries, including the Chapter 3 split across PDFs, are recorded. NIST FIPS 203/204/205 official pages corroborated the algorithm names and roles. LWE is not described as proven unbreakable; estimates and source migration dates are carefully qualified. No PDF or image source was added to public assets.

**Verification:** final `npm run content:check` passes at 46 topics / 224 glossary entries. Final `npm run check` passes Prettier, lint, TypeScript, all 30 tests, and static export of 199 pages. Final `git diff --check` passes. No PDF files were found in the static `out/` export. No application/UI/style/routing/dependency files were intentionally changed. The checkout contains substantial prior uncommitted implementation and content changes; preserve them. No commit, push, merge, or deployment. Independent educator/editorial review and separate workbook review remain pending.

Next source position is Chapter 4 section 4.1 at `teori-1-143-178.pdf` physical page 13 (printed 144). Do not begin without a separate task.

## Chapter 4 completion handoff (2026-11-14)

Completed a first-pass source review and authored all Chapter 4 sections **4.1–4.11**. The chapter crosses the split PDFs: `teori-1-143-178.pdf` physical pages **13–36**, then `teori-1-179-221.pdf` physical pages **1–11**. The second PDF's physical page 1 is printed page 168 and continues section 4.7; 4.8 starts at physical page 2 (printed 169). Section 4.11, ten worked exercises, eight self-test questions and answer key, and weekly summary end on second-PDF physical page 11 (printed 178). Physical page 12 is the Chapter 5 divider; section 5.1 begins on page 13 (printed 180). Chapter 5 was not authored.

Added twelve coherent topics, each with Arabic and Turkish teaching lessons and a distinct Turkish exam sheet: `identity-authentication-authorization`, `password-attacks-and-entropy`, `multi-factor-authentication`, `phishing-resistant-authentication`, `sso-kerberos-federation`, `oauth-authorization`, `openid-connect-jwt`, `jwt-validation`, `session-security`, `access-control-models`, `zero-trust-architecture`, and `chapter-four-synthesis`. Section 4.7 is split between the OIDC/JWT overview (first PDF physical 35–36) and JWT validation (second PDF physical 1) to preserve exact per-document source citations. Total catalog: **58 topics / 174 published educational documents / 251 glossary entries**. The glossary grew by 27 entries; existing authentication, MFA, least-privilege, access-control, Zero Trust, password-hashing, salt and Argon2id entries were reused and associated with Chapter 4 topics. Updated the course description, README coverage summary, `docs/source-coverage.md`, `docs/source-coverage.json`, and this handoff.

Rendered source page sheets and reviewed extracted text. Visual review covered the authentication-factor and biometric figures; entropy/password attack material; password storage comparison, Argon2id code and output; HOTP/TOTP diagram and code; FIDO2 registration and assertion diagrams/JSON; Kerberos ticket flow; OAuth exchange examples and scope/security discussion; JWT structure and validation examples; stateful/stateless session table and cookie flags; ACL/capability and DAC/MAC/RBAC/ABAC tables; Bell–LaPadula/Biba rules; Zero Trust diagrams; all ten solved exercises and all eight self-test answers. The ledger records each topic's exact physical citations and review scope.

Editorial qualifications recorded in both teaching content and coverage notes: the textbook's absolute “passkeys make phishing impossible” wording is narrowed to WebAuthn's cross-origin credential resistance; endpoint, session and recovery attacks remain possible. TOTP time expiry alone does not guarantee one-time acceptance if an implementation accepts the same code again within its time window. JWT signatures protect integrity/authenticity under correct validation, not payload confidentiality. The Argon2id timing exercise's 50× estimate is identified as approximate and hardware-dependent. Independent educator/editorial review remains pending.

**Verification on Node 24.22.0:** `npm run content:check` passed with 1 course, 58 topics, 13 sources and 251 glossary entries. `npm run check` passed Prettier, ESLint, TypeScript, all 30 tests and static export of 247 pages. `git diff --check` passed. No PDF files were found in `out/`; private originals remain ignored under `materials/` and were not copied into public assets. No commit, push, merge or deployment occurred. Preserve all pre-existing dirty worktree changes. Next source position, if separately authorized: `teori-1-179-221.pdf` physical page 12 divider, then Chapter 5 section 5.1 at physical page 13 (printed 180).

## Chapter 5 completion handoff (2026-11-14)

Completed a first-pass source review and authored Chapter 5 sections **5.1–5.12**. The chapter crosses two PDFs: `teori-1-179-221.pdf` physical pages **13–43** (printed pp.180–210), then `teori-1-222-268.pdf` physical pages **1–11** (printed pp.211–221). Section 5.7 continues across the split (first file pp.42–43 and second file p.1). Section 5.12 ends on second-file p.11. Chapter 6 divider is second-file p.12, objectives p.13, and section 6.1 begins p.14 (printed p.223); Chapter 6 was not authored.

Added nine topics: `web-security-foundations`, `owasp-top-10-map`, `sql-injection`, `cross-site-scripting`, `csrf`, `broken-access-control-idor`, `web-authentication-hardening`, `secure-web-design`, and `chapter-five-synthesis`. Each has Arabic and Turkish teaching lessons, a Turkish exam sheet and stable topic metadata. Glossary grew by 12 entries, reusing the existing IDOR, injection and CSRF terms and extending relationships. Verified current totals: **67 topics / 201 published documents / 263 glossary entries**. Updated `docs/source-coverage.{md,json}`, course description, README and this handoff.

Rendered and extracted source were reviewed together. Visual coverage included HTTP request/response and method tables; cookies and headers; SOP/CORS diagrams and examples; OWASP 2017/2021 table; SQLi variants and parameterized-query examples; XSS types, context-sensitive output and CSP; CSRF flow and comparison; access-control/IDOR diagrams and query code; authentication/session examples; allowlist/denylist; and solved exercises, answers and summary. Exact section citations and boundaries are recorded in the coverage ledger. No source PDFs were copied to public assets.

Lessons clarify that CORS does not prevent every cross-site request, CSRF is not an authentication failure, safe HTTP methods differ from idempotent methods, UUIDs do not substitute for authorization, CSP/HttpOnly are not root-cause XSS fixes, and SQLi impact depends on database-account privileges. OWASP content is labeled as the source’s 2021 list. Independent educator/editorial review remains pending.

`npm run content:check` passes at 67 topics / 263 glossary entries; `git diff --check` passes. Full `npm run check` remains to be run. Preserve the pre-existing uncommitted application/content changes. No commits, pushes, merges or deployments were made.

### Chapter 5 final verification update

The initially failing coverage test was due to its single-source assumption for all topics. `tests/coverage.test.ts` now validates the exact full source list, including the second citation for section 5.7. Final `npm run content:check` and `npm run check` passed on Node 24.22.0: Prettier, ESLint, TypeScript, all 30 tests, and static export of **283 pages**. `git diff --check` passed. A search found no PDF files in `public/` or `out/`. Chapter 5 coverage ledger verifies 12/12 sections; 9 topics and 27 documents are published. The final current glossary count is 263. The Chapter 6 starting point remains `teori-1-222-268.pdf` physical page 12 (divider), page 13 objectives, page 14 section 6.1. No commit, push, merge, or deployment occurred.

## Chapter 6 content-production addendum — 2026-11-14

Completed Chapter 6 sections **6.1–6.11** on a reviewed first-pass basis. This chapter crosses the PDF split: section 6.8 continues from the final page of `teori-1-222-268.pdf` into `teori-1-269-307.pdf`. Chapter 6 ends at second-file physical page **11** (printed p.268); physical page 12 is the Chapter 7 divider. Chapter 7 objectives are on physical page 13 and section 7.1 begins on physical page 14 (printed p.270); no Chapter 7 educational content was authored.

Created nine topics / 27 published documents (each topic has an Arabic lesson, independent Turkish lesson and Turkish-only exam sheet):

| Topic ID                                      | Source scope                                             |
| --------------------------------------------- | -------------------------------------------------------- |
| `ssrf-cloud-metadata`                         | 6.1 framing + 6.2, `teori-1-222-268.pdf` physical 14–21  |
| `advanced-injection-deserialization-xxe-ssti` | 6.3, same PDF 22–27                                      |
| `dependency-supply-chain-log4shell`           | 6.4, same PDF 28–31                                      |
| `api-security-authorization-abuse`            | 6.5, same PDF 32–40                                      |
| `secrets-management-rotation`                 | 6.6, same PDF 41–43                                      |
| `security-misconfiguration-headers`           | 6.7, same PDF 44–45                                      |
| `secure-sdlc-devsecops`                       | 6.8, same PDF 46–47 and `teori-1-269-307.pdf` physical 1 |
| `coordinated-vulnerability-disclosure`        | 6.9, second PDF 2–4                                      |
| `chapter-six-synthesis`                       | 6.10–6.11, second PDF 5–11                               |

Read the extracted text for every section and rendered relevant pages. Visual review covered the trust-boundary and SSRF/metadata diagrams and provider table; serialization language table and code; XXE/SSTI examples; Log4Shell flow, patch table and dependency-chain figure; API taxonomy, BOLA flow, JWT structure, REST/GraphQL table and CORS examples; secret-leak figure; security-header comparison/code; DevSecOps pipeline and code; disclosure portrait/caption; all 12 worked exercises, all 8 review questions and answer key, and the full summary. Private PDFs and source images remain outside public assets.

Technical qualifications are recorded in both lessons and coverage ledger: SSRF requires reachable targets and usable permissions; DNS check/use must bind to the actual connection. Deserialization, XXE and SSTI have different interpreter roots. Log4Shell exploitability depends on versions, configuration and runtime; historical patch details are not a current patch runbook. JWT weaknesses require an unsafe validation policy/implementation; server-side algorithm pinning and claim validation are required. CORS is neither API authorization nor CSRF protection. Headers are defense-in-depth. Source cost multipliers and 90-day disclosure windows are illustrative, not universal rules. Independent educator/editorial review remains pending.

Added 19 glossary entries from the Chapter 6 terms/examples (net of existing reused entries), and extended associations for existing concepts including CORS, responsible disclosure, gadget chain and rate limiting. Updated course description, README, `docs/source-coverage.md` and `docs/source-coverage.json`. Verified catalog now has **76 topics / 228 published educational documents / 282 glossary entries**. The earlier README/handoff-reported 67/201/263 values were the actual pre-task count and are now superseded.

**Changed files:** nine new `content/topics/<topic-id>/` directories (27 bodies and 9 metadata files); `content/glossary.json`; `content/courses/information-systems-security/course.json`; `README.md`; `docs/source-coverage.md`; `docs/source-coverage.json`; this handoff. No app, route, UI, style, schema, dependency, landing page or completed lesson body was changed. The working tree had unrelated pre-existing edits before this task; they remain preserved. No commit, push, merge or deployment was made.

**Final verification:** `npm run content:check` passed (1 course, 76 topics, 13 sources, 282 glossary entries). `npm run check` passed formatting, lint, typecheck, all 30 tests and the static export (**319 generated pages**). The first full-check attempt found only formatting issues in new content, which were fixed; the second attempt exposed the split-source ledger shape mismatch, corrected with `additionalSources`; the final run passed. `git diff --check` passed. A search found no PDF files under `public/` or `out/`. Private originals remain ignored and outside the export. Independent educator/editorial review is still pending.

## Chapter 7 completion addendum — 2026-11-14

Completed all of Chapter 7, sections **7.1–7.13**, on a reviewed first-pass basis. The chapter crosses a split PDF: the complete teaching scope is `teori-1-269-307.pdf` physical pages **13–39** and `teori-1-307-359.pdf` physical pages **1–12**. Section 7.9 itself crosses the split and cites first-file pages 38–39 plus second-file pages 1–2. The rendered second-file page 13 is the Chapter 8 divider (printed p.309); Chapter 8 objectives are on page 14 and section 8.1 starts on page 15. No Chapter 8 content was authored.

**Boundary correction from rendered source:** physical page 13 of `teori-1-269-307.pdf` contains both the learning objectives and the opening of section 7.1 (printed p.270); subsection 7.1.1 begins on physical page 14. Earlier notes that placed the section opening on physical page 14 were based on extracted heading detection and are superseded. The 7.1 citation and coverage records now include physical page 13.

Added 13 stable topic IDs, each with a distinct Arabic lesson, Turkish lesson and Turkish exam sheet (**39 published documents**). Topics, in source order: `network-foundations-and-protocol-layers`, `tcp-handshake-syn-flood`, `layer2-lan-attacks`, `dns-security-and-encrypted-dns`, `packet-capture-wireshark`, `network-reconnaissance-nmap`, `firewalls-segmentation`, `intrusion-detection-prevention`, `vpn-ipsec-wireguard`, `wireless-security-wpa3-krack`, `ddos-defense`, `network-security-misconceptions`, and `chapter-seven-worked-exercises`.

Added **38 bilingual Turkish–English glossary entries** and extended existing associations for shared concepts. Updated the course coverage description, README totals, `docs/source-coverage.md` and `docs/source-coverage.json`. Verified catalog totals are **89 topics / 267 published educational documents / 320 glossary entries**. All 13 Chapter 7 section records and per-topic physical-page citations are synchronized.

Source text and rendered pages were reviewed. Visual review included TCP/IP layers and IPv4/TCP headers; SYN flood and ARP MITM flows; DNS resolution and DNSSEC trust chain; Wireshark; firewall comparison and DMZ; IDS signature/anomaly table and rule; VPN tunnel and WireGuard handshake/crypto table; WPA2 four-way handshake/KRACK; DDoS category/amplification tables; and the exercise/answer-key material. No textbook figure, PDF, or extracted textbook dump was copied into public content. Selected technical qualifications were cross-checked against RFC 4033, RFC 8484, RFC 7858, RFC 2827/BCP 38, the official Nmap scan guide, the WireGuard protocol specification and the original KRACK researchers’ explanation; URLs and findings are in `docs/source-coverage.json`.

Validation after the final citation correction:

- `npm run content:check` passed: 1 course, 89 topics, 13 source records and 320 glossary entries.
- `npm run check` passed formatting, lint, type checking, all **30 tests**, content validation and static build; Next.js generated **371/371** static pages.
- `git diff --check` passed.
- Confirmed no PDF files in `public/` or the exported `out/` directory. Original PDFs remain private under ignored `materials/`.

Independent educator/editorial review remains pending. The separate Laboratory Workbook remains unavailable, so no lab is claimed. No application architecture, UI, route, style, dependency, test or schema files were changed for Chapter 7. The checkout had extensive uncommitted work before this task; all of it was preserved. No commit, push, merge or deployment was made.

**Exact next source point:** `teori-1-307-359.pdf` physical page **13**, Chapter 8 divider. The objectives are on page 14, and section 8.1 starts on page 15. Chapter 8 remains outside this task.

## Chapter 8 completion handoff — 2026-11-14

Completed Chapter 8 sections **8.1–8.11** on a reviewed first-pass basis. Sources: `teori-1-307-359.pdf` physical pages **15–53** and `teori-1-360-397.pdf` physical pages **1–11**. The chapter crosses the split: 8.8 begins on the first file page 52 and continues/concludes on second-file page 1; 8.9 also begins on that page. The end-of-chapter exercises and answer key/summary conclude on second-file page 11. Chapter 9 divider is page 12, objectives page 13, section 9.1 begins page 14 (printed page 361); Chapter 9 was not authored.

Created eleven topics / **33 published educational documents** (each topic has its own Arabic lesson, independent Turkish lesson, Turkish-only exam sheet and metadata): `os-security-boundaries`, `memory-safety-foundations`, `stack-buffer-overflow`, `memory-bug-families`, `exploit-mitigations`, `privilege-escalation`, `sandboxing-isolation`, `hardware-root-of-trust`, `system-hardening`, `trusting-trust`, and `os-security-synthesis`. Expanded the global glossary by **36 entries** and associated existing trust-boundary, least-privilege, memory-isolation, defense-in-depth, TPM and side-channel concepts. Verified catalog totals are now **100 topics / 300 published documents / 356 glossary entries**.

Source text and rendered pages were reviewed. Visual review included privilege rings and address-space layout; stack-frame/overflow diagrams and bounded-copy code; format-string, integer arithmetic, UAF and Heartbleed examples; canary, DEP/NX, ROP, ASLR, CFI/RELRO, flags/checksec and sanitizer material; Linux/Windows permission and identity tables, Dirty COW and TOCTOU; seccomp code/flow, namespaces/cgroups, MAC and container layers; PCR extension/boot chain and TPM/Secure Boot/TEE comparison; system-hardening commands and audit logs; all three Thompson thought-experiment code excerpts; all seven integrative solved exercises, all eight review questions/answers and the weekly summary. No PDF or extracted source image was copied into public assets.

Technical qualifications recorded in lessons and source ledger include: the source’s memory-error percentages are specific product/time analyses; C signed overflow does not promise wrapping and `strncpy` may not NUL-terminate; compiler protections/ASLR entropy vary by platform; canaries/CFI do not ensure all control-flow safety; seccomp filter actions depend on configuration; containers share the host kernel; PCR measurements need event logs and trusted reference policy and do not prove a platform uncompromised. XZ CVE-2024-3094 is described as malicious release/build-process injection, distinct from Thompson’s self-propagating compiler thought experiment. Supplementary verification uses Linux kernel documentation, TCG guidance, USENIX research and Debian’s advisory/tracker; exact URLs and findings are in `docs/source-coverage.json`. Independent educator/editorial review remains pending; the separate lab workbook was not supplied.

Updated Chapter 8 topic folders, `content/glossary.json`, `content/courses/information-systems-security/course.json`, `README.md`, `docs/source-coverage.md`, `docs/source-coverage.json`, and this handoff. No commits, pushes, merges, or deployments. Preserve pre-existing unrelated working-tree changes.

**Final verification:** `npm run content:check` passes with 1 course, 100 topics, 13 sources and 356 glossary entries. `npm run check` passes Prettier, ESLint, TypeScript, all 30 tests, content validation and static export of **415/415 pages**. `git diff --check` passes. No PDF files were found under `public/` or `out/`; private originals remain ignored under `materials/`. Use Node 24.22.0 from `/home/yash/.local/share/mise/installs/node/24.22.0/bin`. Next source point is Chapter 9 divider in `teori-1-360-397.pdf` physical page 12; do not begin Chapter 9 without a separate task.

## UI/UX transformation handoff — 2026-11-14

Implemented a full design pass. Nothing was committed, pushed, merged or deployed. All pre-existing uncommitted content and app work was preserved.

**Design direction:** "quiet paper". The hero's printed-plate identity (paper/ink, rubric red, Newsreader/Amiri display type) now runs through the docs, which use a system sans for long reading. Both light and dark themes are designed as full palettes in `tokens.css`.

**Changes**

- Hero: the filings canvas was replaced by a still, masked SVG of equipotential lines (`hero-plate.tsx`) with a single settle-in arrival. The magnetic CTA, single viewport and font-gated reveal (`hero-stage.tsx`) are kept, and a theme switcher was added. Deleted `field-canvas.tsx`, `field-engine.ts` and `stage-bus.ts`. Caption copy was updated.
- Theme: `src/lib/theme.ts` (pre-paint script, storage), `src/components/theme-toggle.tsx`, shared tokens, and theme-aware landing palettes. Both root layouts were updated.
- Fonts: moved to `src/fonts/` and applied on `<html>`.
- Docs header (`header.tsx`): drawer menu button, brand, a search trigger shaped like a field with a platform-aware shortcut hint, section links, a segmented language switch, and the theme menu.
- Search palette (`search-palette.tsx`, `search-data.ts`, `highlight.tsx`): uses the static index route `src/app/[locale]/docs/search-index.json/route.ts`. Matches are highlighted using the search normalization (`matchRanges`). The search page uses the same lazy index.
- Sidebar (`navigation.tsx`, `nav-store.ts`): flush to the viewport edge. The course leads, then numbered bold chapters with collapsible topic lists (animated grid rows). Only the current chapter opens by default, and visiting a topic opens its chapter. The active topic is marked and scrolled into view. Empty chapters are shown as "coming soon". Below 64rem it becomes a drawer with backdrop, Escape, an inert background and focus return.
- Topic page (`content-view.tsx`, `toc.tsx`): breadcrumbs, chapter/position kicker, a one-line "read first" prerequisite note, and lesson/sheet tabs with actions. An "on this page" rail with scrollspy appears at 80rem and wider; narrower screens get a collapsible TOC. **The order after a lesson is: Next Topic card, then sources, then prerequisites/related/backlinks.** Next preserves the form (lesson or sheet), flags a chapter change, and the last topic shows a completion state.
- Sources: plain text (title naming the split file, physical PDF pages, and a note). `private-source.tsx` and its messages were removed.
- Glossary: a table with Turkish term, English, Turkish example and English example columns. Topic links sit under the term. Search, course/chapter/topic filters and TSV copy/download still use the same filtered rows. The header is sticky. On narrow containers the table scrolls horizontally with the Turkish term pinned.
- `docs.css`: rewritten. Unit tests were extended and browser tests updated (picker tests replaced; palette, sidebar, theme, post-lesson order and completion tests added). README, architecture, integration and landing docs were updated.

**Verification:** 34/34 unit tests pass. 20/20 Playwright tests pass against the exported `out/` (Chromium `/usr/bin/chromium`). Visual review covered TR/AR, light/dark, 1440/1280/390 widths, the hero (desktop, portrait, reduced motion), lessons, the end-of-lesson flow, the completion state, the palette, glossary (desktop and mobile RTL), course, index and the mobile drawer. `git diff --check` is clean. See the final report for the `npm run check` result.

**Known limitations / next steps:** `next dev` is slow here because each page parses every lesson for backlinks on every request; production export is unaffected. Consider caching `conceptTargets`. The search index is about 1.2 MB raw / 370 KB gzipped and is fetched once on first search. Glossary rows that carry several topic links are taller. Meta `theme-color` follows the system, not an explicit choice. Not yet checked on physical devices or with screen readers beyond the ARIA semantics tested here. `next dev` still regenerates an `AGENTS.md` block: restore the file if it appears.

## StudyMAXIN rebranding — 2026-11-14

Current product identity is **StudyMAXIN**. See [the rebranding handoff](rebranding-handoff.md) for the exact task file list, preserved work, verification results and intentional historical references, and [deployment readiness](deployment.md) for provider-specific next steps. No commit, push, merge or deployment was made.
