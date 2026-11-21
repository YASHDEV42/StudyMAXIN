## Ana farklar

- **Use Case Diagram:** KİM hangi HEDEFİ/İŞLEVİ ister? Actor, system boundary, oval use case.
- **Sequence Diagram:** İşlem NASIL ve HANGİ SIRAYLA? Mesajlar, lifeline, guard; **zaman yukarıdan aşağı**.
- **Class Diagram:** Hangi SINIFLAR ve İLİŞKİLER var? Statik yapı.
- Actor bir **rol**dür, belirli kişi veya sistemin iç sınıfı değildir.
- Use case fiille adlandırılır: **Derse Kayıt Ol**; “veritabanına bağlan” gibi iç adımlar kullanıcı hedefi olmayabilir.

## Use Case ilişkileri

| İlişki         | Koşul                         | Okun yönü                   | Örnek                              |
| -------------- | ----------------------------- | --------------------------- | ---------------------------------- |
| `«include»`    | Zorunlu ve ortak davranış     | Ana use case → dahil edilen | Kayıt Ol → Kimliği Doğrula         |
| `«extend»`     | Koşullu/opsiyonel ek davranış | Ek davranış → ana use case  | İndirim Uygula → Ödeme Yap [kupon] |
| Generalization | Özel tür genel türü devralır  | Özel → genel                | Öğrenci → Kullanıcı                |

**Ezber sorusu:** “Her çalışmada gerekli mi?” → Include. “Belirli koşulda ekleniyor mu?” → Extend.

## Use Case metin şablonu

**Ad → Aktörler → Amaç → Ön koşullar → Tetikleyici → Başarılı temel akış → Alternatif/hata akışları → Son koşullar.** Tek evrensel zorunlu format yoktur.

## Sequence sembolleri

- **Participant:** mesaja katılan nesne/bileşen.
- **Lifeline:** dikey kesikli varlık çizgisi.
- **Activation:** işlem yürütme aralığı.
- **Synchronous:** gönderici yanıt/işlem bitişini bekler.
- **Asynchronous:** gönderici beklemeden devam edebilir.
- **Self:** aynı katılımcının iç işlemi.
- **Reply:** sonuç dönüşü; çoğu zaman kesikli ok.
- **Guard:** `[quotaAvailable]` gibi koşul.
- **alt:** if/else; **opt:** koşullu tek parça; **loop:** tekrar.

## Derse Kayıt Ol sırası

```text
Öğrenci → UI: kayıtOl(courseId)
UI → RegistrationService: register(student,course)
RegistrationService → CourseRepository: checkQuota(courseId)
CourseRepository --> RegistrationService: available (reply)
RegistrationService → CourseRepository: saveRegistration()
RegistrationService → NotificationService: RegistrationCreated (async)
RegistrationService --> UI: success
```

**Neden?** Kontenjan/kayıt sonuçları tutarlılık ister; bildirim asenkron yapılırsa bildirim kesintisi kaydı engellememeye yardımcı olabilir. **Bedel:** hata takibi, eventual consistency ve operasyonel karmaşıklık.

## Diagram üretme sırası

1. Aktör + hedef (Use Case).
2. Temel ve alternatif akışları yaz.
3. Sequence katılımcılarını belirle.
4. Mesajları sırala.
5. Guard/alt/opt ekle.
6. Class Diagram, cohesion/coupling ile tutarlılığı denetle.

**Sık hata:** use case = buton listesi; include–extend ters; actor = iç class; sequence zamanını yatay okumak; her metodu çizmek; diagrams arası tutarsızlık.

**Laboratuvar:** Üniversite OBS; en az **3 aktör, 6 use case**, include/extend, Derse Kayıt Ol metni, en az **1 guard ve 1 reply** içeren Sequence, varsa bildirim sync/async gerekçesi.

## Kontrol — çözümleri yazmadan kendini dene

1. Actor ve gerçek kişi farkı?
2. Use Case nasıl adlandırılır?
3. Include/Extend farkı?
4. Use Case ve Sequence hangi sorulara cevap verir?
5. Lifeline nedir?
6. Senkron ve asenkron mesaj farkı?
7. Guard hangi durumda kullanılır?

_Kaynak: Hafta 2B, fiziksel PDF s. 1–33._
