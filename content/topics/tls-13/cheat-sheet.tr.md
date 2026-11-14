## TLS 1.3 sınav özeti

- Akış: `ClientHello` + istemci ECDHE → `ServerHello` + sunucu ECDHE → şifreli sertifika ve `CertificateVerify` → iki `Finished` → AEAD ile uygulama verisi.
- Ortak sır ECDHE ile hesaplanır; ağdan gönderilmez. Sertifika zinciri ve alan adı doğrulaması kimliği bağlar.
- TLS 1.3 cipher suite: ör. `TLS_AES_256_GCM_SHA384` = AES-256 + GCM + SHA-384. Anahtar değişimi/kimlik imzası isimde değildir.
- HKDF: Extract ardından Expand; el sıkışma/uygulama ve iki trafik yönü için ayrılmış anahtarlar.
- AEAD nonce aynı anahtar altında tekrarlanmamalı; TLS 1.3 IV + sıra numarasından üretir.
- İleri gizlilik: oturuma özgü ECDHE sırrı silinir; sunucunun kalıcı imza anahtarının sonradan sızması geçmiş sırrı vermez.
- PSK resumption hızlandırır. PSK + taze ECDHE ileri gizliliği korur.
- 0-RTT replay’e açıktır: yalnızca yinelenmesi yan etki doğurmayan isteklerde.
- Downgrade işareti eski sürüme zorlama girişimini belirler. HSTS HTTPS zorunluluğu; CAA yetkili CA listesi; pinning belirli anahtar/CA ile sınırlar (hatalı yönetim kilitlenme yaratabilir); mTLS iki taraflı sertifika kimliği; ACME otomatik yönetim.
- TLS bağlantıyı korur; uygulama içeriğinin güvenli olduğunu kanıtlamaz.
