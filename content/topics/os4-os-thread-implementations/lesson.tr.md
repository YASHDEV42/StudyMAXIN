## Windows thread modeli — slayt 40

Windows, kullanıcı tarafından oluşturulan normal thread'leri **one-to-one (bire bir)** kernel-scheduled yürütme birimleriyle eşler. Slaytın bileşen diyagramı üç yapıyı gösterir:

- **ETHREAD (executive thread block):** Thread nesnesi ve parent process ilişkisi gibi yönetim bilgileri.
- **KTHREAD (kernel thread block):** Kernel scheduling, synchronization ve kernel stack gibi yürütme durumları.
- **TEB (Thread Environment Block / iş parçacığı ortam bloğu):** User-mode thread-local bilgiler, thread ID ve user stack'e ilişkin bilgiler.

**Thread context (iş parçacığı bağlamı)**, register set, stack ve program counter gibi yürütmeye devam etmek için gereken durumdur. TEB ve kernel yapılarının tümü birebir aynı şey değildir.

## Linux thread modeli — slayt 41

Linux'ta süreçler ve thread'ler kernel'in **task (görev)** kavramı üzerinden temsil edilir. Slayt **`task_struct`** veri yapısını ve **`clone()`** çağrısının paylaşıma ilişkin flags kullanmasını anlatır. `fork()` bir child oluşturmanın yaygın yoludur; `clone()` daha ince paylaşım kontrolü sağlar.

| Flag              | Slaytın anlamı                                  |
| ----------------- | ----------------------------------------------- |
| **CLONE_FS**      | Dosya sistemi bağlam bilgileri paylaşılır       |
| **CLONE_VM**      | Aynı sanal bellek/address space paylaşılır      |
| **CLONE_SIGHAND** | Signal handler/disposition bilgileri paylaşılır |
| **CLONE_FILES**   | Açık file descriptor tablosu paylaşılır         |

Thread'lerin hangi kaynakları paylaştığını anlamak için bu flags özellikle önemlidir. Kaynak “file system” derken tüm disk içeriğinin kopyalanmasını ya da paylaşımını değil, process'in dosya sistemiyle ilgili bağlamını anlatır.

## Temel karşılaştırma

**Windows:** ETHREAD/KTHREAD/TEB nesneleri ve one-to-one scheduling. **Linux:** `task_struct` ve sharing flags ile task yönetimi. Her iki sistem de kernel'in schedule ettiği thread'ler üzerinde multicore execution sağlar.

**Kaynak dışı not:** Linux'ta gerçek pthread implementation ayrıntıları ve modern `clone3()`, `futex` gibi kavramlar bu iki slaytın kapsamını aşar.
