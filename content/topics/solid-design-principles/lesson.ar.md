## 1. ليش منحتاج Design Principles؟
المحاضرة بتبدأ بسؤال: ليش الكود اللي بيشتغل اليوم ممكن يكون صعب تغييره بكرا؟ **Class Diagram (sınıf diyagramı)** بيعرض Structure (yapı)، لكن مبادئ التصميم بتسأل إذا تقسيم **Responsibilities (sorumluluklar)** والـ**Dependencies (bağımlılıklar)** بيخلي النظام قابل للتعديل. أمثلة ص 4: إضافة طريقة دفع بتستلزم تعديل 12 Class، تعطل Email Provider بيفشل الطلب، Class واحدة مسؤولة عن المستخدم والدفع والمخزون والتقارير، أو تكرار قاعدة التحقق في 15 ملف. كل هدول مشاكل جودة حتى لو الكود شغال.

الأهداف الرئيسية (ص 5): **Understandability (anlaşılabilirlik)**، **Modifiability (değiştirilebilirlik)**، و**Testability (test edilebilirlik)**. بدنا تقسيم مسؤوليات واضح، تأثير تعديل محصور، وقدرة نختبر كل جزء مستقلاً.

## 2. High Cohesion وLow Coupling
**High Cohesion (yüksek uyum):** مسؤوليات الـClass مترابطة بموضوع واحد. مثال ص 6: `StudentService` فيه تسجيل وبريد وPDF ودفع = Weak Cohesion (zayıf uyum). الأفضل `RegistrationService` للتسجيل، `NotificationService` للإشعار، `ReportService` للتقارير و`PaymentService` للدفع.

**Low Coupling (düşük bağımlılık):** نقلل ربط Class بتفاصيل الـClass الثانية. في ص 7، `OrderService` اللي بيعرف تفاصيل `GmailSender` رح يتأثر إذا تغيّر Provider. ربطه بـ`NotificationPort` (interface) والسماح بـ`EmailAdapter` أو `SmsAdapter` بقلل أثر التغيير. *Low coupling لا يعني صفر علاقات؛ يعني تقليل التبعيات غير الضرورية على تفاصيل التنفيذ.*

## 3. SOLID: المبادئ الخمسة
| الحرف | English | Turkish | السؤال |
| --- | --- | --- | --- |
| S | Single Responsibility Principle (SRP) | Tek Sorumluluk İlkesi | هل في سبب عمل واحد منطقي لتغيير هذا المكوّن؟ |
| O | Open/Closed Principle (OCP) | Açık/Kapalı İlkesi | هل بقدر أضيف سلوك جديد بدون تعديل مستمر بالكود المستقر؟ |
| L | Liskov Substitution Principle (LSP) | Yerine Geçme İlkesi | هل الـSubtype بديل صحيح للأب بلا كسر عقده؟ |
| I | Interface Segregation Principle (ISP) | Arayüz Ayrımı İlkesi | هل العميل مجبر يعتمد على Methods ما بيستخدمها؟ |
| D | Dependency Inversion Principle (DIP) | Bağımlılığı Tersine Çevirme İlkesi | هل Business Logic معزول عن تفاصيل Providers عبر Abstractions؟ |

### S — Single Responsibility Principle (SRP)
مو معناها Class فيها Method واحدة. معناها مسؤولية مترابطة و**سبب تغيير واحد من جهة عمل / Actor** (ص 9). إذا Tax Rule تغير أو Email Provider تغير، مو لازم الاتنين يعدّلوا `OrderManager` نفسه. في ص 10، المحاضرة بتفصل `OrderService` و`TaxCalculator` و`NotificationService` و`InvoiceGenerator`. وفي سيناريو المستشفى (ص 11) تقترح `AppointmentService` و`DoctorScheduleService` و`InsuranceEligibilityService` و`NotificationService` و`AppointmentReportService`. الرابط المباشر: SRP بيدعم High Cohesion.

### O — Open/Closed Principle (OCP)
**Open for Extension, Closed for Modification (genişletmeye açık, değişikliğe kapalı)**: كل مرة بيظهر نوع شحن جديد، بدل ما نكبّر if/else في `ShippingCalculator`، منعمل `ShippingPolicy` Interface وImplementations مثل `StandardShipping` و`ExpressShipping` و`InternationalShipping` (ص 12–13). مثال ص 14 يستخدم `DiscountPolicy.apply(total)`، وتطبيقات `StudentDiscount` و`LoyaltyDiscount`، بينما `CheckoutService` بيتعامل مع Interface. **Polymorphism (çok biçimlilik)** و**Strategy (strateji)** أدوات ممكن تساعد. لكن السلايد بيوضح: مو كل تغيير صغير بيحتاج Abstraction مسبقة.

### L — Liskov Substitution Principle (LSP)
لازم تقدر تستبدل **Base Type (üst tür)** بـ**Subtype (alt tür)** من غير ما ينهار الـContract (sözleşme) المتوقع. `extends` لحاله مو دليل إن العلاقة صحيحة؛ الـSubtype ما لازم يفرض Preconditions (ön koşullar) أشد أو يفاجئ العميل بأخطاء بسبب سلوك أساسي (ص 15).

مثال بنك ص 16: `Account.withdraw()` متاح نظرياً لكل الحسابات، لكن `FixedDepositAccount.withdraw()` دائماً بيرمي Error. هون وراثة غير سليمة. الحل: واجهة/نوع `WithdrawableAccount` خاص بالحسابات اللي بتدعم السحب. مثال المكتبة ص 17: `ReferenceBook` لا يمكن استعارته، فلا تفرض `borrow()` على كل `LibraryItem`؛ استخدم عقد `BorrowableItem` أضيق.

### I — Interface Segregation Principle (ISP)
لا تجبر Client (istemci) على الاعتماد على وظائف ما بيحتاجها. ص 19: `IMachine` عم يحتوي `print()` و`scan()` و`fax()`، وBasicPrinter ما بيقدر ينفذ إلا الطباعة. الحل `IPrintable` و`IScannable` و`IFaxable`، وBasicPrinter يطبق الأول فقط. وفي نظام الجامعة ص 20، واجهة `IUniversityOperations` العملاقة تُقسم مثلاً إلى `IStudentRegistration` و`IAdvisorApproval` و`ICourseAdministration` و`ITranscriptReader`. هون عم نرفع Cohesion تبع الواجهات ونقلل Coupling للعملاء.

### D — Dependency Inversion Principle (DIP)
الـ**High-level Policy (üst düzey iş politikası)** ما لازم تعتمد مباشرة على **Low-level Implementation (alt düzey teknik ayrıntı)**؛ الاتنين يعتمدوا على **Abstraction (soyutlama)**، والتفاصيل تنفذ العقد (ص 21). `OrderService → GmailSender` بيعني تغيير مزود البريد ممكن يغير قواعد الطلب. المحاضرة ص 22–23 بتستبدلها بـ`OrderService → INotificationSender`، والـ`GmailAdapter` أو `SmsAdapter` ينفذوا واجهة الإشعارات. *الهدف مو حذف الاعتماد، بل توجيهه لعقد مستقر.*

**DIP ≠ Dependency Injection (DI, bağımlılık enjeksiyonu)**: DIP **مبدأ تصميم** لتوجيه الاعتماد نحو Abstractions؛ DI **تقنية تطبيق** لتمرير الـDependency من الخارج بدل `new` داخل Class. مثال ص 24: `new OrderService(notificationSender)`. وبمستشفى ص 25 نقدر نعطي `AppointmentService` أنواع `SmsSender` و`EmailSender` و`PushSender` أو `FakeNotificationSender` للاختبار.

## 4. كيف SOLID بيكمل بعضه؟
حسب مخطط ص 26: SRP يقسم المسؤوليات، OCP يسهل إضافة سلوك، LSP يضمن صحة العقود مع Subtypes، ISP يضيّق الواجهات، وDIP يفصل قواعد العمل عن التفاصيل التقنية. كلها بتخدم High Cohesion + Low Coupling، لكن مش قواعد ميكانيكية بلا سياق.

## 5. DRY وKISS وYAGNI
**DRY — Don't Repeat Yourself (kendini tekrarlama):** لا تكرر **نفس المعلومة أو Business Rule (iş kuralı)** بنسخ مستقلة. مو شرط توحّد كل سطرين متشابهين إذا قواعد العمل مختلفة (ص 27). مثال الجامعة ص 28: شرط `Matematik I` لـ`Matematik II` متكرر بالـUI وبخدمة التسجيل وبالتقارير. إذا ألغي الشرط لازم نعدل 3 أماكن؛ الأفضل مصدر واحد مثل `CourseEligibilityPolicy.canEnroll(student, course)`. مع هيك **Server-side Validation (sunucu tarafı doğrulama)** يضل ضروري؛ مصدر القاعدة الموحد لا يعني الاعتماد على فحص واجهة المستخدم.

**KISS — Keep It Simple, Stupid (basit tut):** اختار أبسط حل **يلبّي المتطلبات فعلياً**. ص 30 يقارن تطبيق نادي فيه 200 مستخدم وفريق شخصين: 8 Microservices وKafka وKubernetes و3 قواعد بيانات مقابل **Modular Monolith (modüler monolit)** مع قاعدة بيانات علائقية وREST API واختبارات وCI. الهدف مو القول Monolith دائماً أفضل، بل تجنب **Overengineering (gereksiz mühendislik)** (ص 29–30). البساطة لا تعني تجاهل Security أو Error Handling.

**YAGNI — You Aren't Gonna Need It (ihtiyaç yoksa yapma):** لا تبني Features (özellikler) مفترضة فقط لأنها *ممكن* تلزم بعدين. ص 32 يقارن متجر ما عنده مستخدمين حقيقيين لكنه يبني 25 عملة و12 Loyalty Tier وAI Price Optimization ونظام ضرائب عالمي، مقابل MVP فيه قائمة المنتجات وسلة وطلب ودفع أساسي ومخزون. OCP وYAGNI ما بيتناقضوا: ممكن تترك Extension Point منطقي بدون بناء عشر ميزات غير مطلوبة.

| مبدأ | السؤال العملي (ص 33) |
| --- | --- |
| DRY | هل نفس القاعدة/المعلومة مكررة؟ |
| KISS | هل الحل أعقد من اللازم؟ |
| YAGNI | هل في حاجة مؤكدة للميزة **الآن**؟ |

## 6. حالات المحاضرة (الصفحات 34–38)
**التجارة الإلكترونية:** `CheckoutManager` بيدير الطلب والدفع والمخزون والإشعارات وكل Provider جديد بيزيد if/else، وإذا تعطل الإشعار يفشل الطلب. هذا بيفتح نقاش SRP وOCP وDIP. رسم ص 35 يوضح `CheckoutService → PaymentGateway → Bank/Card Adapter` و`OrderService → EventPublisher → NotificationHandler`. **مهم:** السلايد بينبه إن Payment/Stock Consistency (ödeme/stok tutarlılığı)، وحدود Transactions (işlem sınırları) والتعويض عن الفشل لازم تتصمم لحالها، مش إن الرسم بيضمنها.

**نظام تسجيل الجامعة OBS:** ص 36 يعرض 20,000 طالب بيتسجلوا بنفس الوقت، وسعة الصف 30. SRP يفصل التسجيل من البريد/التقارير، وDRY يوحّد شروط التسجيل. لكن **High Cohesion ما بمنع Race Condition (yarış durumu)**: لو بقي مقعد واحد وطلبين وصلا معاً، ممكن الاتنين يشوفوا المقعد متاح. لازم **Atomic Update (atomik güncelleme)** أو **Transaction (işlem)** أو **Locking (kilitleme)** مناسب. هذا مذكور صراحة بالمحاضرة.

**مطابقة ص 37:** حساب مصرفي ما بيسمح بالسحب لكنه يرث `withdraw()` → LSP؛ إضافة أنواع شحن بتكبر if/else → OCP؛ خدمة مستشفى مربوطة بمزود SMS مباشر → DIP.

**تمرين ص 38** بيعطي ثمانية حالات من A إلى H للمطابقة، ومنها Interface فيها 15 Method، `StudentService` يجمع PDF وSMS والتسجيل، و10 Microservices لتطبيق نادي صغير، والتحقق من شروط التسجيل منسوخ في 5 Classes. من الأفضل تجرب تحلهم قبل قراءة أي إجابات.

## 7. الخلاصة والتطبيق
المهمة الأخيرة (ص 39): اختَر تصميمين سيئين من OBS أو E-commerce، وارسم Class Diagram قبل/بعد، واذكر مبدأ التصميم المناسب والـTrade-off. هدفنا مو إزالة كل Coupling أو عمل Interface لكل Class؛ بل تصميم مفهوم وقابل للتغيير والاختبار ضمن سياق المشروع.

**أسئلة لك قبل الحل:** 1) لماذا `FixedDepositAccount.withdraw()` الذي يرمي Exception دائماً يخالف LSP؟ 2) هل وضع `CourseEligibilityPolicy` يلغي التحقق من شروط التسجيل على Backend؟ 3) ما الفرق بين DIP وDI؟
