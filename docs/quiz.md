# Operating Systems Quiz Trainer

Open `/tr/quiz/` or `/ar/quiz/`, or use the quiz link in the docs header or mobile drawer. The interface follows the selected locale and theme. Questions, choices and answer explanations are Turkish. An optional Arabic clarification is available with the source details after grading.

## Architecture

The localized quiz page is a build-time Server Component under `src/app/[locale]/quiz/`. Its server-only entry point loads and validates the quiz bank, which is serialized for the trainer. The existing lesson catalog and its schemas continue to own documentation. No server runtime or external service is required. The published answer key is part of the static trainer's browser data, so mock mode provides a study simulation. It hides grading during the session and cannot serve as a proctored assessment.

- `src/lib/quiz/bank.ts` defines the authored schema and integrity checks. `load.ts` loads JSON on the server. `npm run content:check` and the quiz route both validate the bank.
- `src/lib/quiz/session.ts` owns random sampling, option ordering, answer selection, navigation and timer guards. It samples without replacement and refuses a mock when there are fewer than 60 unique IDs. Each mock samples across the full bank, with question mix proportional in expectation to the authored bank. Practice supports batches of 10, 20 or 30. Review modes use up to that many available items.
- `src/lib/quiz/progress.ts` owns scoring, attempts, review order and backup validation. `src/components/quiz/` renders setup, questions, progress and results.

## Authoring

The initial course banks live in `content/quiz/operating-systems/`. `manifest.json` registers the stable course ID, ordered weekly topic IDs and localized titles, plus the provenance registry. Each topic has one JSON array named after its ID, for example `process-ipc.json`. Each question needs a matching record in [the audit ledger](quiz-audit.json). Only questions marked `verified` enter the public bank. Use `requires-review` with an unresolved evidence note for an item still under review. The loader requires at least 60 verified items.

| Question field        | Contract                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| `id`                  | Permanent lowercase ASCII slug, globally unique within the bank                                     |
| `courseId`, `topicId` | IDs matching the course directory and containing topic file                                         |
| `difficulty`          | `basic`, `intermediate` or `advanced`                                                               |
| `question`            | Nonempty Turkish question stem                                                                      |
| `choices`             | Exactly four nonempty, distinct choices in authored order                                           |
| `correctIndex`        | Zero-based index of the single correct choice, from 0 to 3                                          |
| `explanation`         | Nonempty Turkish explanation that identifies the rule or reasoning                                  |
| `source`              | `id` from the same week's source registry and `slides`, positive one-based positions in that source |
| `clarificationAr`     | Optional Arabic clarification                                                                       |

Add an item to the matching topic file with a new ID. Write the answer and explanation together, then check each distractor against the question's assumptions. Cite the source positions that establish the underlying rule. Original scenarios and computations can apply a rule without reproducing the slide's worked example. Invalid shapes, unknown keys, normalized duplicate choices or stems, duplicate IDs, missing topic files, inconsistent course/topic metadata, and invalid source IDs or slide positions fail validation. Update the audit record after any content edit. The loader checks the record’s slide citation and reviewed answer index against the question. Schema validation cannot assess whether a distractor is plausible or a conclusion follows from the cited slide. Change the ID if the assessed concept, authored option order or answer key changes. Existing sessions and result history store canonical choice indexes.

Each source record identifies its type, title or original basename, topic, SHA-256 fingerprint and positional length. The UI distinguishes `original-slides` from `secondary-notes`. For secondary slide notes, use the notes' own positional references and identify them explicitly. The trainer never publishes source files or OCR output.

### Initial source coverage

The initial bank has 279 questions. The five weeks contain 51 introduction, 50 services and structures, 57 process and IPC, 54 threads and multicore, and 67 synchronization questions.

The original audit checkout’s `materials/` PDFs cover Information Systems Security. The Operating Systems lessons have their own source records. The quiz uses five original Operating Systems PPTX decks available locally in Downloads. They contain raster slides. Slide numbers are physical deck positions from the PPTX presentation order, counting from 1. Embedded slide images were OCR’d locally and consulted by topic, with visual checks of the multiprogramming, microkernel, SJF, Amdahl, Peterson and blocking-semaphore examples. The authored questions are paraphrases and new applications of those concepts. No questions cite secondary notes. Exact fingerprints and counts are recorded in the manifest. The [academic audit](quiz-audit.md) records contribution from direct slides, applied lecture models, and supplementary technical sources. Independent instructor sign-off is pending.

## Progress and revision

One versioned localStorage record holds both progress and the active session. The session records the stable question IDs, shuffled choice indexes, selected answers, current position and any absolute deadline. Closing the tab or changing language preserves the session. A timed mock continues while the page is away and is submitted when the trainer observes that its deadline has passed. A selected answer can be changed until submission or expiry. Blanks count toward the exam denominator and have their own result category. Attempts from exams are recorded on submission. Practice attempts are recorded as soon as an answer is graded.

An incorrect answer adds the question to the active mistake queue. A correct answer in **Wrong Answers** clears the queue entry and preserves historic counts. Wrong-answer and bookmark reviews order by `3 × incorrect − correct − 2 × correct streak`, descending, with stable ID as the tiebreaker. Mock and random sessions use independent shuffling. Weak topics are ranked by historical wrong-answer rate, then by wrong-answer count.

A JSON backup includes question statistics, bookmarks and completed results. Import validates the entire version, course and structure, asks for confirmation and replaces progress. Active sessions stay in browser storage. If the active session references a retired question or fails validation, valid progress is retained. Invalid or unknown-version backups are rejected. Unknown historical IDs can remain in backups after a bank update. They leave the review pool and retired questions are identified in historical results.

Progress belongs to one browser origin. Clearing browser data drops it. The trainer is designed for one active tab; competing writes by multiple tabs can replace each other. Storage quota and blocked storage are reported in the UI. Future improvements include comparing old backup versions, increasingly detailed topic tags, and more Arabic clarifications.

## Verification

Use Node 24.

```sh
npm ci
npm run check
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm run test:e2e
npm run test:e2e -- tests/browser/quiz.spec.ts
```

Playwright runs against `out/` from the production build. The tests cover bank integrity, shuffle mapping, exam uniqueness, scoring, progress recovery, review order, navigation, and representative browser journeys in both locales.

## Database Management multiple-choice bank

The same trainer is available at `/tr/quiz/database-management/` and
`/ar/quiz/database-management/`, with six weekly topic files in
`content/quiz/database-management/`. This is a separate **60-question Turkish
multiple-choice bank**, with four choices, one answer, Turkish explanation and
physical page citations to the six original `hafta01.pdf`–`hafta06.pdf` sources.
The corresponding audit ledger is `docs/database-quiz-audit.json`; the
original PDFs remain private. Source SHA-256 digests and page counts are
preserved in the manifest.

The Operating Systems page remains at `/tr/quiz/` and `/ar/quiz/`. Storage,
backup imports and active sessions are isolated by course; existing Operating
Systems storage keys and backups are retained. The fixed-size 60-question mock
covers the entire first database bank; practice can draw 10 questions per
individual week. The bank is an initial assessment set and can be expanded
after the instructor's textbook-style sample questions are received. Audit
every new question against the original slide before publishing.
