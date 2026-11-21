## Independent وCooperating Processes

الـ **Independent Process (bağımsız işlem)** ما بتعتمد على بيانات عمليات ثانية، بينما **Cooperating Process (işbirlikçi işlem)** بتتشارك بيانات أو بتتعاون مع غيرها. الأسباب الموجودة بالمصدر: **Information Sharing (bilgi paylaşımı)**، **Computation Speedup (hesaplama hızlandırma)**، **Modularity (modülerlik)**، وConvenience (kullanım kolaylığı).

## IPC (işlemler arası iletişim)

في نموذجين رئيسيين:

- **Shared Memory (paylaşımlı bellek):** الـ OS بيجهّز منطقة Memory مشتركة، وProcess A وB بيقرأوا وبيكتبوا فيها. عادة ممكن يكون فعال لنقل بيانات كثيرة، بس لازم **Synchronization (eşzamanlama)** لأن الكتابة المتزامنة ممكن تعمل Race Conditions (yarış durumları).
- **Message Passing (mesaj iletimi):** كل Process بتستخدم Send/Receive بدل الوصول المباشر لنفس البيانات. مناسب حتى لما العمليات على أجهزة منفصلة.

## Producer–Consumer (üretici–tüketici)

**Producer (üretici)** بينتج عنصر وبيحطه بـ **Buffer (tampon bellek)**، و**Consumer (tüketici)** بياخده. إذا Buffer محدود (**Bounded Buffer / sınırlı tampon**) المنتج لازم ينتظر لما يمتلئ، والمستهلك بينتظر لما يفضى. أما **Unbounded Buffer (sınırsız tampon)** فهو نموذج نظري بدون حد عملي للسعة.

بالرسم في **Circular Buffer (dairesel tampon)** ومؤشرين: **in (giriş indeksi)** للمكان الفاضي التالي، و**out (çıkış indeksi)** للعنصر المعبأ التالي. إذا حجزنا خانة واحدة للتمييز: `in == out` معناها Empty، و`(in+1)%BUFFER_SIZE == out` معناها Full، وبالتالي السعة العملية `BUFFER_SIZE-1`. مثال Java بيسجل عدد العناصر عبر `count`، وبيستخدم `insert` و`remove`.

**تحذير مهم:** الـ Busy Waiting والـ `count` البسيط بالسلايد ما بيعطوا Synchronization كافية لو في Producers وConsumers كتار بدون Locks/Atomicity. هاد توضيح تقني مكمل للمثال.

**مثال خارج المصدر:** Video Encoder بيحط Frames بطابور وPlayer بياخد Frames؛ لازم التنسيق حتى ما يقرأ بيانات غير جاهزة.
