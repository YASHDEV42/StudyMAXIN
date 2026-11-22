## Veritabanlarının stratejik önemi

Veri, tek başına değer üreten bir kaynak değildir. **Veritabanı yönetim sistemleri (VTYS)** veriyi düzenler, güvenilir biçimde saklar, sorgulatır, analiz etmeyi mümkün kılar ve karar süreçlerini destekler. Bu nedenle veritabanı **pasif bir depo değil, stratejik bir bileşendir** (slayt 6–9). Başlıca katkıları verimlilik, karar desteği ve inovasyondur.

- **Sağlık:** Hasta geçmişi, laboratuvar sonuçlarına hızlı erişim, anonimleştirilmiş araştırma verileri.
- **Finans:** Çok sayıda işlemin güvenilir kaydı ve işlem yönetimi.
- **Eğitim, lojistik, e-ticaret:** Öğrenci kayıtları, tedarik zinciri takibi, kullanıcı davranışı analizi.

Veritabanları ekonomik, toplumsal ve etik boyutları olan sistemlerdir.

## Veritabanı modellerinin tarihsel gelişimi

Model değişimlerinin ana nedeni, önceki sistemlerin sınırlılıkları ve yeni ihtiyaçlardır (slayt 11–20).

| Dönem     | Model                           | Güçlü yön                                                                 | Temel sorun veya değişim nedeni                            |
| --------- | ------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------- |
| İlk dönem | Dosya tabanlı sistemler         | Basit saklama                                                             | Tekrar, tutarsızlık, bütünlük ve ilişki yönetiminde güçlük |
| 1960'lar  | Hiyerarşik model (IBM IMS)      | Ağaç yapısında önceden belirli yollara hızlı erişim                       | Çoka-çok ilişkileri sınırlı biçimde temsil eder            |
| 1960'lar  | Ağ modeli                       | Bir çocuğun birden çok ebeveyni olabilir                                  | Erişim yolları önceden katı biçimde tanımlanır             |
| 1970'ler  | İlişkisel model (Edgar F. Codd) | Tablolar, fiziksel ayrıntılardan soyutlama, SQL                           | Nesne yönelimli nesnelerle eşleme gereksinimi              |
| 1990'lar  | OODBMS ve ORDBMS                | Nesneleri doğrudan saklama veya ilişkisel modele nesne özellikleri ekleme | OODBMS yaygınlaşamadı                                      |
| 2000'ler  | NoSQL                           | Büyük ölçek ve çeşitli veri yapılarına yönelik model ailesi               | Kullanım amacına göre uygun model seçimi gerekir           |

**Hiyerarşik modelde** kayıtlar ebeveyn–çocuk ağacı oluşturur; örnekte Elektronik → Televizyon → LCD. **Ağ modelinde** Departman B, Proje 1 ve Proje 2 ile ilişkilendirilebilir. Her ikisinde önceden tanımlı erişim yolları esnekliği azaltır (slayt 13–14).

## İlişkisel model, SQL ve anahtarlar

İlişkisel model veriyi matematiksel ilişkiler olarak tablolarda sunar. Kullanıcı verinin fiziksel konumunu bilmeden, **SQL (Structured Query Language)** gibi yüksek seviyeli ve bildirimsel bir dille ne istediğini ifade eder. Sistem erişimin nasıl gerçekleştirileceğini üstlenir.

Slayt 16'daki **Öğrenci** tablosunda `öğrencino` bir **primary key (birincil anahtar)** olarak her öğrenciyi benzersiz tanımlar. **Dersler** tablosundaki `öğrencino` ise **foreign key (yabancı anahtar)** olarak öğrenciyle ilişki kurar. 17532 numaralı öğrencinin BL44 ve BL13 dersleri vardır. Anahtarların ayrıntısı sonraki haftanın kapsamındadır.

**Nesne-ilişkisel empedans uyuşmazlığı:** Java/C++ nesnelerindeki kalıtım ve metotlarla, tablolardaki satır-sütun yapısı arasında dönüşüm gereksinimidir.

- **OODBMS (Nesne Tabanlı VTYS):** Nesneleri doğrudan saklamayı hedefler; ilişkisel sistemlerin ve SQL'in yaygınlığı nedeniyle sınırlı benimsenmiştir.
- **ORDBMS (Nesne-İlişkisel VTYS):** İlişkisel tabana nesne özellikleri ekler. PostgreSQL'in kullanıcı tanımlı türleri ve kalıtım desteği örnektir.

## NoSQL model ailesi

NoSQL, slaytta **“Not Only SQL”** olarak açıklanır; tek bir veri modeli değildir.

| Model         | Örnek     | Ayırt edici özellik                                                        |
| ------------- | --------- | -------------------------------------------------------------------------- |
| Doküman       | MongoDB   | Esnek JSON benzeri belgeler                                                |
| Anahtar-değer | Redis     | Anahtar/değer çiftleriyle hızlı okuma-yazma                                |
| Sütun ailesi  | Cassandra | Büyük veri kümelerinde yatay ölçeklenebilirlik ve yüksek yazma performansı |
| Graf          | Neo4j     | Sosyal ağ ve öneri sistemleri gibi ilişki odaklı yapılar                   |

Bu modellerin daha ayrıntılı anlatımı ders planında 7. haftaya bırakılmıştır (slayt 19).

## Güncel kullanım ve hibrit çözümler

Sosyal medya, mobil uygulamalar, yapay zekâ ve IoT; metin, sayı, fotoğraf, video, coğrafi koordinat ve sensör ölçümü gibi çeşitli veri türleri üretir. Bu nedenle **hibrit / çok modelli çözümler** önem kazanır (slayt 22–24).

- **Akıllı şehir:** Trafik sensörlerinin zaman serisi verileri ile konum tabanlı bildirimleri birlikte işlemek için zaman serisi veritabanları ve coğrafi bilgi sistemleri kullanılabilir.
- **Yapay zekâ destekli öneri:** Kullanıcı etkileşimlerini vektörlerle temsil ederek anlamsal benzerlik sorguları yapan vektör veritabanları kullanılabilir.

Temel beklentiler **esneklik, ölçeklenebilirlik, uyarlanabilirlik**tir.

## Veri, enformasyon, kapsamlı bilgi, bilgelik: DIKW

**Veri (Data):** İşlenmemiş ve bağlamdan bağımsız değerler. `42` tek başına neyi ölçtüğünü açıklamaz.

**Enformasyon (Information):** Bağlam kazandırılmış ve anlamlandırılmış veri. Kim, ne, nerede, ne zaman sorularını yanıtlar.

**Kapsamlı bilgi (Knowledge):** Enformasyonun deneyim ve kurallarla yorumlanması; nasıl sorusuna yanıt arar.

**Bilgelik (Wisdom):** Bilginin etik ve sezgiyle değerlendirilmesi; neden ve ne yapılmalı sorularıyla ilgilidir.

Slayt 28–29'daki Elazığ deprem sensörü kaydı: `40, "Kuzey", 38.6739, 39.2225, "2025-10-01 06:30"`. **Bağlam** eklendiğinde bunlar derinlik (40 km), yön (Kuzey), koordinatlar ve ölçüm zamanı olarak yorumlanır. Veritabanı ağırlıklı olarak **veriden enformasyona geçişi** destekler; bilgeliği otomatik olarak üretmez.

Slayt 31, büyük dil modellerini DIKW katmanları üzerinden kavramsal olarak ele alır. **RAG (Retrieval Augmented Generation)** mimarisinde model, yanıt üretmeden önce ilgili bilgileri bir veritabanından, örneğin vektör veritabanından, getirebilir.

## Metadata (üstveri)

Metadata, **veri hakkındaki veridir**: Alan adlarını, veri türlerini, biçimleri ve kısıtları tanımlar (slayt 32). Sensör örneğinde:

| Alan            | Veri türü    | Açıklama / kısıt                        |
| --------------- | ------------ | --------------------------------------- |
| `derinlik_km`   | INTEGER      | Derinlik km; sıfırdan büyük ve NOT NULL |
| `yon`           | VARCHAR(10)  | Yön; boş olamaz                         |
| `enlem`         | DECIMAL(9,6) | −90 ile +90                             |
| `boylam`        | DECIMAL(9,6) | −180 ile +180                           |
| `zaman_damgasi` | DATETIME     | Ölçüm zamanı; örnekte UNIQUE            |

Metadata, veri tiplerinin doğru yorumlanmasını ve bütünlüğe yönelik kısıtların uygulanmasını sağlar. Bu tablodaki UNIQUE koşulu, her sisteme genellenen bir kural değil, dersin örnek koşuludur.

## Dersin devamı ve hatırlama

Ders planı (slayt 34): 2. hafta ilişkisel model ve ER; 3. hafta normalizasyon; 4. hafta SQL; 5. hafta RDBMS mimarisi ve ACID; 6. hafta transaction ve indeksleme; 7. hafta NoSQL. Sonraki haftalar bulut, büyük veri, yapay zekâ ve güvenliğe uzanır.

**Tekrar soruları (cevaplar verilmeden):** Hiyerarşik/ağ modellerinin ortak sınırlılığı nedir? İlişkisel model erişimi nasıl soyutlar? Data'yı Information'a dönüştüren unsur ve Metadata'nın görevi nedir?
