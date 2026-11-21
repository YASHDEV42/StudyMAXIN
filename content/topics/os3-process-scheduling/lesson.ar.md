## ليش بنحتاج Scheduling؟

الـ **CPU Scheduler (işlemci zamanlayıcısı)** بيختار أي Process جاهزة لازم تشتغل تاليًا، أما الـ **Dispatcher (görevlendirici)** فبينقل التحكم إلها فعليًا. يعني **Selection (seçim)** غير **Dispatching (görevlendirme)**. على Single-core (tek çekirdek) في Execution واحد باللحظة، لكن Time Sharing (zaman paylaşımı) بيخلي البرامج تبدو متزامنة.

## أنواع Queues (kuyruklar)

- **Job Queue (iş kuyruğu):** المهام المقدَّمة للنظام لتشغيلها.
- **Ready Queue (hazır kuyruğu):** Processes موجودة وجاهزة، بس عم تنتظر CPU.
- **Device / I/O Queue (aygıt / giriş-çıkış kuyruğu):** Processes ناطرة Device أو عملية I/O.

الرسم بيوضح: **Ready → CPU → I/O Queue** عند طلب I/O، وبعد اكتماله ترجع العملية Ready. عند انتهاء Time Slice (zaman dilimi) بتنتقل Running إلى Ready. كمان انتظار Child Process أو Interrupt ممكن ينقل العملية إلى Waiting. وفي السلايدات في Linked Lists (bağlı listeler) بتربط عناصر PCB ضمن الطابور.

## أنواع Schedulers

1. **Long-Term Scheduler (uzun vadeli zamanlayıcı):** بيقرر أي Jobs تدخل للذاكرة، وبيؤثّر على **Degree of Multiprogramming (çoklu programlama derecesi)**.
2. **Short-Term Scheduler (kısa vadeli zamanlayıcı):** بيختار Process من Ready Queue لتشتغل على CPU، وبيشتغل بتواتر عالي.
3. **Medium-Term Scheduler (orta vadeli zamanlayıcı):** بيعمل **Swapping (takaslama)** لبعض العمليات خارج RAM ويرجعها لاحقًا لتنظيم ضغط الذاكرة.

## CPU-bound vs I/O-bound

**CPU-bound (işlemci ağırlıklı)** يعني وقت كبير بالحساب، بينما **I/O-bound (giriş/çıkış ağırlıklı)** يعني Execution قصير وبعدين انتظار متكرر لأجهزة أو ملفات. المزج بينهم بيساعد استخدام CPU وDevices بكفاءة.

**ملاحظة مصدرية:** عبارة عدم وجود Long-term Scheduler في Windows/UNIX بالسلايد توصيف مبسط، مو قانون لكل الأنظمة الحديثة.
