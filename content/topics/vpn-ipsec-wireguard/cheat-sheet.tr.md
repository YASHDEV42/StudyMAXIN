## Sınav özeti

- VPN tüneli: iç paketi kapsüller ve iki uç arasında şifreler; VPN çıkışından sonraki trafik ayrıca TLS gerektirebilir.
- IPsec transport: yük korunur; tunnel: iç IP paketi yeni dış başlıkla sarılır.
- AH: bütünlük/kimlik, şifreleme yok. ESP: şifreleme ve bütünlük/kimlik sağlayabilir.
- IKE: IPsec anahtar değişimi/kimlik doğrulama ve güvenlik ilişkileri.
- WireGuard: Noise `IKpsk2`, X25519, ChaCha20‑Poly1305, BLAKE2s, HKDF; sabit kripto takımı.
- Geçici anahtarlar ileri gizliliğe katkı sağlar. `AllowedIPs` anahtarı izinli IP aralıklarıyla eşler.
- `0.0.0.0/0` full tunnel; belirli kurum alt ağı split tunnel.
- IPsec/WireGuard karşılaştırması bağlama bağlıdır; ürün özelliği genel mutlak üstünlük kanıtı değildir.
