## VPN, HTTPS ve DNS korumaları

VPN, cihaz ile VPN sunucusu arasındaki bölümü şifreler; sunucudan sonraki internet trafiği ayrıca HTTPS değilse açık olabilir. HTTPS ise tarayıcı ile hedef sunucu arasında uygulama içeriğini korur. İki teknoloji farklı güven sınırlarında çalışır ve birlikte kullanılabilir.

DoH/DoT, DNS sorgusunu seçilen çözümleyiciye kadar şifreler; bağlanılan IP adresini veya tüm trafik örüntülerini gizlemez. DNSSEC yanıtın imza zincirini doğrular, sorguyu şifrelemez. NAT gelen bağlantıyı zorlaştırabilir ama güvenlik duvarı politikası değildir; içeriden başlatılan trafiği genel olarak denetlemez.

## İç ağ otomatik güvenli değildir

Çevre firewall’ı içeri sızmış saldırganın yanal hareketini kendiliğinden durdurmaz. Segmentasyon bölgeler arası erişimi kısıtlar. Switch unicast trafiği genelde yalnız hedef porta gönderir; fakat ARP poisoning veya MAC flooding bazı koşullarda bu yalıtımı bozmaya çalışır. “İç ağda” olmak kimlik veya yetki kanıtı değildir; sıfır güven yaklaşımında her istek bağlama göre doğrulanır.

## Kontrollerin kapsamı

Şifreleme DDoS’u önlemez; IDS alarm verirken IPS engelleyebilir ama yanlış pozitifle meşru trafiği kesebilir. VPN ele geçirilmiş uç cihazı düzeltmez; firewall uygulama açığını ortadan kaldırmaz; DNSSEC gizlilik sağlamaz. Her kontrolde hangi CIA hedefinin, hangi uçtan uca bölümde ve hangi koşullarda korunduğunu sorun. Bu haftanın kavramları, birinci haftadaki CIA ve güven sınırı düşüncesini somutlaştırır.
