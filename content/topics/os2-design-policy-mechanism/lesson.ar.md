## ما في تصميم واحد لكل الأجهزة
السلايدات بتبدأ من **Design Goals (tasarım hedefleri)**، اللي بتتغير حسب الـ Hardware (donanım) ونوع النظام: Single-user، Multiuser، Real-Time، Distributed، General-purpose أو Special-purpose.

**User Goals (kullanıcı hedefleri):** المستخدم بدّه نظام سهل يتعلمه ويستخدمه، سريع، مستقر وآمن. **System Goals (sistem hedefleri):** المصمّم بدّه OS مرن، موثوق، قابل للصيانة، كفؤ وصحيح وظيفيًا. أحيانًا في Trade-offs (ödünleşimler): تحسين Performance ممكن يزيد تعقيد الـ Implementation.

## Policy مقابل Mechanism
**Policy (kural / politika)** بتحدد **شو القرار المطلوب؟**، مثل: «قديش CPU Time نعطي لعملية؟» أو «أي Process أولًا؟». **Mechanism (mekanizma)** بيحدد **كيف ننفّذ القرار؟** مثل Timer Interrupt وContext Switch.

الشرائح بتعطي مثال Timer: وجوده وطريقة إيقاف التنفيذ Mechanism، أما تحديد الفترة والجدولة فهو Policy. فصل الـ Policies عن الـ Mechanisms بيخلي النظام قابل لتغيير القرارات بدون إعادة بناء كل التنفيذ؛ بس بدّه تصميم واجهة واضحة بينهم.

## Implementation (gerçekleştirme)
أنظمة التشغيل الأولى انكتبت كثير منها بـ **Assembly (assembly dili)** لقربها من العتاد. لاحقًا صارت تستخدم لغات عالية المستوى مثل C وC++، مع أجزاء Assembly للأوامر الخاصة بالمعالج، وأدوات نظام ممكن تكون بلغات أخرى أو Scripts. المعمارية غالبًا خليط لغات حسب الجزء.

المزايا المهمة للغات الأعلى: **Portability (taşınabilirlik)**، سهولة قراءة الكود وصيانته، واستخدام Compiler Optimizations. لكن Runtime Overhead أو تفاصيل Hardware-Specific Code بتظل تحديات؛ عبارة «كل كود عالي المستوى أبطأ دائمًا» تبسيط تاريخي من السلايدات، وليست قاعدة عامة مطلقة.

## مثال ربط بالمادة
الـ Scheduler بحاجة لسياسة تحدد الأولويات والـ Time Slice، ولآلية تحفظ State وتبدّل Process. فصل القرار عن التنفيذ بيخليك تغيّر خوارزمية الجدولة بدون تغيير تعليمات حفظ الـ Registers.

**توضيح خارج السلايدات:** هاد المبدأ بيتكرر بالـ Networking: Routing Policy مين الطريق الأفضل، وForwarding Mechanism كيف تنقل Packet فعليًا.
