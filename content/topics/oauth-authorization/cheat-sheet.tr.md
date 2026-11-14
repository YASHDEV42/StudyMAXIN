## Sınav özeti

- OAuth 2.0 = kullanıcı adına sınırlı **yetki devri**; tek başına kimlik doğrulama değildir.
- Roller: kaynak sahibi, istemci, yetkilendirme sunucusu, kaynak sunucusu.
- Authorization Code: yönlendir → kullanıcı giriş/onay → callback'e kısa ömürlü kod → token uç noktasında token değişimi → API'ye token sun.
- **PKCE:** verifier/challenge bağını kullanır; özellikle public client'ta ele geçirilmiş kodun kullanılmasını zorlaştırır.
- **state:** yanıtı başlatılan tarayıcı isteğine bağlar; CSRF/akış karıştırma riskini azaltır.
- Redirect URI önceden kaydedilmiş adresle tam doğrulanmalıdır.
- Scope dar olmalı; token, uygulamanın gerekli olmayan işlemlerini vermemelidir.
- Bearer token'ı tutan kullanabilir: URL/log'a yazma, kısa ömür ve iptal düşün.
- TLS transit korumasıdır; endpoint/token saklama sorununu çözmez.
- Kullanıcı kimliği gerekiyorsa OAuth erişim token'ını kimlik kanıtı gibi kullanma; OIDC kullan.
