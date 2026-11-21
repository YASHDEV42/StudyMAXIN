## Haftanın ana fikri

Çalışan kod iyi tasarım garantisi değildir. Hedefler **anlaşılabilirlik + değiştirilebilirlik + test edilebilirlik**. İyi tasarımda **High Cohesion + Low Coupling**: ilgili işler aynı sorumlulukta; gereksiz somut bağımlılıklar azaltılır.

## SOLID — sınav tablosu

| İlke                          | Tanım                                          | İhlal örneği                                     | Çözüm                                                                 |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------- |
| **SRP** Single Responsibility | Tek iş/aktör değişim nedeni                    | OrderManager vergi + e-posta + PDF               | OrderService / TaxCalculator / NotificationService / InvoiceGenerator |
| **OCP** Open/Closed           | Genişletmeye açık, sürekli değiştirmeye kapalı | Her kargo türünde if/else büyüyor                | ShippingPolicy + ayrı stratejiler                                     |
| **LSP** Liskov Substitution   | Alt tür üst türün sözleşmesini bozmamalı       | FixedDepositAccount.withdraw() daima hata        | WithdrawableAccount gibi doğru sözleşme                               |
| **ISP** Interface Segregation | İstemci gereksiz metotlara bağlı olmamalı      | BasicPrinter, IMachine.scan()/fax() kullanamıyor | IPrintable / IScannable / IFaxable                                    |
| **DIP** Dependency Inversion  | Üst ve alt düzey soyutlamalara bağlı           | OrderService doğrudan GmailSender'a bağlı        | INotificationSender + Gmail/Sms Adapter                               |

**SRP ≠ tek metot.** Bir sorumluluk odağı / değişim için tek anlamlı iş nedeni.

**OCP ≠ hiçbir zaman eski kod değişmez.** Yeni varyantlar için mantıklı genişletme noktası kur; her şeye interface yazma.

**LSP:** `extends` yazmak yetmez; subtype beklenen davranışı ve ön koşulları bozmamalı. ReferenceBook ödünç verilemiyorsa BorrowableItem sözleşmesini düşün.

**ISP:** Fat Interface yerine küçük, rol odaklı arayüzler. OBS örneği: IStudentRegistration, IAdvisorApproval, ICourseAdministration, ITranscriptReader.

**DIP vs DI:** **DIP ilke**, interface/abstraction'a bağımlılık; **DI teknik**, nesneyi içeride new ile oluşturmayıp dışarıdan verme. Örnek `new OrderService(notificationSender)`.

## DRY / KISS / YAGNI

| İlke                               | Ana soru                                    | Örnek                                                                    |
| ---------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| **DRY** Don't Repeat Yourself      | Aynı bilgi veya iş kuralı tekrarlanıyor mu? | CourseEligibilityPolicy tek doğruluk kaynağı                             |
| **KISS** Keep It Simple, Stupid    | Çözüm gereksiz karmaşık mı?                 | 200 kullanıcılı sistem için aşırı microservice yerine bağlama uygun yapı |
| **YAGNI** You Aren't Gonna Need It | Bu özelliğe şimdi gerçekten ihtiyaç var mı? | Müşterisiz MVP'ye 25 para birimi/AI fiyatlama eklememek                  |

**DRY** her benzer satırı ortak metot yapmak değildir. Sunucu tarafı kontrolü kaldırılmaz.

**KISS** güvenliği/hata kontrolünü atlamak ve her zaman monolith seçmek değildir.

**YAGNI + OCP** çelişmez: makul uzatma noktası bırak, spekülatif özellik inşa etme.

## Vaka eşleştirme

- Bankada para çekemeyen hesap `withdraw()` gerektiriyorsa → **LSP**.
- Her yeni kargo türü if/else değiştiriyorsa → **OCP**.
- Hastane AppointmentService doğrudan SMS sağlayıcısına bağlıysa → **DIP**.
- Tek sınıf kayıt + PDF + SMS yapıyorsa → **SRP**.
- Bir arayüz gereksiz 15 metot taşıyorsa → **ISP**.
- Ön koşul kodu 5 sınıfta aynıysa → **DRY**.
- Basit kulüp uygulaması 10 microservice kullanıyorsa → **KISS**.
- Gerekmeyen 10 yıllık özellikler kodlanıyorsa → **YAGNI**.

## Kritik OBS tuzağı (s. 36)

**20.000 öğrenci**, **kontenjan 30**. High cohesion ve DRY tek başına **race condition** çözmez. Son koltuk için iki istek aynı anda “boş” sonucu görebilir. **Atomic update / uygun locking / DB transaction** gerekir.

## E-ticaret örnek mimarisi

`CheckoutService → PaymentGateway → Bank/Card Adapter`; `OrderService → EventPublisher → NotificationHandler`. Önemli not: **ödeme/stok tutarlılığı, transaction sınırları ve hata telafisi ayrı tasarım ister.**

## Laboratuvar (s. 39)

OBS/e-ticaretten iki kötü tasarım seç → önce/sonra Class Diagram çiz → kullanılan prensibi ve **trade-off**'u açıkla.

## Cevaplamadan geçme

1. SRP neden “bir sınıfta bir metot” değildir?
2. LSP'yi ihlal eden hesap örneğinde asıl sorun nedir?
3. ISP ve DIP arasındaki fark nedir?
4. DIP ve DI aynı şey midir?
5. KISS, YAGNI ve DRY hangi farklı sorulara cevap verir?
6. SOLID neden kontenjan yarışı problemini tek başına çözemez?

_Kaynak: Tasarım İlkeleri ve SOLID (iç başlık Hafta 3), fiziksel PDF s. 1–39._
