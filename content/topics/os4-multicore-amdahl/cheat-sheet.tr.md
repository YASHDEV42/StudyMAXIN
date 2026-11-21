## Concurrency ≠ Parallelism

- **Concurrency:** Görevlerin aynı zaman aralığında ilerletilmesi; tek core'da time sharing olabilir.
- **Parallelism:** Birden fazla işi aynı anda farklı yürütme birimlerinde çalıştırma.
- **Physical cores vs logical processors:** Logical processor sayısı uygulamanın oluşturabileceği thread sayısı değildir.

## Amdahl's Law

\[
Speedup(N)\leq\frac{1}{S+(1-S)/N}
\]

**S:** Seri oran; **N:** Core sayısı.

**S=0.25:** N=2 → **1.6×**; N=4 → **≈2.29×**; N→∞ → **4×**.

**Sınav yorumu:** Seri kısım arttıkça paralellikten alınan verim düşer; gerçek dünyada ek overhead de vardır.
