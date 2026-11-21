## POSIX shared memory örneği

Kaynak sayfa 50'de **System V IPC** tarzında işlemler gösterilir:

1. `shmget(...)`: Paylaşımlı bellek segmenti oluşturur/elde eder.
2. `shmat(id, NULL, 0)`: Segmenti process adres alanına bağlar (**attach**).
3. `sprintf(shared_memory, ...)`: Paylaşılan alana yazma örneğidir.
4. `shmdt(shared_memory)`: Process'in bağlantısını ayırır (**detach**).

**Doğruluk ayrımı:** Slayt başlığı “POSIX paylaşımlı hafıza” dese de bu isimler **System V shared-memory API**'sine aittir; POSIX `shm_open` / `mmap` ailesiyle karıştırılmamalıdır. **IPC_PRIVATE** yeni özel segment oluşturma seçeneğidir, otomatik olarak hiçbir process'in paylaşamayacağı anlamına gelmez.

## Mach message-based IPC

Tarihsel **Mach (Mach mikroçekirdeği)** mesaj merkezli bir tasarımdır. Slaytlar **Kernel** ve **Notify** mailbox/port örneklerini, `msg_send()`, `msg_receive()`, `msg_rpc()` ve `port_allocate()` gibi tarihsel arayüzleri açıklar. Bu, microkernel'de sistem hizmetlerine erişimin mesajlaşma tabanlı olabileceğini gösterir.

## Windows XP LPC

**Local Procedure Call — LPC (yerel prosedür çağrısı)** aynı bilgisayardaki süreçler arasında port nesneleri ve **handles (tanıtıcılar)** kullanarak mesajlaşan Windows XP mimarisi örneğidir. Kaynaktaki sırada client connection port'a bağlanır, server ilgili iletişim portlarını hazırlar, taraflar mesaj ve yanıt taşır. Bu anlatım Windows XP dönemine aittir; güncel Windows IPC teknolojilerini birebir tanımlamaz.

## Üç yaklaşımın farkı

**System V shared memory:** Ortak bellekte veri; synchronization uygulamanın sorumluluğu. **Mach:** Mesaj/port öncelikli IPC. **Windows XP LPC:** Yerel client–server port ve handle tabanlı mesajlaşma.

**Kaynak dışı not:** Bir segmentin işlemlerce paylaşılması, içeriğin otomatik olarak tutarlı/atomik güncelleneceği anlamına gelmez.
