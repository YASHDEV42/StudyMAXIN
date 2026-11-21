## Monitor (izleyici)
السلايدات 31–33 بتشرح ليش Semaphore سهلة ينكتب استخدامها غلط: لو كتبنا `signal()` قبل `wait()` ممكن نكسر **Mutual Exclusion (karşılıklı dışlama)**، ولو عملنا `wait()` مرتين بدون تحرير ممكن نعلق بـ **Deadlock (kilitlenme)**.

الـ **Monitor (izleyici)** بتجمع Shared Variables (paylaşılan değişkenler) مع Functions (fonksiyonlar) اللي بتتعامل معها، وبتضمن إن Thread واحدة فقط تنفذ داخل الـ Monitor باللحظة ضمن النموذج.

## Condition Variables (durum değişkenleri)
السلايد 33 بيعرف `condition x,y` ومعها:
- **x.wait() (bekleme):** Thread بتترك Lock الخاصة بالـ Monitor مؤقتًا وبتنتظر Condition، وعند الاستيقاظ بترجع تكتسبها.
- **x.signal() (uyandırma):** بتنبه Thread منتظرة حسب قواعد التنفيذ.

## Signal-and-Wait vs Signal-and-Continue
**Signal-and-Wait (işaret ver ve bekle):** اللي أعطى Signal بينتظر، والمنتظرة ممكن تدخل مباشرة ضمن نموذج Hoare.

**Signal-and-Continue (işaret ver ve devam et):** المرسلة بتكمّل، والمستيقظة بتنتظر دورها للـ Lock؛ لازم ترجع تتأكد من Condition، ضمن نموذج Mesa الشائع.

**توضيح خارج السلايد:** Consumer بتنتظر `notEmpty`، ولما Producer تضيف Item بتعمل Signal. لازم Always تتحقق من Predicate (koşul) المناسبة عند الاستيقاظ، مش تعتمد إنه كل شيء لسه مثل ما كان.
