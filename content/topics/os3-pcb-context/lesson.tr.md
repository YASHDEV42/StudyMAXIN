## Process Control Block (PCB)

İşletim sistemi bir sürecin durumunu saklamak ve sonra yeniden başlatabilmek için **PCB (işlem kontrol bloğu)** tutar. Dersin iki şemasını birleştirirsek PCB bilgileri: **process ID/parent ID**, **state**, **program counter**, **CPU registers/stack pointer**, **scheduling priority/queue bağlantıları**, **memory-management information** (base/limit veya page tables), **accounting/CPU usage**, **I/O status** (açık dosyalar, aygıtlar) ve erişim/iletişim bilgileridir. PCB, sürecin kullanıcı verisinin tamamı değildir; yönetim metaverisidir.

## Context switch (bağlam değiştirme)

CPU, P0 yerine P1'i çalıştıracağında kernel P0'ın devam için gerekli execution context'ini kaydeder, P1'in daha önce kaydedilmiş context'ini yükler ve ona kontrolü verir. Şemada **save state into PCB0 → reload state from PCB1** akışı gösterilir. Interrupt ve system call, kernel'e geçiş başlatabilir; **her kernel geçişi zorunlu olarak process switch değildir**.

**Dispatcher (görevlendirici)**, scheduler'ın seçtiği sürece CPU'yu devreden bileşendir; **dispatch latency (görevlendirme gecikmesi)** geçiş maliyetidir. Kaynak slayttaki bir örnek 20 ns × 50 register'ı yanlış biçimde 1 ms diye sonuçlandırır: çarpım **1000 ns = 1 µs** (kaydetme); benzer geri yükleme ile yaklaşık **2 µs**, ek maliyetleri hariç. Bu bir ölçülmüş genel context-switch süresi değildir.

## Neden maliyetli?

Register kayıt/yükleme, kernel kodu ve olası cache/TLB etkileri süre alır; switch anında kullanıcı programının işi ilerlemez. Ancak çoklu görev için gereklidir.

**Ek örnek:** Bir timer interrupt yalnızca aynı sürece dönerse interrupt handling olmuştur; yeni sürece geçerse ayrıca context switch olur.,## شو هو PCB؟

الـ **Process Control Block (işlem kontrol bloğu)** هو سجل بيديره OS لكل Process، مش نسخة من Heap أو كل بيانات المستخدم. بيحوي Process ID (işlem kimliği)، State (durum)، Program Counter (program sayacı)، CPU Registers (işlemci yazmaçları)، Scheduling Information (zamanlama bilgileri)، Memory Management Data (bellek yönetim bilgileri)، Accounting (kaynak kullanım kayıtları)، وI/O Status (giriş/çıkış durumu)، مثل Open Files.

## Context Switching (bağlam değiştirme)

لما الـ CPU ينتقل من **P0** إلى **P1**: الـ Kernel (çekirdek) بيحفظ الـ Execution Context لـ P0 ببيانات PCB الخاصة فيه، وبحمّل Context لـ P1 وبيرجع يكمل من Program Counter تبعه. المخطط بالسلايدات بيعرض Save PCB0 ثم Reload PCB1. **Dispatcher (görevlendirici)** بينفّذ تسليم CPU للعملية التي اختارها Scheduler (zamanlayıcı). **Dispatch Latency (görevlendirme gecikmesi)** زمن الانتقال.

الـ Context Switch إله **Overhead (ek yük)**، لأن وقت حفظ وتحميل الحالة ما عم ينجز شغل التطبيق مباشرة. بس ضروري للـ Multitasking (çoklu görev yürütme). لازم ننتبه: System Call أو Interrupt ما بيعني دائمًا تبديل Process؛ ممكن نرجع لنفس العملية.

## تصحيح حساب مهم بالسلايد

السلايد بيذكر **50 Registers × 20 ns** وبيحسِبها **1 ms**، لكن الحساب الصحيح **1000 ns = 1 µs** للحفظ، وحوالي **2 µs** للحفظ والاسترجاع قبل بقية Overheads. هالأرقام مثال تعليمي وليست قياسًا عامًا لزمن الـ Context Switch.

**مثال إضافي:** عملية A تنقطع بسبب Timer؛ OS بيختار B، بيحفظ Registers A وبيحمّل Registers B، وبعدين يكمل B من المكان اللي وقف عنده.,## PCB İçerikleri
- PID/PPID, process state, program counter, CPU registers.
- CPU scheduling priority/queues.
- Memory management: base/limit, page tables.
- Accounting ve CPU kullanımı.
- I/O status, open files/devices.

## Context Switch
**Save P0 context → restore P1 context → P1 executes.** Dispatcher CPU'yu seçilen sürece verir. Context switching yararlı ama **overhead** doğurur.

**Interrupt/system call ≠ her zaman process switch.**

**Slayt hatası:** 50 × 20 ns = **1000 ns = 1 µs**, 1 ms değil; save + restore temel hesap ≈ **2 µs** (diğer giderler hariç).
