## Sınav özeti

| Tür                         | Algoritma | Etki                                                    | Temel yanıt                                                      |
| --------------------------- | --------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| Simetrik (AES)              | Grover    | Anahtar aramasını yaklaşık karekök hızlandırır          | Anahtar boyunu artır; AES-256 yaklaşık AES-128 klasik payı verir |
| Açık anahtarlı (RSA/DH/ECC) | Shor      | Çarpanlara ayırma / ayrık logaritmayı verimli çözebilir | Post-kuantum matematiğe geç                                      |

- `2^128` simetrik arama yaklaşık `2^64` kuantum adımına iner (teorik karşılaştırma).
- Shor etkisi Grover gibi basit anahtar uzatma ile telafi edilmez.
- “Şimdi topla, sonra çöz”: uzun ömürlü sır içeren şifreli veriyi bugün toplayıp gelecekte çözme tehdidi.
- Bugünkü kuantum cihazları RSA-2048’i kıramaz; tehdit yeterince büyük ve kararlı gelecek donanım varsayımına bağlıdır.
- NIST post-kuantum örnekleri: ML-KEM, ML-DSA, SLH-DSA.
