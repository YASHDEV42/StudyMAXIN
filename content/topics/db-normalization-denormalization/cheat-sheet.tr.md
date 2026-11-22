## Hafta 3 — Normalizasyon ve Denormalizasyon: Sınav Özeti

### Amaç ve anomaliler
- **Normalizasyon:** İlişkisel tabloları **veri tekrarını (redundancy) azaltmak** ve **veri bütünlüğünü artırmak** için düzenlemek.
- **Güncelleme anomalisi:** Aynı veri birden fazla satırda; birini değiştirmeyi unutursak tutarsızlık.
- **Ekleme anomalisi:** Ders almayan öğrenciyi birleşik kayıt tablosuna ekleyememe.
- **Silme anomalisi:** Öğrencinin tek ders kaydını silince öğrenci bilgisini de kaybetme.
- Örnek: Ali Yilmaz'ın adının ve bölümünün CS101 ve CS102 satırlarında tekrar etmesi (slayt 7–8).

### Normal form karşılaştırması
| Seviye | Koşul | İhlal örneği | Çözüm |
| --- | --- | --- | --- |
| **1NF** | Atomik değer + PK (slayt anlatımı) | `OgrTamAd="Ali Yilmaz"` | `OgrAd` ve `Soyad` olarak ayır |
| **2NF** | 1NF + anahtarın **tamamına** bağımlılık | `DersKodu→DersAdi`, anahtar `{OgrNo,DersKodu}` | `Ogrenci`, `Ders`, `OgrenciDers` |
| **3NF** | 2NF + **geçişli bağımlılık yok** | `OgrNo→BolumAdi→FakulteAdi` | `Ogrenci` ile `Bolumler` tablolarını ayır |
| **4NF** | BCNF + her önemsiz olmayan MVD'nin belirleyeni süper anahtar | `HocaNo↠DersKodu`, `HocaNo↠Dil` | `HocaDers` ve `HocaDil` ayrı |

**Partial Dependency (kısmi bağımlılık):** Anahtar olmayan nitelik **bileşik anahtarın bir kısmına** bağlıdır. **Transitive Dependency (geçişli bağımlılık):** Anahtar → anahtar olmayan nitelik → başka anahtar olmayan nitelik.

**2NF neden bileşik anahtarda önemlidir?** Tek sütunlu anahtarın uygun bir alt parçası olmadığı için kısmi bağımlılık problemi doğmaz (dersin basitleştirilmiş anahtar anlatımı).

### Denormalizasyon
- **Tanım:** Sorgu hızını artırmak için veri tekrarına **bilinçli ve kontrollü izin verme**.
- **Gerekçe:** Çok sayıda tabloyu JOIN etmenin yoğun okuma trafiğinde maliyet oluşturabilmesi.
- **Siparişlerim örneği:** Ürün adını `Urunler` ile JOIN etmek yerine sipariş sırasında `SiparisDetay` içine kopyalamak.
- **Ödünleşim:** Daha hızlı okuma ↔ daha karmaşık yazma, tekrarlı veri ve tutarsızlık riski.

### Öğrenci–Danışman–Proje (kitaptaki uygulama)
1. **0NF:** `Danismanlar` ve `Projeler` listeleri tek hücrede.
2. **1NF:** Her danışman–proje kombinasyonu ayrı satır, PK `{OgrNo,Danisman,Proje}`.
3. **2NF:** `Danisman→DanismanOfis` kısmi bağımlılığı kaldır; `Danisman` ve `OgrenciDanismanProje` tablolarına böl.
4. **3NF / BCNF:** Mevcut varsayımlarda ek geçişli bağımlılık görünmüyor.
- **BCNF uyarısı:** Her öğrencinin tek danışmanı olsaydı `OgrNo→Danisman` oluşur; `OgrNo` bu tabloda süper anahtar olmadığı için BCNF bozulabilir (slayt 29).

### Ek örnek (kitapta yok): HocaKayit, 0NF → 4NF
- **Varsayım:** Öğretim üyesinin dilleri, verdiği derslerden **bağımsız**.
- **0NF:** Ders ve dil listeleri hücrelerde; ders kodu ile ders adı birlikte.
- **1NF:** Listeleri kombinasyon satırlarına aç; 101 için 2 ders × 2 dil = **4 satır**. Genel 3 başlangıç satırı → **9 satır**. PK `{HocaNo,DersKodu,Dil}`.
- **2NF:** `HocaNo→HocaAd,BolumKod,BolumAd`; `DersKodu→DersAdi`. Ayrı `Hoca`, `Ders`, `HocaDersDil`.
- **3NF:** `HocaNo→BolumKod→BolumAd` geçişli bağımlılığını ayır; `Bolum` tablosunu oluştur. Sonuç mevcut kurallarla **BCNF**.
- **4NF:** İki bağımsız MVD: `HocaNo↠DersKodu`, `HocaNo↠Dil`. `HocaNo`, birleşik tabloda süper anahtar değil; `HocaDersDil` iki tabloya ayrılır.
- **4NF sonrası:** `HocaDers` **5 satır**, `HocaDil` **5 satır**. `HocaNo` ile JOIN eski **9** satırı kayıpsız geri üretir (bağımsızlık varsayımı).
- **Nihai beş tablo:** `Bolum`, `Hoca`, `Ders`, `HocaDers`, `HocaDil`.

### Sınav için kilit sorular
1. Üç anomali DersKayit üzerinde nasıl ortaya çıkar?
2. `{OgrNo,DersKodu}` için `DersAdi` neden 2NF ihlalidir?
3. `OgrNo→BolumAdi→FakulteAdi` hangi formu bozar?
4. Neden BCNF, iki bağımsız çok değerli bilginin birleştiği tabloda tekrar sorununu çözmeyebilir?
5. Denormalizasyon ne kazanır, neyi riske atar?

**Kaynak:** Hafta 3, PDF sayfaları 6–44; 0NF–4NF öğretim üyesi örneği slayt 31–40'ta açıkça **kitap dışı ek örnek** olarak işaretlidir.
