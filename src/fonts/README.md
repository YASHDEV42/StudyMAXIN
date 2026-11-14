# Shared display fonts

Self-hosted subsets shared by the landing hero and documentation headings (`index.ts`). Nothing is fetched at build time.

| File                                          | Source                                                           | Subset                                                                             |
| --------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `newsreader.woff2`, `newsreader-italic.woff2` | Newsreader (Production Type), SIL OFL 1.1 — `OFL-Newsreader.txt` | Latin + Turkish; weight pinned to 400, optical-size axis kept (`opsz` 6–72)        |
| `amiri-regular.woff2`, `amiri-bold.woff2`     | Amiri 1.002 (The Amiri Project), SIL OFL 1.1 — `OFL-Amiri.txt`   | Standard Arabic letters, marks, digits and punctuation; Latin letters are excluded |

Produced from the upstream TTFs in `google/fonts` with `fonttools` (`varLib.instancer wght=400`, then `pyftsubset --flavor=woff2 --no-hinting`).
Latin letters are deliberately absent from the Amiri subsets so that Latin text inside Arabic falls through to Newsreader.
