## 1. Use Case ve Sequence neyi gösterir?
**Use Case Diagram** aktörlerin sistemden beklediği **hedef ve işlevleri** gösterir; ekran/buton listesi ve iç algoritma değildir. **Sequence Diagram** aynı hedefin nesneler/bileşenler arasında **nasıl ve hangi sırayla** gerçekleştiğini anlatır. **Class Diagram** ise sistemin statik yapısını gösterir (PDF s. 2, 17, 32).

## 2. Use Case'in temel elemanları
- **Actor (aktör):** Sistemin dışından etkileşen rol; kişi, kuruluş ya da harici sistem olabilir. “Ayşe” değil “Öğrenci”; aynı kişi farklı roller üstlenebilir.
- **Use Case (kullanım durumu):** Aktöre değer sağlayan amaç, **oval** içinde ve eylem içeren adla yazılır: `Derse Kayıt Ol`, `Kaydı Onayla`.
- **System Boundary (sistem sınırı):** Sistemin sorumluluğundaki use case'leri çevreleyen kutu. Aktör dışarıdadır.
- **Association:** Aktörün ilgili kullanım durumuna katılımını gösterir.

Örnek aktörler: Öğrenci, Danışman, Bölüm Yetkilisi ve gerekiyorsa dış Kimlik Doğrulama Sistemi (s. 3–6). `Veritabanına bağlan` genellikle kullanıcı hedefi olmadığı için ayrı use case değildir. Gereksiz aktör ve oval çoğaltma.

## 3. Include, Extend, Generalization
| İlişki | Temel anlam | Örnek |
| --- | --- | --- |
| **«include»** | Her çalışmada gereken, ortak ve zorunlu davranış | `Derse Kayıt Ol` → `Kimliği Doğrula` |
| **«extend»** | Belirli koşulda eklenen, temel akış için zorunlu olmayan davranış | `[kupon varsa]` → `İndirim Uygula` ile `Ödeme Yap` |
| **Generalization** | Genel aktör/use case'in daha özel türü | Kullanıcı → Öğrenci/Öğretim Üyesi |

Include ve extend **kesikli ok + stereotype** ile çizilir. **Include oku dahil edilen use case'e**, **extend oku genişletilen temel use case'e** gider. İlişkiyi seçerken “Her zaman gerekli mi?” ve “Yalnızca belirli koşulda mı?” diye sor (s. 7–10).

## 4. Use Case dokümantasyonu
Tek evrensel zorunlu format yoktur. Yaygın şablon (s. 13):
1. Ad
2. Aktörler
3. Amaç
4. Ön koşullar
5. Tetikleyici
6. Başarılı temel akış
7. Alternatif/hata akışları
8. Son koşullar

Diyagram **üst düzey kapsamı**, metin ise **senaryo ayrıntılarını** açıklar. Slaytlarda Otel Rezervasyonu (s. 14), banka (s. 15) ve OBS (s. 16) örnekleri vardır. OBS'de Öğrenci/Danışman sınırın dışında, Ders Kaydı Yap/Kontenjan Kontrol gibi işlevler içeridedir. Use Case Diagram test ve gereksinim konuşmaları için başlangıçtır; tek başına bütün gereksinim dokümanı değildir.

## 5. Sequence Diagram elemanları
Sequence Diagram davranış diyagramıdır; etkileşimleri **zamana göre yukarıdan aşağıya** sıralar (s. 18–19).
- **Actor:** dış rol.
- **Participant/Object (katılımcı/nesne):** mesaja katılan bileşen/nesne.
- **Lifeline (yaşam çizgisi):** katılımcının zaman boyu varlığını gösteren dikey kesikli çizgi.
- **Activation/Execution (etkinleştirme/yürütme):** işlemin yürütüldüğü aralık.
- **Message (mesaj):** çağrı veya sonuç akışı.

Örnek: Öğrenci → RegistrationUI → RegistrationService → CourseRepository → NotificationService.

## 6. Mesaj türleri ve kontroller
| Tür | Anlam / kullanım |
| --- | --- |
| **Synchronous message (senkron mesaj)** | Gönderici işlem/yanıtı bekler; kontenjan kontrolünde sonuç gerekebilir |
| **Asynchronous message (asenkron mesaj)** | Gönderici beklemeden devam edebilir; kayıt bildirimi |
| **Self message (öz mesaj)** | Katılımcı kendi operasyonunu çağırır: `validateRules()` |
| **Reply message (yanıt mesajı)** | Sonucun geri dönüşü, genellikle kesikli ok: `available=true` |
| **Guard (koşul)** | Yalnızca koşul doğruysa: `[quotaAvailable]`, `[paymentApproved]` |

**Combined Fragments (birleşik parçalar):** `alt` → if/else alternatifleri, `opt` → tek opsiyonel bölüm, `loop` → tekrar. Guard koşulları köşeli parantezdedir. Gereksiz her return'ü çizmek gerekmez (s. 21–24).

## 7. Ders kayıt Sequence örneği (s. 25)
1. Öğrenci → UI: `kayıtOl(courseId)`
2. UI → RegistrationService: `register(student, course)`
3. RegistrationService → CourseRepository: `checkQuota(courseId)`
4. CourseRepository → RegistrationService: `available` (reply)
5. RegistrationService → CourseRepository: `saveRegistration()`
6. RegistrationService → NotificationService: `RegistrationCreated` (async)
7. RegistrationService → UI: `success`

**Mimari trade-off (s. 26):** Kayıt/tutarlılık gerektiren akış senkron olabilir; bildirim asenkron ayrıştırılabilir. Asenkron iletişim dayanıklılığı ve düşük coupling'i destekleyebilir fakat hata takibi, eventual consistency ve operasyonel karmaşıklık getirir. Bildirim servisi çöktüğünde ders kaydının başarısız olmasını istemiyorsak bu seçenek değerlendirilebilir.

**Yazar açıklaması (kaynak dışı):** Kontenjan kontrolüyle kaydetmenin farklı adımlar olması, eşzamanlı isteklerde tek başına kontenjan garantisi sağlamaz; gerçek uygulamada transaction/concurrency kontrolü gerekir.

## 8. Diğer örnekler, bütünleştirme ve sınav
**Duygu tabanlı müzik çalar (s. 27–28):** Uygulamayı aç → web kamerasından görüntü → yüz/ruh hali tahmini → veri tabanı sorgusu → müzik seçimi → playlist gösterimi. Hangi çağrı senkron/asenkron olabilir, tartışılır.

**Use Case + Sequence birlikte (s. 29):**
1. Aktörleri ve kullanıcı hedeflerini belirle.
2. Kritik use case'in temel ve alternatif akışını yaz.
3. Katılımcıları seç.
4. Mesajları zaman sırasına yerleştir.
5. Guard/`alt`/`opt` ile koşulları göster.
6. Cohesion/coupling ve Class Diagram ile tutarlılığı kontrol et.

**Sık hatalar (s. 30):** Butonları use case yapmak; aktörleri iç sınıflarla karıştırmak; include/extend'i ters kullanmak; zamanı yatay düşünmek; her küçük metodu çizmek; sorumluluğu belirsiz oklar; Class–Sequence tutarsızlığı.

**Laboratuvar (s. 31):** En az 3 aktör, 6 use case, uygun include/extend; “Derse Kayıt Ol” dokümantasyonu (ön koşul, temel/alternatif akış); aynı use case için Sequence; en az bir guard ve reply; bildirim varsa sync/async gerekçesi; önceki Class Diagram ile eşleşme.

**Kontrol soruları (s. 32):**
1. Actor ile kişi farkı?
2. Use case adlandırması nasıl yapılır?
3. Include/extend farkı?
4. Use Case ve Sequence farklı hangi soruları yanıtlar?
5. Lifeline nedir?
6. Senkron/asenkron farkı?
7. Guard ne zaman kullanılır?

*Kaynak: Hafta 2B — Use Case ve Sequence Diyagramları, fiziksel PDF s. 1–33. Ek teknik açıklamalar ayrıca belirtilmiştir.*
