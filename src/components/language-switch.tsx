"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { switchLocale } from "@/lib/routes";

export function LanguageSwitch({
  locale,
  className = "language-switch",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <nav className={className} aria-label={locale === "ar" ? "اللغة" : "Dil"}>
      {locales.map((target) => (
        <Link
          key={target}
          href={switchLocale(pathname, target)}
          lang={target}
          dir={target === "ar" ? "rtl" : "ltr"}
          hrefLang={target}
          aria-current={target === locale ? "page" : undefined}
        >
          {target === "ar" ? "العربية" : "Türkçe"}
        </Link>
      ))}
    </nav>
  );
}
