## Tasarım hedefleri
İşletim sisteminin mimarisi donanıma ve kullanım alanına göre belirlenir: single-user, multiuser, real-time, distributed, general-purpose, special-purpose vb.

**User goals (kullanıcı hedefleri):** Öğrenmesi/kullanması kolay, güvenilir, güvenli, hızlı, rahat bir sistem. **System goals (sistem hedefleri):** Tasarımı, uygulanması ve bakımı kolay; esnek, hatasız, verimli ve güvenilir bir işletim sistemi. Bu hedefler zaman zaman çelişebilir.

## Policy ve mechanism
- **Policy (kural/politika):** *Ne yapılmalı?* Kimin ne kadar CPU zamanı alacağı gibi kararı belirtir.
- **Mechanism (mekanizma):** *Nasıl yapılmalı?* Timer, interrupt ve CPU context switch gibi uygulama araçlarını sağlar.

**Slayt örneği:** CPU kontrolü için timer bir mekanizmadır; timer süresinin ne olacağı ve kime ne kadar CPU ayrılacağı politikadır. Politika ile mekanizmayı ayırmak, kararları değiştirmeyi ve sistemi geliştirmeyi kolaylaştırır.

## Implementation (gerçekleştirim)
İlk OS'lerde assembly kullanımı yaygındı. Modern işletim sistemleri C/C++ gibi yüksek seviyeli dilleri, donanıma özgü parçalar için assembly'yi, sistem yardımcıları için diğer dilleri ve script'leri birlikte kullanabilir.

Yüksek seviyeli dillerin katkıları: taşınabilirlik, bakım ve programlama kolaylığı. Compiler optimizasyonları ve işlemci teknikleri performansı destekler. Kaynaktaki "daha yavaştır" ifadesi, her modern kod için zorunlu sonuç değildir; performans uygulama ve derleme ayrıntılarına bağlıdır.

**Öğretici ek:** CPU scheduler'ın sıradaki görevi seçme kuralı policy, bir process'in register'larını kaydedip diğerini çalıştırma adımları mechanism örneğidir.
