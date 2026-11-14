import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { landingCopy } from "../src/components/landing/copy";
import { Hero } from "../src/components/landing/hero";
import { locales } from "../src/lib/i18n";
import { routes } from "../src/lib/routes";

// Outside the Next build, next/link has no trailingSlash setting and trims the
// slash; the exported pages keep it. Compare the route itself.
function hrefs(html: string, pattern: RegExp) {
  return [...html.matchAll(pattern)].map((match) =>
    match[1].replace(/\/?$/, "/"),
  );
}

test("the hero's single action is the docs entry from the shared route helper", () => {
  for (const locale of locales) {
    const html = renderToStaticMarkup(<Hero locale={locale} />);
    const actions = hrefs(
      html,
      /<a [^>]*class="landing__cta"[^>]*href="([^"]+)"/g,
    );
    assert.deepEqual(actions, [routes.docs(locale)]);
    assert.ok(html.includes(landingCopy[locale].cta));
    // Nothing on the landing links into a specific course or topic.
    assert.equal(html.includes("/docs/courses/"), false);
  }
});

test("the hero is one localized heading with a language choice and no docs shell", () => {
  for (const locale of locales) {
    const html = renderToStaticMarkup(<Hero locale={locale} />);
    assert.equal(html.match(/<h1/g)?.length, 1);
    for (const line of landingCopy[locale].headline)
      for (const segment of line) assert.ok(html.includes(segment.text.trim()));
    assert.ok(html.includes(landingCopy[locale].lede));
    assert.deepEqual(
      hrefs(html, /<a [^>]*hrefLang="[a-z]+"[^>]*href="([^"]+)"/g),
      locales.map((target) => routes.home(target)),
    );
    assert.equal(html.match(/aria-current="page"/g)?.length, 1);
    assert.match(html, new RegExp(`hrefLang="${locale}" aria-current="page"`));
    assert.match(html, /<div class="landing__plate" aria-hidden="true">/);
    assert.equal(html.includes("docs-shell"), false);
  }
});

test("Arabic and Turkish heroes do not borrow each other's copy", () => {
  const arabic = renderToStaticMarkup(<Hero locale="ar" />);
  const turkish = renderToStaticMarkup(<Hero locale="tr" />);
  assert.equal(arabic.includes(landingCopy.tr.lede), false);
  assert.equal(turkish.includes(landingCopy.ar.lede), false);
  assert.match(arabic, /data-locale="ar"/);
  assert.match(turkish, /data-locale="tr"/);
});
