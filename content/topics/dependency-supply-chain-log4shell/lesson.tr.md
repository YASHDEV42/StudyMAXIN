## Uygulama, yalnızca yazdığınız koddan oluşmaz

Modern ürünler doğrudan eklenen paketlere ve onların geçişli bağımlılıklarına dayanır. Ekibin yazmadığı bir bileşendeki açık da ürünü etkileyebilir; çünkü çalışma zamanı, o bileşenin kodunu kendi uygulamanız adına çalıştırır. Bu yüzden bileşen güncelliği, envanter ve kaynağın doğrulanması yazılım güvenliğinin parçasıdır.

## Log4Shell’in güven sınırı

Log4Shell (CVE-2021-44228), Java günlükleme kütüphanesi Log4j’deki lookup davranışının, günlüğe giren saldırgan kontrollü metin ve JNDI erişimiyle kesişmesiyle gündeme geldi. Öğretici zincir şöyledir: saldırganın kontrol ettiği bir alan (örneğin başlık veya kullanıcı adı) uygulama tarafından loglanır; etkilenen yapılandırmada Log4j metin içindeki ifadeyi yorumlar; JNDI bir dış adlandırma hizmetine bağlantı kurabilir; belirli sürüm ve çalışma koşullarında bu yol ciddi sonuçlara ilerleyebilir.

Bu zincir, her log mesajının otomatik olarak kod çalıştırdığı anlamına gelmez. Sömürülebilirlik Log4j sürümüne, yapılandırmaya, Java çalışma ortamına, erişilebilir protokollere ve uygulamanın girdiyi loglama biçimine bağlıdır. Asıl tasarım dersi, günlükleme ile ifade çözümlemenin beklenmedik birleşiminin yeni bir güven sınırı yaratabilmesidir. Tek bir “jndi” sözcüğünü engelleyen kara liste kök nedeni çözmez; ifade sözdizimi alternatifleri ve kodlama biçimleri bu yaklaşımı kırılgan kılar.

Kaynak, CVE-2021-44228’in ardından CVE-2021-45046, 45105 ve 44832 gibi takip sorunlarını ve ardışık düzeltme sürümlerini anlatır. İlk yama her zaman bütün koşulları kapatmayabilir. Buradaki sürüm tablosu tarihsel ders içindir; kesin etkilenme koşulları ve uygun düzeltme sürümü için ilgili üreticinin güvenlik duyurusu ve kullanılan bakım dalı incelenmelidir. Eski geçici azaltımlar güncel yama rehberi değildir. Kalıcı yaklaşım etkilenen bileşenleri güncellemek, paketlenmiş kopyaları da bulmak ve sonucu doğrulamaktır.

## Envanter, paket kaynağı ve tedarik zinciri

Log4j doğrudan eklenmiş olmayabilir; başka bir ürünün içinde taşınan geçişli bağımlılık olabilir. Yazılım Malzeme Listesi (Software Bill of Materials, SBOM), bileşen ve sürüm envanteri sağlar. Yeni bir CVE duyurulduğunda “hangi ürünlerimiz bu bileşeni içeriyor?” sorusuna yanıt vermeyi hızlandırır. SBOM tek başına düzeltme veya güvenlik garantisi değildir; doğru üretilmeli ve varlık yönetimi/tarama sürecine bağlanmalıdır.

Bağımlılık karışıklığı (dependency confusion), şirket içi paket adının genel depodan da çözülebilmesi ve paket yöneticisinin yanlış kaynağı seçmesiyle oluşabilir. Typosquatting ise bilinen pakete benzeyen yazımla kötü amaçlı paketi araya sokmaya çalışır. İç paketler için ad alanını ve güvenilir depoyu sabitleyin; paket adı/yayıncısını inceleyin; lockfile ile sürüm ve bütünlük özetini sabitleyin; yeni bağımlılık eklemeyi gözden geçirin. Lockfile beklenen paketin değiştirilmesini zorlaştırır ama paketin kendisini güvenilir kılmaz.

Kaynak, Heartbleed, SolarWinds, Log4Shell ve MOVEit örneklerini ortak bağımlılık ve yaygın etki temasıyla yan yana getirir. Mekanizmaları farklıdır: Heartbleed bir sınır denetimi kusuruydu; SolarWinds güncelleme zincirinin ele geçirilmesiydi; Log4Shell yaygın bir bileşendeki yorumlama yoluydu; MOVEit ise yaygın kullanılan üründeki açığın etkisini gösterdi. Bu örnekler tek bir “tedarik zinciri saldırısı” mekanizmasına indirgenmemelidir.

## Önceki kavramlarla bağlantı

[Log4Shell güven sınırları](topic:log4shell-trust-boundaries) girdinin hangi bileşene ulaştığını izlemeye yardım eder. [Heartbleed](topic:heartbleed-memory-disclosure), güvenli bir protokolün altındaki kütüphane kusurunun gizliliği nasıl bozabileceğini gösterir. [Anahtar yönetiminde](topic:key-management-lifecycle) olduğu gibi bağımlılık yönetiminde de yaşam döngüsü gerekir: envanterle, riskini değerlendir, güncelle, sonra sonucu doğrula.

**Pedagojik ek:** Müdahale sırası; bileşen/sürüm envanteri, etkilenen koşulları doğrulama, güncelleme veya kontrollü geçici azaltım ve dağıtılmış kopyaların doğrulanmasıdır. Bu, belirli bir ürün için sürüm tavsiyesi değildir.
