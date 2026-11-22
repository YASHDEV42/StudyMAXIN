import assert from "node:assert/strict";
import { test } from "node:test";
import { publishAuditedBank } from "../src/lib/quiz/audit";
import audit from "../docs/quiz-audit.json";
import {
  questionSchema,
  validateBank,
  type Question,
} from "../src/lib/quiz/bank";
import { loadQuizBank } from "../src/lib/quiz/load";
import {
  attemptTotals,
  emptyProgress,
  exportProgress,
  finishSession,
  importProgress,
  readLocal,
  recordAnswer,
  reviewPool,
  score,
} from "../src/lib/quiz/progress";
import {
  createSession,
  examSize,
  moveSession,
  selectAnswer,
  sessionSchema,
} from "../src/lib/quiz/session";

const bank = await loadQuizBank();
const questions = new Map(bank.questions.map((value) => [value.id, value]));
const [first, second] = bank.questions;

test("the published quiz bank supports 30-question batches and a unique 60-question exam", () => {
  assert.equal(bank.topics.length, 5);
  assert.equal(questions.size, bank.questions.length);
  for (const { id } of bank.topics) {
    assert.ok(
      bank.questions.filter(({ topicId }) => topicId === id).length >= 30,
    );
  }
  assert.ok(bank.questions.length >= examSize);
});

test("quiz question schema rejects malformed text, choices, indexes and metadata", () => {
  for (const patch of [
    { question: " " },
    { difficulty: "easy" },
    { choices: ["A", "B", "C"] },
    { choices: ["A", "B", "C", "  a  "] },
    { correctIndex: 4 },
    { correctIndex: -1 },
    { correctIndex: 1.5 },
    { source: { id: "source", slides: [] } },
    { status: "draft" },
  ])
    assert.equal(
      questionSchema.safeParse({ ...first, ...patch }).success,
      false,
    );
});

test("quiz bank rejects duplicate identities and inconsistent course, topic, and provenance", () => {
  const all = bank.questions;
  const manifest = {
    courseId: bank.courseId,
    title: bank.title,
    topics: bank.topics,
    sources: bank.sources,
  };
  const files = new Map(
    bank.topics.map(({ id }) => [
      id,
      all.filter(({ topicId }) => topicId === id),
    ]),
  );
  const original = files.get(first.topicId)!;
  function validateWith(replacement: Question[]) {
    return validateBank(
      bank.courseId,
      manifest,
      new Map(files).set(first.topicId, replacement),
    );
  }
  assert.throws(
    () => validateWith([...original, first]),
    /Duplicate quiz question ID/,
  );
  assert.throws(
    () =>
      validateWith([
        ...original,
        { ...first, id: "copied-stem", question: ` ${first.question} ` },
      ]),
    /Duplicate quiz question text/,
  );
  for (const replacement of [
    { ...first, topicId: "invalid" },
    { ...first, courseId: "other-course" },
  ]) {
    assert.throws(() => validateWith([replacement]), /course or topic/);
  }
  for (const source of [
    { id: "missing", slides: [1] },
    { ...first.source, slides: [9999] },
    { ...first.source, slides: [5, 5] },
    { id: bank.sources[1].id, slides: [1] },
  ]) {
    assert.throws(
      () => validateWith([{ ...first, source }]),
      /Invalid question source/,
    );
  }
  const missing = new Map(files);
  missing.delete(first.topicId);
  assert.throws(
    () => validateBank(bank.courseId, manifest, missing),
    /Missing quiz topic file/,
  );
  assert.throws(
    () =>
      validateBank(
        bank.courseId,
        manifest,
        new Map(files).set("unknown", [first]),
      ),
    /Unknown quiz topic file/,
  );
  assert.throws(
    () =>
      validateBank(
        bank.courseId,
        { ...manifest, topics: [...manifest.topics, manifest.topics[0]] },
        files,
      ),
    /Duplicate quiz topic ID/,
  );
});

test("shuffled display indexes preserve the authored answer and do not mutate the bank", () => {
  const session = createSession([first], "random", 1, null, () => 0)!;
  assert.deepEqual(session.items[0].order, [1, 2, 3, 0]);
  const displayed = session.items[0].order.indexOf(first.correctIndex);
  const updated = selectAnswer(session, displayed, 100);
  assert.equal(updated.items[0].answer, first.correctIndex);
  assert.equal(session.items[0].answer, null);
  assert.strictEqual(selectAnswer(updated, (displayed + 1) % 4, 100), updated);
});

test("exam samples exactly 60 unique items, refuses undersized pools and permits answer edits until the deadline", () => {
  const session = createSession(bank.questions, "exam", 10, 1000, () => 0.5)!;
  assert.ok(sessionSchema.safeParse(session).success);
  assert.equal(new Set(session.items.map(({ id }) => id)).size, 60);
  assert.notDeepEqual(
    session.items.map(({ id }) => id),
    createSession(bank.questions, "exam", 60, null, () => 0)!.items.map(
      ({ id }) => id,
    ),
  );
  assert.equal(
    createSession([...bank.questions.slice(0, 59), first], "exam", 60, null),
    null,
  );
  assert.equal(createSession([first], "topic", 10, null), null);
  const answered = selectAnswer(session, 1, 999);
  const edited = selectAnswer(answered, 2, 999);
  assert.notEqual(edited.items[0].answer, answered.items[0].answer);
  assert.strictEqual(selectAnswer(edited, 3, 1000), edited);
});

test("scoring distinguishes wrong and blank and records only submitted exam answers as attempts", () => {
  let session = createSession(bank.questions, "exam", 60, null, () => 0.5)!;
  const a = session.items[0];
  const b = session.items[1];
  session = selectAnswer(
    session,
    a.order.indexOf(questions.get(a.id)!.correctIndex),
    1,
  );
  session = moveSession(session, 1);
  session = selectAnswer(
    session,
    b.order.findIndex((index) => index !== questions.get(b.id)!.correctIndex),
    1,
  );
  const completed = finishSession(emptyProgress(), session, questions, 1)!;
  assert.deepEqual(score(completed.result.items), {
    correct: 1,
    incorrect: 1,
    blank: 58,
    total: 60,
    percentage: 2,
  });
  assert.deepEqual(attemptTotals(Object.values(completed.progress.stats)), {
    correct: 1,
    incorrect: 1,
  });
  assert.equal(completed.progress.results.length, 1);
  assert.deepEqual(
    reviewPool(bank.questions, completed.progress, "wrong").map(({ id }) => id),
    [b.id],
  );
});

test("practice navigation cannot skip unanswered items, while exam navigation can jump", () => {
  let session = createSession([first, second], "topic", 2, null, () => 0)!;
  assert.strictEqual(moveSession(session, 1), session);
  assert.strictEqual(moveSession(session, 2), session);
  assert.strictEqual(moveSession(session, 0.5), session);
  assert.equal(finishSession(emptyProgress(), session, questions, 50), null);
  session = moveSession(selectAnswer(session, 0, 50), 1);
  assert.equal(session.position, 1);
  assert.equal(moveSession(session, 0).position, 0);
  assert.equal(
    moveSession(createSession(bank.questions, "exam", 60, null)!, 59).position,
    59,
  );
});

test("wrong-answer review ranks errors first, successful retry clears the queue, and history survives", () => {
  let progress = emptyProgress();
  for (let i = 0; i < 3; i++)
    progress = recordAnswer(progress, first.id, false, "topic");
  progress = recordAnswer(progress, second.id, false, "exam");
  progress = recordAnswer(progress, second.id, true, "random");
  const ordered = reviewPool([second, first], progress, "wrong");
  assert.deepEqual(
    ordered.map(({ id }) => id),
    [first.id, second.id],
  );
  const session = createSession(ordered, "wrong", 2, null, () => 0)!;
  assert.deepEqual(
    session.items.map(({ id }) => id),
    [first.id, second.id],
  );
  progress = recordAnswer(progress, first.id, true, "wrong");
  assert.deepEqual(progress.stats[first.id], {
    correct: 1,
    incorrect: 3,
    streak: 1,
    queued: false,
  });
  assert.deepEqual(
    reviewPool([first, second], progress, "wrong").map(({ id }) => id),
    [second.id],
  );
  progress = { ...progress, bookmarks: [second.id, first.id] };
  for (let i = 0; i < 4; i++)
    progress = recordAnswer(progress, first.id, true, "bookmarks");
  assert.deepEqual(
    reviewPool([first, second], progress, "bookmarks").map(({ id }) => id),
    [second.id, first.id],
  );
  progress = recordAnswer(progress, first.id, false, "wrong");
  assert.equal(progress.stats[first.id].queued, true);
});

test("local persistence restores option mapping, answers, and position, and salvages valid progress", () => {
  const session = createSession([first, second], "topic", 2, null, () => 0)!;
  const active = moveSession(selectAnswer(session, 0, 1), 1);
  const progress = recordAnswer(emptyProgress(), first.id, true, "topic");
  const data = { progress, active };
  assert.deepEqual(readLocal(JSON.stringify(data), questions), {
    data,
    recovered: false,
  });
  const invalidOrder = {
    ...active,
    items: active.items.map((item) => ({ ...item, order: [0, 0, 2, 3] })),
  };
  assert.deepEqual(
    readLocal(JSON.stringify({ progress, active: invalidOrder }), questions),
    { data: { progress, active: null }, recovered: true },
  );
  assert.deepEqual(readLocal(JSON.stringify(data), new Map()), {
    data: { progress, active: null },
    recovered: true,
  });
  assert.deepEqual(readLocal("{bad", questions), {
    data: { progress: emptyProgress(), active: null },
    recovered: true,
  });
});

test("export/import round-trips history and validates versions, counts, results and bookmarks", () => {
  const session = createSession([first], "bookmarks", 1, null, () => 0)!;
  const chosen = selectAnswer(
    session,
    session.items[0].order.indexOf(first.correctIndex),
    1,
  );
  const attempted = recordAnswer(
    { ...emptyProgress(), bookmarks: [first.id] },
    first.id,
    true,
    "bookmarks",
  );
  const { progress } = finishSession(attempted, chosen, questions, 1)!;
  assert.deepEqual(importProgress(exportProgress(progress)), progress);
  for (const bad of [
    { ...progress, version: 2 },
    { ...progress, courseId: "another-course" },
    { ...progress, bookmarks: [first.id, first.id] },
    { ...progress, active: session },
    {
      ...progress,
      stats: { [first.id]: { ...progress.stats[first.id], correct: -1 } },
    },
    { ...progress, results: [{ ...progress.results[0], mode: "exam" }] },
  ])
    assert.throws(() => importProgress(JSON.stringify(bad)));
  assert.throws(() => importProgress(" ".repeat(5_000_001)));
});

test("the audit reconciles every authored ID, reviewed key, and supporting slide", () => {
  assert.deepEqual(
    audit.questions.map(({ id }) => id).sort(),
    bank.questions.map(({ id }) => id).sort(),
  );
  const first = audit.questions.find(({ id }) => id === bank.questions[0].id)!;
  const others = audit.questions.filter(({ id }) => id !== first.id);
  const input = (record: unknown) => ({
    ...audit,
    questions: [record, ...others],
  });
  assert.throws(
    () => publishAuditedBank(bank, { ...audit, questions: others }),
    /Missing quiz audit record/,
  );
  assert.throws(
    () =>
      publishAuditedBank(bank, {
        ...audit,
        questions: [first, first, ...others],
      }),
    /Duplicate quiz audit ID/,
  );
  assert.throws(
    () =>
      publishAuditedBank(
        bank,
        input({
          ...first,
          reviewedAnswerIndex: (bank.questions[0].correctIndex + 1) % 4,
        }),
      ),
    /Inconsistent verified quiz audit/,
  );
  assert.throws(
    () =>
      publishAuditedBank(
        bank,
        input({ ...first, evidence: { ...first.evidence, slides: [1] } }),
      ),
    /Mismatched quiz audit citation/,
  );
  assert.throws(
    () =>
      publishAuditedBank(
        bank,
        input({ ...first, evidence: { ...first.evidence, visualSlides: [1] } }),
      ),
    /Mismatched quiz audit citation/,
  );
  assert.throws(
    () =>
      publishAuditedBank(
        bank,
        input({
          ...first,
          evidence: { ...first.evidence, kind: "supplementary" },
        }),
      ),
    /Missing supporting quiz audit reference/,
  );
});

test("a held question is absent from the published practice, exam, and saved-session pools", () => {
  function unresolved(record: (typeof audit.questions)[number]) {
    const { id, subtopic, evidence } = record;
    return {
      id,
      subtopic,
      status: "requires-review",
      evidence: {
        ...evidence,
        kind: "unresolved",
        note: "A second reading is pending.",
      },
    };
  }
  const held = audit.questions.find(({ id }) => id === first.id)!;
  const unfiltered = createSession([first], "topic", 1, null)!;
  const published = publishAuditedBank(bank, {
    ...audit,
    questions: audit.questions.map((record) =>
      record.id === held.id ? unresolved(record) : record,
    ),
  });
  assert.ok(!published.questions.some(({ id }) => id === held.id));
  for (const mode of ["topic", "random", "exam"] as const) {
    const session = createSession(
      published.questions,
      mode,
      10,
      null,
      () => 0,
    )!;
    assert.ok(!session.items.some(({ id }) => id === held.id));
  }
  const progress = recordAnswer(emptyProgress(), held.id, false, "topic");
  assert.deepEqual(
    reviewPool(
      published.questions,
      { ...progress, bookmarks: [held.id] },
      "wrong",
    ),
    [],
  );
  assert.deepEqual(
    reviewPool(
      published.questions,
      { ...progress, bookmarks: [held.id] },
      "bookmarks",
    ),
    [],
  );
  const restored = readLocal(
    JSON.stringify({ active: unfiltered, progress }),
    new Map(published.questions.map((q) => [q.id, q])),
  );
  assert.equal(restored.data.active, null);
  assert.deepEqual(restored.data.progress, progress);
  assert.throws(
    () =>
      publishAuditedBank(bank, {
        ...audit,
        questions: audit.questions.map((record, index) =>
          index < 59 ? record : unresolved(record),
        ),
      }),
    /requires 60 verified questions/,
  );
});

test("audit fixes retain indices while disambiguating representative teaching cases", () => {
  function lookup(id: string) {
    const question = questions.get(id);
    assert.ok(question);
    return question;
  }
  const cache = lookup("os-intro-cache-working-set");
  assert.match(cache.question, /aynı anda tutabiliyor/u);
  assert.equal(cache.choices[cache.correctIndex], "2");
  const platform = lookup("os-threads-java-start");
  assert.match(platform.question, /platform iş parçacığında/u);
  assert.match(platform.choices[platform.correctIndex], /çağıran akışta/u);
  const exec = lookup("os-threads-fork-thread");
  assert.match(exec.choices[exec.correctIndex], /program imajını değiştirir/u);
  assert.ok(
    bank.referencesByQuestion[exec.id]?.some((url) =>
      url.includes("execve.2.html"),
    ),
  );
  const semaphore = lookup("os-synchronization-semaphore-negative");
  assert.match(semaphore.question, /yalnız sonuç negatifse/u);
  assert.equal(semaphore.choices[semaphore.correctIndex], "−2 ve 2");
});
