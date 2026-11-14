import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const course = "information-systems-security";
const topic = "cia-security-goals";
const lesson = (locale: string) =>
  `/${locale}/docs/courses/${course}/topics/${topic}/lesson/`;
const sheet = (locale: string) =>
  `/${locale}/docs/courses/${course}/topics/${topic}/cheat-sheet/`;

test("language switch keeps the topic/form; Turkish sheet stays LTR in Arabic", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(lesson("tr"));
  await expect(page.locator("article")).toHaveAttribute("lang", "tr");
  await page.getByRole("link", { name: "العربية", exact: true }).click();
  await expect(page).toHaveURL(lesson("ar"));
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("article")).toHaveAttribute("lang", "ar");
  await page.locator(".form-nav a").nth(1).click();
  await expect(page).toHaveURL(sheet("ar"));
  await expect(page.locator("article")).toHaveAttribute("lang", "tr");
  await expect(page.locator("article")).toHaveAttribute("dir", "ltr");
  await page.getByRole("link", { name: "Türkçe", exact: true }).click();
  await expect(page).toHaveURL(sheet("tr"));
  expect(errors).toEqual([]);
});

test("multilingual search links to the matching content language and supports course filtering", async ({
  page,
}) => {
  await page.goto("/ar/docs/search/?q=confidentiality");
  await expect(page.locator(".search-results li")).not.toHaveCount(0);
  await page.getByRole("searchbox").fill("سرية");
  await expect(page.locator(".search-results li")).not.toHaveCount(0);
  await page.getByRole("searchbox").fill("GİZLİLİK");
  await page
    .getByRole("combobox", { name: "المقرر", exact: true })
    .selectOption(course);
  await expect(page.locator(".search-results li")).not.toHaveCount(0);
  const turkish = page
    .locator('.search-results h2[lang="tr"] a[href^="/tr/"]')
    .first();
  await expect(turkish).toHaveAttribute("href", /^\/tr\/.*lesson\/$/);
  await turkish.click();
  await expect(page.locator("article")).toHaveAttribute("lang", "tr");
});

test("glossary filters by course/chapter/topic, exports only the filtered TSV and supports identity anchors", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/tr/docs/glossary/#authentication");
  await expect(page.locator("#authentication")).toBeVisible();
  await page
    .getByRole("combobox", { name: "Ders", exact: true })
    .selectOption(course);
  await page
    .getByRole("combobox", { name: "Bölüm", exact: true })
    .selectOption("week-01");
  await page
    .getByRole("combobox", { name: "Konu", exact: true })
    .selectOption("identity-access-accountability");
  await page.getByRole("searchbox").fill("authentication");
  await expect(page.locator(".glossary-entry")).toHaveCount(2);
  await page.getByRole("button", { name: "TSV kopyala", exact: true }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("Multi-factor authentication");
  expect(copied).not.toContain("Confidentiality");
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "TSV indir", exact: true }).click();
  const download = await downloadEvent;
  expect(await readFile((await download.path())!, "utf8")).toBe(copied);
  await page.getByRole("button", { name: "Filtreleri temizle" }).click();
  const glossary = JSON.parse(await readFile("content/glossary.json", "utf8"));
  await expect(page.locator(".glossary-entry")).toHaveCount(glossary.length);
});

test("Markdown copy and topic download include all three forms, glossary and traceable sources", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(lesson("ar"));
  await page.getByRole("button", { name: "انسخ Markdown" }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain(
    "Language: ar; form: lesson; provenance: source-based",
  );
  expect(copied).toContain("physical PDF pages: 21–25");
  expect(copied).toContain("SHA-256:");
  expect(copied).not.toContain("topic:identity-access-accountability");
  const event = page.waitForEvent("download");
  await page.getByRole("button", { name: "نزّل حزمة الموضوع" }).click();
  const download = await event;
  const bundle = await readFile((await download.path())!, "utf8");
  expect(bundle).toContain("Language: ar; form: lesson");
  expect(bundle).toContain("Language: tr; form: lesson");
  expect(bundle).toContain("Language: tr; form: cheat-sheet");
  expect(bundle).toContain("Turkish–English glossary");
  expect(bundle).toContain("Confidentiality");
});

test("failed clipboard access provides selectable Markdown", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
    }),
  );
  await page.goto(sheet("tr"));
  await page.getByRole("button", { name: "Markdown kopyala" }).click();
  const fallback = page.getByLabel("Kopyalanacak metin");
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveValue(/form: cheat-sheet/);
});

test("sources are plain textual citations with physical PDF pages and no upload control", async ({
  page,
}) => {
  await page.goto(lesson("tr"));
  const sources = page.locator(".source-citations");
  await expect(sources).toContainText("teori-1-1-42.pdf");
  await expect(sources).toContainText("21–25");
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(sources.locator("a")).toHaveCount(0);
  // A topic spanning two split PDFs cites both, in order.
  await page.goto(
    `/tr/docs/courses/${course}/topics/secure-sdlc-devsecops/lesson/`,
  );
  await expect(page.locator(".source-citations li")).toHaveCount(2);
  await expect(page.locator(".source-citations li").first()).toContainText(
    "46–47",
  );
});

test("next topic is the first thing after the lesson; sources and relationships follow", async ({
  page,
}) => {
  await page.goto(lesson("ar"));
  const order = await page.evaluate(() =>
    [
      "article.prose",
      ".sequence-nav",
      ".source-citations",
      ".relationships",
    ].map((selector) => {
      const element = document.querySelector(selector)!;
      return element.getBoundingClientRect().top + window.scrollY;
    }),
  );
  expect([...order].sort((a, b) => a - b)).toEqual(order);
  const next = page.locator(".next-card");
  await expect(next).toHaveAttribute("rel", "next");
  const nextBox = (await next.boundingBox())!;
  const relatedBox = (await page
    .locator(".relationships a")
    .first()
    .boundingBox())!;
  expect(nextBox.height).toBeGreaterThan(relatedBox.height * 2.5);
  await next.click();
  await expect(page).not.toHaveURL(lesson("ar"));
  await expect(page.locator("article")).toHaveAttribute("lang", "ar");
});

test("the last published topic offers a completion state", async ({ page }) => {
  await page.goto(
    `/tr/docs/courses/${course}/topics/os-security-synthesis/lesson/`,
  );
  await expect(page.locator(".next-complete")).toBeVisible();
  await expect(page.locator('.sequence-nav a[rel="next"]')).toHaveCount(0);
});

test("search palette opens from the navbar and with the keyboard, navigates results and closes", async ({
  page,
}) => {
  await page.goto(lesson("tr"));
  const dialog = page.getByRole("dialog");
  await page.locator(".search-trigger").click();
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.locator(".search-trigger")).toBeFocused();
  await page.locator("body").click();
  await page.keyboard.press("Control+k");
  await expect(dialog).toBeVisible();
  const input = page.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill("sql injection");
  const options = page.getByRole("option");
  await expect(options.first()).toBeVisible();
  await expect(options.first()).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowDown");
  await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(input).toHaveAttribute(
    "aria-activedescendant",
    (await options.nth(1).getAttribute("id"))!,
  );
  const href = await options.nth(1).locator("a").getAttribute("href");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(href!);
  await expect(dialog).toBeHidden();
  // "/" opens search outside text fields; it does not hijack typing.
  await page.keyboard.press("/");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
});

test("sidebar shows chapter hierarchy, expands only the current chapter and collapses on demand", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`/tr/docs/courses/${course}/topics/sql-injection/lesson/`);
  const sidebar = page.locator(".docs-sidebar");
  const active = sidebar.locator('.sidebar-topics a[aria-current="page"]');
  await expect(active).toBeVisible();
  await expect(sidebar.locator('button[aria-expanded="true"]')).toHaveCount(1);
  const current = sidebar.locator(".sidebar-chapter[data-active] > button");
  await expect(current).toHaveAttribute("aria-expanded", "true");
  const first = sidebar.locator(".sidebar-chapter > button").first();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await current.focus();
  await page.keyboard.press("Enter");
  await expect(current).toHaveAttribute("aria-expanded", "false");
  await expect(active).toBeHidden();
  const chapterSize = await current
    .locator(".sidebar-chapter-title")
    .evaluate((el) => getComputedStyle(el).fontWeight);
  expect(Number(chapterSize)).toBeGreaterThanOrEqual(600);
});

test("theme follows the system, persists an explicit choice and carries from hero to docs", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/tr/");
  const scheme = () =>
    page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);
  expect(await scheme()).toContain("dark");
  await page.locator(".landing__theme .theme-toggle__button").click();
  await page.getByRole("button", { name: "Açık", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator(".landing__cta").click();
  await expect(page).toHaveURL("/tr/docs/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await scheme()).toBe("light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.locator(".header-theme .theme-toggle__button").click();
  await page.getByRole("button", { name: "Sistem", exact: true }).click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.+/);
  expect(await scheme()).toContain("dark");
});

for (const locale of ["tr", "ar"]) {
  test(`${locale}: responsive reading, TOC, concepts, backlinks and keyboard skip`, async ({
    page,
  }, testInfo) => {
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(lesson(locale));
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      const sidebar = page.locator(".docs-sidebar");
      if (width >= 1024) await expect(sidebar).toBeVisible();
      else {
        await expect(sidebar).toBeHidden();
        await page.locator("#docs-menu-button").click();
        await expect(sidebar).toBeVisible();
        await expect(
          sidebar.locator('.sidebar-topics a[aria-current="page"]'),
        ).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(sidebar).toBeHidden();
        await expect(page.locator("#docs-menu-button")).toBeFocused();
        await page.reload();
      }
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      await expect(page.locator("main")).toBeFocused();
      if (width < 1280) await page.locator(".page-toc summary").click();
      const anchor = page
        .locator(width < 1280 ? ".page-toc a" : ".toc-rail a")
        .first();
      const target = await anchor.getAttribute("href");
      await anchor.click();
      await expect(page).toHaveURL(new RegExp(`${target}$`));
      await expect(page.locator(`article ${target}`)).toBeVisible();
      await page.screenshot({
        path: testInfo.outputPath(`${locale}-${width}.png`),
        fullPage: false,
      });
    }
    const concept = page
      .locator('article a[href*="identity-access-accountability"]')
      .first();
    await concept.click();
    await expect(page.locator(".prerequisite-box a")).toHaveAttribute(
      "href",
      lesson(locale),
    );
    await expect(page.locator(".relationships")).toContainText(
      locale === "ar" ? "مواضيع تشير" : "Bu konuya bağlananlar",
    );
  });
}

test("static routes, Labs, and all internal documentation links resolve; unknown routes return 404", async ({
  page,
  request,
}) => {
  const paths = [
    "/tr/docs/",
    "/ar/docs/",
    `/tr/docs/courses/${course}/`,
    lesson("tr"),
    lesson("ar"),
    sheet("ar"),
    "/tr/docs/glossary/",
    "/ar/docs/labs/",
  ];
  const hrefs = new Set<string>();
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    for (const href of await page
      .locator('main a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!)))
      hrefs.add(href.split("#")[0]);
  }
  for (const href of hrefs)
    expect((await request.get(href)).status(), href).toBe(200);
  expect((await request.get("/tr/docs/unknown/")).status()).toBe(404);
  expect((await request.get("/en/docs/")).status()).toBe(404);
  expect((await request.get("/sources/teori-1-1-42.pdf")).status()).toBe(404);
});
