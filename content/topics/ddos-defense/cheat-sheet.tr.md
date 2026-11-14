## Sınav özeti

| DDoS sınıfı | Tüketilen kaynak       | Örnek                     |
| ----------- | ---------------------- | ------------------------- |
| Hacimsel    | Bant genişliği         | UDP flood, amplification  |
| Protokol    | Bağlantı/durum tablosu | SYN flood                 |
| Uygulama    | CPU, bellek, DB        | HTTP flood / pahalı arama |

- Amplification = yanıt boyutu / sorgu boyutu. 20 Mbit/s × 50 = 1000 Mbit/s ≈ 1 Gbit/s.
- Spoofing, büyük yanıtı kurbana yöneltir. BCP 38 çıkış kaynak doğrulamasını hedefler.
- Savunma: CDN, scrubbing, rate limiting/uygulama kontrolleri, upstream koordinasyonu.
- Kontroller farklı darboğazları çözer; tek bir savunma her DDoS’u durdurmaz.
- Amplifikasyon katları yaklaşıktır ve servis yapılandırmasına göre değişir.
