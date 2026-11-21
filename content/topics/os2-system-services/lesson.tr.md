## Servislerin rolü

**Operating system services**, uygulama programlarına çalıştırma ortamı ve donanım kaynaklarıyla güvenli etkileşim sağlar. Slaytlardaki genel şema: **Kullanıcı ve programlar → kullanıcı arayüzleri → sistem çağrıları → işletim sistemi servisleri → donanım**. Sistemler ortak işlevler sunsalar da belirli ek servisleri farklı olabilir.

## Kullanıcıya yardımcı servisler

- **User Interface:** Command-line, GUI, batch ve dokunmatik arabirimler.
- **Program Execution:** Programı belleğe yükleme, yürütme, normal/olağan dışı sonlandırma.
- **I/O Operations:** Aygıtlardan okuma ve aygıtlara yazma; güvenlik ve verimlilik için OS arabuluculuğu.
- **File-System Manipulation:** Dosya/dizin oluşturma, silme, erişim, okuma, yazma, arama, adlandırma ve erişim hakları.
- **Communications:** Aynı makinedeki veya ağ üzerindeki süreçler arasında shared memory ya da message passing aracılığıyla veri alışverişi.
- **Error Detection:** CPU/bellek, I/O cihazı ve kullanıcı programı hatalarını izleme, bildirme ve mümkünse düzeltme.

## Sistem verimliliği ve güvenliği servisleri

**Resource Allocation (kaynak tahsisi):** CPU zamanı, bellek, dosya depolama ve I/O aygıtlarını rekabet eden kullanıcı/görevler arasında tahsis eder. CPU scheduling, çekirdek sayısı, görevlerin durumu ve önceliği gibi etkenlerle ilgilenebilir.

**Accounting / Logging:** Kimin hangi kaynağı ne kadar kullandığını kaydeder; istatistik, yönetim ve ücretlendirmede yardımcı olur.

**Protection:** Sistemde kaynak erişimini denetler, süreçleri birbirinden ve işletim sisteminden yalıtır. **Security:** Kimlik doğrulama, dış tehditleri azaltma ve yetkisiz erişimi önleme gibi daha geniş korumayı kapsar.

## Ayrımlar

Resource allocation _kaynak verir_; accounting _kullanımını kaydeder_. Protection _erişim kurallarını uygular_; error detection _ortaya çıkan hataları saptar_.

**Kaynak dışı öğretici örnek:** Yazdırma isteği dosya sistemi, I/O, kaynak tahsisi ve gerektiğinde muhasebe/loglama servislerini birlikte kullanabilir.
