## 15 alıştırmadan sınavda hatırla

1. Simetrik çift anahtarı: `n(n−1)/2`; açık anahtar: `2n`.
2. DH: `A=g^a mod p`, `B=g^b mod p`, `K=B^a=A^b mod p`.
3. RSA: `n=pq`, `φ=(p−1)(q−1)`, `gcd(e,φ)=1`, `ed≡1 modφ`.
4. Gizlilik: alıcının açık anahtarıyla şifrele. İmza: gönderenin gizli anahtarıyla imzala.
5. Sertifika zinciri yerel güvenilir köke bağlanmalı; ad ve zaman da doğrulanır.
6. İleri gizlilik: geçici ECDHE sırları silinir.
7. PQC önceliği = verinin saklı kalma süresine göre.
8. Square-and-multiply `7¹³ mod11=2`; ikili üs gösterimiyle çarpma sayısı azalır.
9. Textbook RSA deterministik ve çarpımsal biçimde şekillendirilebilir; şifrelemede OAEP kullan.
10. ECDSA nonce tekrarından `k=(h1−h2)/(s1−s2) modq`, `d=(s1k−h1)/r modq`.
11. TLS 1.3 suite `TLS_AES_128_GCM_SHA256`: şifre/kip/hash; ECDHE değişimi ayrı.
12. CRL liste, OCSP sorgu, stapling sunucudan taze yanıt.
13. ECC modüler nokta toplama: iki farklı nokta için `λ=(y₂−y₁)/(x₂−x₁)`; sonra `x₃=λ²−x₁−x₂`, `y₃=λ(x₁−x₃)−y₁`.
14. RSA-CRT hatalı imzası çarpan sızdırabilir; imzayı yayımlamadan doğrula.
15. TLS HKDF ayrı anahtarlar türetir; AEAD nonce her anahtar altında benzersiz olmalı.
