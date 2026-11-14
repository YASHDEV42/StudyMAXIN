## Sistemi Kim Hedef Alabilir? Tehdit Aktörlerini Tanımak

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.8 ve 1.9 başlamadan önceki alt başlıklar, `teori-1-1-42.pdf`, fiziksel sayfa 41–42 (basılı sayfa 30–31). Ek öğretim açıklamaları açıkça belirtilmiştir.

## Savunmayı kime göre kuruyoruz?

“Sistemimizi kimden koruyoruz?” sorusu, hangi önlemlerin anlamlı olduğunu belirlemeye yardım eder. Küçük bir öğrenci projesiyle devlet kurumunu veya kritik altyapıyı korumak aynı tehdit profilini gerektirmez. Kaynak bir tehdit aktörünü üç boyutta inceler:

1. **Motivasyon:** Saldırgan neden harekete geçiyor? Para, itibar, ideoloji, intikam veya istihbarat olabilir.
2. **Yetenek:** Hangi beceri, araç ve kaynaklara sahip?
3. **Israr:** Belirli bir hedefe ne kadar zaman ve emek ayırabilir?

Bu boyutlar birlikte değerlendirilir. Kolay hedef arayan biri için yeterli olan önlem, kaynak ve zamanı yüksek bir aktörü durdurmayabilir. Öte yandan, olası her düşmanı eşit derecede güçlü saymak da gerçekçi değildir. [Tehdit modellemesi](glossary:threat-modeling), hangi aktörlerin ve yolların bu sistem için anlamlı olduğunu seçmeye yarar.

| Aktör türü                                 | Tipik motivasyon                        | Kaynağın karşılaştırmasında yetenek ve ısrar     | Tipik hedef veya davranış                              |
| ------------------------------------------ | --------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| **Hazır araç kullanıcısı (script kiddie)** | Merak, itibar, eğlence                  | Genellikle düşük                                 | Kolay veya zayıf korunan sistemler                     |
| **Siber suçlu (cybercriminal)**            | Para                                    | Yetenek orta–yüksek; ısrar orta                  | Kârlı ve savunmasız kurumlar                           |
| **Hacktivist**                             | İdeoloji veya mesaj                     | Yetenek değişken; ısrar düşük–orta               | Görünür/sembolik hedef, tahrifat veya hizmet engelleme |
| **İç tehdit (insider threat)**             | İntikam, para veya dikkatsizlik         | Kurum içi erişimle yetenek artar; ısrar değişken | Kendi kurumu                                           |
| **Güvenlik araştırmacısı**                 | Savunmayı etik biçimde güçlendirmek     | Teknik bilgi yüksek; çalışması odaklı            | İzinli sistemler ve hata ödül programları              |
| **APT / devlet destekli aktör**            | İstihbarat, sabotaj, stratejik üstünlük | Çok yüksek yetenek, kaynak ve ısrar              | Stratejik hedefler veya kritik altyapı                 |

Bu tablo **yaklaşık bir sınıflandırmadır**, değişmez kural değildir. Aynı aktör türünün kapasitesi duruma göre değişebilir. Kaynağın pratik sonucu, savunmayı gerçekten hedef olma ihtimali bulunan aktöre göre boyutlandırmaktır. Küçük bir işletme için güncellemeler, [çok faktörlü kimlik doğrulama](glossary:multi-factor-authentication) ve iyi yedekler yaygın finansal suçlara karşı verimli olabilir. APT çok daha güçlü olabilir; ancak her kurumun bu tür bir aktörün hedefi olduğunu varsaymak da doğru değildir. Hedefin çekiciliği risk değerlendirmesinin parçasıdır.

## Hazır araçlar, suç ekonomisi ve hacktivizm

**Script kiddie**, teknik derinliği sınırlı olmasına rağmen hazır saldırı araçlarını kullanan kişidir. Merak, itibar veya eğlence için hareket edebilir. Düşük beceri zararsızlık demek değildir; erişilebilir araçlar zayıf korunmuş sistemlere ciddi zarar verebilir. Kaynak, güncelleme yapmak, güçlü parola kullanmak ve gereksiz portları kapatmak gibi temel hijyenin kolay hedef arayan bu kişilerin maliyetini artırabileceğini belirtir.

**Siber suçlular** çoğu zaman saldırıyı gelir getiren bir iş gibi ele alır. Kaynak; fidye yazılımının hizmet olarak satıldığı, çalıntı verinin pazarlandığı ve suçlulara teknik destek sunulduğu bir yeraltı ekonomisinden söz eder. Bu bakış, neden en düşük maliyetle en yüksek getiriyi sağlayan hedeflerin seçilebildiğini açıklar. Ancak para motivasyonu olan her aktörün profesyonel bir örgüt olduğu sonucunu çıkaramayız.

**Hacktivistler**, para yerine ideolojik bir amaç veya mesaj için saldırır. Kaynağın örnekleri web sitesi tahrifatı ve dağıtık hizmet engelleme (DDoS) saldırılarıdır. Yetenekleri değişebilir; görünürlük aradıkları için eylemleri çoğu zaman gürültülüdür. Böylece başarı ölçütü doğrudan para değil, mesajın duyulması veya sembolik etkinin oluşması olabilir.

## APT: ileri yetenek ve uzun süreli takip

**APT**, **Advanced Persistent Threat** kısaltmasıdır; ileri, ısrarlı tehdit anlamına gelir. Kaynak bunu genellikle devlet destekli, belirli bir hedefe kaynak ayırabilen ve aylar boyunca fark edilmeden kalabilen bir aktör türü olarak tanımlar. Üç kelimeyi ayrı düşünmek yararlıdır:

- **Advanced (ileri):** özel araç geliştirme veya sıfırıncı gün açıklıklarından yararlanma becerisi bulunabilir.
- **Persistent (ısrarlı):** tek denemeden vazgeçmeyip hedefe uzun süre odaklanır.
- **Threat (tehdit):** arkasında örgütlü ve iyi kaynaklı bir yapı vardır.

Bu profile göre amaç doğrudan para kazanmak değil; istihbarat toplamak, sabotaj yapmak veya stratejik üstünlük elde etmektir. Kaynak Stuxnet’i örnek gösterir ve SolarWinds olayındaki uzun süreli varlığı APT’nin ısrar boyutuyla ilişkilendirir.

Güvenlik şirketlerinin grup adlandırmaları farklı olduğu için aynı aktör veya faaliyet için birden fazla ad görülebilir. Kaynakta yer alan örnekler şöyledir:

| Kaynak / kaynakta belirtilen adlandırma                 | Kaynaktaki örnekler                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Mandiant / FireEye: `APT` + numara                      | APT28, APT29, APT41                                                           |
| CrowdStrike: ülkeye veya kümeye göre hayvan             | Bear (Rusya), Panda (Çin), Kitten (İran), Chollima (Kuzey Kore), Spider (suç) |
| Microsoft’un 2023’ten beri kullandığı hava olayı adları | Typhoon (Çin), Blizzard (Rusya), Sandstorm (İran), Sleet (Kuzey Kore)         |
| Genel veya basın adları                                 | Fancy Bear (= APT28), Cozy Bear (= APT29), Lazarus (Kuzey Kore)               |

Adlar tek bir kişiyi kesin biçimde tanımlamaz ve farklı şirketlerin eşleştirmeleri her zaman bire bir değildir. Kaynağın vurguladığı daha kullanışlı gözlem, **taktikler, teknikler ve prosedürlerdir (TTP)**: araçlar, hedeflenen sektörler ve tercih edilen yöntemler. Savunma bir ismi ezberlemekten çok davranışı bulmaya çalışır. [Tehdit istihbaratı](glossary:threat-intelligence) ve [ihlal göstergeleri](glossary:indicator-of-compromise) bu resmi destekleyebilir; tek bir gösterge tek başına kesin atıf sağlamaz.

### Kaynaktaki örnek: SolarWinds

Kaynağın gerçek dünya kutusu, 2020’de ortaya çıkan SolarWinds olayını anlatır. Yaygın kullanılan bir ağ yönetimi yazılımının güncelleme mekanizmasına arka kapı eklenmiş, kötü amaçlı güncelleme üretici şirket tarafından imzalanarak çok sayıda kuruma dağıtılmıştır. Bu bir **tedarik zinciri saldırısıdır — supply-chain attack**: zayıf halka doğrudan kurum değil, güvendiği tedarikçi olabilir. Kaynağa göre saldırganlar birçok kurumun ağında aylarca fark edilmeden kaldı; bu, APT profilindeki ısrarı örnekler. Kaynak daha sonraki haftalarda SBOM konusuna döneceğini söyler; bu, ilerideki bölüm için yönlendirmedir.

## İç tehdit: yetkili erişim kötüye kullanılabilir veya çalınabilir

**İç tehdit**, kurum içinde meşru erişimi bulunan kişi ya da hesabın zarar verme ihtimalidir. Dışarıdaki saldırgana karşı kurulmuş çevre duvarı, içeride zaten yetkisi olan kişiye karşı tek başına yeterli olmaz. Kaynak üç türü ayırır:

1. **Kötü niyetli iç aktör:** bilerek veri çalar, sabotaj yapar veya intikam alır.
2. **Dikkatsiz iç aktör:** zarar verme niyeti yoktur ama yanlış kişiye e-posta gönderir, oltalamaya kanar veya hassas veriyi güvensiz yere kopyalar. Kaynak, bunu en yaygın iç tehdit türü olarak niteler; bu sayfada bir ölçüm sunmaz.
3. **Ele geçirilmiş iç aktör:** meşru kullanıcının kimlik bilgileri çalınmış ve dış saldırgan tarafından kullanılmaktadır. Sistem içeriden bir hesap görürken işlemi yapan kişi dışarıda olabilir.

Savunma tek kontrole dayanmaz: [en az yetki](glossary:least-privilege), görevlerin ayrılığı, işe yarar denetim kayıtları ve sağlıklı kurum kültürü birlikte gerekir. Her insan hatasını ortadan kaldırmak mümkün değildir; amaç hata olasılığını, tespit süresini ve etkisini azaltmaktır.

## Güvenlik araştırmacısı ve sorumlu açıklama

Güvenlik araştırmacısı teknik olarak saldırgan yöntemler kullanabilir, fakat izinli çalışmasının amacı savunmayı güçlendirmektir. Bir açıklık bulduğunda **sorumlu açıklama**, üreticiye sorunu düzeltme imkânı verecek biçimde bildirim yapmayı ve zararlı ayrıntıları gelişigüzel kullanmamayı ifade eder. **Hata ödül programları (bug bounty)** bazı kurumların bu katkıyı teşvik etme yoludur. Araştırmacılar, aynı teknik bilginin niyete ve izne göre savunma katkısına veya saldırıya dönüşebileceğini gösterir.

**Ek açıklama:** Bu tablolar aktörleri anlamaya yarar; tek başına bir saldırının failini belirleyemez. Atıf için kanıt ve analiz gerekir. APT29 gibi yaygın bir grup etiketi, tek bir kişinin kimliğini kanıtlamaz.
