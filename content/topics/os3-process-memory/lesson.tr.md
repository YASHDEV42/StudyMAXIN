## Program ve Process

**Program (program)** diskte duran, henüz yürütülmeyen komutlar kümesidir; **process (işlem/süreç)** yürütülmekte olan programın etkin örneğidir. Aynı executable birden çok bağımsız process oluşturabilir. Tek çekirdekli CPU bir anda tek yürütme akışını çalıştırır; **time sharing (zaman paylaşımı)** ile birçok process eşzamanlıymış gibi görünür. Çok çekirdekte gerçekten paralel yürütme mümkündür.

## Process'in tuttuğu durum

Process yalnız kod değildir: **program counter (program sayacı)**, **CPU registers (işlemci yazmaçları)**, geçerli çalışma durumu ve kendisine ayrılmış bellek de dahildir. Hafıza diyagramında **text/code (kod bölümü)** talimatları, **data section (veri bölümü)** global/statik verileri, **heap (öbek)** çalışma sırasında dinamik ayrılan alanları, **stack (yığın)** çağrı çerçevelerini, yerel değişkenleri, argümanları ve dönüş adreslerini temsil eder. Şemada stack aşağı, heap yukarı büyüyen klasik bir örnektir; her modern sistemin zorunlu fiziksel yerleşimi değildir.

**Bellek koruması (memory protection):** Genellikle süreçlerin kendi sanal adres alanları bulunur; bir sürecin başka sürecin özel yazılabilir belleğine keyfi erişimi engellenir. Kaynak slayttaki base/limit register örneği, sınır denetimini anlatan klasik bir bellek koruma modelidir.

**Kaynak dışı örnek:** Aynı editörü iki kez açmak aynı program kodunu kullanabilir; fakat ayrı process'lerin stack ve değişken durumları bağımsızdır.,## الفرق بين Program وProcess

**Program (program)** ملف تعليمات ساكن ومخزّن، بينما **Process (işlem / süreç)** هي نسخة عم تنفّذ منه فعليًا. ممكن نفس البرنامج يولّد أكتر من Process؛ وكل واحدة إلها Execution State (yürütme durumu) خاص فيها. على Single-core (tek çekirdek) المعالج بينقل التنفيذ بين العمليات باستخدام Time Sharing (zaman paylaşımı)، أما على Multicore (çok çekirdekli) ممكن التنفيذ بالتوازي الحقيقي.

## Process Memory Layout (işlem bellek yerleşimi)

حسب الرسم بالسلايدات، من العناوين المنخفضة للعالية: **Text/Code Section (kod bölümü)** لتعليمات البرنامج، **Data Section (veri bölümü)** للـ Global Variables، **Heap (öbek)** للـ Dynamic Allocation وقت التشغيل، و**Stack (yığın)** للـ Function Calls والـ Local Variables والـ Return Addresses. الـ **Program Counter (program sayacı)** بيحفظ عنوان التعليمة التالية، والـ CPU Registers (işlemci yazmaçları) بتمثّل حالة التنفيذ الحالية. اتجاه نمو Heap وStack في الرسم نموذج تعليمي شائع، مو قانون لكل Architecture.

## Memory Protection (bellek koruması)

الـ Processes بتشتغل غالبًا ضمن Virtual Address Spaces (sanal adres alanları) منفصلة؛ هيك ما بتقدر عملية تكتب مباشرةً بذاكرة عملية ثانية بدون آلية مشاركة مصرح فيها. السلايد بيعرض Base Register (taban yazmacı) وLimit Register (sınır yazmacı) لتوضيح مبدأ حدود الذاكرة تاريخيًا.

**مثال إضافي خارج السلايدات:** تشغيل نسختين من Browser بيسمح بتشارك نفس Executable Code لكن لكل Process Stack وHeap وحالة تشغيل مميزة.,## Özet
- **Program:** Pasif, diskte duran executable.
- **Process:** Aktif, çalışan program + program counter + CPU registers + bellek/durum.
- **Single-core:** Aynı anda bir yürütme akışı; time sharing ile çoklu görev.
- **Text:** Kod; **data:** global/statik; **heap:** dinamik bellek; **stack:** yerel değişken, fonksiyon argümanı, return address.
- **Memory protection:** Süreçlerin özel adres alanları yalıtılır; base/limit klasik gösterim.
- Aynı programın farklı process'leri bağımsız yürütme durumuna sahiptir.
