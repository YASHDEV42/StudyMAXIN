## Sandbox neyi garanti eder, neyi etmez?

Sandbox, sürecin erişebileceği sistem çağrılarını, dosyaları, ağ kaynaklarını ve kaynak tüketimini daraltır. Süreçteki kusuru düzeltmez; ele geçirilme sonrası hasarı sınırlar. Linux seccomp sistem çağrısı filtresidir. Örneğin yalnızca dosya girdisini işleyen ayrıştırıcının yeni program çalıştırma veya ağ bağlantısı kurma çağrılarına ihtiyacı olmayabilir. Politikanın izin listesi uygulamanın gerçek gereksinimlerine göre kurulmalıdır; seccomp tek başına dosya erişim kontrolü değildir.

Namespaces süreçlerin PID, mount, network veya user görünümünü ayırır. cgroups CPU, bellek ve süreç sayısı gibi kaynakları sınırlayıp gruplar; ikisi farklı görevler görür. Konteynerler bu çekirdek özelliklerinden yararlanır ve ana sistemin çekirdeğini paylaşır. VM genellikle konuk işletim sistemine ayrı çekirdek sağlar; hipervizör ve yönetim düzlemi yine güvenilen bileşenlerdir. Güvenlik farkı, yapılandırma ve tehdit modeline göre değişir.

SELinux ve AppArmor zorunlu erişim denetimiyle bir sürecin hangi nesnelere erişeceğini politikaya bağlar. Uygulama farklılıkları olsa da ortak hedef, klasik kullanıcı izinlerine ek bir politika katmanı koymaktır. Güçlü yalıtım; seccomp sistem çağrısı sınırı, namespace görünümü, cgroup kaynak sınırı, MAC erişim politikası ve en az ayrıcalığın birleşiminden doğabilir.

Konteynerde gereksiz `CAP_SYS_ADMIN`, host dizinlerinin geniş bağlanması veya yönetim soketlerinin paylaşımı izolasyonu zayıflatabilir. Çekirdek paylaşımı nedeniyle çekirdek açığı da etkileyebilir. Rootless yapılandırma, küçük imaj, dar capability seti, güncel çekirdek ve gözlemleme riski düşürür. Bu, ayrıcalık yükseltme bölümündeki yetki azaltmayı süreç sınırlarına uygular.

Yetki artış yollarını tanımak için [ayrıcalık yükseltme](topic:privilege-escalation) konusuyla birlikte oku.
