# Content authoring contract (v1)

The authoritative schema is [`src/lib/content/schema.ts`](../src/lib/content/schema.ts), with graph/Markdown rules in `validate.ts` and filesystem rules in `load.ts`. Content is UTF-8. Run `npm run content:check` before reviewing content and `npm run check` before integration.

The production collection now contains a first source-based unit; exact coverage is recorded in `docs/source-coverage.json`. Examples below describe metadata structure using clearly synthetic identifiers; they are not university teaching material and do not assert source processing. `tests/fixtures.ts` provides executable, valid technical examples without entering the application catalog.

## Layout and identity

```text
content/
  courses/<course-id>/course.json
  topics/<topic-id>/topic.json
  topics/<topic-id>/lesson.ar.md
  topics/<topic-id>/lesson.tr.md
  topics/<topic-id>/cheat-sheet.tr.md
  glossary.json
  sources.json
public/sources/<source-file>.pdf
```

Identifiers use lowercase ASCII letters/numbers separated by single hyphens. Course/topic/source/glossary IDs are unique within their collection; topic IDs are global across courses. Chapter IDs are unique within a course. Folder names must match record IDs. Never translate IDs or rename them when changing titles. Moving a topic to a different course changes its course-qualified URL; treat that as an explicit migration, with redirects at the future host if needed. Order is a nonnegative integer, unique among siblings. JSON keys are strict: unknown keys fail validation.

## Course and topic records

Course record shape:

```json
{
  "id": "example-course",
  "title": { "tr": "Test alanı", "ar": "مساحة اختبار" },
  "description": { "tr": "Yapı örneği.", "ar": "مثال هيكلي." },
  "order": 0,
  "chapters": [
    {
      "id": "example-chapter",
      "title": { "tr": "Test bölümü", "ar": "فصل اختبار" },
      "order": 0
    }
  ]
}
```

Topic record shape (a draft without documents is valid):

```json
{
  "id": "example-topic",
  "courseId": "example-course",
  "chapterId": "example-chapter",
  "title": { "tr": "Test konusu", "ar": "موضوع اختبار" },
  "order": 0,
  "prerequisites": [],
  "related": [],
  "documents": []
}
```

`prerequisites` and `related` contain global topic IDs. No dangling, duplicate, or self references. Prerequisites cannot contain cycles. Related links are directed; declare both sides if both should display the relationship. A published topic's relationships must point to topics with at least one published document, so public navigation cannot lead to a draft-only topic. Different course relationships are supported.

## Three document forms

Add document objects to `topic.json.documents` and create the corresponding Markdown file:

| `kind`        | `locale` | Body filename       |
| ------------- | -------- | ------------------- |
| `lesson`      | `ar`     | `lesson.ar.md`      |
| `lesson`      | `tr`     | `lesson.tr.md`      |
| `cheat-sheet` | `tr`     | `cheat-sheet.tr.md` |

Only these combinations are valid, once each. All forms are optional while authoring; Phase 2's topic-completeness goal should produce all three for each finished topic. No Arabic cheat sheet, filename-driven translation identity, or implicit locale fallback.

Every document has `kind`, `locale`, nonempty `title` and `summary`, `status` (`draft` or `published`), `provenance` (`source-based` or `illustrative`), and `sources` (citation array). Example technical metadata:

```json
{
  "kind": "lesson",
  "locale": "tr",
  "title": "Teknik test",
  "summary": "Yalnızca yapıyı gösterir; eğitim materyali değildir.",
  "status": "draft",
  "provenance": "illustrative",
  "sources": []
}
```

Every declared body file must exist. Files absent from metadata, symlinks, and unsupported forms fail validation. Draft bodies may be empty; published bodies cannot. Draft bodies/titles are excluded from public document rendering; draft-only topics have no public route. Sources/references must still be valid in drafts, except unavailable source locations and missing citations may remain during preparation. Public glossary associations and Markdown concept links must target published topics.

## Teaching and editorial integrity

Arabic and Turkish lessons are full explanations: connect motivation, concepts, mechanisms, examples, contrasts, and prerequisites in natural prose. Preserve essential source information and clearly label additional explanations and examples added by the author. A compact Turkish exam cheat sheet is a separate work, never the lesson body shortened to bullets and served as a translation.

Review both languages against the same topic/source scope. Do not claim completeness without checking the original PDFs. Do not invent quotations, source titles, page ranges, or processed-material claims. Use `illustrative` for openly identified demonstrations when original PDFs are unavailable; the UI displays a warning. Do not fabricate educational source content to fill an empty catalog.

### Markdown dialect

Use ordinary Markdown plus GFM tables, fenced code, lists, and emphasis. Metadata lives in JSON; do not add YAML frontmatter, imports, JSX, or HTML. The renderer supplies the document title, so start body headings at `##`. Inline code and fenced code render LTR; paragraphs inherit document language. When mixed-direction prose needs more sophisticated isolation, add a reviewed renderer feature rather than embedding HTML.

Use identity links instead of hardcoded localized paths:

```markdown
[Concept](topic:stable-topic-id)
[Term](glossary:stable-glossary-id)
```

They resolve in the current UI language, including inside Turkish cheat sheets under Arabic UI. Supported external links use `https://`, `http://`, or `mailto:`. Inline Markdown images require an HTTPS URL and meaningful alt text; do not use reference-style images. Relative file links, arbitrary root-relative links, fragment-only heading links, and custom schemes are currently rejected. Use generated source citations for PDFs. Heading anchors, local media, and richer diagrams may be added deliberately in Phase 2 with validation/tests; they are not implied features of this foundation.

## Source registry and citations

`sources.json` is an array. Each source has `id`, original `title`, `language` (`ar`, `tr`, or `en`), `courseIds` (one or more), and `location`:

| Location kind | Required fields                             | Meaning                                                                     |
| ------------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `local`       | `path`, `pageCount`, `sha256`               | Existing tracked file under `public/sources/`, public URL `/sources/...pdf` |
| `remote`      | `url`, `pageCount`                          | HTTPS original; reviewer verifies it manually                               |
| `private`     | `filename`, `pageCount`, `sha256`, `reason` | Reviewed original in ignored `materials/`; no public asset or upload        |
| `unavailable` | `reason`                                    | Known source cannot yet be accessed; never pretend it was processed         |

Page counts are positive integers checked manually against the actual PDF. Local `sha256` is the lowercase 64-character digest from `sha256sum public/sources/file.pdf`. Local paths allow nested safe ASCII names and `.pdf`, without `..`, query strings, or fragments. The loader checks existence, a PDF header, digest, and symlink exclusion. It does not parse PDF contents or prove a page count. Remote URLs are not fetched during a build; use local files when reproducible source bytes are important and redistribution is permitted.

Document citations have this structure (the synthetic source ID must be replaced by a real registry record):

```json
{
  "sourceId": "example-source",
  "pages": [
    { "from": 3, "to": 5 },
    { "from": 9, "to": 9 }
  ]
}
```

Use **physical PDF pages**, starting at 1, including cover pages. Each range must ascend and fit the registered page count. A single page repeats `from`/`to`. Source `courseIds` must include the topic's course. Cite a source once per document with multiple ranges. Clicking a range opens the original with `#page=<from>`; browser PDF viewer support varies. Preserve printed page numbers in explanatory prose when they differ.

Published `source-based` documents require at least one citation. Any published document’s cited sources must be available publicly or recorded as reviewed private originals. When no original has been obtained for review, register its known metadata only if supplied, use `location.kind: "unavailable"`, and leave the source-based document draft. An honestly illustrative document can be published with no citations but must be visibly identified as illustrative. Metadata validation cannot judge pedagogical accuracy: human review remains required.

## Global Turkish–English glossary

`glossary.json` is a global array, not duplicated per course or UI locale:

```json
{
  "id": "example-term",
  "term": { "tr": "Test terimi", "en": "Test term" },
  "examples": { "tr": "Teknik test örneği.", "en": "Technical test example." },
  "courseIds": ["example-course"],
  "topicIds": ["example-topic"]
}
```

Both terms/examples are mandatory nonempty text. At least one course is required; topic associations may be empty. Referenced courses/topics must exist, and every associated topic's course must appear in `courseIds`. Topic associations must have public documents. Duplicate IDs and duplicate term pairs are rejected, using Turkish casing for Turkish terms. Chapter filters can be derived from topic associations; do not store a second divergent chapter relationship. Glossary filtering and TSV export are implemented in Phase 2.

## Private originals and the coverage workflow (Phase 2)

`location.kind: "private"` is an additive variant of the authoritative source schema, not a new metadata format. `filename` is a safe basename under `materials/`; `pageCount` and `sha256` identify the exact reviewed split PDF, and `reason` explains why it is not hosted. This differs from `unavailable`: the original was supplied and reviewed, but permission to distribute its bytes has not been established. Public checkouts need no private PDFs. If the local file exists, the loader verifies its header/digest and rejects symlinks or changed bytes. The build does not parse the PDF or independently validate pedagogical claims.

The public citation interface shows the bibliography and physical ranges, then lets a reader choose their own original. SHA-256 is checked in the browser before exposing a blob URL with `#page=`. No selected bytes leave the browser. Bundles retain the original filename, fingerprint and physical ranges; private sources never acquire a fabricated download URL. Browser PDF viewer page-fragment support varies. Only switch to `local` after redistribution permission is established, then add the actual public file with its digest.

Before each content unit, consult `docs/source-coverage.json` and inspect the original text **and** relevant rendered pages. Inventory discovery/extraction is not source review. Record the exact section boundaries inside shared pages, diagrams/tables/code handling, all three document states, glossary extraction, factual qualifications and remaining work. The ledger is operational review evidence referring to stable schema-owned IDs; production UI metadata remains exclusively in `content/` under `schema.ts`.

Rendered heading anchors (`section-1`, etc.) are generated in document order with a matching table of contents. Authors continue using `topic:` and `glossary:` identity links; arbitrary fragment links in authored Markdown remain unsupported. Exports rewrite parsed concept-link destinations to site-relative routes without altering code blocks. They retain provenance/citations and explicitly identify their relative-link base. All glossary examples in the first unit were newly authored, not quoted from the source.
