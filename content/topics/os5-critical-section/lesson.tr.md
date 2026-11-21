## Critical section (kritik bölüm)
Slayt 10–11'de ortak değişken, tablo veya dosyanın güncellendiği kodun korunması gerektiği açıklanır:

```text
entry section → critical section → exit section → remainder section
```

**Entry (giriş)** izin/kilit alır; **critical section** paylaşılan kaynağı işler; **exit (çıkış)** izni bırakır; **remainder (kalan)** kritik olmayan çalışmadır.

## Üç zorunlu şart — slayt 12
1. **Mutual exclusion (karşılıklı dışlama):** Bir process korunmuş kritik bölümdeyken diğeri aynı korunan bölüme giremez. Bütün sistemin durması gerekmez.
2. **Progress (ilerleme):** İçeride process yoksa ve giriş isteyen varsa kimin gireceğine dair karar sonsuza ertelenemez.
3. **Bounded waiting (sınırlı bekleme):** Giriş isteği yapan process'in önüne diğerlerinin kaç defa geçebileceği sınırlandırılır; starvation önlenir.

**Progress**, producer'dan hemen sonra consumer çalışması demek değildir. **Bounded waiting**, tüm bekleyenlerin hemen girebilmesi demek değildir.

## Preemption (slayt 13)
**Preemptive kernel (kesintili çekirdek)** kernel kodunu uygun noktalarda kesebilir; **nonpreemptive kernel (kesintisiz çekirdek)** bazı kernel interleaving'lerini önler. Ancak multicore'da diğer core aynı veriye girebildiğinden nonpreemptive olmak bütün race'leri otomatik çözmez.

**Kaynak dışı örnek:** Başka dosyayı güncelleyen process gereksiz yere aynı lock'u paylaşmamalıdır.
