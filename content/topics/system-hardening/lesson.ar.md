## Kurulu sistemi küçült ve güncel tut

Sertleştirme, sistemin saldırı yüzeyini planlı biçimde azaltmaktır. En az hizmet ilkesi, kullanılmayan ağ dinleyicilerini ve paketleri kaldırmayı ya da kapatmayı söyler: her çalışan servis ek kod, yapılandırma ve güncelleme ihtiyacı getirir. Önce envanter çıkar, iş gereksinimini doğrula, sonra servisleri kontrollü kapat ve işlev testini yap. Servis kapatmak izlemeyi ve bağımlılıkları etkilememelidir.

Yama yönetimi yalnızca güncelleme kurmak değildir: varlıkları ve sürümleri bilmek, güvenlik duyurularını önceliklendirmek, yamayı test etmek, dağıtımı izlemek ve istisnaları süreli onaylamak gerekir. WannaCry örneği, bilinen ve yamalanmış bir açığın kurumlarda gecikme/varlık yönetimi yetersizliği yüzünden etkisinin büyüyebileceğini gösterir; geçmiş vaka her yeni yamada aynı öncelik olduğunu kanıtlamaz. Ağ segmentasyonu, yedek ve olay müdahalesi yama sürecini tamamlar.

CIS Benchmark gibi güvenli taban yapılandırmalar, ayar önerileri ve denetim ölçütleri sunar; bağlam dışı kör uygulama iş süreçlerini bozabilir. Referans yapılandırmayı seç, test et, istisnaları gerekçelendir ve sapmaları düzenli gözden geçir. Günlükleme/denetim olayları görünür kılar; beyaz liste yalnızca onaylı uygulama veya değişiklikleri kabul ederek bilinmeyen çalıştırmayı azaltabilir. Loglar tek başına saldırıyı önlemez; saat eşitleme, saklama, bütünlük, erişim denetimi ve alarm eşiği gerekir.

Sertleştirme yaşam döngüsüdür: envanter → taban belirleme → yapılandırma → doğrulama → izleme → güncelleme. Least privilege, yalıtım ve savunma katmanları önceki başlıkları işletim sisteminin kurulum ve bakım pratiğine taşır.
