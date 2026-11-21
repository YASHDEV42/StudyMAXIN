## Implicit Threading
Compiler/runtime/library yönetiminin bir bölümünü devralır. Slayt örnekleri: **Thread Pools, OpenMP, GCD**.

## Thread pool
1. Worker thread'ler hazırlanır.
2. Request/task kuyruğa konur.
3. Boş worker görevi işler.
4. Worker havuza döner.
5. Havuz doluysa task bekler veya policy'ye göre reddedilir.

- **Artı:** Yeniden kullanım, sınırlı thread sayısı.
- **Eksi:** Küçük pool → bekleme; büyük pool → kaynak maliyeti.
- **Win32 örnek:** `QueueUserWorkItem(&PoolFunction, NULL, 0)`.
- **İzleme:** Process Explorer Threads tabı, Linux htop.

**Sınav:** Thread pool = mevcut worker'ı yeniden kullanmak; her istek için sınırsız yeni thread açmak değildir.
