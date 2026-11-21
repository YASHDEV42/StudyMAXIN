## Busy waiting yapmayan semaphore — slayt 26–27
Her semaphore bir **waiting queue (bekleme kuyruğu)** tutabilir. `block` process'i bu kuyruğa alır; `wakeup` bekleyen process'i **ready queue (hazır kuyruğu)** içine taşır. Böylece CPU üzerinde sürekli dönmeye gerek kalmaz.

Slayt 27'nin öğretici semafor algoritması:
```text
acquire: value--; if (value < 0) { queue.add(self); block(); }
release: value++; if (value <= 0) { P=queue.remove(); wakeup(P); }
```
Bu modelde negatif değer, bekleyen process'leri temsil edebilir. **Atomicity** queue/value güncellemeleri için de zorunludur.

## Deadlock (kilitlenme) — slayt 28–29
İki veya daha çok process karşılıklı olarak, ancak diğerinin bırakabileceği kaynağı bekler ve ilerleyemez. Kaynak örneği:

| P0 | P1 |
| --- | --- |
| wait(S) | wait(Q) |
| wait(Q) | wait(S) |
| signal(S), signal(Q) | signal(Q), signal(S) |

**S=Q=1** ile P0 önce S'yi, P1 önce Q'yu alırsa P0 Q'yu, P1 S'yi bekler; ikisi de release'e ulaşamaz. Bu **circular wait (döngüsel bekleme)** örneğidir. Önleme yollarından biri lock'ları iki process'te aynı sabit sırayla edinmektir.

## Starvation (aç kalma) — slayt 30
Bir process sonsuza yakın süre bekleyebilir, o sırada diğerleri ilerler. Örnek: **LIFO (last in, first out)** kuyruğa sürekli yeni process gelmesi veya sürekli daha yüksek öncelik verilmesi. **Deadlock** = bir grup karşılıklı bekleyerek ilerleyemez; **starvation** = belirli bir process sırası gelmediği için ilerleyemez, başkaları ilerleyebilir.

**Kaynak dışı not:** Semaphore kuyruğunda fairness policy, bounded waiting sağlayacak biçimde seçilebilir; gerçek uygulamalarda uyandırma sırası değişebilir.
