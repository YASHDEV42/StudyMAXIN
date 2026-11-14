## Güvenlik duvarı türleri

Paket filtreleme kaynak/hedef IP ve portu her pakette bağlamdan bağımsız değerlendirir. Stateful firewall bağlantı durumunu izler; içeriden başlatılan bağlantının dönüşünü, beklenmeyen dış paketten ayırır. NGFW uygulama/kullanıcı farkındalığı ve IPS işlevi ekleyebilir; şifreli trafiğin içeriğini inceleme kapasitesi sınırlıdır veya TLS denetimi gerektirir. WAF HTTP uygulama katmanına bakar ve SQL injection/XSS gibi web isteklerini ele alır. Bu bileşenler farklı katmanları korur.

Örnek güvenli politika varsayılan ret uygular, loopback’e izin verir, established/related dönüş paketlerini kabul eder, SSH’ı yönetim alt ağıyla sınırlar ve HTTPS’i açar. Kural sırası ve gereğinden geniş izinler sonucu belirler; stateful olmak tek başına güvenli politika demek değildir.

## DMZ, VLAN ve mikro-segmentasyon

Segmentasyon, ele geçirilen bir sunucudan kurumun geri kalanına yanal hareketi zorlaştırmak için ağı güven bölgelerine böler. DMZ’de internetten erişilebilir web/e-posta sunucuları bulunur; dış ve iç güvenlik duvarları, DMZ’den hassas veritabanlarına yalnızca gerekli akışları açar. VLAN aynı fiziksel altyapıda mantıksal ağlar kurar, ancak trunk/access yapılandırması doğru olmalıdır. Mikro-segmentasyon politikayı her iş yüküne yaklaştırır; yalnızca kurum içi ağda bulunmak güven kanıtı sayılmaz.

SASE, güvenli ağ erişimi ve bulut denetimlerini kullanıcıya yakın servis noktalarında sunan mimari yaklaşımdır. Buluta taşınmak politika, kimlik ve izleme ihtiyacını ortadan kaldırmaz. Bu, önceki haftalardaki sıfır güven ve en az ayrıcalık ilkelerinin ağ düzeyinde uygulanmasıdır.
