import Link from "next/link";
import type {
  Content,
  ContentDocument,
  ContentTopic,
} from "@/lib/content/schema";
import { direction, messages, type Locale } from "@/lib/i18n";
import { isPublished, routes, type DocsRoute } from "@/lib/routes";
import { ContentMarkdown } from "./markdown";

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
    <ul>
      {ids.map((id) => {
        const topic = content.topics.find((topic) => topic.id === id)!;
        return (
          <li key={id}>
            <Link href={routes.topic(locale, topic)}>
              {topic.title[locale]}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

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
  if (!document.sources.length) return null;
  return (
    <section aria-label={t.sources}>
      <h2>{t.sources}</h2>
      <ul>
        {document.sources.map((citation) => {
          const source = content.sources.find(
            (source) => source.id === citation.sourceId,
          )!;
          const location = source.location;
          if (location.kind === "unavailable") return null;
          const url = location.kind === "local" ? location.path : location.url;
          return (
            <li key={source.id}>
              <span
                lang={source.language}
                dir={source.language === "ar" ? "rtl" : "ltr"}
              >
                {source.title}
              </span>
              {" — "}
              {t.page}
              {": "}
              {citation.pages.map((range, index) => {
                const href = new URL(url, "https://local.invalid");
                href.hash = `page=${range.from}`;
                return (
                  <span key={`${range.from}-${range.to}`}>
                    {index > 0 && ", "}
                    <a
                      href={
                        location.kind === "local"
                          ? `${href.pathname}${href.hash}`
                          : href.href
                      }
                    >
                      <bdi>
                        {range.from === range.to
                          ? range.from
                          : `${range.from}–${range.to}`}
                      </bdi>
                    </a>
                  </span>
                );
              })}
            </li>
          );
        })}
      </ul>
    </section>
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
  const documentLocale = form === "cheat-sheet" ? "tr" : locale;
  const document = topic.documents.find(
    (document) =>
      document.kind === form &&
      document.locale === documentLocale &&
      document.status === "published",
  );
  return (
    <>
      <p>
        <Link href={routes.course(locale, topic.courseId)}>
          {
            content.courses.find((course) => course.id === topic.courseId)!
              .title[locale]
          }
        </Link>
      </p>
      <h1>{topic.title[locale]}</h1>
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
      {document ? (
        <>
          {document.provenance === "illustrative" && (
            <p className="notice">{t.illustrative}</p>
          )}
          <article
            className="prose"
            lang={documentLocale}
            dir={direction(documentLocale)}
          >
            <h2>{document.title}</h2>
            <p>{document.summary}</p>
            <ContentMarkdown
              body={document.body}
              locale={locale}
              content={content}
            />
          </article>
          <SourceCitations
            document={document}
            content={content}
            locale={locale}
          />
        </>
      ) : (
        <p className="notice">{t.unavailable}</p>
      )}
      {topic.prerequisites.length > 0 && (
        <section>
          <h2>{t.prerequisites}</h2>
          <TopicLinks
            ids={topic.prerequisites}
            content={content}
            locale={locale}
          />
        </section>
      )}
      {topic.related.length > 0 && (
        <section>
          <h2>{t.related}</h2>
          <TopicLinks ids={topic.related} content={content} locale={locale} />
        </section>
      )}
    </>
  );
}

export function ContentView({
  route,
  content,
  locale,
}: {
  route: DocsRoute;
  content: Content;
  locale: Locale;
}) {
  const t = messages[locale];
  if (route.kind === "index")
    return (
      <>
        <h1>{t.docs}</h1>
        {content.courses.length ? (
          <ul className="course-list">
            {content.courses.map((course) => (
              <li key={course.id}>
                <h2>
                  <Link href={routes.course(locale, course.id)}>
                    {course.title[locale]}
                  </Link>
                </h2>
                <p>{course.description[locale]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t.empty}</p>
        )}
        {content.sources.length === 0 && <p className="notice">{t.pending}</p>}
      </>
    );
  if (route.kind === "glossary")
    return (
      <>
        <h1>{t.glossary}</h1>
        {content.glossary.length === 0 && <p>{t.emptyGlossary}</p>}
        <dl>
          {content.glossary.map((entry) => (
            <div
              key={entry.id}
              id={entry.id}
              className="glossary-entry"
              dir="ltr"
            >
              <dt>
                <span lang="tr">{entry.term.tr}</span>
                {" — "}
                <span lang="en">{entry.term.en}</span>
              </dt>
              <dd lang="tr">{entry.examples.tr}</dd>
              <dd lang="en">{entry.examples.en}</dd>
            </div>
          ))}
        </dl>
      </>
    );
  if (route.kind === "course") {
    const course = content.courses.find(
      (course) => course.id === route.courseId,
    )!;
    return (
      <>
        <h1>{course.title[locale]}</h1>
        <p>{course.description[locale]}</p>
        {[...course.chapters]
          .sort((a, b) => a.order - b.order)
          .map((chapter) => {
            const topics = content.topics.filter(
              (topic) =>
                topic.courseId === course.id &&
                topic.chapterId === chapter.id &&
                isPublished(topic),
            );
            return (
              <section key={chapter.id}>
                <h2>{chapter.title[locale]}</h2>
                {topics.length ? (
                  <TopicLinks
                    ids={topics.map((topic) => topic.id)}
                    content={content}
                    locale={locale}
                  />
                ) : (
                  <p>{t.emptyChapter}</p>
                )}
              </section>
            );
          })}
      </>
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
