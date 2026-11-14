## Tehdit listesinden karara

Tehdit modelleme, nelerin ters gidebileceğini görünür kılar; risk yönetimi ise sınırlı zaman ve bütçeyle hangisine ne yapılacağını belirler. Bir risk, gerçekleşme olasılığı ile gerçekleştiğindeki etkinin birlikte değerlendirilmesidir. Buradaki çarpım, önceliklendirme sezgisidir; her bağlamda kesin ve nesnel bir fizik yasası değildir. Bu ünitedeki üniversite not portalı örneğinde bir öğrencinin başkasının notunu değiştirmesi bütünlüğü, başkasının kaydını okuması gizliliği, sınav gecesi kesinti ise erişilebilirliği tehdit eder. Tehdidin adı tek başına karar verdirmez: olasılık, sonuç ve kurumun hedefleri birlikte düşünülmelidir.

İki değerlendirme dili kullanılır. **Nitel değerlendirme**, olasılık ve etkiyi düşük/orta/yüksek gibi sınıflara ayırır. Hızlı anlaşılır ve verinin az olduğu yerde işe yarar; ancak sınıf sınırları tanımlı değilse iki değerlendirici aynı olaya farklı etiket verebilir. **Nicel değerlendirme** parasal değer ve sıklık tahminleriyle ortak bir ölçek kurmaya çalışır. Karşılaştırmayı ve kontrol maliyetini tartışmayı kolaylaştırır; girdileri tahmin olduğu için sonuç da belirsizdir. Sayısal görünmesi, kesin olduğu anlamına gelmez.

## Nicel kayıp zinciri

Önce tek bir olayın kaybını, sonra yıl içindeki beklenen tekrarları hesaplarız:

| Terim                               | Anlamı                                         | Bağıntı                           |
| ----------------------------------- | ---------------------------------------------- | --------------------------------- |
| AV (Asset Value)                    | Varlığın parasal değeri                        | Girdi                             |
| EF (Exposure Factor)                | Bir olayda varlığın kaybedilen/etkilenen oranı | Girdi; yüzdeyi ondalık yaz        |
| SLE (Single Loss Expectancy)        | Tek olayın beklenen kaybı                      | `SLE = AV × EF`                   |
| ARO (Annualized Rate of Occurrence) | Olayın yılda beklenen sıklığı                  | Girdi; kesirli olabilir           |
| ALE (Annualized Loss Expectancy)    | Yıllık beklenen kayıp                          | `ALE = SLE × ARO = AV × EF × ARO` |

Örneğin ödeme sunucusunun değeri AV = 200.000 TL, bir kesintinin maruziyeti EF = 0,20 ise SLE = 40.000 TL’dir. Kesinti yılda ortalama üç kez bekleniyorsa ARO = 3 ve başlangıç ALE’si 120.000 TL/yıl olur. Buradaki EF, varlığın fiziksel olarak tam o oranda yok olacağı iddiası değil, modelde kullanılan kayıp oranı tahminidir.

Yıllık 50.000 TL’lik yedeklilik ARO’yu 3’ten 0,5’e düşürür varsayalım. Aynı SLE ile kontrol sonrası ALE = 20.000 TL/yıl olur. Beklenen azalma 120.000 − 20.000 = 100.000 TL’dir. Yatırım getirisinin bu ünitedeki tanımı:

`ROSI = ((ALEönce − ALEsonra) − Kontrol maliyeti) / Kontrol maliyeti`

Dolayısıyla ROSI = (100.000 − 50.000) / 50.000 = 1, yani %100. Pozitif değer, bu varsayımlar altında kontrol maliyetinin üzerinde net fayda; sıfır başabaş; negatif değer ise hesaplanan azalma karşısında maliyetin daha yüksek olduğunu gösterir. ROSI tek başına karar emri değildir: hukuki yükümlülükler, insan güvenliği, itibar ve ölçülmeyen etkiler de önemli olabilir. Tahminler değişince oran da değişir; tek nokta tahmini yerine makul iyimser/kötümser aralıklarla duyarlılık incelemesi daha dürüsttür.

PDF’deki kısa Python aracı bu bağıntıları fonksiyonlara böler: `sle` AV ile EF’yi, `ale` SLE ile ARO’yu çarpar, `rosi` önce/sonra ALE farkından kontrol maliyetini çıkarıp maliyete böler. Bu, formülün hesaplama biçimidir; girdilerin doğruluğunu veya kontrolün gerçekten beklenen etkiyi yaratacağını doğrulamaz. Kod örneği öğretici olarak yeniden ifade edilmiştir; yeni bir risk ölçüm yöntemi değildir.

## Risk matrisi: hızlı sınıflandırma

Risk matrisi, bir eksende olasılığı, diğerinde etkiyi gösterir; hücreler kurumun risk düzeyine verdiği sınıfı taşır. Düşük olasılık ve küçük etkiye yakın B gibi bir olay çoğu zaman kabul edilebilir bölgededir. Yüksek olasılık ile yıkıcı etkiye sahip A gibi bir olay acil öncelik alır. Renkler (yeşil/sarı/kırmızı) karar desteğidir; evrensel eşik değildir. Örneğin “yüksek olasılık” için somut zaman aralığı ve ölçüt tanımlanmazsa matris kişisel kanaati gizleyen bir görsele dönüşür. Kategori ölçütlerini geçmiş veri veya nicel eşiklere bağlamak tutarlılığı artırır; yine de matris ayrıntılı analizin yerini tutmaz.

## Dört risk işleme kararı

Değerlendirmeden sonra kurum, risk için açık bir yanıt seçer:

| Strateji           | Ne yapılır?                                                     | Örnek / sınır                                                  |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------- |
| Azaltma (mitigate) | Kontrol ile olasılığı veya etkiyi düşür                         | MFA, yama, yedeklilik; risk sıfırlanmayabilir                  |
| Aktarma (transfer) | Finansal yükün bir kısmını başka tarafla paylaş                 | Siber sigorta; itibar ve tüm sonuçlar devredilmez              |
| Kabul (accept)     | Riski bilerek üstlen; kaydet, yetkiliye onaylat ve gözden geçir | Düşük riskte kontrol maliyeti faydayı aşabilir; ihmal değildir |
| Kaçınma (avoid)    | Riski doğuran faaliyeti/özelliği bırak                          | Gereksiz hassas veriyi toplamamak, sızıntı yüzeyini kaldırır   |

ROSI pozitifliği azaltmayı ekonomik açıdan destekleyebilir; düşük riskte pahalı kontrol yerine kayıtlı kabul düşünülebilir; sigorta finansal darbeyi paylaşabilir; iş için zorunlu olmayan ve yüksek riskli faaliyetten kaçınılabilir. Bunlar otomatik eşleştirme kuralları değil, seçenekleri düşünme örnekleridir. Son karar risk iştahı, yükümlülükler ve etkilenen kişiler hesaba katılarak verilir.

Kontrollerden sonra kalan miktar **artık risk (residual risk)** olarak adlandırılır. Amaç her koşulda sıfır risk değil, artık riski görünür, gerekçeli ve kurumun kabul sınırları içinde tutmaktır. Bu bölümün risk kaydı örneğinde her satır tehdidi, ihlal edilen güvenlik hedefini, önceliği ve azaltımı bağlar; böylece STRIDE/DREAD gibi analiz çıktısı uygulanabilir bir karara dönüşür. Sistem, tehditler veya kontroller değiştiğinde değerlendirme de tekrarlanır.
