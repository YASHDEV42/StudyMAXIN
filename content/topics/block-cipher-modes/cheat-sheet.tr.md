## Sınav özeti

| Kip | Temel davranış                                 | Koşul / sınırlama                                              |
| --- | ---------------------------------------------- | -------------------------------------------------------------- |
| ECB | Blokları bağımsız şifreler                     | Aynı blok aynı çıktı; örüntü sızdırır, kullanma                |
| CBC | Açık blok önce önceki şifreli blokla XOR’lanır | IV ve padding gerekir; sıralıdır, tek başına bütünlük yok      |
| CTR | AES(nonce‖sayaç) anahtar akışını üretir        | Paralel, padsiz; aynı anahtar altında nonce/sayaç tekrarlanmaz |
| GCM | CTR + GHASH kimlik doğrulama etiketi           | AEAD; nonce tekrarı gizlilik ve bütünlük için tehlikelidir     |

- CBC: `Cᵢ=Eₖ(Pᵢ⊕Cᵢ₋₁)`, `Pᵢ=Dₖ(Cᵢ)⊕Cᵢ₋₁`, `C₀=IV`.
- CTR tekrarında `C₁⊕C₂=P₁⊕P₂`; CTR’de bit çevirme mümkündür.
- Padding oracle, padding geçerliliğinin farklı hata veya süreyle açığa çıkmasıdır.
- AEAD gizlilik + bütünlük/özgünlük doğrulaması sağlar; associated data gizli değildir ama doğrulanır.
- AES-GCM ve ChaCha20-Poly1305 yaygın AEAD örnekleridir. Etiket geçersizse veriyi reddet.
- IV/nonce gizli olmak zorunda değildir; benzersizlik/tazelik koşulları kipin belirtimine göre sağlanmalıdır.
