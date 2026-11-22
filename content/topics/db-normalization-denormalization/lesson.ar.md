## ليش منعمل Normalization (normalizasyon)؟

الهدف من تصميم قاعدة البيانات مو بس تخزين البيانات، بل الحفاظ على **Data Integrity (veri bütünlüğü)** وتقليل **Redundancy (veri tekrarı)**. الـ**Normalization (normalizasyon)** هي عملية تنظيم الجداول العلائقية وتقسيم الجدول الضخم إلى جداول أصغر ومترابطة، بحيث المعلومة الأساسية ما تتكرر بلا داعٍ (السلايد 6).

### المثال الأول: جدول DersKayit غير المنظّم (السلايدات 7–8)

المحاضرة بتعرض السجلات التالية:

| OgrNo | OgrTamAd | BolumAd | DersKodu | DersAdi |
| --- | --- | --- | --- | --- |
| 101 | Ali Yilmaz | Bilgisayar Müh. | CS101 | Prog. Giriş |
| 101 | Ali Yilmaz | Bilgisayar Müh. | CS102 | Veri Yapıları |
| 102 | Zeynep Kaya | Bilgisayar Müh. | CS101 | Prog. Giriş |
| 103 | Can Demir | Elektrik Müh. | EE205 | Devre Teorisi |

اسم Ali وقسمه مكررين بسبب اشتراكه بمقررين. هالنوع من التصميم بيؤدي لثلاث **Anomalies (anomaliler)**:

1. **Update anomaly (güncelleme anomalisi):** إذا تغيّر اسم Ali، لازم نعدّله بكل سجلاته؛ نسيان صف بيسبب تناقض.
2. **Insertion anomaly (ekleme anomalisi):** ما منقدر نسجل طالب جديد قبل ما يسجل بمقرر، إذا الجدول يشترط وجود المقرر.
3. **Deletion anomaly (silme anomalisi):** إذا حذفنا تسجيل Can الوحيد في EE205، منخسر معلوماته الشخصية كمان.

**الفكرة:** كل جدول لازم يمثّل موضوعًا محددًا، وروابطه مع غيره تكون عن طريق **Keys (anahtarlar)**، مش بتكرار كل الوصف النصي.

## Normal Forms (normal formlar): من 1NF إلى 3NF

كل مرحلة بتفترض تحقق المرحلة اللي قبلها (السلايدات 10–20).

### 1NF — First Normal Form (birinci normal form)

**قاعدة السلايد:** الخلايا فيها **Atomic Values (atomik değerler)**، والجدول عنده **Primary Key (birincil anahtar)**. بالسياق التعليمي للمحاضرة، `OgrTamAd = "Ali Yilmaz"` هو حقل قابل للفصل إلى `OgrAd=Ali` و`Soyad=Yilmaz`، لذلك المحاضرة بتطلب فصل الاسم. هيك بصير عنا صف لكل تسجيل وحقول مفردة، بس أسماء الطلاب والمقررات لسه مكررة.

**توضيح إضافي:** معنى «قيمة ذرية» بيعتمد على طريقة استخدام الحقل. الاسم الكامل مو دائمًا مخالفة رسمية لـ1NF بكل تصميم؛ هون منلتزم بقرار تقسيمه في مثال المحاضرة. وتفصيل الـPrimary Key هو من تبسيط السلايد.

### 2NF — Second Normal Form (ikinci normal form)

**القاعدة:** الجدول يكون 1NF، وكل **Non-key Attribute (anahtar olmayan nitelik)** يعتمد على *كامل* المفتاح المركّب، مو جزء منه. هون المفتاح `{OgrNo, DersKodu}`.

العلاقات الوظيفية **Functional Dependencies (fonksiyonel bağımlılıklar)** في المثال:

- `OgrNo → OgrAd, OgrSoyad, BolumAd`: معلومات الطالب بتعتمد على رقمه لحاله.
- `DersKodu → DersAdi`: اسم المقرر بيتحدد من رمز المقرر لحاله.

هاي **Partial Dependencies (kısmi bağımlılıklar)** لأن المفتاح من عمودين، ومع ذلك كل مجموعة من الصفات بتعتمد على عمود واحد فقط. الحل نفصل:

- `Ogrenci(OgrNo, OgrAd, OgrSoyad, BolumAd)`
- `Ders(DersKodu, DersAdi)`
- `OgrenciDers(OgrNo, DersKodu)`

بالسلايد 15 جدول الطالب المعروض ما فيه `BolumAd` مؤقتًا؛ الشرح النصّي بوضّح إنه تابع للطالب وبينرجع بمرحلة 3NF. و`OgrenciDers` هو **Junction Table (ara tablo)** لعلاقة M:N اللي درسناها بالأسبوع الثاني.

### 3NF — Third Normal Form (üçüncü normal form)

**قاعدة المحاضرة:** الجدول يكون 2NF، وما يكون فيه **Transitive Dependency (geçişli bağımlılık)** بين صفات غير مفتاحية.

مثال (السلايدات 16–19):

`OgrNo → BolumAdi → FakulteAdi`

يعني رقم الطالب بيحدّد قسمه، واسم القسم بيحدّد اسم الكلية؛ فـ`FakulteAdi` مو معلومة خاصة بكل طالب. لو عدلنا اسم الكلية بجدول الطلاب رح نحتاج تحديث كل الصفوف. الحل بالسلايد:

- `Ogrenci(OgrNo PK, OgrAd, OgrSoyad, BolumID FK)`
- `Bolumler(BolumID PK, BolumAdi, FakulteAdi)`

الطالب 101 و102 بقسم رقم 10، والطالب 103 بقسم 11. هيك اسم القسم والكلية ما بيتكرر لكل طالب.

**تنبيه على حدود المثال:** اسم الكلية لسه ممكن يتكرر ضمن عدة صفوف في `Bolumler`. السلايد بيعتبر الخطوة كافية للنموذج المعروض؛ إذا كانت الكليات كيانًا مستقلاً ولها هوية وعلاقات خاصة، ممكن تصميم منفصل للكلية. هذا توضيح إضافي، مو خطوة جديدة منصوص عليها بالمحاضرة.

| المرحلة | شو بنمنع؟ | مثال |
| --- | --- | --- |
| **1NF** | خلايا فيها قوائم أو قيم غير ذرية | فصل الاسم/القيم |
| **2NF** | الاعتماد على جزء من المفتاح المركّب | فصل الطالب والمقرر عن التسجيل |
| **3NF** | الاعتماد الانتقالي بين صفات غير مفتاحية | فصل بيانات القسم عن الطالب |

## Denormalization (denormalizasyon): إمتى منسمح بالتكرار؟

كل ما فصلنا البيانات لجداول أكثر، ممكن استعلام قراءة واحد يحتاج **JOIN (birleştirme)** بين جداول متعددة. في أنظمة القراءة الكثيفة، زيادة الـJOINs قد ترفع كلفة الاستعلام (السلايدات 22–24).

الـ**Denormalization (denormalizasyon)** هي السماح **المقصود والمضبوط** بتكرار بيانات لتحسين **Read Performance (okuma performansı)**، مقابل تعقيد الكتابة واحتمال تراجع الاتساق.

**مثال «Siparişlerim» من السلايد 24:** بتصميم Normalized منحتاج JOIN بين `SiparisDetay` و`Urunler` حتى نعرض اسم المنتج. بالتصميم Denormalized مننسخ اسم المنتج إلى `SiparisDetay` وقت إنشاء الطلب، وبنخفف الحاجة للـJOIN عند عرض الطلبات.

**Trade-off (ödünleşim):** قراءات أسرع مقابل بيانات مكررة لازم نقرر كيف نحافظ على اتساقها وتكلفة إضافية عند الكتابة. مو كل JOIN بطيء ولا كل تكرار بيعطي تحسينًا؛ المحاضرة بتعرضه كخيار أداء، مش بديل افتراضي عن التصميم السليم.

## مثال كامل: Student–Advisor–Project (öğrenci–danışman–proje)

السلايدات 26–29 بتبدأ بجدول فيه `OgrNo` و`Danismanlar` (أكثر من مستشار بفاصلة)، و`Projeler` (عدة مشاريع)، و`DanismanOfis`. مثلًا الطالب 101 مرتبط بـA. Yilmaz وB. Kaya وبـProje A وProje B.

1. **0NF → 1NF:** نفصل القوائم إلى صفوف، وبحسب افتراضات المثال نكوّن كل تركيبة، وبصير المفتاح `{OgrNo, Danisman, Proje}`. للطالب 101 أربعة صفوف من مستشارَين × مشروعين. مكتب B. Kaya بالبيانات `NULL`.
2. **1NF → 2NF:** `DanismanOfis` بيعتمد على `Danisman` لحاله، مش كامل المفتاح المركّب، فبنحطه بجدول `Danisman(Danisman, DanismanOfis)`، ونترك `OgrenciDanismanProje(OgrNo, Danisman, Proje)`.
3. **2NF → 3NF:** المحاضرة ما بتلاقي اعتمادًا انتقاليًا ظاهرًا بالتصميم الناتج، وبتعتبر الجداول ملائمة لـ3NF و**BCNF (Boyce–Codd normal form)** تحت الافتراضات الحالية.

**ملاحظة من السلايد 29:** إذا افترضنا «كل طالب إله مستشار واحد» بتظهر العلاقة `OgrNo → Danisman`، و`OgrNo` مو **Super Key (süper anahtar)** بجدول التراكيب؛ عندها بتظهر مخالفة لـBCNF. النتيجة إذن بتعتمد على **Business Rules (iş kuralları)**، مو شكل الأعمدة بس.

## مثال إضافي من السلايدات: من 0NF لـ4NF (مو من الكتاب)

السلايدات 31–40 بتقدّم مثال **HocaKayit**. الأستاذ عنده رقم واسم وقسم، وبيدرّس عدة مقررات وبيحكي عدة لغات. الفرضية الأساسية: **لغات الأستاذ مستقلة عن المقررات اللي بيدرّسها**.

### 0NF → 1NF: تفكيك القوائم

في البداية `Dersler` و`Diller` قوائم ضمن الخلية، والمقرر نفسه مكتوب `CS101 Prog. Giriş` كقيمة مركّبة. السلايد بيفصل رمز المقرر عن اسمه وبفتح القوائم لصفوف. إذا الأستاذ 101 بيدرّس مقررين وبيحكي لغتين، بيطلع عنده **2 × 2 = 4 صفوف**. المفتاح `{HocaNo,DersKodu,Dil}`. عدد الصفوف بكل المثال بيصير 9 بدل 3 (السلايد 33).

### 1NF → 2NF: إزالة Partial Dependencies

- `HocaNo → HocaAd, BolumKod, BolumAd`.
- `DersKodu → DersAdi`.

منفصل `Hoca(HocaNo,HocaAd,BolumKod,BolumAd)` و`Ders(DersKodu,DersAdi)`، وبنخلي `HocaDersDil(HocaNo,DersKodu,Dil)` لسه فيها التراكيب (السلايد 35).

### 2NF → 3NF وBCNF

بجدول الأستاذ: `HocaNo → BolumKod → BolumAd`. منفصل `Bolum(BolumKod,BolumAd)` ومنخلي `BolumKod FK` بجدول `Hoca`. حسب افتراضات المثال، الجداول هلق بتلبي BCNF (السلايد 36).

### ليش BCNF مو كافية هون؟ Multivalued Dependency (çok değerli bağımlılık)

المشكلة مش اعتماد عادي بين عمودين، بل وجود *مجموعتين مستقلّتين* بنفس الجدول:

- `HocaNo ↠ DersKodu`: مجموعة مقررات الأستاذ مستقلة عن لغاته.
- `HocaNo ↠ Dil`: مجموعة لغاته مستقلة عن مقرراته.

هذا اسمه **Multivalued Dependency (çok değerli bağımlılık / MVD)**. فرق السهمين مهم: `X → Y` بيحدد قيمة واحدة، و`X ↠ Y` بيحدد مجموعة قيم مستقلة عن باقي الصفات (السلايد 38).

**4NF — Fourth Normal Form (dördüncü normal form)** حسب السلايد: يكون الجدول BCNF، ولكل MVD غير تافهة `X ↠ Y` لازم `X` يكون Super Key. `HocaNo` لحاله مو Super Key بجدول `HocaDersDil`، إذن في مخالفة.

**الحل (السلايد 39):** نفصل إلى جدولين:

- `HocaDers(HocaNo, DersKodu)`: خمسة صفوف.
- `HocaDil(HocaNo, Dil)`: خمسة صفوف.

هاي الخطوة بتمنع إن إضافة لغة جديدة تتطلب صفًا لكل مقرر، أو إن حذف آخر مقرر يمحي معلومات لغة الأستاذ. الـ**Lossless Decomposition (kayıpsız ayrıştırma)** بالمثال بتسمح بإعادة تكوين الصفوف التسعة الأصلية بواسطة JOIN على `HocaNo`، بشرط استقلال المجموعتين كما افترضته المحاضرة.

**النتيجة النهائية للمثال الإضافي، السلايد 40:** خمسة جداول: `Bolum`، `Hoca`، `Ders`، `HocaDers`، `HocaDil`.

## نراجع فهمنا

جاوب قبل ما تشوف الحلول: شو الفرق بين **Partial Dependency (kısmi bağımlılık)** و**Transitive Dependency (geçişli bağımlılık)**؟ كيف ممكن جدول يكون BCNF ومع هيك يحتاج 4NF؟ وليش Denormalization (denormalizasyon) قرار **Trade-off (ödünleşim)** مش تصليح تلقائي لكل استعلام؟

**المصدر:** ملف Hafta 3، الصفحات الفيزيائية 6–44. مثال الأستاذ 0NF–4NF معلّم في السلايدات صراحةً باعتباره إضافة خارج الكتاب.
