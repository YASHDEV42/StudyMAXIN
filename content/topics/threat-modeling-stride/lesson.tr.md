> **Kaynak kapsamı:** 1.5’in başlangıcı ve 1.5.1; `teori-1-1-42.pdf` fiziksel sayfa 27–29, basılı sayfa 16–18. Sayfa 27’deki önceki 1.4 metni ve sayfa 30’da başlayan DREAD kapsam dışıdır. Çevrim ve iki STRIDE tablosu görsel olarak kontrol edilmiştir. “Yazar açıklaması” olarak belirtilen karşılaştırmalar, kaynağın mekanizmasını açan ek anlatımlardır.

## Hangi soruyu çözmeye çalışıyoruz?

“Her şeyi bütün saldırganlardan koruyalım” bir tasarım kararı değildir: neye öncelik verileceğini ve savunmanın yeterli olup olmadığını söylemez. [Tehdit modelleme](glossary:threat-modeling), sistemin nasıl zarar görebileceğini tasarım aşamasında düşünerek, korunacak değer ile saldırı yolları ve önlemler arasında gerekçeli bağ kurar. [Varlık, tehdit ve zafiyet](topic:security-core-vocabulary) ayrımını bu nedenle önceden bilmek gerekir.

Kaynağın çevriminde dört soru vardır: **Neyi koruyoruz? Kimden koruyoruz? Nasıl saldırabilirler? Yeterince iyi savunuyor muyuz?** Son sorudan sonra başa dönülür. Bir API, kullanıcı rolü veya bağımlılık değiştiğinde eski model aynı sistemi anlatmayabilir; model bir defalık belge değil, güncellenen bir açıklamadır.

Tasarım hatasını henüz kâğıt üzerindeyken görmek, çalışan sistemdeki bir ihlali düzeltmekten genellikle daha az maliyetlidir. Kaynak bunun önemini kuvvetli bir maliyet karşılaştırmasıyla vurgular; burada herhangi bir evrensel “bin kat” tasarruf ölçümü varsaymıyoruz. Kazanç, yanlış kararı daha erken fark etme olanağıdır.

## Önce veri akışını görünür kıl

Bir [veri akış diyagramı — DFD](glossary:data-flow-diagram), verinin nereden geldiğini, hangi işlemden geçtiğini, nerede saklandığını ve nereye gittiğini gösterir. Kaynak dört öğe kullanır:

| Öğe         | Anlamı                                   | Kaynak örnekleri               |
| ----------- | ---------------------------------------- | ------------------------------ |
| Dış varlık  | İncelenen işleme dışarıdan katılan taraf | Kullanıcı, üçüncü taraf servis |
| Süreç       | Girdiyi işleyen bileşen                  | Web sunucusu, API              |
| Veri deposu | Kalıcı veya saklanan veri                | Veritabanı, dosya sistemi      |
| Veri akışı  | Öğeler arasındaki aktarım                | İstek, yanıt veya bağlantı oku |

Bunlara [güven sınırları](glossary:trust-boundary) eklenir: güven düzeyinin ya da güven varsayımının değiştiği yerler. İnternet ile sunucu, sunucu ile veritabanı arasındaki geçişler kaynağın örnekleridir. Sınır, dört öğenin yanına eklenen beşinci veri işleme türü değildir; öğeleri ve akışları ayıran bir işarettir.

**Yazar açıklaması:** “İstek uygulamamıza geldi” ile “içindeki kullanıcı/işlem iddiasına güvenebiliriz” ayrı önermelerdir. Sınırı geçerken hangi iddiayı doğrulayacağımızı belirlemek, diyagramı yalnız bir kutu-ok çiziminden güvenlik modeline dönüştürür. Her uygulamanın sınırları aynı değildir; kaynak örneğini kendi mimarisinin yerine otomatik olarak koymamak gerekir.

## STRIDE: altı farklı kayıp türünü sor

Microsoft tarafından geliştirilen [STRIDE](glossary:stride), tehditleri altı sınıfta aramayı sağlar. Kaynak bunları [CIA hedefleri](topic:cia-security-goals) ile [kimlik, yetki ve inkâr edilemezliğin](topic:identity-access-accountability) olumsuzları olarak eşler:

| Harf | İngilizce              | Türkçe anlamı                                | Kaynaktaki hedef eşlemesi |
| ---- | ---------------------- | -------------------------------------------- | ------------------------- |
| S    | Spoofing               | Kimlik taklidi                               | Kimlik doğrulama          |
| T    | Tampering              | Yetkisiz veri değişikliği, kurcalama         | Bütünlük                  |
| R    | Repudiation            | Eylemi inkâr; bunu çürütecek kanıtın yokluğu | İnkâr edilemezlik         |
| I    | Information disclosure | Bilgi ifşası                                 | Gizlilik                  |
| D    | Denial of service      | Hizmeti engelleme                            | Erişilebilirlik           |
| E    | Elevation of privilege | Yetki yükseltme                              | Yetkilendirme             |

**Yazar açıklaması:** Bu tablo düşünmeyi düzenler; gerçek bir olayın yalnız tek harfe ait olması gerekmez. Çalınmış bir oturum, önce taklit etmeye, sonra veri okumaya veya değiştirmeye yol açabilir. Kategorilerin güvenlik hedeflerine eşlenmesi, olayların birbirinden yalıtık olduğu anlamına gelmez.

### S, T ve R: kimlikten kanıta

**Spoofing**, saldırganın başka bir kullanıcı, sunucu veya süreç gibi davranmasıdır. Kaynak, bankaya benzeyen sahte alan adını ve çalınmış oturum çerezini örnekler. Güçlü kimlik doğrulama, passkey/MFA, sunucu kimliğini doğrulayan TLS sertifikaları ve güvenli oturum çerezleri bu riskin farklı noktalarına karşı kullanılır. **Ek açıklama:** Bir sertifikanın varlığı, kullanıcının doğru banka alan adında olduğu sonucunu tek başına vermez; doğruladığımız kimliğin beklediğimiz kimlik olması gerekir.

**Tampering**, depodaki ya da aktarım hâlindeki verinin izinsiz değiştirilmesidir. İstekteki fiyat alanını değiştirmek veya yapılandırma dosyasını bozmak kaynak örnekleridir. Sunucu tarafı doğrulama, HMAC ile bütünlük denetimi, sıkı dosya izinleri ve değişmez altyapı birbirini tamamlayabilir. Bir fiyatı tarayıcıda gizlemek, sunucunun gelen fiyatı güvenilir sayması sorununu çözmez.

**Repudiation**, bir işlemden sonra “ben yapmadım” denildiğinde bunu değerlendirecek güvenilir kanıtın bulunmamasıdır. Kaynak yüksek tutarlı bir işlem örneğini verir. Kurcalamaya karşı korunmuş denetim kaydı, dijital imza ve güvenilir zaman damgası kanıtı güçlendirebilir. Önceki derste olduğu gibi, imzanın kişiyle ilişkilendirilmesi anahtarın doğru kimliğe bağlanmasına ve korunmasına bağlıdır; bir kayıt veya imza koşulsuz insan niyeti kanıtı değildir.

### I, D ve E: veri, hizmet ve yetki

**Information disclosure**, gizli bilginin görmemesi gereken tarafa gitmesidir. Veritabanı yapısını veya yığın izini açığa çıkaran hata mesajı ve gereğinden çok alan döndüren API kaynak örnekleridir. Jenerik hata sayfaları, alan düzeyinde erişim kontrolü, şifreleme ve en az veri ilkesi farklı ifşa yollarını azaltır. **Ek açıklama:** Kullanıcıya ayrıntı göstermemek, işletim ekibinin korunan kayıtlardan hata nedenini inceleyememesi anlamına gelmez.

**Denial of service**, meşru kullanıcının hizmet alamamasıdır. Kaynak hem pahalı sorgularla kaynak tüketimini hem botnet ile bant genişliği doldurmayı ele alır. Hız sınırlama, kaynak kotaları, CDN/DDoS koruması ve otomatik ölçekleme kullanılabilir. **Ek açıklama:** Ölçekleme, tek başına her tüketim sorununu ortadan kaldırmaz; sınır ve maliyet varsayımlarını da değerlendirmek gerekir.

**Elevation of privilege**, normal kullanıcının yönetici gibi daha güçlü yetki elde etmesidir. En az yetki, sağlam izin denetimi, güncel sistemler ve ayrıcalıklı işlemleri ayrıştırma kaynakta verilen azaltımlardır. Kimliği doğru doğrulanmış kullanıcı da yapmaması gereken bir işleme izin veriliyorsa risk oluşturabilir; kimlik doğrulama ile yetkilendirme ayrımı burada yeniden karşımıza çıkar.

## Her harfi her kutuya gelişigüzel uygulama

Kaynağın **STRIDE-per-element** yaklaşımında, DFD öğesine göre başlangıç soruları seçilir. Aşağıdaki tablo fiziksel sayfa 29’daki işaretleri korur:

| DFD öğesi   | S   | T   | R       | I   | D   | E   |
| ----------- | --- | --- | ------- | --- | --- | --- |
| Dış varlık  | ✓   | —   | ✓       | —   | —   | —   |
| Süreç       | ✓   | ✓   | ✓       | ✓   | ✓   | ✓   |
| Veri deposu | —   | ✓   | ✓ (log) | ✓   | ✓   | —   |
| Veri akışı  | —   | ✓   | —       | ✓   | ✓   | —   |

Bir kanal kurcalanabilir, dinlenebilir veya kesilebilir; bir kanalın kendisinin “yöneticiye yükselmesi” anlamlı bir soru değildir. İşlemi yapan süreçte ise altı tür sorun da araştırılır. Deponun R sütunundaki **log** kaydı önemlidir: eylemi çürütecek denetim kanıtının tutulmasıyla ilişkilidir; yalnızca veri depolandığı için otomatik inkâr edilemezlik oluşmaz.

**Yazar açıklaması:** Çizgi, sistemde o tehdidin imkânsız olduğuna dair güvenlik kanıtı değildir. Bu yöntem, seçtiğimiz soyutlamada hangi soruyu hangi öğeye yönelteceğimizi düzenler. Dış kullanıcıyla etkileşen sunucu ve akışlar yine incelenir. Bir kontrolün modelde yer alması da çalıştığının doğrulandığı anlamına gelmez.

Önce DFD ve sınırları çıkar, sonra uygun harflerle somut senaryolar üret, bulguları hedef ve azaltımlarla kaydet. Henüz puan vermedik: **STRIDE tehdit bulma aracıdır**. Öncelik seçimi için [DREAD/PASTA](topic:threat-prioritization-methods), tüm adımların birlikte nasıl göründüğü için [not portalı modeli](topic:attack-trees-portal-model) ile devam edebilirsin. Kaynağın sözünü ettiği laboratuvar föyü sağlanmadığından burada yapılmış bir laboratuvar uygulaması iddia edilmiyor.
