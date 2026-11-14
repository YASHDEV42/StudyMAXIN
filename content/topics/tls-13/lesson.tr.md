## TLS’in görevi

TLS (Transport Layer Security), HTTPS bağlantısının güvenlik protokolüdür. ECDHE ile ortak sır kurar, X.509 sertifikasıyla sunucunun kimliğini doğrular ve ardından simetrik AEAD şifrelemesiyle HTTP verisini korur. TLS 1.3 (2018), eski SSL/TLS seçeneklerini temizleyip el sıkışmayı sadeleştirdi; statik RSA anahtar değişimi yerine geçici anahtar değişimi kullandığından ileri gizliliği destekler.

## El sıkışma akışı

İstemci `ClientHello` içinde sürüm ve algoritma seçenekleriyle geçici ECDHE açık değerini gönderir. Sunucu `ServerHello` ve kendi geçici değerini yollar. Taraflar ortak sırrı yerel hesaplar; sır ağdan geçmez. Bu sırdan el sıkışma anahtarları türetilir. Şifreli el sıkışma içinde sunucu sertifikasını ve `CertificateVerify` imzasını gönderir. İstemci sertifika zincirini, alan adını ve el sıkışma imzasını doğrular. İki tarafın `Finished` mesajı, el sıkışma içeriğinin değiştirilmediğini doğrular. Sonrasında HTTP kayıtları AES-GCM veya ChaCha20-Poly1305 gibi AEAD ile korunur.

`TLS_AES_256_GCM_SHA384` adı TLS 1.3’te veri şifresini, GCM kipini ve SHA-384’ü belirtir. Anahtar değişimi ile sertifika imza algoritması takım adının dışındadır; seçenekleri azaltmak hatalı yapılandırma olasılığını da düşürür. `openssl s_client` çıktısında sertifika zinciri ve `Verification: OK` görülebilir; bu sonuç ilgili istemcinin o anda yaptığı doğrulamayı gösterir.

## Anahtar türetme ve nonce

ECDHE’den çıkan ham sır, her amaç için doğrudan kullanılmaz. HKDF önce `Extract` ile girdi sırrını işler, sonra `Expand` ile etiketlenmiş, birbirinden ayrılmış handshake ve uygulama anahtarları üretir. İstemci→sunucu ve sunucu→istemci anahtarları da ayrıdır. Kayıt katmanındaki AEAD her kayıt için benzersiz nonce ister. TLS 1.3, yön başına IV ile kayıt sıra numarasını birleştirerek nonce tekrarını protokol düzeyinde önler.

## İleri gizlilik, PSK ve 0-RTT

Geçici ECDHE değerleri oturuma özeldir ve oturumdan sonra silinir. Sunucunun uzun süreli imza anahtarının daha sonra çalınması, eski oturum sırlarını tek başına vermez; buna ileri gizlilik denir. PSK ile oturum sürdürme gecikmeyi azaltır. Taze ECDHE ile birlikte kullanım yeni gizlilik sağlar; yalnız PSK kullanımı aynı özelliği zayıflatabilir. 0-RTT ilk veriyi beklemeden yollayabilir ama saldırgan aynı isteği yeniden oynatabilir. Bu nedenle yalnızca yinelenmesi zararsız işlemlerde kullanılmalıdır.

## Ek korumalar

Downgrade koruması `ServerHello` içindeki özel işaretle daha eski sürüme zorlama girişimini saptar. HSTS alan adını HTTPS’e sabitler; preload ilk ziyaretten önce de bu politikayı uygulatabilir. DNS CAA kayıtları hangi CA’ların alan adına sertifika verebileceğini sınırlar. Certificate pinning uygulamayı belirli anahtar/CA ile sınırlar; yanlış anahtar döndürme hizmeti kilitleyebileceğinden dikkatli yönetilmelidir. mTLS istemcinin de sertifika sunmasını sağlar; mikroservis ve cihaz iletişiminde yararlı, insan tarayıcılarında yönetimi zahmetlidir. ACME, Let’s Encrypt gibi CA’lardan sertifika alma ve yenilemeyi otomatikleştirir.

**Öğretici ek:** TLS kanal güvenliği sağlar; uygulama isteğinin güvenli veya zararsız olduğunu garanti etmez. 0-RTT uygunluğu uygulama işleminin tekrar edilebilirliğine bağlıdır.

İlişkili konular: [Diffie–Hellman anahtar değişimi](topic:diffie-hellman-key-exchange) · [PKI sertifikaları](topic:pki-certificates).
