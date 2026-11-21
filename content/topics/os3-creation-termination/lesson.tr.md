## Parent–Child Process İlişkisi

Bir process başka bir process başlatırsa oluşturan süreç **parent (üst/ebeveyn işlem)**, yeni süreç **child (alt/çocuk işlem)** olur. Ağaç yapısı, slaytlardaki Solaris process tree ile gösterilir. Her işlem genellikle **PID (process identifier / işlem kimliği)** alır; parent kimliği **PPID** olarak izlenebilir. Kaynak paylaşımının kapsamı işletim sistemine göre değişir: bazı kaynaklar devredilebilir, bazıları yeni oluşturulur. Parent ve child aynı anda çalışabilir veya parent child'ın bitmesini bekleyebilir.

## UNIX: fork → exec → wait

- **fork():** Çağıran process'in bir child process'ini oluşturur. Dönüş değeri child'da **0**, parent'ta **child PID (>0)**, hatada **-1** olur. Parent ve child çağrıdan sonra ayrı yürütme akışlarıdır.
- **exec() ailesi:** Çağıran process'in process image'ını başka executable ile **değiştirir**; mevcut PID ile yeni program çalışır. **exec yeni bir process oluşturmaz.** Slayttaki `execlp("/bin/ls", "ls", NULL)` bunun örneğidir.
- **wait()/waitpid():** Parent'ın child durumunu toplamasını ve gerekirse tamamlanmasını beklemesini sağlar.
- **exit():** Programı sonlandırır ve status bilgisi bırakabilir. Parent, wait ile durumu alır.

İşlem sonlandığında OS bellek ve diğer kaynakları geri alır. Farklı sebepler: normal tamamlanma, hata, kullanıcı/parent tarafından sonlandırma, kaynak sınırını aşma. Bazı sistemlerde **cascading termination (zincirleme sonlandırma)** vardır; ancak bu bütün OS'ler için zorunlu kural değildir.

## Windows örneği

**CreateProcess()** yeni process oluşturabilir; slaytlar **WaitForSingleObject()** ile beklemeyi ve **TerminateProcess()** ile sonlandırmayı gösterir. Windows CreateProcess ile UNIX fork/exec aynı işlevsel amaca hizmet etse de API ayrıntıları aynı değildir.

**Öğretici ek:** fork sonrası child'ın `exec` kullanması yaygındır, zorunlu değildir. `fork()` çıktıları hangi process'in önce CPU aldığına göre farklı sırada olabilir.
