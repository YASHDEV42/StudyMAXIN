## من معالج واحد لعدة معالجات

بالـ **Single-Processor System (tek işlemcili sistem)** في معالج عام رئيسي بينفّذ تعليمات البرامج. ممكن في معالجات مساعدة ضمن أجهزة I/O، بس هالشي ما بيخلّي كل جهاز نظام Multiprocessor بالمعنى المقصود بالمحاضرة.

**Multiprocessing (çok işlemcili çalışma)** يعني وجود معالجين أو أكثر بيشتغلوا ضمن النظام، وبيقدروا يشتركوا بموارد مثل الذاكرة ووسائل الاتصال. أهم الفوائد: زيادة **Throughput (iş hacmi)**، مشاركة الموارد بطريقة اقتصادية، وتحسّن الاعتمادية؛ فإذا تعطل معالج، ممكن تتراجع القدرة بدل ما يتعطل كل النظام، بحسب التصميم.

## SMP مقابل AMP

بالـ **SMP — Symmetric Multiprocessing (simetrik çoklu işlem)** المعالجات متساوية بالقدرة على تنفيذ مهام النظام وبتشارك الذاكرة. كل معالج ممكن يكون عنده Registers وCache خاصة فيه. أما **AMP — Asymmetric Multiprocessing (asimetrik çoklu işlem)** فالمعالجات إلها مهام مختلفة أو في معالج رئيسي بيوجه البقية.

**Multicore (çok çekirdekli)** بيحط عدة Cores ضمن شريحة واحدة، بدل الاعتماد بالضرورة على عدة شرائح منفصلة. كل Core عندها موارد تنفيذ خاصة، وفي موارد مشتركة بينها.

## UMA وNUMA

- **UMA — Uniform Memory Access (tekdüze bellek erişimi):** زمن الوصول للذاكرة متقارب/موحّد للمعالجات.
- **NUMA — Non-Uniform Memory Access (tekdüze olmayan bellek erişimi):** زمن الوصول بيتأثر بمكان الذاكرة بالنسبة للمعالج، ولهيك مكان تخصيص الذاكرة بصير مهم.

## Clustered Systems

الـ **Cluster (küme)** عبارة عن عدة أجهزة مستقلة بتتصل عبر شبكة، وممكن تتشارك تخزين وتشتغل سوا لتحقيق **High Availability (yüksek erişilebilirlik)** أو تنفيذ عمل موزع. بالـ **Asymmetric Clustering (asimetrik kümeleme)** جهاز أساسي شغّال وآخر جاهز احتياطيًا. بالـ **Symmetric Clustering (simetrik kümeleme)** ممكن عدة أجهزة تكون فعّالة وتراقب بعضها.

**مثال توضيحي خارج الشرائح:** أربع Cores ضمن لابتوب هي Multicore، لكن أربع أجهزة Server ضمن شبكة بتتعاون على خدمة هي Cluster؛ مو نفس مستوى المعمارية.
