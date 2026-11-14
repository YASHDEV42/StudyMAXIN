## Neden sertifika gerekir?

Açık anahtar tek başına kimlik taşımaz. Bir sunucudan alınan anahtarın gerçekten `shop.example` alan adına ait olduğunu nasıl biliriz? Açık Anahtar Altyapısı (Public Key Infrastructure, PKI) bu bağın güvenilir bir üçüncü tarafça imzalanmış kanıtını, yani sertifikayı sağlar. Sertifika Otoritesi (Certificate Authority, CA), başvuranı belirli kurallara göre doğrular ve “bu kimlikle şu açık anahtar ilişkilidir” beyanını imzalar. Tarayıcı imzayı CA’nın açık anahtarıyla doğrular.

X.509 yaygın sertifika biçimidir. Subject kimliği, Subject Public Key Info açık anahtarı, Issuer düzenleyeni, geçerlilik tarihleri, seri numarası, imza ve uzantılar bulunur. Gizli anahtar sertifikada yer almaz; onu sahibi korur. Modern alan adı eşleştirmesinde Subject Alternative Name (SAN) önemlidir. Key Usage ve Extended Key Usage anahtarın kullanım alanlarını sınırlar; Basic Constraints sertifikanın CA olup olmadığını belirtir. Kritik bir uzantıyı anlayamayan istemci onu yok saymamalı, sertifikayı reddetmelidir.

## Güven zinciri

İşletim sistemi veya tarayıcı önceden güvenilen kök CA’ların açık anahtarlarını bir kök deposunda tutar. Kök CA genellikle çevrimdışı ve fiziksel korumalıdır; günlük sertifika imzalamayı yetkilendirilmiş ara CA yapar. Ara CA sunucu sertifikasını (yaprak sertifika) imzalar. İstemci yapraktan başlayarak her imzayı doğrular ve zincirin kendi deposundaki güvenilir köke ulaştığını kontrol eder. Sunucunun gönderdiği zincire kökü eklemesi güven yaratmaz; güven dayanağı istemcide önceden bulunmalıdır.

Doğrulamada alan adının SAN ile eşleşmesi, sertifikanın geçerlilik tarihleri, her imza, imzalayan CA’nın yetkisi, uzantı ve kullanım kısıtları, güvenilir köke ulaşma ve iptal durumu birlikte değerlendirilir. Kitaptaki sözde kod temel mantığı gösterir; gerçek X.509 doğrulaması path length ve politika gibi daha fazla standard kural içerir.

## DV, OV, EV ve HTTPS’in sınırı

DV (Domain Validated) alan adını kontrol edebileni doğrular; sitenin dürüstlüğünü veya işletmenin niteliğini kanıtlamaz. OV kuruluş bilgilerini de denetler. EV daha sıkı kuruluş incelemesidir; geçmişteki özel yeşil arayüz modern tarayıcılarda güven göstergesi olarak büyük ölçüde kaldırılmıştır. HTTPS, istemcinin beklediği alan adıyla sertifika eşleşmesini ve bağlantının şifrelenip doğrulanmasını destekler. Kimlik avı sitesi de kendi alan adına geçerli DV alabilir.

## İptal ve şeffaflık

Anahtar sızıntısı gibi bir durumda sertifika süresi dolmadan iptal gerekebilir. CRL, iptal edilmiş sertifikaların yayımlanan listesidir; liste büyük ve güncelleme gecikmeli olabilir. OCSP, istemcinin CA’ya belirli bir sertifikayı sormasıdır; tazelik sağlasa da ek ağ gecikmesi ve ziyaret gizliliği sorunu doğurur. OCSP stapling’de sunucu CA’dan aldığı güncel durum yanıtını bağlantıya ekler. Kısa ömürlü sertifikalar iptal altyapısına bağımlılığı azaltır; otomatik yenileme bu yaklaşımı uygulanabilir kılar.

DigiNotar’ın 2011’de ele geçirilmesi, güvenilir bir CA’nın kötüye kullanılmasıyla teknik olarak geçerli görünen sahte sertifikalar üretilebildiğini gösterdi. Certificate Transparency (CT), verilen sertifikaları kamuya açık denetlenebilir kayıtlara ekleyerek beklenmeyen sertifikaların fark edilmesini kolaylaştırır. CT, CA imzası ve istemci doğrulamasının yerine geçmez.

**Öğretici ek:** Sertifika türleri şifre gücünü değil, kimlik incelemesinin kapsamını anlatır. Tarayıcı politikaları zamanla değişebilir.

**Kaynak düzeltmesi:** Kaynaktaki doğrulama sözde kodu öğretici bir taslaktır; üretimde X.509 yol doğrulama standartlarının ek kısıtları da gerekir.

İlişkili konular: [dijital imzalar](topic:digital-signatures) · [TLS 1.3](topic:tls-13).
