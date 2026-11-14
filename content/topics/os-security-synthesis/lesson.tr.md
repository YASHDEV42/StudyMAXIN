## Bölüm kavramlarını senaryoya uygulama

Bütünleştirici sorularda her savunmanın hangi adımı zorlaştırdığını belirtin. Canary, bazı yığın bozulmalarını dönüşten önce fark eder; NX veri yürütmeyi engeller; ASLR/PIE konum tahminini güçleştirir; RELRO bağlama tablolarını korur. Birlikte savunma derinliği sağlarlar, fakat bilgi sızıntısını veya kök bellek kusurunu otomatik düzeltmezler. Gerçek etkinlik, derleme bayrakları ve ikili yapılandırmadan doğrulanmalıdır.

Yalnızca ayrıcalıklı porta bağlanacak hizmet için tüm root yetkisini vermek yerine dar capability, düşük yetkiyle başlama veya yetkiyi bağlandıktan sonra bırakma gibi seçenekleri tehdit modeline göre kıyaslayın. Konteynerde CAP_SYS_ADMIN, geniş kaynak bağları ve seccomp yokluğu yetkiyi artırır; namespace’ler tek başına tam güvenlik sınırı değildir. TPM/TEE senaryosunda ölçüm, imza doğrulaması, kurtarma sırrı, firmware ve yan kanal varsayımlarını ayırın.

Sanitizer derlemesinde görülen hata, normal derlemede görünmemesi nedeniyle yok sayılmaz. Rapor kök nedene kadar izlenir, kod düzeltilir ve regresyon testi eklenir. Eski C hizmetini kısa vadede güçlendirirken internetten erişilebilir kusurları ve yamaları önceliklendirin; derleyici korumaları, minimum izin, seccomp/MAC, günlükleme ve yedekle etkiyi azaltın. Uzun vadeli yeniden yazım planı bellek güvenli kodu değerlendirebilir.

Açık kaynak depoyu incelemek, dağıtılan ikiliyi doğrulamakla aynı değildir. Kaynak, bağımlılık, build ortamı, imzalı artifact ve tekrarlanabilirlik birlikte değerlendirilir. Genel cevap şablonu: varlık ve sınır → saldırganın önkoşulu → kök hata → olası etki → hangi savunma hangi adımı kısıtlıyor → kalan risk ve doğrulama.

Bu sentez, ağ güvenliğindeki katmanlı savunma ve uygulama güvenliğindeki girdi doğrulama ilkelerini işletim sistemi izolasyonu ve tedarik zinciri güveniyle bir araya getirir.

### Alıştırmalarda izlenecek karar mantığı

| Senaryo                                 | Gerekçe                                                                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Korunmuş sunucuda taşma                 | Canary, NX, PIE/ASLR ve RELRO farklı aşamaları zorlaştırır; bilgi sızıntısı varsayımlarını ayrıca incele.                                       |
| Yalnızca 443 portu                      | Tüm root yetkisi veren setuid yerine dar `CAP_NET_BIND_SERVICE` değerlendirilir.                                                                |
| Ayrıcalıklı konteyner                   | Gereksiz `CAP_SYS_ADMIN` kaldırılır; seccomp, user namespace ve MAC eklenir; güvenilmeyen iş yükünde VM katmanı düşünülür.                      |
| TPM ile mühürlü disk                    | Başka makine veya değiştirilmiş önyükleme beklenen PCR politikasını bozabilir; kurtarma anahtarı ve çalışma zamanı saldırıları ayrı risklerdir. |
| ASan yalnızca testte UAF buluyor        | Hata gerçektir; nesne yaşam döngüsü düzeltilir ve regresyon testi eklenir.                                                                      |
| Eski C hizmetini hızlı güçlendirme      | Önce yama ve derleyici korumaları; ardından düşük yetki, sandbox/MAC ve günlükleme; uzun vadede güvenli yeniden yazım.                          |
| Açık kaynak kod temiz ama ikili şüpheli | Build zinciri, artifact provenance ve bağımsız tekrar üretilebilirlik denetlenir; kaynak incelemesi tek başına yetmez.                          |

Bölüm sonundaki sekiz öz-sınama sorusu da aynı bağlantıları yoklar: kip ayrımı ve sistem çağrısı, taşmanın dönüş akışına etkisi, DEP/NX ile ROP/ASLR farkı, bilgi sızıntısının kanaryayı açığa çıkarması, setuid’in etkisi, konteyner/VM çekirdek sınırı, Secure Boot ile measured boot ayrımı ve derleyiciye güven sorunu. Yanıtlarken her zaman önkoşul, korunacak varlık, kök neden ve kalan risk sırasını izleyin.
