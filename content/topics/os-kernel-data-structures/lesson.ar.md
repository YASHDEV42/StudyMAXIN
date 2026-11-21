## ليش الـ Kernel بحاجة Data Structures؟

الـ **Kernel (çekirdek)** بيدير Processes وMemory وI/O، فبيحتاج **Data Structures (veri yapıları)** لتنظيم العناصر والوصول إلها بكفاءة. الشرائح بتذكر أشكال قياسية من البرمجة، لكن استخدامها هون مرتبط بإدارة موارد النظام.

**Linked List (bağlı liste):** سلسلة من Nodes مرتبطة بـ Pointers. بالـ **Singly Linked List (tek yönlü bağlı liste)** كل عنصر بيشير للتالي؛ بالـ **Doubly Linked List (çift yönlü bağlı liste)** في روابط للاتجاهين؛ وبالـ **Circular Linked List (dairesel bağlı liste)** آخر عنصر بيرتبط ببداية السلسلة.

**Stack (yığın):** سياسة **LIFO (son giren ilk çıkar)**؛ آخر عنصر أُضيف بينزال أولًا. **Queue (kuyruk):** سياسة **FIFO (ilk giren ilk çıkar)**؛ أول عنصر دخل بيطلع أولًا. هالفرق أساسي عند فهم ترتيب العمليات.

**Tree (ağaç)** بيمثل علاقات هرمية. الـ **Binary Search Tree (ikili arama ağacı)** بيرتب القيم بحيث الأصغر بجهة والأكبر بجهة وفق قاعدة المقارنة. البحث ممكن يصير O(n) إذا الشجرة غير متوازنة، بينما بشجرة متوازنة عادة O(log n).

**Hash Map (karma haritası)** بيستخدم **Hash Function (karma fonksiyonu)** لربط Key بموقع تخزين. **Bitmap (bit haritası)** بيستخدم Bits لتمثيل حالة عدد كبير من الموارد بمساحة صغيرة، مثل حر/محجوز. المعنى الدقيق لـ 0 و1 بيحدده التصميم؛ مثال الشريحة 0 متاح و1 محجوز.

## Cache Coherence (önbellek tutarlılığı)

بتشرح الشرائح مشكلة نسخ البيانات عبر مستويات التخزين: لو نفس القيمة موجودة بالـ Cache والذاكرة وبـ CPU تانية، لازم النظام يحافظ على استخدام القيمة الصحيحة والأحدث. بالـ Multiprocessor بتظهر أهمية **Cache Coherence (önbellek tutarlılığı)**، وبالأنظمة الموزعة الموضوع أعقد بسبب النسخ الموجودة على أجهزة مستقلة.

## I/O Subsystem (G/Ç alt sistemi)

ضمن إدارة I/O في **Buffering (arabelleğe alma)** للاحتفاظ المؤقت أثناء النقل، و**Caching (önbelleğe alma)** لإبقاء نسخة سريعة، و**Spooling (biriktirerek sıraya alma)** لتنظيم أعمال الإخراج مثل الطباعة، إضافة لواجهات Drivers عامة ومتخصصة.

**مثال توضيحي خارج الشرائح:** الـ Bitmap ممكن يمثل 8 وحدات ذاكرة بثمانية Bits بدل تخزين حالة نصّية لكل وحدة.
