> **Kaynak kapsamı:** 1.5.2–1.5.3; `teori-1-1-42.pdf` fiziksel sayfa 30–31 / basılı sayfa 19–20. DREAD tablosundaki sayılar ve PASTA aşamaları özgün sayfalardan kontrol edilmiştir. Ağırlıklandırmanın yeniden hesabı ve ölçüm sınırları yazar açıklamasıdır; puanlar gerçek bir üniversitede ölçülmüş olay verisi değildir.

## Tehdit bulduk; hangisini önce ele alacağız?

[STRIDE](topic:threat-modeling-stride) ile birden çok tehdit üretmek, aralarındaki önceliği belirlemekle aynı iş değildir. Bir portalın hem not değiştirilebilme kusuru hem yoğunlukta çökme riski varsa, sınırlı zamanımızı nereye ayıracağız? Kaynak iki farklı araç sunar: **DREAD**, senaryoları puanlayarak karşılaştırır; **PASTA**, iş amacından başlayıp saldırı ve risk analizine uzanan bütün süreci düzenler.

Bunlar alternatif isim verilmiş aynı yöntem değildir. Bir yöntem sınıf, biri puan, biri süreç üretir. Hangisine ihtiyaç duyduğumuzu ayırmak, “bir tablo doldurduk, model bitti” yanılgısını önler.

## DREAD: beş boyut aynı senaryoya bakar

[DREAD](glossary:dread), kaynağın örneğinde her boyuta 1–10 arasında puan verir. Yüksek puan daha yüksek önceliğe katkıda bulunur. Özellikle Exploitability sütununda “çok beceri istiyor” ile “kolay sömürülüyor” yönünü karıştırmamak gerekir: ekip ölçeğini ortak tanımlamalıdır.

| Boyut           | Türkçe karşılığı ve soru                                       |
| --------------- | -------------------------------------------------------------- |
| Damage          | Zarar: gerçekleşirse ne kadar zarar verir?                     |
| Reproducibility | Tekrarlanabilirlik: aynı saldırıyı tekrarlamak ne kadar kolay? |
| Exploitability  | Sömürülebilirlik: ne kadar çaba veya beceri gerektirir?        |
| Affected users  | Etkilenen kullanıcılar: kapsam ne kadar geniş?                 |
| Discoverability | Keşfedilebilirlik: açıklığı bulmak ne kadar kolay?             |

Damage ile Discoverability aynı harfle başladığından formülü açık yazmak daha güvenlidir:

`Toplam = D_zarar + R + E + A + D_keşif`

`Ortalama = Toplam / 5`

Her boyut 1–10 ise toplam **5–50**, ortalama **1–10** aralığındadır. Aynı beş boyut, aynı ölçek ve eşit ağırlık kullanılıyorsa ortalama sıralamayı değiştirmez; yalnızca sayının sunumunu değiştirir. Bu son çıkarım, formülden elde edilen yazar açıklamasıdır.

## Kaynağın üç tehdit örneğini hesapla

| Senaryo                              | Zarar | Tekrar | Sömürü | Kullanıcı | Keşif | Toplam | Ortalama |
| ------------------------------------ | ----- | ------ | ------ | --------- | ----- | ------ | -------- |
| A: Öğrenci kendi notunu değiştirir   | 9     | 7      | 6      | 5         | 6     | 33     | 6,6      |
| B: Sınav gecesi portal DoS ile çöker | 5     | 8      | 7      | 9         | 8     | 37     | 7,4      |
| C: Hata SQL yapısını açığa çıkarır   | 3     | 9      | 5      | 4         | 7     | 28     | 5,6      |

A için `9 + 7 + 6 + 5 + 6 = 33`; B için `5 + 8 + 7 + 9 + 8 = 37`. Eşit ağırlıklı sıra **B > A > C** çıkar. Fakat not değiştirebilmek akademik güvenilirliği zedelediğinden, kurum bu tehdidi kısa bir kesintiden daha yıkıcı bulabilir. Çelişki aritmetikte değil, seçilen değer modelindedir: B’nin yüksek tekrar/kullanıcı/keşif puanları, daha düşük zarar puanını telafi etmiştir.

Kaynak Damage’a iki kat ağırlık vermeyi gösterir. **Kontrol edilmiş hesap:** `A = 33 + 9 = 42`, `B = 37 + 5 = 42`, `C = 28 + 3 = 31`. İki kat ağırlık A’yı B’nin önüne geçirmez; **eşitler**. Üç kat ağırlıkta `A = 33 + 2×9 = 51`, `B = 37 + 2×5 = 47`, `C = 28 + 2×3 = 34`; bu kez A öne geçer. Kaynağın daha sonraki portal örneğindeki “zararı ağırlıklandırınca A öne çıkar” ifadesi, örneğin bu üç kat seçimiyle anlaşılmalıdır.

**Yazar açıklaması:** Ağırlıklı toplam artık ilk eşit-ağırlıklı 5–50 ölçeğiyle aynı aralıkta değildir. Yeniden bir ortalama istenirse toplamı ağırlıkların toplamına bölmek gerekir; iki kat zarar için payda 6, üç kat için 7 olur. Bu bir ölçek açıklamasıdır; kaynakta yeni bir zorunlu DREAD standardı olduğu iddia edilmiyor.

## Sayı, yargının yerine geçmez

DREAD’in iki temel sınırı kaynağın tartışmasının merkezindedir: **eşit ağırlık iş bağlamını yeterince yansıtmayabilir** ve **puanlar özneldir**. İki değerlendirici aynı senaryoya farklı sayı verebilir. Tutarlı ölçek, açık gerekçe ve aynı ekibin karşılaştırması bu nedenle önemlidir.

Kaynak Microsoft’un modeli zamanla resmî süreçten çıkarmasını bu öznellikle ilişkilendirir. Buradan çıkaracağımız ders, puanı evrensel ve güncel bir kurum standardı gibi sunmamak; kararın varsayımlarını görünür kılmaktır. **Ek açıklama:** 7,4 puan, %74 saldırı olasılığı veya 7,4 liralık beklenen kayıp değildir. DREAD’in sıralama sayısı, para ve olasılık birimlerini taşıyan nicel bir risk hesabıyla aynı şey değildir.

## PASTA neden işe iş hedefiyle başlar?

[PASTA](glossary:pasta), **Process for Attack Simulation and Threat Analysis** açılımına sahiptir. Kaynak onu saldırgan bakışını, gerçek tehdit bilgisini ve iş etkisini birleştiren yedi aşamalı metodoloji olarak anlatır:

1. **İş hedeflerini tanımla.** Sistem ne işe yarıyor, hangi yükümlülüklere tabi, hangi amaç ihlalden zarar görür? Güvenlik hedefi burada iş değerine bağlanır.
2. **Teknik kapsamı belirle.** Bileşenleri, bağımlılıkları, altyapıyı ve teknoloji yığınını envanterle. İncelemeye neyin girdiği açık olsun.
3. **Uygulamayı ayrıştır.** DFD, giriş noktaları, veri akışları ve güven sınırlarını çıkar. Kutuların ilişkilerini anlamadan tehdit arama.
4. **Tehdit analizi yap.** [Tehdit istihbaratı](glossary:threat-intelligence) ile bu sektörü hedefleyen aktör ve teknikleri değerlendir. “Herhangi bir saldırgan” ifadesi somutlaşsın.
5. **Zafiyetleri analiz et.** CVE’leri, yanlış yapılandırmaları ve tasarım kusurlarını belirleyip önceki aşamanın tehditleriyle eşleştir.
6. **Saldırıyı modelle.** Tehdidin zayıflıktan nasıl yararlanacağını, saldırı ağaçları ve uygun saldırı simülasyonlarıyla incele.
7. **Risk ve etkiyi değerlendir.** Senaryoları iş etkisi, öncelik ve maliyet-fayda açısından değerlendir; azaltım kararını ver.

Sıra neden önemlidir? Birinci aşamada not bütünlüğünün iş açısından kritik olduğunu söylemezsek, yedinci aşamada teknik puanı amaçtan bağımsız yorumlarız. DFD’yi atlayınca hangi sınırdan gelen girdiye güvendiğimizi kaçırabiliriz. Tehdit ve zafiyet analizini ayırmak da bir saldırganın varlığı ile kullanılabilir bir zayıflığın aynı şey olmadığını hatırlatır.

## Araçları birbirinin yerine koyma

| Yaklaşım      | Ürettiği şey                              | Kaynağın ölçek konumlandırması |
| ------------- | ----------------------------------------- | ------------------------------ |
| STRIDE        | Öğe bazında tehdit sınıfları/senaryolar   | Küçük–orta                     |
| DREAD         | Senaryolar arasında öncelik puanı         | Her ölçek                      |
| Saldırı ağacı | Hedefe giden yollar ve maliyet ilişkileri | Orta                           |
| PASTA         | İş odaklı uçtan uca süreç                 | Büyük/kritik                   |

Bu ölçekler kaynağın pratik rehberidir; küçük projelerin ağaç kullanamayacağı veya her büyük kurumun PASTA kullanmak zorunda olduğu anlamına gelmez. STRIDE ve saldırı ağaçları, PASTA’nın içinde araç olabilir. Kaynak bankacılık ve sağlık gibi kritik/düzenlenen bağlamlarda kapsamlı sürecin yararını, küçük projede yedi aşamanın yükünü vurgular.

Sonuçta iyi öncelik “en yüksek sayıyı seçtim” değil, neden o senaryoya önce müdahale ettiğini açıklayabilmektir. [Saldırı ağaçları ve portal modeli](topic:attack-trees-portal-model), yolları ve azaltımları bu karara nasıl bağlayacağımızı gösterir.
