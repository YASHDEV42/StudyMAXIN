## OpenMP (açık çoklu işleme)

السلايد 35 بيعرض **OpenMP** كطريقة لـ Parallel Programming (paralel programlama) بلغات C وC++ وFortran، وبيعتمد على Compiler Directives (derleyici yönergeleri) وShared Memory (paylaşılan bellek).

لما نكتب `#pragma omp parallel` قبل Block، منطلب من Runtime تشغّل Parallel Region (paralel bölge). ومثال المحاضرة:

```c
#pragma omp parallel for
for (int i = 0; i < N; i++) {
  c[i] = a[i] + b[i];
}
```

الـ Loop بتنقسم بين Threads؛ كل واحدة بتحسب عناصر مختلفة، لذلك المثال مناسب للتوازي إذا ما في Dependencies (bağımlılıklar) بين التكرارات.

## GCD — Grand Central Dispatch (merkezi görev dağıtımı)

السلايد 36 بيشرح نظام Apple اللي بينظم **Blocks (kod blokları)** ضمن **Dispatch Queues (dağıtım kuyrukları)** بدل إدارة Threads يدويًا.

- **Serial Queue (seri kuyruk):** Block واحدة بتشتغل باللحظة ضمن نفس الطابور، وبتحافظ على ترتيب تنفيذها.
- **Concurrent Queue (eşzamanlı kuyruk):** ممكن Blocks كثيرة تتداخل بالتنفيذ؛ ترتيب الإنهاء مو مضمون.

مثال السلايد: `dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0)` بياخد Global Queue، وبعدها `dispatch_async(queue, ^{ ... });` بيحط Block فيها. الـ async معناها Caller غالبًا بترجع تكمل بدون انتظار انتهاء Block.

## الفرق الأساسي

**OpenMP:** تركيز على Parallel Regions وLoops باستخدام Compiler Directives. **GCD:** توزيع Tasks على Queues، وRuntime بتقرر Threads المناسبة.

**ملاحظة مصدرية:** أسماء Priority Constants المعروضة من نسخة أقدم من GCD، وواجهات QoS الحديثة قد تختلف.

**توضيح إضافي خارج السلايد:** Parallel Loop مش آمنة تلقائيًا إذا Threads كلها عم تعدّل Shared Counter بدون Synchronization (eşzamanlama).
