## Normalizasyonun amacı ve anomaliler

**Normalizasyon**, ilişkisel tabloları **veri tekrarını (redundancy)** azaltmak ve **veri bütünlüğünü** iyileştirmek amacıyla düzenleme sürecidir (slayt 6). Büyük bir tabloda birden fazla konunun bilgileri saklanırsa aynı gerçek tekrar eder ve işlemler anomalilere neden olur.

**DersKayit örneği (slayt 7–8):** `OgrNo=101`, `Ali Yilmaz`, `Bilgisayar Müh.` kayıtları öğrencinin CS101 ve CS102 dersleri için tekrarlanır.

- **Güncelleme anomalisi:** Ali'nin soyadı değişince ilgili tüm kayıtlar güncellenmelidir; birinin unutulması tutarsızlık yaratır.
- **Ekleme anomalisi:** Henüz derse kayıt yaptırmamış öğrenci, mevcut birleşik tasarımda tek başına eklenemez.
- **Silme anomalisi:** Can Demir tek dersi EE205'ten ayrılırsa o satırla birlikte öğrenci bilgileri de silinebilir.

## Normal formlar: 1NF, 2NF ve 3NF (slayt 10–20)

Her normal form bir öncekinin koşullarını içerir.

### 1NF — Birinci Normal Form

**Dersin kuralı:** Her hücrede **atomik değer** bulunmalı, tablonun **birincil anahtarı** olmalıdır. Slayt 11'de `OgrTamAd="Ali Yilmaz"` hem ad hem soyad içerdiği için `OgrAd` ve `Soyad` olarak ayrılır. Slayt 12'deki tablo atomik değerlere sahiptir; ancak öğrenci ve ders bilgileri hâlâ tekrarlanır.

**Ek açıklama:** Atomiklik, alanın uygulamadaki anlamına bağlıdır. Her isim-soyisim alanının her durumda zorunlu olarak ikiye bölünmesi genel bir 1NF teoremi değildir. Dersin örneği bu ayrımı tasarım kararı olarak kullanır.

### 2NF — İkinci Normal Form

**Kural:** Tablo 1NF'te olmalı; anahtar olmayan bütün nitelikler **birincil anahtarın tamamına fonksiyonel olarak bağımlı** olmalıdır. Bileşik anahtar `{OgrNo,DersKodu}` iken:

- `OgrNo → OgrAd, OgrSoyad, BolumAd`
- `DersKodu → DersAdi`

Bağımlılıklar anahtarın yalnızca bir kısmından kaynaklandığı için **kısmi bağımlılık (partial dependency)** vardır; 2NF ihlal edilir. Çözüm:

```text
Ogrenci(OgrNo PK, OgrAd, OgrSoyad, BolumAd)
Ders(DersKodu PK, DersAdi)
OgrenciDers(OgrNo PK/FK, DersKodu PK/FK)
```

Slayt 15'teki Ogrenci gösteriminde `BolumAd` geçici olarak gösterilmez; metin bu niteliğin öğrenciye bağlı olduğunu ve sonraki aşamada geri alındığını belirtir.

### 3NF — Üçüncü Normal Form

**Dersin kuralı:** 2NF sağlanmalı; anahtar olmayan nitelikler arasında **geçişli bağımlılık (transitive dependency)** kalmamalıdır.

`OgrNo → BolumAdi → FakulteAdi`: Fakülte adı öğrenci numarasından doğrudan değil, bölüm üzerinden belirlenir. Sonuç güncelleme anomalisidir. Slayt 19'daki ayrıştırma:

```text
Ogrenci(OgrNo PK, OgrAd, OgrSoyad, BolumID FK)
Bolumler(BolumID PK, BolumAdi, FakulteAdi)
```

Artık fakülte bilgisi öğrenci başına tekrar etmez. **Ek açıklama:** `FakulteAdi` birden çok bölüm kaydında hâlâ yinelenebilir; ayrı fakülte varlığına ihtiyaç olup olmadığı ek iş kurallarına bağlıdır. Ders bu aşamayı kendi örneği için yeterli kabul eder.

| Form    | Temel koşul                           | Tipik ihlal                            | Çözüm                        |
| ------- | ------------------------------------- | -------------------------------------- | ---------------------------- |
| **1NF** | Atomik değerler ve PK (ders anlatımı) | `OgrTamAd` birleşik alan               | `OgrAd` ve `Soyad`           |
| **2NF** | Kısmi bağımlılık yok                  | `DersAdi`, yalnızca `DersKodu`na bağlı | Ogrenci / Ders / OgrenciDers |
| **3NF** | Geçişli bağımlılık yok                | `OgrNo→BolumAdi→FakulteAdi`            | Bolumler tablosu             |

## Denormalizasyon: performans ödünleşimi (slayt 22–24)

Normalizasyon sonrasında bilgi farklı tablolara dağılır ve bazı sorgularda çok sayıda **JOIN** gerekir. Özellikle yüksek okuma trafiğinde JOIN maliyeti önem kazanabilir.

**Denormalizasyon**, okuma performansını artırmak için **kontrollü ve bilinçli veri tekrarına izin verme** işlemidir; bir tasarım hatası olarak sunulmaz.

**“Siparişlerim” örneği:** Normalize tasarımda `SiparisDetay` ile `Urunler` birleştirilerek ürün adı alınır. Denormalize tasarımda sipariş oluşturulurken ürün adı `SiparisDetay` içine de kopyalanır; o ekran için JOIN gerekmeyebilir.

**Trade-off (ödünleşim):** Okuma hızı kazanılır; yazma sırasında yinelenen bilgiyi yönetme maliyeti ve tutarsızlık riski artar. Her JOIN'in mutlaka yavaş olduğu veya her denormalizasyonun mutlaka hızlandırdığı varsayılmamalıdır.

## Uygulamalı örnek: Öğrenci–Danışman–Proje (slayt 26–29)

Başlangıç `OgrNo, Danismanlar, Projeler, DanismanOfis` tablosunda çoklu danışman ve proje listeleri tek hücrelerde saklanır. Öğrenci 101'in danışmanları A. Yilmaz ve B. Kaya; projeleri Proje A ve Proje B'dir.

1. **1NF:** Danışman–proje kombinasyonları ayrı satırlara açılır; birincil anahtar `{OgrNo,Danisman,Proje}`. 101 için 4 kombinasyon oluşur. B. Kaya için ofis değeri örnekte NULL'dır.
2. **2NF:** `Danisman → DanismanOfis` bağımlılığı bütün bileşik anahtara değil, yalnızca danışman bileşenine dayanır. `Danisman(Danisman,DanismanOfis)` ve `OgrenciDanismanProje(OgrNo,Danisman,Proje)` tabloları oluşturulur.
3. **3NF:** Mevcut iş kurallarıyla görünür geçişli bağımlılık yoktur; slayt tabloların 3NF ve **BCNF (Boyce–Codd Normal Form)** koşullarını sağladığını belirtir.

**Önemli varsayım:** Her öğrencinin yalnızca tek danışmanı olsaydı `OgrNo → Danisman` olurdu. `OgrNo`, üçlü ilişkinin süper anahtarı olmadığından BCNF ihlal edilebilirdi (slayt 29). Normal form analizi iş kurallarına dayanır.

## Kitapta bulunmayan ek örnek: 0NF'den 4NF'e (slayt 31–40)

Bu kısım **ders slaytlarına eklenmiştir, kitapta yoktur**. Öğretim üyesinin numarası, adı, bölümü, verdiği dersler ve bildiği yabancı diller saklanır. Temel varsayım: **Diller, derslerden bağımsızdır.**

### 0NF → 1NF

`HocaKayit` başlangıcında `Dersler` ve `Diller` liste hâlinde; ders kodu ile adı da aynı hücrededir. Listeler ayrı satırlara açılır, `DersKodu` ve `DersAdi` ayrılır.

Bir hoca 2 ders veriyor ve 2 dil biliyorsa **2 × 2 = 4** satır yazılır; örneğin ilk 3 hoca kaydı toplam 9 satıra dönüşür. Anahtar `{HocaNo,DersKodu,Dil}`.

### 1NF → 2NF

`HocaNo → HocaAd,BolumKod,BolumAd` ve `DersKodu → DersAdi` kısmi bağımlılıktır. Tablolar:

```text
Hoca(HocaNo, HocaAd, BolumKod, BolumAd)
Ders(DersKodu, DersAdi)
HocaDersDil(HocaNo, DersKodu, Dil)
```

### 2NF → 3NF / BCNF

`HocaNo → BolumKod → BolumAd` geçişli bağımlılığı kaldırılır. `Bolum(BolumKod,BolumAd)` ayrı tablo olur; Hoca tablosunda `BolumKod FK` kalır. Dersin varsayımlarına göre bu aşamadaki tablolar BCNF'tedir (slayt 36).

### BCNF neden yetmiyor? MVD ve 4NF

`HocaDersDil` içinde bir öğretim üyesinin **ders kümesi** ile **dil kümesi** birbirinden bağımsızdır:

- `HocaNo ↠ DersKodu`
- `HocaNo ↠ Dil`

Bunlara **çok değerli bağımlılık (multivalued dependency, MVD)** denir. **Fonksiyonel bağımlılık** `X→Y` tek değeri belirlerken, MVD `X↠Y` diğer niteliklerden bağımsız bir değerler kümesini belirtir.

**4NF kuralı (ders):** Tablo BCNF'te olmalı; her önemsiz olmayan `X↠Y` için X bir **süper anahtar** olmalıdır. `HocaNo`, `HocaDersDil` içinde tek başına süper anahtar değildir; 4NF ihlali vardır.

**Çözüm:** `HocaDers(HocaNo,DersKodu)` ve `HocaDil(HocaNo,Dil)` ayrı tutulur. Örnekte 9 birleşik satır yerine iki tabloda 5'er ilişki bulunur. Bir hocaya İspanyolca eklemek için tek HocaDil satırı yeter; ders kaydının silinmesi dil bilgisini silmez. İki tablo `HocaNo` ile JOIN edilince, **bağımsızlık varsayımı altında**, önceki dokuz kombinasyon kayıpsız geri elde edilir.

**Nihai beş tablo:** `Bolum`, `Hoca`, `Ders`, `HocaDers`, `HocaDil` (slayt 40).

## Sınav hazırlığı: kendini yokla

- Güncelleme, ekleme ve silme anomalilerini DersKayit örneğinden açıklayabilir misin?
- Kısmi ve geçişli bağımlılık arasındaki fark nedir?
- BCNF'te olan HocaDersDil neden 4NF'te değildir?
- Denormalizasyon okuma performansı ile bütünlük arasında nasıl ödünleşim oluşturur?

**Kaynak:** _Modern Veritabanı Yönetim Sistemleri_, Prof. Dr. Özal Yıldırım, Hafta 3, fiziksel PDF sayfaları 6–44.
