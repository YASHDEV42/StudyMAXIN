## Kavramdan Karara: Birinci Bölümün Çözümlü Alıştırmaları

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.13, `teori-1-43-89.pdf`, fiziksel sayfa 7–11 (basılı sayfa 38–42): 15 çözümlü alıştırma, sekiz “Kendini Sına” sorusu, cevap anahtarı ve hafta özeti. Bölüm 1, basılı sayfa 42’deki özetten sonra biter; sonraki fiziksel sayfa 12, 2. bölüm ayırıcısıdır.

Bu alıştırmalar yalnızca terim hatırlamayı değil, doğru modeli seçip gerekçelendirmeyi çalıştırır. Önce durumdaki varlığı veya amacı belirleyin; sonra uygun güvenlik hedefini, puanlama yöntemini ya da risk modelini kullanın. Kaynaktaki 15 alıştırmanın tamamı aşağıda açıklanmıştır; ek hesap düzeltmeleri açıkça işaretlenmiştir.

## Alıştırmalar 1–5: Hedefler, tehditler ve tasarım

### 1. Hastanede fidye yazılımı ve CIA

Fidye yazılımı hasta kayıtlarını şifreleyip sağlık çalışanlarının erişimini engelliyorsa **erişilebilirlik — Availability** kesin olarak etkilenmiştir. Saldırgan gerçekten bir kopya sızdırdıysa **gizlilik — Confidentiality** de ihlal edilir. Yalnızca şifreleme olması **bütünlüğün — Integrity** mutlaka bozulduğunu göstermez: veri değiştirilmemiş ve temiz yedekten kurtarılabiliyorsa bütünlük ihlali zorunlu değildir. Kayıtlar değiştirilmiş veya yok edilmişse bütünlük de etkilenir. Bir olay birden fazla hedefi vurabilir; gerçekleşen etkiyi tehditle karıştırmayın.

### 2. Gizli şifreleme algoritması ve Kerckhoffs

“Algoritmamız gizli, dolayısıyla güvenli” iddiası güvenlik kanıtı değildir. **Kerckhoffs ilkesi**, şifrelemenin güvenliğinin algoritmanın gizli kalmasına değil, anahtarın gizliliğine dayanmasını söyler. Tasarım tersine mühendislik, sızıntı veya çalışan ayrılığıyla açığa çıkabilir. Uzman incelemesinden geçmeyen kapalı algoritmada fark edilmemiş hatalar da kalabilir. Ciddi şifreleme tasarımlarının açıkça incelenmesi bu nedenle değerlidir; yalnızca gizlilik dayanıklılık göstermez.

### 3. Mobil bankacılık uygulamasının saldırı yüzeyi

Üç örnek ve daraltma yöntemi:

1. **Yeni genel API uç noktası:** yalnızca gerekli uç noktaları açıp geri kalanını kapat.
2. **Üçüncü taraf reklam/analiz SDK’sı:** gerçekten gerekiyorsa güvenilir bileşen seç ve asgari izni ver.
3. **Root/jailbreak desteği veya geniş yetkili WebView:** yetenekleri sınırla ve gerektiğinde cihaz bütünlüğünü denetle.

Ortak ilke kullanılmayan yetenekleri kapatmaktır. Saldırı yüzeyini küçültmek kalan her noktayı güvenli yapmaz; savunulması gereken giriş ve etkileşim sayısını azaltır.

### 4. STRIDE kategorilerini güvenlik hedefleriyle eşleştirme

- **Elevation of privilege — Yetki yükseltme:** yetkilendirme ve rol sınırlarını tehdit eder. En az yetki, rol tabanlı erişim kontrolü ve güncelleme önerilebilir.
- **Repudiation — Eylemi inkâr:** yapılan eylemin kanıtlanmasını tehdit eder. Güvenilir, kurcalamaya dayanıklı denetim kayıtları ve dijital imzalar yardımcı olabilir.

Azaltım riski düşürür veya incelemeyi destekler; her kontrolün kusursuz çalıştığı varsayılmaz.

### 5. Bir veri akışına STRIDE uygulama

Bir kanal **kurcalanabilir (T)**, dinlenerek **bilgi ifşasına (I)** uğrayabilir veya kesilerek **hizmet dışı bırakılabilir (D)**. Kanalın kendisi kimlik taklidi yapan ya da yetki yükselten bir aktör değildir; **Repudiation (R)** de kaynak sınıflamasında aktör davranışıdır. Kaynak, depolanan kayıtlar için R’nin günlük kayıtlarıyla ilgili olabileceğini ayrıca belirtir. Bu nedenle DFD’de her STRIDE harfini her öğeye otomatik atamayın. Akış için tipik azaltım TLS ile gizlilik ve bütünlüğü korumaktır.

## Alıştırmalar 6–10: Öncelik, risk ve getiri

### 6. DREAD: puan toplamı ve ağırlıklar

Kaynağın puanları:

- X: Damage 9, Reproducibility 4, Exploitability 3, Affected users 6, Discoverability 4.
- Y: Damage 4, Reproducibility 9, Exploitability 8, Affected users 7, Discoverability 8.

Eşit ağırlıklı toplamlar `X=26`, `Y=36`; Y 10 puan öndedir. Damage iki kat sayılırsa `X=35`, `Y=40`; Y önde kalır ama fark 5’e iner. **Aritmetik düzeltmesi:** Damage üç kat sayıldığında `X=44`, `Y=44` olur; yani berabere kalırlar. Kitap metni bu ağırlıkta X’in öne geçebileceğini söyler, ancak verilen sayılar bunu göstermiyor. Aynı varsayımlarla Damage dört kat sayılırsa `X=53`, `Y=48` olur ve X öne geçer. Bu son hesap, kaynakta yazılı sonuç değil, hatayı görünür kılmak için eklenmiş yeniden hesaplamadır.

DREAD sırası puanlamaya ve ağırlıklara duyarlıdır; puanlar da ekip yargısı içerir. Ölçeğin anlamını ekipçe tanımlayın, tutarlı kullanın ve iş bağlamı gerektiriyorsa ağırlığı gerekçelendirin. Sayıyı kesin ölçüm gibi sunmayın.

### 7. SLE, ARO, ALE ve ROSI

E-ticaret sitesinde `SLE=30.000 TL`, `ARO=4`:

`ALE önce = SLE × ARO = 30.000 × 4 = 120.000 TL`

Çözüm ARO’yu 1’e indirince `ALE sonra=30.000 TL` olur. Risk azalması `90.000 TL`’dir. Yıllık kontrol maliyeti `40.000 TL` ise:

`ROSI = (90.000 − 40.000) / 40.000 = 1,25 = %125`

Varsayımlara göre net yıllık fark `50.000 TL`; bu nedenle yatırım hesap üzerinde mantıklıdır. Sonuç, SLE/ARO tahminlerinin ve maliyetin doğru olmasına bağlıdır.

### 8. Kullanılmayan eski kimlik fotokopileri

En uygun seçenek **kaçınma — Avoidance**: gereksiz veriyi silip saklama işlevini kaldırmak. Şifreleme riski azaltabilir ama ihtiyaç olmayan veriyi tutmaya devam eder. Karar, veriyi gereksiz yere toplamama ve yalnızca gerekli süre saklama düşüncesiyle de uyumludur.

### 9. Küçük bir muhasebe firması için tehdit aktörü

Finansal amaçlı siber suçlu makul bir olası aktördür: muhasebe firması dolandırıcılık veya fidye için değerli olabilir. Devlet destekli APT ise genellikle istihbarat ya da stratejik değer arar; bu küçük firma ona daha az çekici gelebilir. Bu kesin kural değil, olasılık değerlendirmesidir. Temel güvenlik hijyeni ve sağlam yedekler olası tehdide uygun yatırımlardır.

### 10. Passkey öncesi ve sonrası ROA

`V=2000`. Yalnız parola varken `p=0,4`, `Ca=200`:

`ROA = (0,4 × 2000) / 200 = 4`

Passkey sonrası sorudaki varsayımlar `p=0,02`, `Ca=800`:

`ROA = (0,02 × 2000) / 800 = 0,05`

Verilen sayılarla kontrol hem başarı ihtimalini düşürür hem saldırı maliyetini yükseltir; saldırıyı imkânsız değil, çok daha az kârlı yapar.

## Alıştırmalar 11–15: İnsan, katmanlar ve saldırı yolları

### 11. “Bilgi işlemden” gelen acil telefon

Arama **otoriteyi** (BT görevlisi olduğunu söyleme), **aciliyeti** (“hemen”) ve **korkuyu** (ihlal olduğu iddiası) kullanıyor. Bu, bahane uydurma (**pretexting**) yoluyla sesli oltalamadır (**vishing**). Parolayı veya doğrulama kodunu paylaşmayın. Aramayı sonlandırın, önceden bilinen resmî numarayı arayın ve olayı bildirin.

### 12. Yalnızca güvenlik duvarına güvenmek

Sıfırıncı gün açığı, yanlış yapılandırma veya içeriden bağlantı duvarı aşarsa tek savunma katmanı çöker. Uç nokta koruması EDR, ağ bölümleme, MFA veya sıfır güven erişimi, yedekler ve denetim kayıtları ek katman olabilir. Soru en az iki katman ister. Amaç, biri başarısız olduğunda etkiyi sınırlamaktır; katmanların kusursuz olduğu varsayılmaz.

### 13. Öğrenci portalı saldırı ağacı ve en ucuz yol

Kök hedef “öğrencinin kendi notunu yükseltmesi”; örnek ağacın üç dalı **VEYA**dır: öğretim üyesinin hesabını oltalamayla ele geçirmek (maliyet 100), IDOR kullanmak (300), SQL injection ile veritabanına erişmek (500). VEYA kökte maliyet en düşük dalın `min(100,300,500)=100` değeridir. Örnekte en ucuz yol oltalamadır; kaynak bu nedenle MFA ve farkındalıkla öncelikle o yolu ele almayı önerir. Maliyetler karşılaştırma için varsayımsal birimdir; para veya olasılık değildir.

### 14. Her dala savunma ekleme

- Oltalama/hesap ele geçirme → MFA ve farkındalık.
- IDOR → sunucu tarafında her nesne için yetki kontrolü.
- SQL injection → parametreli sorgular ve en az yetkili veritabanı hesabı.

Bir kullanılabilir dal savunmasız kalırsa, saldırgan diğer dallardaki pahalı savunmaları aşmak zorunda olmayabilir. Tüm hedef yollarını kapsayın ve kontrolleri test edin; saldırı-savunma ağacına savunma düğümü çizmek onun etkili olduğunu kanıtlamaz.

### 15. Kill Chain’i teslim ve C2’de kesmek

**Teslim (Delivery)** aşamasında oltalama filtresi, ek taraması ve kullanıcı farkındalığı zararlı iletinin ulaşmasını veya açılmasını engelleyebilir. **Komuta ve kontrol (C2)** aşamasında dış bağlantıları izlemek, şüpheli hedefleri engellemek veya DNS filtreleme saldırganın uzaktan kanalını kesebilir. Bir halkayı kesmek hedefe ulaşmayı durdurabilir; hangi noktanın kullanılacağı gözlem ve kontrol olanağına bağlıdır.

## “Kendini Sına” soruları ve yanıt anahtarı

1. **Hastane fidye yazılımı:** Erişilebilirlik kesin; veri sızdırıldıysa gizlilik; bütünlük değişim/kurtarma durumuna bağlı.
2. **Security by obscurity:** Tasarım açığa çıkabilir; Kerckhoffs güvenliği gizli tasarıma değil gizli anahtara bağlar.
3. **STRIDE veri deposu:** Kurcalama T, bilgi ifşası I, hizmet dışı bırakma D; R günlük kayıtlarında. Kaynağa göre S/E veri deposunun kendi tehdidi değildir.
4. **DREAD zayıflığı:** Öznel puanlama ve eşit ağırlık; ortak tanımlı ölçek ve gerekçeli ağırlıklandırma kullan.
5. **SLE/ALE/ROSI:** `SLE=AV×EF` olay başına kayıp; `ALE=SLE×ARO` yıllık kayıp; ROSI kontrolün risk azaltımını maliyetle karşılaştırır.
6. **Dört risk yanıtı:** azalt, aktar, kabul et, kaçın; gereksiz veriyi silmek kaçınmadır.
7. **ROA:** `p×V/Ca`; `p` ve `V`’yi düşür, `Ca`’yı yükselt.
8. **APT:** Advanced = ileri yetenek; Persistent = uzun süre ısrar; Threat = örgütlü ve kaynaklı tehdit.

## Kaynağın hafta özeti

- Güvenlik, uyarlanabilen bir düşmana ve sistemin yapmaması gerekenlere karşı düşünme biçimidir; tarihi saldırı-savunma rekabetini gösterir.
- CIA hedefleri (gizlilik, bütünlük, erişilebilirlik) arasında denge kurulur; AAA (kimlik doğrulama, yetkilendirme, hesap verebilirlik) bunları tamamlar.
- Tehdit modelleme “neyi, kimden, nasıl koruyoruz?” diye sorar: STRIDE sınıflandırır; DREAD önceliklendirir; ağaçlar yolları; PASTA daha geniş süreci düzenler.
- Nicel riskte `SLE=AV×EF`, `ALE=SLE×ARO`; kontrol getirisi ROSI ile değerlendirilir. Risk azaltılır, aktarılır, kabul edilir veya önlenir; sıfır risk hedef değildir.
- Saltzer–Schroeder ilkeleri ve derinlemesine savunma tasarıma rehber olur; tehdit aktörü profilleri ve Kill Chain saldırı bakışını tamamlar.
- Güvenlik ekonomik, insani, yönetsel ve hukukî boyutları olan sürekli bir süreçtir.

**Sınır notu:** Kaynağın hafta özeti basılı sayfa 42’de biter. Sonraki sayfa, 2. bölümün ayırıcısıdır; bu ders kriptografi 2.1’e geçmez.
