## ARP neyi çözer?

Aynı yerel bağlantıdaki bir cihaza IP paketi göndermek için Ethernet çerçevesinde hedef MAC adresi gerekir. ARP, yayın alanına “bu IP adresi kimde?” sorusu gönderir; ilgili cihaz MAC adresiyle cevaplar ve eşleşme önbelleğe alınır. Klasik ARP yanıtı kriptografik olarak doğrulamaz. Bu nedenle saldırganın genellikle hedefle aynı yerel ağda bulunması gerekir; internet üzerinden uzaktaki bir saldırgan doğrudan aynı ARP yayın alanına katılamaz.

## ARP zehirleme ve MITM

Saldırgan kurbana “ağ geçidinin IP’si benim MAC’imde”, ağ geçidine de “kurbanın IP’si benim MAC’imde” şeklinde sahte eşleşme duyurur. İki yönlü trafik saldırganın makinesinden geçer. İletmeyi sürdürürse MITM konumu sessiz kalabilir; iletmezse bağlantı kesilir ve saldırı fark edilir. Şifresiz HTTP/FTP içeriği okunabilir. TLS sertifikası ve kayıt bütünlüğü doğru doğrulanıyorsa saldırgan şifreli içeriği okuyamaz veya fark edilmeden değiştiremez; ancak trafiği kesebilir.

Koruma anahtar düzleminde ve uçlarda birlikte gerekir: Dynamic ARP Inspection (DAI), DHCP snooping bağlaması, port güvenliği ve VLAN segmentasyonu sahte yerel duyuruları zorlaştırır. Statik ARP yalnızca küçük ve kontrol edilebilir ağlarda yönetilebilir. Şekil 7.1’deki ağ anahtarı, çerçevelerin yerel MAC hedeflerine göre iletildiğini gösterir.

## Diğer Katman 2 riskleri

MAC flooding, anahtarın CAM tablosunu sahte adreslerle doldurur; port başına MAC sınırı etkisini azaltır. DHCP starvation IP havuzunu tüketir; rogue DHCP kurbanlara saldırganın ağ geçidi veya DNS ayarlarını dağıtarak MITM’e zemin hazırlar. DHCP snooping yalnızca yetkili portlardan sunucu yanıtlarına izin verir. VLAN hopping yanlış trunk/access yapılandırmasından yararlanır; erişim portlarını sabitlemek ve gereksiz trunk’ları kapatmak gerekir. Her savunmanın yapılandırmaya bağlı olduğu unutulmamalıdır. Bu konular, önceki haftalardaki oturum ve erişim kontrolünün ağ erişim katmanında da karşılığı olduğunu gösterir.
