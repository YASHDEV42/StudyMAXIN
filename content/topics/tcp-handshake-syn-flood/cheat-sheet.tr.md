## Sınav özeti

- TCP 3-way handshake: `SYN(seq=x) → SYN-ACK(seq=y, ack=x+1) → ACK(ack=y+1)`.
- SYN’den sonra ayrılan, ACK bekleyen kayıt: half-open; backlog dolarsa yeni bağlantılar etkilenir.
- 512 yuva / 1000 SYN/s ≈ 0,512 saniye kaba dolma süresi; zaman aşımı ve sistem ayrıntıları sonucu değiştirir.
- SYN cookies: bağlantı durumunu ilk SYN’de saklamadan, doğrulanabilir bilgiyi SYN-ACK sıra numarasına kodlar; ACK doğrulanınca kayıt açılır. TCP seçeneklerinde sınırlama olabilir.
- BCP 38 kaynak adresi doğrulaması, sahte kaynaklı paketleri sağlayıcı çıkışında azaltır.
- RST injection bağlantıyı keser; session hijacking akışa veri eklemeyi hedefler. Trafiği görme/sıra numarası koşulu önemlidir.
- TLS içeriği korur; tek başına DoS’u veya bağlantı kesilmesini engellemez.
