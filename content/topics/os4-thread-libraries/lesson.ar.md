## Thread Library (iş parçacığı kütüphanesi)

الـ Library بتعطينا API ننشئ ونشغّل وننتظر Threads. السلايد 22 بيفرّق بين **Asynchronous Threading (asenkron thread oluşturma)**، حيث Parent (üst iş parçacığı) بتكمل، و**Synchronous/Fork-Join (senkron / çatallan-birleştir)**، حيث Parent بتعمل Join لنتائج الـ Child Threads.

## Pthreads (POSIX iş parçacıkları) — سلايدات 23–25

مثال C بيحسب مجموع الأعداد حتى Limit:

- `pthread_t tid`: Thread ID (iş parçacığı kimliği).
- `pthread_attr_t attr`: Attributes (nitelikler).
- `pthread_attr_init(&attr)`: تهيئة الخصائص.
- `pthread_create(&tid, &attr, runner, argv[1])`: إنشاء Thread وتنفيذ Function اسمها `runner`.
- `pthread_join(tid, NULL)`: Parent بتنتظر انتهاء Thread.
- `sum` متغيّر Global Shared (paylaşılan genel değişken) للنتيجة.

السلايد 25 بيستخدم `workers[NUM_THREADS]` لمجموعة Threads. لو أكثر من Thread بتكتب على نفس `sum` بدون تنسيق، ممكن نواجه **Race Condition (yarış durumu)**.

## Windows Threads — سلايدات 26–27

الـ **CreateThread() (iş parçacığı oluşturma)** بتبدأ Thread لتنفيذ `Summation`. **WaitForSingleObject() (bir nesneyi bekleme)** بتنتظرها، و**CloseHandle() (tanıtıcıyı kapatma)** بتحرر الـ Handle. ولانتظار Threads كثيرة موجود `WaitForMultipleObjects()`.

## Java Threads — سلايدات 28–29

طريقتين بالمحاضرة: Class بتمتد **Thread** وبتعمل Override لـ `run()`، أو Class بتعمل **implements Runnable**. مثال `Summation implements Runnable` بينشئ Worker، وبيستخدم:

- **`start()` (başlatmak):** فعليًا تبدأ Thread جديدة.
- **`run()` (çalıştırmak):** وظيفة الشغل؛ استدعاؤها مباشرة ما بيبدأ Thread جديدة.
- **`join()` (tamamlanmasını beklemek):** الانتظار قبل قراءة النتيجة المشتركة.

**ملاحظة إضافية:** Virtual Threads الحديثة في Java خارج نطاق سلايدات المحاضرة؛ هون عم نشرح الأمثلة الكلاسيكية الموجودة بالمصدر.

**نقطة امتحان:** `pthread_create` و`CreateThread` و`Thread.start()` لكل نظام طريقة بدء، بينما `join` وWait Functions بتوفر الانتظار.
