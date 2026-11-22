## İlişkisel modelin temelleri (slayt 6–11)

Edgar F. Codd, 1970 tarihli çalışmasıyla ilişkisel modeli önerdi. Hiyerarşik ve ağ modellerinin katı erişim yollarına karşı **sadelik, tutarlılık ve esneklik** sağlamak hedeflendi. Model, verileri tablolarda düzenler ve küme kuramına dayanır.

| Kavram                   | Tanım                                         | Örnek                             |
| ------------------------ | --------------------------------------------- | --------------------------------- |
| **İlişki (Relation)**    | Satır ve sütunlardan oluşan iki boyutlu tablo | Öğrenciler                        |
| **Nitelik (Attribute)**  | Sütun, varlığın özelliği                      | Ad, Soyad                         |
| **Teta / Demet (Tuple)** | Bir satır, tek kayıt                          | Öğrenci 101                       |
| **Alan (Domain)**        | Niteliğin alabileceği geçerli değer kümesi    | Doğum tarihi için tarih değerleri |

İlişkinin temel üç özelliği (slayt 9): **(1) Satırlar benzersizdir; (2) satır ve sütun sırası önemsizdir; (3) hücrelerde atomik değerler bulunur.** Bir hücreye `555-1234, 555-5678` gibi telefon listesi koymak atomiklik ilkesini ihlal eder; sonraki haftanın 1NF konusuna bağlanır.

**Birincil anahtar (Primary Key / PK)** her satırı benzersiz tanımlar: UNIQUE ve NOT NULL koşullarını sağlar. **Yabancı anahtar (Foreign Key / FK)** başka bir tablonun anahtarına başvurarak ilişkisel bütünlüğü korur. Öğrenciler tablosunda bulunmayan bir öğrenci için Notlar tablosunda kayıt oluşturulamaz (slayt 10–11). Ek açıklama: Bir FK sütununda NULL izni ayrıca NOT NULL koşuluyla belirlenir.

## ER diyagramları: kavramsal model (slayt 13–22)

**Varlık-İlişki (Entity-Relationship, ER) modeli** veri tabanı kodlanmadan önce gerçek dünyayı kavramsal biçimde gösterir; Peter Chen tarafından 1976'da sunuldu. Tasarımcı, yazılımcı ve iş analisti için ortak dildir.

### ER sembolleri

- **Varlık (Entity):** Dikdörtgen; ÖĞRENCİ, DERS gibi tanımlanabilir nesne. Benzer varlıkların topluluğu **varlık kümesi (entity set)**.
- **Zayıf varlık (Weak Entity):** Çift dikdörtgen.
- **Nitelik (Attribute):** Oval; Ad, Soyad.
- **Anahtar nitelik:** Adının altı çizilir, örneğin `Ogno`.
- **Çok değerli nitelik:** Çift oval; öğrencinin birden fazla `Telefon` değeri.
- **Türetilmiş nitelik:** Kesikli oval; `DogumTarihi` üzerinden `Yasi`.
- **Bileşik nitelik:** `Adres` ovalinden `Mah`, `Sokak`, `Sehir`, `Ulke` bileşenleri çıkar.
- **İlişki (Relationship):** Baklava dilimi; ÖĞRENCİ'nin DERS'i `Alır` ilişkisi. Zayıf ilişki çift baklava ile gösterilir.

### Kardinalite (Cardinality)

- **1:1 — Bire-bir:** Bir dekan bir fakülte, bir fakülte bir dekan.
- **1:N — Bire-çok:** Bir öğretim görevlisi birçok ders verir; her dersin bir öğretim görevlisi olduğu varsayılır.
- **M:N — Çoka-çok:** Bir öğrenci birçok ders, bir ders birçok öğrenciyle ilişkilidir.

**Çapraz okuma kuralı (slayt 19–21):** Bir varlıktan başla, ilişkiyi geç, **karşı uçtaki** sayıyı oku. ÖĞRENCİ (N) — KAYIT — BÖLÜM (1) için _bir öğrenci bir bölüme bağlıdır; bir bölümde N öğrenci bulunur_. Öğrenci yanındaki N, öğrencinin N bölümü olduğu anlamına **gelmez**.

Üniversite ER örneği (Şekil 2.6, slayt 20–21):

1. `Öğrenci–Kayıt–Bölüm`: N:1.
2. `Bölüm–İçerir–Ders`: 1:N.
3. `Öğrenci–Alır–Ders`: M:N.

**Tekrar alınan ders istisnası (slayt 22):** `Alır` ilişkisinden çıkan `OgrenciDers` ara tablosunda `{Ogno,DersID}` anahtarı, aynı ders farklı yılda/dönemde tekrar alınabiliyorsa yeterli değildir. `{Ogno,DersID,yıl,Donem}` gibi bir bileşik anahtar kullanılır. Bu genişletilmiş örnek, slaytın kitaptan ayrı oluşturduğunu açıkça belirttiği açıklamadır.

## ER diyagramından ilişkisel şemaya dört dönüşüm kuralı (slayt 23–28)

| Kural       | Dönüşüm                                                                       | Örnek                                              |
| ----------- | ----------------------------------------------------------------------------- | -------------------------------------------------- |
| **Kural 1** | Güçlü varlık → tablo; nitelikler → sütun; anahtar nitelik → PK                | `Ogrenci(OgrenciNo PK, Ad, Soyad)`                 |
| **Kural 2** | 1:N ilişki → **1 tarafının PK'si N tarafında FK** olur                        | `Ogrenci.BolumID` → `Bolum.BolumID`                |
| **Kural 3** | M:N ilişki → iki varlığın anahtarlarını içeren **ara tablo (junction table)** | `OgrenciDersKayit(OgrenciNo,DersKodu,KayitTarihi)` |
| **Kural 4** | Çok değerli nitelik → asıl varlığın PK'sini FK olarak alan **ayrı tablo**     | `OgrenciTelefon(OgrenciNo,TelefonNo)`              |

**Kural 2 örneği:** `Bolum` tablosunun `BolumID` anahtarı `Ogrenci` tablosuna FK olarak eklenir. Ali ile Zeynep'in bölümü 10; Can'ınki 11; Elif'in değeri NULL'dır (slayt 25). Başka tabloda olmayan dolu bölüm numarası girilemez.

**Kural 3 örneği:** Bir öğrenci iki ders alabilir ve bir dersi birden fazla öğrenci alabilir. Bu yüzden ara tablo gereklidir. Basit örnekte `{OgrenciNo,DersKodu}` **bileşik birincil anahtar**dır (slayt 26).

**Kural 4 örneği:** `OgrenciTelefon` tablosunda `{OgrenciNo,TelefonNo}` birleşimi anahtardır; bir öğrenciye ait birden çok telefon ayrı satırlarda saklanır (slayt 27).

## Veri türleri (slayt 30–33)

Veri türü bir sütunun biçimini, depolama özelliklerini ve uygulanabilecek işlemleri belirler.

| Tür                           | Özellik                                                       | Kullanım       |
| ----------------------------- | ------------------------------------------------------------- | -------------- |
| `CHAR(n)`                     | Sabit uzunluklu metin                                         | Ülke kodu      |
| `VARCHAR(n)`                  | En fazla n karakterlik değişken uzunluk                       | Ad, adres      |
| `TEXT`                        | Uzun metin                                                    | Makale, yorum  |
| `INTEGER / INT`               | Tam sayı                                                      | ID, adet       |
| `DECIMAL(p,s) / NUMERIC(p,s)` | **Kesin ondalık**, p toplam basamak, s virgül sonrası basamak | Para, maaş     |
| `FLOAT / DOUBLE`              | **Yaklaşık ondalık**                                          | Bilimsel ölçüm |
| `DATE`                        | Tarih                                                         | Doğum tarihi   |
| `TIMESTAMP / DATETIME`        | Tarih ve saat                                                 | Kayıt zamanı   |
| `BOOLEAN`                     | Mantıksal değer                                               | Aktif/pasif    |
| `BLOB`                        | İkili veri                                                    | Resim          |

**Neden fiyat için DECIMAL?** Parasal hesaplar kesin ondalık saklama ister; FLOAT/DOUBLE yaklaşık temsildir. Ek açıklama: CHAR/VARCHAR fiziksel saklama ayrıntıları VTYS'ye göre değişir; ders temel farkı anlatır.

## Anahtar türleri (slayt 34–35)

**Süper anahtar (Super Key):** Satırı benzersiz tanımlayan sütun kümesi; `{OgrenciNo}` ve `{OgrenciNo,Ad}` örnektir.

**Aday anahtar (Candidate Key):** _Minimal_ süper anahtar; herhangi bir sütun çıkarılırsa benzersizliği kaybeder. `{OgrenciNo,Ad}`, `OgrenciNo` zaten yeterliyse aday anahtar değildir. `{OgrenciNo}` ve `{TCKimlikNo}` iki aday olabilir.

**Birincil anahtar (Primary Key):** Adaylar arasından seçilen ana tanımlayıcı. **Alternatif anahtar (Alternate Key):** Seçilmeyen diğer adaylar. **Bileşik anahtar (Composite Key):** İki veya daha fazla sütundan oluşan anahtar; `{OgrenciNo,DersKodu}`.

## Bütünlük kısıtları (slayt 36–37)

| Kısıt         | Görev                                        |
| ------------- | -------------------------------------------- |
| `NOT NULL`    | NULL değeri engeller                         |
| `UNIQUE`      | Tekrarlanan değerleri engeller               |
| `PRIMARY KEY` | Benzersiz ve boş olmayan satır kimliği       |
| `FOREIGN KEY` | Referanslanan anahtar ile ilişkisel bütünlük |
| `CHECK`       | Mantıksal koşul, ör. `fiyat > 0`             |
| `DEFAULT`     | Değer verilmezse varsayılan değer atar       |

**Üç savunma mekanizması:** Veri türü doğru formatı, anahtar benzersizlik ve ilişkiyi, kısıt geçerli değerleri korur. Bunların SQL ifadeleri dersin 4. haftasında incelenecektir.

## Hatırlama soruları

1. İlişki, nitelik, teta ve alanı Öğrenciler tablosuyla açıklayabilir misin?
2. Kardinaliteyi çapraz okuyarak 1:N ilişkide FK'nin hangi tarafa ekleneceğini nasıl bulursun?
3. `{OgrenciNo,Ad}` neden süper anahtar olduğu hâlde aday anahtar olmayabilir?

Kaynak: _Modern Veritabanı Yönetim Sistemleri_, Hafta 2, fiziksel PDF sayfaları 6–41. Slaytlarda belirtilen kitap sayfaları dersin atıflarıdır; kitabın kendisi bu çalışma için ayrıca incelenmemiştir.
