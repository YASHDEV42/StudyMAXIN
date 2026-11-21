## Loadable Kernel Modules (yüklenebilir çekirdek modülleri)
بدل ما ندمج كل Driver وFile System بشكل ثابت، بعض الأنظمة بتسمح تحميل **Kernel Modules (çekirdek modülleri)** عند الإقلاع أو أثناء التشغيل. هيك منضيف دعم جديد بدون إعادة Build للنواة كاملة. الـ Module ممكن يتواصل مع Modules أخرى عن طريق Interfaces معرّفة. **Linux (Linux işletim sistemi)** بيدعم هالنموذج لعدة Drivers وFile Systems، لكنه بيضل بالتصنيف العام **Monolithic Kernel (tek parça çekirdek)** لأن هالـ Modules عادةً بتشتغل ضمن Kernel Space بصلاحيات مرتفعة.

## Hybrid Systems (hibrit sistemler)
الـ **Hybrid Architecture (hibrit mimari)** بتجمع أفكار من أكثر من نموذج بهدف الموازنة بين Performance وModularity وSecurity. السلايدات بتعرض Solaris وLinux كأنظمة Monolithic قابلة للتوسعة، وWindows وMac OS X ضمن أمثلة فيها قرارات تصميم هجينة. التصنيفات غالبًا تقريبية؛ المهم نفهم وين بتننفّذ الخدمة وكيف بتتواصل مع غيرها.

## Mac OS X (التصميم التاريخي بالسلايدات)
المخطط بيعرض **Aqua (Aqua arayüzü)** كواجهة، وفوق مستوى Kernel بيئات مثل Cocoa وQuickTime، وتحتها أجزاء **Mach (Mach mikroçekirdeği)** و**BSD (BSD alt sistemi)**. **Mach** بتتعامل مع Thread/Task Support، IPC وبعض Memory Management، و**BSD** بتوفر جزء من UNIX/POSIX Services، Networking وFile Systems. **I/O Kit** للإطار الخاص بالسواقات و**Kernel Extensions** للتمديدات. هاد وصف شرائح Mac OS X القديمة، مو مخطط مطابق لكل إصدار macOS حديث.

## iOS (الشرائح)
المخطط التعليمي يقسّم المنظومة إلى **Core OS، Core Services، Media Services، Cocoa Touch**. Core OS بالأسفل بيوفر وظائف النواة، Core Services لخدمات البيانات والتطبيقات، Media Services للصوت والصورة والفيديو، وCocoa Touch لواجهات التطبيقات.

## Android (الشرائح)
المخطط القديم بيبين بالأسفل **Linux Kernel (Linux çekirdeği)** لإدارة Memory وProcesses وDrivers والطاقة؛ وفوقه Libraries مثل SQLite وOpenGL وMedia Framework، ومعها Android Runtime وApplication Framework وApplications. المصدر بيذكر **Dalvik VM** وWebKit، وهدول أمثلة تاريخية بإصدارات قديمة؛ **مو وصف دقيق لكل إصدار Android حالي**.

## الفرق المهم
الـ **Modular Kernel (modüler çekirdek)** هو طريقة توسعة ديناميكية داخل النواة، أما الـ **Microkernel (mikroçekirdek)** بينقل خدمات أساسية لخارج Kernel. والـ Hybrid مو بس Label؛ هو اختيار مجموعة من آليات التصميم.

**توضيح خارج السلايدات:** إمكانية إزالة Module بدون Restart بتعتمد على Driver واعتماداته وسياسات النظام، مو خاصية مضمونة لكل Module.
