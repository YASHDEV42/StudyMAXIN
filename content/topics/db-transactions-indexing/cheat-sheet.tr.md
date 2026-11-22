## Hafta 6 — Transaction Yönetimi ve İndeksleme: Sınav Özeti

### Transaction ve TCL
- **Transaction:** Bir veya daha fazla SQL komutunun oluşturduğu **tek mantıksal iş birimi**; ACID, işlemin tamamında geçerlidir.
- **BEGIN TRANSACTION / START TRANSACTION:** İşlemi başlatır.
- **COMMIT:** Değişiklikleri onaylar ve kalıcılaştırır.
- **ROLLBACK:** Onaylanmamış değişiklikleri geri alır.
- **SAVEPOINT ad:** İşlem içi kayıt noktası; `ROLLBACK TO SAVEPOINT ad` ile kısmi geri dönüş.
- **PostgreSQL:** `BEGIN;` kısaltması kullanılabilir. Blok içi SQL hatası **aborted transaction** durumuna geçirir; `ROLLBACK;` gerekir. Aborted durumda `COMMIT` değişiklikleri kaydetmez.

### Banka transferi (slayt 9–12)
| Hesap | Önce | Başarılı 200 TL transferinden sonra |
| --- | --- | --- |
| **Ali (1001)** | **1000.00** | **800.00** |
| **Zeynep (1002)** | **500.00** | **700.00** |

```sql
BEGIN TRANSACTION;
UPDATE Hesaplar SET Bakiye=Bakiye-200.00 WHERE HesapNo=1001;
UPDATE Hesaplar SET Bakiye=Bakiye+200.00 WHERE HesapNo=1002;
COMMIT;
```

İkinci UPDATE hata verirse **ROLLBACK** → Ali tekrar **1000.00**. Bu **Atomicity** örneğidir. Toplam 1500.00 korunur.

**Autocommit:** Her bağımsız komut kendi kendine commit edilir. Banka transferi gibi çok adımlı bir işlem tek transaction olarak yönetilmelidir; aksi hâlde ilk UPDATE kalıcı olurken ikincisi başarısız olabilir.

### Index (indeks)
- **Full Table Scan:** Tablonun satırlarını tarama; kitabı baştan sona okumak.
- **Index Seek:** İndeksten konumu bulup ilgili kayda ulaşma; kitabın fihristini kullanmak.
- **İndeks:** Sütun değerlerinden kayıtlara erişimi hızlandırabilen ek veri yapısı.
- **Ödünleşim:** SELECT daha hızlı olabilir; indeks **disk alanı** tüketir ve INSERT/UPDATE/DELETE bakım maliyetini artırır.

### İndekslemenin dört kuralı
1. **WHERE/JOIN:** Sık sorgulanan ve birleştirilen sütunları indekslemeyi değerlendir.
2. **PK/FK:** PostgreSQL PK/UNIQUE için otomatik indeks oluşturur; FK için oluşturmaz, gerekli FK indeksini elle oluştur.
3. **Composite Index:** Birlikte kullanılan sütunlar için bileşik indeks; **sütun sırası önemlidir**.
4. **Aşırı indeksleme yapma:** Yalnızca ölçülmüş faydası olan indeksleri tut.

```sql
CREATE INDEX IX_Siparisler_MusteriID ON Siparisler (MusteriID);
CREATE INDEX IX_Ogrenciler_Soyad_Ad ON Ogrenciler (Soyad, Ad);
```

### Optimizer ve yürütme planı
- **Optimizer:** İndeksleri ve veri istatistiklerini kullanır, en uygun görünen **Execution Plan**'ı seçer.
- **EXPLAIN:** Tahmini sorgu planını gösterir; sorguyu çalıştırmaz.
- **EXPLAIN ANALYZE (PostgreSQL):** Sorguyu gerçekten çalıştırır; yürütme ölçümlerini verir.
- **SQL Server:** `Full/Table Scan` veya `Index Seek`.
- **PostgreSQL:** `Seq Scan`, `Index Scan`, `Bitmap Index Scan`.
- **Not:** İndeks oluşturmak Index Scan kullanımını garanti etmez; tahmini maliyet ve gerçek veriler belirleyicidir.

### Pratik (Siparisler)
```sql
SELECT SiparisID, SiparisTarihi, Tutar
FROM Siparisler
WHERE MusteriID=54321;
```
**Üç aşama:** (1) **Teşhis:** SSMS'te Estimated Execution Plan, olası Table/Clustered Index Scan. (2) **Çözüm:** MusteriID'ye CREATE INDEX. (3) **Doğrulama:** Planı yeniden incele, mümkünse Index Seek ve daha düşük maliyet; pgAdmin'de EXPLAIN ile karşılaştır.

### Sınav kontrol soruları
1. Transaction niçin mantıksal iş birimidir?
2. COMMIT / ROLLBACK / SAVEPOINT farkları?
3. İkinci transfer adımı başarısızsa Ali'nin bakiyesi neden 800'de kalmaz?
4. Autocommit bankacılık transferi için niçin uygun değildir?
5. Full Table Scan / Index Seek karşılaştırması?
6. Gereksiz indekslerin iki maliyeti?
7. EXPLAIN neyi gösterir; EXPLAIN ANALYZE neyi farklı yapar?

**Kaynak:** Hafta 6, *Transaction Yönetimi ve İndeksleme*, PDF sayfaları 6–30.
