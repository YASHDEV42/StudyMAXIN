## Parent–Child (üst-alt işlem)

لما Process تعمل Process جديدة، الأولى اسمها **Parent Process (üst işlem)** والتانية **Child Process (alt işlem)**. هيك بيتشكّل Process Tree (işlem ağacı) مثل رسم Solaris بالمصدر. كل واحدة عادة إلها **PID (işlem kimliği)** مميز، والـ Parent إلها Parent PID أو PPID. الـ Parent والـ Child ممكن يكملوا مع بعض أو Parent تنتظر انتهاء Child.

## أهم دوال UNIX

**fork()** بتنشئ Child. انتبه لقيمة الرجوع: داخل الـ Child القيمة **0**، داخل Parent قيمة موجبة هي PID الخاصة بالـ Child، وإذا فشل الإنشاء **-1**. يعني بعد Fork صار في Execution Paths مستقلين.

**exec() (program değiştirme)** ما بتنشى Process جديدة: بتستبدل البرنامج الجاري ضمن Process الموجودة ببرنامج آخر، مثل `execlp("/bin/ls","ls",NULL)` بالسلايدات. هاي نقطة امتحانية كتير مهمة.

**wait()/waitpid() (bekleme)** بتخلي Parent تنتظر أو تستقبل Exit Status تبع Child. **exit() (sonlandırma)** بتنهي تنفيذ العملية، وOS بيرجّع الموارد. ممكن كمان عملية تنتهي بسبب Error أو Kill أو طلب Parent؛ **Cascading Termination (zincirleme sonlandırma)** سلوك موجود ببعض الأنظمة، مو قاعدة عامة.

## Windows

الشرائح بتعرض **CreateProcess()** لإنشاء Process، **WaitForSingleObject()** لانتظارها، و**TerminateProcess()** لإنهائها. الهدف العام مشابه لـ UNIX بس APIs والسلوك التفصيلي مختلفين.

**مثال إضافي:** Parent بتعمل fork، والـ Child بتنفذ برنامج `ls` عبر exec، بينما Parent ممكن تستدعي wait حتى ما تكمل قبل انتهاء Child. ترتيب Output مو مضمون إذا الاتنين شغالين بالتوازي.
