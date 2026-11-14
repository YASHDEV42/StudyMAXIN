## Sınav özeti

- Sezar: `VHODP` → 3 geri → `SELAM`; küçük anahtar uzayı.
- OTP tekrarı: `C₁⊕C₂=M₁⊕M₂`; anahtar bir kez kullanılır.
- Gizlilik + bütünlük: AEAD (AES-GCM / ChaCha20-Poly1305), benzersiz nonce.
- Parola: benzersiz salt + Argon2id gibi yavaş parola karması; yalın SHA-256 kullanma.
- n bit hash çakışma araması yaklaşık `2^(n/2)`; SHA-256 ≈128 bit, 32 bit ≈65.536 deneme.
- GF(2⁸): `0x57·0x13=0xFE` (indirgeme polinomu 0x11B).
- Feistel: `Lᵢ₋₁=Rᵢ⊕F(Lᵢ,Kᵢ)`; F tersinir olmak zorunda değil.
- CBC’de `Cᵢ` hatası: `Pᵢ` bozulur, `Pᵢ₊₁` karşılık gelen biti değişir.
- GCM nonce tekrarı gizlilik ve doğrulama için ağır risk.
- HMAC, naif `H(secret‖message)` yerine; length extension’a dayanıklı yapı.
- Argon2id: bellek/zaman/paralellik gerçek sistemde ayarlanır; örnek parametreler evrensel reçete değildir.
- Grover simetrik anahtar aramasını karekök hızlandırır; Shor RSA/DH/ECC varsayımlarını tehdit eder.
- Kaynak 2.11 ve hafta özeti fiziksel sayfa 11’de biter; sayfa 12, 3. haftadır.
