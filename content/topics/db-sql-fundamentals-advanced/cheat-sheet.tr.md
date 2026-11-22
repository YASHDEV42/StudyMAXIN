## Hafta 4 — SQL Temelleri ve İleri SQL: Sınav Özeti

### İlişkisel cebir ve SQL

- **SQL:** Bildirimsel dil; **ne** istendiği belirtilir, **nasıl** çalıştırılacağına VTYS karar verir.
- **σ (seçme)** → `WHERE` (satır); **π (izdüşüm)** → `SELECT sütun` (sütun); **× (kartezyen çarpım)** → `CROSS JOIN` (m×n); **⋈ (birleştirme)** → `JOIN`.
- İlişkisel cebirde sonuç başka ilişkidir. Matematiksel izdüşüm tekrarı kaldırır; SQL'de gerekirse `DISTINCT`.

### Alt diller

| DDL                          | DML                    | DQL            | TCL                         |
| ---------------------------- | ---------------------- | -------------- | --------------------------- |
| `CREATE ALTER DROP TRUNCATE` | `INSERT UPDATE DELETE` | `SELECT`       | `COMMIT ROLLBACK SAVEPOINT` |
| Şema                         | Veri değişimi          | Veri sorgulama | Transaction kontrolü        |

### DDL / DML

- `CREATE TABLE`: Tablo, veri türü, PK/FK/NOT NULL/DEFAULT.
- `ALTER TABLE`: `ADD COLUMN`, `ADD CONSTRAINT`, `ALTER COLUMN ... TYPE` (PostgreSQL), `DROP COLUMN`.
- **1:N:** 1 tarafının PK'si, N tablosuna FK. FK'ye karşılık gelen değer başvurulan tabloda bulunmalıdır (NULL izni ayrıca kontrol edilir).
- **DELETE:** Satır siler; WHERE kullanılabilir; DML.
- **TRUNCATE:** Tüm satırlar, WHERE yok; tablo yapısı kalır. **PostgreSQL'de transaction içinde ROLLBACK mümkün**.
- **DROP TABLE:** Tablo ve yapısını siler; FK bağımlılıkları engel olabilir.
- **Önemli:** `UPDATE` ve `DELETE` komutunda WHERE unutulursa **tüm satırlar** etkilenir.
- **INSERT hata örneği:** BolumID 11 yoksa 101/102/103 çoklu INSERT'i FK ihlalinden dolayı **tümüyle** reddedilir.

### SELECT / WHERE / GROUP BY

- `SELECT` sütunları; `FROM` tabloyu; `WHERE` satırları; `ORDER BY` sıralamayı belirler.
- `IN (...)` liste; `BETWEEN a AND b` **sınırlar dahil**; `LIKE '%abc'`, `LIKE 'a_b'`; NULL için **`IS NULL`**, `= NULL` değil.
- `ASC` artan / `DESC` azalan; sıralama için ORDER BY gereklidir.
- **Aggregate:** `COUNT(*)` tüm satırlar, `COUNT(sütun)` NULL olmayanlar; `SUM AVG MIN MAX`; `AS` alias.
- **WHERE vs HAVING:** WHERE **gruplamadan önce satırları**, HAVING **gruplamadan sonra grupları** filtreler. `HAVING COUNT(*) > 1`.

```sql
SELECT BolumID, COUNT(*) AS OgrenciSayisi
FROM Ogrenciler
WHERE BolumID IS NOT NULL
GROUP BY BolumID
HAVING COUNT(*) > 1;
```

### JOIN sınav senaryosu (Ogrenciler / Bolumler)

- **INNER JOIN:** Sadece eşleşenler (Ali, Zeynep, Can).
- **LEFT JOIN:** Soldaki tüm öğrenciler; Elif (BolumID NULL) **dahil**, BolumAdi NULL.
- **RIGHT JOIN:** Sağdaki tüm bölümler; öğrencisi olmayan İnşaat Müh. **dahil**, öğrenci NULL.
- **FULL OUTER JOIN:** Her iki tablonun eşleşmeyenlerini de tutar (slayt 38 görseli).
- `ON` eşleşme koşuludur; `AS O` tablo takma adıdır.

### Subquery / CTE

- **Tek değerli alt sorgu:** `WHERE BolumID = (SELECT ...)`.
- **Liste döndüren alt sorgu:** `WHERE BolumID IN (SELECT ...)`.
- **CTE:** `WITH ad AS (SELECT ...) SELECT ...`; yalnızca ilgili sorgu boyunca geçerli isimlendirilmiş sonuç. Alt sorguyu okunur adımlara böler.
- SQL Server'da bir önceki ifade `;` ile bitmeli; `;WITH` yazılabilir. PDF'deki `,→` kod karakteri değildir.

### VIEW / Stored Procedure / Trigger

- **VIEW (görünüm):** Saklanan SELECT tanımı; normal view veri satırlarını fiziksel kopyalamaz. JOIN soyutlama ve belirli sütunlar için yetkilendirme.
- **Stored Procedure (saklı yordam):** Parametreli sunucu kodu; **IN, OUT, INOUT**. SQL Server `@param OUTPUT` + `EXEC`; PostgreSQL `CALL`, satır kümesi için `RETURNS TABLE` fonksiyonu.
- **Trigger (tetikleyici):** INSERT/UPDATE/DELETE ile otomatik. SQL Server **AFTER** (işlem sonrası), **INSTEAD OF** (işlemin yerine); statement başına bir kez.
- **UPDATE sırasında:** `inserted` **yeni**, `deleted` **eski** değerler. INSERT → inserted; DELETE → deleted.
- **Audit trigger:** `IF UPDATE(bolkod)` sütunun SET'te olup olmadığını, `WHERE eski<>yeni` değerin gerçekten değişmesini kontrol eder; `SET NOCOUNT ON` satır mesajlarını gizler.
- **PostgreSQL trigger:** `RETURNS trigger` + `CREATE TRIGGER`; row-level `NEW/OLD`; **`OLD.x IS DISTINCT FROM NEW.x`** NULL ile güvenli karşılaştırma. Tablo DELETE engellemesi `BEFORE DELETE ... FOR EACH ROW`, gerekirse `RAISE EXCEPTION`.
- **Trigger vs RabbitMQ:** Trigger senkron ve DB transaction içinde; RabbitMQ/Kafka mesaj taşır, işleyiciler asenkron olabilir; CDC DB değişikliklerini yakalayabilir.

### Bölüm 3 — Uygulama föyü

- **Şema:** `bolum`, `ogrenci`, `notlar`, `dersler`, `hocalar`.
- **CTE 1:** Bölüm bazında ortalama vize: `AVG(ISNULL(mazeret,vize))` (gerçek kodda CAST). **CTE 2:** Öğrenci–danışman INNER JOIN. **CTE 3:** Hoca yükü `SUM(ISNULL(teori,0)+ISNULL(pratik,0))`.
- **VIEW 1:** Öğrenci + bölüm + danışman; LEFT JOIN ve hassas alanları gizleme. **VIEW 2:** Ders + öğretim üyesi + `teori+pratik`. **VIEW 3:** Başarı notu.
- **Not hesabı (slayt 73):** `GecerliVize = ISNULL(mazeret,vize)`; `GecerliFinal=ISNULL(but,final)`; **`BasariNotu = GecerliVize*0.4 + GecerliFinal*0.6`**.
- **SP 1:** Bölüme göre öğrenci listesi, `sinif DESC`. **SP 2:** Öğrenci ekle, TRY...CATCH. **SP 3:** Not türüne göre UPDATE, **0–100** kontrolü.
- **Trigger 1:** Silinen öğrenciyi logla. **Trigger 2:** Ders değişince hocanın toplam saatini yeniden hesapla. **Trigger 3:** Öğrencisi olan bölümün silinmesini engelle.

### SQL Server ↔ PostgreSQL 16

| SQL Server                    | PostgreSQL                                 |
| ----------------------------- | ------------------------------------------ |
| `ISNULL(a,b)`                 | `COALESCE(a,b)`                            |
| Metin `+`                     | `                                          |     | `   |
| `tinyint, nvarchar, datetime` | `smallint, varchar, timestamp`             |
| `IDENTITY(1,1)`               | `GENERATED ALWAYS AS IDENTITY`             |
| `GETDATE(), SYSTEM_USER`      | `now(), current_user`                      |
| `@param OUTPUT, EXEC, GO`     | `OUT/INOUT, CALL` (veya fonksiyon), GO yok |
| `TRY...CATCH / RAISERROR`     | `EXCEPTION WHEN / RAISE EXCEPTION`         |
| `inserted/deleted`            | Row-level trigger'da `NEW/OLD`             |
| Tablo `INSTEAD OF DELETE`     | `BEFORE DELETE FOR EACH ROW`               |
| `LIKE` karşılaştırması        | `LIKE` duyarlı, `ILIKE` duyarsız           |

### Kendini test et (cevapları açmadan)

1. σ, π, ×, ⋈ işlemlerinin SQL karşılığı nedir?
2. DELETE, TRUNCATE ve DROP farkları ve PostgreSQL ROLLBACK istisnası?
3. Elif neden INNER JOIN'de yok ama LEFT JOIN'de var?
4. WHERE/HAVING farkı ve `HAVING COUNT(*) > 1`?
5. SQL Server UPDATE trigger'ında inserted ve deleted ne içerir?
6. PostgreSQL 16'da T-SQL Stored Procedure/Trigger mantığını nasıl aktarırsın?

**Kaynak kapsamı:** Hafta 4 PDF, fiziksel sayfalar 6–85. Föyün T-SQL kodları ve PostgreSQL 16 karşılıkları farklı motorlar için ayrı değerlendirilmelidir.
