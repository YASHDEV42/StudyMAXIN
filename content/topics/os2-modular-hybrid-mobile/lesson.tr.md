## Loadable kernel modules

**Yüklenebilir çekirdek modülleri (LKM)**, boot sırasında veya sistem çalışırken kernel'e işlev eklenmesini sağlar. Linux'ta aygıt sürücüleri ve bazı dosya sistemi destekleri bu biçimde yüklenebilir. Modüller birbirleriyle tanımlı arayüzlerden iletişim kurabilir. **Önemli:** Modüller genellikle kernel space'te çalışır. Bu nedenle **Linux monolithic + modular** olarak tanımlanabilir; yalnız modül kullanımı Linux'u microkernel yapmaz.

## Hybrid (hibrit) yapı

Modern sistemler farklı yaklaşımları birleştirebilir; hedef performans, güvenlik ve kullanılabilirlik arasında denge kurmaktır. Slaytlar Solaris/Linux için monolitik + dinamik modül özelliğini, Windows ve Mac OS X için karma mimari yaklaşımlarını tartışır. Tek bir sınıflandırma bütün uygulama ayrıntılarını anlatmaz.

## Mac OS X — slaytın tarihsel modeli

**Aqua** kullanıcı arayüzü; **Cocoa, Java, QuickTime** gibi geliştirme/hizmet bileşenleri; çekirdek ortamında **Mach + BSD**, ayrıca **I/O Kit** ve **kernel extensions** bulunur. Mach IPC, thread ve bellek yönetimi altyapısı; BSD ağ, dosya ve UNIX işlevleri sağlar. Bu şema eski Mac OS X sürümlerinin ders anlatımıdır.

## iOS katmanları

**Core OS → Core Services → Media Services → Cocoa Touch** (alt–üst). Core OS çekirdek işlevleri; Core Services uygulama ve veri hizmetleri; Media Services grafik/ses/video; Cocoa Touch uygulama arayüzlerini sağlar.

## Android — kaynak diyagramındaki tarihsel mimari

**Linux kernel → Native Libraries + Android Runtime → Application Framework → Applications.** Linux kernel süreç/bellek/aygıt/güç yönetimi; libraries SQLite, OpenGL, media framework vb.; runtime ise slaytta **Dalvik VM** olarak örneklenmiştir. Dalvik ve WebKit ifadeleri güncel Android sürümlerinin değişmez mimarisi olarak sunulmamalıdır.

**Öğretici ek:** Kernel modülünün dinamik yüklenebilmesi, onu mutlaka güvenli biçimde çalışan sistemden kaldırabileceğimiz anlamına gelmez.
