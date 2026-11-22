## Hafta 1 — Sınav Özeti

### 1. Veritabanının önemi

- **Veritabanı:** Yalnızca pasif depolama alanı değil; verimlilik, karar desteği ve inovasyonu destekleyen **stratejik bileşen**.
- **VTYS:** Veriyi düzenli, güvenilir ve sorgulanabilir biçimde yönetir.
- **Örnekler:** Sağlıkta hasta kayıtları; finansta işlemler; eğitimde öğrenci bilgileri; lojistikte tedarik zinciri; e-ticarette davranış analizi.

### 2. Tarihsel gelişim

| Dönem     | Model           | Esas nokta                                                   |
| --------- | --------------- | ------------------------------------------------------------ |
| İlk dönem | Dosya tabanlı   | Tekrar, tutarsızlık, zayıf bütünlük ve ilişki yönetimi       |
| 1960'lar  | Hiyerarşik      | Ağaç; tek ebeveyn; ör. IBM IMS                               |
| 1960'lar  | Ağ              | Çocuğun birden fazla ebeveyni olabilir                       |
| 1970'ler  | İlişkisel       | Edgar F. Codd; tablolar; fiziksel depolamadan soyutlama; SQL |
| 1990'lar  | OODBMS / ORDBMS | Nesne–tablo uyumsuzluğuna yanıt                              |
| 2000'ler  | NoSQL           | Ölçek, esneklik, çeşitli veri türleri                        |

**Hiyerarşik ve ağ modelinin ortak dezavantajı:** Önceden belirlenmiş **katı erişim yolları**.

**İlişkisel modelin iki temel yeniliği:** (1) Matematiksel ilişkilere dayalı tablo yapısı, (2) fiziksel erişim ayrıntılarından soyutlanmış bildirimsel sorgulama (SQL).

**Primary key:** Kayıtları benzersiz tanımlar. **Foreign key:** Tablolar arasında bağlantı kurar. Slayttaki örnek: `öğrencino`, Öğrenci–Dersler ilişkisi; 17532 → BL44 ve BL13.

**Empedans uyuşmazlığı:** Nesne yönelimli programdaki nesneler ile ilişkisel tablolardaki temsil farkı. **OODBMS:** Nesneyi doğrudan saklar. **ORDBMS:** İlişkisel modele nesne özellikleri ekler (PostgreSQL'de kullanıcı tanımlı tipler, kalıtım).

### 3. Dört NoSQL türü

- **Doküman — MongoDB:** JSON benzeri esnek belgeler.
- **Anahtar-değer — Redis:** Hızlı anahtar/değer erişimi.
- **Sütun ailesi — Cassandra:** Yatay ölçeklenebilirlik ve yoğun yazma.
- **Graf — Neo4j:** İlişki ağırlıklı veriler.

**Hibrit / çok modelli çözümler:** Farklı veri türleri ve ihtiyaçlar için birden çok yaklaşımı birleştirir. Akıllı şehir → zaman serisi + coğrafi bilgi; yapay zekâ önerileri → vektör veritabanı ve anlamsal benzerlik. Hedefler: **esneklik, ölçeklenebilirlik, uyarlanabilirlik**.

### 4. DIKW piramidi

1. **Data (Veri):** Ham, bağlamsız değer.
2. **Information (Enformasyon):** Bağlamla anlamlandırılmış veri; kim/ne/nerede/ne zaman?
3. **Knowledge (Kapsamlı Bilgi):** Deneyim ve kurallarla yorumlama; nasıl?
4. **Wisdom (Bilgelik):** Etik ve sezgisel değerlendirme; neden/ne yapılmalı?

**Veri → Enformasyon geçişinin anahtarı:** **Bağlam (context)**. Veritabanı özellikle bu geçişi destekler. **RAG:** LLM'in üretimden önce veritabanından ilgili bilgi getirmesi.

**Sensör örneği:** `40, "Kuzey", 38.6739, 39.2225, "2025-10-01 06:30"` → Bağlamla derinlik (40 km), yön, enlem, boylam, zaman olarak yorumlanır.

### 5. Metadata (Üstveri)

- **Tanım:** Veri hakkında veri; alan adını, türünü, biçimini ve kısıtlarını açıklar.
- **Örnek:** `derinlik_km INTEGER > 0 NOT NULL`; `yon VARCHAR(10)`; `enlem DECIMAL(9,6)` [−90, 90]; `boylam DECIMAL(9,6)` [−180, 180]; `zaman_damgasi DATETIME UNIQUE` (slayttaki örnek).
- **Veri ≠ Metadata:** Ölçüm değeri veri; ölçümün türü ve geçerlilik kuralları metadata.

### Kaynak kapsamı

_Modern Veritabanı Yönetim Sistemleri_, Prof. Dr. Özal Yıldırım, Hafta 1, fiziksel PDF sayfaları 6–32 ve 34–38. Kitap referansları slaytın içindeki yönlendirmelerdir; dersin kitabı ayrıca incelenmemiştir.
