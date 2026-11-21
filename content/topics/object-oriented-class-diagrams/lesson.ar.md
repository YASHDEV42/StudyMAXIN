## 1. UML وObject-Oriented Design

**UML (Birleşik Modelleme Dili)** لغة نمذجة رسومية معيارية يديرها OMG، وليست Programming Language (programlama dili). الـModel (model) تمثيل مبسّط للنظام، مثل الخريطة بالنسبة للمدينة؛ يساعد الفريق على التواصل واكتشاف أخطاء التحليل والتصميم قبل كتابة الكود (PDF ص 3–4). تركز المحاضرة على ثلاثة مخططات: **Class Diagram (sınıf diyagramı)** للبنية الثابتة، **Use Case Diagram (kullanım durumu diyagramı)** للوظائف التي يطلبها الـActor (aktör)، و**Sequence Diagram (sıralama diyagramı)** لترتيب الرسائل أثناء سيناريو معين. لا تخلط بين الأسئلة الثلاثة: «ممّ يتكون النظام؟»، «ماذا يطلب المستخدم؟»، «بأي ترتيب تتواصل الكائنات؟» (ص 5).

في **Object-Oriented Design (nesne yönelimli tasarım)** نقسم النظام إلى Objects (nesneler) تحمل مسؤوليات واضحة وتتعاون. **Class (sınıf)** قالب للبيانات والسلوك، و**Object (nesne)** نسخة منه أثناء التشغيل: `Student` تعريف صنف، أما طالب محدد فهو object. الفكرة ليست الإكثار من الأصناف بل توزيع المسؤوليات وتقليل الاعتماد غير الضروري (ص 6).

## 2. المبادئ الأربعة الأساسية

**Abstraction (soyutlama):** نختار خصائص وسلوكيات المشكلة المهمة ونخفي التفاصيل غير اللازمة للفهم. ماكينة ATM تعرض «سحب نقود» دون تفاصيل شبكة البنك وقاعدة البيانات. السؤال: «ما الوظيفة التي يجب إظهارها؟» (ص 7).

**Encapsulation (kapsülleme):** نحمي الحالة الداخلية والتفاصيل التنفيذية وراء واجهة محددة. بدل جعل `BankAccount.balance` متاحاً مباشرة، نستخدم `withdraw(amount)` للتحقق من قاعدة عدم سحب مبلغ غير متاح. تُستعمل Visibility (görünürlük) مثل private/public/protected لدعم ذلك. السؤال: «كيف نضبط الوصول والتعديل؟» (ص 8).

**المقارنة (ص 9):** Abstraction تختار **ماذا** نعرض من السلوك، بينما Encapsulation تنظّم **كيف** نحمي الحالة والتنفيذ. مثال السيارة في السلايد: دواسة الوقود واجهة مفهومة، وآلية المحرك الداخلية ليست مفتوحة للتلاعب المباشر.

**Cohesion (uyum/bütünlük):** مدى ترابط مسؤوليات Class أو Module (modül) من الداخل. High Cohesion (yüksek uyum) يعني أن المسؤوليات تتعلق بهدف واضح، أما StudentService الذي يجمع التسجيل والبريد والدفع وإنتاج PDF والتقارير فـLow Cohesion (düşük uyum) (ص 10).

**Coupling (bağlılık/bağımlılık):** مدى اعتماد صنف أو مكوّن على تفاصيل صنف آخر. Low Coupling (düşük bağlılık) يقلل انتقال التغييرات؛ ربط `DersKayitService` مباشرة بتفاصيل `EmailService` قد يوسع أثر أي تعديل. التواصل عبر Interface (arayüz) أو Event (olay) يمكن أن يقلل هذا الارتباط. لا يُقصد إلغاء كل العلاقات (ص 11–12).

**قاعدة التصميم:** High Cohesion + Low Coupling، أي مسؤوليات مترابطة داخل الصنف وروابط غير ضرورية قليلة خارجه. وهي أساس للمحاضرات التالية عن SOLID وDesign Patterns.

## 3. كيف نقرأ Class Diagram؟

Class Diagram رسم **Structural (yapısal)** يصف الأصناف والـAttributes (öznitelikler)، والـOperations (işlemler/metotlar)، وعلاقاتها، وليس ترتيب الأحداث الزمني (ص 13).

صندوق الصنف المعتاد يتكون من ثلاثة أقسام: **اسم الصنف؛ Attributes؛ Operations**. مثال ص 14:

```text
Student
-----------------------------
- studentNo: String
- name: String
+ status: bool = true
-----------------------------
+ enroll(course: Course): bool
+ drop(course: Course): void
+ getName(): String
```

شكل Attribute العام في المحاضرة: `<visibility> name : Type [multiplicity] = default {property}`. وشكل Operation: `<visibility> method(parameters): ReturnType` (ص 14–16).

| Visibility                  | UML | المعنى                           |
| --------------------------- | --- | -------------------------------- |
| Public (genel erişim)       | `+` | متاح من خارج الصنف               |
| Private (özel erişim)       | `-` | لا يُسمح بالوصول المباشر من خارجه |
| Protected (korumalı erişim) | `#` | الوصول للصنف والمشتقات وفق اللغة |
| Package (paket erişimi)     | `~` | وصول ضمن Package نفسه            |

**مهم:** الرسم ليس نسخة حرفية من الكود؛ يمكن تصميمه قبل البرمجة أو استخراجه من كود موجود، وبمستوى التفصيل المناسب للهدف (ص 17–18).

## 4. العلاقات الستة في UML

الرمز ليس مجرد حفظ شكل؛ لازم أولاً نفهم معنى العلاقة (ص 19–20، 32).

| Relationship                                           | كيف تُرسم                               | المعنى والمثال                                                                     |
| ------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------------------- |
| **Association (ortaklık)**                             | خط متصل                                | ارتباط بنيوي؛ Student–Course، وقد يكون أحادي الاتجاه أو ثنائياً أو Self Association |
| **Dependency (bağımlılık)**                            | سهم متقطع مفتوح باتجاه العنصر المستخدم | استعمال مؤقت مثل Parameter أو Method Call؛ Film يعتمد على Kanal                    |
| **Aggregation (zayıf bütün-parça)**                    | معيّن فارغ عند الكل `◇`                 | Weak part-of؛ Car–Wheel، الجزء يمكن أن يوجد مستقلاً                                 |
| **Composition (güçlü bütün-parça)**                    | معيّن مملوء عند الكل `◆`                | Strong ownership؛ Order–OrderLine، حياة الجزء مرتبطة غالباً بالكل                   |
| **Generalization / Inheritance (genelleme / kalıtım)** | خط متصل بمثلث فارغ باتجاه الأب         | **IS-A**؛ Student نوع من Person                                                    |
| **Realization (gerçekleme)**                           | خط متقطع بمثلث فارغ باتجاه Interface   | الصنف يطبق عقد Interface، مثل `PaymentService implements IPayment`                 |

**Association:** إذا كان Person يعرف Address فهي علاقة ارتباط؛ يمكن تحديد Navigability (gezilebilirlik) باتجاه واحد أو اتجاهين. يمكن أن يرتبط الصنف بنفسه مثل Directory مع Subdirectory أو Employee مع Manager (ص 21، 23–24).

**Multiplicity (çokluk):** العدد المكتوب عند أحد طرفي الرابط يحدد كم object من **هذا الطرف** يمكن ربطه بنسخة واحدة من الطرف الآخر:

- `1`: واحد بالضبط؛ `0..1`: صفر أو واحد؛ `*` أو `0..*`: صفر فأكثر؛ `1..*`: واحد فأكثر؛ `m..n`: من m إلى n.
- مثال ص 23: Student `0..*` ↔ Course `0..*`: الطالب قد يأخذ عدة مساقات، والمساق قد يضم عدة طلاب.
- لا تعكس موضع الأعداد؛ عند رسم School–Department، كل Department تابع لـSchool واحد، وكل School يحوي `1..*` Department (ص 22، 33–34).

**Dependency مقابل Association:** إذا كان `Film.play(channel: Kanal)` يأخذ Kanal فقط كـParameter فهو نموذج Dependency، بينما العلاقة البنيوية المحفوظة بين كائنين تُنمذج عادةً Association (ص 25–26).

**Aggregation مقابل Composition:** كلاهما whole-part؛ الفرق الأساسي **الملكية واستقلال دورة حياة الجزء**. المعيّن عند الـWhole. تعرض ص 27 مثال العجلة مع السيارة والطلب مع OrderLine. أمثلة الحياة الواقعية للتشبيه، لا قاعدة عن كل نظام.

**Inheritance مقابل Realization:** `extends` لوراثة النوع، `implements` لتطبيق Interface في Java. اسأل «هل هو نوع منه؟» للإرث، أو «هل يحقق عقداً؟» للتنفيذ. لا نستخدم Inheritance لمجرد إزالة تكرار كود (ص 28 و30–31).

## 5. تحويل المتطلبات إلى نموذج: المثال الجامعي

في ص 29 و33–34 تعرض المحاضرة University System: **School, Department, Course, Student, Instructor**؛ وتذكر قوانين مثل: لكل School قسم واحد أو أكثر، كل قسم يتبع مدرسة واحدة، القسم يطرح مقررات، المدرّس يدرّس مقررات وقد يشرف على طلاب، والطالب يأخذ صفر أو عدة مقررات. المخطط المصور في ص 34 نموذج أولي مبسط، وتؤكد الشريحة ضرورة تدقيق أسماء العلاقات واتجاهاتها وMultiplicities وفق قواعد المسألة.

**طريقة بناء الرسم في ص 38:** (1) استخرج أسماء المشكلة كأصناف مرشحة، (2) عرّف مسؤولية كل صنف واحذف غير اللازم، (3) أضف Attributes وOperations وVisibility، (4) حدد معنى العلاقة قبل رمزها، (5) استنتج Multiplicity من القواعد، (6) راجع High Cohesion/Low Coupling، (7) حافظ على اتساق الرسم مع الكود والمتطلبات. النموذج Iterative (yinelemeli) وليس رسماً نهائياً من المحاولة الأولى.

**مثال المكتبة (ص 36–37):** LibraryManagementSystem وUser وLibrarian وBook وAccount وLibraryDatabase وStaff وStudent. المحاضرة تدعوك لتقييم: هل يصبح النظام God Class لو نفذ كل الوظائف؟ هل توجد علاقات IS-A صحيحة؟ هل Book–LibraryDatabase Association أم Dependency؟ هل اسم Account واضح؟ وأين يمكن استخدام Interfaces؟ هذه **أسئلة تحليلية** لا تعطي السلايدات لها حلاً واحداً إلزامياً.

**تمرين ص 35:** إذا كانت `interface B extends A` و`class C implements B`، فرسم UML يحتاج علاقة Generalization من B إلى A (واجهتان) وعلاقة Realization من C إلى B؛ لا تخلط بين رمز الوراثة المتصل ورمز التطبيق المتقطع.

## 6. أخطاء الامتحان الشائعة

تحويل كل اسم إلى Class؛ خلط Association وDependency؛ حفظ المعيّن دون فهم استقلال الجزء؛ إهمال Multiplicity؛ جعل كل Attribute public؛ وضع مهام غير مرتبطة في God Class؛ وتحويل UML إلى نسخة مطولة من كل تفاصيل الكود (ص 39).

**مهمة المختبر ص 41:** صمّم جامعة فيها ستة أصناف مرشحة على الأقل؛ لكل صنف 2–4 Attributes و2–4 Operations؛ بيّن Association وDependency وGeneralization أو Realization، وComposition/Aggregation إن ناسبت؛ اكتب Multiplicity و5–8 جمل عن قرار التصميم، منها توضيح Cohesion وCoupling. لا يشترط كتابة كود بهذه المرحلة.

**أسئلة الاسترجاع من ص 40:** ما الفرق بين Abstraction وEncapsulation؟ لماذا نريد High Cohesion وLow Coupling؟ ما معنى `0..1` و`1..*` و`0..*`؟ كيف نميّز Aggregation/Composition وGeneralization/Realization؟ اكتب إجاباتك قبل الاطلاع على أي حل.

_المصدر: Yazılım Tasarımı ve Mimarisi — Hafta 2، PDF مكوّن من 42 صفحة. أمثلة التوضيح خارج النص وُصفت كتفسير، وأمثلة المحاضرة نسبت إلى صفحاتها._
