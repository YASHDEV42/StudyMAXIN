## Sınav özeti

| Saldırı                 | Zayıflık                                               | Kontrol                                |
| ----------------------- | ------------------------------------------------------ | -------------------------------------- |
| ARP poisoning           | ARP yanıtı kimliği doğrulanmaz; sahte IP–MAC eşleşmesi | DAI, DHCP snooping, TLS                |
| MAC flooding            | CAM tablosu sınırlı                                    | Port başına MAC sınırı                 |
| Rogue DHCP / starvation | DHCP sunucusu/istemci güveni ve adres havuzu           | DHCP snooping, port güvenliği          |
| VLAN hopping            | Hatalı trunk/access yapılandırması                     | Portları sabitleme, trunk sıkılaştırma |

- ARP aynı yerel yayın alanındadır; saldırganın yerel erişimi gerekir.
- İki yönlü ARP zehirleme trafiği saldırgan üzerinden geçirerek MITM oluşturur.
- TLS içeriği korur, erişilebilirliği değil.
- DAI IP–MAC bağlamasını denetler; DHCP snooping yetkisiz DHCP yanıtlarını sınırlar.
