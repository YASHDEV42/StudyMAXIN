import { siteMetadata } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentView } from "@/components/docs/content-view";
import { docsMessages } from "@/lib/docs/messages";
import { publicContent } from "@/lib/docs/public";
import { getContent } from "@/lib/content";
import { isLocale, locales, messages } from "@/lib/i18n";
import { docsSegments, resolveDocsRoute } from "@/lib/routes";

type Props = { params: Promise<{ locale: string; segments?: string[] }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  const content = await getContent();
  return locales.flatMap((locale) =>
    docsSegments(content).map((segments) => ({ locale, segments })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getContent();
  const route = resolveDocsRoute(segments, content);
  if (!route) notFound();
  const title =
    route.kind === "topic"
      ? content.topics.find((topic) => topic.id === route.topicId)!.title[
          locale
        ]
      : route.kind === "course"
        ? content.courses.find((course) => course.id === route.courseId)!.title[
            locale
          ]
        : route.kind === "search" || route.kind === "labs"
          ? docsMessages[locale][route.kind]
          : messages[locale][route.kind === "glossary" ? "glossary" : "docs"];
  return {
    ...siteMetadata(
      locale,
      `/${locale}/docs/${segments.length ? segments.join("/") + "/" : ""}`,
      `${title} | StudyMAXIN`,
    ),
    title,
  };
}

export default async function DocsPage({ params }: Props) {
  const { locale, segments = [] } = await params;
  if (!isLocale(locale)) notFound();
  const content = await getContent();
  const route = resolveDocsRoute(segments, content);
  if (!route) notFound();
  return (
    <ContentView
      route={route}
      content={publicContent(content)}
      locale={locale}
    />
  );
}
