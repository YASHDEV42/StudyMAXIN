Modern yazılım, doğrudan ve geçişli bağımlılıklardan oluşur. Bir bileşendeki açık, uygulamanın maruz kaldığı riske dönüşebilir.

- **Log4Shell (CVE-2021-44228):** Log4j lookup davranışı + loglanan güvenilmeyen metin + JNDI erişim yolu. Etki sürüm, yapılandırma ve çalışma koşullarına bağlıdır; her kurulum otomatik RCE değildir.
- İlk yamadan sonra takip CVE’leri ve ek sürümler çıktı. Tarihsel tabloyu güncel yama talimatı gibi kullanma; üretici duyurusu/bakım dalını doğrula.
- **Geçişli bağımlılık:** başka bir bileşenin getirdiği paket. **SBOM:** bileşen/sürüm envanteri; tespit ve yanıtı hızlandırır ama düzeltme garantisi vermez.
- **Dependency confusion:** iç paket adının kamu deposundan çözülmesi. **Typosquatting:** benzer isimli sahte paket.
- Savunma: güvenilir paket kaynağını/ad alanını sabitle; yayıncıyı gözden geçir; lockfile ve integrity hash kullan; bağımlılık taraması ve düzenli güncelleme uygula.
- Lockfile bütünlük doğrulaması sağlar; kodun güvenli veya yayınevinin güvenilir olduğunu kanıtlamaz.
- Heartbleed (bellek sınırı kusuru), SolarWinds (güncelleme zinciri), Log4Shell (bileşen davranışı) ve MOVEit (ürün açığı) farklı mekanizmalardır.
