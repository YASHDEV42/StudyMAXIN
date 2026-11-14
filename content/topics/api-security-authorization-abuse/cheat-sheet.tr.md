API istemcisi arayüz kısıtlarına bağlı değildir; endpoint, gövde ve başlığı doğrudan değiştirebilir. Güvenlik kararı sunucuda verilmelidir.

- **Authentication:** kimlik doğrulama (“kimsin?”). **Authorization:** yetkilendirme (“bu nesne/işlem için iznin var mı?”).
- **BOLA/IDOR:** başka kullanıcının nesnesine erişim; her istekte nesne ilişkisini/sahipliğini denetle. UUID yetkilendirme değildir.
- **BFLA:** yetkisiz işlev (örn. admin endpoint’i); sunucuda rol/işlev kontrolü ve varsayılan reddet.
- Aşırı veri açığa çıkarma: yanıtta yalnızca gerekli alanları allowlist ile seç. Mass assignment: istek gövdesinden yalnızca izinli yazma alanlarını al.
- JWT: `header.payload.signature`; Base64URL şifreleme değildir. İmza doğrula; algoritmayı sunucu tarafında sabitle; `none`/beklenmeyen alg reddet; `exp`, `iss`, `aud` ve gereken claim’leri denetle. İmzalı payload gizli değildir.
- Credential stuffing: başka ihlallerde sızan parola çiftlerini otomatik deneme. MFA, dikkatli hesap/IP limitleri, iptal edilebilir kısa ömürlü token ve güvenli kurtarma kullan.
- Token bucket: kapasite `b` kısa burst’ü, dolum hızı `r` uzun dönem ortalamayı belirler; token yoksa reddet. Dağıtık sayaç ve NAT etkisini hesaba kat.
- REST: çok endpoint, her birinde yetki kontrolü. GraphQL: sorgu derinliği/maliyeti ve alan yetkisi; introspection ayarı ek kontrol.
- Shadow API bilinmeyen/belgesiz; zombie API eski ve açık kalmış. Envanter tut, emekliye ayır.
- CORS, tarayıcı JavaScript’inin yanıt okumasını düzenler; API yetkilendirmesi veya CSRF savunması değildir. Origin için tam allowlist kullan.
