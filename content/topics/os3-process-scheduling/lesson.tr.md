## Process Scheduling (işlem zamanlaması)

Birden çok süreç hazır olduğunda, **CPU scheduler (işlemci zamanlayıcısı)** çalışacak sıradaki süreci seçer. **Dispatcher (görevlendirici)** ise seçilmiş sürece CPU kontrolünü devreder. Bu iki rolü ayırmak önemlidir: *seçim* ile *geçiş* aynı işlem değildir. Tek çekirdekte herhangi bir anda tek yürütme akışı bulunur; zaman paylaşımı ile süreçlerin arası hızla değiştirilir.

## Scheduling Queues (zamanlama kuyrukları)

- **Job queue (iş kuyruğu):** Çalıştırılmak üzere sisteme gönderilen işler.
- **Ready queue (hazır kuyruğu):** Bellekte çalışmaya hazır olup CPU bekleyen süreçler.
- **Device/I/O queue (aygıt/G/Ç kuyruğu):** Belirli aygıtın işlem tamamlamasını bekleyen süreçler.

Slayttaki queueing diagram: **Ready queue → CPU**, süreç bir **I/O request** yapınca ilgili I/O kuyruğuna gider; **I/O completion** sonrasında tekrar Ready olur. **Time slice expired** durumunda CPU'dan Ready'ye dönüş gerçekleşebilir. Bir **child process** veya interrupt beklemek de süreci Waiting'e gönderebilir. Kuyruk, PCB bağlantılarıyla veya başka uygun veri yapılarıyla yönetilebilir; şemada linked-list gösterimi vardır.

## Üç scheduler türü

1. **Long-term scheduler (uzun vadeli zamanlayıcı):** Hangi job'ların sisteme/belleğe alınacağına karar verir; **degree of multiprogramming (çoklu programlama derecesi)** üzerinde etkilidir.
2. **Short-term scheduler (kısa vadeli/CPU zamanlayıcısı):** Ready queue içinden sıradaki süreci seçer; sık çağrıldığı için hızlı olmalıdır.
3. **Medium-term scheduler (orta vadeli zamanlayıcı):** Bazı sistemlerde süreçleri geçici olarak bellekten çıkarır ve geri getirir: **swap out / swap in (takasla çıkarma / geri alma)**; bellek yükünü yönetir.

**CPU-bound (işlemci ağırlıklı)** süreç CPU üzerinde uzun hesap yapar. **I/O-bound (G/Ç ağırlıklı)** süreç kısa CPU burst'lerinden sonra sık I/O bekler. İyi bir iş yükü karışımı CPU ve aygıt kullanımını dengeler.

**Kaynak uyarısı:** Slaytlarda Windows ve UNIX için “long-term scheduler bulunmaz” ifadesi genelleştirilmiştir; bunu her sürüm ve her iş yükü için değişmez kural olarak okumamak gerekir.
