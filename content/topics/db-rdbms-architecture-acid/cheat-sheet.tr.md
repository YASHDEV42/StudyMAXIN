## Hafta 5 — RDBMS Mimarisi ve ACID: Sınav Özeti

### RDBMS ne yapar?

RDBMS tablo saklamanın yanı sıra çok kullanıcılı erişim, güvenlik, veri bütünlüğü, yedekleme/kurtarma ve SQL sorgularının verimli çalıştırılmasını sağlar.

### 1-Tier / 2-Tier / 3-Tier

| Mimari     | Yerleşim                              | Kim VT sunucusuna bağlanır? | Temel fark                                             |
| ---------- | ------------------------------------- | --------------------------- | ------------------------------------------------------ |
| **1-Tier** | UI+iş mantığı+VT tek makinede         | Yerel uygulama              | Basit kişisel sistem, ör. Access/SQLite                |
| **2-Tier** | İstemci (UI+iş mantığı) + VT sunucusu | Her istemci doğrudan        | İstemci güncelleme yükü, güvenlik ve bağlantı maliyeti |
| **3-Tier** | Sunum + uygulama sunucusu + VT        | Uygulama sunucusu           | Modern web standardı; ayrım, güvenlik, ölçekleme       |

**Akılda tut:** 3-Tier = **Browser → Application Server → Database Server**.

### RDBMS'in iç mimarisi

**Sorgu İşleyici (Query Processor) = Beyin**

1. **Ayrıştırıcı (Parser):** SQL syntax ve tablo/sütun geçerliliği.
2. **İyileştirici (Optimizer):** İstatistikler (tablo boyutu/veri dağılımı), JOIN sırası, algoritma, indeks ve tahmini maliyet üzerinden **execution plan (yürütme planı)** seçimi.
3. **Yürütücü (Executor):** Planı çalıştırır, Storage Engine'den veri ister, JOIN/sort/group işlemlerini yapar.

**Depolama Motoru (Storage Engine) = Eller**

- **Transaction Manager:** COMMIT/ROLLBACK, ACID.
- **Lock Manager:** Eşzamanlılık kontrolü, kilitler.
- **Buffer/Cache Manager:** **Buffer pool** ile disk I/O azaltma.
- **File/Access Manager:** Veri/indeks/log dosyalarının fiziksel yönetimi.

**SQL bildirimsel dil:** Kullanıcı **ne** ister, Optimizer **nasıl** çalıştırılacağını seçer.

### Dört büyük RDBMS

| Sistem         | Öne çıkan güçlü yön                                           | Dersin seçim senaryosu |
| -------------- | ------------------------------------------------------------- | ---------------------- |
| **Oracle**     | RAC, yüksek erişilebilirlik, kurumsal güvenlik, ticari lisans | Kritik bankacılık      |
| **MySQL**      | Web/LAMP/WordPress, kolay kurulum, InnoDB ACID                | Blog ve küçük site     |
| **SQL Server** | .NET, Windows/Azure, SSMS/SSIS/SSAS/SSRS                      | Windows ERP ve BI      |
| **PostgreSQL** | Açık kaynak, PostGIS, genişletilebilirlik, SQL standartları   | Coğrafi analiz         |

Bunlar _ders slaytındaki_ senaryo tercihleri; evrensel performans sıralaması değildir.

### Data Integrity (veri bütünlüğü)

| Tür                         | Garanti                          | Sağlayan                       |
| --------------------------- | -------------------------------- | ------------------------------ |
| **Entity (varlık)**         | Her satır benzersiz kimlik taşır | `PRIMARY KEY`                  |
| **Domain (alan)**           | Doğru tip, aralık ve biçim       | Veri türü, `CHECK`, `NOT NULL` |
| **Referential (ilişkisel)** | Geçerli tablolar arası referans  | `FOREIGN KEY`                  |

### ACID — dört ilke

- **A = Atomicity (Atomiklik):** Ya hep ya hiç. A'dan para çekildi, B'ye yatırılamadıysa **ROLLBACK**.
- **C = Consistency (Tutarlılık):** Tutarlı durumdan tutarlı duruma. Bütünlük ve tanımlanmış iş kuralları korunur. **200 TL örneği:** Ali 1000→800; Zeynep 500→700; toplam 1500→1500.
- **I = Isolation (İzolasyon):** Aynı anda çalışan işlemlerin geçici durumları kurallara aykırı biçimde görünmez. Dersin anlatımı: yarım transfer görülmez. Gerçek ayrıntılar isolation level'a bağlıdır.
- **D = Durability (Kalıcılık):** **COMMIT** edilmiş işlem çökmeden sonra da korunur; **transaction log** kurtarmaya yardım eder.

**Ayırt et:** **Atomicity = başarısız işlem geri alınır**; **Durability = başarılı ve commit edilmiş işlem kaybolmaz**. **Consistency** kurallarla; **Isolation** aynı anda çalışan işlemlerle ilgilidir.

### Tekrar soruları (cevapsız)

1. 2-Tier'ın iki dezavantajı ve 3-Tier'ın çözümü nedir?
2. Query Processor'ın üç aşaması hangi sıradadır?
3. Optimizer'ın kullandığı istatistikler nelerdir?
4. Buffer Pool neden disk erişimini azaltır?
5. Blog, GIS, .NET ERP ve kritik banka için slayt hangi RDBMS'yi seçer?
6. Entity/Domain/Referential Integrity hangi SQL kısıtlarıyla sağlanır?
7. ACID'in her harfini banka transferinde açıkla.

**Kaynak kapsamı:** Hafta 5, _RDBMS Mimarisi ve ACID_, PDF sayfaları 6–40. Hafta 6: Transaction Yönetimi ve İndeksleme.
