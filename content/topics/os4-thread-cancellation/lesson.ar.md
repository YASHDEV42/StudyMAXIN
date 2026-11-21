## Thread Cancellation (iş parçacığı iptali)

الفكرة بالسلايد 39 هي إنه نطلب إيقاف Thread قبل ما تخلص، مثلاً User ضغط Stop، أو واحدة من Search Workers لقت النتيجة وما عدنا بحاجة للبقية.

## نوعان أساسيان

**Asynchronous Cancellation (asenkron iptal):** إيقاف Thread بشكل مفاجئ من الخارج. الخطر إنه توقف وهي ماسكة **Lock (kilit)** أو وسط تعديل Shared Data، وتترك حالة غير سليمة.

**Deferred Cancellation (ertelenmiş iptal):** طلب الإلغاء بينتظر Thread توصل إلى **Cancellation Point (iptal noktası)**، وهاد بيتيح Cleanup (kaynak temizliği) بشكل أحسن.

## جدول السلايد

| Mode | State | Type |
| --- | --- | --- |
| Off | Disabled | — |
| Deferred | Enabled | Deferred |
| Asynchronous | Enabled | Asynchronous |

دالة Pthreads `pthread_cancel(tid)` بتبعث Cancellation Request (iptal isteği)؛ **ما في ضمان إن Thread خلصت فور رجوع الدالة**. للتأكد من انتهاء Worker، ممكن تحتاج `pthread_join()` وتعامل صحيح مع Resources.

**تصحيح عبارة بالسلايد:** ضغط Stop بالمتصفح مو بالضرورة بيلغي كل Threads ضمن Browser Process؛ بيختلف حسب تصميم التطبيق.

**مثال إضافي:** Worker بتكتب ملف: إذا لغيناها بنص الكتابة، لازم نضمن إغلاق الملف والتراجع عن البيانات الناقصة.
