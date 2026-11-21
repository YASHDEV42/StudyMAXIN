## OpenMP (Open Multi-Processing)

Slayt 35, **OpenMP**'yi C, C++ ve Fortran için shared-memory parallel programming API/directive yaklaşımı olarak tanıtır. Programcı **`#pragma omp parallel`** ile parallel region (paralel bölge) işaretler; derleyici ve runtime takım halinde thread'ler üzerinde yürütmeyi yönetir.

**Slayt örneği:** `#pragma omp parallel for` döngü iterasyonlarını thread'ler arasında bölebilir:

```c
#pragma omp parallel for
for (int i = 0; i < N; i++) {
  c[i] = a[i] + b[i];
}
```

Burada her iterasyon farklı bir `c[i]` yazar; dizilerin bu örnekteki bağımsız elemanları paralelleştirmeye uygundur. `#pragma omp parallel` ise bir kod bloğunun birden fazla worker tarafından çalıştırılması için kullanılır. Slayt görselindeki `#include <omp.h>` ifadesi, çalıştırma zamanı işlevleri kullanılacaksa gereken başlık dosyasına örnektir; pragma'nın kendisi başlığı zorunlu kılmaz.

## Grand Central Dispatch — GCD (Merkezi Görev Dağıtımı)

Slayt 36, Apple macOS/iOS için **GCD**'yi, iş bloklarını (**blocks**) **dispatch queue (dağıtım kuyruğu)** üzerinde yürütmek için kullanılan bir sistem olarak gösterir:

- **Serial queue (seri kuyruk):** Aynı kuyruktan bir seferde tek blok yürütülür; sıra korunur.
- **Concurrent queue (eşzamanlı kuyruk):** Birden fazla blok örtüşecek şekilde çalıştırılabilir; başlamaları FIFO olsa da tamamlanma sırası farklı olabilir.

Kaynak örneği `dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)` ile global concurrent queue seçip `dispatch_async(queue, ^{ printf("I am a block."); });` ile blok gönderir. **`dispatch_async`** işi sıraya koyar, çağıran thread'in blok bitene kadar beklemesini şart koşmaz.

**Dönem notu:** `DISPATCH_QUEUE_PRIORITY_DEFAULT` gibi semboller slaytın API dönemini yansıtır. Güncel öncelik/QoS API'leri farklılık gösterebilir.

## Kısa karşılaştırma

| OpenMP | GCD |
| --- | --- |
| Derleyici direktifleriyle parallel regions ve loops | Dispatch queues üzerinde task/blocks |
| C/C++/Fortran shared-memory computation | Apple platformlarının iş kuyruğu yaklaşımı |
| `#pragma omp parallel for` | `dispatch_async()` |

**Kaynak dışı ek:** Parallel `for` içindeki iterasyonlar aynı değişkene kontrolsüz yazarsa race condition oluşabilir.
