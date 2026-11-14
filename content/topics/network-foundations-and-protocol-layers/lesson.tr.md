## İnternetin başlangıç varsayımları

Kitabın girişindeki tasarım motivasyonu, düşmanca bir gözlemciyi durdurmaktan çok bir düğüm arızalansa bile ağın çalışmasını sürdürmekti; varsayım küçük ve işbirliğine dayalı bir araştırma topluluğuydu. ARPANET 1969’da araştırma bilgisayarlarını bağlamak için kuruldu; farklı ağları ortak paketlerle konuşturma fikri TCP/IP ile ölçeklendi. İlk tasarımın önceliği birlikte çalışabilirlikti. IP kaynak adresi gönderenin gerçekten o adresin sahibi olduğunu kanıtlamaz; TCP başlıkları da tek başına şifreleme veya kimlik doğrulama sağlamaz. TLS, IPsec ve DNSSEC gibi güvenlik katmanlarının sonradan eklenmiş olması, ağ güvenliğinin neden katmanlı düşünülmesi gerektiğini açıklar.

## TCP/IP katmanları ve kapsülleme

Eğitimde yedi katmanlı OSI modeli yararlıdır; internette çoğunlukla dört katmanlı TCP/IP görünümü kullanılır: uygulama (HTTP, DNS), taşıma (TCP, UDP), internet (IP, ICMP) ve ağ erişimi (Ethernet, ARP, Wi‑Fi). Tarayıcı HTTP isteği oluşturur. TCP kaynak/hedef portlarını, sıra ve onay numaralarını ekler; IP kaynak/hedef adreslerini; Ethernet ise yerel bağlantıdaki MAC adreslerini ekler. Bu kapsüllemedir. Alıcı başlıkları ters sırayla açar. Yönlendirici bir sonraki bağlantı için Ethernet çerçevesini yeniden kurar; MAC adresleri bağlantı başına değişirken IP hedefi normalde uç hedefi gösterir (NAT gibi dönüşümler istisnadır).

| Bilgi            | Katman     | İşlev                       |
| ---------------- | ---------- | --------------------------- |
| MAC (48 bit)     | Ağ erişimi | Yerel ağda çerçeve teslimi  |
| IP (IPv4 32 bit) | İnternet   | Ağlar arası yönlendirme     |
| Port (16 bit)    | Taşıma     | Makinedeki uygulamayı seçme |

IPv4 başlığında TTL yönlendirme döngülerini sınırlar; protokol alanı yükün TCP, UDP veya ICMP olduğunu belirtir. Parçalama alanları büyük datagramların yeniden birleştirilmesini sağlar; farklı parçaları farklı yorumlayan güvenlik araçları atlatılabilir. Başlık checksum’ı kriptografik imza değildir; gönderen kimliğini doğrulamaz. TCP başlığı portlar, 32 bit sıra/onay numaraları, SYN/ACK/FIN/RST gibi bayraklar ve pencere bilgisi taşır. Bunlar bağlantı durumunu yönetir, fakat kendiliğinden gizlilik veya kimlik kanıtı sağlamaz.

## TCP, UDP ve güvenlik sınırı

TCP bağlantı kurar, sıralı ve güvenilir bayt akışı sağlar, kayıpları yeniden gönderir; bunun karşılığında durum ve gecikme maliyeti vardır. UDP bağlantı durumu ve teslim garantisi olmadan datagram yollar; DNS, ses/video ve oyunlar gecikme gereksinimlerine göre kullanabilir. Protokol seçimi güvenlik garantisi değildir: UDP de güvenli bir üst katmanla korunabilir, TCP de şifresiz kalabilir.

NAT, çok sayıda özel adresi genel adrese eşleyebilir ve istenmeyen dış bağlantıları tesadüfen zorlaştırabilir; güvenlik duvarı politikasının yerini tutmaz. IPv6 daha geniş adres alanı sağlar, fakat açıkça filtrelenmeyen IPv6 yolu ayrı bir saldırı yüzeyi olabilir. Bölümün geri kalanında her tehdidi katmanına yerleştireceğiz: yerel saldırganın erişebildiği ARP ile uzaktaki saldırganın erişebildiği IP/TCP aynı güven sınırında değildir. Önceki bölümlerdeki tehdit modelleme sorularını uygulayın: saldırgan nerede, hangi başlığı görebilir/değiştirebilir ve uçtan uca hangi koruma var?
