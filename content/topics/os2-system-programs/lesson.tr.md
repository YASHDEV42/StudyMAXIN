## Sistem programının görevi

**System programs / system utilities**, kernel'in sunduğu hizmetleri kullanarak program geliştirme ve yürütmeye uygun bir ortam sağlar. Bir **system call** ayrıcalıklı OS hizmetine giriş mekanizmasıdır; bir **system program** bu mekanizmaları kullanabilen kullanıcı düzeyinde çalışan araçtır. Slaytların soyut şeması: Hardware → OS → System Programs → Application Programs → Users.

## Sistem programları sınıfları

- **File management:** Create, delete, copy, rename, print, dump, list; dosya ve dizin yönetimi.
- **Status information:** Tarih/saat, bellek ve disk boş alanı, kullanıcı sayısı; performans, log ve debugging bilgileri. Bazı OS'ler yapılandırmayı **registry** içinde tutabilir.
- **File modification:** Text editor ve dosya içeriğini işleyen araçlar.
- **Programming-language support:** Compiler, assembler, debugger, interpreter; C, C++, Java, Python vb. geliştirme araçları.
- **Program loading / execution:** Programı belleğe yükleme ve çalıştırma; bazı hata ayıklama işlevleri.
- **Communications:** Mesajlaşma, web, e-posta, uzak bağlantı, dosya aktarımı.

## Background services

Boot sırasında bazı sistem programları başlatılır. Bir kısmı başlangıç görevinden sonra kapanır, bir kısmı sistem kapanana kadar çalışır. Bunlara **services, subsystems, daemons (arka plan hizmetleri/süreçleri)** denir. Ağ, yazıcı kuyruğu, hata kaydı, zamanlanmış işler örneklerdir. Önemli bazı görevler kernel bağlamı yerine user-space daemon'ları üzerinden yürütülebilir.

## Sistem programı ile uygulama programı

Web tarayıcı, hesap tablosu ve oyun gibi uygulamalar kullanıcı amacına hizmet eder. Sisteme kurulu olmaları onları otomatik olarak çekirdeğin bir parçası yapmaz.

**Öğretici ek:** `cp` bir komuttur/programdır; dosyayı kopyalamak için çekirdeğin `open/read/write` hizmetlerini kullanabilir.
