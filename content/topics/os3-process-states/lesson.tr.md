## Beş durumlu model

**New (yeni):** İşlem oluşturuluyor. **Ready (hazır):** Çalışmaya elverişli, CPU bekliyor. **Running (çalışıyor):** CPU üzerinde komut yürütüyor. **Waiting/Blocked (bekliyor/bloke):** I/O veya olay tamamlanmasını bekliyor; yalnız CPU verilmesi yetmez. **Terminated (sonlandırılmış):** İşlem bitmiş veya durdurulmuş.

## Diyagramdaki geçişler

- **New → Ready:** Admitted; sistem işlemi çalıştırılabilir kümeye alır.
- **Ready → Running:** Scheduler dispatch ile CPU tahsis eder.
- **Running → Ready:** Zaman dilimi dolması, preemption veya uygun interrupt sonrası yeniden sıraya alma.
- **Running → Waiting:** I/O isteği veya gerekli olayın beklenmesi.
- **Waiting → Ready:** I/O/event tamamlandı; doğrudan Running'e değil önce Ready'ye döner.
- **Running → Terminated:** exit veya sonlandırma.

PPTX ayrıca basitleştirilmiş **two-state model (iki durumlu model)**: Running / Not Running sunar. Bu model Ready ile Waiting farkını gizler; beş durumlu model daha açıklayıcıdır.

**Sınav ayrımı:** Ready = CPU istiyor; Waiting = CPU'dan bağımsız bir olay bekliyor. Waiting'deki süreç CPU boş diye koşturulamaz.

**Kaynak dışı örnek:** Klavyeden giriş bekleyen process Waiting'de; girdi geldikten sonra Ready'ye geçer.,## Five-State Process Model (beş durumlu işlem modeli)

**New (yeni):** العملية عم تنخلق. **Ready (hazır):** كل شيء جاهز للتنفيذ بس ناطرة CPU. **Running (çalışıyor):** CPU عم ينفّذ تعليماتها. **Waiting/Blocked (bekliyor / bloke):** ناطرة I/O أو Event؛ إعطاء CPU لحاله ما بيحل المشكلة. **Terminated (sonlandırılmış):** خلصت أو انوقفت.

## الانتقالات الموجودة بالرسم

- **New → Ready:** Admission (kabul) للنظام.
- **Ready → Running:** Scheduler Dispatch (zamanlayıcı görevlendirmesi).
- **Running → Ready:** Timeout (zaman dilimi dolması)، Interrupt أو Preemption (kesme / ön alma).
- **Running → Waiting:** طلب I/O أو انتظار Event.
- **Waiting → Ready:** اكتمال الحدث؛ **مو مباشرةً Running**، لأنه CPU ممكن يكون مشغول.
- **Running → Terminated:** Exit (sonlanma).

في كمان **Two-State Model (iki durumlu model)** بالسلايدات: Running وNot Running. هاد بيخفي الفرق المهم بين جاهز وناطر حدث، لذلك نموذج الخمس حالات أدق.

**مثال توضيحي خارج السلايدات:** Process عم تنتظر Disk Read بتكون Waiting، بعد وصول البيانات بتنتقل Ready، وبعدين Scheduler بيقرر إمتى Running.,## Beş Durum

1. **New:** Yeni oluşturuluyor.
2. **Ready:** CPU bekliyor; çalıştırılabilir.
3. **Running:** CPU komutları yürütüyor.
4. **Waiting/Blocked:** I/O/olay bekliyor; CPU verilmesi yeterli değil.
5. **Terminated:** Bitmiş/sonlandırılmış.

## Geçişler

**New→Ready:** admission. **Ready→Running:** dispatch. **Running→Ready:** preemption/time-out. **Running→Waiting:** I/O/event wait. **Waiting→Ready:** event completion. **Running→Terminated:** exit.

**Two-state:** Running / Not Running, ancak Ready ve Waiting ayrımını göstermez.

**Sık soru:** Waiting→Running doğrudan standart diyagram geçişi değildir; önce Ready.
