> **Kaynak kapsamı:** 1.2–1.2.3; `teori-1-1-42.pdf` fiziksel sayfa 18–21 / basılı sayfa 7–10. Sayfa 18’deki önceki etik uyarı ve sayfa 21’de başlayan 1.3 hariçtir. Morris portresi, Stuxnet şeması, WannaCry haritası ve NSA fotoğrafı incelenmiştir. Kaynağın 2025–2026 bakışı tarihsel çerçevesiyle aktarılır. “Yazar açıklaması” ve bağlantılı birincil doğrulamalar, kaynaktan ayrılan eklerdir.

## Tarihi, değişen paylaşım ve güven sınırları olarak oku

Bir bilgisayar yalnız tek kişinin tek programına ayrıldığında, fiziksel erişimi denetlemek korumanın büyük bölümünü oluşturabilir. Makineyi paylaşmaya başlayınca yeni soru ortaya çıkar: aynı işlemciyi kullanan iki kişinin dosyaları ve belleği nasıl ayrılacak? Kaynak, bilgi güvenliğinin kökünü bu **paylaşım problemine** bağlar.

Bu yüzden tarih yalnız olay ve yıl ezberinden ibaret değildir. Her yeni kullanım bir güven varsayımı yaratır; sınır yanlış kurulunca zarar doğar. Çok kullanıcılı makinede kullanıcılar arası yalıtım, internette bağlı sistemler arası güven, endüstride yazılım ile fiziksel süreç arasındaki ilişki ön plana çıkar. **Yazar açıklaması:** Sonraki dönemler önceki sorunu ortadan kaldırmaz; ağdaki sistemin içinde dosya izinleri ve bellek yalıtımı hâlâ gereklidir.

## Zaman paylaşımı ve Multics: güvenliği tasarıma almak

1960’larda bilgisayarlar pahalıydı. [Zaman paylaşımı — time-sharing](glossary:time-sharing), bir kullanıcının düşünmesi veya yazması sırasında işlemciyi başkasına vererek pahalı kaynağı değerlendirmeyi amaçlıyordu. Ama işlemci zamanını paylaşmak, dosya ve belleğin sınırsız ortak olması demek değildir. Yanlışlıkla çöken veya kötü niyetli bir programın diğerlerini etkileyip etkilemeyeceği tasarım sorusuna dönüştü.

Kaynak 1965’te başlayan **Multics — Multiplexed Information and Computing Service** projesini bu yaklaşımın önemli örneği olarak anlatır. Güvenliğin sonradan eklenmek yerine tasarımın merkezinde düşünülmesini vurgular. Dört fikir önemlidir:

- **Donanım destekli koruma halkaları:** ayrıcalık seviyelerini ayırmak.
- **Erişim denetim listeleri — ACL:** dosya ve dizinlerde kimin hangi erişime sahip olduğunu belirtmek.
- **Bellek yalıtımı:** bir kullanıcının programını diğerinin belleğinden ayırmak.
- **Security by design:** bu sınırları baştan sistemin parçası yapmak.

Multics’in ticari yaygınlığı sınırlı kaldı; fakat fikirleri etkili oldu. Kaynak, Ken Thompson ve Dennis Ritchie’nin Unix’ine giden sadelik arayışını, kullanıcı/grup/diğer izin modelini ve “her şey bir dosyadır” yaklaşımını bu tarihsel çizgide ele alır. **Ek açıklama:** Buradan her modern sistemin bütün güvenlik mekanizmalarının Multics’ten bire bir kopyalandığı sonucu çıkarılmaz; aktarılan şey etkili bir tasarım geleneğidir.

## Tasarlanan korumayı değerlendirmek

Kaynağa göre 1970 tarihli **Ware Raporu**, bilgisayar güvenliğini sistematik mühendislik problemi olarak ele alan dönüm noktalarındandır. Bu çizgide **1983 Turuncu Kitap — Orange Book / TCSEC**, güvenilir sistem değerlendirme ölçütleriyle anılır. Tarihsel soru şudur: “Güvenlik mekanizması var” demek yerine, ne kadar güvence sağladığını hangi ölçütle değerlendireceğiz?

Bu ders TCSEC sınıflarını öğretmiyor; kaynak da burada ayrıntılandırmıyor. **Yazar açıklaması:** Modern uyum ve sertifikasyonun niçin yalnız bir ürün adından ibaret olmadığını anlamak için bu kökü bilmek yararlıdır. Ölçüt, kanıt ve değerlendirme sorusu tarih boyunca tekrar eder.

## Morris: küçük çoğalma kararının ağ ölçeğindeki etkisi

2 Kasım 1988’de, Cornell lisansüstü öğrencisi **Robert Tappan Morris** tarafından yazılan solucan yayıldı. Kaynak eski Unix sistemlerindeki e-posta hizmeti hata ayıklama yolu, ağ hizmetindeki tampon taşması ve zayıf parolalar gibi birden çok yolu sayar. Birden çok vektör, tek bir kusuru kapatmanın salgını bütünüyle durdurmaya yetmeyebileceğini gösterir.

Öğretici mekanizma **yeniden bulaşma kararıdır**. Programın, zaten bulaşmış makinede çoğalmayı durdurması bekleniyordu. Fakat “bende var” yanıtının savunma tarafından taklit edilebileceği düşünülerek, belli bir olasılıkla yine kopyalanmasına izin verildi. Tek işlemde küçük görünen bu tercih, çok sayıda denemeyle aynı makinede kopyalar biriktirip kaynakları tüketti. Dosyaları silmeden de hizmet kullanılmaz hâle gelebilir; bu bir [erişilebilirlik](topic:cia-security-goals) dersidir.

Kaynak, internetin büyüklüğünü ölçme amacından söz eder. **Yazarın kanıt ayrımı:** İleri sürülen niyet ile gözlenen sonuç aynı tür bilgi değildir; öğrenilecek mekanizma, kontrolsüz çoğalmanın etkisidir. [FBI’nin olay kaydı](https://www.fbi.gov/history/cases-and-criminals/morris-worm), yaklaşık 60.000 bağlı bilgisayarın 6.000’inin etkilendiği tahminini ve olayın tarihi/adli izini destekler. Sayılar kesin envanter değil, yaklaşık %10’luk ölçek anlatımıdır. Kaynağın “ARPANET” ifadesini de bütün erken interneti tek ağ adıyla özdeşleştirmeden okumak gerekir.

## Teknik olaydan koordineli müdahaleye

Morris vakası yalnız bir kod kusuru olarak kalmadı. [CMU SEI’nin tarihçesi](https://www.sei.cmu.edu/history-of-innovation/fostering-growth-in-professional-cyber-incident-management/), DARPA’nın olay ardından SEI’den acil müdahale ekibi kurmasını istemesini **CERT/CC**’nin başlangıcı olarak kaydeder. **CERT — Computer Emergency Response Team** ve **CSIRT — Computer Security Incident Response Team**, olay karşısında bilgi paylaşımı ve koordinasyon ihtiyacını temsil eder. Kaynak Türkiye’deki USOM/TR-CERT’i bu ekosisteme örnek verir; kurumların ayrıntılı güncel görev yapısı bu tarih dersinin konusu değildir.

Kaynak, Morris’in daha sonra MIT’de öğretim üyesi olmasını ve 1986 tarihli Computer Fraud and Abuse Act kapsamında ilk mahkûmiyet örneğini de not eder. FBI’nin tarihçesi mahkûmiyeti doğrular. Bu, güncel hukuk tavsiyesi değil, teknik müdahalenin sorumluluk boyutunun tarihsel örneğidir. Kaynaktaki portre ve altyazının öğretim işlevi, kişiyle olay ve sonuç arasındaki bu ilişkiyi kurmaktır.

Kaynak, otomasyonla büyüyen küçük kusur dersini 2003 **Slammer** ile 2017 **WannaCry** ve **NotPetya** olaylarına bağlar. Bu kısa bölüm bunların tam zararlı analizini yapmış sayılmaz; tekrar eden ölçek sorununu gösterir.

## Web, suç ekonomisi ve fiziksel etki

1990’larda web’in ve internetin ticarileşmesi, tarayıcıyı, e-ticareti ve çevrimiçi bankacılığı yaygınlaştırdı. Yeni kolaylıklar yeni [saldırı yüzeyleri](glossary:attack-surface) getirdi. Kaynak 2000’lerde kimlik hırsızlığı, kart dolandırıcılığı ve spam üzerinden ekonomik motivasyonun örgütlü yapıya dönüşmesini vurgular. **Ek açıklama:** Bu, önce yalnız meraklıların, sonra yalnız suç gruplarının bulunduğu keskin bir sınır değildir; baskınlaşan motivasyonları anlatan tarihsel sadeleştirmedir.

2010’da keşfedilen **Stuxnet**, kaynağın devlet destekli kabul edilen, fiziksel süreci hedefleyen örneğidir: İran’daki zenginleştirme santrifüjleri. Kaynak, internete doğrudan bağlı olmayan ortama muhtemelen USB yoluyla girişten, birden çok zero-day ve belirli donanım koşulundan söz eder; “muhtemelen” ifadesini kesinlik olarak değiştirmiyoruz.

Fiziksel sayfa 20’deki şema, USB girişinden **WinCC/SCADA iş istasyonları ve sunucularına**, oradan **S7-300/S7-400 PLC** katmanına ve I/O ile santrifüjleri temsil eden fiziksel katmana giden yolu gösterir. Ethernet/TCP/IP ve endüstriyel bağlantılar, farklı katmanların temasını görünür kılar. **Yazar açıklaması:** Şemanın her PLC etiketi, her modelin aynı biçimde fiilen ele geçirildiğinin bağımsız kanıtı değildir. Öğretici sonuç, izole ağın USB/operasyon ilişkileriyle yine giriş yolu bulundurabilmesi ve bir yazılım olayının fiziksel sürece ulaşabilmesidir.

## Gözetim, fidye ve ortak bağımlılıklar

Kaynağın sonraki olay dizisinde her vakanın vurgusu farklıdır:

| Yıl / olay               | Kaynağın öne çıkardığı güvenlik dersi                                      |
| ------------------------ | -------------------------------------------------------------------------- |
| 2013 Snowden ifşaları    | Devlet ölçekli gözetim ve mahremiyet                                       |
| 2017 WannaCry / NotPetya | Yayılmanın küresel hizmetleri etkilemesi                                   |
| 2020 SolarWinds          | Güvenilen tedarik/güncelleme zinciri                                       |
| 2021 Log4Shell           | Yaygın ortak kütüphanedeki davranışın çok sayıda sistemi etkilemesi        |
| 2023 MOVEit              | Ortak kullanılan dosya transfer yazılımındaki kusurun çok kuruma yansıması |

WannaCry için kaynak, EternalBlue ile SMBv1 kusurlarının ve fidye yazılımının birleşimini anlatır; hastane ve fabrika hizmetleri etkilenir. **Terim düzeltmesi:** [MS17-010](https://learn.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010), tek bir zafiyet adı değil, birden çok SMB kusuruna ilişkin Microsoft güvenlik bülteni/güncellemesidir. Kaynaktaki dünya haritası yayılmanın coğrafi ölçeğini gösterir; haritadan kesin ülke sayısı veya enfekte makine ölçümü türetmiyoruz.

SolarWinds, Log4Shell ve MOVEit “başkasının yazılımına güvenmenin” farklı risklerini anlatır. **Ek açıklama:** Zehirlenmiş güncelleme ile yaygın kullanılan üründeki sömürülebilir kusur aynı teknik mekanizma değildir; ortak bağımlılık etkisi benzer olsa da karıştırılmamalıdır. [Log4Shell dersi](topic:log4shell-trust-boundaries) bu ayrımı mekanizma düzeyinde açar.

## Kaynağın 2025–2026 penceresi

Son paragraf; bulut ve konteynerlerle değişen sınırları, yapay zekânın oltalama/açık keşfi gibi saldırı kullanımlarını ve anomali tespiti gibi savunma kullanımlarını birlikte anar. Kuantum sonrası hazırlık için **ML-KEM/FIPS 203** ve **ML-DSA/FIPS 204**, sıfır güven için de “içerisi kendiliğinden güvenli” varsayımından vazgeçiş belirtilir. **Ek terim açıklaması:** [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final) anahtar kapsülleme, [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final) dijital imza standardıdır; aynı görev değildir.

NSA fotoğrafı ve Snowden altyazısı, gözetim boyutunu somutlaştırır; mimari veya belirli izleme yeteneği hakkında ek teknik kanıt değildir. Burada bütün sonraki haftaların konularını tamamlamıyoruz. Tarihin bağlayıcı fikri, **kullanım, bağımlılık ve saldırgan değiştikçe hangi güven sınırını koruduğumuzu yeniden düşünmek**. Bu bakışı [güvenlik zihniyeti](topic:security-mindset) ve [CIA hedefleri](topic:cia-security-goals) ile ilişkilendirmek, tarihleri anlamlı bir modele dönüştürür.
