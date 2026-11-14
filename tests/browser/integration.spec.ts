import { expect, test } from "@playwright/test";

for (const path of ["/", "/tr/", "/ar/"]) {
  test(`${path}: hero reaches localized docs across palettes and sizes`, async ({
    page,
  }) => {
    const locale = path === "/ar/" ? "ar" : "tr";
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const colorScheme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      for (const width of [375, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(path);
        await expect(page.locator("html")).toHaveAttribute(
          "dir",
          locale === "ar" ? "rtl" : "ltr",
        );
        await expect(page.locator("h1")).toHaveCount(1);
        expect(
          await page.evaluate(
            () =>
              document.documentElement.scrollWidth <= innerWidth &&
              document.documentElement.scrollHeight <= innerHeight,
          ),
        ).toBe(true);
        const cta = page.locator(".landing__cta");
        await expect(cta).toHaveAttribute("href", `/${locale}/docs/`);
        await cta.focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`/${locale}/docs/`);
        await expect(page.locator(".docs-shell")).toBeVisible();
        await expect(page.locator(".landing")).toHaveCount(0);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        // Docs follow the same system palette as the hero.
        expect(
          await page.evaluate(
            () => getComputedStyle(document.documentElement).colorScheme,
          ),
        ).toBe(colorScheme);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("magnetic CTA moves within its stable hit area and clicks through", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/tr/");
  const anchor = page.locator(".landing__cta");
  const box = (await anchor.boundingBox())!;
  await page.mouse.move(box.x + box.width - 25, box.y + box.height / 2);
  const pull = () =>
    page
      .locator(".landing__cta-pill")
      .evaluate(
        (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41,
      );
  await expect.poll(pull).toBeGreaterThan(1);
  expect(Math.abs(await pull())).toBeLessThan(18);
  expect(await anchor.boundingBox()).toEqual(box);
  await anchor.click();
  await expect(page).toHaveURL("/tr/docs/");
});

test("hero language choice and touch navigation", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.locator('.landing__languages a[lang="ar"]').tap();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.locator(".landing__cta").tap();
  await expect(page).toHaveURL(/\/ar\/docs\/$/);
  await expect(page.locator(".docs-shell")).toBeVisible();
  await context.close();
});

test("hero remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/ar/");
  await expect(page.locator("h1")).toBeVisible();
  await page.locator(".landing__cta").click();
  await expect(page).toHaveURL(/\/ar\/docs\/$/);
  await context.close();
});
