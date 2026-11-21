# Operating Systems — Week 02 source review

## Uploaded originals and integrity

1. `2- İşletim sistemi yapıları(1).pptx`: 42 PowerPoint slides; SHA-256 `7bc249f7016df70e3e8caa9592b2f359ed2f8ee35933ee3736181dd104081d79`. The PPTX has no valid PDF source type in the repository schema, so it is reviewed against the two PDFs and documented here instead of inventing a PDF citation.
2. `BM 403 Veri İletişimi (Data Communications) - OS_L2IsletimSistemiYapilari_EA.pdf`: 64 physical PDF pages; SHA-256 `2432e46a4a1bec34b4871fd570c12ca438af1182c8cd848f54f3d44a7613ed5c`. Despite its outer filename, page 1 labels the actual content **ABM-313 İşletim Sistemleri Dersi — Hafta 2: İşletim Sistemi Yapıları**.
3. `ders_2_İşletim Sistemi Servisleri_1.pdf`: 56 physical pages; SHA-256 `71fddf23055adcdf5e2324a4c7bc58d685c53bd098ebf47349591239a6fd2680`. This source is a scanned slide PDF and was reviewed visually rather than relying on its absent text layer.

All original files remain private; redistribution permission was not provided. Two PDF source entries are registered as `private` with exact fingerprints and physical page counts.

## Scope and citation mapping

| Topic ID | ABM-313 physical PDF pages | Scanned Services physical PDF pages | PPTX slides |
| --- | --- | --- | --- |
| os2-system-services | 3–7 | 3–7 | 4–7 |
| os2-user-interfaces | 9–11 | 8–14 | 8–9 |
| os2-system-calls-api | 13–15 | 15–24 | 10–12 |
| os2-system-call-categories | 17–29 | 25–32 | 13–23 |
| os2-system-programs | 31–33 | 33–37 | 24–25 |
| os2-linker-loader-abi | — | 38–46 | — |
| os2-design-policy-mechanism | 35–38 | 47–49 | 26–27 |
| os2-structural-models | 40–46 | 50–56 | 28–33 |
| os2-modular-hybrid-mobile | 47–54 | — | 34–38 |
| os2-debugging-performance | 56–59 | — | 39–41 |
| os2-system-generation-boot | 61–63 | — | 42 |

The material is combined into **eleven coherent topics**, each with a separate Arabic lesson, a separate Turkish lesson, and an exam-focused Turkish cheat sheet (**33 published document forms**), plus **40 newly authored Turkish–English glossary entries**. The 64-page PDF concludes with a kernel-debugging research assignment on page 64, which is recorded as an assignment rather than invented procedural instruction. The scanned 56-page PDF ends at its Layered Approach coverage; later structures/debug/boot are based on the other two sources, not ascribed to it.

## Relevant diagrams and examples reviewed

- The services stack: user/application → UI → system calls → services → hardware
- Command interpreter built-ins vs external programs, CLI/GUI, batch, touch and voice interfaces
- API → system-call interface → kernel flow, file-copy call sequence, POSIX `read()` signature, and register/table/stack parameter passage
- Six system-call groups, Unix/Windows comparison, Arduino vs FreeBSD process-control figures and C `printf()` / `write()` flow
- Compiler/object/linker/executable/loader diagram, dynamic DLLs, Java RTE and binary ABI
- MS-DOS and UNIX kernel diagrams, Layered Approach, Mach/microkernel message-passing and modular system examples
- Historical Mac OS X Mach/BSD/I/O Kit diagram, iOS layers, Linux-based Android and Dalvik runtime
- Windows Task Manager performance screenshots and bootstrap sequence

## Source qualifications and anti-overclaim checks

- The two older decks give historic examples. macOS Aqua and Android Dalvik/WebKit are labeled as **source-era architecture**, not a specification for current releases.
- Several table entries (e.g. `copy()`, `move()`, `shared_memory_create()`, `set_permission()`) are illustrative function labels; do not assert universal kernel syscall symbols.
- API/ABI/runtime distinction is retained; a portable API does not guarantee that an existing binary runs on a different OS.
- `printf()` can buffer output, so it does not guarantee one `write()` syscall per library call.
- Layering, monolithic, microkernel, hybrid and loadable-module designs are contrasted without treating categories as universally disjoint.
- The original lecture wording merges instruction register with program counter at reset; the lesson states the distinction and treats the preset PC/start address as the operative principle.
- Slidedeck descriptions of embedded/mobile EPROM storage and of universal high-level-language slowdowns are qualified as historically context-dependent.
- Source examples, code, diagrams and comparative tables are explained in original prose; slides/images are not republished.

## Validation and publishing contract

The repository's `src/lib/content/schema.ts` remains authoritative. `npm run check` includes formatting, lint, typecheck, tests, validation and Next static build. Changes should reach `main` directly after checks succeed, without a PR; confirm the live hosting deployment independently.
