## Mutex Lock (karşılıklı dışlama kilidi)
السلايد 21 بيشرح **Mutex (karşılıklı dışlama kilidi)**: Thread بتعمل **acquire() (kilidi edinmek)** قبل تعديل Shared Data، وبعد ما تخلص بتعمل **release() (kilidi bırakmak)** حتى غيرها تدخل.

الترتيب: `acquire → critical section → release → remainder section`.

## Spinlock (döner kilit)
إذا Lock مش متاحة والـ Thread بتضل تلف على `while(!available)` فهي **Busy Waiting (meşgul bekleme)**؛ هذا النوع اسمه **Spinlock** وبيستهلك CPU Time.

**تنبيه تقني مهم:** الكود المبسط بالسلايد بيفحص `available` وبعدين بيعمل `available=false`. إذا هالخطوتين مش Atomic (atomik)، ممكن Threadين يشوفوا True ويدخلوا سوا! لذلك Real Mutex لازم تعتمد على Atomic Primitive أو OS Synchronization.

مو كل Mutex هي Spinlock؛ في **Blocking Mutex (bloklayan mutex)** بتخلّي Thread تنتظر بدون Spin مستمر.

## متى نستخدم مين؟
Spinlock ممكن تنفع لانتظار قصير جدًا، لكن مع انتظار طويل بتهدر CPU. Blocking Mutex أنسب غالبًا لو الانتظار طويل. إذا Thread نسيت تعمل Release، غيرها ممكن تنتظر بلا نهاية.

**مثال إضافي:** تحديث Global Counter ضمن `acquire()/release()` بدل ما Threadين يعملوا `++` سوا.
