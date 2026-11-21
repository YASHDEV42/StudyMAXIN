# OS Week 04 — Threads — original source editorial record

## Supplied source and privately rendered citation copy

- Original: `4-Threads(1).pptx`, **41 slides**; SHA-256 `beef3c5014b3a1318954b0bea6dac9dc5e5fb605f8f58fb55bf6ad1f11a826e6`.
- Private local review derivative: `os_week_04_threads.pdf`, 41 physical pages; SHA-256 `9e0e95cc2d214163f200f518ca09c5573e1b327fa1add06529cd569bfdbf0476`, exported from the supplied PPTX for slide-level citation references only. Each PDF page corresponds to the same-numbered original PowerPoint slide. The derivative and original **are not committed, hosted, or redistributed**. Since the current source schema accepts private PDF (not PPTX), this registration explicitly documents the conversion.
- Source title: **Threads (İş Parçacıkları)**; original language Turkish with English technical labels.

## Review by topic

| Topic                         | Slide/page range | Material reviewed                                                                                         |
| ----------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| os4-thread-foundations        | 2–7              | Thread/process distinction; private stack/registers; word processor and web server; 4 benefits            |
| os4-multicore-amdahl          | 8–11             | Core/thread timelines, concurrency vs parallelism, Amdahl's Law, Windows CPU logical processor screenshot |
| os4-multicore-challenges      | 12–16            | Five challenges and data/task parallelism diagrams                                                        |
| os4-thread-models             | 17–21            | Kernel/user threads, many-to-one, one-to-one, many-to-many mapping figures                                |
| os4-thread-libraries          | 22–29            | Async/fork-join, Pthreads summation C code, Windows CreateThread/Wait, Java Runnable/Thread code          |
| os4-implicit-thread-pools     | 30–34            | Implicit threading, thread pool and QueueUserWorkItem, Process Explorer and htop                          |
| os4-openmp-gcd                | 35–36            | OpenMP parallel / parallel for, GCD blocks and dispatch queues                                            |
| os4-fork-signals              | 37–38            | Historical fork/exec slides and signal delivery APIs                                                      |
| os4-thread-cancellation       | 39               | Cancellation modes and Pthreads cancellation table                                                        |
| os4-os-thread-implementations | 40–41            | Windows ETHREAD/KTHREAD/TEB; Linux task_struct/clone flags                                                |

**Publication structure:** 10 coherent topics × (Arabic lesson + Turkish lesson + Turkish exam cheat sheet) = **30 documents**. The glossary adds **43 Turkish-English vocabulary entries** and reuses **1 existing entries**.

## Editorial qualifications recorded in the lessons

1. **Shared vs private:** Thread-local stack, registers, and PC are not automatically shared even when code/data/heap/files are shared. The slide claims that threads share “everything”; this is an overstatement.
2. **Web server:** Listening TCP port need not change for every client. A thread-per-request model is only one design, not a universal requirement.
3. **Historical Solaris ratios:** The 30× create and 5× context switch claims are historical example measurements, not guaranteed universal speedups.
4. **Amdahl:** With S=0.25, N=4 gives 2.285714…, approximately 2.29. Slide says 2.28, acceptable truncation, not exact equality; limit as N→∞ is 4.
5. **Logical CPUs:** Four physical cores / eight logical processors in the Task Manager image does not limit the application's number of threads to eight.
6. **Kernel thread terminology:** Kernel-scheduled threads can execute user-mode code. Java Thread is not universally a purely user-space runtime thread.
7. **Mapping diagrams:** Many-to-one, one-to-one and many-to-many are conceptual; Solaris and historical OS examples should not be presented as guaranteed current behavior.
8. **Pthreads/Windows/Java examples:** `pthread_create`/`pthread_join`, `CreateThread`/`WaitForSingleObject`, and Java `start`/`join` are described by role. Shared globals need synchronization with concurrent writes.
9. **Fork and exec:** In current POSIX multithreaded `fork`, only calling thread exists in child. `exec` replaces the process image, does not duplicate threads; original slide wording contradicts this.
10. **Signals/cancellation:** `kill` sends signals (not necessarily termination); `pthread_cancel` requests cancellation and need not imply immediate thread completion.
11. **GCD/OpenMP:** Old GCD priority constants are source-era names; parallel loops require suitable data independence.
12. **Platform internals:** Linux clone flags and Windows ETHREAD/KTHREAD/TEB are represented at the educational level of the lecture.

## Review and release boundary

This addition changes only content, the Turkish-English global glossary, the private source registry, the course's Week 04 chapter, and this ledger. It does **not** publish the original slide deck. Existing course/topic IDs, application code, other subjects, deployment settings and unrelated work remain untouched. Format and validate the branch before a single direct fast-forward to `main`, without PR. GitHub CI success and Vercel deployment success are distinct verification steps.
