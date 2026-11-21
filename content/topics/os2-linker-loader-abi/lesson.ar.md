## من Source Code إلى برنامج شغّال

المصدر الأحدث (سلايدات الطبعة العاشرة) بيفصل **Linkers and Loaders (bağlayıcılar ve yükleyiciler)**، وهي من الإضافات المهمة اللي ما لازم نضيعها عند دمج الملفات.

1. الـ **Compiler (derleyici)** بيحوّل **Source Code (kaynak kod)** إلى **Relocatable Object File (yeniden konumlandırılabilir nesne dosyası)**، مثل `main.o`.
2. الـ **Linker (bağlayıcı)** بيربط Object Files والمكتبات وبيحل أسماء الرموز والمراجع، وبينتج **Executable (çalıştırılabilir ikili dosya)**.
3. الـ **Loader (yükleyici)** بيحمّل البرنامج للـ **Memory (bellek)** عند تشغيله، وبيجهّز مناطق الكود والبيانات والـ Dependencies.
4. الـ **Relocation (yeniden konumlandırma)** بتعدّل المراجع للعناوين الفعلية أو الترتيبات المناسبة للتحميل والتنفيذ.

بعض المكتبات بتنربط **Static Linking (statik bağlama)** ضمن Binary من البداية، وبعضها **Dynamic Linking (dinamik bağlama)** وقت تحميل أو تشغيل البرنامج. السلايدات بتعطي Windows **DLLs (dinamik bağlantı kitaplıkları)** مثال على Dynamic Libraries. مو معنى Dynamic Linking إنه كل المكتبات لازم تنحمّل لحظة أول أمر؛ في تفاصيل متعلقة بالـ Loader وLazy Binding حسب المنصة.

## ليش البرامج بتختلف بين الأنظمة؟

ملف تنفيذي معموله Build لنظام معيّن مرتبط بعوامل مثل **System Calls (sistem çağrıları)**، **Executable Format (çalıştırılabilir dosya biçimi)**، **Library APIs (kitaplık arayüzleri)**، ومعمارية CPU والـ **ABI (uygulama ikili arayüzü)**.

الـ **API (uygulama programlama arayüzü)** بيعرف الواجهة على مستوى الـ Source Code، أما الـ **ABI** فبيحدد كيف الدوال والبيانات بتتبادل على المستوى الثنائي: Register Conventions، Stack Layout، Data Sizes، Binary Format، وكيف تتعامل المكتبات مع البرنامج.

الشرائح بتشرح 3 طرق لتحسين Portability (taşınabilirlik):

- كتابة البرنامج بلغة **Interpreted (yorumlanan)** وعند كل نظام في Interpreter مناسب، مثل Python/Ruby.
- استخدام **Virtual Machine / RTE (sanal makine / çalışma zamanı ortamı)** مثل JVM لتنفيذ Bytecode على منصات مختلفة.
- كتابة كود بمواصفات ولغة Standard ثم **Recompile (yeniden derleme)** لكل نظام مستهدف.

مو أي طريقة بتضمن 100% Compatibility؛ مثلًا الاستدعاءات الخاصة بمنصة معيّنة ممكن تعيق النقل حتى لو اللغة مشتركة.

## مثال سلايد `read()`

بالـ POSIX، الدالة `read(int fd, void *buf, size_t count)` بتطلب القراءة من File Descriptor. الـ Return Value بتمثّل عدد Bytes المقروءة أو صفر للـ EOF أو -1 عند الخطأ. هاد مثال API بيبيّن أهمية Signature وReturn Semantics.

**توضيح إضافي خارج السلايدات:** مشروع C ممكن يعيد Compile على Linux وWindows لكن لازم تتعامل مع اختلافات النظام والـ Libraries والـ Target ABI.
