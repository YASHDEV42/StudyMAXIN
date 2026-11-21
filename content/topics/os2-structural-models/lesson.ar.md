## ليش بنقارن Operating System Structures؟

الـ **Operating System Structure (işletim sistemi yapısı)** بتحدد وين موجودة كل خدمة وكيف المكوّنات بتتواصل. اختيارها بيأثّر على Performance، Security، Ease of Debugging، وMaintenance. المخططات بالسلايدات بتبيّن الفرق بين الطبقات والمكوّنات، وما هي مجرد أسماء.

## Simple Structure (basit yapı): MS-DOS

الـ MS-DOS مثال تاريخي على تصميم ابتدائي محدود الفصل بين المكوّنات. ببعض الحالات برنامج المستخدم ممكن يوصل لروتين I/O بمستوى منخفض. النتيجة: **Isolation (yalıtım)** ضعيف، وصعوبة ضبط الأخطاء، وتطبيق ضار ممكن يأثر على استقرار النظام. مو كل نظام صغير أو بسيط لازم يكون غير آمن، لكن هاد مثال السلايدات.

## Monolithic Kernel (tek parça çekirdek): UNIX

بالـ **Monolithic Structure (monolitik yapı)** خدمات كثيرة مثل File System، CPU Scheduling، Memory Management، وDevice Drivers بتشتغل ضمن **Kernel Space (çekirdek alanı)** وعادةً ضمن Address Space واحد. هاد بيقلّل كلفة التواصل بين أجزاء Kernel لأنه في Direct Calls، لكنه بيزيد أثر خطأ بمكوّن عنده صلاحيات عالية. مخطط UNIX التقليدي بيضع Users وShells/System Libraries فوق System Call Interface، يليها خدمات Kernel ثم Hardware.

## Layered Approach (katmanlı yaklaşım)

النظام بيتقسّم **Layers (katmanlar)**: Layer 0 = Hardware، وLayer N = User Interface بالنموذج الدراسي. كل Layer بتستخدم خدمات الطبقات الأدنى. الفائدة: **Modularity (modülerlik)**، سهولة Debugging وVerification لكل طبقة. الثمن: تحديد حدود كل طبقة صعب، والمرور بين عدة طبقات ممكن يضيف Overhead، لذلك السلايدات بتنصح ما نكثّر طبقات بدون داعٍ.

**فرق دقيق:** Layered Structure بتفرض Direction of Dependency؛ مو أي كود مقسّم على Modules بيكون Layered.

## Microkernel (mikroçekirdek)

الفكرة نقل خدمات من Kernel إلى **User Space (kullanıcı alanı)**، وخلي النواة صغيرة ومركّزة بوظائف أساسية مثل IPC وScheduling وبعض جوانب Memory Management. **Mach (Mach mikroçekirdeği)** مثال تاريخي مذكور بالسلايدات. الخدمات اللي انتقلت لـ User Space بتتواصل عبر **Message Passing (mesaj iletimi)**.

الربح: Separation/Isolation أفضل، وإمكانية تطوير أو استبدال خدمة أسهل. الكلفة: إضافية من Message Passing و**Context Switching (bağlam değiştirme)**، وممكن ترفع Latency حسب التنفيذ. مو شرط كل Microkernel أسرع ولا كل Monolithic Kernel أقل أمانًا بحكم الاسم وحده.

## جدول المفاضلات

| النموذج          | مين بيشتغل داخل Kernel؟    | نقطة القوة                | نقطة الضعف                  |
| ---------------- | -------------------------- | ------------------------- | --------------------------- |
| Simple/MS-DOS    | فصل ضعيف                   | بساطة أولية               | حماية وتنظيم محدود          |
| Monolithic/UNIX  | خدمات كثيرة                | Direct Calls وسرعة محتملة | Failure Isolation أصعب      |
| Layered          | خدمات بحدود طبقية          | اختبار وصيانة منظمة       | تعريف طبقات وكلفة عبورها    |
| Microkernel/Mach | نواة أصغر + Servers خارجها | Isolation ومرونة          | IPC/Context Switch overhead |

**توضيح خارج السلايدات:** Kernel Linux غالبًا Monolithic لكنه بيدعم Loadable Modules؛ ما منحطّه تلقائيًا ضمن Microkernel لمجرد وجود Modules.
