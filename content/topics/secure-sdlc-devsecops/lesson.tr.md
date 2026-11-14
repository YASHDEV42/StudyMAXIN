## Güvenliği sona bırakmanın maliyeti

Geleneksel şelale sürecinde güvenlik incelemesi ürün tamamlanmaya yakın yapılırdı. Tasarım kusuru geç bulunursa, onu kullanan kod ve süreçler çoktan oluşmuştur. Agile ve DevOps teslimatı hızlandırırken, güvenlik ayrı ve manuel son kapı olarak kalırsa geride kalabilir. Secure Software Development Life Cycle (Secure SDLC), güvenlik kararlarını gereksinim, tasarım, geliştirme, test, dağıtım ve işletime yayar.

Shift-left, güvenlik değerlendirmesini yaşam döngüsünde daha erken yapmaktır; üretim izlemesini veya dinamik testi bırakmak değildir. Tasarımda yetki modelini düzeltmek çoğu zaman üretimde ihlal sonrası yeniden kurmaktan daha kolaydır. Ancak düzeltme maliyetinin her aşamada belirli bir katsayıyla artacağı evrensel bir yasa yoktur; maliyet kusura ve kuruma bağlıdır. Kaynağın ekonomik gerekçesi yön gösterir, sabit maliyet formülü vermez.

## Tasarımda STRIDE soruları

Sistem bileşenlerini, veri akışını ve güven sınırlarını çizip her yerde “ne ters gidebilir?” diye sorun. STRIDE altı soru ailesi sağlar:

| STRIDE                 | Hedef                             | Bölümden örnek                             |
| ---------------------- | --------------------------------- | ------------------------------------------ |
| Spoofing               | Kimlik doğrulama                  | Hatalı JWT doğrulaması                     |
| Tampering              | Bütünlük                          | Mass assignment ile rol alanını değiştirme |
| Repudiation            | Hesap verebilirlik/izlenebilirlik | Kayıtsız hassas işlem                      |
| Information disclosure | Gizlilik                          | SSRF veya gereğinden fazla alan döndürme   |
| Denial of service      | Erişilebilirlik                   | XML entity şişmesi veya pahalı sorgu       |
| Elevation of privilege | Yetkilendirme                     | BFLA veya kod çalıştırma                   |

STRIDE, tehdit aramak için kontrol listesidir; doldurulmuş matris sistemin güvenli olduğunu kanıtlamaz. Her tehdit için önkoşulları, etkisini, mevcut kontrolü ve kalan riski kaydedin. Bir olay birden fazla güvenlik hedefine dokunabilir; tablo mutlak tek etiket zorunlu kılmaz.

## SAST, DAST, IAST ve SCA aynı şeyi yapmaz

| Araç | İnceleme biçimi                        | Yanıtladığı soru                          | Sınır                                                           |
| ---- | -------------------------------------- | ----------------------------------------- | --------------------------------------------------------------- |
| SAST | Uygulamayı çalıştırmadan kaynak kodu   | Kodda riskli kalıp var mı?                | Yanlış pozitif olabilir; gerçek çalışma akışını eksik görebilir |
| DAST | Çalışan uygulamaya dışarıdan istek     | Dış davranışta hangi açık görülebiliyor?  | Kaynak kodu görmez; test kapsamı önemlidir                      |
| IAST | Uygulama içindeki sensörle çalışma anı | Girdi kod içinde nereye akıyor?           | Çalıştırılan senaryolarla sınırlıdır                            |
| SCA  | Bağımlılık bileşenleri ve sürümleri    | Kullanılan paketlerde bilinen CVE var mı? | Her mantık kusurunu veya bilinmeyen açığı bulmaz                |

Log4Shell benzeri bilinen bileşen riskini SCA araştırır; kendi kodundaki enjeksiyon kalıbı SAST’a; çalışan test ortamındaki dış davranış DAST’a; çalışma anındaki veri yolu IAST’a uygundur. Araçlar farklı kör noktaları kapatır.

## CI/CD kapıları ve hattın kendisi

Her değişiklikte SAST ve secret scanning çalıştırılabilir; SCA bileşenleri tarayıp SBOM üretebilir; DAST ve IAST test ortamında devreye girebilir. Kritik bulgu dağıtımı durduran bir kapıya bağlanabilir. Eşikler ve istisna süreci açık olmalı: her uyarıyı aynı seviyede durdurmak ekipleri kontrolleri atlamaya iter, ciddi bulguyu hiç durdurmamak ise kapıyı etkisiz kılar.

CI/CD hattı üretime kod gönderme yetkisine sahip olduğundan kendi başına yüksek değerli hedeftir. Saldırgan hattı veya build aracını ele geçirirse, uygulama taramalarından geçen zararlı çıktıyı üretmeye çalışabilir. Her iş adımına en az yetki verin, sırları kasada tutun, pipeline değişikliklerini koruyun, bağımlı build araçlarını denetleyin ve kaynak/provenance kayıtlarını saklayın. SBOM ve imzalı provenance izlenebilirliği artırır; uygulamanın hatasız olduğunu tek başına ispatlamaz.

[STRIDE tehdit modellemesi](topic:threat-modeling-stride) shift-left’in erken tasarım adımıdır. [Bağımlılık güvenliği](topic:dependency-supply-chain-log4shell) SCA’yı, [sır yönetimi](topic:secrets-management-rotation) secret scanning ve vault kullanımını gerekçelendirir. Secure SDLC yalnızca araç satın almak değil; hızlı geri bildirim, ortak sorumluluk ve bulunan riskleri gerçekten düzeltme sürecidir.

**Pedagojik ek:** Her kontrolün hangi koşulu yakaladığını ve hangi kör noktası kaldığını belgeleyin. Aşama bazlı maliyet artışını kaynakta verilen ekonomik yönelim olarak okuyun; sabit matematik kuralı gibi uygulamayın.
