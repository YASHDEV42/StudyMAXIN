## Thread kütüphaneleri

- **Pthreads:** `pthread_create()` başlatır; `pthread_join()` bekler; `pthread_t` ID; `pthread_attr_t` nitelik.
- **Windows:** `CreateThread()` oluşturur; `WaitForSingleObject()` bekler; `CloseHandle()` handle'ı kapatır.
- **Java:** `extends Thread` veya `implements Runnable`; `start()` yeni thread başlatır; `join()` bekler.
- **Synchronous / fork–join:** Parent child sonuçlarını bekler.
- **Asynchronous:** Parent çalışmasına devam edebilir.
- **Shared global `sum`:** Birden fazla yazıcı varsa synchronization gerekir.

**Sınav farkı:** Java'da `run()` doğrudan çağrılırsa yeni thread başlatılmaz; `start()` gerekir. `join()` create değil, wait işlemidir.
