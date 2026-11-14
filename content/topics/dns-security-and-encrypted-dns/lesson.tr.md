## DNS çözümleme akışı

DNS, insanlar için okunabilir adları IP adreslerine çeviren dağıtık sistemdir. İstemci genellikle bir recursive resolver’a sorar. Önbellekte yanıt yoksa çözümleyici kök sunucuya, ilgili TLD’ye ve alanın authoritative sunucusuna ilerler; sonucu TTL süresince önbelleğe alır. Şekil 7.4 bu zinciri gösterir. Klasik DNS çoğunlukla UDP/53 üzerinden açık sorgu taşır; sorgu gizli değildir ve imzasız yanıt sahteciliğe açıktır.

## Önbellek zehirleme

Saldırgan, sahte bir ad–IP eşleşmesini recursive resolver’ın önbelleğine yerleştirebilirse, o resolver’ı kullanan birçok kullanıcı yanlış adrese yönlenebilir. Klasik eşleştirmede sorgu kimliği ve kaynak portu yanıtla eşleşmelidir. Kaminsky’nin 2008’de ortaya koyduğu yarış, çözümleyiciyi rastgele alt alan adlarıyla tekrar tekrar yeni sorgular yapmaya zorlayıp sahte NS/glue kayıtlarıyla tüm alanın yetkili yönlendirmesini etkilemeyi amaçlıyordu. Kaynak portu rastgeleleştirme tahmin etmeyi zorlaştırdı; kalıcı doğruluk için DNSSEC imza zinciri gerekir.

## DNSSEC ile DoH/DoT’yi ayırın

DNSSEC, DNS kayıtlarının bütünlüğünü ve yetkili zincirden geldiğini doğrular. Resolver kökün önceden bilinen trust anchor’ından başlar; DNSKEY bölge anahtarını, DS delegasyon bağını, RRSIG kayıt imzasını sağlar. Zincirin bir halkası doğrulanmazsa yanıt güvenilir sayılmaz. Sayfa 285’teki görsel bu kökten alt bölgeye uzanan zinciri ve `dig +dnssec` çıktısındaki `ad` doğrulama bayrağını gösterir.

DoT sorguları TLS ile genellikle 853 portunda, DoH HTTPS ile genellikle 443’te şifreler. Böylece ağ üzerindeki gözlemci sorgu adını doğrudan okuyamaz; fakat bu taşıma şifrelemesi, yanıtın DNSSEC gibi yetkili imzasını kendiliğinden doğrulamaz. DNSSEC gizlilik sağlamaz. İki koruma birlikte kullanılabilir. Şifreli DNS dahi bağlanılan IP’yi veya bütün trafik örüntülerini gizlemez. Önceki kriptografi bölümündeki imza (bütünlük/kaynak) ve şifreleme (gizlilik) ayrımı burada da geçerlidir.
