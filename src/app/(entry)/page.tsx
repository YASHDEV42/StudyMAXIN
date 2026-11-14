import { siteMetadata } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { landingCopy } from "@/components/landing/copy";
import { Hero } from "@/components/landing/hero";
import { defaultLocale } from "@/lib/i18n";
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

export const metadata: Metadata = {
  ...siteMetadata(defaultLocale, "/tr/", landingCopy[defaultLocale].metaTitle),
  title: landingCopy[defaultLocale].metaTitle,
  description: landingCopy[defaultLocale].description,
};

// The language-neutral entry is the hero in the default locale (its root layout
// already declares that language); the visitor chooses a language in the bar.
export default function Entry() {
  return <Hero locale={defaultLocale} />;
}
