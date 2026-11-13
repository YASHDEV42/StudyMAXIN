import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { isLocale, messages } from "@/lib/i18n";
import { routes } from "@/lib/routes";
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
  return (
    <div className="docs-shell">
      <a className="skip-link" href="#main-content">
        {t.skip}
      </a>
      <header>
        <Link className="brand" href={routes.home(locale)}>
          <bdi lang="en">StudyLike Genius</bdi>
        </Link>
        <nav aria-label={locale === "ar" ? "التنقل الرئيسي" : "Ana gezinme"}>
          <Link href={routes.docs(locale)}>{t.docs}</Link>
          <Link href={routes.glossary(locale)}>{t.glossary}</Link>
        </nav>
        <LanguageSwitch locale={locale} />
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
