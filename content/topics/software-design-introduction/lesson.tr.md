## İyi yazılım neden yalnız çalışan kod değildir?

Yazılım bugün doğru çalışabilir; fakat yarın değiştirilebilmesi, 10 kat kullanıcıyı kaldırabilmesi, ekipçe anlaşılması ve arızadan toparlanabilmesi de önemlidir. Boyut (modül/veri/entegrasyon), değişim, ekip koordinasyonu ve kalite beklentileri karmaşıklığı artırır. Tasarım ve mimari karmaşıklığı yok etmekten çok yönetilebilir kılar (s. 3–4).

## Design ve Architecture

**Yazılım tasarımı**, gereksinimleri uygulanabilir çözüme dönüştüren kararlardır. Daha yerel düzeyde sınıf/nesne sorumlulukları, algoritmalar, veri yapıları, tasarım kalıpları, refactoring, soyutlama, kapsülleme, cohesion/coupling ve SOLID ile ilgilenir. **Yazılım mimarisi**, sistemin temel yapısını ve onu belirleyen önemli kararları ifade eder: servis sınırları, iletişim, veri depolama, deployment, kalite hedefleri ve platform kısıtları (s. 5–7).

Kod → bileşen → sistem düzeylerine doğru çıkıldıkça kararın etki alanı büyür (s. 8). Aradaki çizgi keskin değildir. Mimari bir kutu-ok diyagramından ibaret değildir: **Yapı + Karar + Gerekçe**. Diyagram “ne”, ADR “neden” sorusunu yanıtlar (s. 10).

**Mimari kararın üç özelliği (s. 9):** geniş etki alanı, yüksek değiştirme maliyeti, trade-off. Kısıtlar dört gruptur: iş (bütçe/süre/ekip), teknik (mevcut platform/entegrasyon), yasal (KVKK/lisans), operasyonel (bakım/gözlemlenebilirlik/SLA). Amaç soyut olarak en mükemmel değil, koşullara en uygun çözümdür (s. 11).

## Yazılım mimarının rolü

Mimarın görevi herkesten fazla teknoloji bilmek veya her kararı tek başına vermek değildir. Teknik yön verir, seçeneklerin avantaj ve maliyetlerini açıklar, ekipler arası ortak dil kurar, karar gerekçelerini korur ve uygulanabilirliği izler. Teknik lider, tasarımcı, kolaylaştırıcı, iletişimci, risk yöneticisi ve mentor rollerini üstlenebilir (s. 12–14).

PostgreSQL–MongoDB gibi seçimlerde önce verinin ilişkileri, transaction ihtiyacı, ölçek ve ekip yetkinliği sorgulanır. API için 200 ms hedefi konduğunda Backend, DevOps, QA ve ürün ekibi birlikte değerlendirme yapar (s. 15). Küçük bir uygulamayı gereksiz 15 microservice ile kurmak **overengineering** olabilir.

## Mimari kararları nasıl veririz?

Önce **iş hedefi, gereksinimler, quality attributes, kısıtlar ve riskler** belirlenir (s. 17). İşlevsel gereksinim “kullanıcı giriş yapsın”; kalite gereksinimi “giriş 500 ms'den kısa sürsün” biçiminde ayrılır.

| Quality attribute   | Sorusu                              |
| ------------------- | ----------------------------------- |
| Performans          | Ne kadar hızlı?                     |
| Ölçeklenebilirlik   | İş yükü büyürken ne kadar dayanır?  |
| Erişilebilirlik     | Gerektiğinde hizmet veriyor mu?     |
| Güvenlik            | Yetkisiz erişime ne kadar dirençli? |
| Değiştirilebilirlik | Değişiklik ne kadar kolay?          |
| Test edilebilirlik  | Doğruluğu ne kadar kolay sınanır?   |

**Trade-off (s. 19):** Redis cache gecikmeyi ve DB yükünü azaltabilir; fakat fiyat 100 TL'den 120 TL'ye yükseldiğinde eski cache değerinin silinmesi/güncellenmesi gerekir. Performans kazanımı tutarlılık ve cache invalidation maliyeti getirir.

**Alternatifler (s. 20):** Modüler monolith basit operasyon ve güçlü transaction; microservices bağımsız deployment ve dağıtık karmaşıklık; event-driven gevşek bağlılık ve eventual consistency getirebilir. Sipariş olayı stok sistemine gecikmeli ulaştığında kısa süreli durum farkı mümkündür.

## ADR — Architecture Decision Record

**Beş bileşen:** Başlık (hangi karar?), Bağlam (neden?), Seçenekler (neler değerlendirildi?), Karar (ne seçildi?), Sonuçlar (artı/eksi etkiler). Gelecekte “neden böyle yaptık?” sorusunu yanıtlayacak kadar kısa ve açıklayıcı olmalıdır (s. 21).

**ADR-003 (s. 22):** Yatay ölçeklemede tek sunucunun belleğindeki session başka sunucuda görünmeyebilir. Alternatifler: in-memory session, merkezi session store, stateless token. Slayttaki örnek karar: kısa ömürlü access token ve yenileme mekanizması. Faydası bazı ölçeklenebilirlik/erişilebilirlik ihtiyaçlarını desteklemesi; riskleri token hırsızlığı, iptal, ömür ve refresh güvenliğidir. Karar bağlama bağlıdır.

**Karar yaşam döngüsü (s. 23):** Öner → Değerlendir → Kaydet (ADR) → Uygula → Doğrula (ölç/test) → Gözden geçir. Diyagram yapıyı, ADR gerekçeyi, kod uygulamayı, test/ölçüm varsayımın sonucunu gösterir (s. 24). Belgeler gerçek koddan kopmamalıdır.

## Teknik borç (Technical Debt)

Bugün hız/kolaylık için alınan çözümün gelecekte bakım ve değişim maliyetini yükseltmesidir. **Faiz**, her değişimde ödenen ek süre ve risktir. Örnek: yaygın `user.role == admin` kontrolleri yeni roller eklendiğinde çok noktada değişiklik gerektirir (s. 25). Teknik borç her zaman kötü kod veya yanlış karar demek değildir: bilinçli ve geri ödeme planlı olabilir; kontrolsüz birikim tehlikelidir (s. 26).

**Kaynakları (s. 27):** zaman baskısı, eksik tasarım, değişen gereksinimler, bilgi eksikliği, yetersiz test, eski teknoloji.

**Belirtileri (s. 28):** küçük değişiklik çok dosyaya yayılır; hatalar tekrarlar; deploy korkutucudur; testler yavaş/kırılgandır; yeni çalışan zor anlar; “bu modüle dokunmayalım” denir.

**Faiz döngüsü (s. 29):** Borçlu yapı → yeni özellik için workaround → daha çok bağımlılık → yavaş geliştirme → yeni borç. Normalde 2 gün sürecek iş borçlu sistemde 5 gün sürüyorsa ek 3 gün faiz örneğidir. **Hotspot** hem sık değişen hem karmaşık olan bölgedir; haftalık değiştirilen orta-kötü dosya, yıllardır dokunulmayan çok-kötü dosyadan daha acil olabilir.

**Altı tür (s. 30):** kod borcu (duplication/uzun fonksiyon), tasarım borcu (yanlış sorumluluk/aşırı bağımlılık), mimari borç (uygunsuz yapı/sınırlar), test borcu (eksik/kırılgan test), dokümantasyon borcu (kaybolan kararlar), altyapı borcu (eski CI/CD/runtime/bağımlılık).

**Teknik borç matrisi (s. 31):** Bilinçli + ihtiyatlı, bilinçli + ihtiyatsız, bilinçsiz + ihtiyatlı, bilinçsiz + ihtiyatsız. Bilinçsiz borç öğrenme ve koşulların değişmesiyle de doğabilir.

**Yönetim (s. 32):** Görünür kıl → Ölç (cycle time, change failure, hotspots) → Önceliklendir (etki/olasılık/maliyet) → Azalt (refactor, upgrade, test, mimari düzenleme) → Önle (standart, review, ADR). Sıfır borç hedeflenmez; iş değerini bozmadan kontrollü tutulur.

**Refactor ne zaman? (s. 33)** Aynı bölge sık değişiyor, hata yoğunluğu yüksek, yeni özellikleri geciktiriyor veya güvenlik/performans riski oluşturuyorsa önceliklidir. Kod stabil, nadiren değişiyor, yakında kaldırılacak veya refactor riski kazancından büyükse bekleyebilir.

## Uygulama: üniversite ders kayıt sistemi

Ders kayıt haftasında **20.000 öğrenci** aynı anda giriş yapar; kontenjan aşılmamalıdır. Tartışılan ihtiyaçlar (s. 34–35): **tutarlılık** (son kontenjan), **ölçek** (ani yük), **dayanıklılık** (e-posta servisi düşerse kayıt sürer mi?), **gözlemlenebilirlik** (yavaşlık nerede?), **güvenlik** (yalnız kendi kayıtlarını değiştirme) ve **değiştirilebilirlik** (yeni kayıt kuralları).

**Bağlama göre sınıflandırma (s. 36):** fonksiyon adını değiştirmek genellikle kod/tasarım; Factory Pattern genellikle tasarım; PostgreSQL seçmek çoğu sistemde mimari; servisler arasında Kafka yüksek mimari etki; JWT ve log formatı sistem çapındaki etkisine göre mimari olabilir.

**Özet:** Mimari = yapı + karar + gerekçe. Kararı değerlendirirken etki alanı, değiştirme maliyeti ve trade-off birlikte düşünülür. Bu özet slaytın 1–40. fiziksel PDF sayfalarına dayanır; ek açıklamalar kaynak içeriğinden ayrılarak örneklendirilmiştir.
