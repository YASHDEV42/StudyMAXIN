## Sınav özeti

- Kullanıcı modu sınırlıdır; çekirdek modu ayrıcalıklı işletim sistemi kodudur.
- Sistem çağrısı kontrollü geçiştir; çekirdek giriş numarası, argümanlar ve yetkiyi doğrulamalıdır.
- x86 halkaları 0–3: 0 en yetkili, 3 en kısıtlı; genel amaçlı OS çoğunlukla 0 ve 3’ü kullanır.
- MMU + süreç başına sayfa tabloları sanal adresi fiziksel çerçeveye çevirir; R/W/X izinleri erişimi sınırlar.
- Spekülatif yürütme yan etkileri mimari durum geri alınsa bile kalabilir.
- Meltdown ve Spectre farklı saldırı aileleridir; tek bir açıklama/çözümle karıştırma. KPTI özellikle çekirdek eşlemelerini ayırır; performans ve donanım bağımlılıkları vardır.
- Güven sınırı: farklı güven düzeyindeki bileşenlerin temas ettiği arayüz.

x86-64 Linux syscall kuralı: `rax` çağrı numarası; argümanlar `rdi, rsi, rdx, r10, r8, r9`. İşlemci ayrıcalık düzeyini çekirdeğin sabit girişine geçirir; çekirdek argümanları/izinleri denetler ve kullanıcı kipine döner.
