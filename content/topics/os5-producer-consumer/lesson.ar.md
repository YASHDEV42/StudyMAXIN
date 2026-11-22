## Producer–Consumer (üretici–tüketici)

السلايدات 2–6 بتشرح مشكلة **Cooperating Processes (işbirlikçi işlemler)** اللي بتشارك Memory (bellek) أو Files (dosyalar). إذا اشتغلوا على نفس البيانات بدون Synchronization (eşzamanlama) ممكن النتيجة تخرب.

**Producer (üretici)** بتحط عناصر بـ **Bounded Buffer (sınırlı tampon)** و**Consumer (tüketici)** بتاخد العناصر الجاهزة. عنا **counter (sayaç)** لعدد العناصر، **in (giriş indeksi)** لمكان الكتابة، و**out (çıkış indeksi)** لمكان القراءة. المؤشرات بتلف باستخدام `(index+1)%BUFFER_SIZE`.

Producer بتنتظر لما `counter==BUFFER_SIZE`، وConsumer لما `counter==0`. بالسلايد في مثال Buffer بحجم 10 وفي الشرح مثال 5؛ هما مثالين بسعات مختلفة. إذا في عدة Producers أو Consumers لازم نمنع نفس الخانة تنكتب مرتين أو Item تنقرا مرتين، باستخدام **Mutual Exclusion (karşılıklı dışlama)**.

**تصحيح للسلايد:** `while` و`counter++` لحالهم مو حل آمن، لأن الزيادة غير Atomic (atomik) بالضرورة. والـ Busy-Wait Loop (meşgul bekleme döngüsü) ليست Synchronization Barrier.

**مثال خارج السلايد:** Video Encoder بتنتج Frames، وPlayer بتستهلكها؛ الـ Queue الفاضية أو الممتلئة بتحتاج انتظار منظم.
