## من النموذج العلائقي إلى تصميم الجداول

محاضرة الأسبوع الثاني بتفصّل **Relational Model (ilişkisel model)** و**ER Diagram (varlık-ilişki diyagramı)**، وبعدين بتربط التصميم بأنواع البيانات والمفاتيح والقيود. الفكرة: قبل SQL لازم نعرف شو البيانات، كيف مترابطة، وشو الشروط اللي بتحافظ على صحتها.

## 1. أساسيات Relational Model (ilişkisel model) — صفحات 6–11

قدّم **Edgar F. Codd** النموذج العلائقي سنة 1970 كبديل عن تعقيد **Hierarchical/Network Models (hiyerarşik/ağ modelleri)**. ميزاته الأساسية هي **Simplicity (sadelik)** بالجداول، **Consistency (tutarlılık)** المرتبطة بالأساس الرياضي، و**Flexibility (esneklik)** لأن الاستعلام ما بيتطلب مسار وصول ثابت.

### تشريح الجدول

- **Relation (ilişki)**: الجدول ككل، مثل `Öğrenciler`.
- **Attribute (nitelik)**: عمود بيمثّل صفة، مثل `Ad` أو `DogumTarihi`.
- **Tuple (teta/demet)**: صف واحد، أي سجل طالب واحد.
- **Domain (alan)**: مجموعة القيم المسموحة للعمود، بحسب النوع والقيود.

حتى يكون الجدول علاقة وفق النموذج النظري، المحاضرة بتذكر ثلاث خصائص (ص 9): **Unique tuples (satırların benzersizliği)**، يعني ما في صفّين متطابقين؛ **Order independence (sıranın önemsizliği)**، يعني ترتيب الصفوف والأعمدة الفيزيائي مو جزء من معنى العلاقة؛ و**Atomic values (atomik değerler)**، يعني كل خلية فيها قيمة واحدة غير قابلة للتقسيم ضمن التصميم. مثلًا تخزين رقمين هاتف بنفس الخلية `"555-1234, 555-5678"` بيخالف الذرّية بحسب المثال، وهاد بيرتبط لاحقًا بـ**1NF (birinci normal form)**.

### Primary Key وForeign Key

**Primary Key (birincil anahtar, PK)** عمود أو مجموعة أعمدة بتحدّد كل صف بشكل فريد. لازم تحقق **UNIQUE (benzersiz)** و**NOT NULL (boş olamaz)**. `OgrenciID` مثال، وممكن `TCKimlikNo` يكون مرشحًا بديلًا إذا كان فعلًا فريدًا.

**Foreign Key (yabancı anahtar, FK)** عمود بيربط سجل بصف بجدول مرجعي، وبيحافظ على **Referential Integrity (ilişkisel bütünlük)**. في مثال ص 11، `Notlar.OgrenciID` بيرجع لطالب موجود في `Ogrenciler`، فلازم ما نضيف علامة لطالب غير موجود. **توضيح إضافي:** إمكان قبول NULL للـFK بيتحدد بقيد العمود؛ وجود FK لحاله ما يعني إن العمود إجباري.

## 2. ER Diagrams (varlık-ilişki diyagramları) — صفحات 13–22

قبل إنشاء الجداول، منعمل **Conceptual Model (kavramsal model)** لتمثيل الواقع. **ER model** قدّمه Peter Chen سنة 1976، وبيصير لغة مشتركة بين المطورين ومدراء قواعد البيانات ومحللي الأعمال.

### رموز ER

| الرمز | المعنى | مثال |
| --- | --- | --- |
| مستطيل | **Entity (varlık)**: كيان مستقل | ÖĞRENCİ، DERS |
| مستطيل مزدوج | **Weak Entity (zayıf varlık)** | كيان بيعتمد بالتعريف على كيان آخر |
| بيضاوي | **Attribute (nitelik)** | Ad، Soyad |
| صفة تحتها خط | **Key Attribute (anahtar nitelik)** | Ogno |
| بيضاوي مزدوج | **Multivalued Attribute (çok değerli nitelik)** | Telefon |
| بيضاوي متقطع | **Derived Attribute (türetilmiş nitelik)** | Yaş مشتق من DogumTarihi |
| مُعيّن | **Relationship (ilişki)** | الطالب Alır المقرر |
| مُعيّن مزدوج | **Weak/Identifying Relationship (zayıf ilişki)** | علاقة تعريف كيان ضعيف |

الرسم بصفحة 16 بيعرض كمان **Composite Attribute (bileşik nitelik)** مثل `Adres` المتفرّع لـ`Mah` و`Sokak` و`Sehir` و`Ulke`.

### Cardinality (kardinalite)

**Cardinality (ilişki kardinalitesi)** بتجاوب: كم عنصر من الطرف الثاني ممكن يرتبط بعنصر واحد من الطرف الأول؟

- **1:1 (bire-bir)**: عميد واحد لكل كلية، وكل كلية إلها عميد واحد، حسب مثال المحاضرة.
- **1:N (bire-çok)**: مدرس واحد بيعطي عدة مقررات، وكل مقرر إله مدرس واحد ضمن المثال.
- **M:N (çoka-çok)**: الطالب بيسجّل بعدة مقررات، والمقرر فيه عدة طلاب.

**انتبه لطريقة قراءة الرسم (ص 19–21):** الرقم المكتوب قرب `Bölüm` بيخبرك كم قسم بترتبط فيه نسخة واحدة من `Öğrenci`، مو عدد أقسام `Bölüm` نفسها. ضمن الرسم: `Öğrenci (N) — Kayıt — Bölüm (1)` معناها *الطالب بقسم واحد، والقسم فيه عدة طلاب*. وبالتالي الـFK بينضاف لطرف **N** أي جدول الطلاب.

بالرسم الجامعي ص 20–21:
- `Öğrenci–Bölüm` عبر `Kayıt`: **N:1**.
- `Bölüm–Ders` عبر `İçerir`: **1:N**.
- `Öğrenci–Ders` عبر `Alır`: **M:N**.

**نقطة دقيقة من ص 22:** الـM:N عادةً بينحلّ بجدول ربط فيه `Ogno` و`DersID`. لكن إذا الطالب ممكن يعيد نفس المقرر بأكثر من سنة أو فصل، هالمفتاح المركّب لحاله ما بكفي، ولازم نوسّعه مثل `{Ogno,DersID,yıl,Donem}`. والسلايد بينبّه إن المثال التوضيحي الموسّع إضافة لتفسير الرسم، مو من نص الجدول الأصلي بالكتاب.

## 3. تحويل ER إلى Relational Schema (ilişkisel şema) — صفحات 23–28

هاي **القواعد الأربع** أساس مهم بالامتحان:

| القاعدة | التحويل | مثال المحاضرة |
| --- | --- | --- |
| **Rule 1 (kural 1)** | **Strong Entity (güçlü varlık)** ⟵ جدول، والصفات أعمدة، والصفة المفتاحية PK | `Ogrenci(OgrenciNo PK, Ad, Soyad)` |
| **Rule 2 (kural 2)** | بعلاقة **1:N** نحط PK تبع الطرف **1** كـFK بجدول الطرف **N** | `Ogrenci.BolumID FK → Bolum.BolumID PK` |
| **Rule 3 (kural 3)** | بعلاقة **M:N** ننشئ **Junction Table (ara tablo)** فيه مفتاحَي الطرفين، وغالبًا Composite PK | `OgrenciDersKayit(OgrenciNo, DersKodu, KayitTarihi)` |
| **Rule 4 (kural 4)** | **Multivalued Attribute (çok değerli nitelik)** بتصير جدول منفصل مع FK للكيان الأصلي | `OgrenciTelefon(OgrenciNo, TelefonNo)` |

في قاعدة 2 مثال ص 25: `BolumID=10` لطلاب Ali وZeynep، و`BolumID=11` لـCan، وElif إلها `NULL`. يعني مثال الجامعة بيسمح لطالب ما يكون مرتبط بقسم؛ لكن ما بيسمح بقيمة غير NULL تشير لقسم غير موجود.

بقاعدة 3 مثال ص 26، `OgrenciDersKayit` عنده **Composite Primary Key (bileşik birincil anahtar)** هو `{OgrenciNo,DersKodu}` طالما كل طالب بياخد كل مقرر مرة واحدة فقط ضمن هالنموذج المبسّط. بقاعدة 4 جدول الهواتف PK تبعه `{OgrenciNo,TelefonNo}` حتى الطالب يقدر يخزّن رقمين بصفّين منفصلين.

## 4. Data Types (veri türleri) — صفحات 30–33

اختيار نوع العمود بيتحكم بالقيم الممكنة وبطريقة تخزينها والعمليات المناسبة عليها.

| النوع | المعنى | استخدام |
| --- | --- | --- |
| `CHAR(n)` | نص ثابت الطول (sabit uzunluk) | رموز دول مثل TR |
| `VARCHAR(n)` | نص متغيّر الطول لحد أقصى n | أسماء وعناوين |
| `TEXT` | نص طويل | مقال أو وصف |
| `INTEGER` | عدد صحيح (tam sayı) | ID، كمية |
| `DECIMAL(p,s)` | عشري دقيق (kesin ondalık): `p` إجمالي الخانات و`s` خانات بعد الفاصلة | السعر والراتب |
| `FLOAT/DOUBLE` | عدد تقريبي (yaklaşık ondalık) | قياسات علمية |
| `DATE` | تاريخ فقط | تاريخ ميلاد |
| `TIMESTAMP/DATETIME` | تاريخ ووقت | وقت إنشاء أو تعديل |
| `BOOLEAN` | قيمة منطقية | فعّال/غير فعّال |
| `BLOB` | بيانات ثنائية | صورة |

**ليش DECIMAL للسعر بدل FLOAT؟** لأنه مبني على دقة عشرية محددة، بينما FLOAT تمثيله تقريبي وقد ينتج أخطاء تقريب. **توضيح إضافي:** التفاصيل الدقيقة لسلوك CHAR وVARCHAR والتخزين بتختلف بين محركات SQL؛ هون حافظنا على تبسيط السلايد.

## 5. Key Types (anahtar çeşitleri) — صفحات 34–35

- **Super Key (süper anahtar)**: أي مجموعة أعمدة قادرة تميّز الصف. `{OgrenciNo}` و`{OgrenciNo,Ad}` كل واحد منهم Super Key.
- **Candidate Key (aday anahtar)**: **Minimal Super Key (minimal süper anahtar)**، لو شلنا أي عمود منها بتفقد خاصية التمييز. لذلك `{OgrenciNo,Ad}` مو Candidate Key إذا `OgrenciNo` لحاله كافي.
- **Primary Key (birincil anahtar)**: مفتاح من الـCandidate Keys بنختاره معرّفًا أساسيًا.
- **Alternate Key (alternatif anahtar)**: Candidate Key ما اخترناه أساسيًا.
- **Composite Key (bileşik anahtar)**: مفتاح مكوّن من عمودين أو أكثر، مثل `{OgrenciNo,DersKodu}`.

## 6. Integrity Constraints (bütünlük kısıtları) — صفحات 36–37

| القيد | الوظيفة |
| --- | --- |
| `NOT NULL` | يمنع NULL |
| `UNIQUE` | يفرض عدم تكرار القيم وفق قواعد قاعدة البيانات |
| `PRIMARY KEY` | يضمن هوية فريدة وغير NULL |
| `FOREIGN KEY` | يحافظ على سلامة المرجع بين جدولين |
| `CHECK` | يفرض شرطًا مثل `fiyat > 0` |
| `DEFAULT` | يعطي قيمة افتراضية إذا ما تحددت قيمة |

الأنواع والمفاتيح والقيود هي **ثلاث طبقات حماية**: النوع يحدّد التنسيق، المفتاح يضبط التفرد والربط، والقيد يحدّد صلاحية القيم.

## مراجعة قبل الامتحان

أسئلة المحاضرة ص 39 بتطلب تشرح Relation وAttribute وTuple وDomain، تعدّد خصائص العلاقة الثلاث، تفسّر Referential Integrity، تقرأ رموز ER وCardinality، وتحدد ليش `{OgrenciNo,Ad}` Super Key مو Candidate Key، وليش `DECIMAL` أفضل من `FLOAT` للأسعار.

**أسئلة استرجاع بدون حلول:** إذا عندك طالب بأكثر من رقم هاتف، أي قاعدة تحويل بتستخدم؟ وإذا عندك علاقة Student–Course من نوع M:N، وين بتخزن تسجيل الطالب؟ وإذا الطالب أعاد المقرر بسنة ثانية، ليش ممكن تحتاج توسّع مفتاح جدول الربط؟
