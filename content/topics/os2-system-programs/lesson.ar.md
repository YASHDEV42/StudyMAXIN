## System Call مو System Program
الـ **System Call (sistem çağrısı)** نقطة دخول لخدمة Kernel محمية، أما الـ **System Programs / System Utilities (sistem programları / sistem yardımcı programları)** فهي برامج أعلى من النواة بتستخدم خدماتها وبتوفّر أدوات جاهزة للمستخدم أو المطور. مخطط السلايد بيحط Hardware بالأسفل، بعدين OS، فوقه System Programs، وفوقها Application Programs؛ هاد **Conceptual Hierarchy** مو إلزاميًا ترتيب Process Layers حرفي بكل نظام.

## عائلات System Utilities
**File Management (dosya yönetimi):** `create`, `delete`, `copy`, `rename`, `list`, `print`, `dump` للملفات والمجلدات. **Status Information (durum bilgisi):** عرض الوقت، Disk Free Space، عدد المستخدمين، والـ Performance وLogs؛ أحيانًا Registry بتخزن إعدادات النظام. **File Modification (dosya değiştirme):** Text Editors وأدوات قراءة وتعديل البيانات.

**Programming-Language Support (programlama dili desteği):** **Compiler (derleyici)** و**Assembler (çevirici)** و**Debugger (hata ayıklayıcı)** و**Interpreter (yorumlayıcı)**. هاي أدوات بيساعد وجودها على التطوير، لكنها مو جزء لازم من Kernel.

**Program Loading and Execution (program yükleme ve çalıştırma):** أدوات لتحميل Executables وتشغيلها، وبعضها بيساعد تصحيح البرامج أثناء التنفيذ. **Communications (iletişim):** برامج Messages وEmail وWeb وRemote Access وFile Transfer.

## Background Services
في برامج بتبدأ مع **Boot (önyükleme)** وبتنتهي بعد مهمة التهيئة، وفي برامج بتضل شغالة طالما النظام شغّال. هالخدمات اسمها **Services / Daemons (hizmetler / arka plan süreçleri)**، مثل مراقبة الأخطاء وPrinter Queue وخدمات الشبكة. بعض الـ Daemons بتشتغل في User Space (kullanıcı alanı)، وهذا بيقلّل الحاجة نضيف كل وظيفة للنواة.

## Applications
الـ **Application Programs (uygulama programları)** مثل Browser وSpreadsheet وGames بتعمل وظائف المستخدم النهائية. ممكن تتوزع مع النظام بس ما بتصير بالضرورة System Utilities أو Kernel Components.

**مثال إضافي خارج الشرائح:** الـ `cp` هو Program ممكن يستخدم عدة Calls مثل `open` و`read` و`write`، مش عبارة عن System Call واحدة على كل نظام.
