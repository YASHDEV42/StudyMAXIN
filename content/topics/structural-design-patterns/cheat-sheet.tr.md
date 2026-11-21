## Yedi yapısal tasarım deseni
**Pattern = tekrarlanan tasarım problemine çözüm yaklaşımı, hazır kod değil.**
**Yaratımsal:** nasıl yaratılır? **Yapısal:** nasıl birleştirilir? **Davranışsal:** nasıl etkileşir?

| Desen | Amaç | Sınav ipucu | Örnek |
| --- | --- | --- | --- |
| **Flyweight** | Ortak ağır veriyi paylaş, bellek israfını azalt | Intrinsic/extrinsic state, HashMap pool | 10.000 asker/tek ortak 3D model |
| **Adapter** | Uyumsuz arayüzleri eşleştir | Target, Adapter, Adaptee | `pay()` → `makePayment()` |
| **Composite** | Tek nesne/gruba aynı sözleşme | Component/Leaf/Composite, ağaç, recursion | File/Folder `getSize()` |
| **Facade** | Çok alt sistem için sade giriş noktası | Client yalnız `placeOrder()` bilir | Stok + ödeme + kargo + bildirim |
| **Proxy** | Gerçek nesneye erişimi yönet | Subject/Proxy/RealSubject | Yetki, lazy image, cache |
| **Decorator** | Nesneye isteğe bağlı yeni davranış ekle | Component'i sar, katmanlar | Kahve + süt + karamel |
| **Bridge** | İki bağımsız değişim boyutunu ayır | Abstraction/Implementor | Kumanda × cihaz |

## Flyweight
**Intrinsic (ortak):** model, doku, ikon, glyph, CourseInfo. **Extrinsic (özel):** koordinat, HP, öğrenci ID, not, kayıt tarihi.
**Factory + HashMap:** anahtar varsa mevcut nesneyi döndür; yoksa oluştur ve havuza ekle.
10.000 asker nesnesi kalabilir, 3D model kopyası 10.000 yerine 1 olabilir. 20 daire/5 renk → en çok **5 ortak renk nesnesi** (anahtar renkse).
**Ne zaman?** Binlerce nesnede ortak büyük veri tekrarı gerçekten bellek sorunuysa; az nesnede pool karmaşıklığı gereksiz.

## Adapter
**Client → Target Interface ← Adapter → Adaptee**. İsim, parametre, veri biçimi, sonuç dönüştürür; iki sistemi değiştirmek zorunda bırakmaz.
```java
interface PaymentService { void pay(double amount); }
class BankAdapter implements PaymentService {
  BankAPI bank = new BankAPI();
  public void pay(double amount) { bank.makePayment(amount); }
}
```
**Örnek:** OBS dış servis `personId/fullName/schoolCode` → `studentNo/name/departmentCode`; XML/JSON lab adapter; legacy invoice; cargo API.

## Composite
**Component:** ortak sözleşme; **Leaf:** tek nesne; **Composite:** alt bileşenleri tutar, işlemleri özyinelemeli yapar.
`File.getSize()` kendi boyutunu; `Folder.getSize()` çocukların toplamını döndürür.
Ürün/Paket fiyatı, menü/alt menü, tek şekil/şekil grubu. Fayda: hiyerarşik yapı ve tek tip kullanım.

## Facade
`Client → OrderFacade.placeOrder() → Stock/Payment/Order/Shipping/Notification`.
**Yanlış düşünce:** Facade servisleri tek nesneye dönüştürmez veya ortadan kaldırmaz. Yalnız karmaşık etkileşimi sadeleştirir.
**Örnek:** OBS `completeRegistration(studentId)`, hastane `admitPatient(patient)`, banka `transfer(sender,receiver,amount)`.
**Sınır:** yetki, transaction ve tutarlılık ayrıca tasarlanır.

## Proxy
**Subject:** ortak interface; **Proxy:** araya girer ve erişimi yönetir; **RealSubject:** asıl işi yapar.
- Protection → yetki (PatientRecordProxy)
- Virtual → pahalı nesneyi gerektiğinde yükleme (fotoğraf/PDF)
- Remote → uzaktaki nesneye erişim
- Caching → geçerli API cevabını saklama

**Adapter vs Facade vs Proxy:** **Interface dönüştür / karmaşıklığı basitleştir / erişimi denetle**.

## Decorator
Aynı Component interface'ini uygulayan sarmalayıcı, mevcut nesneye yeni davranış ekler. `BasicCoffee(50) + Milk(10) + Caramel(15) = 75 TL`, **3 nesne** oluşur.
Diğerleri: Logging/RetryDecorator, Watermark/PageNumberDecorator, GiftWrap/InsuranceDecorator.
**Flyweight'ten fark:** Flyweight paylaşır; Decorator yeni katman/nesne ekler.

## Bridge
**Abstraction** ve **Implementor** ayrı hiyerarşiler, interface/referans ile bağlı.
2 kumanda × 3 cihaz = **6 kombinasyon sınıfı** (her birleşim için sınıf yazılırsa). Bridge bağımsız genişlemeyi sağlar.
Örnek: Normal/Urgent Notification × SMS/Email/Push; Report × Pdf/Excel/Html Exporter; Shape × SVG/Canvas Renderer.
**Adapter:** hazır iki uyumsuz API. **Bridge:** tasarımda bağımsız değişen iki boyut. **Decorator:** tek nesneye katmanlı davranış.

## Kaynaktaki sınıf içi etkinlikler
PDF s. 84–85: toplam **20 eşleştirme senaryosu**. Çözümleri önceden vermeden çalış:
1. Haritada 30.000 restoran aynı ikon verisini kullanıyor, konumları farklı. Hangi desen ve hangi veriler ortak?
2. Sipariş ekranı beş servisi tek `placeOrder()` çağrısıyla kullanıyor. Hangi desen ve servisler silinir mi?
3. Rapor türleri öğrenci/personel, formatlar PDF/Excel/HTML; ikisi bağımsız gelişecek. Hangi desen?
4. Hasta kaydını açmadan yetki kontrolü neden hangi desene işaret eder?
5. Logging ve retry davranışı temel sınıfa dokunmadan eklenecek. Hangi desen?

*Kaynak: Hafta6_7_Yapisal_Tasarim_Desenleri.pdf, 86 fiziksel sayfa.*
