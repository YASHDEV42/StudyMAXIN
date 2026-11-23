import { expect, test, type Page } from "@playwright/test";
import { loadQuizBank } from "../../src/lib/quiz/load";
import {
  emptyProgress,
  storageKey,
  type LocalQuiz,
} from "../../src/lib/quiz/progress";
import { createSession } from "../../src/lib/quiz/session";

const bank = await loadQuizBank();
const questions = new Map(
  bank.questions.map((question) => [question.id, question]),
);

async function saved(page: Page): Promise<LocalQuiz> {
  return page.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    storageKey,
  );
}

async function choose(page: Page, correct: boolean, keyboard = false) {
  const { active } = await saved(page);
  const { id, order } = active!.items[active!.position];
  const question = questions.get(id)!;
  const index = order.findIndex(
    (choice) => (choice === question.correctIndex) === correct,
  );
  if (keyboard) await page.keyboard.press(String(index + 1));
  else await page.locator(".quiz-options button").nth(index).click();
  return question;
}

test("practice grades immediately, preserves bookmarks across reload, and clears successfully retried mistakes", async ({
  page,
}) => {
  await page.goto("/tr/docs/");
  await page
    .locator(".docs-header")
    .getByRole("link", { name: "Soru çöz" })
    .click();
  await expect(page).toHaveURL(/\/tr\/quiz\/$/);
  await page
    .getByRole("combobox", { name: "Hafta", exact: true })
    .selectOption("threads");
  await page.getByLabel("Soru sayısı").selectOption("20");
  await page.getByRole("button", { name: "Başla · 20" }).click();
  await expect(
    page.getByRole("button", { name: "Sonraki soru" }),
  ).toBeDisabled();
  await expect(page.locator("h1")).toBeFocused();
  const question = await choose(page, false, true);
  await expect(page.locator(".quiz-feedback")).toContainText(
    question.explanation,
  );
  await page.getByRole("button", { name: "İşaretle", exact: false }).click();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: question.question }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /İşareti kaldır/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("n");
  await expect(page.locator(".quiz-question-meta")).toContainText("2/20");
  await page.getByRole("button", { name: "Önceki soru" }).click();
  await expect(
    page.getByRole("heading", { name: question.question }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Çalışma alanına dön" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Oturumu bırak" }).click();
  await page.getByRole("radio", { name: "Yanlışlarım (1)" }).check();
  await page.getByRole("button", { name: "Başla · 1" }).click();
  await expect(
    page.getByRole("heading", { name: question.question }),
  ).toBeVisible();
  await choose(page, true);
  await page.getByRole("button", { name: "Sonucu gör" }).click();
  await expect(page.locator(".quiz-score")).toContainText("1/1");
  await page.getByRole("button", { name: "Çalışma alanına dön" }).click();
  await expect(
    page.getByRole("radio", { name: "Yanlışlarım (0)" }),
  ).toBeVisible();
  await page.getByRole("radio", { name: "İşaretlediklerim (1)" }).check();
  await page.getByRole("button", { name: "Başla · 1" }).click();
  await expect(
    page.getByRole("heading", { name: question.question }),
  ).toBeVisible();
  expect((await saved(page)).progress.stats[question.id]).toMatchObject({
    correct: 1,
    incorrect: 1,
    queued: false,
  });
});

test("mock supports answer changes, jumping, locale switching, and post-submission review", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ar/docs/");
  await page.locator("#docs-menu-button").click();
  await page
    .locator("#docs-sidebar")
    .getByRole("link", { name: "الاختبارات" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("button", { name: /^المظهر/ }).click();
  await page.getByRole("button", { name: "داكن" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("radio", { name: "اختبار تجريبي" }).check();
  await page.getByLabel("المدة").selectOption("0");
  await page.getByRole("button", { name: "ابدأ · 60" }).click();
  await expect(page.locator(".quiz-map button")).toHaveCount(60);
  await expect(page.locator("h1")).toHaveAttribute("lang", "tr");
  await expect(page.locator("h1")).toHaveAttribute("dir", "ltr");
  const first = await choose(page, true);
  await expect(page.getByText(first.explanation, { exact: true })).toHaveCount(
    0,
  );
  await expect(page.locator("[data-feedback]")).toHaveCount(0);
  await page.locator(".quiz-map button").nth(59).click();
  await choose(page, false);
  await page.getByRole("link", { name: "Türkçe", exact: true }).click();
  await expect(page).toHaveURL(/\/tr\/quiz\/$/);
  await expect(page.locator(".quiz-question-meta")).toContainText("60/60");
  await page.locator(".quiz-map button").first().click();
  await choose(page, false);
  await choose(page, true);
  expect((await saved(page)).progress.stats).toEqual({});
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Sınavı teslim et" }).click();
  await expect(page.locator(".quiz-score")).toContainText("1/60");
  await expect(
    page.getByRole("heading", { name: "Konu performansı" }),
  ).toBeVisible();
  await expect(page.locator(".quiz-result-list > li")).toHaveCount(59);
  await page.getByRole("checkbox", { name: "Tüm sorular" }).check();
  await expect(page.locator(".quiz-result-list > li")).toHaveCount(60);
  await expect(
    page.getByText(first.explanation, { exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});

test("the timer submits and a JSON backup can restore the result after reload", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T10:00:00Z") });
  await page.goto("/tr/quiz/");
  await page.getByRole("radio", { name: "Deneme sınavı" }).check();
  await page.getByLabel("Süre").selectOption("45");
  await page.getByRole("button", { name: "Başla · 60" }).click();
  await expect(page.locator(".quiz-clock")).toContainText("Kalan süre");
  await choose(page, true);
  await page.clock.fastForward(45 * 60_000 + 1_000);
  await expect(
    page.getByRole("heading", { level: 1, name: "Oturum sonucu" }),
  ).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: /Deneme sınavı.*1\/60/ }).click();
  await expect(page.locator(".quiz-score")).toContainText("1/60");
  await page.getByRole("button", { name: "Çalışma alanına dön" }).click();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "İlerlemeyi dışa aktar" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("studymaxin-os-progress.json");
  const file = await download.path();

  await page.evaluate((key) => localStorage.setItem(key, "{bad"), storageKey);
  await page.reload();
  await expect(page.getByRole("status")).toContainText("Kayıt okunamadı");
  await page.locator('input[type="file"]').setInputFiles({
    name: "invalid.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"version":2}'),
  });
  await expect(page.getByRole("status")).toContainText(
    "geçerli bir StudyMAXIN ilerleme yedeği değil",
  );
  page.once("dialog", (dialog) => dialog.accept());
  await page.locator('input[type="file"]').setInputFiles(file);
  await expect(page.getByRole("status")).toContainText(
    "İlerleme içe aktarıldı.",
  );
  await expect(
    page.getByRole("button", { name: /Deneme sınavı.*1\/60/ }),
  ).toBeVisible();
});

test("a timed exam left open past its deadline submits on return", async ({
  page,
}) => {
  const active = createSession(bank.questions, "exam", 60, Date.now() - 5000);
  await page.addInitScript(({ key, data }) => localStorage.setItem(key, data), {
    key: storageKey,
    data: JSON.stringify({ progress: emptyProgress(), active }),
  });
  await page.goto("/tr/quiz/");
  await expect(page.locator(".quiz-score")).toContainText("0/60");
  expect((await saved(page)).active).toBeNull();
  expect((await saved(page)).progress.stats).toEqual({});
});

test("random practice draws a 30-question unique batch and reports immediate feedback", async ({
  page,
}) => {
  await page.goto("/tr/quiz/");
  await page.getByRole("radio", { name: "Karışık alıştırma" }).check();
  await page.getByLabel("Soru sayısı").selectOption("30");
  await page.getByRole("button", { name: "Başla · 30" }).click();
  const { active } = await saved(page);
  expect(active?.mode).toBe("random");
  expect(new Set(active?.items.map(({ id }) => id)).size).toBe(30);
  const question = await choose(page, true);
  await expect(page.locator(".quiz-feedback")).toContainText(
    question.explanation,
  );
});

test("a supplementary question shows the slide as context and links the technical verification", async ({
  page,
}) => {
  const question = questions.get("os-threads-fork-thread")!;
  const active = createSession([question], "topic", 1, null);
  await page.addInitScript(({ key, data }) => localStorage.setItem(key, data), {
    key: storageKey,
    data: JSON.stringify({ progress: emptyProgress(), active }),
  });
  await page.goto("/tr/quiz/");
  await expect(
    page.getByRole("heading", { name: question.question }),
  ).toBeVisible();
  await expect(page.locator(".quiz-source")).toHaveCount(0);
  await choose(page, true);
  await page.locator(".quiz-source summary").click();
  await expect(page.locator(".quiz-source")).toContainText("Konu bağlamı");
  const sources = page.getByRole("list", { name: "Ek doğrulama kaynakları" });
  await expect(sources.getByRole("link", { name: /execve/ })).toHaveAttribute(
    "href",
    bank.referencesByQuestion[question.id][0],
  );
});

test("database quiz keeps course progress separate", async ({ page }) => {
  await page.goto("/tr/quiz/database-management/");
  await expect(
    page.getByRole("heading", { name: "Veritabanı Yönetim Sistemleri" }),
  ).toBeVisible();
  await expect(page.locator(".quiz-intro")).toContainText("93 soru hazır");
  await page
    .getByRole("combobox", { name: "Hafta", exact: true })
    .selectOption("week-06");
  await page.getByRole("button", { name: "Başla · 10" }).click();
  await expect(page.locator(".quiz-question")).toBeVisible();
  await page.locator(".quiz-options button").first().click();
  await expect(page.locator(".quiz-feedback")).toBeVisible();
  const dbKey = "studymaxin.quiz.database-management.v1";
  await expect
    .poll(() => page.evaluate((key) => localStorage.getItem(key), dbKey))
    .not.toBeNull();
  await page.getByRole("link", { name: "İşletim Sistemleri testi" }).click();
  await expect(page).toHaveURL(/\/tr\/quiz\/$/);
  await expect(
    page.getByRole("heading", { name: "İşletim Sistemleri Soru Bankası" }),
  ).toBeVisible();
  await expect(page.locator(".quiz-intro")).toContainText("soru hazır");
});

test("textbook practice renders all five choices without changing the original OS mode", async ({
  page,
}) => {
  await page.goto("/tr/quiz/database-management/");
  await page.getByRole("radio", { name: "Kitap soruları" }).check();
  await page.getByRole("button", { name: "Başla · 10" }).click();
  await expect(page.locator(".quiz-options button")).toHaveCount(5);
  await expect(page.locator(".quiz-letter").last()).toHaveText("E");
});
