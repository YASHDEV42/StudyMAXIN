## Message Passing (mesaj iletimi)

بدل ما عمليتين يكتبوا بنفس الـ Memory، ممكن يتبادلوا **Messages (mesajlar)** باستخدام **send (göndermek)** و**receive (almak)**. لازم يكون في Communication Link (iletişim bağlantısı)، والـ Message Size ممكن يكون ثابت أو متغير.

## Direct vs Indirect

**Direct Communication (doğrudan iletişim):** بتسمّي Process المقصودة مباشرةً مثل `send(P, message)` و`receive(Q, message)`. بموديل السلايد الرابط مربوط بزوج Processes محددين.

**Indirect Communication (dolaylı iletişim):** بتبعت على **Mailbox / Port (posta kutusu / port)**، مثل `send(A,message)`، وبيجي Receiver يسحب من A. ممكن أكتر من Process تشترك بنفس Mailbox. إذا P1 بعتت، وP2/P3 الاتنين بدهم يستقبلوا، لازم في Rule (kural) تحدد مين ياخد الرسالة: Receiver واحد، أو System بيختار وبيخبر Sender، أو تحديد الحد الأقصى لمشاركي الرابط.

## Blocking vs Nonblocking

- **Blocking Send (bloklayan gönderme):** Sender بينتظر شرط التسليم/الاستلام المناسب للآلية.
- **Nonblocking Send (bloklamayan gönderme):** Sender بتكمل بدون انتظار اكتمال الاستلام.
- **Blocking Receive (bloklayan alma):** Receiver بتنتظر وصول رسالة.
- **Nonblocking Receive (bloklamayan alma):** بترجع رسالة إن وجدت أو نتيجة فاضية.

مهم: Blocking Send **مو بالضرورة** يعني Sender بتنتظر جواب Business Logic؛ ممكن تنتظر قبول الرسالة فقط.

## Message Buffering (mesaj tamponlama)

**Zero Capacity (sıfır kapasite):** بدون Queue، الطرفين لازم يتلاقوا (Rendezvous). **Bounded Capacity (sınırlı kapasite):** عدد محدد n، Sender ممكن تنتظر إذا امتلأ. **Unbounded Capacity (sınırsız kapasite):** نموذج نظري ما بيحد السعة.

**مثال إضافي خارج السلايد:** Queue بين API Service وWorker بيحفظ Jobs؛ استلام Job لا يعني إنه Worker خلّص تنفيذها.
