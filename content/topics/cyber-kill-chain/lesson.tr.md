## Cyber Kill Chain: Saldırıyı Yedi Aşamada Kesmek

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.9, `teori-1-43-89.pdf`, fiziksel sayfa 1–2 (basılı sayfa 32–33); 1.10 başlığından önceki kapanış paragrafına kadar. Aşağıdaki uygulama örnekleri öğretim amacıyla eklenmiştir.

## Saldırı tek anlık olay değil, süreçtir

Bir saldırı çoğu zaman birbirini izleyen işlemlerden oluşur: saldırgan bilgi toplar, araç veya dosya hazırlar, hedefe ulaştırır, bir zayıflığı kullanır, sistemde kalıcılık sağlamaya çalışır ve sonunda bir amaç için veriye ya da hizmete müdahale eder. Bu adımları modellemek, savunmanın yalnızca son aşamada alarm vermek zorunda olmadığını gösterir. Zincirin herhangi bir halkasını kesmek saldırının hedefe ulaşmasını engelleyebilir.

Kaynak, Lockheed Martin tarafından geliştirilen **Cyber Kill Chain (Siber Ölüm Zinciri)** modelini tanıtır. Basılı çizim yedi aşamayı sırayla gösterir:

| Aşama                      | İngilizce kaynak terimi      | Ne olur?                                                                     | İlişkili savunma fırsatı                                                                                       |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 1. Keşif                   | **Reconnaissance**           | Açık portlar, çalışanlar ve e-posta adresleri gibi hedef bilgileri toplanır. | Açıkta kalan bilgiyi azaltıp keşif etkinliğini izleyin; kaynak bu aşamada tespitin zor olabileceğini belirtir. |
| 2. Silahlandırma           | **Weaponization**            | Tuzaklı belge gibi zararlı yük hazırlanır.                                   | Gereksiz dosya türlerini ve araçları kısıtlayın; girişte dosyaları inceleyin.                                  |
| 3. Teslim                  | **Delivery**                 | Yük oltalama e-postası veya USB gibi bir yolla hedefe ulaştırılır.           | Oltalama filtreleri ve çıkarılabilir ortam denetimleri yükü çalışmadan önce durdurabilir.                      |
| 4. Sömürü                  | **Exploitation**             | Açıklık tetiklenir ve kod çalışır.                                           | Güncel yamalar ve sınırlı yetkiler sömürüyü önleyebilir veya etkisini daraltabilir.                            |
| 5. Kurulum                 | **Installation**             | Kalıcılık oluşturulur; örneğin arka kapı yerleştirilir.                      | Sistem değişikliklerini, yeni hesapları ve otomatik başlatma noktalarını izleyin.                              |
| 6. Komuta ve kontrol       | **Command and Control (C2)** | Saldırganın uzaktan yönetim kanalı kurulur.                                  | Olağandışı giden bağlantıları veya ağ davranışını saptamak kontrolü kesebilir.                                 |
| 7. Hedefe yönelik eylemler | **Actions on Objectives**    | Veri sızdırma, şifreleme veya sabotaj gerçekleşir.                           | Veri erişimini izleyin; yedekler ve kapsam sınırlayıcı kontroller zararı azaltabilir.                          |

Son sütun savunma için öğretim amaçlı eşleştirmedir. Kaynak özellikle teslimde oltalama filtresi, sömürüde güncel yama, komuta-kontrolde anormal trafik tespitini örnek verir. Diğer eşleştirmeler aşamaları savunma sorularına çevirmeye yardımcı olur; tek bir önlemin yeterli olduğu iddiası değildir.

## Aşamalar neden savunma fırsatı yaratır?

Her aşama, saldırının ilerlemesini durdurmak için farklı bir zaman ve gözlem noktası sağlar. Bir e-posta filtresi yükün ulaşmasını önleyebilir; güvenlik yaması açıklığın kullanılmasını engelleyebilir; C2 bağlantısının saptanması, sisteme bir bileşen kurulmuş olsa bile saldırganın uzaktan kontrolünü kesebilir. Veri çalınmaya başlayana kadar beklemek gerekmez.

**Ek öğretim örneği:** Bir saldırganın üniversite portalını hedeflediğini düşünelim. Önce çalışan adlarını ve giriş sistemini araştırır, sonra zararlı belge hazırlar, belgeyi bir çalışana gönderir, güncellenmemiş yazılım açığından yararlanır, kalıcı bir araç kurar, uzaktan bağlanır ve dosyaları dışarı taşır. Genel bilgiyi azaltma, e-posta filtreleme, cihazları yamalama, ağ bağlantılarını izleme ve dosya okuma yetkilerini sınırlama farklı aşamalarda devreye girer. Bu örnek modelin kullanımını açıklar; kaynakta anlatılan gerçek bir olay değildir.

Bu yaklaşım önceki konularla birleşir: [saldırı ağacı](glossary:attack-tree) hedefe giden olası yolları ve seçenekleri gösterir; [derinlemesine savunma](glossary:defense-in-depth) bu yollar boyunca birden fazla engel kurmayı anlatır. Kill Chain saldırıyı zaman içindeki aşamalarla düzenler; saldırı ağacı ise hedefe ulaşabilecek alternatif yolları gösterir. İkisi de düşünme aracıdır, her saldırının çizimdeki sırayı izleyeceği garantisi değildir.

## Doğrusal modelin sınırları

Kaynak, modelin doğrusal olduğuna ve bu nedenle her saldırıya tam oturmadığına yönelik eleştiriyi aktarır. İç tehditler ve bulut ortamları özellikle zorlayıcıdır: meşru erişimi olan bir iç aktör daha ileri bir noktadan başlayabilir; buluttaki saldırı tek bir sırayı izlemek yerine farklı kaynaklar arasında geçebilir. Bu nedenle görünür aşamalardan birinin bulunmaması, saldırı olmadığını kanıtlamaz.

Kaynak, daha ayrıntılı ve saldırgan davranışlarını tekniklere ayıran **MITRE ATT&CK** çerçevesini karşılaştırma olarak anıp 13. haftaya yönlendirir. Burada bu not, Kill Chain’in sınırını gösterir; sonraki konunun yerine geçmez.

Pratik sonuç şudur: **Saldırı bir süreçtir ve kesilebilir.** En iyi gözlemlenebilen veya korunabilen aşama ve yolları seçin; mümkün olduğunda farklı noktalarda birden fazla kontrol kullanın. Saldırı ağacında kolay yolu kapatmanın saldırganın hesabını değiştirmesi gibi, Kill Chain’de bir halkayı kesmek de süreç boyunca ilerlemeyi durdurabilir. Ama bu, diğer bütün yolların yok olduğu anlamına gelmez.
