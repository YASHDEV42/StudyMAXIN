## Concurrency (eşzamanlı ilerleme) مقابل Parallelism (paralellik)

**Concurrency** معناها أكتر من Task (görev) عم تتقدم بالتنفيذ عبر الزمن؛ على **Single-core (tek çekirdek)** الـ CPU بيوزّع الوقت بينها. **Parallelism** يعني Tasks عم تنفذ *بنفس اللحظة* على Cores مختلفة. مخطط السلايد 9 بيفرق بين Thread T1–T4 على Core واحدة، وبين توزيعهن على Core 1 وCore 2.

بـ **Multicore (çok çekirdekli)** ممكن يكون في Concurrency داخل كل Core وParallelism بين Cores.

## Physical Cores vs Logical Processors

الصورة بالسلايد 11 بتعرض **4 Physical Cores (fiziksel çekirdekler)** و**8 Logical Processors (mantıksal işlemciler)** على Windows Task Manager. هاد مو معناه التطبيق ممنوع ينشئ أكثر من 8 Threads؛ الرقم بيعبّر عن Hardware Execution Contexts المعروضة للنظام.

## Amdahl's Law (Amdahl kuralı)

القانون بالسلايد 10:

\[
\text{Speedup}\leq \frac{1}{S + \frac{1-S}{N}}
\]

- **S (seri bölüm oranı):** نسبة الشغل اللي لازم يظل Sequential (sıralı).
- **N (çekirdek sayısı):** عدد الـ Cores اللي بتنفذ الجزء المتوازي.

مثال السلايد: **25% Sequential** و**75% Parallel**، إذًا `S=0.25`.

- مع **2 Cores:** `1/(0.25+0.75/2)=1.6×`.
- مع **4 Cores:** `1/(0.25+0.75/4)≈2.29×`؛ السلايد تقريبها 2.28.
- لو زادت Cores بلا حد: Speedup بيوصل نظريًا إلى **4×** بس.

السبب إن الجزء Sequential ما بينقسم، وبالإضافة إليه عندنا Overhead (ek yük) مثل Synchronization وMemory Contention بتقلل الأداء الحقيقي.

**مثال إضافي خارج المحاضرة:** لو 60% من العمل Sequential، حتى Cores غير محدودة ما بتعطي أكتر من `1/0.6≈1.67×` بالنموذج.

بالـ Windows ممكن تشوف المثال عبر **Task Manager → Performance → CPU**، أو تستعرض System Information باستخدام `msinfo32`.
