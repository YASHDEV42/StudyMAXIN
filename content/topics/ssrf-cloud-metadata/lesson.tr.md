## Neden SSRF sunucunun güvenini hedef alır?

Önceki bölümde SQL enjeksiyonu ve XSS gibi, çoğunlukla kullanıcı girdisinin tarayıcıya veya sorguya karıştığı açıkları gördük. Modern uygulamada ise sunucular başka sunuculara, bulut hizmetlerine ve mikroservislere sürekli istek gönderir. Kullanıcının verdiği bir URL’yi sunucunun alıp kendi ağından ziyaret etmesi, bu bağlantı yeterince kısıtlanmadığında Sunucu Taraflı İstek Sahteciliği (Server-Side Request Forgery, SSRF) doğurur.

Bir elçi benzetmesi düşün: dışarıdan gelen kişi binaya giremiyor, fakat içerideki görevli her yere erişebiliyor. Saldırgan görevliyi kendi adına bir adrese göndermeye ikna ederse, güvenlik duvarının arkasına dolaylı erişim kazanabilir. Buradaki temel hata, güvenilmeyen URL’nin sunucunun daha ayrıcalıklı ağ konumunda kullanılmasına izin verilmesidir. Her yazılım bileşeni arasında bir güven sınırı vardır; API ağ geçidinde kimlik doğrulama yapılmış olması, sonraki mikroservisin kullanıcının belirli nesneye erişme yetkisini ayrıca denetleme ihtiyacını ortadan kaldırmaz.

## İstek nasıl bulut kimlik bilgilerine uzanabilir?

Küçük resim oluşturma, webhook çağırma veya PDF’ye uzaktaki kaynakları ekleme gibi işlevler sunucudan başka adrese bağlantı kurmasını ister. Güvensiz bir uç nokta kabaca kullanıcıdan `url` alıp HTTP istemcisine verir ve yanıt gövdesini geri döndürür. Saldırgan bu işlevi dışarıdan erişilemeyen `localhost`, yönetim servisi veya iç ağ adresine yöneltebilir. Yanıt kullanıcıya dönüyorsa buna yanıtlı SSRF denir; sunucu istek yapıp yanıtı göstermiyorsa kör SSRF söz konusudur. Kör SSRF’de bile dışarıdaki gözlem sunucusuna gelen istek, zaman farkları veya tetiklenen bir iç işlem zafiyetin etkisini gösterebilir.

Bulut sanal makinelerinde metadata hizmeti, makineye ait bilgileri ve yapılandırmaya bağlı geçici kimlik bilgilerini sağlayabilir. `169.254.169.254` gibi link-local bir adres internetten erişilemezken, makinenin kendisinden erişilebilir olabilir. SSRF ile bu hizmete ulaşılıp bir rolün geçici anahtarları alınırsa, saldırgan artık o role tanımlanan yetkilerle işlem yapabilir. Zincirin her halkası koşulludur: hizmet erişilebilir olmalı, gerekli yanıt veya yan etki oluşmalı, kimlik bilgisi kullanılabilir olmalı ve rolün izinleri saldırganın istediği kaynağa uzanmalıdır. En az ayrıcalıklı rol, sonraki zararı sınırlar.

Kaynak, 2019 Capital One ihlalini bu zincirin somut örneği olarak anlatır: yanlış yapılandırılmış bileşen metadata hizmetine yönlendirildi, bileşenin bulut rolüne bağlı geçici kimlik bilgileri elde edildi ve depolama kaynaklarına erişildi. Buradan çıkarılacak temel ders tek bir olayın ayrıntısını ezberlemek değil; dış girdinin sunucu isteğine, sunucu isteğinin kimlik bilgisine, kimlik bilgisinin de gerçek bir erişim yetkisine dönüşebildiğini görmektir.

## Türler ve doğrulama tuzakları

Yanıtlı SSRF, iç hizmetin içeriğini doğrudan açığa çıkarabilir. Kör SSRF yanıtı saklar fakat ağ etkileşimi veya yan etki yaratabilir. Ayrıca DNS rebinding, yalnızca alan adını bir kez çözüp kontrol eden savunmayı hedefler: denetim sırasında ad genel bir IP’ye, gerçek bağlantı sırasında ise iç IP’ye çözülebilir. Kontrol ve kullanım anlarının ayrılması TOCTOU yarışıdır. DNS’i denetleyip bağlantı kurmayı ikinci kez çözümlemeye bırakan kısa bir kod, bu riski tek başına kapatmaz.

Yalnızca IP’yi değil, URL şemasını da kısıtlamak gerekir. Uygulama ve istemci kütüphanesine bağlı olarak HTTP dışı şemalar yerel dosya erişimi veya iç protokollerle konuşma riski yaratabilir. Yönlendirmeler de dışarıdan izin verilen bir adresi içeri taşıyabilir. Bu nedenle her hedef ve yönlendirme yeniden denetlenmelidir.

## Katmanlı savunma

**İzin listesi (allowlist)** ile uygulamanın gerçekten ihtiyaç duyduğu dış alan adlarını tanımlayın. Kara liste, IP adreslerinin alternatif yazımları ve sonsuz URL varyasyonları yüzünden kolayca eksik kalır. Gerekli şemaları ve portları sınırlandırın; çözümlenen hedefin özel, loopback, link-local veya ayrılmış aralıklara düşmediğini kontrol edin. IPv4 yanında IPv6’yı da ele alın.

Denetlenen IP ile bağlanılan IP aynı olmalıdır. DNS sonucunu kontrol ettikten sonra HTTP istemcisinin adı yeniden çözmesine izin vermek rebinding yarışını açık bırakabilir. Bağlantıyı doğrulanan IP’ye sabitleyen ve buna rağmen TLS sertifika/hostname doğrulamasını koruyan bir yaklaşım gerekir. Yönlendirmeleri kapatın veya her adımı aynı kurallarla yeniden doğrulayın.

Bulut tarafında metadata korumaları ek bir engel sağlar. Kaynağın karşılaştırmasında AWS IMDSv1 basit GET ile erişilebilirken IMDSv2 önce PUT ile kısa ömürlü token alınmasını ve sonraki istekte özel başlık gönderilmesini ister. GCP ve Azure örnekleri de özel başlık koşullarını vurgular. Basit SSRF bu yöntem ve başlıkları ayarlayamıyorsa metadata’ya erişemeyebilir; fakat bu kontrol uygulamadaki SSRF’yi düzeltmez ve başka iç hedeflere erişimi engellemez. Ağ düzeyinde egress kısıtları, metadata korumaları, izleme ve dar bulut rolü birlikte düşünülmelidir.

Kaynakta gösterilen kısa güvenli kod örneği şema, izinli host, çözümlenmiş IP ve yönlendirme kontrollerini öğretir; ancak DNS denetimi ile bağlantı arasında kalan TOCTOU sorununu da açıkça belirtir. Dolayısıyla örneği üretim için eksiksiz SSRF kütüphanesi gibi görmeyin.

## Önceki konularla bağlantı

[Güvenli tasarım ilkelerindeki](topic:security-design-principles) en az ayrıcalık, çalınmış bulut kimliğinin etkisini azaltır. [IDOR ve bozuk erişim kontrolünde](topic:broken-access-control-idor) her nesne için sunucu tarafında yetki denetlendiği gibi, SSRF savunması da her gerçek ağ hedefini denetlemelidir. [Güvenli web tasarımındaki](topic:secure-web-design) izin listesi burada yararlıdır; ancak ağ izolasyonu ve kimlik izinlerinin yerini tutmaz. TLS bağlantıyı korur, fakat yanlış hedefe gitmeyi güvenli hâle getirmez.

**Pedagojik ek:** Savunmayı girdi denetimi, ağ egress sınırı, metadata yapılandırması ve en az ayrıcalık olarak katmanlamak, tek bir kontrolün kusursuz olduğu varsayımını önler. Örnekler kavramsal ve kontrollüdür; izinsiz sistemlerde deneme adımları değildir.
