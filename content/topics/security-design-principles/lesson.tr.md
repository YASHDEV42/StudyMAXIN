## Güvenlik Tasarım İlkeleri: Yetkiden Katmanlara

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.7, `teori-1-1-42.pdf`, fiziksel sayfa 38–40 (basılı sayfa 27–29). Kaynağın dışındaki örnekler ayrıca belirtilmiştir.

## Tasarım ilkeleri neden önemlidir?

Bir güvenlik aracı güçlü olabilir; ancak sistem geniş yetkilerle, açık varsayılanlarla ve gereksiz karmaşıklıkla kurulmuşsa tek başına yeterli olmaz. Jerome Saltzer ve Michael Schroeder, 1975’te yayımladıkları _The Protection of Information in Computer Systems_ makalesinde güvenli tasarım ilkelerini ortaya koydu. Bu ilkelerin değeri belirli bir teknolojiye bağlı değildir: hata veya ihlal gerçekleştiğinde zararı sınırlayan tasarım alışkanlıkları sunarlar. Kaynak her ilkeyi anlamı, doğru uygulaması ve ihlal edildiğinde oluşabilecek sonuçla birlikte ele alır.

## Saltzer ve Schroeder’in sekiz klasik ilkesi

### 1. En az yetki — Least privilege

Her kullanıcı, süreç ve bileşen görevini yapmaya yetecek en düşük yetkiyle çalışmalıdır. Bir web hizmetinin veritabanında iki tabloyu okuması gerekiyorsa, tüm veritabanını silebilen yönetici hesabına bağlanması gerekmez. Hizmet ele geçirilirse saldırganın kullanabileceği alan, hizmetin yetkileriyle sınırlanır. Bu ilke ihlali önlemez; ihlalin etkisini daraltır.

Kaynak, `root` veya `sa` benzeri tam yetkili hesap kullanan web uygulamasını örnek verir. Uygulamadaki küçük bir SQL enjeksiyonu böylece tüm veritabanını okuma, değiştirme veya silme imkânına dönüşebilir. Hesap yalnızca gerekli işlemlere yetkili olsaydı aynı açıklık daha sınırlı sonuç doğururdu. Tasarım bu nedenle [yetkilendirmeyi](glossary:authorization) yalnızca “kim?” sorusuna değil, “hangi işlemi yapabilir?” sorusuna da bağlar.

### 2. Yetkilerin ayrılığı — Separation of privilege / Separation of duties

Kritik bir işlem tek kişiye veya tek koşula bağlı olmamalıdır. Örneğin bir çalışan ödemeyi hazırlar, başka bir çalışan onaylar. Aynı kişi tedarikçi ekleyip ödemeyi de onaylayabiliyorsa sahte tedarikçiye para aktarabilir; bu olayda yazılım açığı gerekmez. Yetki ayrılığı tek başına bütün suistimalleri engellemez, fakat tek bir hesabın veya kişinin tüm kontrol noktalarını aşmasını zorlaştırır.

### 3. Güvenli varsayılan — Secure by default / Fail-safe defaults

Açıkça izin verilmedikçe erişim reddedilmelidir: sistem varsayılan olarak kapalı başlar. Güvenlik duvarında önce her şeyi engelleyip yalnızca gereken akışları açmak, önce herkese izin verip sonra bazılarını kapatmaktan daha güvenli bir başlangıçtır. Yetki denetimi hata verdiğinde de sistem izin vermek yerine güvenli biçimde reddetmelidir.

Değiştirilmemiş varsayılan parolalı bir yönetim paneli veya herkese açık bulut deposu, kullanıcı özellikle tehlikeli bir işlem yapmadan savunmasız hâle gelir. Bu yaklaşım [hata durumunda kapatma](glossary:fail-closed) ile ilişkilidir: izni doğrulayamamak izin bulunduğu anlamına gelmez.

### 4. Açık tasarım — Open design / Kerckhoffs ilkesi

Bir sistemin güvenliği tasarımının gizli kalmasına değil, anahtarın gizli kalmasına dayanmalıdır. Tasarım tersine mühendislikle, sızıntıyla veya eski bir çalışanın açıklamasıyla ortaya çıkabilir; ortaya çıktığında sistem yine güvenli kalmalıdır. Ciddi kriptografi standartlarının açıkça yayımlanıp incelenebilmesi bu ilkeyle uyumludur. “Kendi gizli algoritmamız bilinmediği için kırılamaz” yaklaşımı ise **belirsizlikle güvenlik — security by obscurity** fikrine dayanır ve tasarım açığa çıktığında çöker.

### 5. Tam aracılık — Complete mediation

Her erişim isteği yetki denetiminden geçmelidir; ilk istekte verilen izin tüm gelecek istekler için sonsuza kadar geçerli sayılmamalıdır. Uygulama belgeyi ilk açışta izin kontrolü yapıp sonucu saklarsa, erişimi iptal edilen eski bir çalışan açık oturumdan belgeye erişmeye devam edebilir. Bu nedenle her yeni istekte uygun kontrolün tekrarlanması gerekir. Kaynak bu ilkeyi [sıfır güven](glossary:zero-trust) mimarisinin köklerinden biri olarak gösterir: önceden kurulmuş bağlantı yeni isteği kendiliğinden yetkili yapmaz.

### 6. Mekanizma ekonomisi — Economy of mechanism (basitlik)

Tasarım, ihtiyacı karşılayan en küçük ve en basit biçimde kurulmalıdır. Her ek özellik daha fazla durum, etkileşim ve incelenecek kod getirir. Ekip tarafından anlaşılamayan bir sistemin güvenliğini gözden geçirmek de zorlaşır. Kaynak, [Log4Shell](glossary:jndi) örneğini hatırlatır: günlük metnindeki adresleri çözümleyip uzaktan kaynak çağırabilen “akıllı” bir özellik, gereksiz karmaşıklığı tehlikeli bir yola dönüştürdü.

### 7. En az ortak mekanizma — Least common mechanism

Birbirinden ayrı kullanıcı ve bileşenlerin paylaştığı mekanizma ve kaynakları azaltın. Paylaşılan bir kaynak veri sızıntısı kanalı veya bir kullanıcının diğerini etkileme yolu olabilir. Kaynak, müşterilerin aynı önbelleği ya da geçici dizini kullandığı ve yeterince yalıtılmadığı çok kiracılı bulut hizmetini örnek verir. Bu ilke, [bellek yalıtımının](glossary:memory-isolation) ve kiracılar arası sınırların önemini açıklar.

### 8. Psikolojik kabul edilebilirlik — Psychological acceptability

Güvenlik düzeni, kullanıcının işini makul ölçüde zorlaştırmalıdır. Aşırı karmaşık parola kuralları ve çok sık ekran kilidi, çalışanları parolayı kâğıda yazmaya veya kuralı aşmaya itebilir. Kâğıt üzerinde katı görünen mekanizma, günlük kullanımda daha zayıf koruma üretebilir. Güvenli yolu kullanmak anlaşılır ve kolay olmalıdır; rahat kullanılan [çok faktörlü kimlik doğrulama](glossary:multi-factor-authentication) bu düşünceye örnektir.

## Tamamlayıcı yaklaşım: derinlemesine savunma

Kaynak açıkça uyarır: **derinlemesine savunma, Saltzer ve Schroeder’in sekiz klasik ilkesinden biri değildir.** İlkeleri tamamlayan katmanlı bir yaklaşımdır. Tek bir kontrole güvenmek yerine, biri başarısız olduğunda diğerlerinin korumayı sürdürmesini hedefler.

Kaynağın eş merkezli katman çiziminde **insan, cihaz, ağ, uygulama, veri ve politika** yer alır; açıklama her katmanın diğerleri düştüğünde de koruma sağlaması gerektiğini söyler. Kale benzetmesinde hendek, sur, kule ve iç kale gibi ardışık engeller düşünülür. İnsan katmanı çizimde özellikle bulunur: güçlü teknik önlemler bile kandırılan bir kullanıcıyla aşılabilir; eğitim ve kurum kültürü de savunmanın parçasıdır. Hiçbir katman kusursuz sayılmadığı için farklı engellerin birlikte bulunması değerlidir.

**Ek öğretim örneği:** Bir çalışan zararlı eki açarsa, en az yetki sürecin erişebileceği veriyi sınırlayabilir; ağ yalıtımı dış bağlantıyı engelleyebilir; yedekler verinin geri yüklenmesine yardım edebilir. Bu önlemler olayı yok saymaz, tek hatanın tüm kayba dönüşmesini zorlaştırır.

## Güncel tamamlayıcı ilkeler

- **Sıfır güven — Zero trust:** “Asla otomatik güvenme, her isteği doğrula.” İç ağda olmak tek başına güven kanıtı değildir.
- **Saldırı yüzeyini küçültme — Attack surface reduction:** Gerekmeyen port, hizmet, hesap ve özellikleri kapatın. Var olmayan bir giriş noktasını kullanmak mümkün değildir.
- **Tasarımda güvenlik ve mahremiyet — Security/privacy by design:** Güvenlik ve mahremiyeti sonradan eklenen yamalar değil, ilk tasarım gereksinimleri olarak ele alın.

Bu yaklaşımlar klasik sekiz ilkenin yerine geçmez; onları tamamlar. Bir tasarımı incelerken şu sorular pratik bir kontrol listesi oluşturur: Her bileşen en az yetkide mi? Varsayılan kapalı mı? Tasarım açığa çıksa da güvenli mi? Her istek denetleniyor mu? Mekanizma gereğinden karmaşık mı? Paylaşılan kaynaklar yalıtılmış mı? Kullanıcı bu düzeni sürdürebilir mi? Bu sorular, güvenliği ürün seçimi olmaktan çıkarıp tasarımın incelenebilir bir niteliğine dönüştürür.
