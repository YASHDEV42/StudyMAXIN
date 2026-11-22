## SQL'e giriş ve ilişkisel cebir (slayt 6–12)

**SQL (Structured Query Language)** ilişkisel veritabanlarında veri ekleme, güncelleme, silme ve sorgulama için standart dildir. **Bildirimsel (declarative)** bir dildir: kullanıcı sonucu tanımlar, VTYS erişim ve yürütme planını belirler.

SQL'in teorik temeli **ilişkisel cebirdir**. Bir işlemin sonucu yeni bir ilişkidir; işlemler iç içe kullanılabilir.

| İlişkisel cebir | Sembol | SQL karşılığı | Görevi |
| --- | --- | --- | --- |
| Seçme (Selection) | σ | `WHERE` | Satır filtreleme |
| İzdüşüm (Projection) | π | `SELECT sütunlar` | Sütun seçme |
| Kartezyen çarpım (Cartesian Product) | × | `CROSS JOIN` | m×n satır kombinasyonu |
| Birleştirme (Join) | ⋈ | `JOIN` | Eşleşen satırları bağlama |

Örnek: `σ(BolumID=10)(Ogrenciler)` bölüm 10 öğrencilerini seçer; `π(Ad,Soyad)(σ(BolumID=10)(Ogrenciler))` sadece ad ve soyadlarını verir. Birleştirme örneğinde `BolumID=NULL` olan Elif eşleşmediği için doğal JOIN sonucunda yer almaz. **Ek açıklama:** Matematiksel izdüşüm yinelenen satırları kaldırır; SQL `SELECT` aynı sonuç için `DISTINCT` gerektirebilir.

## SQL alt dilleri (slayt 14)

| Alt dil | Amaç | Komut |
| --- | --- | --- |
| **DDL** | Şemayı oluşturma/yönetme | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| **DML** | Veri ekleme/güncelleme/silme | `INSERT`, `UPDATE`, `DELETE` |
| **DQL** | Veriyi seçme/sorgulama | `SELECT` |
| **TCL** | Transaction değişikliklerini yönetme | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

**COMMIT** transaction değişikliklerini kalıcılaştırır; **ROLLBACK** işlemin henüz kesinleştirilmemiş değişikliklerini geri alır. Ayrıntılı ACID konusu daha sonraki haftadadır.

## DDL: CREATE, ALTER, DROP, TRUNCATE (slayt 16–23)

`CREATE TABLE` tablo adını, sütunları, veri türlerini ve kısıtları tanımlar:

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

**PRIMARY KEY** tekil, NULL olmayan satır kimliğidir. **FOREIGN KEY** ilişkisel bütünlüğü sağlar: öğrencinin dolu `BolumID` değeri Bolumler'de bulunmalıdır. Önce başvurulan Bolumler tablosu oluşturulur. 1:N ilişkide 1 tarafının PK'si N tarafındaki tabloya FK olarak eklenir.

**PostgreSQL 16 farkları:** Tırnaksız tanımlayıcılar küçük harfe çevrilir. `CURRENT_DATE` çalışır. SQL Server 2022 ve öncesi için slayt `CAST(GETDATE() AS DATE)` kullanır.

```sql
-- PostgreSQL örnekleri
ALTER TABLE Ogrenciler ADD COLUMN Email VARCHAR(100);
ALTER TABLE Ogrenciler ADD CONSTRAINT uq_email UNIQUE (Email);
ALTER TABLE Ogrenciler ALTER COLUMN Ad TYPE VARCHAR(75);
ALTER TABLE Ogrenciler DROP COLUMN KayitTarihi;
```

SQL Server'da `ADD Email` (COLUMN yazılmaz), tür değişiminde `ALTER COLUMN Ad VARCHAR(75) NOT NULL` kullanılır. Slaytın dikkat çektiği ayrım: geleneksel `UNIQUE` kısıtında PostgreSQL birden fazla NULL'a izin verir, SQL Server'daki davranış farklı olabilir.

**Üç silme komutu:**
- **DELETE (DML):** Satırları siler; `WHERE` ile sınırlandırılabilir, DELETE trigger'ları çalışabilir.
- **TRUNCATE (DDL sınıflandırması):** Bütün satırları hızlı boşaltır, `WHERE` yoktur, tablo yapısı kalır.
- **DROP TABLE (DDL):** Tablo yapısını ve içeriğini kaldırır; FK bağımlılıkları işlemi engelleyebilir.

**Önemli ayrıntı:** Slayt 23'te PostgreSQL'de `BEGIN; TRUNCATE TABLE Ogrenciler; ROLLBACK;` ile TRUNCATE'ın geri alınabildiği açıkça belirtilir. Geri alma davranışını tüm VTYS'ler için genellememek gerekir. `DROP TABLE Bolumler CASCADE`, PostgreSQL örneğinde Ogrenciler tablosunu silmez; onu bağlayan FK kısıtını kaldırır.

## DML: INSERT, UPDATE, DELETE (slayt 25–27)

```sql
INSERT INTO Bolumler (BolumID, BolumAdi, FakulteAdi)
VALUES (10, 'Bilgisayar Mühendisliği', 'Mühendislik Fakültesi');

INSERT INTO Ogrenciler (OgrNo, Ad, Soyad, BolumID)
VALUES (101, 'Ali', 'Yılmaz', 10),
       (102, 'Zeynep', 'Kaya', 10),
       (103, 'Can', 'Demir', 11);
```

**Slaytın hata senaryosu:** Bolumler'de 11 bulunmuyorsa üçüncü satır FK'yi ihlal eder ve çoklu INSERT komutu tümüyle reddedilir; ilk iki öğrenci de eklenmez. Önce bölüm 11 eklenmelidir.

```sql
UPDATE Ogrenciler
SET Soyad='Kaya Yılmaz', BolumID=11
WHERE OgrNo=102;

DELETE FROM Ogrenciler
WHERE OgrNo=101;
```

**Uyarı:** UPDATE veya DELETE komutunda WHERE unutulursa *tüm satırlar* etkilenir.

## DQL: SELECT ve sorgu parçaları (slayt 29–36)

```sql
SELECT Ad, Soyad FROM Ogrenciler;
SELECT * FROM Ogrenciler WHERE BolumID=10 AND Ad='Ali';
SELECT * FROM Ogrenciler WHERE OgrNo IN (101,104);
SELECT * FROM Ogrenciler WHERE OgrNo BETWEEN 100 AND 102;
SELECT * FROM Ogrenciler WHERE Soyad LIKE '%Yilmaz';
SELECT * FROM Ogrenciler WHERE BolumID IS NULL;
SELECT OgrNo, Ad, Soyad FROM Ogrenciler ORDER BY Soyad ASC;
```

- **SELECT:** Sütunları, **FROM:** Kaynağı, **WHERE:** Satır koşulunu belirler.
- **AND / OR / NOT:** Mantıksal koşullar. **IN:** Listedeki değerlerden biri. **BETWEEN:** İki sınır **dahil**.
- **LIKE:** `%` sıfır veya daha fazla karakter; `_` tam bir karakter.
- **NULL:** `= NULL` değil, `IS NULL` / `IS NOT NULL` kullanılır.
- **ORDER BY:** `ASC` artan, `DESC` azalan. ORDER BY yoksa sıralama garanti değildir.
- **PostgreSQL:** `LIKE` büyük/küçük harfe duyarlı; `ILIKE` duyarsızdır.
- **Aggregate fonksiyonları:** `COUNT(*)` tüm satırlar, `COUNT(sütun)` NULL olmayanlar; `SUM`, `AVG`, `MIN`, `MAX`. **AS** sütuna geçici isim (alias) verir.

```sql
SELECT BolumID, COUNT(*) AS OgrenciSayisi
FROM Ogrenciler
WHERE BolumID IS NOT NULL
GROUP BY BolumID
HAVING COUNT(*) > 1;
```

**WHERE ile HAVING:** WHERE satırları gruplamadan **önce**, HAVING grupları gruplamadan **sonra** filtreler; `COUNT(*) > 1` gibi toplama koşulları HAVING'de kullanılır.

## JOIN türleri (slayt 38–41)

Örnek tabloda Elif'in `BolumID` değeri NULL; İnşaat Mühendisliği (BolumID 12) bölümünde öğrenci yoktur.

- **INNER JOIN:** Yalnızca iki tarafta eşleşen kayıtlar; Ali, Zeynep ve Can. Elif ve boş bölüm dışarıda.
- **LEFT JOIN:** Sol `Ogrenciler` tablosunun tüm satırları; Elif de görünür, bölüm bilgisi NULL.
- **RIGHT JOIN:** Sağ `Bolumler` tablosunun tüm satırları; boş İnşaat Müh. bölümü de görünür, öğrenci alanları NULL.
- **FULL OUTER JOIN:** Slayt 38'deki görselde bulunan, her iki taraftan eşleşmeyenleri de koruyan birleştirme (görsel açıklaması).

```sql
SELECT O.Ad, O.Soyad, B.BolumAdi
FROM Ogrenciler AS O
LEFT JOIN Bolumler AS B ON O.BolumID = B.BolumID;
```

**ON** birleştirme koşuludur. **O/B** tablo takma adlarıdır.

## Alt sorgular ve CTE (slayt 43–46)

**Tek değer döndüren alt sorgu:** Ali ile aynı bölümdeki öğrenciler:

```sql
SELECT Ad, Soyad, BolumID
FROM Ogrenciler
WHERE BolumID = (
  SELECT BolumID FROM Ogrenciler
  WHERE Ad='Ali' AND Soyad='Yilmaz'
);
```

**Liste döndüren alt sorgu (IN):** Mühendislik fakültesindeki bölüm ID'lerini alıp öğrencilere uygular:

```sql
SELECT Ad, Soyad FROM Ogrenciler
WHERE BolumID IN (
  SELECT BolumID FROM Bolumler
  WHERE FakulteAdi='Mühendislik Fakültesi'
);
```

**CTE — Common Table Expression (ortak tablo ifadesi):** `WITH` ile yalnızca mevcut sorguda kullanılan isimlendirilmiş geçici sonuç kümesi:

```sql
WITH MuhendislikBolumleri AS (
  SELECT BolumID FROM Bolumler
  WHERE FakulteAdi='Mühendislik Fakültesi'
)
SELECT O.Ad, O.Soyad
FROM Ogrenciler AS O
JOIN MuhendislikBolumleri AS MB ON O.BolumID=MB.BolumID;
```

Alt sorguyla aynı problemi çözer; ara sonucu isimlendirdiği için çok adımlı sorgu okunabilirliğini artırır. SQL Server'da önceki komut noktalı virgülle bitmelidir (`;WITH` güvenli yazımdır). Kitaptan kopyalanan `,→` satır bölme karakterleri SQL kodu değildir.

## VIEW, Stored Procedure ve Trigger (slayt 48–65)

### VIEW — Görünüm

`CREATE VIEW ... AS SELECT ...`, sorgu tanımını saklayıp tablo gibi kullanmayı sağlar. Normal VIEW fiziksel satır kopyası tutmaz; temel tablolardan güncel veriyi gösterir. Karmaşık JOIN'leri soyutlar, belirli sütunları kullanıcıya açma yoluyla yetkilendirmeyi destekleyebilir.

```sql
CREATE VIEW Vw_OgrenciBolumBilgileri AS
SELECT O.OgrNo, O.Ad, O.Soyad, B.BolumAdi, B.FakulteAdi
FROM Ogrenciler AS O
LEFT JOIN Bolumler AS B ON O.BolumID=B.BolumID;
```

### Stored Procedure — Saklı yordam

Sunucuda saklanan komut grubudur; parametre alabilir, sonuç üretebilir ve tekrar kullanılabilir. Parametre yönleri: **IN** giriş, **OUT** çıkış, **INOUT** giriş/çıkış.

**SQL Server/T-SQL:** `@param`, `OUTPUT`, `CREATE PROCEDURE`, `EXEC`, `GO`.
**PostgreSQL:** `IN/OUT/INOUT`, `CREATE PROCEDURE ... LANGUAGE plpgsql` ve `CALL`; satır kümesi döndürme örneğinde `CREATE FUNCTION ... RETURNS TABLE`, `SELECT * FROM f()`. `GO` kullanılmaz. `ISNULL(a,b)` yerine `COALESCE(a,b)`; string `+` yerine `||` yazılır.

Slayt 52'de `sp_BolumeGoreOgrenciSay` bir bölüm kodunu alır, `COUNT(*)` ile öğrenci sayısını OUT'a aktarır ve rapor mesajını INOUT üzerinden günceller.

### Trigger — Tetikleyici

Bir `INSERT`, `UPDATE` veya `DELETE` olayıyla otomatik çalışan veritabanı yordamıdır.

| SQL Server olayı | `inserted` | `deleted` |
| --- | --- | --- |
| INSERT | Yeni satırlar | — |
| UPDATE | Yeni değerler | Eski değerler |
| DELETE | — | Silinen satırlar |

**SQL Server** trigger'ı statement başına çalışır: 100 satırlık tek UPDATE için trigger bir kez tetiklenir. **AFTER** işlem sonrası, **INSTEAD OF** asıl işlemin yerine çalışır. `SET NOCOUNT ON` ek etkilenen satır sayısı mesajlarını kapatır; `IF UPDATE(bolkod)` sütunun SET içinde bulunup bulunmadığını denetler; değer gerçekten değişti mi sorusunu `WHERE` karşılaştırması cevaplar.

**Bölüm değişikliği logu (slayt 55–61):** `trg_OgrenciBolumLogla`, öğrenci numarasına göre `inserted` ve `deleted` tablolarını JOIN eder, eski/yeni bölüm kodunu kıyaslayıp yalnızca farklılıkları `OgrenciBolumLog` tablosuna yazar. Örnekte 3 güncellenen satırdan yalnızca 2'sinin kodu değiştiği için 2 log satırı yazılır.

**PostgreSQL:** Önce `RETURNS trigger` fonksiyonu, sonra `CREATE TRIGGER ... EXECUTE FUNCTION`. `FOR EACH ROW` için `NEW` ve `OLD` kullanılır; NULL ile güvenli karşılaştırma `OLD.bolkod IS DISTINCT FROM NEW.bolkod`. `AFTER UPDATE OF bolkod` belirli sütunu hedefler. Ayrıca `BEFORE` ve statement-level destek vardır.

**Silme engelleme örneği (slayt 62–63):** SQL Server'da `INSTEAD OF DELETE` ile bölümde öğrenci varsa hata, yoksa gerçek silme trigger içinde manuel olarak yapılır. PostgreSQL'de tablo üzerinde `BEFORE DELETE ... FOR EACH ROW` ile kontrol edilir, öğrenci varsa `RAISE EXCEPTION`; yoksa `RETURN OLD` ve silme devam eder. PostgreSQL'de INSTEAD OF yalnızca VIEW üzerinde kullanılabilir.

**Trigger ve olay mimarisi (slayt 64–65):** Trigger senkron ve transaction'a bağlıdır; RabbitMQ/Kafka olay taşıyan aracı, tek başına trigger değildir. Uygulama olayları, yalnızca yayımlandıkları kod yollarını kapsar; CDC (ör. Debezium) transaction günlüğünden değişiklik yakalayabilir. Olay tüketicileri asenkron çalışabilir. Kritik veritabanı merkezli audit kuralları için trigger faydalı kalır; dağıtık iş akışlarında event/consumer yaklaşımı önemlidir.

## Bölüm 3: SQL Server uygulama föyü (slayt 67–81)

Laboratuvar şeması: `bolum`, `ogrenci`, `notlar`, `dersler`, `hocalar`. `notlar` öğrenci–ders ara ilişkisini ve `vize`, `mazeret`, `final`, `but` notlarını taşır. Föyün asıl örnekleri **T-SQL** dilindedir; slaytlar PostgreSQL 16 farklarını ayrıca işaretler.

### Üç CTE örneği

1. **Bölüm ortalama vize (slayt 68):** `notlar JOIN ogrenci` ile `AVG(CAST(ISNULL(n.mazeret,n.vize) AS decimal(5,2)))` hesaplanır; `bolum` ile ad bağlanır, `ORDER BY ... DESC` uygulanır. Mazeret varsa vize yerine geçer.
2. **Öğrenci–danışman (slayt 69):** `ogrenci JOIN hocalar`, `OgrenciDanismanCTE`; danışmanı olmayan öğrenci INNER JOIN nedeniyle görünmez.
3. **Gerçek ders yükü (slayt 70):** `SUM(ISNULL(teori,0)+ISNULL(pratik,0))` ile hocanın gerçek saati hesaplanır, `top_ders_saati` ile karşılaştırılır; eski kayıt güncel olmayabilir varsayımı vardır.

### Üç VIEW örneği

- `vw_OgrenciDetay` (71): Öğrenci/bölüm/danışman, LEFT JOIN; `dogum_tarihi` gibi hassas sütunları göstermeme.
- `vw_DersHocaBilgisi` (72): Ders ve hoca adı, `teori + pratik` hesaplaması; PostgreSQL'de metin birleştirme `||`.
- `vw_OgrenciBasariNotlari` (73): `GecerliVize = ISNULL(mazeret,vize)`, `GecerliFinal=ISNULL(but,final)`, **`BasariNotu = 0.4 * GecerliVize + 0.6 * GecerliFinal`**; `decimal(5,2)` ile sonuca dönüştürme. Bu yüzde ağırlıkları slayt örneğine aittir.

### Üç Stored Procedure örneği

- `sp_BolumdekiOgrencileriGetir` (74): Bolum kodu parametresine göre öğrencileri `sinif DESC,soyadi` sırasıyla listeler.
- `sp_OgrenciEkle` (75): Parametreli INSERT; SQL Server'da PK/FK hatasını `TRY...CATCH` ile yakalar. PostgreSQL'de `EXCEPTION WHEN OTHERS THEN`.
- `sp_NotGuncelle` (76–77): Önce `YeniNot` için **0–100** aralığını doğrular, ardından `NotTipi` (`vize/final/but/mazeret`) seçimine göre ilgili sütunu günceller. PostgreSQL'de `ELSIF`, `RAISE EXCEPTION`, `CALL`.

### Üç Trigger örneği

- `trg_OgrenciSilmeLog` (78): Silinen öğrencinin numarası, adı, tarih ve kullanıcı bilgilerini loglar.
- `trg_HocaDersYukuGuncelle` (79): Ders eklenip güncellenince öğretim üyesinin toplam ders saatini tekrar hesaplar.
- `trg_BolumSilmeEngelle` (80): Kayıtlı öğrenci bulunan bölümün silinmesini engeller; örnekte T-SQL `INSTEAD OF DELETE` kullanılır.

### SQL Server → PostgreSQL 16 hızlı karşılaştırma

| SQL Server / T-SQL | PostgreSQL |
| --- | --- |
| `ISNULL(a,b)` | `COALESCE(a,b)` |
| Metin `'a'+'b'` | `'a'||'b'` |
| `tinyint/nvarchar/datetime` | `smallint/varchar/timestamp` |
| `IDENTITY(1,1)` | `GENERATED ALWAYS AS IDENTITY` |
| `GETDATE()/SYSTEM_USER` | `now()/current_user` |
| `@param`, `OUTPUT` | Parametre, `OUT/INOUT` |
| `EXEC`, `GO` | `CALL` veya `SELECT * FROM f()`; GO yok |
| `TRY...CATCH`, `RAISERROR` | `EXCEPTION WHEN`, `RAISE EXCEPTION` |
| `inserted/deleted` | Satır trigger'ında `NEW/OLD` |
| Tablo `INSTEAD OF DELETE` | `BEFORE DELETE ... FOR EACH ROW` |
| `LIKE` (dersin SQL Server karşılaştırması) | Harfe duyarlı `LIKE`, duyarsız `ILIKE` |

## Hatırlama soruları

SQL niçin bildirimsel bir dildir? DELETE/TRUNCATE/DROP nasıl ayrılır? WHERE ile HAVING farkı nedir? Elif hangi JOIN türünde yer alır? CTE neden yararlıdır? UPDATE sırasında inserted/deleted ne içerir? SQL Server'daki trigger mantığı PostgreSQL 16'ya nasıl aktarılır?

**Kaynak:** Prof. Dr. Özal Yıldırım, *Modern Veritabanı Yönetim Sistemleri*, *SQL Temelleri ve İleri SQL*, Hafta 4, fiziksel PDF sayfaları 6–85.
