## Kernel veri yapıları

Kernel, süreçleri ve sistem kaynaklarını yönetmek için standart veri yapılarını kullanır. **Singly linked list** düğümlerin tek yönlü; **doubly linked list** çift yönlü bağlanmasıdır. **Circular linked list** son düğümü tekrar başa bağlar.

**Stack (yığın)**, **LIFO (son giren ilk çıkar)** kuralıyla; **Queue (kuyruk)**, **FIFO (ilk giren ilk çıkar)** kuralıyla çalışır. **Tree (ağaç)** hiyerarşik yapıdır. **Binary Search Tree (ikili arama ağacı)** sıralı aramayı destekler; dengesiz ağaçta arama O(n), dengeli ağaçta genel olarak O(log n) olabilir.

**Hash map (karma haritası)** anahtarı bir hash fonksiyonu aracılığıyla konumlandırır. **Bitmap (bit haritası)** çok sayıda kaynağın durumunu bit dizisiyle saklar. Slayt örneğinde bit değeri 0 boş, 1 dolu kaynağı temsil eder; başka uygulamalarda anlam ters seçilebilir.

## Verinin kopyaları ve tutarlılık

Veri diskten RAM'e, cache'e ve register'a geçebilir. Çoklu görev ortamında güncel değerin kullanılması gerekir; çok işlemcili sistemlerde **cache coherence (önbellek tutarlılığı)** farklı CPU önbelleklerindeki verinin uyumlu olmasını hedefler. Dağıtık sistemde birden fazla bilgisayardaki kopyaların yönetimi daha karmaşıktır.

## I/O alt sistemi

**Buffering**, veri aktarımı sırasında geçici saklama; **caching**, performans için hızlı kopya tutma; **spooling**, işlerin örneğin yazıcı kuyruğunda düzenlenmesi; **device driver** ise donanım için yazılım arayüzüdür.

**Öğretici ek:** Sekiz kaynağın doluluk bilgisi yalnız sekiz bit ile temsil edilebilir; bitmap'in verimli olmasının nedeni budur.
