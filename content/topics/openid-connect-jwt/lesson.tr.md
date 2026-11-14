## OAuth, OIDC ve SAML neyi yanıtlar?

OAuth 2.0, bir uygulamanın kullanıcı adına belirli kaynaklara erişmesi için yetki devrini düzenler; access token tek başına kullanıcının kimliğini kanıtlamaz. OpenID Connect (OIDC), OAuth 2.0 üzerine kimlik doğrulama katmanı ekler ve kimlik iddialarını taşıyan ID token sağlar. SAML de federatif kimlik doğrulamada kullanılan XML tabanlı bir standarttır. Kısaca: API yetkisi için OAuth, oturum açan kişinin kimliği için OIDC; kurumsal sistemlerde SAML ile karşılaşılabilir. [OAuth yetkilendirme](topic:oauth-authorization) ile [SSO/federasyon](topic:sso-kerberos-federation) ayrıntılarını ayrıca inceleyin.

## JWT'nin yapısı

JSON Web Token (JWT) yaygın olarak `header.payload.signature` biçiminde üç Base64URL bölümünden oluşur. Header türü ve imza algoritmasını belirtir. Payload, `sub` (konu), `iss` (düzenleyen), `aud` (hedef kitle) ve `exp` (son kullanma) gibi claim'leri taşıyabilir. Signature, imzalama anahtarıyla üretilir ve doğru doğrulandığında verinin imzadan sonra değiştirilmediğine kanıt sağlar.

Base64URL kodlama şifreleme değildir; payload çoğu JWT türünde okunabilir. Bu nedenle parola, kart numarası veya gizli bilgi payload'a konmamalıdır. İmza bütünlük ve kaynak doğrulamasına katkı verir; gizlilik sağlamaz. İmzalı JWT, kendiliğinden iptal edilebilen bir oturum kaydı da değildir.

## Token'ı kabul etmeden önce

JWT'nin yapısını çözmek, doğrulamanın yerini tutmaz. Sunucu imzayı, beklenen issuer/audience değerlerini ve süreyi denetlemelidir; hatalı doğrulama örnekleri [güvenli JWT doğrulama](topic:jwt-validation) konusunda ele alınır. OIDC ID token'ı ile OAuth access token'ı farklı amaç ve hedef kitlelere sahiptir; birbirinin yerine kabul edilmemelidir. Uzun ömürlü token'ı iptal etmek zor olabilir, bu yüzden süre, anahtar ve [oturum güvenliği](topic:session-security) birlikte tasarlanır.

_Teknik netleştirme:_ JWT bir taşıma biçimidir; kimlik kanıtı olup olmadığı issuer, audience, imza ve protokol bağlamına göre belirlenir.
