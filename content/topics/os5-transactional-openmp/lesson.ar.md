## Transactional Memory (işlemsel bellek)
السلايدات 34–35 بتعرض طريقة بديلة عن إدارة Locks يدويًا. بدل `acquire(); update shared data; release();`، النموذج بيسمح بتحديد **Atomic Block (atomik blok)**:
```text
atomic {
  // modify shared data
}
```
الهدف يكون مجموعة التعديلات كأنها Operation (işlem) واحدة؛ يا بتنجح معًا أو نظام Transactions بيرجع يحاول/يلغي حسب Implementation. **تنبيه:** السلايد بتقول إنها تمنع Deadlock كليًا، لكن ما منعمم هاد الادعاء على جميع Implementations؛ Transactions ممكن تفشل أو تعيد المحاولة، وفي قيود دعم وأداء.

## OpenMP Critical — السلايد 36
OpenMP (Open Multi-Processing / açık çoklu işleme) بتعطي Compiler Directive (derleyici yönergesi) للـ C/C++/Fortran:

```c
void update(int value) {
  #pragma omp critical
  {
    counter += value;
  }
}
```

هيك **Critical Region (kritik bölge)** المعلّمة بنفس OpenMP Critical Name بتسمح لـ Thread واحدة فقط تنفذها في اللحظة. لكن شو بيصير بباقي الكود خارجها؟ ممكن Threads ثانية تكمل شغلها. الـ Compiler وRuntime مسؤولين عن إدارة القفل.

## مقارنة
**Mutex (kilit):** نحن ندير Acquire/Release. **Transactional Memory (işlemsel bellek):** منوصف Block لازم تتنفذ Atomically. **OpenMP Critical:** Compiler Directive بتطلب Mutual Exclusion ضمن Parallel Program.

**توضيح خارج السلايد:** حماية Counter بتحتاج إن كل طرق تحديثه تحترم نفس Synchronization؛ إذا في Code ثانية بتعدله بدون حماية، الخطر بيظل موجود.
