> **Kaynak kapsamı:** 1.5.4–1.5.6, `teori-1-1-42.pdf` fiziksel sayfa 32–34 / basılı sayfa 21–23. Sayfa 34’te başlayan 1.6 hariçtir. İki ağaç çizimi, maliyet kutusu ve risk kaydı tablosu görsel olarak incelenmiştir. Aşağıdaki metin ağacı, çizimdeki yolları ve maliyet örneğinin açık VE/VEYA varsayımlarını birlikte görünür kılar. “Yazar açıklaması” işaretli sınırlar ek öğretici açıklamalardır.

## Tek bir saldırı yolunu kapatmak neden yetmeyebilir?

E-posta hesabını güçlü bir parolayla koruduğunu düşün. Hesabı kurtarma yolu daha kolay aşılabiliyorsa saldırgan parolayı zorlamak zorunda değildir. [Saldırı ağacı](glossary:attack-tree), bir hedefe ulaşmanın alternatif yollarını aynı modelde göstererek bu kör noktayı azaltır. Kaynak, Bruce Schneier’in popülerleştirdiği bu yaklaşımı STRIDE’nin ürettiği senaryoları yol ilişkileriyle düşünmek için kullanır.

Kök, saldırganın nihai amacıdır. Dallar alt hedefleri ve alternatif yolları, yapraklar somut adımları temsil eder. Yolları birleştiren **VEYA — OR**, alt yollardan birinin yeterli olmasıdır. **VE — AND**, alt koşulların birlikte gerçekleşmesini gerektirir. Bu ayrımı yazmadan yalnız kutuları birleştirmek, neyin yeterli olduğunu belirsiz bırakır.

## Kaynağın e-posta ağacını açık kapılarla oku

Kaynak çiziminde üç ana yol vardır: parolayı ele geçirmek, oturumu çalmak ve kurtarma akışını kırmak. Sayısal kutu, parola ve kurtarma dallarını özellikle VE kabul eder. Aynı varsayımlarla metin gösterimi şöyledir:

```text
E-posta hesabına eriş [VEYA]
├─ Parolayı ele geçir [VE: bu örneğin varsayımı]
│  ├─ Oltalama e-postası: 100
│  └─ Tuş kaydedici kurma: 400
├─ Oturumu çal
│  └─ XSS ile çerez hırsızlığı: 700
└─ Kurtarma akışını kır [VE: bu örneğin varsayımı]
   ├─ SIM değiştirme: 300
   └─ Güvenlik sorusu tahmini: 50
```

Bu, bir sisteme saldırma komutları değil; savunma kararını anlamak için verilen hedef/koşul modelidir. Özellikle parola dalındaki **hem oltalama hem tuş kaydedici** gereği evrensel bir saldırı kuralı değildir. Kaynak hesap örneğini böyle kurmuştur. Gerçek sistemde bu yollar alternatifse VEYA kullanmak ve sonucu yeniden hesaplamak gerekir.

Her yaprağa maliyet, başarı olasılığı ya da beceri gereksinimi gibi nitelikler eklenebilir. Kaynağın sayısal örneği yalnız **kaba çaba/para maliyeti** kullanır:

- VEYA düğümünde, amaca yeterli **en ucuz** alt yol seçilir: `maliyet = min(alt maliyetler)`.
- VE düğümünde tüm alt adımlar gerekir: basit toplamsal modelde `maliyet = toplam(alt maliyetler)`.

Parola dalı `100 + 400 = 500`, oturum dalı `700`, kurtarma dalı `300 + 50 = 350` olur. Kökte `min(500, 700, 350) = 350`. Bu varsayımlar altında en ucuz yol kurtarma akışıdır. Kaynak, SIM devrine karşı operatör koruması ve güvenlik sorularını kaldırıp MFA’ya geçişi bu yola yönelik savunmalar olarak anıyor.

**Yazar açıklaması:** Bu sayılar gerçek piyasa fiyatı değildir. Toplama, adımların maliyetlerinin toplanabildiğini ve aralarında yeniden kullanım gibi bağımlılıkların ayrıca modellenmediğini varsayar. Başarı olasılığı yazdığımızda aynı min/toplam kuralını körlemesine kullanamayız; bu ders yalnız kaynakta verilen maliyet hesabını işler. Ağacın çizilmesi de aklımıza gelmemiş bütün yolları keşfettiğimizin kanıtı değildir.

## Savunma düğümleri hangi yolu etkiliyor?

[Saldırı–savunma ağacı](glossary:attack-defense-tree), saldırı düğümlerine karşı önlemleri ekler; gerekirse bunlara karşı saldırganın yeni hamlesi de gösterilir. Kaynağın ikinci çizimindeki amaç **not kaydını değiştirmek**tir. İki yol ve karşılıkları vardır:

| Saldırı yolu                                 | Kaynakta karşı önlem                | Neden bu yolla ilişkili?                                       |
| -------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- |
| Öğretim üyesi hesabını oltalamayla ele geçir | MFA + farkındalık eğitimi           | Hesap ele geçirme yolunu zorlaştırır                           |
| Yetkilendirme açığını, örneğin IDOR’u kullan | RBAC + sunucu tarafı yetki kontrolü | Yanlış role veya yanlış kayda işlem iznini engellemeyi amaçlar |

MFA, doğru giriş yapmış öğrenciye sunucunun yanlış not kaydını değiştirme izni vermesini düzeltmez. Tersine, yalnız izin modelini doğru kurmak da öğretim üyesinin hesabıyla işlem yapan saldırganın kimlik sorununu tek başına çözmez. İki dala ayrı savunma düşünmek bu nedenle gereklidir.

**Yazar açıklaması:** Kaynak savunmanın yolu “kapatması” dilini kullanır; burada bunu kontrolün amaçladığı etki olarak okuyoruz. MFA türü, uygulama doğruluğu ve artık yollar değerlendirilmeden kusursuz engelleme iddia edilmez. [RBAC](glossary:role-based-access-control), rolün izinlerini belirler; [IDOR](glossary:idor) riskine karşı ayrıca **bu öznenin bu nesneye bu işlemi yapma hakkı** sunucuda denetlenmelidir. Rol kontrolü tek başına nesne düzeyindeki soruyu her zaman yanıtlamaz.

Maliyet ve etkinlik eklediğimizde hangi savunmanın hangi yolu pahalılaştırdığını karşılaştırabiliriz. Savunmasız bir alternatif kalıyorsa en güçlü kontrolün varlığı kök hedefin korunduğunu göstermez. Bu, kaynağın derinlemesine savunmaya bağladığı düşüncedir; ağaçtaki varsayımlar ve kalan yollar yine önemlidir.

## Portal örneği: önce varlıklar ve akış

Kaynağın üniversite portalında öğrenciler notlarını görür, öğretim üyeleri not girer. Üç bileşen vardır: tarayıcı, web sunucusu, veritabanı. Amaç yalnız makineyi korumak değildir: **not bütünlüğü** ve **öğrenci verilerinin gizliliği** birincil, sınav dönemindeki **erişilebilirlik** de önemli bir varlıktır.

```text
Tarayıcı (dış varlık)
    ↔ HTTPS isteği/yanıtı
Web sunucusu (süreç)
    ↔ SQL sorgusu/sonucu
Veritabanı (veri deposu)
```

Kaynak iki güven sınırı çizer: internet–web sunucusu ve web sunucusu–veritabanı. **Ek açıklama:** Çift yönlü ok, örneğin okunabilir gösterimi için kullanılmıştır; istek ve yanıtı ayrı akışlar olarak daha ayrıntılı göstermek mümkündür. Diyagram gerçek bir sisteme ait ölçüm değil, kaynakta işlenen basit modeldir.

## Altı harfle somut tehdit ve azaltım üret

[STRIDE](topic:threat-modeling-stride) burada soyut etiket olmaktan çıkar:

| Kategori | Portalda soru                                                 | Kaynakta azaltım                                  |
| -------- | ------------------------------------------------------------- | ------------------------------------------------- |
| S        | Başka öğrencinin oturumu ele geçirilebilir mi?                | Güvenli oturum yönetimi, MFA                      |
| T        | İstek değiştirilerek başkasının notu güncellenebilir mi?      | Sunucuda özne–kayıt–işlem yetkisi                 |
| R        | Öğretim üyesi yaptığı değişikliği kanıtsız inkâr edebilir mi? | Değişmez/kurcalamaya karşı korunmuş denetim kaydı |
| I        | Hata mesajı SQL sorgusunu açıklıyor mu?                       | Jenerik kullanıcı hataları                        |
| D        | Sınav gecesi yük hizmeti durdurabilir mi?                     | Yük dengeleme, önbellekleme                       |
| E        | Öğrenci öğretim üyesi rolüne yükselebilir mi?                 | RBAC, en az yetki                                 |

Burada başka öğrencinin notunu okumak ile değiştirmek de ayrı ele alınır: ilki gizlilik, ikincisi bütünlük sorusudur. Birini engelleyen kontrolün diğerini otomatik olarak engellediğini varsayma.

## Öncelikten risk kaydına geç

[DREAD örneğinde](topic:threat-prioritization-methods) ham puan DoS’u öne çıkarıyordu. Kaynak portal yorumunda akademik güvenilirliğe verilen ağırlık nedeniyle not değiştirmeyi yüksek öncelikli sayar. İki kat zarar ağırlığı eşitlik, üç kat ağırlık not değişimine üstünlük verir; nitel son kararın gerekçesi iş etkisidir. Aşağıdaki öncelikler kaynağın senaryoya özgü değerlendirmesidir; her üniversiteye taşınacak ölçülmüş sonuç değildir.

| Tehdit                  | Etkilenen hedef  | Örnek öncelik | Seçilen azaltım                            |
| ----------------------- | ---------------- | ------------- | ------------------------------------------ |
| Kendi notunu değiştirme | Bütünlük         | Yüksek        | Sunucu tarafı yetki + RBAC + denetim kaydı |
| Başkasının notunu görme | Gizlilik         | Yüksek        | Nesne düzeyi yetki, IDOR koruması          |
| Oturum ele geçirme      | Kimlik doğrulama | Orta          | MFA + güvenli çerez                        |
| Sınav gecesi DoS        | Erişilebilirlik  | Orta          | Yük dengeleme + hız sınırı                 |
| Hata mesajıyla ifşa     | Gizlilik         | Düşük         | Jenerik hata sayfası                       |

Bu tablo bir [risk kaydıdır — risk register](glossary:risk-register): tehdit, hedef, öncelik ve azaltım birlikte görünür. **Yazar ek önerisi:** Gerçek bir izleme kaydına sorumlu kişi, doğrulama ve yeniden gözden geçirme tarihi de eklenebilir; bunlar kaynak tablosunun mevcut sütunları değildir.

Son adım seçilen önlemi uygulayıp etkisini değerlendirmek ve model değişince tekrar bakmaktır. “Tehdidi yazdık” ile “riski ortadan kaldırdık” aynı şey değildir. Kaynağın ayrı laboratuvara yönlendirmesi burada uygulanmış bir çalışma olarak sunulmaz; elimizde tamamlanmış olan, teorik örneğin açıklamasıdır.
