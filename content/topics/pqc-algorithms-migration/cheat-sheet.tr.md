## PQC sınav özeti

- LWE sezgisi: `As=b` çözümü kolay; `As+e=b` küçük hata vektörü bilinmeyeni bulmayı zorlaştırır. Bu bir hesaplama varsayımıdır, çözülemezlik ispatı değildir.
- FIPS 203 ML-KEM: ortak sır kuran KEM; Kyber kökenli. KEM, veri şifrelemesinin kendisi değildir.
- FIPS 204 ML-DSA: kafes tabanlı imza; Dilithium kökenli.
- FIPS 205 SLH-DSA: stateless hash tabanlı imza; SPHINCS+ kökenli, varsayım çeşitliliği; daha büyük imza.
- Kaynak örnek boyutları: X25519 pub 32 B / ML-KEM-768 pub 1184 B; Ed25519 pub 32 B, imza 64 B / ML-DSA-65 pub 1952 B, imza 3309 B.
- Hibrit: klasik X25519 sırrı + ML-KEM sırrı → bağlam etiketli HKDF → oturum anahtarı. Birleştirme doğru tasarlanmalı.
- Crypto-agility: algoritmayı değiştirilebilir tut; envanter çıkar; uzun gizlilik ömürlerini önceliklendir.
- Kaynağın 2030/2035 tarihleri yol haritası çıpasıdır, evrensel kesin son tarih değildir; güncel NIST rehberini kontrol et.
