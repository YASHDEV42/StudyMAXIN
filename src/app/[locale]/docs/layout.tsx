import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { topicOptions } from "@/lib/docs/public";
import { DocsHeader } from "@/components/docs/header";
import { DocsNavigation } from "@/components/docs/navigation";
import { isLocale, messages } from "@/lib/i18n";
import "@/styles/docs.css";

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = messages[locale];
  const content = await getContent();
  return (
    <div className="docs-shell" data-locale={locale}>
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <DocsHeader
        locale={locale}
        courses={content.courses.map(({ id, title }) => ({ id, title }))}
      />
      <div className="docs-workspace">
        <DocsNavigation
          courses={content.courses}
          topics={topicOptions(content)}
          locale={locale}
        />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
