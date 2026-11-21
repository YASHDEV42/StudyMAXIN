## Lock (kilit) ile koruma
Slayt 16: **acquire lock → critical section → release lock → remainder**. Lock bir bölümde aynı anda tek yürütme akışına izin verir. Koruma doğruysa çıkışta mutlaka release gerekir; aksi halde bekleyenler ilerleyemez.

## Hardware synchronization (eşzamanlama donanımı)
Slayt 17, interrupt kapatmanın tek işlemcili kernel bağlamında bazı kısa bölümleri koruyabileceğini; **multicore** sistemlerde tek çekirdeğin interrupt'ını kapatmanın diğer çekirdeklerdeki erişimi engellemediğini anlatır. Interrupt kapatma genel user-space mutex yerine geçmez.

### Test-and-set (test et ve ayarla) — slayt 18
```text
test_and_set(target):
  old = *target
  *target = true
  return old

while (test_and_set(&lock)) { }  // busy wait
critical section
lock = false
```
**Önemli:** Bu adımlar donanım tarafından **atomik** uygulanmadıkça algoritma güvenli değildir. Old false ise lock alınır; true ise döngüde beklenir.

### Compare-and-swap (karşılaştır ve değiştir) — slayt 19
```text
old = *value
if (*value == expected) *value = new_value
return old
```
Bu da tek atomik işlem olarak varsayılır. Slayttaki kilit örneği `while(compare_and_swap(&lock, 0, 1) != 0)` ile boş lock'ı 1'e çekerek sahiplenir; çıkışta 0'a döndürür.

## Bounded waiting algoritması (slayt 20)
Tek başına TAS/CAS **mutual exclusion** sağlar, ama adalet/bounded waiting garantilemez. Slayttaki `waiting[n]` dizisi ile `key` ve `lock`, `j=(i+1)%n` üzerinden bekleyen process'leri **dairesel sırayla** arar. Çıkışta sonraki bekleyene izin devredilir; dersin ideal koşullarında en fazla **n−1 diğer geçiş** sonrası sıra gelir.

**Kaynak dışı not:** Atomics ve memory-order kuralları olmadan bir lock implementation'ı sadece bu pseudocode'a bakarak production-safe kabul etmeyin.
