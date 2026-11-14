## Sınav özeti

- ECC, eğri ayrık logaritma problemine dayanır; benzer güvenlik düzeyinde RSA’dan daha kısa anahtar kullanabilir.
- Eğri modeli: `y²=x³+ax+b`; kriptografide hesap sonlu alanda yapılır.
- Nokta toplama: iki noktadan geçen doğrunun üçüncü kesişimini yansıt; ikiye katlamada teğet kullan.
- Skaler çarpım `Q=kG` ileri yönde hızlı; `G,Q`’dan `k` bulmak ECDLP’dir.
- Kaynak örneği: `y²=x³+2x+2 mod17`, `P=(5,1)`, `λ=13`, `2P=(6,3)`; oyuncak örnek.
- ECDH: `aG`, `bG` değişilir; iki taraf `abG` hesaplar.
- ECDHE oturuma özel gizli değer kullanır; atılırsa ileri gizlilik.
- X25519: anahtar değişimi; Ed25519: imza. Amaçlarını karıştırma.
- ECDSA nonce’u `k` gizli ve tek kullanımlık olmalı; tekrar özel anahtarı açığa çıkarabilir.
- Ed25519 nonce’u belirlenimci türetir; RNG kaynaklı tekrar riskini azaltır.
- RSA/ECC anahtar boyu eşleştirmeleri kaynaktaki yaklaşık değerlerdir.
