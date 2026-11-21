## Peterson's Solution (Peterson çözümü)
السلايدات 14–15 بتعرض Algorithm (algoritma) برمجية لحماية **Critical Section (kritik bölüm)** لما عنا Processين فقط، باستخدام `flag[2]` و`turn`.

```text
flag[i] = true;
turn = j;
while (flag[j] && turn == j) { }
// critical section
flag[i] = false;
```

**flag[i]=true** معناها Process i بدها تدخل. **turn=j** معناها إذا الطرفين بدهم يدخلوا، i بتعطي أولوية لـ j. بالـ **while** بتنتظر فقط لما j بدها تدخل والدور عندها. عند الخروج i بتعمل **flag[i]=false**، أي تلغي طلبها هي، مش Flag الطرف الآخر.

بالنموذج النظري، Peterson بتعالج **Mutual Exclusion (karşılıklı dışlama)** و**Progress (ilerleme)** و**Bounded Waiting (sınırlı bekleme)**.

**تصحيح مصدر:** إذا `turn=i` هاد لحاله مو كافي لتفسير كل الحالات؛ لازم نشوف `flag[j]` أيضًا. وبالسلايد في وصف يوحي إن Process بتغيّر Flag الثانية، بينما الكود بيغيّر **Flag الخاصة فيها**.

**معلومة خارج السلايد:** على Modern CPUs ممكن Compiler/CPU Reordering (yeniden sıralama) يخلي Pseudocode مش آمنة بلا Atomic Operations وMemory Ordering. منحفظها كنموذج نظري مش Implementation جاهزة للإنتاج.
