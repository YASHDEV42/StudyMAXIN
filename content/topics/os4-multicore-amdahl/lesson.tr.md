## Concurrency ve parallelism

**Concurrency (eşzamanlı ilerleme)** birden fazla işin zaman içinde ilerletilmesidir; tek core üzerinde **time sharing (zaman paylaşımı)** ile de mümkündür. **Parallelism (paralellik)** aynı anda birden çok işin gerçekten çalışmasıdır; slayt 9'daki iki core, T1/T3 ile T2/T4 akışlarını farklı çekirdeklerde yürütür. Bir multicore sistem hem concurrency hem parallelism sergileyebilir.

**Physical core (fiziksel çekirdek)** donanım yürütme birimidir. **Logical processor (mantıksal işlemci)** ise OS'nin zamanlayabildiği donanım yürütme bağlamıdır. Slayt 11'de Task Manager'da 4 core ve 8 logical processor gösterilir; bu **her zaman programda yalnız 8 thread olabilir** demek değildir. Yazılım çok daha fazla thread oluşturabilir.

## Amdahl's Law (Amdahl kuralı)

Slayt 10, seri iş oranı **S**, core/processor sayısı **N** için teorik üst sınırı verir:

\[
\operatorname{Speedup}(N)\leq\frac{1}{S+\frac{1-S}{N}}.
\]

**Kaynak örneği:** Uygulamanın %25'i seri, %75'i paralel → **S = 0.25**.

- **N = 2:** `1 / (0.25 + 0.75/2) = 1.6`.
- **N = 4:** `1 / (0.25 + 0.75/4) = 2.2857 ≈ 2.29` (slaytta 2.28).
- **N → ∞:** En büyük teorik hızlanma `1/S = 4`.

Yani N'yi sonsuza çıkarmak bile seri kısmı yok etmez. Sync, iletişim, veri bölme ve memory contention gibi ek maliyetler gerçek speedup'ı düşürebilir.

## Donanımı gözlemlemek

Slayt 11'de **Windows Task Manager → Performance → CPU** bölümünde core/logical processor sayıları görülür; `msinfo32` sistem bilgisini açar. Görseldeki 4/8 değerleri o örnek makineye aittir.

**Kaynak dışı örnek:** Bir işin %60'ı seri ise sonsuz sayıda core ile teorik üst sınır `1/0.6 ≈ 1.67` olur.
