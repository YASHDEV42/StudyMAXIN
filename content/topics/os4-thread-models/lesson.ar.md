## User Thread vs Kernel Thread

**User-Level Thread (kullanıcı düzeyi iş parçacığı)** إدارتها غالبًا بواسطة Thread Library (iş parçacığı kütüphanesi) ضمن User Space (kullanıcı alanı)، بينما **Kernel Thread (çekirdek iş parçacığı)** الـ OS Scheduler (işletim sistemi zamanlayıcısı) بيعرفها وبقدر يوزعها على CPU.

**تصحيح مهم:** السلايد 17 بيوحي إن Kernel Thread ما بتشتغل إلا Kernel Mode؛ الأدق إن الـ Kernel بيعمل Scheduling لها، لكنها ممكن تنفذ User-Mode Code كمان. وكمان Java Threads ما فينا نصنفها User-Only بشكل مطلق؛ Depends على JVM Implementation.

## نماذج الربط الثلاثة

### Many-to-One (çoğa bir) — السلايد 20

عدة **User Threads** بتتربط بـ **Kernel Thread واحدة**. إذا صار Blocking System Call (bloklayan sistem çağrısı)، ممكن يتوقف تقدم كل User Threads، وما في Parallelism حقيقي بينها على Cores مختلفة لأن في Kernel Execution Context واحد.

### One-to-One (bire bir) — السلايد 19

كل User Thread إلها Kernel Thread مقابلة. إذا Thread انحجبت التانية ممكن تكمّل، وممكن توزّعهم على Cores متعددة. لكن عدد كبير جدًا بيعني Memory + Scheduling Overhead (bellek ve zamanlama ek yükü) أكبر.

### Many-to-Many (çoğa çok) — السلايد 21

M User Threads بتتوزّع على N Kernel Threads، وقد يكون N أقل من M. بيعطي Flexibility (esneklik)، وممكن يشغّل أكتر من Thread بالتوازي إذا N أكبر من 1، بس التنفيذ أعقد.

| Model | الربط | Parallelism |
| --- | --- | --- |
| Many-to-One | M:1 | لا، ضمن Kernel Thread واحدة |
| One-to-One | 1:1 | ممكن |
| Many-to-Many | M:N | ممكن إذا N أكثر من 1 |

**ملاحظة مصدرية:** أمثلة Solaris/UNIX بالمخططات بتوصف أنظمة تاريخية؛ مو شرط تستخدم كل النسخ الحديثة نفس الربط.

**توضيح إضافي:** User-Level Scheduling مو معناه إن CPU بتشغّل User Thread بدون Kernel؛ التنفيذ بالنهاية مربوط بـ Kernel-Schedulable Context.
