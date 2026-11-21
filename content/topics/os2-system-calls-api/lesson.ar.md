## ليش منحتاج System Call؟

التطبيق بيشتغل عادةً ضمن **User Mode (kullanıcı modu)** وما معه صلاحية ينفّذ كل عمليات الأجهزة أو الوصول لذاكرة الـ Kernel. الـ **System Call (sistem çağrısı)** هي الآلية المنضبطة ليطلب خدمة من **Kernel (çekirdek)**؛ مثل فتح ملف، إنشاء Process، أو قراءة بيانات من Device.

مخطط الشرائح بيربط: **Application → API/Library → System Call Interface → Kernel Service → Return**. يعني لما بتكتب `open()` ضمن برنامج، غالبًا انت عم تستخدم واجهة مكتبة وبيئة Runtime، اللي بتحوّل الطلب لخدمة مناسبة بالنواة. ما لازم نساوي اسم الـ API دائمًا باسم System Call الحقيقي.

## API مقابل System Call مقابل ABI

**API — Application Programming Interface (uygulama programlama arayüzü)** هو العقد البرمجي اللي المطور بيستعمله: أسماء الدوال، Parameters، Return Values، وسلوكها المتوقع. من الأمثلة بالمحاضرة **Windows API، POSIX API، Java API**.

**System Call Interface (sistem çağrı arayüzü)** بيستقبل الطلب على الحد بين User Mode وKernel Mode، ويختار تنفيذ خدمة النظام المطلوبة. غالبًا في **System Call Number (sistem çağrı numarası)** يساعد على تحديد الوظيفة المقصودة. **Run-Time Environment / RTE (çalışma zamanı ortamı)** بيشمل مكتبات وروابط التنفيذ والخدمات اللي بترافق البرنامج وقت تشغيله.

**ABI — Application Binary Interface (uygulama ikili arayüzü)** أوسع من استدعاء دالة على مستوى Source: بيحدد قواعد الاستدعاء، تنظيم Registers وStack، أحجام الأنواع، تنسيق الثنائيات والتوافق بين Binary وOS/Architecture. رح نرجعله بمحور Portability.

## مثال File Copy

حتى تنسخ ملف، التطبيق بحاجة يتعامل مع خطوات مثل: الحصول على اسم Source وDestination، فتح الملفات، التعامل مع الأخطاء، حلقة **read → write**، إغلاق الملفات، ثم إنهاء العملية. هاد بيبيّن ليش برنامج «بسيط» بيستخدم عدة System Calls.

الشرائح بتعرض مثال `printf()` من Standard C Library اللي ممكن ينتهي بطلب `write()` للـ OS. بس `printf()` نفسها Library Function، مو System Call مباشرةً، وممكن يصير Output Buffering قبل الكتابة الفعلية.

## كيف منمرر Parameters؟

1. **Registers (yazmaçlar):** المعاملات مباشرة ضمن CPU Registers، بس العدد والحجم محدودين.
2. **Memory Block/Table (bellek bloğu/tablosu):** البرنامج بيحط المعاملات بالذاكرة وبيمرر عنوانها عبر Register؛ الشكل بالشرائح بيعرض عنوان جدول X ضمن Register.
3. **Stack (yığın):** المعاملات بتنحط على Stack وبيرجع النظام يقرأها وفق الاتفاق.

**ملاحظة تقنية خارج السلايدات:** API ما بيعني إنه نفس الـ Binary رح يشتغل تلقائيًا بكل الأنظمة؛ Portability بتعتمد على توفر نفس الواجهة وطريقة بناء مناسبة لكل Target.
