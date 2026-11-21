## Critical Section (kritik bölüm)
السلايد 11 بيقسم الكود إلى **Entry Section (giriş bölümü)** لأخذ Permission، بعدها **Critical Section (kritik bölüm)** لتعديل Shared Resource (paylaşılan kaynak)، ثم **Exit Section (çıkış bölümü)** لتحرير Lock، وأخيرًا **Remainder Section (kalan bölüm)** للشغل العادي.

## الشروط الثلاثة — السلايد 12
1. **Mutual Exclusion (karşılıklı dışlama):** Process واحدة فقط بتدخل نفس المنطقة المحمية باللحظة، مو إنه كل النظام لازم يوقف.
2. **Progress (ilerleme):** لو المنطقة فاضية وفي Processes بدها تدخل، قرار اختيار واحدة ما لازم يتأجل بلا نهاية.
3. **Bounded Waiting (sınırlı bekleme):** لازم يكون في حد لتجاوز غيرها لProcess ناطرة، حتى ما يصير **Starvation (aç kalma)**.

الـ Progress مش معناها تناوب Producer وConsumer فورًا. الـ Bounded Waiting مش معناها دخول الجميع بنفس اللحظة.

السلايد 13 بيذكر **Preemptive Kernel (kesintili çekirdek)** و**Nonpreemptive Kernel (kesintisiz çekirdek)**. **توضيح خارج السلايد:** Nonpreemptive ما بيعني أمان كامل على Multicore؛ Core ثانية ممكن تعدّل Shared Kernel Data بالتزامن.

**مثال إضافي:** تحديث Balance في بنك لازم يكون محمي، بس Process مستقلة بتكتب ملف مختلف مو بالضرورة تستخدم نفس Lock.
