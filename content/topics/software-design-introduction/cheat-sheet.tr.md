## Temel ayrımlar

- **Design:** yerel kararlar; sınıf/nesne sorumlulukları, algoritma, pattern, refactoring, okunabilirlik.
- **Architecture:** sistem çapında yapı, servis sınırları, iletişim, veri, deployment ve quality attributes.
- **Mimari = Yapı + Karar + Gerekçe.** Diyagram “ne?”, ADR “neden?” sorusunu cevaplar.
- **Mimari karar ölçütleri:** geniş etki + yüksek değiştirme maliyeti + trade-off.
- **Kısıtlar:** iş (bütçe/süre/ekip), teknik (mevcut sistem), yasal (KVKK/lisans), operasyonel (SLA/bakım).
- **Mimarın rolü:** ortak teknik yön, trade-off görünürlüğü, ekip iletişimi, gerekçeleri koruma; tek karar otoritesi değildir.

## Karar verme ve kalite

**Bağlam analizi sırası:** İş hedefi → Gereksinimler → Quality attributes → Kısıtlar → Riskler.

| Quality attribute   | Hatırla                    |
| ------------------- | -------------------------- |
| Performans          | Yanıt hızı/gecikme         |
| Ölçeklenebilirlik   | Kullanıcı/iş yükü büyümesi |
| Erişilebilirlik     | Gerektiğinde ayakta kalma  |
| Güvenlik            | Yetkisiz erişimi önleme    |
| Değiştirilebilirlik | Değişikliğin kolaylığı     |
| Test edilebilirlik  | Testin kolaylığı           |

**Cache trade-off:** daha düşük gecikme ve DB yükü ↔ cache invalidation + tutarlılık karmaşıklığı.

**Mimari seçenekler:** Modüler monolith → basit operasyon/güçlü transaction; microservices → bağımsız deploy/dağıtık karmaşıklık; event-driven → gevşek bağlılık/eventual consistency.

## ADR (Architecture Decision Record)

1. **Başlık:** Hangi karar?
2. **Bağlam:** Neden gerekli?
3. **Seçenekler:** Neler değerlendirildi?
4. **Karar:** Ne seçildi, neden?
5. **Sonuçlar:** Artı/eksi etkiler?

**ADR-003:** yatay ölçeklenen uygulamada in-memory session / merkezi session store / stateless token alternatifleri; örnek karar kısa ömürlü access token + yenileme. **Risk:** token çalınması, iptal, süre, refresh güvenliği.

**Yaşam döngüsü:** Öner → Değerlendir → Kaydet → Uygula → Doğrula → Gözden geçir.

**İletişim:** Diyagram = yapı; ADR = gerekçe; kod = gerçek uygulama; test/ölçüm = doğrulama.

## Teknik borç (Technical Debt)

**Tanım:** kısa vadeli kazancın uzun vadeli bakım/değişim maliyeti yaratması.
**Faiz:** her yeni değişiklikte ödenen ek süre + risk. Örnek: normal 2 gün, borçlu sistemde 5 gün → 3 gün ek maliyet.
**Bilinçli borç ≠ otomatik kötü kod.** Kritik ayrım, gerekçe/geri ödeme planı ve görünürlüktür.

**Kaynakları:** zaman baskısı; eksik tasarım; değişen gereksinim; bilgi eksikliği; yetersiz test; eski teknoloji.

**Belirtiler:** küçük değişiklik çok dosya; tekrarlayan hata; korkulan deploy; kırılgan test; zor onboarding; dokunulmayan modül.

**Türleri:** Kod / Tasarım / Mimari / Test / Dokümantasyon / Altyapı borcu.

**Matris:** Bilinçli–bilinçsiz × ihtiyatlı–ihtiyatsız (4 durum).

**Hotspot:** sık değişen + karmaşık alan. Öncelik sadece “en kötü kod”a göre verilmez.

**Yönet:** Görünür kıl → Ölç → Önceliklendir → Azalt → Önle.
**Refactor:** sık değişim, hata, gecikme, güvenlik/performans riski varsa güçlü sinyal; stabil/nadiren değişen veya yakında silinecek kod düşük öncelikli olabilir. Amaç sıfır borç değil, kontrollü borçtur.

## Üniversite kayıt vakası

**Senaryo:** kayıt haftasında aynı anda 20.000 öğrenci; kontenjan aşılmamalı. Tartışma: tutarlılık (son koltuk), ölçek (ani trafik), dayanıklılık (e-posta hatası), gözlemlenebilirlik (sorun nerede), güvenlik (kendi kayıtları), değiştirilebilirlik (yeni kurallar).

**Sınavda “mimari mi?”:** fonksiyon adı → genellikle kod; Factory Pattern → genellikle tasarım; PostgreSQL → çoğu sistemde mimari; servisler arası Kafka → yüksek mimari etki; JWT/log formatı → **bağlama göre**.

## Kendini sınama (slayt s. 37)

1. Design ile Architecture arasındaki temel fark nedir?
2. Mimari karar neden trade-off içerir?
3. ADR'nin amacı nedir?
4. Teknik borcun “faizi” ne anlama gelir?
5. Mimarın en kritik iletişim görevi nedir?

_Kaynak: YMH 311, Hafta 1, fiziksel PDF s. 1–40; sınav özeti özgün kısa anlatımdır._
