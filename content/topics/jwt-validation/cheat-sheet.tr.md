## Sınav özeti

- Algoritmayı token header'ından seçme; sunucu tarafında izin verilen algoritmayı sabitle.
- Her token için imzayı doğrula; imza geçmeden claim/rolü kullanma.
- Beklenen `iss` (issuer), `aud` (audience), `exp` (expiry) ve gerekli claim'leri kontrol et.
- Geçerli imza, token'ın bu API veya amaç için düzenlendiğini tek başına göstermez.
- `alg=none`, algoritma karıştırma ve zayıf HMAC sırrı doğrulama hatalarıyla ilişkilidir.
- OIDC ID token ve OAuth access token farklı hedef kitle/amaç içindir.
- JWT imzası gizlilik sağlamaz; payload okunabilir olabilir.
- Token ömrü ve iptali ayrıca tasarlanmalıdır.
