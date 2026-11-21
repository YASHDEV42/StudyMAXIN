## İşletim sistemi ne yapar?
**İşletim sistemi (Operating System)** bilgisayar donanımını yöneten, uygulamaların çalışmasını sağlayan ve kullanıcı ile donanım arasında aracılık eden yazılımdır. Bilgisayar sistemi dört bileşene ayrılır: donanım, işletim sistemi, uygulama programları ve kullanıcılar. Donanım CPU, bellek ve I/O aygıtları gibi kaynakları sağlar; uygulamalar bu kaynaklarla kullanıcı görevlerini yerine getirir; işletim sistemi kullanımını koordine eder.

## Üç temel amaç
1. Kullanıcı programlarının uygun ve verimli bir ortamda yürütülmesini sağlamak.
2. CPU, bellek ve I/O gibi kaynakları mümkün olduğunca verimli ve adil tahsis etmek (**resource allocator**).
3. Program yürütmesini ve I/O işlemlerini kontrol ederek hatalı veya uygunsuz kullanımı sınırlandırmak (**control program**).

İşletim sistemi hedefleri çalışma ortamına göre değişir. Paylaşılan sunucularda kaynak kullanım oranı; kişisel bilgisayarlarda kullanım kolaylığı; mobil cihazlarda enerji ve kullanılabilirlik; gömülü sistemlerde özerk çalışma öne çıkabilir.

## Kernel, sistem programı ve middleware
**Kernel (çekirdek)**, işletim sisteminin merkezî ve sürekli etkin temel bileşenidir. Sistem programları işletim sistemiyle dağıtılabilir ama kernel'in parçası olmak zorunda değildir. Uygulama programları kullanıcı görevleri için çalışır. Mobil işletim sistemleri ek hizmetleri **middleware (ara yazılım)** ve framework katmanlarıyla sunabilir.

**Öğretici ek:** Tarayıcı ile müzik uygulaması aynı anda çalışırken CPU süresini, belleği ve I/O aygıtlarını ayrı ayrı sahiplenmez; işletim sistemi bu paylaşımları yönetir.
