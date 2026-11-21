## Debugging (hata ayıklama) مو بس إصلاح خطأ

الـ **Operating System Debugging (işletim sistemi hata ayıklama)** هو عملية اكتشاف سبب الـ Bug وإصلاحه، سواءً ببرنامج User Space أو بمكوّن ضمن الـ Kernel. السلايدات بتربط Debugging كمان بـ **Performance Tuning (performans ayarlaması)**: مو كل مشكلة أداء معناها Crash، بس ممكن يكون في خطأ تصميم أو ضغط على مورد.

## Evidence وقت حدوث المشكلة

لما Process تفشل، النظام ممكن يسجل **Log (günlük kaydı)** فيه معلومات عن الخطأ ووقت حدوثه وحالة الخدمة. أحيانًا بيتسجل **Memory Dump / Core Dump (bellek dökümü)**، وهو لقطة من أجزاء الذاكرة وحالة التنفيذ وقت الفشل. الـ **Debugger (hata ayıklayıcı)** بيستخدم الـ Dump والـ Stack Trace والـ Symbols ليفهم سبب الخطأ. إذا المشكلة داخل Kernel ممكن يكون الحدث **Kernel Crash (çekirdek çökmesi)** بأثر كبير على النظام.

الـ Memory Dump مو شرط يُنتج تلقائيًا بأي فشل؛ هاد بيعتمد على إعدادات النظام والصلاحيات ونوع الحادث.

## Performance Tuning

إذا الجهاز بطيء لازم نقيس قبل ما نغير الإعدادات. **Monitoring (izleme)** بيشوف CPU Usage وMemory Pressure وDisk I/O وNetwork Activity، وبعدين منبحث عن **Bottleneck (darboğaz)**: المورد اللي عم يحد الأداء.

السلايدات بتعرض **Windows Task Manager (Görev Yöneticisi)** لمراقبة الاستهلاك والعمليات، وبتلمح لأدوات تحليل Performance. ممكن ارتفاع CPU يكون شغل طبيعي، بينما Disk I/O عالي أو ضغط Memory هو السبب الفعلي للتباطؤ.

## Debugging مقابل Tuning

**Debugging:** ليش النتيجة غلط أو العملية عم تنهار؟ **Performance Tuning:** ليش النتيجة صحيحة بس بطيئة أو مواردها غير متوازنة؟ أحيانًا بيتداخلوا لما Bug يعمل Loop أو Memory Leak.

## موضوع البحث المذكور بالمصدر

آخر شريحة من ملف الأسبوع الثاني بتطلب **Kernel Debugging Research (çekirdek hata ayıklama araştırması)** كواجب. هاد تكليف بالمصدر، مو درس مفصّل أو دليل لتنفيذ Kernel Debugger؛ لذلك ما بنختلق خطوات عملية غير موجودة بالسلايدات.

**مثال توضيحي خارج الشرائح:** إذا خدمة عم تستهلك RAM بشكل متصاعد، المراقبة بتكشف الاتجاه، أما Debugger/Profiling ممكن يحدد الكائنات اللي ما عم تتحرر.
