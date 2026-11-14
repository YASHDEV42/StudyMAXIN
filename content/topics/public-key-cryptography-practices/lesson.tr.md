## Kriptografide hata çoğu kez uygulamadadır

Bölümdeki saldırılar, matematiksel yapının kendisinden çok yanlış kullanıma odaklanır. Dolgusuz textbook RSA belirlenimci ve şekillendirilebilir olabilir: şifreleme için OAEP, imza için PSS gerekir. ECDSA nonce’unu tekrar kullanmak gizli anahtarı açığa çıkarabilir; nonce üretimi güvenli olmalı veya uygun standartlı, denetlenmiş bir imza uygulaması seçilmelidir.

Kimlik doğrulamasız Diffie–Hellman ortadaki adam saldırısına açıktır; anahtar değişimi sertifika ve imzayla kimliğe bağlanmalıdır. Zayıf/paylaşılan DH parametreleri Logjam türü riskler doğurur; güncel güvenli gruplar tercih edilir. Zayıf rastgelelik tahmin edilebilir anahtar üretir; sistem CSPRNG’si kullanılmalıdır.

## Uygulama kontrolleri

Gizli veriye bağlı zamanlama ve farklı hata yanıtları yan kanal veya padding oracle oluşturabilir; sabit zamanlı güvenli kütüphane işlemleri ve tutarlı hata davranışı gerekir. Kod deposuna gömülü anahtarlar sızıntı riskini artırır; erişim kontrollü KMS/HSM ve anahtar rotasyonu uygulanır. Eski TLS ve şifrelerin açık kalması POODLE, FREAK, BEAST gibi saldırı yüzeyini büyütür; desteklenen TLS sürümlerini kullanıp eski seçenekleri kapat.

En genel kural: kendi kripto algoritmanı/uygulamanı yazma. OpenSSL, libsodium, BoringSSL veya dil ekosistemindeki denetlenmiş kütüphaneleri doğru yüksek seviyeli arayüzleriyle kullan. Kütüphane adı tek başına doğru parametre, anahtar saklama ve protokol seçimini garanti etmez.

**Öğretici ek:** Kaynaktaki kütüphane adları örnektir; üretim seçiminde bakım ve destek durumunu doğrula.

İlişkili konular: [RSA sistemi](topic:rsa-cryptosystem) · [yan kanal saldırıları](topic:side-channel-attacks) · [TLS 1.3](topic:tls-13).
