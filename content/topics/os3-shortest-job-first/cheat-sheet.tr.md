## SJF (Non-preemptive)
Hazırdaki en kısa CPU burst seçilir; başlayan process kesilmez.

| Process | Burst | Arrival | Completion | Waiting |
| --- | ---: | ---: | ---: | ---: |
| P1 | 5 | 0 | 14 | 9 |
| P2 | 4 | 0 | 7 | 3 |
| P3 | 7 | 0 | 21 | 14 |
| P4 | 3 | 0 | 3 | 0 |
| P5 | 2 | 4 | 9 | 3 |

**Gantt:** 0–3 P4 → 3–7 P2 → 7–9 P5 → 9–14 P1 → 14–21 P3.

**t=4'te P5 gelirken P2 kesilmez.**

- Turnaround = Completion − Arrival.
- Waiting = Turnaround − Burst.
- **Average waiting = 5.8**, **average turnaround = 10**.
- **SJF:** Non-preemptive; **SRTF:** Preemptive shortest remaining time.
- Avantaj: Ortalama bekleme azaltılabilir. Dezavantaj: Burst tahmini gerekir; uzun iş starvation yaşayabilir.
