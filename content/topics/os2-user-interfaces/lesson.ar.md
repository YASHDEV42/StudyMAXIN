## شو المقصود بـ User Interface؟

الـ **User Interface (kullanıcı arayüzü)** هي طريقة المستخدم ليعطي أوامر ويتفاعل مع النظام. مو ضروري تكون جزء من الـ **Kernel (çekirdek)**؛ ممكن تنفّذها برامج خارج النواة. بحسب السلايدات عنا CLI وGUI وBatch، والمصدر الأحدث بيضيف Touchscreen وVoice Commands ضمن سياق الأجهزة المحمولة.

## Command-Line Interface (komut satırı arayüzü)

بالـ **CLI** المستخدم بيكتب أمر نصي. الـ **Command Interpreter / Shell (komut yorumlayıcısı / kabuk)** بيقرأ الأمر وبيطلب تنفيذه. في أوامر **Built-in (yerleşik komut)** مكتوبة ضمن الـ Shell نفسه، وفي **External Commands (harici komutlar)** هي Executables منفصلة؛ وقتها فينا نضيف أوامر جديدة بدون تعديل كود الـ Shell.

السلايدات بتعرض عائلة UNIX Shells مثل **Bourne Shell، C Shell، Korn Shell**، وتوضح إن بعض أنظمة التشغيل بتحط الـ Interpreter ضمن Kernel، وغيرها بتقدمه كبرنامج مستقل. الـ CLI بتناسب Automation وShell Scripts والمهمات المتكررة، بس بتطلب معرفة الأوامر وصيغها.

## Graphical User Interface (grafik kullanıcı arayüzü)

بالـ **GUI** في Desktop (masaüstü)، Windows (pencereler)، Icons (simgeler)، Menus، Mouse وKeyboard. الأيقونة ممكن تمثل ملف أو برنامج أو فعل. السلايدات بتذكر تطوير الواجهات ضمن أبحاث Xerox PARC والانتشار اللاحق بمنتجات Apple وWindows. أغلب الأنظمة الحديثة بتوفر GUI وCLI معًا، مو خيار حصري.

## Batch وTouch

**Batch Interface (toplu işlem arayüzü)**: الأوامر بتكون محفوظة سلفًا بملف، والنظام بينفذها كدفعة بدل إدخالها واحد واحد تفاعليًا. **Touchscreen Interface (dokunmatik ekran arayüzü)** بتستخدم اللمس والسحب ولوحة مفاتيح افتراضية، وقد تدعم Voice Commands (sesli komutlar).

## اختيار الواجهة

GUI أسهل للمهام البصرية والتنقل، CLI أقوى بالـ Automation والتكرار ونقل الخطوات بين أجهزة، وBatch مناسب لعمليات مجدولة أو متكررة. اختيارك بيعتمد على طبيعة المهمة وخبرتك، مش على إن وحدة «أفضل دائمًا».

**مثال توضيحي خارج السلايدات:** الأمر `ls` بالـ Linux بيعرض الملفات كنص، بينما File Manager بعرضها بأيقونات؛ الخدمة المطلوبة شبيهة لكن طريقة التفاعل مختلفة.
