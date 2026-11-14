## Sınav özeti

| Standart  | Temel amaç                                                         |
| --------- | ------------------------------------------------------------------ |
| OAuth 2.0 | Kaynak erişimi için yetki devri; tek başına kimlik doğrulama değil |
| OIDC      | OAuth üzerine kullanıcı kimliği doğrulama; ID token                |
| SAML      | Federatif kimlik doğrulama beyanı; XML tabanlı                     |

- JWT bölümleri: `header.payload.signature`.
- Header algoritmayı; payload claim'leri; signature imza doğrulama malzemesini taşır.
- Base64URL kodlama şifreleme değildir; payload okunabilir olabilir, sır koyma.
- İmza bütünlüğe yardım eder; gizlilik sağlamaz.
- JWT doğrulama adımları için [ayrı konuya](topic:jwt-validation) bakın.
- ID token ve access token farklı kullanım ve audience'a sahiptir.
- Geçerli imza, token'ın yanlış API veya işlem için kullanılmasını tek başına engellemez.
- Uzun ömürlü JWT'nin iptali zordur; kısa süre ve oturum/tokен yaşam döngüsü gerekir.
