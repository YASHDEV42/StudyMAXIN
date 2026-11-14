# Source inventory and educational coverage

Updated 2026-11-14. Machine-readable review ledger: [source-coverage.json](source-coverage.json). This records operational review evidence; content identity and metadata remain governed by `src/lib/content/schema.ts`.

## Exact supplied inventory

One course: **Bilgi Sistemleri ve Güvenliği — Teori Ders Notları**, third-year undergraduate, fourteen weeks. All thirteen files open with `pdfinfo`; `pdftotext -layout` succeeds. Extractability is not a claim of factual or visual review. File digests, byte sizes and header-derived chapter discovery are in the ledger.

| File                  | Physical pages | Weeks found in extracted running headers |
| --------------------- | -------------: | ---------------------------------------- |
| `teori-1-1-42.pdf`    |             42 | 1                                        |
| `teori-1-43-89.pdf`   |             47 | 1, 2                                     |
| `teori-1-90-142.pdf`  |             53 | 2, 3                                     |
| `teori-1-143-178.pdf` |             36 | 3, 4                                     |
| `teori-1-179-221.pdf` |             43 | 4, 5                                     |
| `teori-1-222-268.pdf` |             47 | 5, 6                                     |
| `teori-1-269-307.pdf` |             39 | 6, 7                                     |
| `teori-1-307-359.pdf` |             53 | 7, 8                                     |
| `teori-1-360-397.pdf` |             38 | 8, 9                                     |
| `teori-1-398-447.pdf` |             50 | 9, 10                                    |
| `teori-1-448-489.pdf` |             42 | 10, 11                                   |
| `teori-1-490-529.pdf` |             40 | 11, 12                                   |
| `teori-1-530-632.pdf` |            103 | 12, 13, 14                               |

**Totals:** 13 files; 633 page instances, 632 page positions. `teori-1-269-307.pdf` physical page 39 and `teori-1-307-359.pdf` physical page 1 contain identical extracted text at position 307. Full bitmap identity is not asserted. Filenames use split positions, not printed textbook pagination. First-file physical page 12 is printed page 1; cite each split file’s physical pages.

The first file includes cover, imprint, guide and contents (physical 1–11). The contents identify fourteen chapters and 171 source subsections. The ledger preserves the subsection discovery list for later grouping into coherent topics; these are not all reviewed topics or production routes.

## Completed source units

| Stable topic ID                   | Actual source scope                                                          | First PDF physical pages                 | Documents                            |
| --------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------ |
| `log4shell-trust-boundaries`      | 1.1 opening case through information-security definition                     | 13–16 (printed 2–5)                      | AR lesson, TR lesson, TR cheat sheet |
| `security-mindset`                | 1.1.1–1.1.2 and closing ethical warning                                      | 16–18 (printed 5–7)                      | AR lesson, TR lesson, TR cheat sheet |
| `security-history`                | 1.2–1.2.3, before 1.3                                                        | 18–21 (printed 7–10)                     | AR lesson, TR lesson, TR cheat sheet |
| `cia-security-goals`              | 1.3 opening, 1.3.1–1.3.3 and tradeoff warning                                | 21–25 (printed 10–14)                    | AR lesson, TR lesson, TR cheat sheet |
| `identity-access-accountability`  | 1.3.4 through AAA/Parker paragraph                                           | 25–26 (printed 14–15)                    | AR lesson, TR lesson, TR cheat sheet |
| `security-core-vocabulary`        | 1.4 through terminology example/warning                                      | 26–27 (printed 15–16)                    | AR lesson, TR lesson, TR cheat sheet |
| `threat-modeling-stride`          | 1.5 opening + 1.5.1                                                          | 27–29 (printed 16–18)                    | AR lesson, TR lesson, TR cheat sheet |
| `threat-prioritization-methods`   | 1.5.2–1.5.3                                                                  | 30–31 (printed 19–20)                    | AR lesson, TR lesson, TR cheat sheet |
| `attack-trees-portal-model`       | 1.5.4–1.5.6, before 1.6                                                      | 32–34 (printed 21–23)                    | AR lesson, TR lesson, TR cheat sheet |
| `risk-management`                 | 1.6, excluding adjacent 1.5 and 1.7 material                                 | 34–38 (printed 23–27)                    | AR lesson, TR lesson, TR cheat sheet |
| `security-design-principles`      | 1.7 and 1.7.1, through the three contemporary complements                    | 38–40 (printed 27–29)                    | AR lesson, TR lesson, TR cheat sheet |
| `threat-actors`                   | 1.8 and its subsections, before 1.9                                          | 41–42 (printed 30–31)                    | AR lesson, TR lesson, TR cheat sheet |
| `cyber-kill-chain`                | 1.9, including seven-stage diagram, before 1.10                              | `teori-1-43-89.pdf` 1–2 (printed 32–33)  | AR lesson, TR lesson, TR cheat sheet |
| `security-economics-human-factor` | 1.10.1–1.10.3: attack economics, social engineering, culture                 | `teori-1-43-89.pdf` 2–5 (printed 33–36)  | AR lesson, TR lesson, TR cheat sheet |
| `security-governance-ethics-law`  | 1.11, 1.11.1–1.11.2 through the warning box                                  | `teori-1-43-89.pdf` 6–7 (printed 37–38)  | AR lesson, TR lesson, TR cheat sheet |
| `course-roadmap`                  | 1.12, all seven week groups before 1.13                                      | `teori-1-43-89.pdf` 7 (printed 38)       | AR lesson, TR lesson, TR cheat sheet |
| `chapter-one-worked-exercises`    | 1.13, all 15 worked exercises, eight self-tests and answer key, week summary | `teori-1-43-89.pdf` 7–11 (printed 38–42) | AR lesson, TR lesson, TR cheat sheet |

**300 published documents, one hundred topics, 356 Turkish–English glossary entries.** Chapters 1–8 have reviewed first-pass coverage: Chapter 1 sections **1.1–1.13**, Chapter 2 **2.1–2.11**, Chapter 3 **3.1–3.17**, Chapter 4 **4.1–4.11**, Chapter 5 **5.1–5.12**, Chapter 6 **6.1–6.11**, Chapter 7 **7.1–7.13**, and Chapter 8 **8.1–8.11**. This does not constitute independent educator approval. Exact Chapter 7 split-PDF ranges and section-to-topic mapping follow and are preserved in the JSON ledger.

The current catalog totals above supersede earlier incremental session counts. Existing topic IDs and document bodies are preserved except for correcting section 2.1 and 2.2 physical-page citations after checking the PDFs. Existing glossary entries are reused where appropriate.

### Chapter 8 review evidence (sections 8.1–8.11)

Completed Chapter 8 on a reviewed first-pass basis across `teori-1-307-359.pdf` physical pages **15–53** and `teori-1-360-397.pdf` physical pages **1–11**. The chapter crosses the split: section 8.8 begins on the first PDF page 52 and concludes on second-PDF page 1, where 8.9 also begins. Chapter 8 ends after its summary on second-PDF page 11. The Chapter 9 divider is page 12, objectives page 13, and section 9.1 begins page 14 (printed page 361).

| Topic ID                    | Section scope                                                                                          | PDF physical pages                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `os-security-boundaries`    | 8.1: user/kernel boundary, syscalls, rings, virtual memory, Meltdown/Spectre and exercises             | `teori-1-307-359.pdf` 15–19                          |
| `memory-safety-foundations` | 8.2: C/C++ memory management, memory-safe languages, address-space layout and parser exercise          | same PDF 20–22                                       |
| `stack-buffer-overflow`     | 8.3: stack frames, call/return, overflow mechanism, local gdb/code examples and defenses               | same PDF 23–29                                       |
| `memory-bug-families`       | 8.4: format strings, integer overflow, use-after-free, heap errors and comparison                      | same PDF 30–33                                       |
| `exploit-mitigations`       | 8.5: canaries, DEP/NX, ROP, ASLR/PIE, CFI, RELRO, compiler flags, sanitizers and fuzzing               | same PDF 34–40                                       |
| `privilege-escalation`      | 8.6: Linux permissions/setuid/capabilities, Windows tokens/UAC, misconfiguration, Dirty COW and TOCTOU | same PDF 41–46                                       |
| `sandboxing-isolation`      | 8.7: seccomp, namespaces/cgroups, SELinux/AppArmor and container/VM isolation                          | same PDF 47–51                                       |
| `hardware-root-of-trust`    | 8.8: TPM/PCR, measured boot, Secure Boot, TEEs and exercise                                            | `teori-1-307-359.pdf` 52–53; `teori-1-360-397.pdf` 1 |
| `system-hardening`          | 8.9: least services, patching/WannaCry, CIS baseline, audit/logging and allowlisting                   | `teori-1-360-397.pdf` 1–3                            |
| `trusting-trust`            | 8.10: Thompson thought experiment, compiler code, DDC, XZ and supply-chain implications                | same PDF 4–6                                         |
| `os-security-synthesis`     | 8.11: all seven solved integrative exercises, eight self-test questions/answers and summary            | same PDF 7–11                                        |

Every topic has three published documents: a distinct Arabic lesson, an independent Turkish lesson and a Turkish-only exam sheet (**11 topics / 33 documents**). Added **36 glossary entries** and extended associations for trust boundary, least privilege, memory isolation, defense in depth, TPM and side-channel concepts. Current catalog: **100 topics / 300 documents / 356 glossary entries**.

Extracted text and relevant rendered pages were reviewed together. Visual review included the privilege-ring and virtual-address-space diagrams; memory-safety and dangerous-function comparisons; stack-frame/overwrite figures, source code and debugger output; integer-overflow and use-after-free examples, Heartbleed memory disclosure and family comparison; mitigation flow, canary, ASLR, CFI/RELRO figures and tables, compiler flags/checksec and sanitizer output; Linux permission/capability and Windows token comparisons, Dirty COW and TOCTOU code; seccomp flow/code, namespace and cgroup examples, MAC comparison and layered container table; PCR extension code, boot-chain diagram and TPM/Secure Boot/TEE table; hardening commands and audit records; Thompson’s portrait, all three code excerpts and DDC discussion; all seven worked solutions, all eight review questions and answer key, and the weekly summary. No PDF, source image, or private source bytes were copied to public assets.

Qualifications recorded in the lessons and JSON ledger: source memory-error statistics are tied to specific product/time analyses, not universal rates; signed integer overflow is not guaranteed to wrap in C, and `strncpy` may not NUL-terminate; ASLR entropy/default compiler mitigations vary; canaries and CFI do not guarantee all control-flow safety; seccomp policy behavior depends on configured filter actions; containers share a kernel and the relative VM boundary depends on configuration; PCR evidence needs an event log and trusted reference policy and is not proof that a platform is uncompromised. XZ CVE-2024-3094 is described as malicious release/build-process code injection, not as the same mechanism as Thompson’s self-propagating compiler thought experiment. Supplementary technical verification sources are recorded in `docs/source-coverage.json`. Independent educator/editorial review remains pending; the separate lab workbook was not supplied.

### Chapter 7 review evidence (sections 7.1–7.13)

| Topic ID                                  | Section scope                                                                               | PDF physical pages                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `network-foundations-and-protocol-layers` | 7.1: TCP/IP history, layers, encapsulation, addressing, IPv4/TCP headers, TCP/UDP, NAT/IPv6 | `teori-1-269-307.pdf` 13–18                            |
| `tcp-handshake-syn-flood`                 | 7.2: handshake, sequence numbers, SYN flood/cookies, spoofing, RST and session hijacking    | `teori-1-269-307.pdf` 18–23                            |
| `layer2-lan-attacks`                      | 7.3: ARP, MITM, MAC flooding, rogue DHCP/starvation and VLAN hopping                        | `teori-1-269-307.pdf` 23–26                            |
| `dns-security-and-encrypted-dns`          | 7.4: resolution chain, Kaminsky cache poisoning, DNSSEC, DoH and DoT                        | `teori-1-269-307.pdf` 26–29                            |
| `packet-capture-wireshark`                | 7.5: promiscuous/monitor modes, Wireshark, capture/display filters, passive/active sniffing | `teori-1-269-307.pdf` 29–31                            |
| `network-reconnaissance-nmap`             | 7.6: host, TCP/UDP, service/version and OS discovery; scan limits and authorization         | `teori-1-269-307.pdf` 31–33                            |
| `firewalls-segmentation`                  | 7.7: firewall generations/policy, WAF, DMZ, VLAN, microsegmentation and SASE                | `teori-1-269-307.pdf` 33–36                            |
| `intrusion-detection-prevention`          | 7.8: IDS/IPS, signature/anomaly detection, rule fields/threshold and WannaCry example       | `teori-1-269-307.pdf` 36–38                            |
| `vpn-ipsec-wireguard`                     | 7.9: VPN, IPsec modes/AH/ESP and WireGuard/Noise; section crosses split                     | `teori-1-269-307.pdf` 38–39; `teori-1-307-359.pdf` 1–2 |
| `wireless-security-wpa3-krack`            | 7.10: WEP, WPA2 four-way handshake, KRACK, WPA3 SAE/OWE                                     | `teori-1-307-359.pdf` 3–5                              |
| `ddos-defense`                            | 7.11: Mirai, DDoS classes, reflection/amplification and layered defense                     | `teori-1-307-359.pdf` 5–7                              |
| `network-security-misconceptions`         | 7.12: VPN/HTTPS, DNS, firewall/segmentation, switch and NAT misconceptions                  | `teori-1-307-359.pdf` 7–8                              |
| `chapter-seven-worked-exercises`          | 7.13: all ten solved exercises, eight review questions/answers and weekly summary           | `teori-1-307-359.pdf` 8–12                             |

Extracted text and rendered source pages were reviewed. Visual review included the TCP/IP layer diagram and IPv4/TCP header bit layouts; SYN flood and ARP MITM flows; DNS resolver and DNSSEC trust-chain diagrams; Wireshark screenshot; firewall comparison table and DMZ topology; IDS signature/anomaly table and Snort/Suricata rule; VPN tunnel and WireGuard handshake/crypto table; WPA2 four-way handshake and KRACK discussion; DDoS category and amplification tables; all ten solved exercises and the eight-question answer key/week summary. No source images or PDF bytes were copied into public content.

Qualifications: IP/TCP headers and checksums do not authenticate the source; NAT is not a firewall; SYN-cookie behavior and TCP-option preservation depend on implementation; scan silence does not prove a port is closed and scanning requires authorization. ARP MITM requires local-network access and forwarding to remain transparent; TLS protects application content, not availability or traffic metadata. DNSSEC authenticates signed DNS data but does not provide query confidentiality; DoH/DoT protect the client-to-resolver transport but do not replace DNSSEC validation. IDS signatures and thresholds can miss new/slow behavior; anomaly models can create false positives; IPS can block legitimate traffic. WireGuard/IPsec suitability depends on deployment and configuration, rather than an absolute ranking. KRACK concerns key reinstallation and nonce/counter reset in affected implementations; it does not mean the WPA2 cipher itself was broken. DDoS amplification factors are approximate and service/configuration dependent. Chapter 7 is reviewed first-pass coverage; independent educator review remains pending.

### Chapter 2 review evidence (sections 2.1–2.11)

The Chapter 2 pages were checked at their printed section boundaries. Rendered figures, tables and code were inspected alongside extracted text: the scytale/Alberti/Enigma historical figures and table; ChaCha20 quarter-round and Feistel diagram; AES state, S-box, ShiftRows/MixColumns, GF(2⁸) example, key schedule and comparison table; ECB penguin, CBC/CTR/GCM diagrams and code; hash construction diagrams, birthday-bound derivation, length-extension example and SHA table; HMAC/EtM diagrams; password-hash comparison and Argon2id/bcrypt examples; LavaRand image and CSPRNG code; quantum threat comparison; all twelve worked examples, nine self-test questions, answer key and week summary. No source images or PDF pages were copied into public content.

- Section 2.1 is `teori-1-43-89.pdf` physical 13–19 (printed 44–50); 2.2 is physical 20–22 (printed 51–53). The TOC on physical page 12 was used only for orientation.
- Sections 2.3–2.6 are physical 23–26, 27–33, 33–39 and 40–45 respectively. Boundaries sharing physical pages were checked at the printed headings.
- Section 2.7 crosses the split: 2.7.1 is `teori-1-43-89.pdf` physical 46–47; the 2.7.2 conclusion is `teori-1-90-142.pdf` physical 1. Separate topic records preserve exact source citations.
- Sections 2.8–2.10 are `teori-1-90-142.pdf` physical 1–3, 4–5 and 6. Section 2.11 begins later on physical page 6 and includes all worked examples/self-test/summary through page 11. Physical page 12 is the Chapter 3 divider; section 3.1 begins on page 13 (printed 91), outside the completed scope.
- Explanatory algebra steps, terminology mapping and implementation cautions are labeled in the lessons. The source’s nonce birthday example and Argon2id parameter values are qualified as context-dependent teaching examples, not universal guarantees or settings. Independent educator review remains pending.

### Review evidence and source qualifications

- **1.1:** all three code examples were read visually because extracted slashes/comments were corrupted. The logger call is retained; the simplified JNDI call path and LDAP reference fields are explained, the six-step mechanism preserved with runtime conditions, and the sample request shown as data rather than a claimed executed exploit. The historical patch table and emergency mitigations remain identifiable. Apache release notes correct the PDF’s 2.15.0 release date/protocol simplification; OpenJDK’s exact 8u191 tag verifies the codebase-trust default. The legacy mitigations are not presented as a current patch runbook. Source-only version ranges and perfect-protection claims are qualified.
- **1.1.1–1.1.2:** positive/negative requirements, adaptive adversary, defense asymmetry, all three mindset habits, the parking-lot scenarios and ethical warning are covered. Fail-closed is distinguished from general fail-safe behavior, and passing a limited test is not equated with universal security proof.
- **1.2:** Multics/Unix, evaluation history, Morris reinfection mechanism and approximate scale, CERT/CSIRT origins, all named modern cases and the source’s 2025–2026 outlook are retained. Morris’s portrait and NSA photograph are contextualized. The enlarged Stuxnet diagram’s SCADA/PLC/physical-layer relationship is explained; the WannaCry map is interpreted qualitatively, without invented country/device counts. Intent and possible USB entry retain uncertainty. MS17-010 is identified as a bulletin covering multiple flaws; ML-KEM and ML-DSA have distinct purposes. Select checks use FBI, CMU SEI, Microsoft and NIST primary pages, linked as supplementary author verification rather than fabricated PDF citations.
- **1.3–1.4 (previous unit):** CIA triangle and mechanism table, photograph’s teaching purpose, and definition/example/warning boxes are accounted for in existing lessons. Prior qualifications about trusted hash references, signatures, HMAC, risk/IOC/zero-day limits and uptime arithmetic remain intact.
- **1.5:** the four-question cycle, full STRIDE matrices including R/log, all DREAD score rows and seven PASTA stages, both attack diagrams, costs and the complete portal risk register are covered. Two times damage ties A/B at 42; three times yields A=51, B=47. Email-tree AND gates are explicit example assumptions. Controls in a model are not claimed perfect. Diagrams are reconstructed as teaching text/trees/tables, with no source images redistributed.

Arabic and Turkish essential-concept coverage and the exam sheets were compared against these source checklists. Added explanations and corrections are labeled in the documents. Independent subject-matter/editorial review is still pending; no full-book factual audit has been performed. Supplementary reference URLs and review findings are preserved in the JSON ledger.

| `cryptography-history` | 2.1, before 2.2 | `teori-1-43-89.pdf` 13–19 (printed 44–50) | AR lesson, TR lesson, TR cheat sheet |
| `modern-cryptography-rules` | 2.2 Kerckhoffs, attack models, OTP and computational security | `teori-1-43-89.pdf` 20–22 (printed 51–53) | AR lesson, TR lesson, TR cheat sheet |
| `symmetric-encryption-foundations` | 2.3 block/stream ciphers, ChaCha20, Feistel | `teori-1-43-89.pdf` 23–26 (printed 54–57) | AR lesson, TR lesson, TR cheat sheet |
| `aes-encryption` | 2.4 AES state, rounds, GF(2⁸), key schedule | `teori-1-43-89.pdf` 27–33 (printed 58–64) | AR lesson, TR lesson, TR cheat sheet |
| `block-cipher-modes` | 2.5 ECB, CBC, CTR, GCM/AEAD | `teori-1-43-89.pdf` 33–39 (printed 64–70) | AR lesson, TR lesson, TR cheat sheet |
| `cryptographic-hash-functions` | 2.6 hash properties, birthday bound, SHA families | `teori-1-43-89.pdf` 40–45 (printed 71–76) | AR lesson, TR lesson, TR cheat sheet |
| `message-authentication` | 2.7.1 MAC and HMAC | `teori-1-43-89.pdf` 46–47 (printed 77–78) | AR lesson, TR lesson, TR cheat sheet |
| `encrypt-then-mac` | 2.7.2 continuation and conclusion across split | `teori-1-90-142.pdf` 1 (printed 79) | AR lesson, TR lesson, TR cheat sheet |
| `password-storage` | 2.8 password hashing, salt, PBKDF2/bcrypt/scrypt/Argon2id | `teori-1-90-142.pdf` 1–3 (printed 79–81) | AR lesson, TR lesson, TR cheat sheet |
| `randomness-foundations` | 2.9 entropy and CSPRNG | `teori-1-90-142.pdf` 4–5 (printed 82–83) | AR lesson, TR lesson, TR cheat sheet |
| `quantum-symmetric-impact` | 2.10 Grover/Shor comparison | `teori-1-90-142.pdf` 6 (printed 84) | AR lesson, TR lesson, TR cheat sheet |
| `chapter-two-worked-exercises` | 2.11, twelve worked examples, nine self-tests/answer key and summary | `teori-1-90-142.pdf` 6–11 (printed 84–89) | AR lesson, TR lesson, TR cheat sheet |

## Source handling

No redistribution license was found in the inspected cover/imprint/guide. The entire book has not been exhaustively searched for rights statements. Originals remain private under ignored `materials/`; no PDF or extracted textbook dump is tracked or copied into `public/`. The source registry uses the additive `private` location variant with exact SHA-256 and physical counts. Present local originals are checked; public builds do not require them.

The browser-local citation picker verifies the selected file’s SHA-256 before producing a blob link with the physical `#page=`. Selected bytes stay on the device. No original is downloadable from this site. Actual page-opening acceptance depends on the browser PDF viewer; the Chromium journey is tested locally when the original exists. Permission must be established before any future public hosting of these PDFs.

## Remaining work and exact next unit

Chapters 1–8 have reviewed first-pass Arabic and Turkish lessons plus separate Turkish cheat sheets for all listed sections. Chapter 7 spans `teori-1-269-307.pdf` physical pages 13–39 and `teori-1-307-359.pdf` physical pages 1–12; physical page 13 contains both the objectives and the opening of section 7.1, while subsection 7.1.1 begins on page 14; the split overlaps at filename position 307. Chapter 7 ends on the second file physical page 12. Chapter 8 spans the remainder of the first PDF and physical pages 1–11 of the second; Chapter 9 starts at the divider on `teori-1-360-397.pdf` page 12, objectives page 13, and section 9.1 begins on physical page 14 (printed 361). The separate Laboratory Workbook was not supplied.

## Rechecking inventory locally

```sh
pdfinfo materials/teori-1-1-42.pdf
sha256sum materials/*.pdf
pdftotext -f 21 -l 27 -layout materials/teori-1-1-42.pdf /tmp/studylike-unit.txt
pdftoppm -f 21 -l 27 -scale-to 1200 -png materials/teori-1-1-42.pdf /tmp/studylike-page
npm run content:check
```

Keep extraction artifacts outside tracked content. Inspect rendered pages as well as text. The baseline `pdfinfo` counts are manually recorded facts, not PDF parsing performed by the JavaScript validator.

## Chapter 3 review evidence (sections 3.1–3.17)

Chapter 3 was reviewed across `teori-1-90-142.pdf` physical pages 13–53 (printed pp.91–131), continuing in `teori-1-143-178.pdf` physical pages 1–11 (printed pp.131–142). The exact section-to-topic, PDF page and review records are in `source-coverage.json`.

The first source covers 3.1–3.8 and 3.9–3.14. Topic IDs: `public-key-foundations`, `diffie-hellman-key-exchange`, `rsa-cryptosystem`, `elliptic-curve-cryptography`, `cryptographic-randomness`, `digital-signatures`, `pgp-and-web-of-trust`, `pki-certificates`, `tls-13`, `heartbleed-memory-disclosure`, `side-channel-attacks`, `key-management-lifecycle`, and `quantum-threat-and-pqc`. The second source covers the continuation of 3.14 through 3.14.9 and sections 3.15–3.17: `pqc-algorithms-migration`, `public-key-cryptography-practices`, `chapter-three-worked-exercises`, and `chapter-three-review`. All have Arabic and Turkish lessons and Turkish exam sheets.

Rendered pages and extracted source were checked together. Reviewed material includes the PKI trust-chain diagram, X.509 fields/extensions and chain-validation pseudocode; TLS handshake diagram, `openssl s_client` transcript, HKDF and AEAD nonce process, 0-RTT and mTLS; Heartbleed byte record and vulnerable/fixed code; side-channel examples; HSM/root ceremony photo and caption; quantum hardware illustration, Shor period relations, LWE explanation, PQC size comparison table, hybrid key-derivation code and transition timeline; the section 3.15 pitfalls table; all fifteen solved exercises and all ten self-test questions/answers. Section boundaries on shared pages and the 3.14 PDF split are described in each coverage row.

Supplementary clarifications are labeled in the lessons and ledger. RSA-PSS/EdDSA/deterministic ECDSA were cross-checked against official IETF RFCs in the earlier progress record. FIPS 203/204/205 names and roles were checked against official NIST pages. LWE is described as a computational assumption, not proven impossible; resource estimates and the textbook’s 2030/2035 migration anchors are not treated as deterministic predictions or universal deadlines. Heartbleed is identified as an implementation bounds-check defect rather than a cryptographic break. Historical material is not legal or current deployment advice.

**Chapter 3 sections 3.1–3.17 have first-pass source-based coverage.** Chapter 4 is now complete on a first-pass basis; see Chapter 4 review evidence below. Current catalog: 58 topics / 174 published documents / 251 glossary entries. Independent educator/editorial review remains pending; the separate Laboratory Workbook was not supplied.

## Chapter 4 review evidence (sections 4.1–4.11)

Chapter 4 was reviewed across `teori-1-143-178.pdf` physical pages **13–36** (section 4.1 through the start of 4.7) and `teori-1-179-221.pdf` physical pages **1–11** (completion of 4.7 through 4.11). Printed textbook pages are 144–167, then 168–178; physical page 1 of the second split contains printed page 168. The chapter crosses the PDF split: section 4.7's JWT material continues on the second file's physical page 1. Section 4.11, all worked exercises, self-test questions/answers and weekly summary end on second-file physical page 11 (printed p.178). Chapter 5 divider is physical page 12; section 5.1 begins physical page 13 (printed p.180).

The 12 coherent topics each contain an Arabic lesson, independent Turkish lesson and separate Turkish exam sheet. Coverage records are in `docs/source-coverage.json`; citations use physical PDF pages. Rendered pages were reviewed for factor/biometric illustrations, entropy and password storage tables/code, OTP diagrams/code, FIDO2 ceremony diagrams and JSON, OAuth message examples, JWT structures/validation, cookie/session comparisons, access-control tables, Zero Trust diagrams, and the Chapter 4 exercises and answer key. All 10 worked exercises and all 8 self-test questions were reviewed.

| Topic ID                                | Section scope                         | PDF physical pages          |
| --------------------------------------- | ------------------------------------- | --------------------------- |
| `identity-authentication-authorization` | 4.1                                   | `teori-1-143-178.pdf` 13–16 |
| `password-attacks-and-entropy`          | 4.2                                   | `teori-1-143-178.pdf` 17–22 |
| `multi-factor-authentication`           | 4.3                                   | `teori-1-143-178.pdf` 23–25 |
| `phishing-resistant-authentication`     | 4.4                                   | `teori-1-143-178.pdf` 26–30 |
| `sso-kerberos-federation`               | 4.5                                   | `teori-1-143-178.pdf` 31    |
| `oauth-authorization`                   | 4.6                                   | `teori-1-143-178.pdf` 32–34 |
| `openid-connect-jwt`                    | 4.7 overview/anatomy                  | `teori-1-143-178.pdf` 35–36 |
| `jwt-validation`                        | 4.7.2 validation/errors               | `teori-1-179-221.pdf` 1     |
| `session-security`                      | 4.8                                   | `teori-1-179-221.pdf` 2–3   |
| `access-control-models`                 | 4.9                                   | `teori-1-179-221.pdf` 4–5   |
| `zero-trust-architecture`               | 4.10                                  | `teori-1-179-221.pdf` 6–7   |
| `chapter-four-synthesis`                | 4.11 summary, exercises and self-test | `teori-1-179-221.pdf` 7–11  |

Source qualifications: the source's absolute wording that passkeys make phishing “impossible” is narrowed to its technical basis: origin-bound WebAuthn credentials resist cross-origin credential phishing, but do not prevent endpoint, recovery, or session compromise. TOTP expiration alone does not guarantee one-time acceptance if an implementation accepts the same code repeatedly within its window; this limitation is made explicit. JWT signatures provide integrity/authenticity, not payload confidentiality. Educator/editorial review remains pending.

**Chapter 4 sections 4.1–4.11 have first-pass source-based coverage.** Chapter 5 review evidence and the current catalog totals follow below.

## Chapter 5 review evidence (sections 5.1–5.12)

Chapter 5 was reviewed from `teori-1-179-221.pdf` physical pages **13–43** (printed pp.180–210), then `teori-1-222-268.pdf` physical pages **1–11** (printed pp.211–221). Section 5.7 crosses the split: its first part is in the first file pages 42–43 and its comparison/continuation is in the second file page 1. Section 5.12 ends on the second file page 11. Page 12 is the Chapter 6 divider; page 13 contains objectives and section 6.1 begins on page 14 (printed p.223).

Nine coherent topics contain all three published document forms: `web-security-foundations` (5.1–5.3), `owasp-top-10-map` (5.4), `sql-injection` (5.5), `cross-site-scripting` (5.6), `csrf` (5.7), `broken-access-control-idor` (5.8), `web-authentication-hardening` (5.9), `secure-web-design` (5.10), and `chapter-five-synthesis` (5.11–5.12). Exact citations and section-to-topic mapping are in the JSON ledger.

Rendered pages and extracted text were reviewed together. Visual review covered HTTP architecture and raw request/response, method and cookie/security-header tables, SOP/CORS diagrams and examples, OWASP 2017/2021 table, SQLi variant and parameterized-query code, XSS type/context/CSP examples, CSRF flow and comparison table, horizontal/vertical access and IDOR diagrams/server-side query example, authentication/session code, allowlist/denylist comparison, and solved exercises, answers and chapter summary. Source material was checked through physical page 11 of the second PDF.

Technical clarifications in lessons distinguish CORS response-reading policy from CSRF request submission, authentication from authorization, safe from idempotent HTTP methods, and CSP/HttpOnly as defense-in-depth from root-cause XSS prevention. SQLi impact is bounded by database-account privilege; UUIDs do not replace authorization. OWASP category names are explicitly presented as the textbook’s 2021 list. Independent educator/editorial review remains pending.

**Chapter 5 sections 5.1–5.12 have first-pass source-based coverage.** Chapter 6 review and current catalog follow.

## Chapter 6 review evidence (sections 6.1–6.11)

Chapter 6 begins at `teori-1-222-268.pdf` physical page **12** (divider), with objectives on page **13** and section 6.1 on page **14** (printed p.223). It crosses the split at the end of that PDF: section 6.8 continues in `teori-1-269-307.pdf` physical page **1**. Section 6.11's summary ends on second-file physical page **11** (printed p.268). The Chapter 7 divider is physical page **12**; physical page **13** contains objectives and the opening of section 7.1 (printed p.270), while subsection 7.1.1 begins on page **14**. Chapter 7 sections 7.1–7.13 now have reviewed first-pass coverage.

Nine coherent topics contain Arabic lessons, independent Turkish lessons and separate Turkish exam sheets. Exact citations use physical PDF pages:

| Topic ID                                      | Section scope                                                                       | PDF physical pages                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `ssrf-cloud-metadata`                         | 6.1 framing and 6.2 SSRF                                                            | `teori-1-222-268.pdf` 14–21                          |
| `advanced-injection-deserialization-xxe-ssti` | 6.3 insecure deserialization, XXE, SSTI                                             | `teori-1-222-268.pdf` 22–27                          |
| `dependency-supply-chain-log4shell`           | 6.4 dependencies and Log4Shell                                                      | `teori-1-222-268.pdf` 28–31                          |
| `api-security-authorization-abuse`            | 6.5 API risks, BOLA/BFLA, JWT, REST/GraphQL, CORS                                   | `teori-1-222-268.pdf` 32–40                          |
| `secrets-management-rotation`                 | 6.6 secrets, Git history, vault and rotation                                        | `teori-1-222-268.pdf` 41–43                          |
| `security-misconfiguration-headers`           | 6.7 misconfiguration and security headers                                           | `teori-1-222-268.pdf` 44–45                          |
| `secure-sdlc-devsecops`                       | 6.8 shift-left, STRIDE, tools and CI/CD                                             | `teori-1-222-268.pdf` 46–47; `teori-1-269-307.pdf` 1 |
| `coordinated-vulnerability-disclosure`        | 6.9 disclosure and bounty programs                                                  | `teori-1-269-307.pdf` 2–4                            |
| `chapter-six-synthesis`                       | 6.10 twelve worked exercises; 6.11 eight review questions, answers and week summary | `teori-1-269-307.pdf` 5–11                           |

Extracted text and rendered pages were reviewed together. Visual review included the trust-boundary and SSRF/cloud-metadata figures, provider comparison, deserialization language table and vulnerable/safe code, XXE and SSTI examples, Log4Shell mechanism and patch table, dependency-chain figure, API risk table/BOLA flow/JWT parts/REST–GraphQL comparison/CORS examples, secret-leak illustration, security-header table and configuration, DevSecOps pipeline diagram/code, responsible-disclosure portrait/caption, all 12 solved exercises, all 8 self-test questions and answer key, and the week summary. No source images or original PDF bytes were copied into public content.

Security qualifications: SSRF impact depends on reachable destinations, response/side effects and the cloud role's permissions; DNS validation must bind to the actual connection. Deserialization, XXE and SSTI are distinguished by the interpreter/root cause and execution boundary. Log4Shell is not presented as unconditional RCE; affected versions, configuration and runtime conditions matter, and the textbook's historical patch table is not a current patch guide. JWT algorithm confusion/`none` require a vulnerable validation policy and implementation; the server must pin algorithms and validate signature and claims. CORS is not authorization or a CSRF defense. HSTS/CSP and other headers are defense-in-depth, not root-cause fixes. Source cost multipliers and the 90-day disclosure window are treated as illustrative, not universal constants. Independent educator/editorial review remains pending.

**Chapters 1–8 have reviewed first-pass source-based coverage.** Current catalog: **100 topics / 300 published documents / 356 glossary entries**. Chapter 8 ends at `teori-1-360-397.pdf` physical page **11**. The next source point is the Chapter 9 divider on physical page **12**; objectives are on page 13 and section 9.1 begins on page 14 (printed p.361). Chapter 9 has not been authored.
