import type { Content, ContentTopic } from "./content/schema";
import { isLocale, type Locale } from "./i18n";

export const routes = {
  home: (locale: Locale) => `/${locale}/`,
  docs: (locale: Locale) => `/${locale}/docs/`,
  quiz: (locale: Locale) => `/${locale}/quiz/`,
  glossary: (locale: Locale) => `/${locale}/docs/glossary/`,
  search: (locale: Locale) => `/${locale}/docs/search/`,
  labs: (locale: Locale) => `/${locale}/docs/labs/`,
  course: (locale: Locale, courseId: string) =>
    `/${locale}/docs/courses/${courseId}/`,
  topic: (
    locale: Locale,
    topic: Pick<ContentTopic, "id" | "courseId">,
    form: "lesson" | "cheat-sheet" = "lesson",
  ) => `/${locale}/docs/courses/${topic.courseId}/topics/${topic.id}/${form}/`,
};

export function switchLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (!isLocale(parts[1] ?? "")) return routes.docs(locale);
  parts[1] = locale;
  return parts.join("/");
}

export function isPublished(topic: ContentTopic) {
  return topic.documents.some((document) => document.status === "published");
}

export function docsSegments(content: Content): string[][] {
  return [
    [],
    ["glossary"],
    ["search"],
    ["labs"],
    ...content.courses.map((course) => ["courses", course.id]),
    ...content.topics
      .filter(isPublished)
      .flatMap((topic) =>
        ["lesson", "cheat-sheet"].map((form) => [
          "courses",
          topic.courseId,
          "topics",
          topic.id,
          form,
        ]),
      ),
  ];
}

export type DocsRoute =
  | { kind: "index" }
  | { kind: "glossary" }
  | { kind: "search" }
  | { kind: "labs" }
  | { kind: "course"; courseId: string }
  | { kind: "topic"; topicId: string; form: "lesson" | "cheat-sheet" };

export function resolveDocsRoute(
  segments: string[],
  content: Content,
): DocsRoute | undefined {
  if (segments.length === 0) return { kind: "index" };
  if (
    segments.length === 1 &&
    (segments[0] === "search" || segments[0] === "labs")
  )
    return { kind: segments[0] };
  if (segments.length === 1 && segments[0] === "glossary")
    return { kind: "glossary" };
  if (segments[0] !== "courses") return;
  const course = content.courses.find((course) => course.id === segments[1]);
  if (!course) return;
  if (segments.length === 2) return { kind: "course", courseId: course.id };
  const form = segments[4];
  if (
    segments.length !== 5 ||
    segments[2] !== "topics" ||
    (form !== "lesson" && form !== "cheat-sheet")
  )
    return;
  const topic = content.topics.find(
    (topic) =>
      topic.id === segments[3] &&
      topic.courseId === course.id &&
      isPublished(topic),
  );
  if (topic) return { kind: "topic", topicId: topic.id, form };
}

export function contentLink(url: string, locale: Locale, content: Content) {
  if (url.startsWith("topic:")) {
    const topic = content.topics.find(
      (topic) => topic.id === url.slice(6) && isPublished(topic),
    );
    return topic ? routes.topic(locale, topic) : undefined;
  }
  if (url.startsWith("glossary:")) {
    const entry = content.glossary.find((entry) => entry.id === url.slice(9));
    return entry ? `${routes.glossary(locale)}#${entry.id}` : undefined;
  }
  try {
    const parsed = new URL(url);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol)
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}
