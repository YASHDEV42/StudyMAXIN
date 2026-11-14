## Paket yakalama ve arayüz kipleri

Ağ arayüzü normalde kendisine yöneltilen çerçeveleri işler. Promiscuous mode arayüzün erişebildiği çerçeveleri daha geniş biçimde yakalamasına; kablosuz monitor mode havadaki çerçeveleri incelemesine yardım eder. Bu kipler switch yalıtımını sihirli biçimde kaldırmaz: switch unicast trafiği hedef MAC’in portuna iletir. Başka bir kullanıcının trafiğini görmek çoğu zaman yerel ağda ARP poisoning gibi aktif bir konum gerektirir.

Wireshark, yakalanan çerçeveyi Ethernet, IP, TCP/UDP ve uygulama protokolü alanlarına ayırır. Şekil 7.2 paket listesini, seçili paketin katman ayrıntılarını ve ham baytları birlikte gösterir. Böylece üçlü TCP el sıkışmasını veya yeniden iletimi gözleyebiliriz. Şifresiz HTTP’de form içeriği okunabilir; TLS içeriği şifreler ve bütünlükle korur. Yine de IP adresi, zamanlama ve hacim gibi metadata görülebilir.

## İki filtre aşaması

BPF capture filter, paket yakalanırken ve dosyaya yazılmadan önce trafiği daraltır. Örneğin belirli host, TCP SYN veya UDP/53 seçilebilir. Wireshark display filter ise mevcut yakalamada `http.request.method` veya `tcp.analysis.retransmission` gibi çözülmüş alanları arar. İlk filtre yakalama kapsamını, ikincisi kayıt içindeki incelemeyi belirler; dilleri ve kullanım zamanları farklıdır.

Pasif dinleme ağa paket eklemeden gözlem yapar ve tespiti zordur. Aktif dinleme (ör. ARP poisoning) trafiğin yolunu değiştirir; daha fazla içerik gösterebilir, fakat anormallik ve yan etki bırakır. tcpdump ve Wireshark hem savunma hem yetkili hata ayıklama araçlarıdır; yalnızca izinli ağlarda kullanılmalıdır. HTTP/TLS ve ARP konuları, yakalanan verinin ne kadarının okunabildiğini açıklar.
