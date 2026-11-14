> **Kaynak kapsamı:** 1.4, `teori-1-1-42.pdf` fiziksel sayfa 26–27 / basılı 15–16. 1.3.4’ün son paragrafı ve 1.5’in başlangıcı hariçtir. Üniversite ve pencere örnekleri, risk hesabının sınırları ve sıfırıncı gün tespiti hakkındaki nitelemeler yazar açıklamasıdır.

## Önce koruyacağımız şeyi söyleyelim

Bir güvenlik değerlendirmesi “tehlikeli bir şey var” cümlesinde kalırsa neyi değiştireceğimizi bilemeyiz. [CIA](topic:cia-security-goals) bize hangi sonucun zarar gördüğünü söyler; bu ders ise o zararın nasıl oluşabileceğini anlatacak sözlüğü kurar.

[Varlık — asset](glossary:asset), korumaya değer şeydir. Kaynak yalnız veriyi saymaz: para, itibar, hizmet sürekliliği ve insan hayatı da varlık olabilir. **Ek örnek:** Üniversitenin kayıt sistemi için öğrenci bilgileri kadar, son kayıt gününde işlem yapabilmek ve kayıtlara duyulan güven de önemlidir. Böylece inceleme yalnızca dosya listesi olmaktan çıkar.

## Tehdit, zafiyet ve sömürü aynı zincirin farklı parçaları

[Tehdit — threat](glossary:threat), varlığa zarar verebilecek olası olay veya aktördür. [Zafiyet — vulnerability](glossary:vulnerability), tehdidin kullanabileceği zayıflıktır. [Sömürü — exploit](glossary:exploit), o zayıflıktan yararlanan somut teknik veya koddur. Aktör, zayıflık ve onu kullanan yöntem farklı şeylerdir.

Kaynak bunu sel ve çatlak bent benzetmesiyle ayırır. **Ek benzetme:** Binaya girmek isteyen kişi tehdit aktörü; kilidi bozuk pencere zafiyet; o pencereyi açmak için kullanılan somut yöntem sömürüdür. Açık pencereyi henüz kimse kullanmamış olması, zayıflığın olmadığı anlamına gelmez. Bilinen bir exploit bulunmaması da bir zafiyeti güvenli yapmaz.

**Yazar nitelemesi:** Kaynaktaki “tehdit olmadan zafiyet zararsız, zafiyet olmadan tehdit etkisiz” ifadesini kavramları ayıran bir basitleştirme olarak düşün. Pratikte bilinmeyen zayıflıklar olabilir; olaylar yalnızca yazılım hatalarıyla sınırlı değildir. Olası zarar ve koşullar birlikte değerlendirilir.

## Risk: olasılığı sonuçla birlikte tartmak

[Risk](glossary:risk), kaynağın giriş modelinde **tehdidin gerçekleşme olasılığı × olası etki** olarak sunulur. Olasılık “ne kadar mümkün?”, etki “olursa ne kadar zarar?” sorusudur. Aynı zafiyet, farklı sistemlerde farklı sonuçlar yaratabilir; bu yüzden açık sayısını saymak tek başına risk ölçmez.

**Ek açıklama:** Bu çarpım, nasıl düşündüğümüzü özetler. Olasılık ve etki “düşük/orta/yüksek” gibi sınıflarsa ortaya kendiliğinden parasal bir kayıp hesabı çıkmaz. Kesin bir sayı için zaman aralığı, birimler ve varsayımlar gerekir. Bu kısa bölümün amacı ayrıntılı nicel risk hesabını tamamlamak değildir; kaynak onu 1.6’da ele alır ve o bölüm henüz yayımlanmış ders kapsamımızda değildir.

Önlem seçerken de hangi halkayı değiştirdiğimizi söylemeliyiz: zafiyeti gidermek, saldırının ulaşmasını zorlaştırmak veya olursa etkisini azaltmak farklı yaklaşımlardır. Bir önlem riski azaltabilir; bunu “artık hiçbir risk yok” diye okumamak gerekir.

## Saldırı yüzeyi harita, vektör belirli bir yol

[Saldırı yüzeyi — attack surface](glossary:attack-surface), saldırganın sistemle temas edebildiği noktaların toplamıdır. Kaynak bu yüzeyi küçültmeyi savunur. [Saldırı vektörü — attack vector](glossary:attack-vector) ise ulaşmak için kullanılan belirli yol veya yöntemdir. Oltalama e-postası, açık port, USB bellek ve savunmasız bir API uç noktası kaynak örnekleridir.

**Ek örnek:** Bir üniversitenin web formu, e-posta sistemi ve dışarı açık yönetim servisi yüzeyin parçaları olabilir. Belirli bir oltalama mesajıyla hesap ele geçirmeye çalışmak ise bir vektördür. Harita ile üzerinde gidilen rotayı karıştırırsak “bir yolu kapattım, tüm yüzeyi korudum” yanılgısına düşeriz. Daha az temas noktası incelemeyi kolaylaştırır; kalan noktaların doğru korunması yine gerekir.

## İstihbarat ile gösterge arasındaki ölçek farkı

[Tehdit istihbaratı — threat intelligence](glossary:threat-intelligence), aktörler, kampanyalar, araçlar ve yöntemler hakkında toplanmış, işlenmiş, savunmada kullanılabilir bilgidir. Belirli bir grubun belirli sektöre yöneldiğini ve hangi açıklara başvurduğunu bilmek, öncelikleri belirlemeye yardım eder.

[IOC — Indicator of Compromise](glossary:indicator-of-compromise), bir sistemin ele geçirilmiş olabileceğini düşündüren somut izdir: dosya karması, IP adresi, alan adı veya sıra dışı kayıt defteri anahtarı. Kaynak bu tür makinece işlenebilir parçaları geniş istihbaratın somut bileşenleri olarak anlatır.

**Ek açıklama:** Gösterge, bağlamdan bağımsız kesin hüküm değildir. Bir adresin listede bulunması inceleme gerektirir; o adresle her iletişim tek başına ihlali kanıtlamayabilir. Benzer biçimde, listede eşleşme olmaması sistemin temiz olduğunu kanıtlamaz. İstihbarat ilişki ve anlam üretir; bir IOC bunun yerine geçmez.

## Sıfırıncı gün: henüz yama yoksa

Kaynak, [sıfırıncı gün — zero-day](glossary:zero-day) zafiyetini henüz yaması olmayan, çoğu zaman üreticinin de bilmediği açıklık olarak tanımlar. Bunu kullanan teknik sıfırıncı gün sömürüsüdür. Bildirim, sorumlu açıklama ve yama yayımlanması süreciyle açıklık bilinen, “n’inci gün” türündeki bir soruna dönüşür. Kaynak, Log4Shell’in ilk keşif saatlerini bu duruma örnek verir. Bu ders kaynağın bu kullanımını izler.

**Kaynak iddiasına açıklık getiren yazar notu:** Kaynak “hiçbir imza, hiçbir IOC yoktur” diye çok kesin konuşur. Yeni bir açık için hazır ve yaygın göstergeler bulunmayabilir; fakat davranış, anormallik veya başka izler üzerinden tespit yine mümkün olabilir. “Yama yok” ile “hiçbir savunma işe yaramaz” aynı önerme değildir. Ayrıca “zero-day” tanımındaki bilinirlik ve yama sınırı bağlama göre açıklanmalıdır.

## Tek bir olayı parçalara ayırmak

Kaynak, e-ticaret ödeme formunu kullanır. **Varlık** müşteri kart verileri; **tehdit** finansal amaçlı suç grubu; **zafiyet** SQL enjeksiyonu; **sömürü** bunu kullanan betik; **vektör** dışarı açık ödeme formudur. Olasılık ve etki yüksek olduğunda **risk** yüksek değerlendirilir. Parametreli sorgular, WAF ve kart verisini saklamak yerine tokenizasyon, kaynakta anılan farklı azaltım yollarıdır. Kullanılan IP veya belirli bir kullanıcı-aracı dizesi IOC olabilir.

**Ek açıklama:** Bu, kaynakta kavramları ilişkilendirmek için verilen örnektir; bir WAF’ın enjeksiyon kusurunu kökten düzelttiği veya her kart verisinin her ortamda aynı biçimde ele alınacağı iddiası değildir. Sorgunun yapısını girdiden ayırmak, dışarıdan gelen isteği filtrelemek ve hassas veriyi hiç tutmamak farklı savunma noktalarıdır.

Bir olayı anlatırken önce varlığı, sonra zarar yolunu, sonra olasılık ve etkiyi söyle. [Kimlik ve yetki](topic:identity-access-accountability) kontrollerinin zincirin hangi noktasına dokunduğunu gösterebildiğinde, terimler ezber olmaktan çıkar ve tasarım aracına dönüşür.
