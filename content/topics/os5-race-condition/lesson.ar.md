## Race Condition (yarış durumu)

السلايدات 7–9 بتورجي كيف النتيجة بتعتمد على Interleaving (iç içe geçme sırası) بين عمليات على Shared Variable (paylaşılan değişken). `counter++` عبارة عن Read (okuma)، Modify (değiştirme)، Write (yazma) من الناحية المنطقية، فمش مضمون تكون Atomic (atomik).

البداية `counter=5`. Producer بتقرأ 5 وبتحضّر 6، وConsumer بتقرأ 5 وبتحضّر 4. Producer بتكتب 6 وبعدها Consumer بتكتب 4. النتيجة **4** رغم إن Producer زادت وConsumer نقصت، والمفروض يرجع **5**. هاد اسمه **Lost Update (kayıp güncelleme)**. إذا انعكس آخر Write ممكن النتيجة تكون 6، وبرضه غلط.

| Step  | Execution                     | Result    |
| ----- | ----------------------------- | --------- |
| T0–T1 | Producer reads and increments | r1=6      |
| T2–T3 | Consumer reads and decrements | r2=4      |
| T4    | Producer writes               | counter=6 |
| T5    | Consumer writes               | counter=4 |

الحل بحماية تحديث الـ Shared State ضمن **Critical Section (kritik bölüm)**.

**توضيح خارج السلايد:** هالمشكلة ممكن تحصل حتى بـ Single-core لما Context Switch يصير بين Read وWrite، مش شرط Parallelism حقيقي.
