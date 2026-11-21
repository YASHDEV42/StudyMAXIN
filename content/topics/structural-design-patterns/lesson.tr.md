## Design Patterns ve yapısal desenler

**Tasarım deseni**, tekrar eden bir tasarım sorununa yönelik sınıf ve nesne iş birliği çözümüdür; hazır kod değildir. Amaç sorumlulukları doğru dağıtmak, bağımlılıkları azaltmak ve uygun çözüm deneyiminden yararlanmaktır (PDF s. 4–9). **Üç grup (s. 10):** Yaratımsal (nesne nasıl oluşturulur?), Yapısal (nesneler nasıl birleştirilir?), Davranışsal (nesneler nasıl iletişim kurar?). **Yedi yapısal desen (s. 11):** Flyweight, Adapter, Composite, Facade, Proxy, Decorator, Bridge.

## Flyweight — ortak durumu paylaşma (s. 12–25)

**Problem:** Çok sayıda nesne aynı ağır veriyi ayrı ayrı taşır; bellek israfı oluşur.
**Çözüm:** **Intrinsic state (ortak/içsel durum)** ve **Extrinsic state (nesneye özgü/değişken durum)** ayrılır. Ortak model, texture, font glyph veya simge paylaşılan Flyweight içinde; konum, kimlik, can puanı, öğrenci notu ayrı tutulur.
**Örnekler:** 10.000 asker aynı 3D model; 50.000 ağaç aynı model/doku; 20.000 restoran ortak ikon; metin editöründe ortak glyph; 300 öğrencinin aynı `CourseInfo` nesnesine referansı.
**Önemli nüans:** 10.000 asker nesnesi kalır, yalnızca ortak modelin 10.000 kopyası yerine 1 kopyası bulunabilir (s. 16). Bir askerin canı değişince başkalarınınki değişmez. Metin editöründe ortak olan tüm karakter konumları değil, paylaşılabilir çizim verisidir.
**Roller (UML s. 22–24):** Flyweight, ConcreteFlyweight, FlyweightFactory (HashMap nesne havuzu), Client. İstenen anahtar varsa havuzdan dön, yoksa oluştur ve sakla.

```java
Map<String, Circle> circleMap = new HashMap<>();
Circle getCircle(String color) {
  return circleMap.computeIfAbsent(color, Circle::new);
}
```

20 daire/5 renk → renk bazlı havuzda en çok 5 paylaşılmış nesne. **Kullan:** çok nesne + tekrar eden büyük ortak veri + gerçek bellek sorunu. **Kullanma:** az ve küçük nesneler; havuz maliyeti faydayı geçebilir (s. 25).

## Adapter — uyumsuz arayüzleri uyarlama (s. 26–39)

**Amaç:** Mevcut iki sistemi değiştirmeden farklı metot/veri/sonuç arayüzlerini birbirine uydurmak.
**Roller:** Client, Target (istemcinin beklediği arayüz), Adapter (Target'ı gerçekleştirir), Adaptee (mevcut uyumsuz servis). UML'de Client → Target, Adapter → Adaptee (s. 27).
**Örnek:** Uygulama `PaymentService.pay(amount)` bekler; BankAPI `makePayment(amount)` sunar. `BankAdapter implements PaymentService`, `pay()` içinde `bank.makePayment()` çağırır (s. 28–29). Adapter yalnızca metot adını değil, parametre ve veri formatını da dönüştürebilir.
**Diğer örnekler:** OBS/YÖKSİS alan eşleştirmesi `personId/fullName/schoolCode` → `studentNo/name/departmentCode`; BankA/BankB farklı ödeme API'leri; Aras/Yurtiçi kargo; XML/JSON laboratuvar cihazı → LabResult; eski `calculateOldInvoice()` → yeni `generateInvoice()`; medya oynatıcıda VLC/MP4 entegrasyonu.
**Kullan:** uyumsuz API, legacy entegrasyonu, farklı sağlayıcıları ortak sözleşmeye uyarlama. Ek yetenek istiyorsan Decorator, çoklu alt sistemi sadeleştirmek istiyorsan Facade daha uygun olabilir (s. 36).

## Composite — parça ve bütüne aynı arayüz (s. 40–49)

**Amaç:** Hiyerarşik ağaç yapılarında tek nesne (Leaf) ve nesne grubu (Composite) aynı Component sözleşmesini uygular.
**Roller:** Client, Component, Leaf, Composite; Composite çocukları saklar ve işlemi özyinelemeli uygular (UML s. 41).
**Dosya örneği:** `File.getSize()` kendi boyutunu döndürür; `Folder.getSize()` alt dosya/klasörlerin boyutlarını toplar. İstemci ikisine de aynı işlemi gönderir (s. 45, 49).
**Diğer örnekler:** Ürün/Paket `fiyatHesapla()` (300+700+200+100=1.300 TL, s. 46); MenuLink/SubMenu `goster()`; Circle/ShapeGroup `tasi(x,y)`; üniversite organizasyonu.
**Faydalar (s. 43):** tek tip kullanım, daha az tip kontrolü, kolay genişletme, iç içe yapı, ortak operasyonlar.

## Facade — karmaşık alt sistem için sade giriş (s. 50–59)

**Amaç:** Client birden fazla alt sistemin çağrı sırası ve teknik ayrıntısını bilmesin. `OrderFacade.placeOrder(order)`, StockService, PaymentService, OrderService, ShippingService ve NotificationService'i koordine eder.
**Çok önemli (s. 53):** Facade **alt servisleri ortadan kaldırmaz**, sadece sade bir giriş noktası sunar.
**Örnekler:** E-ticaret sipariş tamamlama; `CourseRegistrationFacade.completeRegistration(studentId)` (hak, kontenjan, ön koşul, kayıt, danışman onayı); `PatientAdmissionFacade.admitPatient(patient)`; `TransferFacade.transfer(sender,receiver,amount)`.
**Sınır:** Facade otomatik transaction, yetkilendirme veya banka güvenliği sağlamaz; bunlar ayrıca tasarlanır (s. 58).

## Proxy — gerçek nesneye erişimi yönetme (s. 60–69)

**Amaç:** Client ile RealSubject arasına aynı Subject arayüzünü kullanan Proxy yerleştirilir; erişim kontrolü, maliyetli nesneyi geç oluşturma, uzak erişim veya önbellek sağlanabilir.
**Roller:** Client → Subject; RealSubject ve Proxy Subject'i gerçekleştirir; Proxy gerçek nesneye referans taşır (UML s. 61).
**Örnek:** `PatientRecordProxy` yetki kontrolünden sonra `PatientRecord.view()` çağırır; yetkisiz kullanıcıyı engeller (s. 62–65). Gerçek hastane yetkileri hasta ilişkisi/veri türüne göre daha ayrıntılıdır.
**Türler (s. 69):**

- **Protection Proxy:** hasta dosyası/banka hesabı yetkilendirmesi.
- **Virtual Proxy:** büyük fotoğraf/PDF'yi yalnız ihtiyaçta yükleme.
- **Remote Proxy:** uzaktaki servis/nesneye temsil üzerinden erişme.
- **Caching Proxy:** geçerli API sonucunu tekrar kullanma.

**Adapter vs Facade vs Proxy (s. 69):** Adapter → uyuşmayan arayüzü dönüştürür; Facade → birçok alt sistemi sadeleştirir; Proxy → gerçek nesneye erişimi yönetir.

## Decorator — nesneye dinamik özellik ekleme (s. 70–75)

**Amaç:** Temel sınıfı değiştirmeden, aynı Component arayüzüne sahip sarmalayıcı Decorator'larla davranışı katmanlı genişletmek. Kombinasyon başına ayrı alt sınıf açmak gerekmez.
**Roller:** Component, ConcreteComponent, Decorator (Component referansı içerir), ConcreteDecorator.
**Kahve örneği (s. 72):** BasicCoffee = 50 TL; MilkDecorator = +10 TL; CaramelDecorator = +15 TL → 75 TL. Burada **3 nesne** oluşturulur; Flyweight gibi nesne sayısını azaltma amacı yoktur.
**Diğer örnekler:** `Notification → LoggingDecorator → RetryDecorator`; `BasicReport → WatermarkDecorator → PageNumberDecorator`; `BasicOrder → GiftWrapDecorator → InsuranceDecorator`.
**Trade-off:** sarmalayıcı sayısı ve sırası davranışı/karmaşıklığı etkileyebilir (ek açıklama).

## Bridge — iki bağımsız değişim boyutunu ayırma (s. 76–83)

**Amaç:** Abstraction ve Implementation/Implementor hiyerarşileri birbirinden bağımsız değişsin. Bir arayüz üzerinden bağlanan iki ayrı yapı korunur.
**Roller:** Client, Abstraction, RefinedAbstraction, Implementor, ConcreteImplementor (UML s. 77).
**Örnek (s. 78):** Basit/Gelişmiş kumanda (2 tür) × TV/Radio/Smart Speaker (3 tür) → kombinasyon başına sınıf yazılırsa 6 sınıf. Bridge iki boyutu ayırır; kumandalar cihaz arayüzünü kullanır.
**Diğer örnekler:** Normal/Urgent Notification × SMS/Email/Push; Student/Personnel Report × PDF/Excel/HTML Exporter; Circle/Rectangle/Triangle × SVG/Canvas Renderer; Standard/Installment Payment × farklı bankalar.
**Kullan:** bağımsız iki değişim ekseni ve kombinasyon sınıfları artıyorsa. Yalnız uyumsuz iki API için Adapter, nesneye opsiyonel davranış için Decorator (s. 82).

## Yedi deseni ayırt et — sınav tablosu

| Desen     | Hatırlatma sorusu                             | Ders örneği               |
| --------- | --------------------------------------------- | ------------------------- |
| Flyweight | Tekrarlanan ortak veriyi paylaşabilir miyim?  | Askerlerin aynı 3D modeli |
| Adapter   | API'ler uyumsuz mu?                           | pay() → makePayment()     |
| Composite | Tek nesne ve grup aynı işlem mi?              | File/Folder.getSize()     |
| Facade    | Client çok sayıda alt sistemle mi uğraşıyor?  | OrderFacade.placeOrder()  |
| Proxy     | Gerçek nesneye erişimi yönetmek mi gerekiyor? | PatientRecordProxy        |
| Decorator | Nesneye isteğe bağlı davranış mı eklenecek?   | Coffee + Milk + Caramel   |
| Bridge    | İki bağımsız değişim boyutu mu var?           | Kumanda × cihaz           |

**Önemli farklar:** Flyweight ortak durumu paylaşarak belleği azaltabilir, Decorator yeni sarmalayıcı nesneler ekler. Facade servisleri kaldırmaz. Bridge iki ayrı hiyerarşiyi korur; Adapter var olan uyumsuz arayüzleri eşler.

## Uygulama ve tekrar (s. 84–85)

Ders sonunda **20 senaryo** vardır: farklı banka API'leri, 20.000 asker, sipariş tamamlama, hasta dosyası erişimi, kahve eklentileri, dosya/klasör, rapor türü × çıktı formatı, restoran ikonları, PDF'nin lazy loading'i, bildirim retry/logging ve diğerleri. Önce hangi desenin neden uygun olduğunu kendin belirle; yalnız adı ezberleme.

**Kendini dene — çözümleri yazmadan:**

1. Flyweight'te intrinsic ve extrinsic state nasıl ayrılır?
2. Facade ile Proxy'nin temel farkı nedir?
3. Bridge ne zaman Decorator'dan daha uygundur?

_Kaynak: Hafta6_7_Yapisal_Tasarim_Desenleri.pdf, fiziksel PDF s. 1–86; kapak “6. HAFTA” olarak geçer. Ek teknik yorumlar açıkça belirtilmiştir._
