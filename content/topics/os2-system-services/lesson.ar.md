## الفكرة الأساسية

الـ **Operating System Services (işletim sistemi servisleri)** هي الوظائف اللي نظام التشغيل بيقدّمها للتطبيقات والمستخدمين. النظام مو مجرد واجهة جميلة: كمان مسؤول عن تشغيل البرامج، التعامل مع الأجهزة والملفات، تنظيم التواصل، وكشف الأخطاء. مخطط الخدمات بالسلايدات بيرسم العلاقة بهالتسلسل: مستخدم وبرامج → User Interfaces → System Calls → OS Services → Hardware. يعني الـ **System Calls (sistem çağrıları)** بوابة للوظائف المحمية، مو هي نفسها كل خدمة النظام.

## خدمات بتساعد المستخدم والبرنامج

- **User Interface (kullanıcı arayüzü):** ممكن تكون **CLI (komut satırı arayüzü)** أو **GUI (grafik kullanıcı arayüzü)** أو **Batch (toplu işlem arayüzü)** أو Touchscreen.
- **Program Execution (program yürütme):** تحميل البرنامج للذاكرة، تشغيله وإنهاؤه بشكل طبيعي أو عند حدوث خطأ.
- **I/O Operations (giriş/çıkış işlemleri):** طلب قراءة أو كتابة من جهاز؛ التطبيقات ما لازم تتجاوز حماية الأجهزة وتتحكم فيها بلا تنسيق.
- **File-System Manipulation (dosya sistemi işlemleri):** إنشاء وفتح وقراءة وكتابة وحذف وإعادة تسمية الملفات والمجلدات، مع ضبط الصلاحيات.
- **Communications (iletişim):** التواصل بين Processes على نفس الجهاز أو أجهزة عبر شبكة، باستخدام **Shared Memory (paylaşılan bellek)** أو **Message Passing (mesaj iletimi)**.
- **Error Detection (hata algılama):** كشف أخطاء CPU وMemory وI/O والبرامج والإبلاغ عنها، ومحاولة استعادة الاستقرار.

## خدمات بتخلي النظام فعّال

**Resource Allocation (kaynak tahsisi)** بتقرر كيف تتوزع موارد CPU والذاكرة والتخزين وI/O على المهام المتزامنة. **Accounting / Logging (kaynak kullanımı kaydı / günlükleme)** بيسجل مين استخدم الموارد وقديش؛ بيفيد بالإحصاءات والفوترة والتشخيص. **Protection (koruma)** بتضبط مين مسموح له يوصل لمورد، و**Security (güvenlik)** بتحمي النظام من التهديدات والوصول غير المصرّح.

### فرق مهم للامتحان

الـ **Error Detection** مو نفسها **Protection**: الأولى بتلاحظ خطأ أثناء التشغيل وبتستجيب إله، أما الثانية فبتحط حدود وصلاحيات قبل أو أثناء الوصول. والـ **Resource Allocation** مو Accounting: الأولى بتعطي الموارد، والثانية بتسجل استهلاكها.

**مثال إضافي خارج السلايدات:** لما برنامج يطبع ملف، الـ File System بيجيب البيانات، الـ I/O Service بيتعامل مع الطابعة، الـ Resource Allocator بينظم طلبات الأجهزة، والـ Accounting ممكن يسجل الاستخدام.
