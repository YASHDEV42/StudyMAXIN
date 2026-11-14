## Sınav özeti

| Seçenek | Amaç              | Not                                                                   |
| ------- | ----------------- | --------------------------------------------------------------------- |
| `-sn`   | Host keşfi        | Port taramaz                                                          |
| `-sS`   | SYN/yarı açık TCP | SYN-ACK: açık; RST: kapalı; sessizlik: filtrelenmiş/yanıtsız olabilir |
| `-sT`   | TCP connect       | Tam el sıkışma; daha görünür olabilir                                 |
| `-sU`   | UDP tarama        | Yavaş, DNS/SNMP gibi servisler                                        |
| `-sV`   | Servis sürümü     | CVE eşlemesini kolaylaştırır; açık kanıtı değildir                    |
| `-O`    | OS tahmini        | TCP/IP yığın parmak izi                                               |
| `-p-`   | Tüm portlar       | 1–65535                                                               |

- Port taraması yetkili kapsamla sınırlı olmalı.
- Açık/kapalı/filtrelenmiş sonuçları yanıt türünden çıkarılır; sessizlik kesin tanı değildir.
- Banner gizleme ve gereksiz servisleri kapatma keşfi zorlaştırır; zafiyet yönetimini ikame etmez.
