## Implicit threading (dolaylı thread oluşturma)

Slayt 30'da çok sayıda thread'i elle yönetmenin hata yapmayı kolaylaştırdığı anlatılır. **Implicit threading**, thread oluşturma ve zamanlama ayrıntılarının bir kısmını **runtime/library (çalışma zamanı kütüphanesi)** veya compiler aracılığıyla yönetmektir. Slayttaki üç yaklaşım: **Thread pools**, **OpenMP** ve **Grand Central Dispatch (GCD)**.

## Thread pool (iş parçacığı havuzu)

Slayt 31'de web server örneği, her yeni isteğe sıfırdan thread oluşturmanın çok sayıda istek karşısında **CPU time (işlemci zamanı)** ve **memory (bellek)** tüketebileceğini gösterir.

Havuzun temel akışı:

1. Başlangıçta veya gerektiğinde sınırlı sayıda worker thread hazırlanır.
2. Yeni request geldiğinde görev bir iş kuyruğuna verilir.
3. Boş worker görevi alır ve çalıştırır.
4. Tamamlanan worker havuza geri döner.
5. Uygun worker yoksa görev, pool'un belirlenen queue/rejection politikasına göre bekler veya reddedilir.

**Avantaj:** Thread yeniden kullanım ve eşzamanlı iş sayısını sınırlama. **Dezavantaj:** Pool küçükse latency artabilir; büyükse contention ve memory tüketimi oluşabilir.

## Windows thread pool örneği — slayt 32

**`PoolFunction()`** worker fonksiyonudur; slayttaki **`QueueUserWorkItem(&PoolFunction, NULL, 0)`** bir görevi Windows thread pool'a sıraya koyar. Parametreler fonksiyon pointer'ı, gönderilecek bağlam ve flags'tir. Bu tarihsel Win32 API örneği kavramı göstermek içindir.

## İşletim sistemi üzerinde thread'leri görmek

- **Windows Process Explorer (İşlem Gezgini):** Slayt 33'te bir process'in Threads sekmesinde TID, CPU, state ve context-switch sayısı görüntülenir.
- **Linux htop:** Slayt 34'te `T` ile thread görünümü ve task/thread sayıları gösterilir; tuş davranışı htop sürümü/ayarlarına göre değişebilir.

**Kaynak dışı örnek:** Bir resim işleme sunucusunda 8 worker'lık pool, her resim için yeni thread oluşturmak yerine işleri queue üzerinden dağıtabilir.
