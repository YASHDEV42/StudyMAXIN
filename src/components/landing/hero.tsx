import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";
import { landingCopy, languageNames } from "./copy";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeroPlate } from "./hero-plate";
import { HeroStage } from "./hero-stage";
import { MagneticLink } from "./magnetic-link";

/**
 * The whole landing experience: one viewport, one action.
 * Presentation lives in `src/styles/landing.css`, scoped under `.landing`.
 * The CTA always targets the docs entry through the shared route helper.
 */
export function Hero({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const copy = landingCopy[locale];
  return (
    <div
      className={["landing", className].filter(Boolean).join(" ")}
      data-landing
      data-locale={locale}
    >
      <HeroPlate />
      <HeroStage />

      <header className="landing__bar">
        <p className="landing__brand landing__reveal" lang="en" dir="ltr">
          <span className="landing__brand-mark" aria-hidden />
          Study<em>MAXIN</em>
        </p>
        <div className="landing__controls landing__reveal">
          <nav className="landing__languages" aria-label={copy.languageLabel}>
            {locales.map((target) => (
              <Link
                key={target}
                href={routes.home(target)}
                lang={target}
                dir={target === "ar" ? "rtl" : "ltr"}
                hrefLang={target}
                aria-current={target === locale ? "page" : undefined}
              >
                {languageNames[target]}
              </Link>
            ))}
          </nav>
          <ThemeToggle locale={locale} className="landing__theme" />
        </div>
      </header>

      <main className="landing__main">
        <h1 className="landing__title">
          <span className="landing__sr" lang="en" dir="ltr">
            StudyMAXIN:{" "}
          </span>
          {copy.headline.map((line, index) => (
            <span
              key={index}
              className="landing__line"
              style={{ "--landing-line": index } as React.CSSProperties}
            >
              <span className="landing__line-ink">
                {line.map((segment, part) =>
                  segment.emphasis ? (
                    <em key={part}>{segment.text}</em>
                  ) : (
                    <span key={part}>{segment.text}</span>
                  ),
                )}
              </span>{" "}
            </span>
          ))}
        </h1>
        <p className="landing__lede landing__reveal">
          <span>{copy.lede}</span>
        </p>
        <div className="landing__action landing__reveal">
          <MagneticLink href={routes.docs(locale)}>{copy.cta}</MagneticLink>
        </div>
      </main>

      <footer className="landing__foot landing__reveal">
        <p>
          {copy.figure}{" "}
          <span className="landing__foot-note">{copy.figureNote}</span>
        </p>
      </footer>

      <noscript>
        <style>{`.landing .landing__reveal,.landing .landing__line-ink{animation:none!important;opacity:1!important;transform:none!important}.landing .landing__plate *{animation:none!important}`}</style>
      </noscript>
    </div>
  );
}
