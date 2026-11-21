## 1. Design Patterns (tasarım kalıpları) — الفكرة والمجموعات

**Design Pattern (tasarım deseni)** حل تصميمي عام لمشكلة بتتكرر، وليس كود جاهز ننسخه. بيوضح كيف Classes (sınıflar) وObjects (nesneler) بيتعاونوا. المحاضرة ص 4–11 بتذكر أهداف مثل توزيع Responsibilities (sorumluluklar)، تقليل Coupling (bağımlılık)، وإعادة استخدام حلول مجرّبة. فيه ثلاث عائلات: **Creational (yaratımsal)** لإنشاء Objects، **Structural (yapısal)** لتركيبها وربطها، **Behavioral (davranışsal)** لتفاعلها. التركيز هون على **7 Structural Patterns**: Flyweight, Adapter, Composite, Facade, Proxy, Decorator, Bridge (ص 10–12).

**قبل تختار Pattern اسأل:** هل عم وفّر Memory؟ أو بوصل Interfaces غير متوافقة؟ أو عندي Tree؟ أو Subsystems كثيرة؟ أو بدي أتحكم بالوصول؟ أو أضيف Behavior ديناميكياً؟ أو عندي بُعدين تغيير مستقلين؟ طريقة فهم المشكلة أهم من حفظ أسماء الأنماط.

## 2. Flyweight (hafif nesne / paylaşım deseni) — مشاركة البيانات الثقيلة

**المشكلة:** عدد كبير من Objects بيخزّن نفس بيانات العرض/النموذج، فبندفع Memory (bellek) زيادة. **الحل:** فصل **Intrinsic State (içsel/ortak durum)** المشترك عن **Extrinsic State (dışsal/değişken durum)** الخاص بكل استخدام. نحفظ الأولى في Shared Object (paylaşılan nesne)، والثانية خارجها عند كل Instance أو بتمرر للـMethod (ص 12–13).

المحاضرة بتعطي أمثلة مفصّلة (ص 14–21): 10,000 جندي يشاركون 3D Model والزي والسلاح مع بقاء Location/Health/Identity منفصلين؛ 50,000 شجرة صنوبر تشارك الموديل والـTexture؛ 20,000 مطعم بالخريطة يشتركون بـIcon لكن لكل واحد Coordinates وName؛ Text Editor فيه 100,000 Character يشترك برسومات Glyph، مو أن كل حرف A صار نفس موضع الحرف؛ وفي جامعة 300 تسجيل لمقرر واحد بتشير إلى `CourseInfo` واحد بينما `Enrollment` يحمل StudentId/Date/Grade.

في الشكل بصفحة 16 يظل عدد الجنود **10,000**، لكن عدد نسخ الموديل المشترك ممكن يصير **1** بدل 10,000. يعني Flyweight **لا يعني تقليل كل Object**؛ هو تقليل نسخ البيانات المشتركة. لو HP للجندي الأول صار 50 ما لازم تنخفض صحة البقية.

**الأدوار في UML (ص 22–24):** `FlyweightFactory` بتخزّن **Object Pool (nesne havuzu)**، عادة `HashMap<Key, Flyweight>`؛ `Flyweight` Interface، `ConcreteFlyweight` بيانات مشتركة، و`Client` يعطي حالة الاستخدام. الـAlgorithm:

```java
Map<String, CircleStyle> pool = new HashMap<>();
CircleStyle getStyle(String color) {
    return pool.computeIfAbsent(color, CircleStyle::new);
}
// الموقع ونصف القطر خارج الـ shared style
```

في مثال **20 Circle من 5 ألوان**، الحد الأقصى للـStyle Objects المشتركة هو **5** إذا كان اللون مفتاح المشاركة. ص 25 بتنبه: استخدمه لما تكرار بيانات كبيرة بيسبب مشكلة Memory فعلية؛ مو لما عندك كم Object صغير لأن إدارة الـPool بتزيد Complexity.

## 3. Adapter (bağdaştırıcı) — توصيل Interfaces مختلفة

**المشكلة:** برنامجك بينادي `pay(amount)`، بينما Bank API عندها `makePayment(amount)`. كلا الطرفين شغّال، بس واجهتهم غير متوافقة. **Adapter** يطبّق **Target Interface (hedef arayüz)** اللي يتوقعها Client، وبالداخل بيفوّض الطلب إلى **Adaptee (uyarlanacak sınıf)**. مو مجرد تغيير اسم Method: ممكن يحوّل Parameters وData Format وResponse (ص 26–29).

**الأدوار (ص 27):** Client → Target → Adapter → Adaptee. مثال Java المذكور بالمحاضرة:

```java
interface PaymentService { void pay(double amount); }
class BankAPI { void makePayment(double amount) { /* ... */ } }
class BankAdapter implements PaymentService {
  private final BankAPI bank = new BankAPI();
  public void pay(double amount) { bank.makePayment(amount); }
}
PaymentService payment = new BankAdapter();
payment.pay(1500);
```

ما عدّلنا Client ولا BankAPI. أمثلة الشرائح (ص 30–39): University OBS مقابل External Student Service مع Mapping من `personId/fullName/schoolCode` إلى `studentNo/name/departmentCode`؛ BankAAdapter/BankBAdapter؛ ArasCargoAdapter/YurticiCargoAdapter؛ جهاز Lab بيطلع XML أو JSON وبدنا `LabResult` موحّد؛ LegacyInvoiceAdapter بين `generateInvoice()` و`calculateOldInvoice()`؛ AudioPlayer للـmp3 مع MediaAdapter لتشغيل VLC وMP4.

**متى؟** تغيير Interface بدون تغيير الأنظمة القائمة. **ليس** الخيار الطبيعي لإضافة Features اختيارية (Decorator) أو اختصار عدة Services خلف واجهة (Facade)، كما في جدول ص 36.

## 4. Composite (bileşik desen) — شجرة بتعامل الورقة والمجموعة بنفس الواجهة

**المشكلة:** بدنا نتعامل مع Leaf (yaprak / tek nesne) وComposite (bileşik / nesne grubu) عبر **Component (bileşen)** موحد. مثال `File.getSize()` بيرجع حجم ملف، و`Folder.getSize()` بيجمع أحجام الأطفال **Recursively (özyinelemeli)**. من جهة Client، الاتنين `getSize()` (ص 40–49).

**الأدوار في Class Diagram ص 41:** Component عقد مشترك؛ Leaf عملية أساسية بلا أطفال؛ Composite يحتفظ بقائمة Children (alt bileşenler) وبيطبّق العمل على كل عنصر؛ Client بيستخدم Component. تصميم Composite هو Tree (ağaç yapısı) من عقد ممكن تتداخل بمستويات كثيرة. **الفوائد (ص 43):** تعامل موحّد، شروط if أقل لتمييز file/folder، قابلية إضافة أنواع جديدة، ودعم Nesting.

**الأمثلة (ص 44–48):** Files/Folders؛ متجر فيه Product/Package و`fiyatHesapla()`؛ قائمة موقع فيها MenuLink وSubMenu و`goster()`؛ Graphics Editor بيدعم Circle/Rectangle/ShapeGroup و`tasi(x,y)`. في مثال الحزمة (ص 46) الأسعار 300 + 700 + 200 + 100 = 1,300 TL. هذا **مثال تصميم مفترض** لا ادّعاء عن البنية الداخلية لمنصات البيع المذكورة في السلايد.

**توضيح خارج السلايد:** لازم تحدد سلوك الـLeaf للعمليات الخاصة بالأطفال (`add/remove`)؛ ممكن تخليها فقط على Composite حتى ما تعرض Methods غير منطقية.

## 5. Facade (cephe deseni) — نقطة دخول بسيطة لنظام معقد

**المشكلة:** Order UI بتحتاج تعرف Stock + Payment + Order DB + Shipping + Notification وترتيب استدعاء كل Service. أي تغيير تسلسل بيأثر بالواجهة. **Facade** بيقدّم API بسيطة مثل `orderFacade.placeOrder(order)` وينسّق الخدمات الموجودة (ص 50–55). **مهم من ص 53:** الـFacade **ما بيدمج الخمس Services بكائن خدمة وحيد ولا بيلغيهم**؛ بيخفي تعقيد استخدامها عن Client.

**الأدوار:** Client → Facade → عدة Subsystems (alt sistemler). Java في ص 54 يعرّف `StockService` و`PaymentService` و`MailService` ويستدعيهم `OrderFacade.placeOrder()`.

**أمثلة (ص 55–58):** `CourseRegistrationFacade.completeRegistration(studentId)` يفحص أهلية الطالب والمقاعد والمتطلبات ويحفظ التسجيل ويفتح موافقة المرشد؛ `PatientAdmissionFacade.admitPatient(patient)` يتحقق من الهوية والتأمين ويسجل المراجعة؛ `TransferFacade.transfer(sender,receiver,amount)` ينسق الهوية والرصيد والحدود والتحويل والإشعار. **Facade لا يضمن Atomicity (atomiklik)** أو Authorization (yetkilendirme) أو سلامة Transactions (işlemler) تلقائياً؛ ص 58 تذكر وجوب حماية العمليات البنكية.

**Trade-off توضيحي:** إذا صار Facade ضخم وبيجمع كل Business Logic بلا حدود، ممكن يتحول God Object؛ خلّي دوره واجهة Orchestration (orkestrasyon) مبررة.

## 6. Proxy (vekil deseni) — وسيط يتحكم بالوصول إلى Object

**المشكلة:** لا تريد الوصول المباشر إلى **Real Subject (gerçek nesne)**، بسبب أمن، تكلفة إنشاء، Network، أو Cache. **Proxy** يطبّق غالباً نفس **Subject Interface (konu arayüzü)**، فيقدر Client يستدعيه، وهو يقرر إذا وكيف يوصل لـRealSubject (ص 60–64).

**مثال UML وكود ص 61–64:** Client → Subject؛ RealSubject وProxy يحققان Subject؛ Proxy يحتفظ بـRealSubject Reference (referans). في نظام مستشفى، `PatientRecordProxy.view(role)` يفحص Authorization قبل تنفيذ `PatientRecord.view()`. _توضيح خارج السلايد:_ الدور وحده قد لا يكفي لترخيص ملف طبي حقيقي؛ يلزم علاقة الطبيب بالمريض ونوع البيانات وأمن الخادم. الشريحة ص 65 بتنبه لهالنقطة.

**الأنواع في جدول ص 69:**

- **Protection Proxy (koruma vekili):** صلاحيات الملف الطبي أو البنك.
- **Virtual Proxy (sanal vekil):** تحميل صورة ضخمة أو PDF فقط عندما يطلبها المستخدم (ص 67).
- **Remote Proxy (uzak vekil):** تمثيل كائن/خدمة موجودة على Server آخر.
- **Caching Proxy (önbellekleme vekili):** إعادة Response محفوظ صالح بدل طلب Network كل مرة (ص 68).

**مقارنة سريعة من ص 69:** Adapter يغيّر Interface؛ Facade يبسّط التعامل مع عدة Subsystems؛ Proxy يدير الوصول إلى Object واحد/خدمة خلف واجهة متشابهة.

## 7. Decorator (dekoratör deseni) — إضافة Behavior اختياري عند التشغيل

**المشكلة:** بدنا نضيف Features (özellikler) لكائن أساسي بدون تعديل Class الأساسي وبدون وراثة صنف جديد لكل تركيبة. الـDecorator يطبّق **Component Interface** نفسها وبيحتفظ بـ**Wrapped Component (sarılmış bileşen)**، وبيزيد سلوك قبل/بعد Delegation (yetki devri) (ص 70–72).

المثال المصوّر في ص 72: `BasicCoffee(50 TL)` ثم `MilkDecorator(+10)` ثم `CaramelDecorator(+15)`، المجموع 75 TL، بتركيب **3 Objects**: قهوة + Decorator للحليب + Decorator للكراميل. **خلافاً لـFlyweight**، هون الهدف إضافة سلوك، مو تقليل عدد الكائنات؛ كل Layer إضافية Object.

أمثلة (ص 73–74): Notification + LoggingDecorator + RetryDecorator؛ تقرير جامعة + WatermarkDecorator + PageNumberDecorator؛ طلب متجر + GiftWrapDecorator + InsuranceDecorator. وتوجد أسئلة ص 75، منها تطبيق MilkDecorator مرتين على قهوة 50 TL، وترك الحل للطالب.

**توضيح خارج السلايد:** ترتيب Decorators ممكن يؤثر على Behavior (مثلاً Retry خارج Logging مقابل Logging خارج Retry)، فلازم نختبر التركيبات المطلوبة.

## 8. Bridge (köprü deseni) — فصل بُعدين مستقلين من التغيير

**المشكلة:** نوعين من التغيّر ممكن يتضاعفوا لو جمعناهم بوراثة كل التركيبات: 2 Remotes (kumandalar) × 3 Devices (cihazlar) = 6 Classes؛ مع ازدياد الأنواع، تضخم **Class Combinations (sınıf kombinasyonları)**. **Bridge** يفصل **Abstraction (soyutlama)** عن **Implementation (gerçekleme)**، وكل واحد ينمو باستقلال عبر Reference/Interface (ص 76–78).

**الأدوار في UML ص 77:** Client، Abstraction (تحتفظ بـImplementor)، RefinedAbstraction، Implementor Interface، ConcreteImplementor. الـBridge مو تحويل الاثنين لكائن واحد، بل فصل Hierarchies (hiyerarşiler) وربطهم.

أمثلة (ص 79–81): نوع الإشعار Normal/Urgent × Channel SMS/Email/Push، فنفصل `Notification` عن `MessageSender`؛ نوع تقرير Student/Personnel × Format PDF/Excel/HTML فنفصل `Report` عن `ReportExporter`؛ Shape Circle/Rectangle/Triangle × Renderer SVG/Canvas؛ Standard/Installment Payment × Bank Providers. جدول ص 82: مناسب لبُعدين تغيير مستقلين أو انفجار التركيبات، وليس لمجرد ربط API غير متوافقة (Adapter) أو إضافة ميزة اختيارية لObject (Decorator).

## 9. كيف تميّز الأنماط السبعة في الامتحان؟

| Pattern   | السؤال المفتاحي                                | مثال المحاضرة                     |
| --------- | ---------------------------------------------- | --------------------------------- |
| Flyweight | هل نكرر بيانات ثقيلة بين آلاف Objects؟         | 50,000 شجرة تشترك بـ3D Model      |
| Adapter   | هل عندنا واجهتان لا تتفاهمان؟                  | `pay()` → `makePayment()`         |
| Composite | هل Leaf ومجموعة ضمن Tree يتشاركون عملية؟       | `File/Folder.getSize()`           |
| Facade    | هل Client يتعامل مع عدة Services بطريقة معقدة؟ | `OrderFacade.placeOrder()`        |
| Proxy     | هل نحتاج التحكم بالوصول أو تأخير التحميل؟      | `PatientRecordProxy` / ImageProxy |
| Decorator | هل نضيف Behavior اختياري بطبقات؟               | Coffee + Milk + Caramel           |
| Bridge    | هل عندنا بعدا تغيّر مستقلان؟                    | Remote × Device                   |

**مقارنات مهمة:** Adapter vs Facade vs Proxy (ص 69)؛ Decorator vs Flyweight (ص 72)؛ Bridge vs Adapter/Decorator (ص 82)؛ Composite vs Decorator: الاثنين بيمتلكوا Component reference لكن Composite يطبّق العملية على **مجموعة أطفال**، وDecorator بيلف عادة **Component واحد** ليضيف سلوك (شرح المقارنة الأخير خارج السلايد).

## 10. نشاط المحاضرة والتطبيق

ص 84–85 تحتوي **20 Scenario** لاختيار Pattern، من دفع بنك غير متوافق، 20,000 جندي، Order Checkout، حماية سجل طبي، قهوة بإضافات، Files/Folders، تقارير × Formats، 30,000 Restaurant Markers، Lazy PDF Loading، Notifications مع Retry، وغيرها. الأفضل تحلهم بنفسك وما نكتب الحلول قبل المحاولة.

**3 أسئلة لاسترجاع الفهم:**

1. في خريطة فيها 30,000 Restaurant، أي بيانات بتشاركها وأي بيانات بتضل مستقلة عند استعمال Flyweight؟
2. ليش `OrderFacade` ما بيلغي `StockService` و`PaymentService`؟
3. شو الفرق بين Bridge وDecorator إذا عندك تقارير PDF/HTML مع Optional Watermark؟

_المصدر: الملف المرفوع Hafta6_7_Yapisal_Tasarim_Desenleri.pdf، 86 صفحة فعلية. الصفحة 1 معنونة «6. Hafta»، بينما اسم الملف يشير إلى Hafta6_7. الصفحات المذكورة أرقام PDF الفعلية، وبعض التوضيحات الإضافية مُعلّمة._
