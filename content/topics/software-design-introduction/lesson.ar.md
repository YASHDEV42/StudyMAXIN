## 1. لماذا لا يكفي أن يعمل البرنامج اليوم؟

البرمجيات الجيدة لا تقتصر على نتيجة صحيحة الآن؛ ينبغي أن تتحمل التغيير، زيادة المستخدمين، تعاون الفريق، والأعطال. تزداد **Complexity (karmaşıklık)** عندما تكبر المكوّنات والبيانات والتكاملات، وتتغير المتطلبات، ويعمل أكثر من فريق، وترتفع توقعات الأمان والأداء. التصميم والمعمارية لا يلغيان التعقيد، بل يجعلان إدارته ممكنة (ص 3–4).

## 2. Design (tasarım) وArchitecture (mimari)

**Software Design (yazılım tasarımı)** هو مجموعة قرارات تحوّل المتطلبات إلى حل قابل للتنفيذ، ويميل إلى المستوى المحلي: مسؤوليات Classes (sınıflar) وObjects (nesneler)، تقسيم العمل، طريقة تعاون المكوّنات، Algorithms (algoritmalar)، Data Structures (veri yapıları)، Patterns (tasarım kalıpları)، Refactoring (yeniden düzenleme)، ووضوح الكود. أدواته تشمل Abstraction (soyutlama)، Encapsulation (kapsülleme)، Cohesion (bağdaşıklık)، Coupling (bağımlılık) ومبادئ SOLID.

**Software Architecture (yazılım mimarisi)** تهتم بالبنية الأساسية والقرارات التي تؤثر في النظام ككل: حدود Services (servisler)، الاتصال بينها، مكان البيانات، Deployment (dağıtım)، أهداف الجودة، وحدود المنصة. لا يكفي رسم صناديق وأسهم: يجب شرح **لماذا** اخترنا هذه الصناديق والعلاقات. الحدود ليست قطعية؛ قد يتحول قرار يبدو محلياً إلى معماري عندما يمتد أثره إلى النظام.

| Design                                | Architecture                                     |
| ------------------------------------- | ------------------------------------------------ |
| قرارات محلية تخص Classes وMethods     | قرارات واسعة تخص Services وبيانات النظام         |
| Patterns، Refactoring، قابلية القراءة | الاتصال، التخزين، Deployment، Quality Attributes |
| تغييرات محدودة نسبياً                  | غالباً أعلى تكلفة عند التغيير                     |

الصورة في ص 8 تعرض مستويات التقريب: **Code → Component → System**. كلما وسّعنا المنظور، ازداد نطاق أثر القرار.

## 3. كيف نعرف أن القرار معماري؟

بحسب الشرائح ص 9–11، القرار المعماري عادةً له ثلاث سمات: **Wide Impact (geniş etki)** على مكوّنات وفرق وجودة النظام؛ **High Cost of Change (yüksek değiştirme maliyeti)**؛ و**Trade-off (ödünleşim)**، أي تحقيق منفعة مع تحمل تكلفة أو تنازل آخر.

فكّر بالمعمارية بوصفها **Structure + Decision + Rationale (yapı + karar + gerekçe)**. الرسم يوضح ما هو موجود؛ سجل القرار يشرح لماذا. الخيارات ليست حرة بالكامل: توجد **Business Constraints (iş kısıtları)** مثل الميزانية والموعد والفريق، **Technical Constraints (teknik kısıtlar)** مثل الأنظمة القديمة، **Legal Constraints (yasal kısıtlar)** مثل KVKK، و**Operational Constraints (operasyonel kısıtlar)** مثل الصيانة والمراقبة وSLA. لذلك لا توجد معمارية «أفضل» مطلقاً خارج السياق.

**مثال توضيحي إضافي:** قد يكون Modular Monolith (modüler monolit) مناسباً لفريق صغير، بينما تعطي Microservices (mikroservisler) نشرًا مستقلاً مقابل تعقيد تشغيل واتصال وتناسق بيانات أكبر. اختيار واحد لمجرد شيوعه ليس حجة معمارية.

## 4. دور Software Architect (yazılım mimarı)

المعماري ليس الشخص الذي يحفظ أكبر عدد من التقنيات ولا من يقرر وحده. يدعم اتخاذ قرارات فنية تحت عدم اليقين، يربط أهداف العمل باحتياجات الجودة، يعرض تكاليف الخيارات، يوحّد لغة الفرق ويحفظ المبررات. أدواره: Technical Leader (teknik lider)، Designer (tasarımcı)، Facilitator (kolaylaştırıcı)، Communicator (iletişimci)، Risk Manager (risk yöneticisi) وMentor (mentor).

في المثال الوارد ص 12، عند الاختيار بين PostgreSQL وMongoDB ينبغي السؤال أولاً: ما طبيعة البيانات والعلاقات؟ هل نحتاج Transactions (işlemler)؟ ما حجم النظام وخبرة الفريق؟ وفي ص 15، هدف استجابة API خلال 200ms يحتاج نقاشاً مع Backend وDevOps وQA والمنتج؛ العمارة نتاج الفريق كله. ومن أمثلة **Overengineering (gereksiz mühendislik)** استخدام 15 Microservice وKafka وKubernetes لتطبيق صغير من دون حاجة حقيقية (ص 14).

## 5. منهج اتخاذ Architectural Decisions (mimari kararlar)

قبل الحل حدّد خمسة أشياء (ص 17): **Business Goal (iş hedefi)**، **Requirements (gereksinimler)**، **Quality Attributes (kalite özellikleri)**، **Constraints (kısıtlar)** و**Risks (riskler)**. مثال المحاضرة: متجر يريد الصمود أمام تضاعف حركة Black Friday بمقدار 20؛ لا تبدأ باسم قاعدة بيانات، بل بهدف العمل وقدرة التحمل والميزانية.

الفرق بين Functional Requirement (işlevsel gereksinim) وQuality Attribute: «يمكن للمستخدم تسجيل الدخول» وظيفة؛ «يستجيب تسجيل الدخول خلال 500ms» مطلب أداء. تشمل خصائص الجودة:

- Performance (performans): سرعة الاستجابة.
- Scalability (ölçeklenebilirlik): تحمل نمو الحمل.
- Availability (erişilebilirlik): بقاء الخدمة قابلة للاستخدام.
- Security (güvenlik): مقاومة الوصول غير المصرح به.
- Modifiability (değiştirilebilirlik): سهولة التغيير.
- Testability (test edilebilirlik): سهولة التحقق.

**Trade-off المحاضرة (ص 19):** Redis Cache (önbellek) يخفض Latency (gecikme) وحمل Database (veritabanı)، لكنه يضيف مشكلة Cache Invalidation (önbellek geçersizleştirme) وتناسق البيانات: إذا تغير السعر من 100 إلى 120 ليرة، متى تُحدَّث النسخة المخزّنة؟ لا يمكن تقييم الأداء بمعزل عن الاتساق.

تُقارن الشرائح ص 20 بين **Modular Monolith** (تشغيل أبسط وTransactions قوية)، **Microservices** (نشر مستقل لكن تعقيد موزع)، و**Event-driven (olay güdümlü)** (Coupling أقل واحتمال Eventual Consistency / nihai tutarlılık). في مثال الطلب والمخزون، قد يصل حدث إنشاء الطلب متأخراً أجزاء من الثانية، فتختلف الحالة مؤقتاً قبل التقارب.

## 6. ADR: Architecture Decision Record (mimari karar kaydı)

ADR وثيقة قصيرة تحفظ **Title (başlık)**، **Context (bağlam)**، **Options (seçenekler)**، **Decision (karar)**، **Consequences (sonuçlar)**. لا تكفي عبارة «استخدمنا PostgreSQL»؛ اشرح ضرورة Transactions والبدائل والآثار.

**ADR-003 في ص 22:** مع Horizontal Scaling (yatay ölçekleme)، قد تصل طلبات المستخدم لخوادم مختلفة؛ إذا كانت Session (oturum) محفوظة في ذاكرة Server-1 فقد لا يتعرف عليه Server-2. البدائل: In-memory Session أو Central Session Store أو Stateless Token. قرار المثال: Access Token قصير العمر مع آلية تجديد. الفائدة دعم Scalability وتقليل اعتماد الطلب على ذاكرة خادم بعينه؛ المخاطر تشمل سرقة Token وإلغاءه ومدة صلاحيته وأمان التجديد. هذا **قرار مثال** وليس توصية أمنية عامة لكل تطبيق.

**دورة حياة القرار (ص 23):** اقترح → قيّم Trade-offs → سجّل ADR → طبّق → تحقّق بالقياسات → راجع عند تغير الظروف. يمكن توصيل المعمارية عبر Diagram (diyagram) وADR وCode (kod) وTests/Metrics (test/ölçüm). يجب أن تبقى الوثائق متوافقة مع التنفيذ (ص 24).

## 7. Technical Debt (teknik borç): ما معنى «الفائدة»؟

Technical Debt هو اختيار يحقق سرعة أو سهولة اليوم لكنه يزيد تكلفة التغيير مستقبلاً. **Interest (faiz)** هنا ليس فائدة مالية حرفية، بل الوقت والمخاطر الإضافية المتكررة. في ص 25، تكرار فحص `user.role == admin` في أماكن كثيرة قد يسرع إطلاق النسخة، لكنه يجعل إضافة أدوار جديدة مكلفة.

الدَّين ليس مرادفاً تلقائياً للكود الرديء: يمكن أن يكون **Deliberate (bilinçli)** ومخططاً لسداده، أو **Uncontrolled (kontrolsüz)** يتراكم بلا متابعة. مصادره (ص 27): ضغط الوقت، ضعف التصميم، تغير المتطلبات، نقص المعرفة، الاختبارات الضعيفة والتقنيات القديمة. مؤشراته (ص 28): تغير صغير يمس ملفات كثيرة، أخطاء متكررة، خوف من Deploy، اختبارات هشة، وصعوبة فهم النظام.

**آلية الفائدة (ص 29):** بنية معقدة → Workarounds مؤقتة → Dependencies أكثر → تطوير أبطأ → ضغط أكبر → دين إضافي. إذا كان التغيير يحتاج يومين طبيعياً لكنه يأخذ خمسة، فالثلاثة أيام الإضافية مثال على «الفائدة». الأولوية لـ**Hotspot (sık değişen karmaşık kod bölgesi)**: قد تكون شيفرة متوسطة السوء تُعدّل أسبوعياً أكثر تكلفة من شيفرة سيئة جداً لا تُلمس.

**الأنواع الستة (ص 30):** Code Debt (kod borcu) للتكرار والدوال المعقدة؛ Design Debt (tasarım borcu) للمسؤوليات والعلاقات الخاطئة؛ Architecture Debt (mimari borç) لبنية لا تلائم النمو؛ Test Debt (test borcu) للاختبارات الناقصة؛ Documentation Debt (dokümantasyon borcu) لضياع أسباب القرارات؛ Infrastructure Debt (altyapı borcu) لتأخر تحديث CI/CD وRuntime والاعتماديات.

تعرض ص 31 مصفوفة بُعدين: **Deliberate / Accidental (bilinçli / bilinçsiz)** و**Prudent / Reckless (ihtiyatlı / ihtiyatsız)**. قد ينشأ الدين من تعلّم الفريق أو تغير الظروف، لا فقط من الإهمال.

## 8. إدارة الدين: ليس الهدف تصفيره

التسلسل في ص 32: **Make Visible (görünür kıl)** بتحديد المشكلة؛ **Measure (ölç)** كـ Cycle Time وChange Failure وHotspots؛ **Prioritize (önceliklendir)** بحسب الأثر والاحتمال والتكلفة؛ **Reduce (azalt)** عبر Refactoring والاختبارات والترقيات وتغيير المعمارية؛ **Prevent (önle)** عبر Review وStandards وADR.

يكون Refactoring (yeniden düzenleme) عاجلاً عندما تتكرر تغييرات المنطقة وأخطاؤها، أو تعيق الميزات، أو تخلق مخاطر أمان/أداء. قد لا يستحق الأولوية إذا كان الكود ثابتاً، قليل الأهمية، سيُزال قريباً، أو كانت مخاطر إعادة الهيكلة أكبر من فوائدها (ص 33).

## 9. دراسة حالة المحاضرة: تسجيل مقررات الجامعة

في أسبوع التسجيل، يدخل **20,000 طالب** بالتزامن، بينما حركة الأيام العادية منخفضة؛ لا ينبغي تجاوز Contingent / Capacity (kontenjan). تسأل ص 34–35 عن: **Consistency (tutarlılık)** عند آخر مقعد، **Scalability** عند الذروة، **Resilience (dayanıklılık)** إذا تعطلت خدمة البريد، **Observability (gözlemlenebilirlik)** لتحديد موضع البطء، **Security** حتى لا يعدل الطالب تسجيل غيره، و**Modifiability** لتغيير قواعد التسجيل.

**توضيح إضافي:** من القرارات الممكنة ضمان تحديث عدد المقاعد Atomically (atomik biçimde)، وفصل إرسال الإشعار عن إتمام التسجيل حتى لا يُفشل البريد التسجيل. يجب تقييم أي حل فعلي بالقياس ومتطلبات المشروع، لا بمجرد اسم التقنية.

## 10. مراجعة الامتحان

تختتم ص 36 بتوضيح أن التصنيف يتبع السياق: تغيير اسم Function غالباً قرار كود؛ Factory Pattern غالباً تصميم؛ اختيار PostgreSQL غالباً معماري؛ استخدام Kafka بين الخدمات ذو أثر معماري واسع؛ وحتى تنسيق Log قد يصبح معمارياً حين يشمل مئات الخدمات.

**تذكّر:** Architecture = Structure + Decision + Rationale، والقرار المعماري = Scope of Impact + Change Cost + Trade-off. أسئلة المراجعة الخمسة في ص 37: الفرق بين Design وArchitecture؟ لماذا Trade-off؟ لماذا ADR؟ ما «فائدة» الدين التقني؟ وما مهمة المعماري التواصلية الأهم؟
