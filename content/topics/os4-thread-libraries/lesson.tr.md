## Thread library (iş parçacığı kütüphanesi)

Thread oluşturmak, başlatmak, beklemek ve yönetmek için API sunar. Slayt 22'de **asynchronous threading (asenkron thread oluşturma)** parent işini sürdürür; **synchronous / fork-join (senkron / çatallan-birleştir)** parent sonuçları toplamak için child thread'lerin tamamlanmasını bekler. “Senkron thread'ler her zaman daha çok veri paylaşır” kesin kural değildir; farklı iş akışlarıdır.

## POSIX Pthreads — slayt 23–25

Pthreads, POSIX thread API standardıdır. Slayttaki C toplam örneğinde `#include <pthread.h>`, **`pthread_t tid`** thread ID, **`pthread_attr_t attr`** nitelikler, `runner(void *param)` worker fonksiyonudur.

1. `pthread_attr_init(&attr)` — attribute nesnesini hazırlar.
2. `pthread_create(&tid, &attr, runner, argv[1])` — yeni thread başlatır.
3. `runner` sayıları toplar ve sonucu ortak `sum` değişkenine yazar.
4. `pthread_join(tid, NULL)` — thread'in bitmesini bekler.
5. Parent `printf` ile toplamı gösterir.

**Açıklama:** `sum` burada global shared variable'dır. Çok thread aynı anda onu artırsa ek synchronization gerekirdi. Slayt 25, `pthread_t workers[NUM_THREADS]` dizisiyle birden fazla thread'in join edilmesini de anlatır.

## Windows threads — slayt 26–27

`#include <windows.h>`; **`CreateThread(..., Summation, &Param, ..., &ThreadId)`** worker başlatır. **`WaitForSingleObject(ThreadHandle, INFINITE)`** bitmesini bekler; **`CloseHandle(ThreadHandle)`** handle kaynağını kapatır. Çoklu bekleme için slayt `WaitForMultipleObjects` adını verir.

## Java threads — slayt 28–29

İki klasik yol: **`extends Thread`** ile `run()` override etmek, ya da **`implements Runnable`** ile bir task tanımlayıp `new Thread(runnable).start()` yapmak. Slayt örneği `Summation implements Runnable`, `Sum` sonuç nesnesi, **`start()`** ve **`join()`** kullanır.

**`start()` ≠ `run()`'ı doğrudan çağırmak:** `start()` yeni yürütme akışını başlatır. `join()` bitişi bekler; sonucu okumadan önce önemlidir.

**Kaynak dışı not:** Modern Java'da virtual threads gibi ek modeller de vardır; kaynak bunları işlemiyor, bu yüzden burada klasik örnekle sınırlıyız.
