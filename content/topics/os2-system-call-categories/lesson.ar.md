## التصنيف حسب الوظيفة

السلايدات بتقسم الـ **System Calls (sistem çağrıları)** لست مجموعات. أسماء الدوال اللي بالشرائح بعضها **Conceptual Examples (kavramsal örnekler)** أو APIs مختلفة بين الأنظمة؛ الفكرة الأساسية هي العملية، مو حفظ اسم افتراضي على إنه دالة Kernel متاحة بكل مكان.

### 1. Process Control (süreç kontrolü)

إنشاء Process وإنهاؤها: `create process` و`terminate process`، إنهاء طبيعي **end** أو استثنائي **abort**، تحميل وتشغيل برنامج **load/execute**، انتظار وقت أو Event، Signal Event، وإدارة Memory Allocation. كمان مهم **Acquire Lock (kilit edinme)** و**Release Lock (kilit bırakma)** عند مشاركة البيانات. الـ **Memory Dump (bellek dökümü)** ممكن يساعد Debugger بعد فشل البرنامج.

الشرائح بتقارن نموذج **Single-tasking (tek görevli)** تاريخيًا مثل MS-DOS مع **Multitasking (çok görevli)** مثل FreeBSD. ببرنامج واحد فقط، نقل التحكم إلى برنامج جديد محدود؛ بالـ Multitasking، الـ Shell ممكن يبقى نشط ويشغّل عدة Processes. ملف الطبعة العاشرة بيعطي مثال Arduino Sketch/Bootloader كبيئة مدمجة بسيطة، ومثال FreeBSD اللي فيه Shell بتستخدم `fork()` وبعدها `exec()` وبرجع Status من `exit()`.

### 2. File Management (dosya yönetimi)

إنشاء/حذف الملفات، `open` و`close`، `read` و`write`، تغيير موضع القراءة **reposition**، وجلب/تعديل File Attributes. بعض السلايدات بتذكر `copy` و`move` كعمليات عالية المستوى؛ مو لازم نفترض إنهما Kernel System Calls منفصلة على كل OS.

### 3. Device Management (aygıt yönetimi)

طلب جهاز أو مورد **request device**، تحريره **release device**، القراءة/الكتابة/تغيير الموضع، خصائص الجهاز، والربط والفصل المنطقي. المورد ممكن يكون Device حقيقي أو Virtual Device.

### 4. Information Maintenance (bilgi bakımı)

جلب/ضبط الوقت والتاريخ، معلومات النظام، بيانات Process/File/Device، ومن ضمنها System Version والـ Free Memory. بعض الأدوات بتستخدم Dump وTimer Interrupts للمراقبة والتشخيص.

### 5. Communications (iletişim)

إنشاء وإغلاق Communication Connection، إرسال واستقبال Messages، ونقل حالة النظام أو ربط أجهزة بعيدة. في نموذجين:

- **Message Passing (mesaj iletimi):** البيانات بتمر برسائل مباشرة أو عبر Mailbox؛ نظام التشغيل بيساعد بنقلها.
- **Shared Memory (paylaşılan bellek):** العمليات بتتشارك مساحة Memory بعد إنشاءها وإرفاقها؛ بعدها لازم التنسيق على البيانات المشتركة لتفادي Race Conditions.

### 6. Protection (koruma)

التحقق من Access Permissions وتعديلها، ومنح/سحب صلاحية مستخدم، بحيث Process ما تتجاوز صلاحياتها.

## أمثلة Windows وUNIX بالجدول

**Process:** Windows `CreateProcess` مقابل UNIX `fork`/ `exec`. **File:** Windows `CreateFile/ReadFile/WriteFile` مقابل UNIX `open/read/write`. **Information:** Windows `GetCurrentProcessID` مقابل UNIX `getpid`. **Communication:** Windows `CreatePipe` مقابل UNIX `pipe`. **Protection:** Windows Security APIs مقابل UNIX `chmod/umask/chown`. المقارنة تقريبية حسب الوظيفة، مو مساواة تامة بالـ Semantics.

**توضيح خارج السلايدات:** لما Process تشارك Counter مع Process ثانية عبر Shared Memory، لازم Lock أو Atomic Operations حتى الزيادتين ما يضيعوا بالتنافس.
