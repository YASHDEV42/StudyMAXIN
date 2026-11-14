## Sınav özeti

- Şifreleme gizlilik sağlar; MAC bütünlük ve paylaşılan anahtar üzerinden mesaj kökeni doğrulaması sağlar.
- MAC ortak sırrı bilen taraflarca üretilebilir; dijital imza gibi inkâr edilemezlik sağlamaz.
- HMAC: `H((K⊕opad) ‖ H((K⊕ipad) ‖ m))`; naif `H(secret‖message)` yerine kullanılır.
- **Encrypt-then-MAC:** önce şifrele, sonra şifreli metni doğrula; alıcı çözmeden önce etiketi denetler.
- AEAD (AES-GCM, ChaCha20-Poly1305) gizlilik ve doğrulamayı birlikte sunar.
- GCM/GHASH ve Poly1305 farklı yapılardır; protokolün nonce ve etiket kurallarını aynen uygula.
- Etiket başarısızsa mesajı reddet; etiketin kendisi içeriği gizlemez.
