## Race condition (yarış durumu)
Paylaşılan verinin sonucunun yürütme sırasına bağlı olması **race condition**'dır. Slayt 7–9'da `counter++` ve `counter--` komutlarının mantıksal olarak **read → modify → write** adımlarından oluşabileceği gösterilir. Tek kaynak kod satırı atomik işlem demek değildir.

## Slayttaki T0–T5 örneği
Başlangıç **counter=5**. Producer +1, consumer −1 yapınca doğru net sonuç 5'tir:

| Adım | Eylem | Değer |
| --- | --- | --- |
| T0 | Producer `r1=counter` | r1=5 |
| T1 | Producer `r1=r1+1` | r1=6 |
| T2 | Consumer `r2=counter` | r2=5 |
| T3 | Consumer `r2=r2-1` | r2=4 |
| T4 | Producer `counter=r1` | 6 |
| T5 | Consumer `counter=r2` | **4** |

Fiziksel buffer öğe sayısı hâlâ 5 olmalı; sayaç 4 olmuştur: **lost update (kayıp güncelleme)**. Son iki yazmanın sırası değişirse sayaç 6 olur; bu da yanlıştır.

## Koruma
Shared state güncellemesini **critical section (kritik bölüm)** içinde mutex veya uygun atomic işlemle korumak gerekir. Tek çekirdekte context switching de race yaratabilir; multicore şart değildir.

**Kaynak dışı örnek:** İki thread aynı banka bakiyesini eski değer üzerinden artırırsa bir güncelleme kaybolabilir.
