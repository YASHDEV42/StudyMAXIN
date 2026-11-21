## OpenMP

- C/C++/Fortran için shared-memory parallelism.
- **`#pragma omp parallel`:** Parallel region.
- **`#pragma omp parallel for`:** Loop iterasyonlarını paylaşır.
- Bağımsız veri parçaları paralelleştirme için uygundur.

## GCD

- Apple macOS/iOS üzerinde **dispatch queue** yaklaşımı.
- **Serial queue:** Aynı anda tek blok.
- **Concurrent queue:** Birden çok blok aynı dönemde işlenebilir.
- **`dispatch_async(queue, block)`:** Block'u sıraya koyar; doğrudan bitişini beklemez.
- Eski `DISPATCH_QUEUE_PRIORITY_DEFAULT` API adı kaynak dönemine aittir.

**Karşılaştırma:** OpenMP = compiler directive / parallel loop; GCD = queues / blocks.
