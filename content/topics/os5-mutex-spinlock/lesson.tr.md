## Mutex lock (karşılıklı dışlama kilidi)
Slayt 21, yazılım geliştiricisinin critical section korumak için **mutex (mutual exclusion lock)** kullandığını anlatır: **acquire()** ile izin al, korunan bölümü çalıştır, **release()** ile bırak.

```text
do {
  acquire(lock);
  critical section;
  release(lock);
  remainder section;
} while (true);
```

Slaytın öğretici pseudocode'u:
```text
acquire() { while (!available) { } available=false; }
release() { available=true; }
```
**Teknik sınırlama:** `while` kontrolü ile `available=false` ayrı ve atomik olmayan adımlarsa iki thread birden lock'ı alabilir. Gerçek implementation için atomik lock ownership veya kernel mutex primitive gerekir.

## Spinlock (döner kilit)
Lock doluyken sürekli tekrar deneyip CPU tüketen bekleme **busy waiting (meşgul bekleme)**; böyle lock'a **spinlock** denir. Bekleme süresi çok kısa ve context-switch pahalıysa uygun olabilir. Uzun bekleme ve tek çekirdekte sahibi çalışamıyorsa kötü sonuç verir.

**Blocking mutex (bloklayan mutex)** bekleyeni scheduler'a bırakıp uyutabilir; spinlock'ın her mutex'te zorunlu olmadığını unutmayın.

## Doğru kullanım
Lock verisini değiştiren her kritik yol aynı protokolü kullanmalı. Bir thread lock'ı edinmeden korunan veriye erişirse güvenlik bozulabilir. Lock release edilmezse bekleyenler ilerleyemez. **Deadlock (kilitlenme)** daha sonra ayrıca incelenir.

**Kaynak dışı örnek:** Ortak bir sayacın `++` güncellemesi mutex altında seri yürütülebilir.
