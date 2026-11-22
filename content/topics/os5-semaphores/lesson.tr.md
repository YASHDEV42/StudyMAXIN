## Semaphore (semafor)

**Semaphore**, bir tam sayı üzerinden eşzamanlama ve kaynak sayımı sağlayan mekanizmadır. Slayt 22–25 iki türü açıklar:

- **Binary semaphore (ikilik semafor):** Değer 0 veya 1'dir, mutual exclusion veya olay bildirimine uygun olabilir. Sadece “iki process arasında kullanılabilir” iddiası doğru değildir; çok process aynı binary semaphore üzerinde bekleyebilir.
- **Counting semaphore (sayan semafor):** Başlangıçta kullanılabilir kaynak sayısı kadar ayarlanabilir. Örn. **S=3** ile en çok üç işlem eşzamanlı olarak üç kaynak birimini kullanabilir.

## wait(P) ve signal(V)

Slayt 24'ün basitleştirilmiş spin modelinde:

```text
wait(S):   while (S <= 0) wait; S--;
signal(S): S++;
```

**wait (P)** izin/kaynak tüketir; **signal (V)** izin/kaynak iade eder veya bekleyeni uyandırır. **Her iki operasyon atomik olmalıdır**: `while` ve decrement ayrı, korumasız komutlar olursa iki process aynı slot'u alabilir. Bloklayan semaphore implementasyonlarında bekleyen thread uyutulur; busy-wait zorunlu değildir.

## Execution ordering — slayt 25

P₁'deki **S₁** ifadesi P₂'deki **S₂**'den önce bitmeli:

```text
initial synch = 0
P1: S1; signal(synch);
P2: wait(synch); S2;
```

P₂ `wait` ile S₁ tamamlanana kadar bekler; signal gelince S₂ başlayabilir. Bu semaphore **resource count yerine ordering constraint** için kullanılmıştır.

## Mutex ile ayrım

**Mutex** tipik olarak bir kilidin sahipliğine (lock ownership) bağlıdır. **Semaphore** permit sayar ve signal farklı thread'den gelebilir. Binary semaphore her bakımdan mutex ile özdeş değildir.

**Kaynak dışı örnek:** Connection pool'da en fazla 3 eşzamanlı bağlantı izni counting semaphore ile sınırlandırılabilir.
