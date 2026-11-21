## Derleme zinciri

**Source → Compiler → Relocatable object (.o) → Linker → Executable → Loader → Memory / running process.**

- **Linker:** Object dosyaları/kütüphaneleri birleştirir; sembolleri çözer.
- **Loader:** Executable'ı belleğe yerleştirip çalıştırılabilir yapar.
- **Relocation:** Kod/veri adreslerini gerçek yerleşime göre uyumlaştırır.
- **Static linking:** Derleme/bağlama aşamasında bağlantı.
- **Dynamic linking:** Gerektiğinde paylaşılan kütüphane bağlantısı (Windows DLL).

## API–ABI

- **API:** Kaynak kodda kullanılan fonksiyon sözleşmesi.
- **ABI:** Binary çağrı kuralları, register/stack, veri boyutu, binary format.
- **OS-specific nedenleri:** System calls, APIs/libraries, executable formats, CPU/ABI.

## Taşınabilirlik

1. Interpreted language (Python/Ruby).
2. VM/RTE (JVM + bytecode).
3. Standard language + hedef OS için yeniden derleme.

**POSIX `read(fd, buf, count)`:** Okunan byte sayısı; 0 EOF; -1 hata.

**Sınav:** Linker ≠ Loader; API ≠ ABI; kaynak kod taşınabilirliği ≠ hazır binary taşınabilirliği.
