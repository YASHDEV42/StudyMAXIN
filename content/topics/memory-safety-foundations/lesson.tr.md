## Bellek yönetimi ile güvenlik arasındaki bağ

Programın belleğe düşük seviyede erişebilmesi yüksek performans ve donanım denetimi sağlar. C ve C++’ta programcı adresleri işaretçilerle yönetir, alan ayırır ve serbest bırakır. Sınır dışına yazma, geçersiz işaretçi kullanma veya nesneyi serbest bıraktıktan sonra erişme dil tarafından her durumda durdurulmaz. Sonuç tanımsız davranış (undefined behavior; tanımsız davranış) olabilir; derleyici ve çalışma ortamı belirli bir sonuç vaat etmez.

Bellek güvenli diller bu hata sınıfını azaltır. Java/Python/Go çalışma zamanı denetimleri ve otomatik bellek yönetimi kullanır. Rust sahiplik ve ödünç alma kurallarıyla pek çok geçersiz yaşam süresi ve eşzamanlı erişim durumunu derlemede engeller. Yine de güvenli dil uygulama mantığı, kimlik doğrulama veya enjeksiyon açıklarını çözmez; bellek açısından güvenli kütüphanelerle tehlikeli `unsafe` sınırları da dikkat ister. Kaynağın verdiği büyük oranlar (yaklaşık %70) Microsoft/Chromium’un belirli dönemlerdeki açık analizlerine aittir, evrensel sabit değildir.

Adres alanı kavramsal olarak kod, veri/BSS, öbek ve yığına ayrılır. Kod genellikle okunur-çalıştırılır; veri yazılabilir; öbek dinamik ayırmaları, yığın ise fonksiyon çağrı çerçevelerini tutar. Kesin yerleşim derleyici, ABI, işletim sistemi ve ASLR’ye göre değişir; diyagramı her ikili dosyanın birebir haritası gibi görmemek gerekir. Sayfa izinleri ve NX/DEP veri sayfasından komut yürütmeyi sınırlar.

Güvenlik açısından ağ ayrıştırıcısı gibi güvenilmeyen girdi alan kodlarda uzunluk, sınır, işaretli/işaretsiz dönüşüm ve çarpım taşması birlikte denetlenmelidir. Bellek güvenli dile geçiş en kökten azaltım olabilir; geçiş mümkün değilse derleyici korumaları, statik/dinamik analiz, sanitizer, fuzzing ve seccomp ile etki azaltılır. Bu savunmalar farklı aşamalarda çalışır: hata önleme, erken yakalama ve istismar sonrası yetkiyi sınırlama.

Bu bellek modeli, [yığın taşmasının](topic:stack-buffer-overflow) ve diğer [bellek kusurlarının](topic:memory-bug-families) nasıl oluştuğunu anlamaya temel olur.
