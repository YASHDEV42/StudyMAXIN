## Hafta 6 — Transaction Yönetimi ve İndeksleme

Hafta 5'teki ACID teorisinin uygulaması **transaction yönetimi**dir. Bu ders, **TCL komutları**, banka transferi, **autocommit**, **indeksler** ve **yürütme planları** üzerinde durur (PDF s. 2–4).

## 1. Transaction ve TCL (slayt 6–8)

**Transaction (işlem):** Tek bir mantıksal iş birimi olarak ele alınan bir veya daha çok SQL komutunun, genellikle DML'in, dizisidir. VTYS, ACID özelliklerini bütün işlem için uygular.

| TCL komutu                                | Görevi                                          |
| ----------------------------------------- | ----------------------------------------------- |
| `BEGIN TRANSACTION` / `START TRANSACTION` | İşlem bloğunu başlatır                          |
| `COMMIT`                                  | Değişiklikleri onaylayıp kalıcılaştırır         |
| `ROLLBACK`                                | İşlemdeki onaylanmamış değişiklikleri geri alır |
| `SAVEPOINT ad`                            | Bir işlem içindeki geri dönüş noktasıdır        |

**Slayt 8'in yaşam döngüsü:** BEGIN → DML 1 → SAVEPOINT → DML 2 → başarıysa COMMIT, hatada ROLLBACK veya kayıt noktasına dönüş. **Ek açıklama:** `ROLLBACK TO SAVEPOINT` işlemi tümüyle bitirmez; kalan değişiklikleri COMMIT etmek veya tümüyle ROLLBACK yapmak gerekir.

## 2. Banka transferi uygulaması (slayt 9–12)

Başlangıç `Hesaplar` verisi:

| HesapNo | MusteriAdi  | Bakiye  |
| ------- | ----------- | ------- |
| 1001    | Ali Yilmaz  | 1000.00 |
| 1002    | Zeynep Kaya | 500.00  |

**İş kuralı:** Ali'den Zeynep'e **200 TL** aktarılır. Her iki UPDATE birlikte başarılı olmalıdır.

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

Başarılı işlem sonunda **Ali=800.00, Zeynep=700.00**; toplam bakiye 1500.00 olarak kalır.

**Hata durumu (slayt 11):** Zeynep'in hesabına para yatırılan UPDATE hata verirse uygulama `ROLLBACK` gönderir. Ali'nin geçici 800.00 bakiyesi **1000.00**'a döner. Bu **Atomicity (Atomiklik)** ilkesidir.

**PostgreSQL 16 (slayt 12):**

- `BEGIN TRANSACTION;`, `START TRANSACTION;` veya `BEGIN;` kullanılabilir.
- Blok içindeki SQL hatası transaction'ı **aborted** durumuna sokar. Sonraki komutlar reddedilir; `ROLLBACK;` ile blok kapatılır.
- Hatalı bloğa `COMMIT;` göndermek, değişiklikleri kalıcılaştırmaz; işlem geri alınır.
- `SAVEPOINT ad;` ve `ROLLBACK TO SAVEPOINT ad;` kayıt noktalarını yönetir.

**Ek açıklama:** Gerçek para aktarımında iki UPDATE'in de beklenen hesabı etkilediğini, bakiyenin yeterli olduğunu ve diğer iş kurallarını da doğrulamak gerekir. SQL hata vermemesi tek başına iş kuralı başarısı değildir.

## 3. Autocommit modu (slayt 13)

**Autocommit (otomatik onaylama)** modunda her bağımsız SQL komutu otomatik olarak kesinleştirilir. Tek adımlı işlemlerde kullanışlıdır; ancak banka transferindeki iki UPDATE ayrı commit edilirse ikinci komutun hatasında ilkini ortak bir ROLLBACK ile geri almak mümkün olmaz. Bu nedenle çok adımlı iş birimi **açık transaction** içinde yürütülür.

PostgreSQL'in psql/pgAdmin istemcilerinde varsayılan autocommit davranışı dersin örneği olarak belirtilir; `BEGIN` ile açık işlem başlatılır.

## 4. İndeks kavramı: Full Table Scan ve Index Seek (slayt 15–18)

**Tam Tablo Taraması (Full Table Scan):** İlgili satırı bulmak için çok sayıda satırı tek tek okumak; kitabı baştan sona taramak gibi.

**İndeks Araması (Index Seek):** Kitabın sonundaki fihristten sayfa numarasını bulup doğrudan ilgili yere gitmek gibi.

**İndeks (Index):** Bir veya daha fazla sütunun değerleriyle ilgili satırlara erişimi kolaylaştıran özel veri yapısı. Slayt 17'de sıralı `MusteriID` değerleri ve temsili disk adresleri gösterilir; `WHERE MusteriID=54321` indeks üzerinden aranabilir.

**Ödünleşim (Trade-off):**

- SELECT sorguları hızlanabilir.
- Her indeks fazladan disk alanı kullanır.
- INSERT/UPDATE/DELETE sırasında indekslerin bakımı yazma maliyetini artırabilir.

İndeks sayısını artırmak her zaman daha yüksek toplam performans anlamına gelmez.

## 5. Dört indeksleme kuralı (slayt 19–22)

**Kural 1 — WHERE ve JOIN:** Sık filtrelenen ve birleştirilen sütunlar indeks adayıdır.

```sql
CREATE INDEX IX_Siparisler_MusteriID
ON Siparisler (MusteriID);
```

Adlandırma: `IX_` + tablo adı + sütun adı. Slayt, PostgreSQL 16'da aynı CREATE INDEX sözdiziminin kullanılabildiğini belirtir.

**Kural 2 — PK ve FK:** PostgreSQL, **PRIMARY KEY** ve **UNIQUE** için otomatik indeks oluşturur; **FOREIGN KEY** için otomatik indeks oluşturmaz. Sık kullanılan FK sütunlarına manuel indeks faydalıdır. Örnek: `Ogrenciler.BolumID` ile Bolumler'e JOIN.

**Kural 3 — Composite Index (bileşik indeks):** Aynı sorguda birlikte kullanılan sütunlar için tek birleşik indeks etkili olabilir:

```sql
CREATE INDEX IX_Ogrenciler_Soyad_Ad
ON Ogrenciler (Soyad, Ad);
```

**Sütun sırası önemlidir.** `(Soyad,Ad)` ile `(Ad,Soyad)` bütün sorgular için aynı davranmaz.

**Kural 4 — Gereksiz indeksten kaçın:** Tüm sütunları indekslemek diskte yer kaplar ve DML'i yavaşlatabilir. İndeksleme, gözlemlenen sorgu gereksinimleri ve kanıtlanmış fayda üzerinden yapılmalıdır.

**Ek açıklama:** Özellikle küçük tablolar veya düşük seçicilikli koşullar için iyileştirici indeks yerine taramayı seçebilir; salt indeksin varlığı kullanım garantisi değildir.

## 6. Optimizer, Execution Plan ve EXPLAIN (slayt 23–24)

**İyileştirici (Optimizer)** mevcut indeksleri, istatistikleri ve tahmini maliyetleri değerlendirerek **Yürütme Planı (Execution Plan)** seçer.

```sql
EXPLAIN SELECT * FROM Siparisler WHERE MusteriID = 54321;
```

- **EXPLAIN:** Sorgu planını gösterir; sorgunun ana işlemini yürütmez.
- **EXPLAIN ANALYZE (PostgreSQL):** Sorguyu **gerçekten çalıştırır** ve gerçek çalışma ölçümlerini gösterir; veri değiştiren sorgularda dikkat gerekir.
- **SQL Server:** `Table Scan`, `Clustered Index Scan`, `Index Seek`.
- **PostgreSQL:** `Seq Scan`, `Index Scan`, `Bitmap Index Scan`.

**Slaytın şematik çıktısı:**

```text
Seq Scan on siparisler (cost=... rows=...)
  Filter: (musteriid = 54321)

Index Scan using ix_siparisler_musteriid on siparisler (cost=... rows=...)
  Index Cond: (musteriid = 54321)
```

`cost` ve `rows` gerçek veri ve plana göre değişir. İndeks eklense bile Optimizer'ın her durumda Index Scan seçeceği garanti değildir.

## 7. Pratik uygulama: teşhis → çözüm → doğrulama (slayt 25–26)

**Senaryo:** Milyonlarca satırlı `Siparisler` tablosunda müşterinin siparişleri sıkça sorgulanıyor:

```sql
SELECT SiparisID, SiparisTarihi, Tutar
FROM Siparisler
WHERE MusteriID = 54321;
```

1. **Teşhis:** SQL Server Management Studio (SSMS) içindeki Estimated Execution Plan ile maliyetli `Table Scan` / `Clustered Index Scan` olup olmadığını incele. SSMS bazen `Missing Index` önerisi gösterebilir.
2. **Çözüm:** `CREATE INDEX IX_Siparisler_MusteriID ON Siparisler (MusteriID);`.
3. **Doğrulama:** Aynı sorgunun planını yeniden incele; uygun koşullarda `Index Seek` görülebilir. Kazanım veri miktarı ve iş yüküne bağlıdır.

**PostgreSQL:** pgAdmin'de Explain planı görselleştirilebilir; `EXPLAIN → CREATE INDEX → EXPLAIN` döngüsü uygulanır. Slayt, SQL Server benzeri yerleşik Missing Index önerisi olmadığını belirtir.

**Ek açıklama:** Gerçek performans değerlendirmesinde yalnızca tahmini cost değil, gerçek yürütme süresi ve okuma miktarları da karşılaştırılır.

## Kapanış ve hatırlama

- Transaction, komutları tek bir ACID iş birimine dönüştürür; `COMMIT` onaylar, `ROLLBACK` geri alır, `SAVEPOINT` kısmi geri dönüş noktasıdır.
- Autocommit, birden fazla DML'den oluşan iş birimleri için uygun değildir.
- İndeks okumayı hızlandırabilir ama diskte alan ve yazma sırasında bakım maliyeti yaratır.
- Index kararı yürütme planı ile **teşhis → çözüm → doğrulama** döngüsünde değerlendirilir.
- Sonraki haftanın konusu (slayt 30) NoSQL, CAP ve BASE'dir; bunlar Hafta 6'nın kapsamı değildir.

**Kontrol soruları (cevapsız):** Transferde ikinci UPDATE başarısızsa bakiye neden 800'de kalmaz? Composite Index'te sütun sırası neden önemlidir? EXPLAIN ile EXPLAIN ANALYZE'nin farkı nedir?

**Kaynak:** Prof. Dr. Özal Yıldırım, _Transaction Yönetimi ve İndeksleme_, Hafta 6, fiziksel PDF sayfaları 6–30.
