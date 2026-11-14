import { siteMetadata } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { landingCopy } from "@/components/landing/copy";
import { Hero } from "@/components/landing/hero";
import { isLocale } from "@/lib/i18n";
import "@/styles/landing.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1ece1" },
    { media: "(prefers-color-scheme: dark)", color: "#0e161a" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = landingCopy[locale];
  return {
    ...siteMetadata(locale, `/${locale}/`, copy.metaTitle),
    title: { absolute: copy.metaTitle },
    description: copy.description,
  };
}

// Phase 3: the single-screen hero. Presentation lives in src/components/landing/.
export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Hero locale={locale} />;
}
