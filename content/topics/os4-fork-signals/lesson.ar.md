## fork() داخل Multithreaded Process

السلايد 37 بيذكر نموذجين تاريخيين: إما نسخ جميع Threads عند **fork() (çatallamak)** أو نسخ الـ Calling Thread (çağıran iş parçacığı) فقط.

**تصحيح تقني مهم:** حسب نموذج POSIX الشائع، Child Process بعد `fork()` من Parent متعددة Threads بتحتوي فقط Thread اللي استدعت `fork()`. الـ Other Threads ما بتكمل كنسخ داخل Child. ولازم الحذر من Locks (kilitler) اللي كانت مع Threads ثانية.

**exec() (program imajını değiştirmek)** بتستبدل Process Image (işlem görüntüsü) ببرنامج جديد ضمن نفس Process؛ ما بتنشئ Process جديدة، وما بتعمل Duplicate لكل Threads مثل ما ممكن ينفهم من نص السلايد.

## Signal Handling (sinyal işleme)

الـ **Signal (sinyal)** هي إشعار بحدث في UNIX.

- **Synchronous Signal (senkron sinyal):** سببه Thread نفسها غالبًا، مثل Invalid Memory Access (geçersiz bellek erişimi) أو Division by Zero (sıfıra bölme).
- **Asynchronous Signal (asenkron sinyal):** ممكن يجي من Process ثانية أو من User Action، مثل Ctrl+C اللي غالبًا بيولّد SIGINT.

السلايد 38 بيرسم عدة خيارات لتسليم Signal: Thread معينة، أو Thread مناسبة ضمن Process، أو مجموعة Threads بحسب النظام ونوع الإشارة. القرار الفعلي بيتحدد بقواعد OS وSignal Mask (sinyal maskesi).

## الدوال الموجودة بالسلايد

- `kill(pid, sig)`: بتبعت Signal لـ Process (أو Process Group حسب الـ PID)، واسم Kill ما بيعني بالضرورة إنه كل Signal بتنهي البرنامج.
- `pthread_kill(tid, sig)`: بتوجّه Signal إلى Thread معينة.

**مثال إضافي:** لما تضغط Ctrl+C بالتيرمنال، ممكن OS تبعت SIGINT للـ Foreground Process Group (ön plandaki işlem grubu)؛ مين Thread تستقبلها بيتأثر بالـ Signal Masks والسياسات.

الـ Signals مو بديل عام عن Synchronization (eşzamanlama) بين Threads.
