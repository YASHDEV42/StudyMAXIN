import type { Metadata } from "next";
import { landingCopy } from "@/components/landing/copy";
import type { Locale } from "./i18n";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const origin = process.env.SITE_ORIGIN;
if (basePath && !/^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(basePath))
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH must be empty or a path without a trailing slash",
  );
if (origin) {
  const url = new URL(origin);
  if (!["https:", "http:"].includes(url.protocol) || url.origin !== origin)
    throw new Error(
      "SITE_ORIGIN must be an HTTP(S) origin without a path or trailing slash",
    );
}

/** Absolute identity URLs are emitted only when the deployment origin is known. */
export function siteMetadata(
  locale: Locale,
  path: string,
  title: string,
): Metadata {
  const description = landingCopy[locale].description;
  const absolute = (route: string) => `${origin}${basePath}${route}`;
  return {
    applicationName: "StudyMAXIN",
    description,
    icons: { icon: `${basePath}/icon.svg` },
    ...(origin
      ? {
          metadataBase: new URL(origin),
          alternates: {
            canonical: absolute(path),
            languages: Object.fromEntries(
              ["ar", "tr"].map((language) => [
                language,
                absolute(path.replace(/^\/(ar|tr)(?=\/)/, `/${language}`)),
              ]),
            ),
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      siteName: "StudyMAXIN",
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "tr_TR",
      alternateLocale: locale === "ar" ? "tr_TR" : "ar_AR",
      ...(origin ? { url: absolute(path) } : {}),
    },
    twitter: { card: "summary", title, description },
  };
}
