import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { direction, isLocale, locales } from "@/lib/i18n";
import "@/styles/base.css";

export const metadata: Metadata = {
  title: { default: "StudyLike Genius", template: "%s | StudyLike Genius" },
  description: "StudyLike Genius",
};
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={direction(locale)}>
      <body>{children}</body>
    </html>
  );
}
