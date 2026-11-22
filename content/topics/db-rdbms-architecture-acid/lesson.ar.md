## الأسبوع الخامس: RDBMS Architecture (RDBMS mimarisi) وACID

بعد ما تعلّمنا SQL وRelational Model، هلأ مندرس **RDBMS — Relational Database Management System (ilişkisel veritabanı yönetim sistemi)** من جوّا. الفكرة الأساسية بالمحاضرة (ص 6): النظام مو بس جدول على القرص، بل مسؤول عن **Concurrent Access (eşzamanlı erişim)**، والأمان، و**Data Integrity (veri bütünlüğü)**، والنسخ الاحتياطي والاستعادة، وتحسين تنفيذ الاستعلامات.

## 1. Database System Architectures (veritabanı sistem mimarileri) — ص 7–11

في ثلاث مسؤوليات: **Presentation (sunum)** لواجهة المستخدم، **Application/Business Logic (uygulama/iş mantığı)** لمعالجة القواعد، و**Data (veri)** للقاعدة نفسها. الاختلاف بين المعماريات هو وين بتنحط هاي المسؤوليات.

| المعمارية | توزيع المكوّنات | ميزات وقيود |
| --- | --- | --- |
| **1-Tier (tek katmanlı)** | الواجهة والتطبيق والقاعدة على نفس الجهاز | بسيطة ومناسبة لتطبيق شخصي، بس مشاركة البيانات والوصول المتعدد محدودين في مثال المحاضرة |
| **2-Tier (iki katmanlı/istemci–sunucu)** | Client فيه UI وBusiness Logic، وبيرتبط مباشرةً بسيرفر قاعدة البيانات | بيانات مركزية، لكن تحديث Business Logic بيتطلب تحديث العملاء؛ اتصالات DB الكثيرة بتزيد المخاطر |
| **3-Tier (üç katmanlı)** | Browser/UI ← Application Server ← Database Server | فصل واضح، حماية أفضل، وإمكانية زيادة Application Servers لتوسيع الاستيعاب |

**الرسمة بصفحة 7** بتورجي الفرق بالاتصالات: بــ2-Tier العميل بيتصل بالـDB مباشرة، وبــ3-Tier بيتصل بخادم التطبيق أولًا. **مثال الصفحة 10**: المتصفح ما لازم يفتح اتصال SQL مباشر؛ يبعث طلب للـBackend مثل Node.js، والـBackend بيتصل بالقاعدة ويرجّع نتيجة مناسبة.

**توضيح إضافي:** `3-Tier` هون توصيف **Logical Architecture (mantıksal mimari)**؛ ما بيعني بالضرورة ثلاث أجهزة فيزيائية منفصلة. ووجود Backend ما بيغني عن Authentication/Authorization (kimlik doğrulama/yetkilendirme) وحماية الاتصال.

## 2. RDBMS Internal Architecture (RDBMS iç mimarisi) — ص 13–18

السلايد بيقسّم النظام لمجموعتين: **Query Processor (sorgu işleyici)** — «الدماغ» اللي بيفهم SQL وبقرر خطة التنفيذ؛ و**Storage Engine (depolama motoru)** — «الأيدي» اللي بتدير البيانات بالذاكرة والقرص.

### رحلة SQL Query (SQL sorgusunun yolculuğu)

`SQL → Parser → Optimizer → Executor → Storage Engine → Result`

1. **Parser (ayrıştırıcı):** بيتأكد من الـSyntax (sözdizimi)، مثل `SELECT` مو `SELEC`، ومن الـSemantic Validity (anlamsal geçerlilik)، يعني أسماء الجداول والأعمدة موجودة (ص 14–15).
2. **Optimizer (iyileştirici):** بيقارن Execution Plans (yürütme planları) حسب تقدير الكلفة. ممكن يختار ترتيب JOIN والجداول، وخوارزمية الربط، واستعمال Index (indeks) أو Scan، اعتمادًا على Statistics (istatistikler) مثل حجم الجدول وتوزيع البيانات (ص 16).
3. **Executor (yürütücü):** بينفّذ الخطة، بيطلب البيانات من Storage Engine، وبيعمل عمليات Join/Sort/Group ثم بيرجّع النتائج.

يعني سبب وصف SQL بأنها **Declarative (bildirimsel)** بالأسبوع الرابع صار واضح: منحدّد *شو بدنا* والـOptimizer بيقرر *كيف*.

### مكوّنات Storage Engine

| المكوّن | وظيفته |
| --- | --- |
| **Transaction Manager (işlem yöneticisi)** | تنظيم `COMMIT` و`ROLLBACK` ومبدأ الكل أو لا شيء ودعم ACID |
| **Lock Manager (kilit yöneticisi)** | تنسيق الوصول المتزامن للبيانات باستخدام Locks (kilitler) على مستويات مثل الصف/الصفحة/الجدول |
| **Buffer/Cache Manager (arabellek/önbellek yöneticisi)** | يحتفظ بصفحات مستخدمة كثيرًا داخل **Buffer Pool (arabellek havuzu)** بالـRAM لتقليل القراءة من القرص |
| **File and Access Manager (dosya ve erişim yöneticisi)** | إدارة القراءة والكتابة الفيزيائية في ملفات البيانات والفهارس والـTransaction Logs |

**ليش Buffer Pool مهم؟** لأن القراءة من RAM عادة أسرع بكثير من Disk I/O (disk girdi/çıktısı)، فإعادة استخدام صفحة موجودة بالذاكرة بتخفف الوصول للقرص. هاد هو سبب التحسن اللي بتشدّد عليه صفحة 17، مو مجرد «البيانات بتصير بالـRAM دائمًا».

**توضيح إضافي:** المحركات الحديثة ممكن تستخدم MVCC (çok sürümlü eşzamanlılık denetimi) مع الأقفال؛ وصف Lock Manager بالسلايد تبسيط للمكوّنات، مش حصر لكل آليات الـConcurrency Control.

## 3. مقارنة أربعة RDBMS — ص 20–27

المحاضرة بترشّح أنظمة وفق المشروع وبيئة العمل، وما بتقول إن أحدها أفضل بكل الحالات:

| النظام | الميزات المذكورة | سيناريو المحاضرة |
| --- | --- | --- |
| **Oracle Database** | **RAC — Real Application Clusters** للتوفر العالي، أدوات أمن وتحليلات وData Warehousing؛ ترخيص تجاري مرتفع التكلفة | Core Banking (çekirdek bankacılık) أو أنظمة حرجة جدًا |
| **MySQL** | سهولة الاستخدام والانتشار بالويب وCMS وLAMP، InnoDB كـACID Storage Engine، نسخ Community/Enterprise | مدونة WordPress أو موقع صغير |
| **Microsoft SQL Server** | تكامل .NET وWindows/Azure/Active Directory وSSMS وSSIS وSSAS وSSRS؛ نسخ تجارية وExpress | ERP أو BI ضمن بيئة Microsoft |
| **PostgreSQL** | Open Source (açık kaynak)، SQL Standards (SQL standartları)، Extensibility (genişletilebilirlik)، دعم PostGIS للاستعلامات المكانية | GIS Analytics Startup أو تطبيق كبير مع Queries معقّدة |

**صفحات 26–27** بتحدّد أربع حالات: موقع شخصي → MySQL؛ تحليلات جغرافية → PostgreSQL/PostGIS؛ ERP بـ.NET → SQL Server؛ نظام بنك دولي حرج جدًا → Oracle/RAC.

**مهم:** هاي توصيات سياقية من السلايد، مو Benchmark حديث أو ترتيب مطلق؛ اختلاف الترخيص والتكلفة وباقي المتطلبات لازم يتحقق منه قبل قرار Production.

## 4. Data Integrity (veri bütünlüğü) — ص 29–30

**Data Integrity** معناها القواعد اللي بتضمن صحة البيانات واتساقها. المحاضرة بتقسمها لثلاثة أنواع:

| النوع | شو بيضمن؟ | الأدوات | الخطأ اللي بيمنعه |
| --- | --- | --- | --- |
| **Entity Integrity (varlık bütünlüğü)** | كل صف إله هوية فريدة قابلة للتحديد | `PRIMARY KEY` | صف بلا هوية أو سجل مكرر بنفس المفتاح |
| **Domain Integrity (alan bütünlüğü)** | قيم العمود ضمن نوعه وشروطه | Data Types، `CHECK`، `NOT NULL` | سعر سلبي أو نص بعمود DATE |
| **Referential Integrity (ilişkisel bütünlük)** | العلاقات بين الجداول صحيحة | `FOREIGN KEY` | علامة لطالب غير موجود أو حذف قسم بطريقة تكسر المرجع |

ربط بالمحاضرات الماضية: درسنا PK/FK وConstraints بالأسبوع الثاني، وكتبناها بـSQL بالأسبوع الرابع. الأسبوع الخامس بيشرح *ليش* الـRDBMS بيضمنها.

## 5. ACID Properties (ACID özellikleri) — ص 31–36

الـ**Transaction (işlem)** مجموعة خطوات لازم نعتبرها وحدة منطقية. **الرسم بصفحة 31** بيعرض أربعة أحرف، مع مثال تحويل **100 TL من حساب A لحساب B**: خصم 100 من A، ثم إضافة 100 إلى B.

| الحرف | التعريف | مثال تحويل المال |
| --- | --- | --- |
| **A — Atomicity (atomiklik)** | كل العمليات تنجح مع بعض أو كلها تتراجع | انخصم المبلغ من A وفشلت الإضافة لـB → `ROLLBACK` يرجع الخصم |
| **C — Consistency (tutarlılık)** | الانتقال من حالة سليمة لحالة سليمة وفق القيود | مجموع الرصيد ما بيتغير إذا التحويل صحيح |
| **I — Isolation (izolasyon)** | تنظيم Transactions المتزامنة ومنع كشف الحالة المؤقتة بحسب مستوى العزل | مستخدم ثاني ما يشوف «نصف تحويل» غير مثبت |
| **D — Durability (kalıcılık)** | نتائج `COMMIT` تبقى محفوظة بعد عطل أو إعادة تشغيل ضمن ضمانات النظام | البنك أكد التحويل، ثم حصل Crash؛ النتيجة مثبتة وقابلة للاستعادة |

### A: Atomicity (atomiklik) — صفحة 32

إذا عملية خصم 100 نجحت، بس إيداعها فشل، مو منطقي نخسر المال. لما العمليتين ضمن Transaction واحدة، الفشل بيعني التراجع عن خطواتها غير المثبّتة. كلمة *Atomic* هون معناها وحدة ما بتنقسم أثناء الالتزام، مو إن كل SQL Statement بالضرورة بحد ذاته معاملة كاملة منطقية.

### C: Consistency (tutarlılık) — صفحة 33

الـTransaction لازم تحافظ على Invariants (değişmez kurallar) مثل قواعد PK/FK/CHECK ورصيد البنك حسب المنطق التجاري. السلايد بيعطي مثال منفصل بقيمة **200 TL**: Ali كان معه 1000 وزينب معها 500؛ بعد التحويل Ali 800 وزينب 700، ومجموع الحسابين بقي 1500. هاد مثال مختلف عن تحويل 100 TL لشرح Atomicity.

**توضيح إضافي:** الـDBMS بيطبق القيود المعرّفة، بس قواعد العمل غير المعرّفة بالـSchema أو الكود ما رح يستنتجها لحاله.

### I: Isolation (izolasyon) — صفحة 34

لو شخص عم يحوّل مبلغ، والآخر عم يستعلم عن الرصيد، لازم عملية متزامنة ما تكشف نتائج غير ملتزم بها على نحو يخالف **Isolation Level (izolasyon seviyesi)** المستخدم. السلايد بيشرحها بصورة مبسطة كأن المعاملات تنفّذت واحدة بعد الثانية.

**توضيح إضافي مهم:** مش كل Isolation Level بيضمن **Serializability (serileştirilebilirlik)** الكاملة. السلوك الفعلي بيعتمد على مستوى العزل المختار، وعلى أقفال أو MVCC المحرك.

### D: Durability (kalıcılık) — صفحة 35

بعد `COMMIT` النظام لازم يقدر يستعيد نتيجة المعاملة حتى لو صار انقطاع كهرباء أو Crash، وفق إعدادات وضمانات التخزين. المحاضرة بتربطها بـ**Transaction Log (işlem günlüğü)**؛ تدوين تغييرات المعاملة بالسجل بيسمح بالاستعادة بعد العطل.

## خريطة الربط وخلاصة الامتحان

- **3-Tier**: Browser → Application Server → Database، وما منفتح DB مباشرةً من الواجهة.
- **Query Processor**: Parser → Optimizer → Executor.
- **Storage Engine**: Transaction + Lock + Buffer + File/Access Managers.
- **Data Integrity**: Entity عبر PK؛ Domain عبر الأنواع والقيود؛ Referential عبر FK.
- **ACID**: Atomicity الكل أو لا شيء؛ Consistency حفظ القواعد؛ Isolation تنظيم التزامن؛ Durability ثبات الـCommit.
- الأسبوع السادس بحسب السلايد 40: **Transaction Management and Indexing (transaction yönetimi ve indeksleme)**، وفيه TCL وتطبيق التحويل البنكي وExecution Plans.

**أسئلة استرجاع (بدون حلول):** ليش 3-Tier أكثر مناسبة من 2-Tier للويب؟ كيف بيختار Optimizer تنفيذ JOIN؟ كيف نفرّق بين Entity/Domain/Referential Integrity؟ وليش Atomicity مو نفس Durability؟

**المصدر:** Prof. Dr. Özal Yıldırım، *RDBMS Mimarisi ve ACID*، Hafta 5، الصفحات الفيزيائية 6–40.
