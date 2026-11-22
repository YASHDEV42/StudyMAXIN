## الأسبوع السادس: Transaction Management (transaction yönetimi) وIndexing (indeksleme)

الأسبوع الخامس شرح **ACID (ACID özellikleri)** نظريًا؛ الأسبوع السادس بيورّينا كيف نحافظ على وحدة العملية عمليًا باستخدام **TCL — Transaction Control Language (işlem kontrol dili)**، وكيف نحسّن قراءة البيانات عن طريق **Indexes (indeksler)**. المحاضرة بتغطي قسمَي الكتاب 4.5 و4.6، وأمثلتها بتوضح SQL Server مع ملاحظات خاصة بـPostgreSQL 16 (صفحات PDF 2–4).

## 1. Transaction (işlem): وحدة عمل منطقية — ص 6

الـ**Transaction (işlem)** سلسلة أمر SQL واحد أو أكثر، غالبًا DML، بنتعامل معها كوحدة منطقية واحدة. مثلًا تحويل مبلغ بين حسابين بيحتاج خصم وإيداع؛ إذا نجح الخصم وفشل الإيداع، ما بدنا المال يختفي. الـRDBMS بيطبّق **ACID** على هالوحدة بدل ما يتعامل مع كل خطوة بمعزل عن الثانية.

### أوامر TCL الأربعة — ص 7–8

| الأمر                                      | المعنى                              | تأثيره                                          |
| ------------------------------------------ | ----------------------------------- | ----------------------------------------------- |
| `BEGIN TRANSACTION` أو `START TRANSACTION` | بداية معاملة صريحة (işlem başlatma) | بتجمع الأوامر اللاحقة ضمن نفس الوحدة            |
| `COMMIT`                                   | تثبيت (onaylama)                    | بيأكد التغييرات وبيجعل نتائجها ملتزَم بها        |
| `ROLLBACK`                                 | تراجع (geri alma)                   | بيلغي التغييرات غير المثبتة ضمن المعاملة        |
| `SAVEPOINT name`                           | نقطة حفظ (kayıt noktası)            | نقطة بنرجعلها بشكل جزئي بدل إلغاء المعاملة كلها |

**الرسم بصفحة 8** بيوضح التسلسل: BEGIN → DML 1 → SAVEPOINT → DML 2؛ إذا نجحت الخطوات منعمل COMMIT، وإذا فشلت ممكن ROLLBACK للكل أو رجوع لنقطة حفظ. **ملاحظة إضافية:** الرجوع لنقطة حفظ ما بيعني تثبيت التغييرات اللي قبلها؛ بتضل ضمن المعاملة المفتوحة حتى COMMIT.

## 2. تحويل 200 TL: مثال المحاضرة الأساسي — ص 9–12

**جدول Hesaplar قبل العملية:**

| HesapNo | MusteriAdi  | Bakiye  |
| ------- | ----------- | ------- |
| 1001    | Ali Yilmaz  | 1000.00 |
| 1002    | Zeynep Kaya | 500.00  |

بدنا ننقل **200 TL** من Ali إلى Zeynep. المثال البرمجي بالسلايد 10:

```sql
BEGIN TRANSACTION;

UPDATE Hesaplar
SET Bakiye = Bakiye - 200.00
WHERE HesapNo = 1001;

UPDATE Hesaplar
SET Bakiye = Bakiye + 200.00
WHERE HesapNo = 1002;

COMMIT;
```

النتيجة بعد النجاح: Ali = **800.00** وZeynep = **700.00**، والمجموع بيظل **1500.00**. هون **Atomicity (atomiklik)** معناها العمليتين بينجحوا مع بعض أو بيرجعوا مع بعض، و**Consistency (tutarlılık)** بتحافظ على القواعد مثل عدم ضياع رصيد ضمن التحويل الصحيح.

### لو فشل الإيداع؟

السلايد 11 بيفترض إن UPDATE الثاني فشل (مثلًا حساب المستفيد مُغلق). التطبيق بينفذ `ROLLBACK;` وبالتالي خصم Ali المؤقت بيرجع؛ رصيده **1000.00** مو 800.00.

**في PostgreSQL 16 (السلايد 12):** بتقدر تبدأ بـ`BEGIN TRANSACTION;` أو `START TRANSACTION;` أو `BEGIN;`. إذا صار **SQL error** داخل المعاملة، بتدخل حالة **aborted (iptal edilmiş işlem durumu)**، والأوامر اللاحقة بتنرفض حتى تنهي المعاملة بـ`ROLLBACK`. السلايد بيذكر إن `COMMIT` بمحاولة تثبيت معاملة بحالة فشل ما بيحفظ التغييرات؛ بتنتهي متراجعة.

```sql
BEGIN;
SAVEPOINT before_second_step;
-- التغييرات الإضافية
ROLLBACK TO SAVEPOINT before_second_step;
COMMIT;
```

**توضيح إضافي:** `SAVEPOINT` بيسمح باستعادة جزء من العمل عند الخطأ ضمن معاملة قابلة للاستمرار؛ أما بدون معالجة حالة الخطأ، فلازم تنهي المعاملة الفاشلة. وبمثال تحويل المال الحقيقي، لازم نتأكد إن الحساب موجود، والرصيد كافٍ، وإن **كلتا عمليتَي UPDATE** أثرتا على الصف الصحيح، قبل COMMIT؛ مجرد عدم ظهور SQL error ما بيضمن تحقيق قواعد العمل. هاد فحص إضافي من خارج السلايد.

## 3. Autocommit (otomatik onaylama) — ص 13

بالـ**Autocommit mode (otomatik onaylama modu)**، كل SQL statement مستقلة عادةً بتتثبت تلقائيًا. مناسب للأوامر المستقلة، لكن لو نفّذنا خصم البنك أولًا وانثبت، وبعدها فشل الإيداع، ما عاد في معاملة واحدة نعملها ROLLBACK. الحل فتح **Explicit Transaction (açık işlem)** باستخدام `BEGIN` والالتزام أو التراجع بالآخر.

السلايد بيذكر إن `psql` و`pgAdmin` بيشتغلوا عادةً مع Autocommit، وإن `BEGIN` بخلي المعاملة مفتوحة حتى `COMMIT` أو `ROLLBACK`.

## 4. Index (indeks): ليش البحث بيتسارع؟ — ص 15–18

السلايد بيشبّه **Full Table Scan (tam tablo taraması)** بإنك تفتّش على كلمة بكتاب عن طريق قراءة كل الصفحات. أما **Index Seek (indeks araması)** مثل الفهرس بنهاية الكتاب: بتعرف وين موجود المطلوب، فبتوصل إله بدون قراءة كل شيء.

**Index (indeks)** وفق تبسيط المحاضرة هو بنية بيانات بتربط قيم عمود أو أكثر بمواقع الصفوف. مثال السلايد 17، البحث عن `MusteriID = 54321` بيستفيد من فهرس مرتّب بدل فحص جدول كامل. المؤشرات الفيزيائية `adr-7` وغيرها بالرسم **تمثيلية** لتوضيح الفكرة وليست عناوين حقيقية.

**Trade-off (ödünleşim)** أساسي (ص 18): الفهارس بتحسّن كثير من استعلامات SELECT، لكنها بتستهلك مساحة وبتحتاج تحديث مع `INSERT` و`UPDATE` و`DELETE`؛ الإكثار منها ممكن يبطّئ الكتابة. **توضيح إضافي:** مو كل استعلام بيستخدم الفهرس، ومش كل Index بيعطي نفس الربح؛ الـOptimizer بيختار حسب الإحصائيات وكلفة الخطة.

## 5. أربع قواعد Indexing Strategy (indeksleme stratejisi) — ص 19–22

### Rule 1 — افهرس أعمدة WHERE وJOIN المتكررة

لو التطبيق دايمًا بيطلب طلبات زبون محدد:

```sql
CREATE INDEX IX_Siparisler_MusteriID
ON Siparisler (MusteriID);
```

الـ**Naming Convention (isimlendirme standardı)** بالمحاضرة: `IX_` + اسم الجدول + اسم العمود. الصيغة `CREATE INDEX` نفسها صالحة للمثال في PostgreSQL 16.

### Rule 2 — فرّق بين PK وFK

- **Primary Key (birincil anahtar)** بيُنشئ له النظام عادةً **Unique Index (benzersiz indeks)**؛ في PostgreSQL بينعمل Index تلقائيًا مع PK وUNIQUE.
- **Foreign Key (yabancı anahtar)** ما بينعمل له Index تلقائيًا بPostgreSQL. السلايد بينصح ننشئه يدويًا عند الحاجة، مثل `Ogrenciler.BolumID` اللي منستخدمه بالـJOIN مع `Bolumler`.

**توضيح إضافي:** مو كل FK لازم ينفهرس بشكل أعمى؛ عدد السجلات ونمط الاستعلام والتعديلات بيحددوا الفائدة، والقاعدة الرابعة بتحذر من الفهارس الزايدة.

### Rule 3 — Composite Index (bileşik indeks)

إذا الاستعلامات بتستخدم `Soyad` و`Ad` مع بعض:

```sql
CREATE INDEX IX_Ogrenciler_Soyad_Ad
ON Ogrenciler (Soyad, Ad);
```

**ترتيب الأعمدة مهم**: الفهرس `(Soyad, Ad)` مو مطابق في كل حالات الاستعلام للفهرس `(Ad, Soyad)`. السلايد بذكر إن الفهرس المركب ممكن يكون أفضل من فهرسين منفصلين لنمط البحث المذكور.

### Rule 4 — لا تفهرس كل شيء

كل Index بيضيف Storage (depolama alanı) وWrite Maintenance (yazma bakım maliyeti). اختر فهرس لما يكون في حاجة مثبتة ومقاسة، مش لمجرد وجود عمود.

## 6. Optimizer (iyileştirici) وExecution Plan (yürütme planı) — ص 23–24

الـ**Optimizer** اللي درسناه بالأسبوع الخامس بيشوف الفهارس والإحصائيات، وبقرر **Access Path (erişim yolu)** المناسب.

```sql
EXPLAIN
SELECT * FROM Siparisler WHERE MusteriID = 54321;
```

- `EXPLAIN` بيعرض خطة متوقعة **بدون تنفيذ الاستعلام الأساسي**.
- `EXPLAIN ANALYZE` بPostgreSQL **بينفّذ الاستعلام فعلًا** وبيطلع قياسات زمن وتشغيل حقيقية. **تنبيه إضافي:** إذا كان الاستعلام بيعدّل البيانات، لازم تنتبه لأن ANALYZE بيشغّله، مو مجرد محاكاة.

**الأسماء حسب المحرك:** SQL Server بيستخدم تسميات مثل `Table Scan` و`Index Seek`. PostgreSQL بتظهر فيه `Seq Scan` و`Index Scan` أو `Bitmap Index Scan`. مثال مخرجات السلايد 24:

```text
Seq Scan on siparisler (cost=... rows=...)
  Filter: (musteriid = 54321)

Index Scan using ix_siparisler_musteriid on siparisler (cost=... rows=...)
  Index Cond: (musteriid = 54321)
```

السلايد بيصرّح إن قيم `cost` وعدد الصفوف بتختلف حسب البيانات. وجود Index ما بيعني إن PostgreSQL رح يختار Index Scan دائمًا.

## 7. التطبيق العملي: Diagnose → Create Index → Verify — ص 25–26

المحاضرة بتفترض جدول `Siparisler` فيه ملايين الطلبات، والتطبيق بيستخدم الاستعلام:

```sql
SELECT SiparisID, SiparisTarihi, Tutar
FROM Siparisler
WHERE MusteriID = 54321;
```

1. **Diagnosis (teşhis):** شغّل Estimated Execution Plan في SSMS لتعرف إن كان في `Table Scan` أو `Clustered Index Scan` عالي الكلفة، وقد يعرض SSMS اقتراح `Missing Index`.
2. **Solution (çözüm):** `CREATE INDEX IX_Siparisler_MusteriID ON Siparisler(MusteriID);`.
3. **Verification (doğrulama):** اعرض الخطة من جديد وقارن. قد تتحول الخطة لـIndex Seek بكلفة أقل. المحاضرة تذكر إن التحسّن يمكن يكون كبيرًا، لكن **مو رقم مضمون**.

بـPostgreSQL/pgAdmin بتستخدم دورة `EXPLAIN → CREATE INDEX → EXPLAIN`، والواجهة بتعرض خطة رسومية. السلايد بيذكر إن pgAdmin ما عنده نفس ميزة اقتراح Missing Index المدمجة.

**توضيح إضافي:** لفحص Performance الواقعي لازم تقارن كذلك وقت التنفيذ والقراءات على نفس البيانات والظروف، مش تتعامل مع الـEstimated Cost وكأنه ميلي ثانية.

## خلاصة المحاضرة واسترجاع

- **Transaction** بتربط عدة DML ضمن وحدة ACID؛ `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` هي أدوات التحكم.
- **Autocommit** مناسب للأوامر المستقلة، لكنه خطر عند تقسيم عملية بنكية منطقية لخطوتين مستقلتين.
- **Index** بيسهّل البحث على حساب Storage وكلفة DML؛ الفهرسة المفرطة مو تحسين.
- **Execution Plan** وسيلة تشخيص؛ دورك تثبت التحسن قبل اعتماد الفهرس.
- السلايد 30 بيذكر إن الأسبوع التالي عن **NoSQL (NoSQL veritabanları)**، وأنماط Document/Key-Value/Column-Family/Graph، ومفاهيم CAP وBASE، وهي _خارج نطاق هذا الأسبوع_.

**أسئلة اختبار بدون حلول:** إذا فشل UPDATE الثاني بالتحويل، شو لازم يعمل التطبيق وشو رصيد Ali النهائي؟ ليش Composite Index `(Soyad,Ad)` ممكن يختلف عن `(Ad,Soyad)`؟ وشو الفرق بين `EXPLAIN` و`EXPLAIN ANALYZE`؟

**المصدر:** Prof. Dr. Özal Yıldırım، _Transaction Yönetimi ve İndeksleme_، Hafta 6، صفحات PDF الفيزيائية 6–30.
