## مقدمة: من التصميم إلى SQL

بالأسابيع السابقة درسنا **Relational Model (ilişkisel model)** والـ**ER Diagram (varlık-ilişki diyagramı)** والـ**Normalization (normalizasyon)**. هلق بنحوّل التصميم لأوامر **SQL — Structured Query Language (yapılandırılmış sorgu dili)**. الـSQL لغة **Declarative (bildirimsel)**: منقول *شو* النتيجة اللي بدنا ياها، والـ**DBMS/VTYS (veritabanı yönetim sistemi)** بيختار خطة التنفيذ (السلايد 6). الأمثلة الأساسية بالمحاضرة من الكتاب، وبعضها مكتوب بـSQL Server/T-SQL؛ الصناديق الزرقا بتوضح الاختلاف مع PostgreSQL 16.

## 1. Relational Algebra (ilişkisel cebir) — السلايدات 7–12

النموذج الرياضي لـCodd بيعامل العلاقات كمجموعات؛ نتيجة العملية كمان علاقة. بالشرح في جدول `Ogrenciler(OgrNo,Ad,Soyad,BolumID)` فيه Ali وZeynep بالقسم 10، Can بالقسم 11، وElif بقسم NULL، ومعه جدول `Bolumler`.

| العملية | الرمز | SQL | الفكرة |
| --- | --- | --- | --- |
| **Selection (seçme)** | σ | `WHERE` | فلترة الصفوف |
| **Projection (izdüşüm)** | π | `SELECT` أعمدة | اختيار أعمدة |
| **Cartesian Product (kartezyen çarpım)** | × | `CROSS JOIN` | كل صف بالأول مع كل صف بالثاني؛ 2×3 = 6 |
| **Join (birleştirme)** | ⋈ | `JOIN` | وصل الصفوف حسب شرط مطابقة |

مثال اختيار طلاب القسم 10: `σ(BolumID=10)(Ogrenciler)`؛ وبعدها اختيار أسمائهم: `π(Ad,Soyad)(σ(BolumID=10)(Ogrenciler))`. **العمليات بتتراكب**: نتيجة الأولى بتدخل بالتانية. بالـNatural Join المعروض (سلايد 10)، Elif مو ضمن النتائج لأن `BolumID` عندها NULL.

**توضيح إضافي مهم:** الـProjection الرياضي بيزيل التكرارات، بينما SQL `SELECT` العادي ممكن يرجّع تكرارات؛ منستخدم `DISTINCT` إذا بدنا إزالتها.

## 2. SQL sublanguages (SQL alt dilleri) — السلايد 14

| التصنيف | الغرض | الأوامر |
| --- | --- | --- |
| **DDL — Data Definition Language (veri tanımlama dili)** | تعريف الـSchema | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| **DML — Data Manipulation Language (veri işleme dili)** | تعديل بيانات الصفوف | `INSERT`, `UPDATE`, `DELETE` |
| **DQL — Data Query Language (veri sorgulama dili)** | الاستعلام | `SELECT` |
| **TCL — Transaction Control Language (işlem kontrol dili)** | التحكم بالـTransaction | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

الـ**Transaction (işlem)** مجموعة عمليات منطقية. **COMMIT** بتثبّت التغييرات، و**ROLLBACK** بترجع تغييرات العملية غير المثبّتة ضمن حدود المعاملة. التفاصيل الموسّعة للـTransactions والـACID بالأسبوع التالي.

## 3. DDL: إنشاء وتغيير الجداول — السلايدات 16–23

الـ`CREATE TABLE` بيحدد الأعمدة، **Data Types (veri türleri)**، و**Constraints (kısıtlar)**.

```sql
CREATE TABLE Bolumler (
    BolumID INT PRIMARY KEY,
    BolumAdi VARCHAR(100) NOT NULL,
    FakulteAdi VARCHAR(100)
);

CREATE TABLE Ogrenciler (
    OgrNo INT PRIMARY KEY,
    Ad VARCHAR(50) NOT NULL,
    Soyad VARCHAR(50) NOT NULL,
    KayitTarihi DATE DEFAULT CURRENT_DATE,
    BolumID INT,
    FOREIGN KEY (BolumID) REFERENCES Bolumler(BolumID)
);
```

**Primary Key (birincil anahtar)** بيحدّد الصف بدون تكرار أو NULL. **Foreign Key (yabancı anahtar)** بيضمن إن `Ogrenciler.BolumID` يشير لقسم موجود. مثل قاعدة تحويل 1:N بالأسبوع الثاني، المفتاح الأجنبي موجود بجهة N (الطلاب). إذا `BolumID` مو `NOT NULL`، الطالب ممكن يكون بدون قسم مثل Elif. لازم إنشاء `Bolumler` قبل جدول بيرجع إله.

**فروقات المحاضرة:** PostgreSQL بيحوّل أسماء الجداول والأعمدة غير المحاطة بعلامات اقتباس لحروف صغيرة؛ و`CURRENT_DATE` مو صيغة SQL Server 2022 أو أقدم، والسلايد بيستخدم `CAST(GETDATE() AS DATE)` بدالها.

`ALTER TABLE` بيعدل الـSchema:
```sql
ALTER TABLE Ogrenciler ADD COLUMN Email VARCHAR(100);
ALTER TABLE Ogrenciler
ADD CONSTRAINT uq_Ogrenciler_Email UNIQUE (Email);
ALTER TABLE Ogrenciler ALTER COLUMN Ad TYPE VARCHAR(75);
ALTER TABLE Ogrenciler DROP COLUMN KayitTarihi;
```

الصيغة فوق لـPostgreSQL. SQL Server بيكتب `ADD Email ...` بدون `COLUMN`، وبكتب `ALTER COLUMN Ad VARCHAR(75) NOT NULL` بدل `TYPE`. **ملاحظة من السلايد 20:** PostgreSQL يسمح عادةً بأكثر من NULL تحت `UNIQUE` التقليدي؛ SQL Server بيعامل هالحالة بشكل مختلف وقد يمنع إضافة القيد إذا في صفّين Email عندهم NULL.

### DELETE vs TRUNCATE vs DROP

- `DELETE FROM Ogrenciler WHERE ...`: بيحذف صفوف محددة؛ بدون `WHERE` بيحذف كل الصفوف. DML وبيفعّل Delete Triggers بحسب النوع.
- `TRUNCATE TABLE Ogrenciler`: بيفرغ بيانات الجدول كله، عادةً بكلفة أقل، وما بيوفر `WHERE`، وبحافظ على هيكله.
- `DROP TABLE Bolumler`: بيحذف بنية الجدول ومحتواه، وقد تمنعه تبعيات Foreign Keys.

**تنبيه مهم:** السلايد 23 بيحكي إن `TRUNCATE` «عادة ما بيرجع»، لكنه بنفس الصفحة بيوضّح إن **PostgreSQL بيسمح ROLLBACK لـTRUNCATE داخل Transaction**:
```sql
BEGIN;
TRUNCATE TABLE Ogrenciler;
ROLLBACK;
```
القدرة على التراجع مرتبطة بالمحرك وبحدود الـTransaction؛ فلا تعتبر كل عمليات DROP/TRUNCATE غير قابلة للرجوع مطلقًا.

## 4. DML: إدخال وتحديث وحذف — السلايدات 25–27

```sql
INSERT INTO Bolumler (BolumID, BolumAdi, FakulteAdi)
VALUES (10, 'Bilgisayar Mühendisliği', 'Mühendislik Fakültesi');

INSERT INTO Ogrenciler (OgrNo, Ad, Soyad, BolumID)
VALUES (101, 'Ali', 'Yılmaz', 10),
       (102, 'Zeynep', 'Kaya', 10),
       (103, 'Can', 'Demir', 11);
```

**فخ المحاضرة:** إذا القسم 11 مش موجود، هالـMulti-row INSERT بيفشل بالكامل بسبب الـFK، و101 و102 كمان ما بينضافوا (سلايد 25). لازم نضيف القسم 11 ونعيد المحاولة.

```sql
UPDATE Ogrenciler
SET Soyad = 'Kaya Yılmaz', BolumID = 11
WHERE OgrNo = 102;

DELETE FROM Ogrenciler
WHERE OgrNo = 101;
```

**قاعدة أساسية بالامتحان:** `UPDATE` أو `DELETE` بدون `WHERE` بيأثر على *كل الصفوف*. لا تشغّل أمثلة الحذف على قاعدة بيانات مهمة.

## 5. DQL: SELECT والفلترة والتجميع — السلايدات 29–36

```sql
SELECT Ad, Soyad FROM Ogrenciler;
SELECT * FROM Ogrenciler WHERE BolumID = 10 AND Ad = 'Ali';
SELECT * FROM Ogrenciler WHERE OgrNo IN (101, 104);
SELECT * FROM Ogrenciler WHERE OgrNo BETWEEN 100 AND 102;
SELECT * FROM Ogrenciler WHERE Soyad LIKE '%Yilmaz';
SELECT * FROM Ogrenciler WHERE BolumID IS NULL;
SELECT OgrNo, Ad, Soyad FROM Ogrenciler ORDER BY Soyad ASC;
```

- `SELECT` بيختار الأعمدة، و`FROM` المصدر، و`WHERE` بيفلتر الصفوف.
- `AND/OR/NOT` للشروط؛ `IN` للانتماء لقائمة؛ `BETWEEN` **شامل للطرفين**.
- بـ`LIKE`: الرمز `%` يعني صفر أو أكثر من الأحرف، و`_` حرف واحد.
- `NULL` ما منفحصه بـ`= NULL`، بل `IS NULL` أو `IS NOT NULL`.
- `ORDER BY ... ASC/DESC` للترتيب؛ بدون `ORDER BY` ترتيب النتائج غير مضمون.
- بالـPostgreSQL `LIKE` حساس لحالة الأحرف، و`ILIKE` للبحث غير الحساس.

**Aggregate Functions (toplama/özetleme fonksiyonları)**: `COUNT(*)` بيعد كل الصفوف؛ `COUNT(column)` القيم غير NULL؛ و`SUM`, `AVG`, `MIN`, `MAX` للحسابات. `AS` Alias (takma ad) لاسم ناتج.

```sql
SELECT BolumID, COUNT(*) AS OgrenciSayisi
FROM Ogrenciler
WHERE BolumID IS NOT NULL
GROUP BY BolumID
HAVING COUNT(*) > 1;
```

**WHERE vs HAVING:** الأولى بتفلتر صفوف **قبل** `GROUP BY`، والثانية بتفلتر **المجموعات بعد التجميع**. بالشرط `COUNT(*) > 1` منحتاج `HAVING` (سلايد 35–36).

## 6. JOIN: وصل الجداول — السلايدات 38–41

الجدول المثال فيه أربعة طلاب (Elif بدون قسم) وثلاثة أقسام (القسم 12 «İnşaat Müh.» بدون طلاب). هالصفّين بيعطونا الاختبار الأوضح:

| النوع | مين بيظهر؟ |
| --- | --- |
| **INNER JOIN (iç birleştirme)** | المطابقين فقط: Ali، Zeynep، Can؛ لا Elif ولا القسم 12 |
| **LEFT JOIN (sol birleştirme)** | كل `Ogrenciler`؛ Elif موجودة، وبيكون اسم قسمها NULL |
| **RIGHT JOIN (sağ birleştirme)** | كل `Bolumler`؛ القسم 12 موجود وبيكون اسم الطالب NULL |

```sql
SELECT O.Ad, O.Soyad, B.BolumAdi
FROM Ogrenciler AS O
LEFT JOIN Bolumler AS B ON O.BolumID = B.BolumID;
```

`ON` شرط الربط، و`O` و`B` اختصارات للأسماء. المحاضرة بتعرض أنواع INNER/LEFT/RIGHT بالتفصيل، وبتشير لـFULL بشكل رسومي بصفحة 38؛ الـ**FULL OUTER JOIN (tam dış birleştirme)** بيحافظ على غير المطابقين من الطرفين، وهذا توضيح للرسم.

## 7. Subqueries (alt sorgular) وCTE — السلايدات 43–46

**Scalar Subquery (tek değer döndüren alt sorgu)** بيرجع قيمة واحدة: جيب طلاب نفس قسم Ali.

```sql
SELECT Ad, Soyad, BolumID
FROM Ogrenciler
WHERE BolumID = (
  SELECT BolumID FROM Ogrenciler
  WHERE Ad = 'Ali' AND Soyad = 'Yilmaz'
);
```

**List subquery (liste döndüren alt sorgu)** بترجع عدة قيم مع `IN`:

```sql
SELECT Ad, Soyad FROM Ogrenciler
WHERE BolumID IN (
  SELECT BolumID FROM Bolumler
  WHERE FakulteAdi = 'Mühendislik Fakültesi'
);
```

**CTE — Common Table Expression (ortak tablo ifadesi)** نتيجة مؤقتة مسماة للاستعلام الحالي عبر `WITH`، بتسهّل قراءة خطوات معقدة:

```sql
WITH MuhendislikBolumleri AS (
  SELECT BolumID FROM Bolumler
  WHERE FakulteAdi = 'Mühendislik Fakültesi'
)
SELECT O.Ad, O.Soyad
FROM Ogrenciler AS O
JOIN MuhendislikBolumleri AS MB ON O.BolumID = MB.BolumID;
```

الـCTE هون بتعطي نفس منطق الـSubquery، بس مفصولة لخطوتين. **SQL Server:** إذا في أمر سابق بنفس الدفعة، لازم ينتهي بـ`;` قبل `WITH` (وأحيانًا بيكتبوا `;WITH`). السلايد بيحذر من رموز كسر الأسطر المنسوخة من PDF مثل `,→` لأنها مو SQL.

## 8. VIEW وStored Procedure وTrigger — السلايدات 48–65

### VIEW (görünüm): استعلام محفوظ

```sql
CREATE VIEW Vw_OgrenciBolumBilgileri AS
SELECT O.OgrNo, O.Ad, O.Soyad, B.BolumAdi, B.FakulteAdi
FROM Ogrenciler AS O
LEFT JOIN Bolumler AS B ON O.BolumID = B.BolumID;

SELECT * FROM Vw_OgrenciBolumBilgileri;
```

الـ**View (görünüm)** العادية ما بتخزّن نسخة من الصفوف؛ بتخزّن تعريف `SELECT` وبتعرض البيانات الحالية. بتبسّط JOINs متكررة، وممكن نمنح صلاحيات على View بدل جداول المصدر لنعرض أعمدة محدودة. **توضيح إضافي:** هذا الوصف للـView العادية، مو Materialized View (somutlaştırılmış görünüm).

### Stored Procedure (saklı yordam)

مجموعة أوامر محفوظة على السيرفر، ممكن تاخد **IN (giriş)** و**OUT (çıkış)** و**INOUT (giriş/çıkış)** parameters. مثال المحاضرة `sp_BolumeGoreOgrenciSay` بياخد كود قسم، بيحسب `COUNT(*)`، وبيطلع عدد الطلاب ورسالة.

- **T-SQL / SQL Server:** `CREATE PROCEDURE`، و`@param`، و`EXEC`، و`OUTPUT`، و`GO` لفصل دفعات التنفيذ.
- **PostgreSQL 16:** `CREATE PROCEDURE ... LANGUAGE plpgsql` واستدعاء `CALL`؛ ولإرجاع مجموعة صفوف بتستخدم المحاضرة `CREATE FUNCTION ... RETURNS TABLE` مع `SELECT * FROM f(...)`. المعاملات بدون `@`، والأنماط `IN/OUT/INOUT`.

مثال المقارنة الموثّق: `ISNULL(a,b)` في SQL Server يقابله `COALESCE(a,b)` في PostgreSQL، ودمج النصوص `+` يقابله `||`، و`RAISERROR` يقابله `RAISE EXCEPTION`.

### Trigger (tetikleyici): شغل تلقائي عند حدث

الـTrigger مرتبط بحدث `INSERT` أو `UPDATE` أو `DELETE`. في **SQL Server** المحاضرة بتفرّق بين:
- `AFTER`: بعد تنفيذ DML؛ مثل حفظ Audit Log (denetim kaydı).
- `INSTEAD OF`: بدل العملية الأصلية؛ مثال منع حذف قسم فيه طلاب.
- **Statement-level (işlem bazlı)**: لو `UPDATE` عدّل 100 صف، التريغر بينفّذ مرة واحدة، والصفوف كلها بتتوفر ضمن جدولين افتراضيين `inserted` و`deleted`.

| الحدث | inserted | deleted |
| --- | --- | --- |
| INSERT | الجديد | — |
| UPDATE | القيم الجديدة | القيم القديمة |
| DELETE | — | المحذوف |

**مثال سجل تغيير القسم (ص 55–61):** `trg_OgrenciBolumLogla` بيقارن قيم `bolkod` القديمة والجديدة عند تعديل طالب، وبضيف سجل إلى `OgrenciBolumLog` فقط إذا تغيّر الرقم فعلاً. `IF UPDATE(bolkod)` بيتأكد إن العمود موجود بعبارة `SET`، بينما المقارنة الفعلية بتتم بالـ`WHERE`. `SET NOCOUNT ON` بيمنع رسائل الصفوف المتأثرة الإضافية، وما بيغيّر البيانات. لو 3 طلاب تأثروا والتغيير الحقيقي عند اثنين فقط، التريغر واحد وبيكتب سجلين.

**تنبيه للمثال:** استبدال NULL بالقيمة `-1` في مقارنة `ISNULL` هو افتراض خاص بالكود، ومو طريقة عامة آمنة إذا `-1` ممكن تكون قيمة حقيقية. PostgreSQL بيستخدم `OLD.bolkod IS DISTINCT FROM NEW.bolkod` للمقارنة الشاملة لـNULL (السلايد 61).

**PostgreSQL:** منعرّف `RETURNS trigger` Function ثم `CREATE TRIGGER ... EXECUTE FUNCTION`. ممكن `FOR EACH ROW` مع `NEW/OLD` أو `FOR EACH STATEMENT`. بدل `INSTEAD OF DELETE` على جدول، منستخدم `BEFORE DELETE ... FOR EACH ROW` ونرمي `RAISE EXCEPTION` إذا القسم فيه طلاب، وإلا `RETURN OLD` (ص 62–63). **INSTEAD OF** بPostgreSQL مخصص للـViews.

### Triggers أم Events؟

المحاضرة (ص 64–65) بتقارن منطق داخل قاعدة البيانات مع **Event Streaming (olay akışları)** وRabbitMQ/Kafka وCDC. الـTrigger بيشتغل **Synchronously (eşzamanlı)** ضمن تنفيذ المعاملة، والـEvent Consumers ممكن يشتغلوا **Asynchronously (eşzamansız)**. الـTrigger بيشوف التغييرات القادمة من أي عميل بيعدّل الجدول، بينما إرسال Event من الـApplication ما بيشوف تغييرات منفذة خارج مسار التطبيق إلا إذا أضفنا آلية مثل **CDC — Change Data Capture (değişiklik verisi yakalama)**. **RabbitMQ مو Trigger**، بل ناقل رسائل بين الناشر والمستهلكين.

## 9. SQL Server lab (uygulama föyü) — السلايدات 67–81

هذا القسم بيستخدم قاعدة طلاب ومقررات فيها `bolum`، `ogrenci`، `notlar`، `dersler`، `hocalar`. علاقة `notlar` بتربط الطالب بالمقرر وتحفظ `vize` و`mazeret` و`final` و`but`. هون **T-SQL** الأصل، والسلايد بيضيف ترجمة PostgreSQL 16.

### CTE: ثلاثة تطبيقات

1. **Bölümlere Göre Ortalama Vize (ص 68):** `notlar JOIN ogrenci`، اختيار `ISNULL(n.mazeret,n.vize)` كدرجة منتصف الفصل الفعلية، ثم `AVG(CAST(... AS decimal(5,2)))` وتجميع بحسب القسم؛ ربط النتيجة بـ`bolum` للحصول على اسم القسم وترتيب تنازلي.
2. **Öğrenci–Danışman (ص 69):** `ogrenci JOIN hocalar` ثم CTE لإظهار الطالب ومستشاره؛ **INNER JOIN** بيستبعد الطلاب بلا مستشار.
3. **Hoca Ders Yükü (ص 70):** `SUM(ISNULL(teori,0)+ISNULL(pratik,0))` من `dersler` بحسب `hocasi`، ثم مقارنة الساعات المحسوبة مع `hocalar.top_ders_saati` اللي المثال بيفترض إنها قديمة.

### Views: ثلاثة تطبيقات

- `vw_OgrenciDetay` (ص 71): اسم الطالب وقسمه ومستشاره؛ `LEFT JOIN` حتى ما نخسر الطالب بدون قسم أو مستشار، وإخفاء حقل حساس مثل `dogum_tarihi` من العرض.
- `vw_DersHocaBilgisi` (ص 72): اسم المقرر والأستاذ، و`teori + pratik` لحساب الساعات؛ بPostgreSQL جمع النصوص `||` وليس `+`.
- `vw_OgrenciBasariNotlari` (ص 73): **قاعدة الدرجات المذكورة في المحاضرة**: إن وجدت `mazeret` تحل محل `vize`، وإن وجدت `but` تحل محل `final`؛ ثم **النجاح = 0.4 × الدرجة الأولى + 0.6 × الدرجة الثانية**، مع تحويل الناتج إلى `decimal(5,2)`.

### Stored Procedures: ثلاثة تطبيقات

- `sp_BolumdekiOgrencileriGetir` (ص 74): يعرض طلاب قسم حسب معامل `bolkod` ويرتبهم حسب `sinif DESC, soyadi`.
- `sp_OgrenciEkle` (ص 75): إدخال طالب كامل ومعالجة أخطاء PK/FK بـ`TRY...CATCH` في SQL Server؛ في PostgreSQL `EXCEPTION WHEN OTHERS THEN`.
- `sp_NotGuncelle` (ص 76–77): يتحقق إن العلامة بين **0 و100**، بعدها يحدث واحدًا من `vize/final/but/mazeret` حسب `NotTipi`. في PL/pgSQL `ELSIF` و`RAISE EXCEPTION` و`CALL` بدل بعض صيغ T-SQL.

### Triggers: ثلاثة تطبيقات

- `trg_OgrenciSilmeLog` (ص 78): عند حذف طالب يسجّل الرقم والاسم والوقت والمستخدم.
- `trg_HocaDersYukuGuncelle` (ص 79): بعد إدخال أو تعديل مقرر يعيد حساب ساعات التدريس للأستاذ المرتبط.
- `trg_BolumSilmeEngelle` (ص 80): يمنع حذف قسم إذا ما زال فيه طلاب، وإلا يسمح بالحذف؛ هو نفس مفهوم مثال `INSTEAD OF DELETE` السابق بصياغة مختلفة.

### أهم تحويلات T-SQL → PostgreSQL 16

| SQL Server | PostgreSQL |
| --- | --- |
| `ISNULL(a,b)` | `COALESCE(a,b)` |
| `'a' + 'b'` | `'a' || 'b'` |
| `tinyint`, `nvarchar`, `datetime` | `smallint`, `varchar`, `timestamp` |
| `IDENTITY(1,1)` | `GENERATED ALWAYS AS IDENTITY` |
| `GETDATE()`, `SYSTEM_USER` | `now()`, `current_user` |
| `@parameter`, `OUTPUT` | parameter names, `OUT/INOUT` |
| `EXEC`, `GO` | `CALL` أو `SELECT * FROM f()`؛ ما في `GO` |
| `TRY...CATCH` / `RAISERROR` | `EXCEPTION WHEN` / `RAISE EXCEPTION` |
| `inserted/deleted` | `NEW/OLD` بRow-level Trigger |
| `INSTEAD OF DELETE` على Table | `BEFORE DELETE ... FOR EACH ROW` |

## نقاط امتحانية

السلايد 83 بيطلب شرح: ليش SQL لغة Declarative؟ شو مقابلات σ وπ و× و⋈؟ شو الفرق بين DELETE/TRUNCATE/DROP؟ ليش FK تمنع إضافة طالب بقسم مش موجود؟ شو فرق WHERE/HAVING؟ بأي JOIN بتظهر Elif؟ شو وظيفة CTE مقارنة بالـSubquery؟ وشو محتوى `inserted` و`deleted` أثناء UPDATE؟

**المصدر:** *SQL Temelleri ve İleri SQL*, Prof. Dr. Özal Yıldırım، الأسبوع الرابع، الصفحات الفيزيائية 6–85 من الـPDF. أمثلة الـSQL الأساسية بحسب المحاضرة؛ فروقات PostgreSQL موضّحة كما وردت بالصناديق المخصصة، والتوضيحات الخارجية معلّمة بشكل مستقل.
