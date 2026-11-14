## Sınav özeti

- **Simetrik şifreleme:** Şifreleme ve çözme aynı gizli anahtarı kullanır; hızlıdır, anahtar önceden paylaşılmalıdır.
- **Blok şifresi:** Sabit boyutlu blok işler. AES’in blok boyutu 128 bittir; uzun veride çalışma modu gerekir.
- **Akış şifresi:** Anahtar akışını düz metinle XOR’lar. `C=M⊕K`, `M=C⊕K`.
- **Nonce kuralı:** Aynı anahtar + nonce çifti tekrar kullanılmamalıdır. Tekrar, aynı akışı üretir ve `C₁⊕C₂=M₁⊕M₂` sızıntısına yol açar.
- **ChaCha20:** 256 bit anahtar, 96 bit nonce; ARX (toplama, döndürme, XOR) temelli. Poly1305 ile ChaCha20-Poly1305 AEAD kullanılır.
- **RC4:** İstatistiksel yanlılıkları nedeniyle güvensiz ve kullanımdan kaldırılmıştır.
- **Feistel turu:** `Lᵢ=Rᵢ₋₁`, `Rᵢ=Lᵢ₋₁⊕F(Rᵢ₋₁,Kᵢ)`. XOR’un tersinirliği sayesinde F’nin tersinir olması gerekmez; çözmede anahtar sırası tersine döner.
- **DES/3DES:** DES’in 56 bit anahtarı yetersizdir; 3DES’in 64 bit blok sınırı da modern kullanım için sorunludur.
- **Malleability:** Şifreli metin değişikliği çözülmüş veriyi etkileyebilir. Gizlilik tek başına bütünlük sağlamaz; MAC veya AEAD gerekir.
