## Multiprogramming وMultitasking

الـ **Multiprogramming (çoklu programlama)** بيحتفظ بأكثر من برنامج بالذاكرة، ولما الـ **Process (süreç)** الحالية تنتظر عملية I/O، بيختار الـ OS عملية ثانية جاهزة؛ الهدف إن الـ CPU ما يضل عاطل طالما في عمل ممكن ينفّذ.

الـ **Multitasking / Time Sharing (çoklu görev / zaman paylaşımı)** بيوسّع الفكرة: المعالج بينتقل بسرعة بين Processes حتى لو ما كانت العملية الأولى عم تنتظر I/O، لتحسين التفاعل و**Response Time (tepki süresi)**. لو في عدة عمليات جاهزة، **CPU Scheduling (işlemci zamanlaması)** بيحدد مين تاخد المعالج. أما **Job Scheduling (iş zamanlaması)** فبيرتبط باختيار الأعمال اللي رح تدخل الذاكرة أو مجموعة التنفيذ.

## Dual Mode وTimer

لتنظيم الصلاحيات في **User Mode (kullanıcı modu)** و**Kernel Mode (çekirdek modu)**، الجهاز بيدعم **Mode Bit (mod biti)** بيميّز نمط التنفيذ. بالتمثيل الموجود بالشرائح: 1 للمستخدم و0 للنواة. العمليات الحساسة أو **Privileged Instructions (ayrıcalıklı komutlar)** ما بتتنفّذ من تطبيق عادي مباشرة. بدل هيك التطبيق بيستخدم **System Call (sistem çağrısı)** لطلب خدمة من النواة.

الـ **Timer (zamanlayıcı)** بيساعد النظام يرجع يتحكم بالـ CPU بشكل دوري، حتى لو عملية ضلت تشتغل أو دخلت بحلقة لا نهائية.

## Process وMemory

الـ **Program (program)** تعليمات مخزنة، أما الـ **Process (süreç)** فهو تنفيذ فعّال لهالبرنامج. العملية بتحتاج CPU وMemory وFiles وI/O. الـ **Program Counter (program sayacı)** بيحمل عنوان التعليمة التالية، وبالعملية متعددة الـ Threads ممكن يكون لكل Thread مسار تنفيذ مستقل.

الـ OS مسؤول عن إنشاء العمليات وإنهائها، جدولتها، مزامنتها، وتواصلها. وبـ **Memory Management (bellek yönetimi)** بيراقب أي مناطق ذاكرة مستخدمة، وبخصص المساحات وبيحررها، وبيقرر شو يتحمّل للذاكرة.

## File System وI/O وSecurity

**File-System Management (dosya sistemi yönetimi)** بيوفر تجريدًا للبيانات على شكل ملفات ومجلدات، وبيتعامل مع القراءة والكتابة والإنشاء والحذف والتحكم بالوصول. **Storage Management (depolama yönetimi)** بيدير وسائط التخزين، بينما **I/O Management (giriş/çıkış yönetimi)** بيدير الأجهزة وعمليات نقل البيانات.

**Protection (koruma)** بيوصف ضبط صلاحيات الوصول للموارد، و**Security (güvenlik)** بيوسّع الحماية ضد التهديدات والاستخدام غير المصرّح. من بنى البيانات المذكورة للنواة: Linked Lists وStacks وQueues وTrees وHash Tables وBitmaps.

## بيئات التشغيل

الشرائح بتعرض أجهزة تقليدية ومحمولة، و**Client–Server (istemci-sunucu)** و**Peer-to-Peer (eşler arası)** و**Distributed Systems (dağıtık sistemler)**، بالإضافة إلى **Virtualization (sanallaştırma)** و**Cloud Computing (bulut bilişim)** والأنظمة المدمجة، وأنظمة **Free and Open-Source (özgür ve açık kaynaklı)**.

**مثال توضيحي خارج الشرائح:** لو Process عم تنتظر قراءة ملف، النظام ممكن يعطي CPU لعملية جاهزة، لكن لو برنامج بUser Mode طلب قراءة ملف محمي لازم يمر بطلب نظام وفحص صلاحيات.
