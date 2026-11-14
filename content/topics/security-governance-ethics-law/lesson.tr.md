## Güvenlik Yönetişimi, Etik ve Hukuk: Bilgi Sorumluluk Getirir

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.11 ve 1.11.1–1.11.2, `teori-1-43-89.pdf`, fiziksel sayfa 6–7 (basılı sayfa 37–38); 1.12’den önceki uyarı kutusuna kadar. Ek açıklamalar ve resmî kaynak kontrolleri ayrıca belirtilmiştir.

## Güvenlik aynı zamanda yönetim kararıdır

Güçlü araçlar olsa bile kurumun kimin sorumlu olduğunu, hangi riskleri kabul edebileceğini, hangi bütçeyi ayıracağını ve çalışanlardan ne beklediğini belirlemesi gerekir. Bu yönlendirme ve hesap verme düzenine **güvenlik yönetişimi — security governance** denir. Yönetişim tek bir yazılım veya ayar değildir; güvenlik çalışmalarını kurumun amaçlarına ve kararlarına bağlar.

Kaynak, **NIST Siber Güvenlik Çerçevesi 2.0’ı (NIST CSF 2.0)** örnek verir. 2024 sürümünde önceki beş işleve **Govern (Yönetişim)** eklenmiştir. PDF’de altı işlev soldan sağa oklarla çizilir. Bu şekil hatırlamayı kolaylaştırır; ancak işlevlerin zorunlu ve kesintisiz bir sıra izlediği izlenimini verebilir. **NIST’in resmî çerçevesindeki ek açıklama:** altı işlev birlikte ve eşzamanlı ele alınır. Govern, programın genelinde sürer; Identify, Protect ve Detect sürekli yürütülür; Respond ve Recover ise hazır tutulur ve olay olduğunda uygulanır. Dolayısıyla şekli doğrusal bir reçete değil, birbirini tamamlayan yeteneklerin haritası olarak okuyun.

| İşlev       | İngilizce / kaynak Türkçesi | Pratik soru                                             |
| ----------- | --------------------------- | ------------------------------------------------------- |
| Yönetişim   | **Govern / Yönetişim**      | Hedef, politika, sorumluluk ve kabul edilen risk nedir? |
| Tanımla     | **Identify / Tanımla**      | Hangi varlıklar, riskler ve bağımlılıklar önemli?       |
| Koru        | **Protect / Koru**          | Zararı azaltmak için hangi kontroller gerekir?          |
| Tespit et   | **Detect / Tespit**         | Olağandışı etkinliği veya olayı nasıl fark ederiz?      |
| Müdahale et | **Respond / Müdahale**      | Olayı nasıl sınırlar, yönetir ve iletişim kurarız?      |
| Kurtar      | **Recover / Kurtar**        | Hizmetleri nasıl geri getirir ve ne öğreniriz?          |

Yönetişim bu işlevleri birbirine bağlar. Yedekleme politikası bütçe ve sorumlu gerektirir; tespit için uyarıları yorumlayacak ekip gerekir; müdahale sırasında kimin hangi kararı vereceği önceden bilinmelidir. Bu yüzden güvenlik yalnızca BT ekibinin görevi değildir. Kaynak konuya 14. haftada, CSF’ye ise olay operasyonları ve yönetişim bağlamında 13. ve 14. haftalarda yeniden döneceğini belirtir.

## Meslek etiği: önce açık izin

Güvenlik bilgisi, zayıflıkları bulma ve sistemleri sınama gücü verir; ancak yetenek, izin anlamına gelmez. Kaynağın temel meslek kuralı şudur: **Bir sistemi yalnızca sahibinin açık izniyle test et.** İyi niyet, izinsiz erişimi etik bir teste dönüştürmez. Uygun çalışma alanları kendi laboratuvarın, açıkça test izni verilmiş sistemler ve yasal **yakala-bayrak (CTF)** ortamlarıdır.

Bir araştırmacı zafiyet bulduğunda [sorumlu açıklama](glossary:responsible-disclosure) yolunu izler: bulguyu ilgili kuruma güvenli biçimde bildirir, düzeltme için makul fırsat verir ve koordinasyon olmadan zararlı ayrıntıları kötüye kullanmaz. “Sorumlu açıklama” ifadesi, araştırmacıya istediği sistemi sınama yetkisi vermez; test izni ve kapsamı ayrıca belirlenmelidir.

Kaynak, ISC2 gibi meslek örgütlerinin etik kurallarını anıp ortak değerleri **zarar vermeme, dürüstlük, mahremiyete saygı ve toplum yararını gözetme** olarak özetler. Bu değerler hukukun veya test sözleşmesinin yerine geçmez; belirsiz bir durumda profesyonelin kararını yönlendirir. Ayrıca 1.8’deki [tehdit aktörleri ve güvenlik araştırmacıları](topic:threat-actors) konusuyla da bağlantı kurar.

## Türkiye’de hukuk ve kişisel veriler: kaynakta verilen genel çerçeve

Kaynak örneklerini Türkiye bağlamında verir. **Türk Ceza Kanunu (TCK)** kapsamında bilişim sistemine hukuka aykırı girme, sistemi engelleme veya bozma, verileri silme ya da değiştirme ve banka/kredi kartlarını kötüye kullanma gibi fiillerden söz eder. Güvenlik uzmanı için temel sonuç, izinsiz testin “deneme amaçlı” diye adlandırılmasının hukuki riski kendiliğinden ortadan kaldırmamasıdır. Kaynak her maddenin ayrıntısını veya olası hukuki savunmaları anlatmaz.

**6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)**, [kişisel verilerin](glossary:personal-data) işlenmesini düzenleyen çerçeve olarak tanıtılır: işleme hukuka uygun, belirli bir amaçla bağlantılı, sınırlı ve ölçülü olmalı; veriler gerekli veya mevzuatta öngörülen süre kadar saklanmalıdır. Kaynak ayrıca veri güvenliği önlemlerini ve ihlal hâlinde ilgili kuruma ve etkilenen kişilere bildirim konusunu özetler. **Genel Veri Koruma Tüzüğü (GDPR)** ile benzer koruma alanında bulunduğunu söyler; iki düzenlemenin aynı olduğunu söylemez. Kapsamları ve yükümlülükleri farklıdır.

**Ek hukuk açıklaması:** Bu genel anlatım, hazırlanırken resmî kaynaklarla karşılaştırıldı. Ders kitabı bildirim sürelerini, istisnaları veya her maddenin somut olayda nasıl uygulanacağını açıklamıyor; bu nedenle burada süre veya olaya özel hukuki talimat eklenmedi. Gerçek bir karar için TCK’nın yürürlükteki metnini ve KVKK Kurumu rehberini kontrol edin veya hukuk uzmanına danışın. Bu bölüm eğitim amaçlıdır, hukuki mütalaa değildir.

## Öğrenmek, uygulama izni değildir

Kaynağın uyarısı açıktır: saldırı tekniklerini öğrenmek, bunları başkasının sisteminde deneme hakkı vermez. Yalnızca kendi laboratuvarın, açıkça izin verilmiş sistemler ve yasal CTF ortamları uygundur. İzin veya kapsamdan emin değilsen, teste başlamadan önce netleştir. Bu sınırı korumak mesleki güvenilirliğin parçasıdır.

**Resmî ek doğrulamalar:** [NIST CSF 2.0](https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf), altı işlevin eşzamanlı ele alınmasını açıklar. Güncel [TCK metni](https://mevzuat.adalet.gov.tr/mevzuat/103228), KVKK mevzuatı ve Kurumun [veri ihlali bildirim açıklaması](https://www.kvkk.gov.tr/Icerik/8595/kamuoyu-duyurusu) resmî başvuru noktalarıdır. Bunlar ek açıklama kaynaklarıdır; bu dersin PDF kaynağı yukarıda belirtilen sayfalardır.
