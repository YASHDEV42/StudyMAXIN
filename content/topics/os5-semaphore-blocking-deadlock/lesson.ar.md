## Blocking Semaphore (bloklayan semafor)
السلايدات 26–27 بتقدم طريقة لتجنب **Busy Waiting (meşgul bekleme)**. عندنا **Waiting Queue (bekleme kuyruğu)**: إذا Permit مو متاحة، Process بتنضاف للطابور وتعمل **block() (engellemek)**. ولما مورد يتحرر، **wakeup() (uyandırmak)** بتنقل Process إلى **Ready Queue (hazır kuyruğu)**.

المثال:
```text
acquire: value--; if (value < 0) block;
release: value++; if (value <= 0) wakeup;
```
بهيك نموذج القيمة السالبة ممكن تمثل عدد المنتظرين، وبشرط كل العمليات على Value/Queue تكون Atomic (atomik).

## Deadlock (kilitlenme)
السلايد 28: P0 بتعمل `wait(S)` ثم `wait(Q)`، بينما P1 بتعمل `wait(Q)` ثم `wait(S)`. إذا S وQ عندهن Permit واحدة، P0 بتاخد S وP1 بتاخد Q؛ بعدها كل واحدة بتنتظر الثانية، ولا وحدة بتوصل لـ Signal. هاد **Circular Wait (döngüsel bekleme)**.

**حل توضيحي خارج السلايد:** نخلي جميع Processes تكتسب Locks بنفس الترتيب، مثلاً S ثم Q.

## Starvation (aç kalma)
السلايد 30 بيشرح إنه Process ممكن ما يجيها الدور إذا Queue بنظام **LIFO (son giren ilk çıkar)** وفي Tasks جديدة عم توصل باستمرار، أو في أولوية أعلى مستمرة.

**الفرق المهم:** Deadlock = مجموعة عمليات عالقة وتنتظر بعضها. Starvation = Process عم تنتظر بلا حد بينما غيرها بيضل يتقدم.
