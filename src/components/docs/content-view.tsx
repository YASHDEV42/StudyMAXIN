import Link from "next/link";
import type {
  Content,
  ContentDocument,
  ContentTopic,
  Course,
} from "@/lib/content/schema";
import { direction, messages, type Locale } from "@/lib/i18n";
import { isPublished, routes, type DocsRoute } from "@/lib/routes";
import { docsMessages } from "@/lib/docs/messages";
import { publicContent, topicOptions } from "@/lib/docs/public";
import { conceptTargets, markdownHeadings } from "@/lib/docs/markdown";
import { documentMarkdown, sourceUrl, topicBundle } from "@/lib/docs/export";
import { ContentMarkdown } from "./markdown";
import { SearchView } from "./search";
import { GlossaryView } from "./glossary";
import { DocumentActions } from "./actions";
import { TocRail } from "./toc";

const chapterNumber = (order: number) => String(order + 1).padStart(2, "0");
const pageRange = (range: { from: number; to: number }) =>
  range.from === range.to ? `${range.from}` : `${range.from}–${range.to}`;

function Arrow({ className }: { className?: string }) {
  // Drawn pointing to the reading direction's "forward"; CSS mirrors it in RTL.
  return (
    <svg
      className={["arrow", className].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 12h15M13.5 6 19.5 12l-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TopicLinks({
  ids,
  content,
  locale,
}: {
  ids: string[];
  content: Content;
  locale: Locale;
}) {
  return (
    <ul className="topic-links">
      {ids.map((id) => {
        const topic = content.topics.find(
          (topic) => topic.id === id && isPublished(topic),
        );
        return topic ? (
          <li key={id}>
            <Link href={routes.topic(locale, topic)}>
              {topic.title[locale]}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}

/**
 * Plain textual citations: the source document and its physical PDF pages.
 * Private originals are never linked; public (local/remote) sources keep their
 * page links. Multiple sources (a topic spanning split PDFs) are listed in
 * order, each with its own page ranges.
 */
export function SourceCitations({
  document,
  content,
  locale,
}: {
  document: ContentDocument;
  content: Content;
  locale: Locale;
}) {
  const t = messages[locale];
  const d = docsMessages[locale];
  if (!document.sources.length || document.status !== "published") return null;
  const citations = document.sources.flatMap((citation) => {
    const source = content.sources.find(
      (source) => source.id === citation.sourceId,
    );
    return source && source.location.kind !== "unavailable"
      ? [{ citation, source, location: source.location }]
      : [];
  });
  if (!citations.length) return null;
  return (
    <section className="source-citations" aria-labelledby="sources-heading">
      <h2 id="sources-heading">{t.sources}</h2>
      <ul>
        {citations.map(({ citation, source, location }) => (
          <li key={source.id}>
            <span
              className="source-title"
              lang={source.language}
              dir={source.language === "ar" ? "rtl" : "ltr"}
            >
              {source.title}
            </span>
            <span className="source-pages">
              {d.pdfPage}{" "}
              {citation.pages.map((range, index) => (
                <span key={`${range.from}-${range.to}`}>
                  {index > 0 && ", "}
                  {location.kind === "private" ? (
                    <bdi>{pageRange(range)}</bdi>
                  ) : (
                    <a href={sourceUrl(source, range.from)}>
                      <bdi>{pageRange(range)}</bdi>
                    </a>
                  )}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
      <p className="source-note">{d.sourceNote}</p>
    </section>
  );
}

function orderedTopics(content: Content, course: Course) {
  const chapterOrder = new Map(
    course.chapters.map((chapter) => [chapter.id, chapter.order]),
  );
  return content.topics
    .filter((item) => isPublished(item) && item.courseId === course.id)
    .sort(
      (a, b) =>
        chapterOrder.get(a.chapterId)! - chapterOrder.get(b.chapterId)! ||
        a.order - b.order,
    );
}

function NextTopic({
  topic,
  form,
  ordered,
  course,
  locale,
}: {
  topic: ContentTopic;
  form: "lesson" | "cheat-sheet";
  ordered: ContentTopic[];
  course: Course;
  locale: Locale;
}) {
  const d = docsMessages[locale];
  const position = ordered.findIndex((item) => item.id === topic.id);
  const next = ordered[position + 1];
  const previous = ordered[position - 1];
  const nextChapter =
    next && next.chapterId !== topic.chapterId
      ? course.chapters.find((chapter) => chapter.id === next.chapterId)
      : undefined;
  return (
    <nav className="sequence-nav" aria-label={d.continueReading}>
      {next ? (
        <Link
          className="next-card"
          href={routes.topic(locale, next, form)}
          rel="next"
        >
          <span className="next-label">
            {d.nextTopic}
            {nextChapter && (
              <span className="next-chapter">
                {d.nextChapter} · {d.chapterLabel}{" "}
                {chapterNumber(nextChapter.order)}
              </span>
            )}
          </span>
          <span className="next-title">{next.title[locale]}</span>
          <span className="next-arrow">
            <Arrow />
          </span>
        </Link>
      ) : (
        <div className="next-card next-complete">
          <span className="next-label">{d.completeTitle}</span>
          <p>{d.completeBody}</p>
          <div className="next-complete-links">
            <Link href={routes.course(locale, course.id)}>
              {d.backToCourse}
            </Link>
            <Link href={routes.glossary(locale)}>{d.reviewGlossary}</Link>
          </div>
        </div>
      )}
      {previous && (
        <Link
          className="previous-link"
          href={routes.topic(locale, previous, form)}
          rel="prev"
        >
          <Arrow className="arrow-back" />
          <span>
            <small>{d.previous}</small>
            {previous.title[locale]}
          </span>
        </Link>
      )}
    </nav>
  );
}

export function TopicView({
  topic,
  form,
  content,
  locale,
}: {
  topic: ContentTopic;
  form: "lesson" | "cheat-sheet";
  content: Content;
  locale: Locale;
}) {
  const t = messages[locale];
  const d = docsMessages[locale];
  const documentLocale = form === "cheat-sheet" ? "tr" : locale;
  const document = topic.documents.find(
    (document) =>
      document.kind === form &&
      document.locale === documentLocale &&
      document.status === "published",
  );
  const course = content.courses.find(
    (course) => course.id === topic.courseId,
  )!;
  const chapter = course.chapters.find(
    (chapter) => chapter.id === topic.chapterId,
  )!;
  const headings = document ? markdownHeadings(document.body) : [];
  const publicTopics = content.topics.filter(isPublished);
  const backlinks = publicTopics.filter(
    (item) =>
      item.id !== topic.id &&
      (item.prerequisites.includes(topic.id) ||
        item.related.includes(topic.id) ||
        item.documents.some(
          (doc) =>
            doc.status === "published" &&
            conceptTargets(doc.body).has(topic.id),
        )),
  );
  const ordered = orderedTopics(content, course);
  const inChapter = ordered.filter((item) => item.chapterId === chapter.id);
  const prerequisites = topic.prerequisites
    .map((id) => publicTopics.find((item) => item.id === id))
    .filter((item): item is ContentTopic => !!item);
  const hasRelationships =
    !!prerequisites.length || !!topic.related.length || !!backlinks.length;
  return (
    <div
      className="topic-layout"
      data-has-toc={headings.length ? "" : undefined}
    >
      <div className="topic-main">
        <header className="topic-header">
          <nav
            className="breadcrumbs"
            aria-label={locale === "ar" ? "مسار التنقل" : "İçerik yolu"}
          >
            <ol>
              <li>
                <Link href={routes.docs(locale)}>{t.docs}</Link>
              </li>
              <li>
                <Link href={routes.course(locale, course.id)}>
                  {course.title[locale]}
                </Link>
              </li>
              <li>
                <Link
                  href={`${routes.course(locale, course.id)}#${chapter.id}`}
                >
                  {chapter.title[locale]}
                </Link>
              </li>
            </ol>
          </nav>
          <p className="topic-kicker">
            <span className="topic-kicker-chapter">
              {d.chapterLabel} {chapterNumber(chapter.order)}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {d.topicOf}{" "}
              <bdi>
                {inChapter.findIndex((item) => item.id === topic.id) + 1} /{" "}
                {inChapter.length}
              </bdi>
            </span>
          </p>
          <h1>{topic.title[locale]}</h1>
          {!!prerequisites.length && (
            <p className="read-first">
              <span>{d.readFirst}:</span>{" "}
              {prerequisites.map((item, index) => (
                <span key={item.id}>
                  {index > 0 && <span aria-hidden="true"> · </span>}
                  <Link href={routes.topic(locale, item)}>
                    {item.title[locale]}
                  </Link>
                </span>
              ))}
            </p>
          )}
          <div className="topic-toolbar">
            <nav
              className="form-nav"
              aria-label={locale === "ar" ? "نوع المحتوى" : "İçerik türü"}
            >
              <Link
                href={routes.topic(locale, topic)}
                aria-current={form === "lesson" ? "page" : undefined}
              >
                {t.lesson}
              </Link>
              <Link
                href={routes.topic(locale, topic, "cheat-sheet")}
                aria-current={form === "cheat-sheet" ? "page" : undefined}
              >
                {t.cheatSheet}
              </Link>
            </nav>
            <DocumentActions
              markdown={
                document ? documentMarkdown(document, content, locale) : ""
              }
              bundle={topicBundle(topic, content, locale)}
              filename={`${topic.id}-bundle`}
              locale={locale}
            />
          </div>
        </header>
        {document ? (
          <>
            {document.provenance === "illustrative" && (
              <p className="notice">{t.illustrative}</p>
            )}
            {!!headings.length && (
              <details className="page-toc">
                <summary>{d.onPage}</summary>
                <nav aria-label={d.onPage}>
                  <ol>
                    {headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={heading.depth > 2 ? "toc-child" : undefined}
                      >
                        <a
                          lang={documentLocale}
                          dir={direction(documentLocale)}
                          href={`#${heading.id}`}
                        >
                          {heading.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </details>
            )}
            <article
              className="prose"
              lang={documentLocale}
              dir={direction(documentLocale)}
            >
              <h2 className="document-title">{document.title}</h2>
              <p className="document-summary">{document.summary}</p>
              <ContentMarkdown
                body={document.body}
                locale={locale}
                content={content}
              />
            </article>
          </>
        ) : (
          <p className="notice">{t.unavailable}</p>
        )}
        <NextTopic
          topic={topic}
          form={form}
          ordered={ordered}
          course={course}
          locale={locale}
        />
        {document && (
          <SourceCitations
            document={document}
            content={content}
            locale={locale}
          />
        )}
        {hasRelationships && (
          <div className="relationships">
            {!!prerequisites.length && (
              <section className="prerequisite-box">
                <h2>{t.prerequisites}</h2>
                <TopicLinks
                  ids={topic.prerequisites}
                  content={content}
                  locale={locale}
                />
              </section>
            )}
            {!!topic.related.length && (
              <section>
                <h2>{t.related}</h2>
                <TopicLinks
                  ids={topic.related}
                  content={content}
                  locale={locale}
                />
              </section>
            )}
            {!!backlinks.length && (
              <section>
                <h2>{d.backlinks}</h2>
                <TopicLinks
                  ids={backlinks.map((item) => item.id)}
                  content={content}
                  locale={locale}
                />
              </section>
            )}
          </div>
        )}
      </div>
      {!!headings.length && (
        <aside className="toc-rail">
          <TocRail
            headings={headings}
            label={d.onPage}
            contentLocale={documentLocale}
          />
        </aside>
      )}
    </div>
  );
}

function Availability({
  topic,
  locale,
}: {
  topic: ContentTopic;
  locale: Locale;
}) {
  const t = messages[locale];
  const d = docsMessages[locale];
  const has = (kind: "lesson" | "cheat-sheet", language: "ar" | "tr") =>
    topic.documents.some(
      (document) => document.kind === kind && document.locale === language,
    );
  return (
    <div className="availability">
      {(["ar", "tr"] as const).map((language) => (
        <Link
          key={language}
          href={routes.topic(language, topic)}
          lang={language}
          dir={direction(language)}
          hrefLang={language}
          data-missing={has("lesson", language) ? undefined : ""}
        >
          {language === "ar" ? "العربية" : "Türkçe"}
          {!has("lesson", language) && <> · {d.missing}</>}
        </Link>
      ))}
      <Link
        href={routes.topic(locale, topic, "cheat-sheet")}
        data-missing={has("cheat-sheet", "tr") ? undefined : ""}
      >
        {t.cheatSheet}
        {!has("cheat-sheet", "tr") && <> · {d.missing}</>}
      </Link>
    </div>
  );
}

export function ContentView({
  route,
  content: internal,
  locale,
}: {
  route: DocsRoute;
  content: Content;
  locale: Locale;
}) {
  const content = publicContent(internal);
  const t = messages[locale];
  const d = docsMessages[locale];
  if (route.kind === "search")
    return (
      <div className="page-narrow">
        <SearchView
          courses={content.courses.map(({ id, title }) => ({ id, title }))}
          locale={locale}
        />
      </div>
    );
  if (route.kind === "glossary")
    return (
      <div className="page-wide">
        <GlossaryView
          entries={content.glossary}
          courses={content.courses}
          topics={topicOptions(content)}
          locale={locale}
        />
      </div>
    );
  if (route.kind === "labs")
    return (
      <div className="page-narrow">
        <p className="eyebrow">{d.library}</p>
        <h1>{d.labs}</h1>
        <p className="lead">{d.labsIntro}</p>
        <p className="notice">{d.labsBody}</p>
        <p>{d.labsTip}</p>
        <Link className="text-link" href={routes.docs(locale)}>
          {t.docs} <Arrow />
        </Link>
      </div>
    );
  if (route.kind === "index")
    return (
      <div className="page-narrow">
        <p className="eyebrow">{d.library}</p>
        <h1 className="display">{t.docs}</h1>
        <p className="lead">{d.intro}</p>
        {!content.courses.length && <p>{t.empty}</p>}
        <ul className="course-list">
          {content.courses.map((course) => {
            const topics = content.topics.filter(
              (topic) => topic.courseId === course.id,
            );
            const covered = new Set(topics.map((topic) => topic.chapterId));
            return (
              <li key={course.id}>
                <h2>
                  <Link href={routes.course(locale, course.id)}>
                    {course.title[locale]}
                  </Link>
                </h2>
                <p>{course.description[locale]}</p>
                <p className="course-stats">
                  <span>
                    <bdi>{covered.size}</bdi> /{" "}
                    <bdi>{course.chapters.length}</bdi> {d.chapters}
                  </span>
                  <span>
                    <bdi>{topics.length}</bdi> {d.topics}
                  </span>
                </p>
                <span className="course-cta" aria-hidden="true">
                  {d.read} <Arrow />
                </span>
              </li>
            );
          })}
        </ul>
        <Link className="search-entry" href={routes.search(locale)}>
          <span>{d.searchIntro}</span>
          <Arrow />
        </Link>
        <p className="fine-print">{d.catalogNote}</p>
      </div>
    );
  if (route.kind === "course") {
    const course = content.courses.find(
      (course) => course.id === route.courseId,
    )!;
    return (
      <div className="page-narrow">
        <p className="eyebrow">{d.library}</p>
        <h1 className="display">{course.title[locale]}</h1>
        <p className="lead">{course.description[locale]}</p>
        <p className="fine-print">{d.catalogNote}</p>
        <ol className="chapter-list">
          {[...course.chapters]
            .sort((a, b) => a.order - b.order)
            .map((chapter) => {
              const topics = content.topics
                .filter(
                  (topic) =>
                    topic.courseId === course.id &&
                    topic.chapterId === chapter.id,
                )
                .sort((a, b) => a.order - b.order);
              return (
                <li
                  className="chapter-section"
                  key={chapter.id}
                  id={chapter.id}
                  data-empty={topics.length ? undefined : ""}
                >
                  <h2>
                    <span className="chapter-number">
                      {chapterNumber(chapter.order)}
                    </span>
                    <span>{chapter.title[locale]}</span>
                  </h2>
                  {topics.length ? (
                    <ol className="chapter-topics">
                      {topics.map((topic) => (
                        <li key={topic.id}>
                          <Link
                            className="chapter-topic-link"
                            href={routes.topic(locale, topic)}
                          >
                            {topic.title[locale]}
                          </Link>
                          <Availability topic={topic} locale={locale} />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="muted">{t.emptyChapter}</p>
                  )}
                </li>
              );
            })}
        </ol>
      </div>
    );
  }
  return (
    <TopicView
      topic={content.topics.find((topic) => topic.id === route.topicId)!}
      form={route.form}
      content={content}
      locale={locale}
    />
  );
}
