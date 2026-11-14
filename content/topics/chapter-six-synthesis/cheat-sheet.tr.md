## Bir bakışta

- **SSRF:** sunucu kullanıcı girdisiyle iç hedefe istek atar. Allowlist + gerçek IP/redirect denetimi + egress kısıtı + IMDS koruması + en az yetki.
- **Güvensiz deserialization / XXE / SSTI:** güvenilmeyen veri yorumlayıcı davranışına dönüşür. Sırasıyla zengin nesne çözümlemesini bırak; DTD/entity kapat; sabit şablona değer ver.
- **Bağımlılık/Log4Shell:** transitif paket envanteri; SBOM ve SCA ile bul; uygun desteklenen yamayı doğrula. Tarihsel sürüm tablosu güncel tavsiye değildir.
- **BOLA:** başka nesne; **BFLA:** başka işlev. Authentication ≠ authorization. Her istekte sunucu tarafı kontrol.
- **Aşırı veri:** giden alanları allowlist et. **Mass assignment:** gelen yazılabilir alanları allowlist et.
- **JWT:** `header.payload.signature`, payload okunabilir. Algoritma/anahtarı sunucu sabitler; imza, `exp`, `iss`, `aud` ve gerekli claim’leri kontrol eder.
- **Token bucket:** kapasite `b` burst; hız `r` ortalama. Örnekte `b=5`, `r=1/60` token/s; yaklaşık 65 deneme ilk dolu kova + bir saat yenileme ile.
- **REST:** çok endpoint, yetkiyi her birinde denetle. **GraphQL:** derinlik/kost sınırı + alan bazlı yetki.
- **CORS:** tarayıcı yanıt okuma izni; CSRF veya API authorization değildir. Tam origin allowlist.
- **Sırlar:** Git’e girdiyse ifşa kabul et; önce iptal/döndür. Vault, kısa ömür ve en az yetki.
- **Başlıklar:** HSTS→HTTPS, CSP→kaynak kısıtı/XSS etkisini azaltma, frame koruması→clickjacking, nosniff→MIME, Referrer-Policy→referrer verisi.
- **Secure SDLC:** shift-left; STRIDE; SAST kod, DAST çalışan uygulama, IAST runtime, SCA bağımlılıklar. Pipeline’ı da koru.
- **Koordineli açıklama:** özel bildirim → düzeltme → ortak açıklama. Bug bounty yalnızca tanımlı kapsamda izin sağlar.

## 12 alıştırmanın cevap çekirdeği

1. XML metadata isteği: XXE kök neden + SSRF etkisi; ikisini de katmanla. 2. Kart ID değiştirme: BOLA; sahipliği doğrula, UUID yeterli değil. 3. Kod kalıbı SAST, paket CVE SCA, dış test DAST. 4. Git’teki sır: hemen iptal/döndür. 5. CSP yokluğu tek başına XSS değil; XSS etkisini artırabilir. 6. `alg=none`: algoritmayı sunucu sabitlemeli, imza/claim doğrula. 7. Yanıtta fazla alan = excessive exposure; istekten yasak alan yazma = mass assignment. 8. `b=5`, `r=1/60`; yaklaşık 65/saat (ilk dolu kova dahil). 9. Şifreleme pickle’ı güvenli yapmaz; yalın veri + doğrulama/MAC. 10. IMDSv2 basit GET’i zorlaştırır, kök SSRF’yi çözmez. 11. Transitif Log4j: SCA/SBOM ile bul, desteklenen düzeltmeyi doğrula. 12. CORS Origin yansıtma + credentials tehlikeli; tam allowlist.

## Sekiz öz test yanıtı

Metadata adresi geçici rol bilgisi verebilir; kör SSRF dış callback/zamanlama/yan etkiyle gözlenebilir; BOLA nesne, BFLA işlev; SBOM transitif Log4j’yi bulmaya yardım eder; JWT politikasını sunucu belirler; Git’ten silmek sırrı iptal etmez; HSTS düşürmeyi, CSP bazı XSS etkilerini azaltır; shift-left erken bulgudur ve Log4Shell için SCA uygundur.
