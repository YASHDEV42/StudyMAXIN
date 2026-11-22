## Hafta 2 — Sınav Özeti

### İlişkisel model

- **Edgar F. Codd (1970):** İlişkisel modeli ortaya koydu. Temel faydalar: sadelik (tablolar), tutarlılık (küme kuramı), esneklik (katı erişim yolu yok).
- **Relation (ilişki):** Tablo. **Attribute (nitelik):** Sütun. **Tuple / Teta / Demet:** Satır. **Domain (alan):** Nitelik için geçerli değer kümesi.
- **Üç ilişki özelliği:** (1) Tekrarlı satır yok. (2) Satır/sütun sırası önemsiz. (3) Atomik hücre değeri.
- **Primary Key (birincil anahtar):** UNIQUE + NOT NULL; her satırı tanımlar.
- **Foreign Key (yabancı anahtar):** Başka tablodaki anahtara referans; ilişkisel bütünlüğü sağlar.

### ER diyagramı sembolleri

| Sembol              | Anlam                 |
| ------------------- | --------------------- |
| Dikdörtgen          | Varlık (Entity)       |
| Çift dikdörtgen     | Zayıf varlık          |
| Oval                | Nitelik (Attribute)   |
| Altı çizili nitelik | Anahtar nitelik       |
| Çift oval           | Çok değerli nitelik   |
| Kesikli oval        | Türetilmiş nitelik    |
| Baklava dilimi      | İlişki (Relationship) |
| Çift baklava dilimi | Zayıf ilişki          |

- **Kardinalite:** **1:1** dekan–fakülte; **1:N** öğretim görevlisi–ders; **M:N** öğrenci–ders.
- **Çapraz okuma:** Sayıyı başladığın varlığın değil, **karşı uçta** oku. `Öğrenci N — Bölüm 1` → bir öğrenci bir bölümde, bir bölümde N öğrenci.
- **Şekil 2.6:** Öğrenci–Bölüm N:1; Bölüm–Ders 1:N; Öğrenci–Ders M:N.

### ER → ilişkisel şema: dört dönüşüm

1. **Güçlü varlık → tablo:** Nitelikler sütun, anahtar nitelik PK.
2. **1:N → FK:** **1 tarafının PK'si N tarafındaki tabloya FK olarak eklenir.** Örn. `Ogrenci.BolumID`.
3. **M:N → ara tablo:** İki varlığın PK'lerini taşır. Örn. `OgrenciDersKayit(OgrenciNo,DersKodu,KayitTarihi)`; basit örnekte ilk iki sütun bileşik PK.
4. **Çok değerli nitelik → ayrı tablo:** Ana varlığın PK'si FK olur. Örn. `OgrenciTelefon(OgrenciNo,TelefonNo)`, bileşik PK.

**Ders tekrarına dikkat:** `{Ogno,DersID}` aynı dersin tekrarlarını ayıramaz. Slayt 22'de eklenen genişletilmiş örnekte `{Ogno,DersID,yıl,Donem}` kullanılır. Yalnızca dönem yeterli değildir; farklı yıllardaki aynı dönem çakışır.

### Veri türleri

- **`CHAR(n)`:** Sabit uzunluklu metin. **`VARCHAR(n)`:** Değişken uzunluklu metin. **`TEXT`:** Uzun metin.
- **`INTEGER`:** Tam sayı. **`DECIMAL(p,s)`:** Kesin ondalık; p toplam, s virgülden sonraki basamak. **`FLOAT` / `DOUBLE`:** Yaklaşık ondalık.
- **`DATE`:** Tarih. **`TIMESTAMP/DATETIME`:** Tarih+saat. **`BOOLEAN`:** Mantıksal. **`BLOB`:** İkili veri.
- **Sınav karşılaştırması:** Fiyat/maaş → **DECIMAL**; yaklaşık bilimsel ölçüm → **FLOAT**.

### Anahtar türleri

| Tür                                    | Tanım                                                 |
| -------------------------------------- | ----------------------------------------------------- |
| **Super Key (süper anahtar)**          | Satırı benzersiz tanımlayan herhangi bir sütun kümesi |
| **Candidate Key (aday anahtar)**       | Minimal süper anahtar; gereksiz sütun içermez         |
| **Primary Key (birincil anahtar)**     | Seçilmiş aday anahtar                                 |
| **Alternate Key (alternatif anahtar)** | Seçilmemiş aday anahtar                               |
| **Composite Key (bileşik anahtar)**    | Birden çok sütunlu anahtar                            |

**Örnek:** `{OgrenciNo,Ad}` süper anahtar; ama `OgrenciNo` tek başına yeterliyse aday anahtar **değil**.

### Integrity Constraints (bütünlük kısıtları)

- **NOT NULL:** Boş değeri yasaklar.
- **UNIQUE:** Tekrarlı değeri engeller.
- **PRIMARY KEY:** UNIQUE + NOT NULL.
- **FOREIGN KEY:** İlişkisel bütünlük.
- **CHECK:** Mantıksal koşul, örn. `CHECK (fiyat > 0)`.
- **DEFAULT:** Değer girilmezse varsayılan değer.

**Üç savunma mekanizması:** Veri türleri → format; anahtarlar → benzersizlik/ilişki; kısıtlar → geçerli değer.

**Kaynak kapsamı:** Prof. Dr. Özal Yıldırım, _İlişkisel Model ve ER Diyagramları_, Hafta 2, slayt/PDF sayfaları 6–41.
