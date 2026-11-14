## Sertifika denetim listesi

- X.509 sertifikası açık anahtarı kimliğe bağlar; gizli anahtarı içermez.
- SAN: kabul edilen alan adları. Subject/CN tek başına modern ad denetiminin yerini tutmaz.
- Issuer: imzalayan; Subject: kimliği beyan edilen.
- Not Before/Not After: zaman aralığı; Basic Constraints: `CA:TRUE/FALSE`; Key Usage/EKU: izin verilen kullanım.
- Kritik uzantı anlaşılamıyorsa sertifika reddedilir.
- Güven zinciri: yaprak → ara CA(lar) → istemcinin yerel kök deposundaki güvenilir kök.
- İstemci adı, tarihleri, imzaları, CA yetkisini/kısıtları ve iptal durumunu doğrular.
- DV alan adı kontrolünü; OV kuruluş kontrolünü; EV daha geniş kuruluş incelemesini belirtir. Hiçbiri sitenin iyi niyetini kanıtlamaz.
- CRL: toplu iptal listesi. OCSP: CA’ya sorgu. Stapling: sunucu güncel OCSP yanıtını ekler.
- CT kayıtları sertifika ihracını denetlenebilir kılar; tek başına sahte sertifikayı önlemez.
- HTTPS kimlik doğrulamalı şifreli bağlantıdır; web içeriğinin dürüst olduğuna dair garanti değildir.
