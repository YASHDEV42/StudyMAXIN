## Thread (iş parçacığı) شو يعني؟

الـ **Thread (iş parçacığı)** هي وحدة تنفيذ ضمن **Process (işlem)**. الـ Process ممكن يكون فيها Thread واحدة أو أكثر. مثال المحاضرة: برنامج الكتابة ممكن Thread تستقبل إدخال الكيبورد، وThread ثانية تعمل Spell Check (yazım denetimi)، وثالثة تحدّث الشاشة.

## شو اللي بيتشاركوه؟

حسب مخطط السلايدات 2–3، Threads ضمن نفس Process بيتشاركوا **Code (kod)** و**Data (veri)** و**Heap (öbek)** و**Open Files (açık dosyalar)** وAddress Space (adres alanı). لكن لكل Thread **Program Counter (program sayacı)** و**Registers (yazmaçlar)** و**Stack (yığın)** مستقلين.

لهيك لازم نصحح تعميم بالسلايد: مو أي Variable بتنعمل داخل Thread بتصير مشتركة؛ **Local Variables (yerel değişkenler)** على Stack تبعها مستقلة عادة، بينما Global/Heap Data ممكن يكون مشترك.

## الفرق عن Process

الـ Processes غالبًا معزولة بــ **Memory Protection (bellek koruması)**، أما Threads ضمن Process واحدة بتوصل لنفس الذاكرة. Thread غالبًا أرخص من Process بإنشائها والتبديل بينها، بس مو بدون تكلفة. وخطأ بكتابة Shared Memory ممكن يخرب بيانات بقية Threads.

## الفوائد الأربعة المذكورة بالسلايد 7

1. **Responsiveness (yanıt verebilirlik):** واجهة المستخدم بتضل ترد رغم وجود عملية طويلة.
2. **Resource Sharing (kaynak paylaşımı):** الوصول لنفس الموارد أسهل.
3. **Economy (ekonomiklik):** إنشاء Threads والتبديل بينها ممكن يكون أقل كلفة.
4. **Scalability (ölçeklenebilirlik):** توزيع Threads على Cores متعددة.

مثال **Web Server (web sunucusu)** بالرسم: Listener بيستقبل الطلبات وبسلم الشغل لThreads، وبيرجع يكمل استقبال. لكن مو شرط كل Request يعمل Thread جديدة؛ الـ Thread Pool لاحقًا بيعيد استخدام Threads جاهزة. وكمان مش لازم تتغير Listening Port لكل Client.

**تنبيه من خارج السلايد:** لو Thread A وThread B زادوا نفس Counter بنفس اللحظة، لازم Synchronization (eşzamanlama) حتى نتجنب Race Condition (yarış durumu).

النسب التاريخية المذكورة عن Solaris (30× و5×) مجرد نتائج على نظام معيّن، مو قانون عام.
