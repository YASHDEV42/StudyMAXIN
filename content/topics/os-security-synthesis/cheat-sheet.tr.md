## Sınav için karar çerçevesi

- Savunma zincirini aşama aşama yaz: kusuru önle → istismarı zorlaştır → algıla → sandbox ile etkiyi sınırla → güven zincirini doğrula → yamala/izle.
- Canary / NX / ASLR+PIE / RELRO farklı varlık ve varsayımları korur; yapılandırmayı doğrula.
- Sadece 443 için tüm root yerine dar capability veya ayrıcalık düşürme değerlendir.
- Konteynerde geniş capability + filtre yokluğu riski artırır; namespaces tek başına yeterli değil.
- Sanitizer hatası normal build’de görünmese de araştırılmalı; düzeltme ve regresyon testi gerekir.
- Açık kaynak ≠ doğrulanmış ikili; build araçları/CI/bağımlılık/imza zinciri önemlidir.
- Her senaryoda önkoşul, kök neden, etki, savunma ve artık riski belirt.

- Tek taşma savunmaları aşamazsa olası ek önkoşullardan biri bilgi sızıntısıdır; adres/kanarya sızıntısı bazı rastgeleleştirme ve canary varsayımlarını zayıflatır.
- XZ (CVE-2024-3094) build/release zinciri vakasıdır; SolarWinds dağıtım zinciri örneğidir; ikisini Thompson’ın derleyici self-propagation tekniğiyle özdeşleştirme.
