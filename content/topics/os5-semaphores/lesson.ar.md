## Semaphore (semafor) شو هو؟
السلايدات 22–25 بتشرح Semaphore كآلية Synchronization (eşzamanlama) تعتمد على Counter (sayaç).

- **Binary Semaphore (ikilik semafor):** قيمتها 0 أو 1.
- **Counting Semaphore (sayan semafor):** بتعد عدد Permissions/Resources المتاحة؛ إذا بدأنا `S=3` ممكن لثلاث Workers تستخدم ثلاث Resources بنفس الوقت.

**تصحيح للسلايد:** Binary Semaphore مو مخصصة حصريًا لعمليتين؛ ممكن Processes كثيرة تنتظر على نفس Semaphore.

## wait(P) وsignal(V)
**wait(S) (beklemek)** بتحاول تاخد Permit، وبتنقص Counter لما تقدر. **signal(S) (işaret vermek)** بترجع Permit وبتزيد Counter أو بتوقظ منتظر. لازم العمليات تكون **Atomic (atomik)** حتى ما حدا ياخد نفس Permit مرتين. مثال `while(S<=0); S--` بالسلايد هو نموذج تعليمي، مش Implementation آمنة بدون حماية.

مو كل Semaphore بتستخدم Busy Waiting (meşgul bekleme)؛ ممكن OS تعمل **Blocking (bloklama)**.

## ترتيب التنفيذ — السلايد 25
بدنا **S1** ضمن P1 تخلص قبل **S2** ضمن P2:
```text
synch = 0
P1: S1; signal(synch);
P2: wait(synch); S2;
```
هيك P2 بتضل ناطرة حتى P1 تبعث Signal، وبعدها بتبدأ S2.

**Mutex vs Semaphore:** Mutex غالبًا إلها Owner (sahiplik)، أما Semaphore بتعد Permits، وممكن Thread مختلفة تبعث Signal.

**مثال خارج السلايد:** Connection Pool بسعة 3 ممكن يحميه Counting Semaphore.
