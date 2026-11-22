## Hafta 5: RDBMS Mimarisi ve ACID

**RDBMS (İlişkisel Veritabanı Yönetim Sistemi)** yalnızca tabloları saklamaz: çok kullanıcılı erişim, güvenlik, veri bütünlüğü, yedekleme/kurtarma ve SQL sorgularının verimli yürütülmesini sağlar (slayt 6).

## Veritabanı sistem mimarileri (slayt 7–11)

Veritabanı ekosisteminde üç mantıksal bileşen vardır: **Sunum katmanı (Presentation)**, **Uygulama/İş mantığı katmanı (Application)**, **Veri katmanı (Data)**.

| Mimari                      | Yerleşim ve erişim                                              | Avantaj / sorun                                                                             |
| --------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **1-Tier (tek katmanlı)**   | Arayüz, uygulama, VT aynı makinede                              | Basit kişisel uygulama, paylaşım ve çok kullanıcı sınırlı; örnek Access/SQLite masaüstü     |
| **2-Tier (istemci–sunucu)** | İstemcide sunum+iş mantığı; doğrudan VT sunucusuna SQL gönderir | Merkezi veri ve çok kullanıcı; her istemcide güncelleme ihtiyacı, güvenlik/performans riski |
| **3-Tier (üç katmanlı)**    | Tarayıcı → uygulama sunucusu → RDBMS                            | İş mantığı sunucudadır; ayrıştırma, güvenlik ve uygulama sunucularıyla ölçekleme            |

**Slayt 7'nin diyagramı** veri tabanına kimin bağlandığını gösterir: 2-Tier'da istemciler doğrudan, 3-Tier'da yalnızca uygulama katmanı. Slayt 10'daki modern web örneği Node.js, Java, Python veya .NET uygulama sunucusu kullanabilir.

**Ek açıklama:** Bu, mantıksal katman ayrımıdır; her katmanın fiziksel olarak ayrı makinede olması zorunlu değildir.

## RDBMS iç mimarisi (slayt 13–18)

RDBMS iki ana bileşenden oluşur:

- **Sorgu İşleyici (Query Processor):** SQL'i anlar, yürütme planını oluşturur ve çalıştırır; sistemin “beyni”.
- **Depolama Motoru (Storage Engine):** Verinin disk ve bellekte fiziksel yönetimini üstlenir; sistemin “elleri”.

### SQL sorgusunun yolculuğu

`SQL → Ayrıştırıcı (Parser) → İyileştirici (Optimizer) → Yürütücü (Executor) → Depolama Motoru → Sonuç`

1. **Ayrıştırıcı (Parser):** Sözdizimini ve anlamsal geçerliliği denetler. `SELEC` hatalıdır; tablo/sütun gerçekten var mı kontrol eder.
2. **İyileştirici (Optimizer):** Tablo büyüklüğü ve veri dağılımı gibi istatistiklerden yararlanır; JOIN sırası, algoritma ve indeks seçimini maliyet tahminiyle belirleyip **yürütme planı (execution plan)** oluşturur.
3. **Yürütücü (Executor):** Planı çalıştırır; veriyi Depolama Motoru'ndan alır, birleştirme/sıralama/gruplama yapar, sonuç kümesini istemciye döndürür.

Bu ayrım, SQL'in **bildirimsel** olmasının pratik karşılığıdır: “ne”yi kullanıcı, “nasıl”ı iyileştirici seçer.

### Depolama motorunun dört yöneticisi

| Yönetici                                                 | Görev                                                                                    |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **İşlem Yöneticisi (Transaction Manager)**               | COMMIT/ROLLBACK ve ACID işlemlerini yönetmek                                             |
| **Kilit Yöneticisi (Lock Manager)**                      | Eşzamanlı erişimi düzenlemek; satır/sayfa/tablo kilitleri                                |
| **Arabellek/Önbellek Yöneticisi (Buffer/Cache Manager)** | Sık kullanılan sayfaları RAM içindeki **buffer pool**'da tutarak disk erişimini azaltmak |
| **Dosya ve Erişim Yöneticisi (File and Access Manager)** | Veri, indeks ve log dosyalarında fiziksel okuma/yazma                                    |

**Arabellek neden hızlandırır?** Disk erişimi RAM erişiminden çok daha yavaştır; ihtiyaç duyulan veri sayfası buffer pool'daysa diskten yeniden okumaya gerek kalmayabilir.

**Ek açıklama:** Bazı modern VTYS'ler kilitlere ek olarak MVCC gibi eşzamanlılık mekanizmaları kullanır. Slayt genel mimariyi özetler.

## Dört popüler RDBMS (slayt 20–27)

| Sistem                   | Dersin vurguladığı özellikler                                                                          | Örnek proje seçimi                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Oracle Database**      | RAC ile yüksek erişilebilirlik; güçlü kurumsal güvenlik/analitik; ticari ve yüksek maliyet             | Görev-kritik uluslararası bankacılık         |
| **MySQL**                | LAMP/WordPress/CMS ekosistemi, kolaylık ve okumaya yönelik kullanım; InnoDB ACID; Community/Enterprise | Kişisel blog / küçük işletme web sitesi      |
| **Microsoft SQL Server** | Windows, .NET, Azure, Active Directory; SSMS/SSIS/SSAS/SSRS; Express ve ticari sürümler                | .NET tabanlı Windows ERP / BI                |
| **PostgreSQL**           | Açık kaynak, standartlara uyum, genişletilebilirlik, PostGIS, nesne-ilişkisel özellikler               | Coğrafi analiz startup'ı / karmaşık sorgular |

Slayt 26–27 dört senaryo verir: WordPress sitesi için **MySQL**, GIS girişimi için **PostgreSQL**, kurumsal .NET ERP için **SQL Server**, kritik bankacılık için **Oracle**. Bunlar dersin senaryo temelli tercihleri olup her sistem için mutlak performans sıralaması değildir.

## Veri bütünlüğünün üç seviyesi (slayt 29–30)

**Veri Bütünlüğü (Data Integrity)** verinin doğru, tutarlı ve güvenilir kalmasını sağlayan kurallardır.

| Tür                                            | Temel garanti                            | Kısıtlar ve örnek                                        |
| ---------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| **Varlık Bütünlüğü (Entity Integrity)**        | Her kayıt benzersiz ve tanımlanabilir    | `PRIMARY KEY`; aynı kimlikle iki satırı önleme           |
| **Alan Bütünlüğü (Domain Integrity)**          | Değerler tür, biçim ve aralığa uygun     | Veri türleri, `CHECK`, `NOT NULL`; negatif fiyatı önleme |
| **İlişkisel Bütünlük (Referential Integrity)** | Tablolar arası referansların geçerliliği | `FOREIGN KEY`; olmayan öğrenciye not yazılmasını önleme  |

Bu kurallar Hafta 2'de tanımlanmış ve Hafta 4'te SQL ile uygulanmıştır.

## ACID: Transaction güvenilirliğinin dört özelliği (slayt 31–36)

**Transaction (işlem)** tek mantıksal birim olarak yürütülen operasyonlar dizisidir. Slayt 31'deki temel senaryo A hesabından B'ye **100 TL transferi**: A'dan 100 TL azalt, B'ye 100 TL ekle.

| Özellik                          | Tanım                                                                                   | Banka örneği                                                            |
| -------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **A — Atomicity (Atomiklik)**    | Ya hep ya hiç; başarısızlıkta işlemin değişiklikleri geri alınır                        | B'ye yatırma başarısızsa A'dan çekilen para iade edilir                 |
| **C — Consistency (Tutarlılık)** | Bir tutarlı durumdan başka tutarlı duruma geçer; bütünlük kuralları korunur             | Toplam bakiye değişmez, tanımlanmış PK/FK/CHECK ve iş kuralları korunur |
| **I — Isolation (İzolasyon)**    | Eşzamanlı transaction'ların birbirinin geçici durumunu uygunsuz biçimde görmesini önler | Diğer müşteri yarım transfer görmez                                     |
| **D — Durability (Kalıcılık)**   | COMMIT edilen sonuçlar arızadan sonra da korunur                                        | “Transfer tamamlandı” sonrası sunucu çökse de transfer kurtarılır       |

### Atomiklik (slayt 32)

Birinci UPDATE başarılı, ikinci UPDATE başarısızsa transaction bütün olarak geri alınır (`ROLLBACK`). Paranın A'dan çıkıp B'ye ulaşmaması önlenir.

### Tutarlılık (slayt 33)

Slaytın ayrıca verdiği **200 TL transferi**: başlangıçta Ali=1000, Zeynep=500; transferden sonra Ali=800, Zeynep=700; toplam her iki durumda da **1500 TL**. Bu örnek, atomiklikteki 100 TL senaryosundan ayrıdır.

**Ek açıklama:** VTYS tanımlanmış kısıtları denetler. Tanımlanmayan iş kurallarını kendiliğinden bilemez.

### İzolasyon (slayt 34)

Bir transfer devam ederken eşzamanlı sorguların yarım kalmış, commit edilmemiş değişiklikleri görmemesi hedeflenir. Ders “işlemler sırayla yürütülmüş gibi” açıklamasını kullanır.

**Ek açıklama:** Tam serializability her isolation level için geçerli değildir; gerçek garanti seçilen isolation level'a bağlıdır.

### Kalıcılık (slayt 35)

`COMMIT` edilen işlem sonradan oluşan elektrik kesintisi veya çökmeden sonra korunmalıdır. Genellikle **transaction log (işlem günlüğü)** kayıtları kurtarmaya yardımcı olur.

## Kapanış: Hafta 6 ile bağlantı

Slayt 40'a göre sonraki konu **Transaction Yönetimi ve İndeksleme**: TCL, banka transferinin SQL uygulaması, indeksler ve yürütme planları. Bu hafta ise odağımız mimari bileşenleri ve ACID'in mantığını anlamak.

**Kontrol soruları:** 2-Tier'ın iki temel sorunu nedir? Parser–Optimizer–Executor sırası nasıl işler? Buffer Pool neden performansı artırır? Entity/Domain/Referential Integrity hangi kısıtlarla sağlanır? ACID'in dört ilkesini banka transferiyle açıklayabilir misin?

**Kaynak:** _Modern Veritabanı Yönetim Sistemleri_, Prof. Dr. Özal Yıldırım, Hafta 5, fiziksel PDF sayfaları 6–40.
