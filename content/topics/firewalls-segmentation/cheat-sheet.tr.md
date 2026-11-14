## Sınav özeti

| Kontrol           | Gördüğü                 | Sınır                                  |
| ----------------- | ----------------------- | -------------------------------------- |
| Paket filtre      | IP, port                | Bağlantı durumunu bilmez               |
| Stateful firewall | Durum + IP/port         | Uygulama içeriği sınırlı               |
| NGFW              | Uygulama/kullanıcı, IPS | Şifreli trafik görüşü sınırlı olabilir |
| WAF               | HTTP içerik             | Web uygulama katmanı                   |

- Deny by default: açıkça izin verilmeyen akış düşürülür. Kural sırası önemlidir.
- DMZ internete açık servisleri iç ağdan ayırır; iki ayrı politika sınırı kullanılır.
- VLAN mantıksal ayrım; mikro-segmentasyon iş yükü bazlı ayrım.
- Segmentasyon yanal hareketi sınırlar; dış firewall tek başına iç yayılmayı durdurmaz.
- SASE bulut üzerinden dağıtık erişim/güvenlik hizmetleri yaklaşımıdır.
