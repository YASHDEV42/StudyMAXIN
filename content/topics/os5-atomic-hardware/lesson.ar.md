## Lock (kilit) — السلايد 16

البنية: **Acquire Lock (kilidi edinmek) → Critical Section (kritik bölüm) → Release Lock (kilidi bırakmak)**. إذا ما حررنا Lock بعد الشغل، غيرنا ممكن يعلق.

## Synchronization Hardware (eşzamanlama donanımı)

السلايد 17 بيذكر تعطيل **Interrupts (kesmeler)** لفترة قصيرة على Single-core. بس على Multicore تعطيل Interrupts بـ Core ما بمنع Cores ثانية توصل للـ Shared Memory.

## Test-and-Set (test et ve ayarla)

بالسلايد 18، العملية بتقرأ قيمة Lock القديمة، بتخليها True، وبترجع القديمة **كخطوة Atomic (atomik)**. إذا القيمة القديمة False منقدر ندخل. إذا True منضل ضمن **Busy Waiting (meşgul bekleme)**.

## Compare-and-Swap (karşılaştır ve değiştir)

بالسلايد 19: منقرأ Old Value، وإذا كانت مساوية Expected، منبدلها بـ New Value كعملية Atomic واحدة. المثال بيستخدم `compare_and_swap(&lock,0,1)` لتملك Lock فارغة، وبيرجعها 0 عند الخروج.

## Bounded Waiting (sınırlı bekleme)

السلايد 20 بضيف Array اسمها `waiting[n]` حتى ما تضل Process مظلومة وتنتظر للأبد. Algorithm بتبحث عن التالية باستخدام `j=(i+1)%n` بشكل Circular (dairesel)، وبتسلمها الدور. بالنموذج التعليمي في حد أقصى من **n−1** تجاوزات من الآخرين.

**معلومة خارج السلايد:** TAS أو CAS بدون Memory Ordering (bellek sıralaması) صحيح ومناسب ما يعني كل Implementation معها تلقائيًا Safe؛ الـ Atomicity والـ Lock Protocol مهمين.
