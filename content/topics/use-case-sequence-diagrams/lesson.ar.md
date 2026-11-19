## 1. من الهدف إلى التفاعل: Use Case وSequence
**Use Case Diagram (kullanım durumu diyagramı)** يوضح *شو بيعمل النظام للمستخدم*، أي أهداف الـActor (aktör) وحدود النظام والوظائف التي تقدم قيمة. ما بيعرض كيف صُممت Classes (sınıflar) أو خوارزميات النظام، ولا هو قائمة الشاشات والأزرار. **Sequence Diagram (sıralama diyagramı)** بيوضح *كيف وبأي ترتيب* تتواصل الكائنات والخدمات لتنفيذ هدف محدد. أما **Class Diagram (sınıf diyagramı)** من الدرس السابق فيوضح البنية الثابتة. الفكرة الرئيسية من الصفحة 2 و32: Use Case = الهدف؛ Sequence = التفاعل؛ Class = البنية.

## 2. مكونات Use Case Diagram (الصفحات 3–6)
- **Actor (aktör):** دور خارجي يتفاعل مع النظام؛ ممكن يكون إنسان أو نظام آخر. مثلاً «Öğrenci» هو Actor، وليس اسم طالب محدد. نفس الشخص ممكن يلعب أكثر من دور.
- **Use Case (kullanım durumu):** وظيفة لها معنى للمستخدم، مرسومة داخل Oval (oval) ومسمّاة بفعل مثل `Derse Kayıt Ol` أو `Kaydı Onayla`. الاتصال بقاعدة البيانات لوحده غالباً تفصيل داخلي لا هدف مستخدم.
- **System Boundary (sistem sınırı):** مستطيل يحدد مسؤوليات النظام؛ الـActors خارج المستطيل والـUse Cases داخله.
- **Association (ilişki):** خط يربط الـActor بالوظيفة التي يشارك فيها.

**كيف نختار؟** استخرج الأدوار المتفاعلة، ثم الأفعال التي تقدم قيمة، وابتعد عن إنشاء Actor لكل شخص أو Use Case لكل زر. في نظام تسجيل الجامعة يمكن تمثيل Student وAdvisor وDepartment Officer، وأحياناً External Authentication System كـActors. الحدود والأدوار تُحدد حسب وصف المشكلة، وليس بالحدس (ص 5–6).

## 3. Include وExtend وGeneralization (الصفحات 7–10)
**Include (dahil etme):** وظيفة أساسية تستدعي وظيفة أخرى **إلزامياً** كجزء مشترك يمكن إعادة استخدامه. مثال المحاضرة `Derse Kayıt Ol` → `«include»` → `Kimliği Doğrula` إن كان التحقق شرطاً في كل تسجيل. السهم المتقطع يتجه من Use Case الأساسي إلى الوظيفة المضمّنة.

**Extend (genişletme):** نضيف سلوكاً **مشروطاً** عند Extension Point (genişletme noktası)، بينما يبقى المسار الأساسي مفهوماً دون الإضافة. مثال `İndirim Uygula` إذا وجد Coupon ضمن `Ödeme Yap`. السهم المتقطع هنا من الحالة الإضافية نحو الحالة الأساسية.

| السؤال | Include | Extend |
| --- | --- | --- |
| هل السلوك مطلوب دائماً في المسار الموصوف؟ | نعم | لا، عند شرط |
| الهدف | استخراج جزء إلزامي ومشترك | تمديد الوظيفة الأساسية |
| مثال | التحقق من الهوية بكل تسجيل | إضافة خصم إذا وجد كوبون |

**Generalization (genelleme):** Actor أو Use Case خاص يرث علاقات وسلوك العام عندما توجد فعلاً علاقة «نوع خاص من». مثال `Kullanıcı` كدور عام و`Öğrenci` و`Öğretim Üyesi` كأدوار أكثر تخصصاً إذا تشاركوا السلوك. لا تستخدم العلاقة لمجرد تجميل الرسم (ص 9).

**ملاحظة فهم خارج السلايد:** الألزام والشرط يقصد بهما السيناريو المعرّف؛ مش كل خطوة داخلية لازم تتحول إلى Use Case منفصلة.

## 4. توثيق Use Case (الصفحات 11–16)
الرسم عالي المستوى مفيد لتحديد Scope (kapsam) والتواصل مع Stakeholders (paydaşlar)، لكنه وحده مش وثيقة متطلبات كاملة. يوثّق النص عادةً:
1. Name (ad): اسم الوظيفة.
2. Actors (aktörler): المشاركون.
3. Goal (amaç): النتيجة المطلوبة.
4. Preconditions (ön koşullar): شروط البداية.
5. Trigger (tetikleyici): الحدث الذي يبدأها.
6. Main Success Flow (başarılı temel akış): خطوات النجاح.
7. Alternative/Error Flows (alternatif/hata akışları): مسارات الفشل والبدائل.
8. Postconditions (son koşullar): الحالة بعد التنفيذ.

**مثال توضيحي:** `Derse Kayıt Ol`: الطالب مسجل الدخول، يختار مساقاً، يفحص النظام المقاعد والشروط، يحفظ التسجيل، ويؤكد النتيجة. بديل: لا توجد مقاعد → يظهر رفض واضح دون إنشاء تسجيل. لا يوجد نموذج توثيق إلزامي عالمي واحد؛ بتصممه المؤسسة حسب حاجتها (ص 13).

في صور ص 14–16 توجد أمثلة Hotel Reservation وBank Use Case وOBS. رسم OBS (ص 16) يضع Student وAdvisor خارج الحد، و`Ders Kaydı Yap` و`Kontenjan Kontrol` وغيرها داخل النظام، مع `«include»` لفحص المقاعد. المقصود فهم توزيع الأدوار وحدود النظام، وليس نسخ كل رمز بلا ربط بالمتطلبات.

## 5. Sequence Diagram: التفاعل مع الزمن (الصفحات 17–20)
لما نختار Use Case مثل `Derse Kayıt Ol`، منحوّل الخطوات إلى رسائل بين Actor وUI وService وRepository وربما NotificationService. **الزمن يتقدم من فوق لتحت**، لا من اليسار لليمين. 
- **Participant (katılımcı):** Object أو Component يشارك بالتنفيذ.
- **Lifeline (yaşam çizgisi):** خط عمودي متقطع يمثل وجود المشارك عبر الزمن.
- **Activation / Execution (etkinleştirme / yürütme):** مستطيل رفيع على Lifeline خلال تنفيذ العملية.
- **Message (mesaj):** سهم يوضح نداء أو نتيجة.

Sequence Diagram هو Behavioural (davranışsal) بينما Class Diagram Structural (yapısal). الأفضل رسم السيناريوهات الحرجة بشكل واضح بدل حشر كل التفاصيل في مخطط واحد (ص 18–19).

## 6. أنواع الرسائل والشروط (الصفحات 21–24)
**Synchronous Message (senkron mesaj):** المرسل ينتظر اكتمال العمل أو الرد قبل المتابعة المنطقية التي تعتمد على النتيجة. **Asynchronous Message (asenkron mesaj):** المرسل يمكنه إكمال عمله دون انتظار انتهاء عمل الطرف الآخر. في تسجيل الجامعة، فحص **Quota (kontenjan)** غالباً يحتاج نتيجة متزامنة قبل الحفظ؛ إشعار `RegistrationCreated` قد يُرسل دون انتظار البريد. هالاختيار يؤثر على Latency (gecikme)، Coupling (bağlılık) وResilience (dayanıklılık).

**Self Message (öz mesaj):** الكائن يستدعي عملية من داخله، مثل `RegistrationService.validateRules()`، ويرسم كسهم يعود إلى Lifeline نفسها.

**Reply Message (yanıt mesajı):** رسالة ترجع النتيجة مثل `available=true` بخط متقطع؛ مش ضروري ترسم كل Return إذا صار الرسم مزدحماً.

**Guard (koşul):** شرط مكتوب ضمن أقواس مربعة، مثل `[quotaAvailable]` أو `[paymentApproved]`؛ ينفذ الجزء المشروط فقط عند تحقق الشرط.

**Combined Fragments (birleşik parçalar):**
- `alt`: فروع بديلة شبيهة بـif/else، مثل تسجيل عند توفر مقعد أو رسالة امتلاء.
- `opt`: كتلة اختيارية واحدة عند شرط، مثل إشعار عند `[notificationEnabled]`.
- `loop`: تكرار رسائل حسب عدد أو شرط.

## 7. مثال Sequence في المحاضرة: التسجيل الجامعي (الصفحات 25–26)
الـParticipants: `Öğrenci`، `UI`، `RegistrationService`، `CourseRepository`، `NotificationService`. ترتيب الرسم في ص 25:
1. الطالب يرسل `kayıtOl(courseId)` للواجهة.
2. الواجهة تطلب `register(student, course)` من الخدمة.
3. الخدمة تسأل `checkQuota(courseId)` من الـRepository.
4. يعود `available` كـReply.
5. عند نجاح الفحص، تستدعي الخدمة `saveRegistration()`.
6. تُرسل `RegistrationCreated` للإشعارات بشكل Asynchronous.
7. يعود `success` للواجهة.

**المغزى المعماري:** الفصل بين جزء يحتاج Consistency (tutarlılık) وحسم فوري، مثل حفظ التسجيل، وبين Notification (bildirim) يمكن فصلها من مسار النجاح. إذا تعطلت خدمة البريد، لا يلزم أن يفشل تسجيل المساق. لكن Asynchronous يعقّد Failure Handling (hata yönetimi) وEventual Consistency (nihai tutarlılık)، ولا يعني ضمان تسليم الإشعار تلقائياً (ص 26).

**توضيح خارج السلايد:** الفحص ثم الحفظ في عمليتين منفصلتين لا يضمن وحده منع تجاوز المقاعد عند التزامن؛ التطبيق الحقيقي يحتاج آلية Transaction أو Concurrency Control تحقق القاعدة. المخطط هنا يشرح التراسل وليس دليلاً على صحة التزامن.

## 8. أمثلة أخرى ودمج المخططات (الصفحات 27–31)
تظهر في ص 27–28 حالة **Emotion-based Music Player (duygu tabanlı müzik çalar)**: المستخدم يفتح التطبيق، الجهاز يلتقط الصورة، يُقدر مزاج المستخدم، يطلب الموسيقى ويعرض Playlist. الهدف تحليل تسلسل النداءات وأيها ينتظر الرد.

**العمل المنهجي (ص 29):** حدّد Actors وأهدافهم في Use Case → اختر Use Case حرجة → اكتب Main وAlternative Flows → حدد Participants في Sequence → ارسم الرسائل زمنياً → أضف Guard و`alt/opt` → افحص التناسق مع Class Diagram ومسؤولياته وHigh Cohesion / Low Coupling.

**أخطاء شائعة (ص 30):** تحويل Use Cases إلى أزرار، خلط الـActor مع الأصناف الداخلية، عكس include/extend، الاعتقاد أن الزمن في Sequence يسير أفقياً، رسم كل Method بلا ضرورة، وأسهم بلا مسؤوليات واضحة أو عدم اتساق Sequence مع Class Diagram.

**مهمة المختبر (ص 31):** لنفس نظام الجامعة، ارسم Use Case فيها **3 Actors على الأقل و6 Use Cases** مع include/extend عند الحاجة؛ وثّق `Derse Kayıt Ol` (precondition وmain وalternative flow)، وارسم Sequence فيها Guard وReply واحد على الأقل، وفسّر اختيار Sync/Async للإشعارات؛ وتحقق من تطابقها مع Class Diagram السابقة.

## أسئلة مراجعة من المحاضرة (ص 32)
1. ما الفرق بين Actor والشخص نفسه؟
2. كيف نسمي Use Case؟
3. كيف تميز Include عن Extend؟
4. ما الذي توضحه Use Case مقابل Sequence؟
5. ما هي Lifeline؟
6. ما الفرق بين Sync وAsync Message؟
7. متى نستخدم Guard؟

*المصدر: Yazılım Tasarımı ve Mimarisi — Hafta 2B: Use Case ve Sequence Diyagramları، PDF الفيزيائي ص 1–33. الشرح الإضافي مميز بوضوح.*
