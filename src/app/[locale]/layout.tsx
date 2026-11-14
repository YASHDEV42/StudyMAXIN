import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/fonts";
import { direction, isLocale, locales } from "@/lib/i18n";
import { themeScript } from "@/lib/theme";
import "@/styles/base.css";

export const metadata: Metadata = {
  title: { default: "StudyMAXIN", template: "%s | StudyMAXIN" },
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
    // data-theme is set before paint by themeScript, so React must not reconcile it.
    <html
      lang={locale}
      dir={direction(locale)}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
