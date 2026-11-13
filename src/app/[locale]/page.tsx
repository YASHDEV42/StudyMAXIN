import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { isLocale, messages } from "@/lib/i18n";
import { routes } from "@/lib/routes";

// Phase 3 owns this placeholder and src/components/landing/.
export default async function LandingPlaceholder({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = messages[locale];
  return (
    <main className="entry">
      <LanguageSwitch locale={locale} />
      <h1>
        <bdi lang="en">StudyLike Genius</bdi>
      </h1>
      <p>{t.foundation}</p>
      <Link href={routes.docs(locale)}>{t.enter}</Link>
    </main>
  );
}
