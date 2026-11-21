# Operating Systems — Week 05: Process Senkronizasyonu — Source Review

## Supplied original and private citation copy

- **Original:** `5- Process Senkronizasyonu.pptx`, 36 slides; SHA-256 `e917e5c8c87e4a1f6b3a7f2fdc9c6a1beb4a78a0c0d96c220a304c16ef6f3ed9`.
- **Private citation derivative:** `os_week_05_process_senkronizasyonu.pdf`, 36 pages; SHA-256 `670bb1092deacbf433fb6fa3230ef9abaf5bde45936453083f242e4dfe593227`; converted locally from the original PowerPoint solely for accurate page citations. Each page corresponds to the same-numbered original slide.
- **Copyright/privacy:** Neither the original PPTX nor the private derivative is committed or redistributed. The registry references a private PDF, because its current schema does not support PPTX source locations.

## Editorial mapping

| Topic ID | Source slides / PDF physical pages | Key examples |
| --- | --- | --- |
| os5-producer-consumer | 2–6 | Cooperating processes; bounded-buffer code and multi-producer/multi-consumer diagrams |
| os5-race-condition | 7–9 | `counter=5` example T0–T5 and lost update (ends at 4 or 6 instead of 5) |
| os5-critical-section | 10–13 | Entry/critical/exit/remainder, mutual exclusion/progress/bounded waiting, preemptive kernel |
| os5-peterson | 14–15 | `flag[2]` and `turn` pseudocode |
| os5-atomic-hardware | 16–20 | Lock, interrupt disable, test-and-set, compare-and-swap, fairness via `waiting[n]` |
| os5-mutex-spinlock | 21 | Acquire/release and busy-wait spinlock |
| os5-semaphores | 22–25 | Binary/counting semaphores, wait/signal, 3-permit example, S1-before-S2 |
| os5-semaphore-blocking-deadlock | 26–30 | Blocking queues, semaphore code, P0/P1 S/Q deadlock, LIFO starvation |
| os5-monitors | 31–33 | Incorrect semaphore ordering, monitor structure, condition variables and signal variants |
| os5-transactional-openmp | 34–36 | Transactional memory, atomic block and OpenMP `#pragma omp critical` |

The chapter has **10 topics** with **30 published documents**, each topic containing an original Arabic lesson, Turkish lesson, and Turkish-only exam cheat sheet. Glossary: **42 new TR/EN entries; 3 already existing entries associated**.

## Accuracy and scope decisions

1. Race example reproduces the exact T0–T5 interleaving and correct net item count. It distinguishes observed counter 4 (or 6 under reversed final writes) from actual 5.
2. Busy-wait loop is not a general thread-safe consumer/producer implementation; `counter++` and `counter--` require proper atomicity and protocol-level synchronization.
3. Source's “barrier” wording describes polling; it is not conflated with a true synchronization barrier.
4. Mutual exclusion, progress, and bounded waiting are defined as their standard critical-section requirements rather than as mandatory strict producer-then-consumer alternation.
5. Peterson pseudocode uses **own flag clearing** and is a classic two-process conceptual algorithm. Memory reordering caveats are clearly labeled external technical qualifications.
6. Locks, test-and-set, compare-and-swap and mutex simplified pseudocode are not presented as working on modern multicore hardware without atomicity/memory ordering. Disabling interrupts on one core is not generalized to all cores.
7. Binary semaphores may coordinate more than two processes; a semaphore is not universally equivalent to an ownership-enforcing mutex.
8. Blocking semaphore implementation's value and queues need atomically protected transitions; its negative value interpretation is specific to the shown design.
9. Deadlock versus starvation is kept distinct; the two-semaphore S/Q wait example and LIFO fairness example are preserved.
10. Monitor condition wait and signal-and-wait/signal-and-continue policies are clearly differentiated. Monitor correctness also depends on condition predicates.
11. Transactional memory does not guarantee all implementation-level deadlocks/aborts/latency disappear; historic simplified source claim is qualified.
12. `#pragma omp critical` is presented as a compiler directive controlling an OpenMP critical region, not an all-threads global application lock.

## Integration and verification

Content-only changes, no unrelated application source or deployment configuration changes. Published topics are ordered 0–9 and depend in source order, starting from the previously published `os4-thread-foundations`. Schema: `src/lib/content/schema.ts`. Validate with `npm run check` on the prepared branch before a direct fast-forward to main. Confirm main update and hosting status separately.
