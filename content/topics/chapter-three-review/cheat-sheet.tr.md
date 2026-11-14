## Bölüm 3 hızlı tekrar

- Simetrik anahtar sayısı: `n(n−1)/2`; açık anahtarlı model: `2n`.
- Modüler üs alma kolay, ayrık logaritma / büyük sayı çarpanlama zor.
- Ham DH kimlik doğrulamaz; imza ve sertifika ile bağla.
- RSA: `n=pq`, `φ=(p−1)(q−1)`, `ed≡1 modφ`; textbook RSA kullanma.
- ECC daha küçük anahtarlarla benzer güvenlik düzeyi sunabilir.
- Kendinden imzalı sertifika kendi kimliğini söyler, güven kökü olduğunu kanıtlamaz.
- TLS 1.3 ECDHE + sertifika/imza + HKDF + AEAD; ileri gizlilik sağlar.
- Heartbleed: uzunluk sınırı denetlenmedi, bellek sızdı; algoritma kırılmadı.
- “Şimdi topla, sonra çöz”: uzun ömürlü sırları PQC geçişinde önceliklendir.
- Hibrit PQC: klasik + post-kuantum ortak sır; her iki bileşen doğru bağlanmalı.
- Bölümün ana dersi: algoritma, uygulama, anahtar yönetimi ve kimlik doğrulama beraber güvenlik sağlar.
