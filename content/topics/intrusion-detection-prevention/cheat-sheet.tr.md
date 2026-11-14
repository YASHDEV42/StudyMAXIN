## Sınav özeti

- IDS: izler ve alarm verir. IPS: inline trafik üzerinde engeller; yanlış pozitif hizmeti kesebilir.
- İmza tabanlı: bilinen örüntüde isabetli, düşük yanlış alarm; zero-day ve low-and-slow kaçabilir.
- Anomali tabanlı: yeni sapmaları yakalayabilir; normal davranışı modellemek zor, yanlış pozitif yüksek olabilir.
- Kural alanları: `alert`, protokol/yön, `flow`, `flags`, `threshold`, `sid`, `rev`; IPS engellemesi `drop` olabilir.
- `count 5, seconds 30, track by_src`: bir kaynaktan 30 saniyede 5 eşik.
- Tespit sensörün konumuna ve görebildiği şifreli/açık alanlara bağlıdır.
