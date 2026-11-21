## UNIX
- **Parent/child:** Üst işlem yeni alt işlem oluşturur; PID ve PPID.
- **fork():** Yeni child. Child return **0**, parent return **child PID**, hata **-1**.
- **exec():** Var olan process image'ını başka programla **değiştirir**; yeni process oluşturmaz.
- **wait()/waitpid():** Child sonucunu bekle/al.
- **exit():** Süreci sonlandır; kaynaklar geri alınır.
- Parent ve child aynı anda yürüyebilir veya parent bekleyebilir.

## Windows
**CreateProcess()**, **WaitForSingleObject()**, **TerminateProcess()**.

## Termination nedenleri
Normal bitiş; hata; kullanıcı/parent kararı; kaynak limitleri. Cascading termination OS'ye bağlıdır.

**Sık soru:** fork = create; exec = replace; wait = reap/wait; exit = terminate.
