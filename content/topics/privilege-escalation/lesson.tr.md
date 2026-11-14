## Yükselme türünü ve başlangıç koşulunu ayırın

Yatay yükseltme aynı düzeyde başka kullanıcının yetkisine, dikey yükseltme daha güçlü bir role geçiştir. Linux izinleri kullanıcı, grup ve diğerleri için okuma/yazma/çalıştırmayı belirler. Root geniş yetkilidir; capabilities bu gücün belirli parçalarını süreçlere verebilir. Gereksiz veya geniş capability ise en az ayrıcalık ilkesini bozar.

setuid/setgid çalıştırılabilir dosyanın etkin kimliğini değiştirebilir. Bu nedenle ayrıcalıklı programlar girdi, ortam değişkeni, dosya yolu ve geçici dosyaları dikkatle işlemelidir. Sticky bit, ortak yazılabilir dizinlerde dosya silme davranışını sınırlar. Windows erişim token’ı kullanıcı, grup ve ayrıcalık bağlamını taşır; SYSTEM yüksek ayrıcalıklı bir hesaptır. UAC, yükseltilmiş işlemleri denetlemeye yardımcı olur ama her durumda ayrı bir güvenlik sınırı olarak değerlendirilmemelidir.

Yanlış izinler, geniş sudo kuralı, yazılabilir servis ikilisi veya güvenilmeyen `PATH` ayrıcalıklı davranışa giden bir yol oluşturabilir. Dirty COW tarihsel olarak Linux copy-on-write yarışındaki hatanın yerel ayrıcalık yükseltmesine nasıl yol açabileceğini gösterdi; güncel yamalı sistemlerde bu tarihsel açık düzeltilmiştir. Yarış koşulunda zamanlama kritik; TOCTOU’da kontrol ve kullanım arasında nesne değişebilir. Confused deputy (şaşkın vekil), yetkili bileşenin isteği yapanın bağlamını yeterince doğrulamadan yetkisini kullanmasıdır.

Savunma başlangıç yetkisini ve kullanılabilir yolu azaltır: gereksiz setuid’i kaldırmak, capability’leri daraltmak, izinleri düzeltmek, yamaları uygulamak, kontrol ve kullanım işlemlerini güvenli/atomik yapmak, ayrıcalıklı eylemleri kaydetmek. Bir yerel ayrıcalık açığı, saldırganın sisteme zaten kod çalıştırma veya hesap erişimi elde etmiş olmasını gerektirebilir; önkoşulu belirtmeden “uzaktan root” diye tanımlamak yanlıştır.

Ele geçirilmiş sürecin yetkisini sınırlamak için [sandbox ve izolasyon](topic:sandboxing-isolation) mekanizmaları uygulanır.
