## SJF (en kısa iş önce)

الـ **Shortest Job First (en kısa iş önce)** بيختار من Ready Queue (hazır kuyruğu) الـ Process اللي إلها أقصر **CPU Burst (işlemci çalışma süresi)** متوقع. المثال بآخر PPTX، السلايدات **51–55**، بيستخدم **Non-preemptive SJF (kesmesiz SJF)**: يعني بعد ما Process تبلش ما منقطعها إذا وصلت أقصر منها.

## جدول المثال من المصدر

| Process | CPU Burst | Arrival Time |
| --- | ---: | ---: |
| P1 | 5 | 0 |
| P2 | 4 | 0 |
| P3 | 7 | 0 |
| P4 | 3 | 0 |
| P5 | 2 | 4 |

عند `t=0` جاهزين P1 إلى P4؛ أقصر واحدة P4 (3)، وبعدها P2 (4). عند `t=4` بتوصل P5 (2)، بس P2 عم تشتغل وباقيلها 3 وحدات، **فما منقطع P2**. بعد `t=7` بتشتغل P5.

الـ **Gantt Chart (Gantt çizelgesi)** الصحيح:

`0–3 P4 | 3–7 P2 | 7–9 P5 | 9–14 P1 | 14–21 P3`

## القوانين

**Turnaround Time (tamamlanma süresi)** = Completion Time − Arrival Time.

**Waiting Time (bekleme süresi)** = Turnaround Time − CPU Burst Time.

| Process | Completion | Turnaround | Waiting |
| --- | ---: | ---: | ---: |
| P1 | 14 | 14 | 9 |
| P2 | 7 | 7 | 3 |
| P3 | 21 | 21 | 14 |
| P4 | 3 | 3 | 0 |
| P5 | 9 | 5 | 3 |

**Average Waiting = 5.8** وحدة، و**Average Turnaround = 10** وحدات.

## الفرق المهم

الـ **SJF** ممكن يقلّل Average Waiting، بس CPU Burst المستقبلي غالبًا بيحتاج Prediction (tahmin)، وممكن Process طويلة تعاني **Starvation (aç kalma)** إذا وصلت عمليات قصيرة باستمرار. النسخة اللي بتقطع Process لما تجي أقصر اسمها **SRTF (en kısa kalan süre önce)**، ومش هي المستخدمة بهالمثال.

**توضيح إضافي:** ما تخلط بين «أقصر وقت تنفيذ» و«أقصر وقت متبقّي»؛ هاد بيغيّر قرار Preemption.
