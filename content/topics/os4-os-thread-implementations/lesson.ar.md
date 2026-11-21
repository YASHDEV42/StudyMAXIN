## Windows Thread Internals — السلايد 40

الـ Windows بتستخدم غالبًا **One-to-One Mapping (bire bir eşleme)** للـ User Threads والـ Kernel-Scheduled Threads. بالمخطط في ثلاث Data Structures (veri yapıları):

- **ETHREAD (yürütücü iş parçacığı bloğu):** معلومات إدارة Thread وربطها بـ Parent Process.
- **KTHREAD (çekirdek iş parçacığı bloğu):** معلومات Kernel Scheduling (çekirdek zamanlaması) وSynchronization وKernel Stack.
- **TEB — Thread Environment Block (iş parçacığı ortam bloğu):** معلومات User-Mode مرتبطة بـ Thread، مثل Thread ID وThread-Local Storage (iş parçacığına özgü depolama).

الـ **Thread Context (iş parçacığı bağlamı)** بيشمل Register Values (yazmaç değerleri) وStack وProgram Counter اللازمة حتى Thread تكمّل تنفيذها.

## Linux Threads — السلايد 41

Linux بيمثّل Processes وThreads عبر **Task (görev)** ضمن الـ Kernel، وبنية مهمة اسمها **`task_struct` (görev veri yapısı)**.

المحاضرة بتعرض **`clone()`** لإنشاء Task وتحديد شو بدنا نشارك بين Parent وChild حسب Flags (bayrak bitleri):

| Flag              | شو بيشارك؟                                               |
| ----------------- | -------------------------------------------------------- |
| **CLONE_FS**      | File-System Context (dosya sistemi bağlamı)              |
| **CLONE_VM**      | Address Space / Virtual Memory (sanal bellek)            |
| **CLONE_SIGHAND** | Signal Handlers (sinyal işleyicileri)                    |
| **CLONE_FILES**   | Open File Descriptor Table (açık dosya tanıtıcı tablosu) |

**fork() (çatallama)** بيعمل Child Process، بينما `clone()` بيسمح تحكّم أدق في مشاركة الـ Resources. مهم ننتبه إن CLONE_FS مش معناها مشاركة كل محتويات Disk؛ المقصود معلومات سياق الملفات مثل Current Working Directory.

## المقارنة

**Windows:** بتنظم Thread عبر ETHREAD وKTHREAD وTEB. **Linux:** بتستخدم Tasks و`task_struct` وFlags بتتحكم بالمشاركة.

**معلومة خارج السلايد:** تفاصيل `clone3()` و`futex` الحديثة مو موجودة بالمحاضرة؛ هون التغطية مقتصرة على النموذج الوارد بالسلايد.
