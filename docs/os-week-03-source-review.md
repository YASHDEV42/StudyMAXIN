# Operating Systems — Week 03 source review

## Originals and source fingerprints

- `3- Process Yönetimi(1).pptx`: **56 slides**, SHA-256 `fa0f8a33c968a7e5159a1db7a855650b66011ebc5b6169c0bef7c20d3f40ce73`. This PowerPoint was inspected with its rendered diagrams and code imagery; no PDF source registry variant supports PPTX in the authoritative schema. The PPTX was **not** redistributed or uploaded to public assets.
- `Module 4_ Processes - ders3.pdf`: **68 physical pages**, SHA-256 `9a2733a5e2faae407fa2a81fa0e8586c857d763ef2d4517bc67912f2756c1a79`. The document identifies itself as `Bölüm 3: İşlemler`, from the 8th edition of _Operating System Concepts with Java_. Registered with `location.kind = private`, not hosted.

All materials remain private because no redistribution permission was supplied. The PDFs' physical page numbers are used for authoritative citation ranges; PPTX slide numbers below are separate.

## Complete teaching mapping

| Topic                     | PDF pages | PPTX slides  | Editorial treatment                                                                  |
| ------------------------- | --------- | ------------ | ------------------------------------------------------------------------------------ |
| os3-process-memory        | 4–8       | 2–6, 12–13   | Program/process distinction, CPU timesharing, text/data/heap/stack, memory isolation |
| os3-process-states        | 9–16      | 10–11, 18–22 | Two-state versus five-state transitions                                              |
| os3-pcb-context           | 17–19     | 7–9, 23–35   | PCB fields, process trace/dispatcher, save/restore and switch overhead               |
| os3-process-scheduling    | 20–25     | 36–43        | Ready/device/job queues, long/short/medium scheduling, CPU/I/O bound                 |
| os3-creation-termination  | 27–34     | 14–17        | Parent–child, PID, fork/exec/wait/exit, Win32 code and cascading termination         |
| os3-ipc-models-producer   | 35–42     | 44–45        | Independent/cooperating, shared memory, producer-consumer, bounded-buffer Java       |
| os3-ipc-messaging         | 43–49     | 46           | Direct/indirect communication, mailboxes, blocking, buffering                        |
| os3-ipc-platforms         | 50–53     | —            | System V API, Mach and Windows XP LPC                                                |
| os3-sockets-client-server | 54–59     | 47–50        | Sockets, TCP/UDP, Java ServerSocket and Socket date-server example                   |
| os3-rpc-rmi               | 60–68     | —            | RPC, stub, Java RMI interface/server/client, historical skeleton and questions       |
| os3-shortest-job-first    | —         | 51–55        | **PPTX-only** non-preemptive SJF worked Gantt and metrics                            |

Each of these **11 topics** has three independent teaching forms: **Arabic lesson, Turkish lesson, Turkish cheat sheet** (33 documents). The teaching material explains the original diagrams and code narratively; source slides are not republished. The global glossary adds week-specific Turkish–English terms and natural example sentences, reusing globally existing terms when identified.

## Important accuracy decisions

1. **SJF source gap:** The detailed SJF P1..P5 exercise is present in PowerPoint slides **51–55**, not in the 68-page PDF. The authoritative source registry supports only PDFs, so the SJF topic has **no invented PDF citation**. Its document metadata uses `illustrative` provenance with no PDF sources, while the bodies and this ledger explicitly attribute the actual PPTX exercise. This is a schema limitation, not an absence of a supplied original.
2. **Context-switch arithmetic error:** PPTX slide 33 says 50 registers each taking 20 ns equals 1 ms. **50 × 20 ns = 1,000 ns = 1 µs**, and one simple save-plus-restore would be around 2 µs before additional overhead. The slide's millisecond arithmetic is incorrect.
3. **System V versus POSIX:** PDF page 50 labels `shmget/shmat/shmdt` as “POSIX shared memory”; these specific calls are **System V IPC**, not POSIX `shm_open/mmap`. The pedagogical note preserves the source's demonstrated code but distinguishes the APIs.
4. **Historical examples:** Mach message entrypoints, Windows XP LPC, older Java RMI skeleton diagrams and Solaris process trees are specifically identified as source-era presentations, not universal modern APIs.
5. **Synchronization:** Busy-wait bounded buffer pseudocode and plain shared counters are instructional, not claimed race-free for arbitrary multi-producer/multi-consumer concurrency.
6. **System calls:** `fork` creates a new child, `exec` replaces an existing process image, `wait` retrieves child status; `exec` alone is not treated as new process creation.
7. **Modes and concurrency:** The single-core “one at a time” model is qualified for multicore hardware. A system call or interrupt is not necessarily a switch to another process. Ready and Waiting states are not conflated.
8. **Socket uniqueness:** A TCP server can accept many connections on its listening port; a unique port for each process or connection is not a universal requirement.
9. **SJF worked example:** Source table: P1(5,0), P2(4,0), P3(7,0), P4(3,0), P5(2,4). Non-preemptive schedule P4 0–3, P2 3–7, P5 7–9, P1 9–14, P3 14–21. Mean waiting 5.8; mean turnaround 10.

## Publication and validation

Only `content/` and this source ledger changed. Private originals remain private. Run `npm run check` for formatting, lint, types, tests, content validation and production static export before declaring readiness. Separate Vercel status from a successful main-branch update. Do not change existing course IDs, schema, deployment workflow or unrelated application code.

## Next-unit boundary

The next week should be reviewed separately; notably, **thread scheduling and synchronization** may be taught in later materials even though this week briefly introduces cooperative/concurrent execution. Do not claim a full threads module was processed from these originals.

The final content checks run against the formatted main-branch tree; deployment verification is a separate hosting check.
