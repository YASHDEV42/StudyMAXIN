# Operating Systems — Week 01 source review

This entry records the source and editorial scope of the Week 01 material in `content/courses/operating-systems/`.

## Originals

- `2.01.pdf`: 83 physical pages; SHA-256 `90b3a720e19e5d41cbdf107456a61ba47054c27b370e6506dbade169fa7ea932`.
- `Hafta 1.pdf - Hafta_1.pdf`: 80 physical pages; SHA-256 `7f973a47a034965cba53bbd584ed0772f6e07975f36fcf884c1450bab6a40cf9`.
- `1-işletim sistemleri-giriş(3).pptx`: 63 slides. Its topics were compared with the PDF introduction material; the content schema only has a PDF source registry variant, so this PPTX is not attributed as a PDF citation.

PDFs and slides were supplied directly in the conversation. Originals are not placed under `public/`. The private-source entries use schema-compatible sanitized basenames and note the original display filenames.

## Reviewed topic mapping

| Topic                            | 2.01.pdf physical pages | Hafta 1.pdf physical pages |
| -------------------------------- | ----------------------- | -------------------------- |
| os-introduction                  | 4–10                    | 4–8                        |
| os-organization-interrupts       | 12–20                   | 10–14                      |
| os-storage-dma                   | 21–28, 45–47            | 15–21, 48–49               |
| os-architectures                 | 56–63                   | 23–32                      |
| os-execution-resource-management | 29–44, 49               | 34–50, 52–53               |
| os-virtualization-distribution   | 50–55                   | 67–72                      |
| os-computing-environments        | 64–79                   | 65–80                      |
| os-kernel-data-structures        | 45–48, 80–82            | 55–63                      |

Each topic has an Arabic lesson, Turkish lesson and a separate Turkish cheat sheet. The introductory slide deck repeats much of the PDF coverage. The documentation is an integrated topic-based teaching treatment, not a transcript of every slide. Diagrams (OS layers, I/O interrupt cycles, storage hierarchy, UMA/NUMA, virtual machines) are explained narratively rather than copied as image assets.

## Editorial qualifications

- Some source decks are based on older textbook editions. Historic examples and forecasts are not asserted to be present-day product specifications.
- The interrupt vector address example applies to a specific historic architecture, not all CPUs.
- DMA reduces CPU data-movement involvement; it does not imply all buses are eliminated or that CPU is never used to set up transfers.
- "Free" in free software is freedom, not necessarily price; licensing claims are limited to broadly established freedoms.
- Real-time correctness includes a deadline, not merely fast average throughput.
- Cache coherence and distributed consistency are introduced at overview depth, reserving full treatment for later lessons.

## Verification

The original PDF page counts and SHA-256 digests were independently checked against the uploaded bytes. The content schema's `private` PDF references intentionally do not distribute copyrighted originals. The build and rendering checks are performed in GitHub CI; production hosting status must be checked separately from repository publication.
