## Thread ve Process

- **Thread:** Process içindeki execution flow; process bir veya daha fazla thread içerebilir.
- **Paylaşılanlar:** Code, global data, heap/address space, open files.
- **Özel:** Her thread için **registers, program counter, stack**.
- **Process:** Genellikle ayrı sanal adres alanı ve daha güçlü izolasyon.
- **Multithreading:** Aynı process içinde çok thread; paralellik ancak uygun CPU ve scheduler ile mümkün.

## Dört fayda

1. **Responsiveness:** Diğer thread'ler yanıt verebilir.
2. **Resource sharing:** Ortak bellek ve kaynaklar.
3. **Economy:** Genelde daha düşük oluşturma/switch maliyeti.
4. **Scalability:** Multicore'da paralel execution.

**Dikkat:** Stack'teki yerel değişkenler otomatik shared değildir. Her request için thread açmak zorunlu tasarım değildir. Solaris 30×/5× rakamları genel kural değildir.
