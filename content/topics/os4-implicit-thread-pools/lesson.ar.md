## Implicit Threading (dolaylı thread oluşturma)

السلايد 30 بيحكي إن إدارة مئات Threads يدويًا ممكن تعقّد المشروع. الحل هو **Implicit Threading**: نخلي Runtime Library (çalışma zamanı kütüphanesi) أو Compiler (derleyici) يدير إنشاء Threads وتوزيع Tasks (görevler) بدل ما نعمل كل شيء يدويًا. المحاضرة بتذكر Thread Pools وOpenMP وGCD.

## Thread Pool (iş parçacığı havuzu)

الفكرة بالسلايد 31: Web Server إذا أنشأ Thread جديدة لكل Request، مع عدد Requests كبير ممكن يستهلك RAM وCPU Time.

بدل هيك:

1. منجهّز عدد محدد من **Worker Threads (çalışan iş parçacıkları)**.
2. كل Request بتروح لـ **Task Queue (görev kuyruğu)**.
3. Worker فاضية بتاخد Task وبتنفذها.
4. لما تخلص، بترجع للـ Pool.
5. إذا كل Workers مشغولة، الطلب بينتظر أو بينرفض حسب Queue Policy (kuyruk politikası).

**Trade-off (ödünleşim):** Pool صغيرة بتزيد Waiting Time (bekleme süresi)، وكبيرة كثير بتسبب Memory/Context-Switch Overhead.

## Windows Thread Pool — السلايد 32

المثال بيستعمل `QueueUserWorkItem(&PoolFunction, NULL, 0)` حتى يرسل Task للـ Pool؛ والـ `PoolFunction()` بتشتغل ضمن Worker.

## أدوات المراقبة — سلايدات 33–34

- **Process Explorer (İşlem Gezgini):** بتشوف Thread ID (TID)، State، CPU Usage وعدد Context Switches.
- **Linux htop:** السلايد بيذكر زر `T` لعرض Threads، لكن اختصارات العرض بتختلف حسب الإعداد والإصدار.

**مثال خارج السلايد:** Processing Service عندها 8 Workers تعالج Images من Queue؛ بدل تشغيل Thread جديدة لكل Image.

**المهم:** Thread Pool ما بتضمن إن كل Request فورًا تبدأ؛ إذا Workers مشغولة، في Queue وانتظار.
