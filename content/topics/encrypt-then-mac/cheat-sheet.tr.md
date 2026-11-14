## Sınav özeti

- Genel yaklaşım: **Encrypt-then-MAC** — önce şifrele, şifreli metne MAC uygula.
- Alıcı önce etiketi doğrular; başarısızsa çözmeden reddeder.
- Amaç, değiştirilmiş girdinin padding/çözme davranışından bilgi sızdırmasını engellemektir.
- MAC’in kapsadığı alan ve karşılaştırma davranışı da protokol tasarımına bağlıdır.
- AEAD (AES-GCM, ChaCha20-Poly1305) gizlilik + doğrulamayı tek arayüzde birleştirir.
- Güvenilir kütüphane kullan; nonce kurallarına uy; kendi kombinasyonunu tasarlama.
