## Tasarım ilkelerinin amacı

Çalışan kod her zaman **iyi tasarım** değildir. Yeni ödeme yöntemi için 12 sınıfı değiştirmek, e-posta sağlayıcısı çökünce siparişi kaybetmek, bir sınıfın ödeme/stok/raporlamayı birden yapması veya aynı kuralı 15 dosyaya kopyalamak değişiklik maliyetini ve riskini artırır (s. 4). Tasarım ilkeleri **anlaşılabilirlik**, **değiştirilebilirlik** ve **test edilebilirlik** hedefler (s. 5). **Class Diagram** yapıyı gösterir; ilkeler sorumlulukların ve bağımlılıkların değişime dayanıklı olup olmadığını sorgular (s. 3).

**High Cohesion (yüksek uyum):** sınıf tek ve anlamlı sorumluluk odağına sahip olmalıdır. StudentService kayıt, e-posta, PDF, ödeme yapıyorsa sorumlulukları RegistrationService, NotificationService, ReportService ve PaymentService olarak ayrılabilir (s. 6).

**Low Coupling (düşük bağımlılık):** değişiklik diğer sınıflara gereksiz yayılmamalıdır. OrderService doğrudan GmailSender ayrıntılarına bağlı olmak yerine NotificationPort interface'ine bağımlı olabilir; EmailAdapter/SmsAdapter değiştirilebilir. Düşük coupling, sıfır ilişki demek değildir (s. 7).

## SOLID — beş ilke

| İlke    | Açılımı                                                      | Temel karar                                    |
| ------- | ------------------------------------------------------------ | ---------------------------------------------- |
| **SRP** | Single Responsibility Principle / Tek Sorumluluk             | Bir sorumluluk odağı, bir aktör/iş nedeni      |
| **OCP** | Open/Closed Principle / Açık-Kapalı                          | Genişletmeye açık, sürekli değiştirmeye kapalı |
| **LSP** | Liskov Substitution Principle / Yerine Geçme                 | Alt tür üst tür sözleşmesini bozmamalı         |
| **ISP** | Interface Segregation Principle / Arayüz Ayrımı              | İstemci kullanmadığı metoda bağımlı olmamalı   |
| **DIP** | Dependency Inversion Principle / Bağımlılığı Tersine Çevirme | Üst ve alt düzey soyutlamalara bağımlı olmalı  |

### SRP (s. 9–11)

Bir sınıfın tek metodu olması anlamına gelmez; **değişim için tek anlamlı iş nedeni** aranır. `OrderManager` içinde `createOrder()`, `calculateTax()`, `sendEmail()`, `exportInvoicePdf()` birleşirse farklı iş değişiklikleri aynı sınıfa dokunur. Daha uygun ayrım: `OrderService`, `TaxCalculator`, `NotificationService`, `InvoiceGenerator`. Hastane örneğinde `AppointmentManager` yerine randevu, doktor takvimi, sigorta uygunluğu, bildirim ve raporlama sorumlulukları ayrılır. SRP, high cohesion ile ilişkilidir.

### OCP (s. 12–14)

Yeni bir varyant eklemek için merkezi `if/else` büyütmek yerine genişletme noktası tasarlanabilir. Kargo örneği: `ShippingPolicy` interface'i ve `StandardShipping`, `ExpressShipping`, `InternationalShipping`. Kod örneğinde `DiscountPolicy.apply(total)` sözleşmesini `StudentDiscount` ve `LoyaltyDiscount` uygular; `CheckoutService` yalnızca interface'i kullanır. Polymorphism, Strategy ve interface OCP'yi destekler. **Her küçük değişim için soyutlama gerekmez.**

### LSP (s. 15–17)

Bir alt tür, üst türün kullanıldığı yerde **beklenen sözleşmeyi bozmadan** kullanılabilmelidir. Beklenmeyen hata ve daha katı ön koşullar tehlikelidir. `Account.withdraw()` tüm hesaplarda beklenirken `FixedDepositAccount.withdraw()` her zaman exception atıyorsa sözleşme bozuktur. `WithdrawableAccount` gibi daha dar bir sözleşme oluşturulabilir. Benzer şekilde `ReferenceBook` ödünç verilemiyorsa `LibraryItem.borrow()` herkese zorlanmamalı; `BorrowableItem` düşünülmelidir. `extends` yazabilmek gerçek IS-A garantisi değildir.

### ISP (s. 18–20)

Büyük `IMachine` arayüzü `print()`, `scan()`, `fax()` içerince `BasicPrinter` gereksiz işlemlere zorlanır. `IPrintable`, `IScannable`, `IFaxable` olarak bölünür; BasicPrinter yalnızca IPrintable uygular. OBS örneğinde `IUniversityOperations` yerine `IStudentRegistration`, `IAdvisorApproval`, `ICourseAdministration`, `ITranscriptReader` düşünülebilir. ISP interface düzeyinde cohesion ve coupling kalitesini destekler.

### DIP (s. 21–25)

Üst düzey iş politikaları alt düzey teknik ayrıntılara doğrudan bağımlı olmamalıdır; **her ikisi soyutlamaya bağlı olmalı, ayrıntılar soyutlamaya uymalıdır**. Önce `OrderService → GmailSender`; sonra `OrderService → INotificationSender` ve bu sözleşmeyi gerçekleştiren GmailAdapter/SmsAdapter. Hastane `AppointmentService` için SmsSender, EmailSender, PushSender veya testte FakeNotificationSender kullanılabilir.

**Dependency Inversion (DIP) ≠ Dependency Injection (DI):**

- **DIP tasarım ilkesidir:** bağımlılığı soyutlamaya yönlendirir.
- **DI uygulama tekniğidir:** bağımlılık sınıfta `new` ile üretilmek yerine dışarıdan verilir: `new OrderService(notificationSender)`.
  DI, DIP'yi destekleyen yaygın tekniklerden biridir; birbirinin eş anlamlısı değildir (s. 24).

**Birlikte (s. 26):** SRP sorumlulukları ayırır; OCP yeni davranış ekletir; LSP alt tür sözleşmesini korur; ISP arayüzleri daraltır; DIP iş kurallarını teknik ayrıntılardan ayırır.

## DRY, KISS, YAGNI

**DRY — Don't Repeat Yourself (s. 27–28):** Aynı bilgi/iş kuralının bağımsız kopyalarını çoğaltma; birbirine benzeyen ama ayrı kuralları zorla birleştirme. OBS'de Matematik II için Matematik I ön koşulu UI, kayıt ve raporlamada tekrarlanıyorsa tek `CourseEligibilityPolicy.canEnroll(student, course)` kaynağı kullanılabilir. **UI ön kontrolü, sunucu tarafındaki güvenlik kontrolünün yerine geçmez.**

**KISS — Keep It Simple, Stupid (s. 29–30):** Gereksinimleri ve kaliteyi karşılayan en sade anlaşılır çözümü seç. İki geliştiricili, 200 kullanıcılı kulüp için 8 microservice, Kafka, Kubernetes ve 3 DB yerine modüler monolith + tek ilişkisel DB + REST + test/CI daha uygun olabilir. KISS “her zaman monolith” demek değildir.

**YAGNI — You Aren't Gonna Need It (s. 31–32):** Henüz doğrulanmamış ihtiyacı “belki gerekir” diye geliştirme. İlk e-ticaret sürümüne 25 para birimi, 12 sadakat seviyesi, AI fiyat optimizasyonu ve uluslararası vergi motoru yapmak yerine ürün listeleme, sepet, sipariş, temel ödeme ve stok kontrolü önceliklidir. **YAGNI ve OCP çelişmez:** makul genişletme noktası bırakılabilir, spekülatif özellikler inşa edilmez.

| İlke  | Kontrol sorusu (s. 33)                      |
| ----- | ------------------------------------------- |
| DRY   | Aynı bilgi/iş kuralı tekrar ediyor mu?      |
| KISS  | Çözüm gereksiz karmaşık mı?                 |
| YAGNI | Bu özelliğe gerçekten şimdi ihtiyaç var mı? |

## Vaka çalışmaları

**E-ticaret (s. 34–35):** CheckoutManager sipariş/ödeme/stok/bildirimi yönetiyor; yeni sağlayıcı if/else ekliyor; bildirim hatası siparişi bozuyor. Örnek yapı: `CheckoutService → PaymentGateway → Bank/Card Adapter`; `OrderService → EventPublisher → NotificationHandler`. **Stok-ödeme tutarlılığı, transaction sınırları ve hata telafisi ayrıca tasarlanmalıdır.**

**OBS (s. 36):** 20.000 öğrenci aynı anda seçim yapıyor, kontenjan 30'u aşmamalı. SRP kayıt/bildirim/raporu ayırır; DRY ön koşul kurallarını merkezileştirir. Ancak kontenjan 1 iken iki istek aynı anda “yer var” görebilir. **High cohesion ve SOLID yarış durumunu önlemez; atomik güncelleme, uygun kilitleme veya database transaction gerekir.**

**Eşleştirme (s. 37):** Para çekemeyen vadeli hesabın `withdraw()` uygulaması → LSP; yeni kargo türünde if/else büyümesi → OCP; randevu servisinin tek SMS firmasına bağlanması → DIP.

**Sınıf içi etkinlik (s. 38):** A–H senaryolarında ilgili ilkeyi kendin belirle. Sorular arasında somut bankaya doğrudan bağlı PaymentService, 15 gereksiz metotlu IWorker, PDF/SMS/kayıt birleştiren StudentService, sözleşmeyi bozan alt sınıf, 200 satırlık switch, henüz istenmeyen 10 yıllık özellikler, 200 kişilik kulübe 10 microservice, ve 5 sınıfa kopyalanmış ders ön koşul kuralı vardır.

**Laboratuvar (s. 39):** OBS veya e-ticaretten iki kötü tasarım seç, önce/sonra Class Diagram çiz, hangi ilkeyi ve hangi trade-off'u içerdiğini açıkla.

**Sınav özeti:** High Cohesion + Low Coupling, SOLID ile desteklenir; DRY tekrarları, KISS gereksiz karmaşıklığı, YAGNI doğrulanmamış özellikleri azaltır. Tasarım ilkeleri mutlak değil, **bağlama göre değerlendirilen rehberlerdir** (s. 39).

**Kendini kontrol et:** (1) DIP ile DI farkı ne? (2) Neden high cohesion eşzamanlı kontenjan taşmasını engellemez? (3) YAGNI ile OCP neden çelişmez?
