## POSIX diye başlıklandırılan Shared Memory örneği

المحاضرة بتعرض **`shmget()` (paylaşılan bellek bölgesi oluşturma)** للحصول على Shared Memory Segment، وبعدين **`shmat()` (bellek bölgesini bağlama)** حتى Process تربط المنطقة بعنوانها، وبعدها كتابة بيانات، وأخيرًا **`shmdt()` (bağlantıyı ayırma)** لفصلها.

**تصحيح مصدر مهم:** رغم إن عنوان السلايد “POSIX Shared Memory”، الدوال `shmget/shmat/shmdt` فعليًا من **System V Shared Memory API (System V paylaşımlı bellek arayüzü)**، مش واجهة POSIX الحديثة `shm_open/mmap`. ولازم Synchronization (eşzamanlama) لو عمليتين عم تعدّل نفس البيانات.

## Mach (Mach mikroçekirdeği)

النموذج التاريخي **Mach** بيعتمد على **Message-Based IPC (mesaj tabanlı iletişim)** باستخدام Ports/Mailboxes (portlar/posta kutuları). المصدر بيذكر واجهات تاريخية مثل `msg_send` و`msg_receive` و`msg_rpc` و`port_allocate`. الهدف نفهم إن Services بالـ Microkernel ممكن تتواصل عبر Messages.

## Windows XP LPC

الـ **Local Procedure Call (yerel prosedür çağrısı)** في Windows XP مثال تاريخي لتواصل Client وServer على نفس الجهاز. Client بتعمل Connection Request (bağlantı isteği)، والـ Server بتجهّز Communication Ports (iletişim portları)، وبيتم تبادل الـ Handles (tanıtıcılar) والرسائل والردود.

## المقارنة

**System V IPC:** ذاكرة مشتركة، لازم تزامن. **Mach:** Messages وPorts. **Windows XP LPC:** Messages بين Processes محلية عبر Ports/Handles. هاي أمثلة من حقبة السلايدات، مو توصيف ملزم لكل نظام حديث.

**توضيح خارج المصدر:** نجاح Shared Memory Setup لا يضمن Race-free Access؛ إدارة التزامن جزء مستقل.
