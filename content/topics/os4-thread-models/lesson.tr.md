## User-level ve kernel-level threads

**User thread (kullanıcı düzeyi iş parçacığı)**, kullanıcı alanındaki thread kütüphanesi/runtime tarafından yönetilebilir. **Kernel thread (çekirdek iş parçacığı)** işletim sistemi scheduler'ının bildiği yürütme birimidir. Kaynak slayt 17, bu iki düzey arasında eşleme kurulmasını anlatır.

**Düzeltici açıklama:** “Kernel thread yalnız kernel mode'da çalışır” genellemesi doğru değildir. Kernel tarafından zamanlanan bir thread, user-mode kodunu da çalıştırabilir. Java `Thread` sınıfı da her durumda yalnız kernel'den saklanan user thread demek değildir: gerçek eşleme JVM ve platforma bağlıdır.

## Many-to-one (çoğa bir)

**Çok sayıda user thread → tek kernel thread.** User-space scheduler geçişleri hafif olabilir; ama tek kernel execution context olduğundan farklı CPU core'larda aynı anda paralel yürütme mümkün değildir. Blocking system call bütün modelin ilerlemesini durdurabilir. Slayt 20 bu sınırlamaları vurgular.

## One-to-one (bire bir)

**Her user thread → ayrı kernel-scheduled thread.** Bir thread bloklansa diğeri çalışabilir; çok çekirdekte paralellik mümkündür. Ancak çok fazla thread için kernel kaynak ve scheduler overhead'i artar. Slayt 19'daki tarihsel örnekler Windows, Linux ve Solaris 9+.

## Many-to-many (çoğa çok)

**M user thread → N kernel thread**, burada N, M'den küçük veya eşit olabilir. Kullanıcı runtime'ı thread'leri farklı kernel yürütme birimlerine dağıtır. Bloklanan bir thread, yeterli kernel yürütme birimi varsa diğerlerinin devamını engellemek zorunda değildir. Model daha esnek ama runtime tasarımı daha karmaşıktır. Kaynak slayt 21'in Solaris/UNIX örnekleri tarihsel olarak okunmalıdır.

| Model | Eşleme | Çok çekirdekte gerçek paralellik | Blocking call etkisi |
| --- | --- | --- | --- |
| Many-to-one | M:1 | Aynı process için hayır | Tüm süreci durdurabilir |
| One-to-one | 1:1 | Evet | Başka thread devam edebilir |
| Many-to-many | M:N | N>1 ise evet | Uygulamaya ve eşlemeye bağlı |

**Kaynak dışı not:** User-mode scheduling, kernel desteği olmadığı anlamına gelmez; sadece hangi düzeyin hangi iş parçacığını yönettiğini ayırır.
