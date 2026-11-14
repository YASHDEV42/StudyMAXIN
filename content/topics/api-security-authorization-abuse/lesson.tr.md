## API neden ayrı bir tehdit modeli gerektirir?

Web arayüzü kullanıcıya yalnızca bazı düğmeleri gösterebilir; API ise doğrudan istek kabul eder. İstemci yol, yöntem, gövde ve başlıkları değiştirebilir. Arayüzde düğmenin gizlenmesi veya pasif olması sunucunun endpoint’i kapattığını göstermez. Bu nedenle her istek sunucu tarafında kimlik, yetki, veri alanı ve kaynak tüketimi açısından değerlendirilmelidir.

Kaynak, API risklerini nesne düzeyi yetkilendirme (BOLA), bozuk kimlik doğrulama, nesne özelliklerinin yetkilendirilmesi, sınırsız kaynak tüketimi, işlev düzeyi yetkilendirme (BFLA), hassas iş akışlarının kötüye kullanılması, SSRF, güvenlik yanlış yapılandırması, envanter eksikliği ve güvensiz API tüketimi olarak sıralar. Burada listeyi kaynağın sınıflandırması olarak ele alıyorum; sürümü güncel bir sıralama iddiası değildir.

## Kimlik doğrulama ve yetkilendirme

Kimlik doğrulama “Kimsin?”, yetkilendirme “Bu işlem ve nesne için iznin var mı?” sorusunu yanıtlar. BOLA/IDOR’da geçerli token doğrulanır ama kullanıcının istenen hesaba veya kayda erişme hakkı denetlenmez. İstemci nesne kimliğini değiştirebilir; kök neden sunucu tarafındaki nesne yetkisinin eksikliğidir. UUID kullanmak sıralı tahmini zorlaştırır fakat gerçek yetkilendirme kontrolünün yerini tutmaz.

BFLA’da sorun nesne değil işlevdir: sıradan rol, yöneticiye özgü silme veya rol verme endpoint’ini çağırabilir. BOLA’da kullanıcı aynı işlevi başka bir nesnede uygular; BFLA’da yetkisiz işlevi çağırır. Her iki durumda da arayüz değil sunucu karar vermelidir. Varsayılanı reddet; rolü ve bağlamı kontrol et; nesne erişimlerinde sahiplik/ilişkiyi her istekte yeniden doğrula.

## Alan bazlı kontrol: giden ve gelen veri

Aşırı veri açığa çıkarma, API’nin tüm nesneyi döndürüp gereksiz alanları arayüzün gizlemesine güvenmesidir. Alan yanıtla birlikte istemciye ulaştığı için hassas veri zaten açılmıştır. Her endpoint için yalnızca gerekli alanları açıkça seçin. Mass assignment bunun tersidir: istemcinin gönderdiği tüm JSON alanlarını veritabanı nesnesine otomatik eşlemek. İstemci `role` veya `balance` gibi yönetememesi gereken alanları ekleyebilir. Yazılabilir alanlar için allowlist kullanın ve istek şemasını saklanan nesneden ayırın.

## JWT doğrulama: istemci algoritmayı seçmez

JWT, noktalarla ayrılan header, payload ve signature parçalarından oluşur. Base64URL kodlaması şifreleme değildir; imzalı payload okunabilir. Gizli bilgiyi token’a koymayın. İmza, uygun anahtarla doğrulandığında bütünlüğü sağlar; token’ın yetkili olduğu her şeyi tek başına belirlemez.

Sunucu, doğrulama algoritmasını gelen `alg` başlığına bırakamaz. Beklenen algoritma ve anahtar güvenilir sunucu politikasında sabitlenmeli, `none` ve izin verilmeyen algoritmalar reddedilmelidir. Algoritma karışıklığı, uygulamanın anahtarı/algoritmayı yanlış yorumladığı belirli yapılandırmalarda ortaya çıkar; her kütüphane ve sürümün aynı davranacağı genellenmemelidir. İmzayı, süreyi (`exp`), issuer (`iss`), audience (`aud`) ve uygulamanın istediği zorunlu claim’leri kontrol edin. İmza geçerli olsa bile yanlış audience’a veya süresi dolmuş token’a izin verilmemelidir. Ayrıntı için [JWT doğrulama](topic:jwt-validation) konusuna bakın.

## Kimlik bilgisi saldırıları ve hız sınırlama

Bozuk API kimlik doğrulamasında giriş denemeleri sınırlanmamış, token tahmin edilebilir veya iptal edilemez, token URL’de taşınmış ya da parola kurtarma akışı zayıf olabilir. Credential stuffing, başka hizmetlerden sızan kullanıcı adı/parola çiftlerini otomatik biçimde dener. Yeniden kullanılan parolalar başarı olasılığını artırır. Hesap ve IP düzeyinde dikkatli oran sınırı, şüpheli denemelerde MFA, kısa ömürlü/iptal edilebilir token ve güvenli kurtarma akışı savunmanın parçalarıdır.

Token bucket algoritmasında kova kapasitesi `b`, izin verilen kısa süreli burst’ü; dolum hızı `r`, uzun dönem ortalama talep hızını belirler. Her istek bir token tüketir; kova boşsa istek reddedilir. Dağıtık sunucularda sayaçların ortak veya tutarlı tutulması gerekir. Yalnızca IP başına limit, saldırganın kaynak dağıtmasıyla aşılabilir veya ortak NAT arkasındaki meşru kullanıcıları etkileyebilir. GraphQL’de istek sayısının yanı sıra sorgu derinliği ve hesaplama maliyeti de sınırlandırılmalıdır.

## REST, GraphQL ve endpoint envanteri

REST çoğunlukla çok sayıda kaynak endpoint’i kullanır; her birinde BOLA/BFLA kontrolünün unutulma riski vardır. GraphQL esnek sorgu sağlar ama derin/iç içe sorgularla tek istekte büyük kaynak tüketebilir. Sorgu derinliği ve maliyeti için tavan belirleyin, her alan ve nesnede yetkiyi uygulayın, üretim introspection ayarını ihtiyaca göre gözden geçirin. Introspection’ı kapatmak yetkilendirme kusurunu düzeltmez.

Shadow API belgelenmemiş veya güvenlik ekibinin bilmediği endpoint; zombie API ise eski ve bakımı bırakılmış ama hâlâ erişilen sürümdür. Eski `/v1` endpoint’i yeni sürümdeki kontroller olmadan aynı veriyi sunabilir. Sahip, sürüm, veri ve yetki bilgisi içeren envanter tutun; kullanılmayan endpoint’leri planlı kaldırın. Üçüncü taraf API yanıtlarını da doğrulayın; TLS ve kaynak kontrolü yapın, gelen veriyi güvenilir varsaymayın.

## CORS’un sınırı

Same-Origin Policy, bir kaynaktaki JavaScript’in başka kaynaktan gelen yanıtı okumasını sınırlar. CORS sunucunun belirli origin’lere bu okumayı açmasını sağlar. Sunucu her `Origin` değerini yansıtıp credentials izni verirse, tarayıcı koşullarına bağlı olarak saldırgan bir site kurbanın oturumuyla yanıtı okuyabilir. Kesin origin allowlist’i kullanın ve scheme, host, port eşleşmesini tam yapın; gevşek alt dize eşleşmesi kullanmayın.

CORS, sunucu yetkilendirmesi değildir ve tarayıcı dışındaki istemcileri durdurmaz. Ayrıca CORS, bütün çapraz kaynak isteklerini engellemediği için [CSRF](topic:csrf) savunmasının yerine geçmez. Authentication, object/function authorization, CORS ve rate limiting ayrı kontrollerdir.

**Pedagojik yöntem:** Her endpoint’i rol × işlem × nesne × alan matrisiyle gözden geçirin. Böylece kimlik doğrulama ile yetkilendirme, açığın kök nedeni ile istismar yöntemi ve güvenlik kontrolü ile sınırı birbirine karışmaz.
