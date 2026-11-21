## Semafor kullanım hataları — slayt 31
`wait(mutex)` ve `signal(mutex)` yanlış sırayla veya eksik kullanılırsa mutual exclusion bozulabilir veya deadlock doğabilir. `signal` önce yapılırsa kilit koruması kaybedilebilir; iki kez `wait` yapılıp uygun release yapılmazsa thread takılabilir. Bu karmaşıklığı azaltmak için **monitor (izleyici)** soyutlaması anlatılır.

## Monitor (izleyici) — slayt 32
Monitor, korunan **shared variables (paylaşılan değişkenler)** ve bunlara erişen **procedures (işlevler)** ile initialization kodunu bir araya getirir. Kaynak şemada herhangi bir anda monitor'un içindeki **yalnız bir procedure yürütme akışı aktif** olabilir; böylece monitor içi mutual exclusion sağlanır.

```text
monitor name {
  shared variables
  function P1(...) { ... }
  function P2(...) { ... }
  initialization_code(...)
}
```

Monitor kullanmak, her problemi otomatik çözmez; doğru predicate, condition signaling ve invariant gerekir.

## Condition variable (durum değişkeni) — slayt 33
`condition x,y` tanımlanabilir.
- **x.wait():** Çağıran thread monitor lock'unu bırakıp condition'da bekler; uyanınca monitor lock'unu yeniden edinerek devam eder (yaygın model).
- **x.signal():** O condition'da bekleyen thread'lerden birini uyandırabilir; kaynağın signal-and-wait / signal-and-continue semantiğine göre akış değişir.

**Signal-and-wait:** Signal veren, bekleyen devralırken durur (Hoare tarzı). **Signal-and-continue:** Signal veren devam eder, uyanan daha sonra lock alıp durum koşulunu tekrar kontrol eder (Mesa tarzı). Slayt bu iki farkı açıklar.

**Kaynak dışı örnek:** Queue boşken consumer, `notEmpty` condition'ında bekler; producer bir item koyunca signal verir. Condition wait, semaphore counter ile aynı şey değildir.
