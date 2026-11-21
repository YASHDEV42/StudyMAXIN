## أهم خمس تحديات للـ Multicore Programming (çok çekirdekli programlama)

السلايدات 12–15 بتحكي إن مجرد وجود CPU بعدة Cores ما بيضمن Speedup. لازم OS تعرف تعمل **Scheduling (zamanlama)**، والتطبيق نفسه يكون قابل لتقسيم العمل.

1. **Identifying Tasks (görevleri belirleme):** نلاقي أجزاء من الشغل ممكن تنفذ بشكل مستقل.
2. **Balance (iş yükünü dengeleme):** نوزع العمل بعدالة. إذا ثلاث Tasks بتخلص بثانية وواحدة بدها 70 ثانية، ممكن كل التنفيذ يضل ناطر الأخيرة.
3. **Data Splitting (veri bölümleme):** نقسم البيانات بذكاء بين Cores، ونحسب تكلفة نقلها والتعامل مع Cache (önbellek).
4. **Data Dependency (veri bağımlılığı):** لو Task A بدها نتيجة B، ما فينا نفذها قبل ما تخلص B.
5. **Testing and Debugging (test ve hata ayıklama):** الأخطاء المرتبطة بترتيب Threads صعب تكرارها؛ خصوصًا Race Conditions (yarış durumları).

## Data Parallelism vs Task Parallelism

**Data Parallelism (veri paralelliği):** نفس العملية الحسابية على أجزاء مختلفة من البيانات. المثال بالسلايد 16: قسم Array إلى نصفين؛ Core 1 تجمع أول نصف وCore 2 النصف الثاني.

**Task Parallelism (görev paralelliği):** Threads بتنّفذ مهام مختلفة، وممكن تشتغل على نفس البيانات. مثال: Thread تحسب Average، وثانية تحسب Maximum.

| وجه المقارنة  | Data Parallelism  | Task Parallelism           |
| ------------- | ----------------- | -------------------------- |
| شو منقسّم؟     | Dataset           | Tasks                      |
| نوع العمليات  | غالبًا نفس العملية | عمليات مختلفة              |
| مثال المحاضرة | جمع أنصاف Array   | إحصائيات مختلفة لنفس Array |

**توضيح إضافي خارج السلايدات:** مو كل تقسيم بيساعد، لأنه أحيانًا Communication Overhead (iletişim ek yükü) أعلى من توفير وقت الحساب.
