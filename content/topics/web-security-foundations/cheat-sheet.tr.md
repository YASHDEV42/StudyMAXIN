## Sınav özeti

- HTTP isteği: metot/yol/sürüm, başlıklar, boş ayırıcı satır, gövde. Yanıt: durum, başlıklar, gövde.
- `GET` güvenli olmalı; güvenli olma idempotent olma ile aynı kavram değildir.
- Durum değiştiren eylem GET ile yapılmamalı; CSRF denetimi ayrıca gerekir.
- HTTP durumsuzdur; cookie çoğunlukla oturum tanımlayıcısını taşır.
- `HttpOnly`: betik erişimini sınırlar. `Secure`: HTTPS şartı. `SameSite`: çapraz site gönderimini sınırlar.
- TLS taşıma katmanını korur; uygulama mantığını veya yetkilendirmeyi düzeltmez.
- Origin = şema + host + port. SOP yanıt okumayı sınırlar; her çapraz site isteği engellenmez.
- CORS, tarayıcıda yanıt okuma iznini düzenler; kimlik doğrulama değildir.
- HSTS HTTPS zorlamaya, CSP kaynak/etki sınırlamaya yarar.
