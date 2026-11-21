## CPU kullanımı

- **Multiprogramming:** Bir process I/O beklerken diğerini çalıştırır; CPU kullanımını artırır.
- **Multitasking / Time Sharing:** Kısa zaman dilimleriyle hızlı geçiş; kullanıcı etkileşimi ve tepki süresi.
- **Job Scheduling:** Belleğe alınacak işleri seçer.
- **CPU Scheduling:** Hazır process'lerden çalışacak olanı seçer.

## Koruma ve yürütme

- **User Mode:** Sınırlı yetkiler.
- **Kernel Mode:** Ayrıcalıklı komutların yürütülmesi.
- **Mode Bit (slayt):** User = 1, Kernel = 0.
- **System Call:** Programın OS hizmeti istemesi.
- **Timer:** CPU denetimini işletim sistemine geri getirir.

## Yönetim işlevleri

- **Program:** Pasif komutlar; **Process:** Aktif yürütme.
- **Program Counter:** Sonraki komutun adresi.
- **Process Management:** Oluşturma, silme, zamanlama, senkronizasyon ve IPC.
- **Memory Management:** Kullanımı izleme, tahsis, serbest bırakma.
- **File-System Management:** Dosya ve dizin işlemleri, erişim denetimi.
- **Protection:** Kaynak erişim kuralları. **Security:** Tehditlere karşı koruma.
- **Kernel Data Structures:** Linked list, stack (LIFO), queue (FIFO), tree, hash table, bitmap.
- **Computing Environments:** Client-server, P2P, distributed, virtualization, cloud, embedded ve open source.

**Ayırım:** Multiprogramming'in temel hedefi CPU verimliliği; multitasking bunun yanında kısa etkileşimli tepki süresidir.
