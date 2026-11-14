## Savunmaları bir zincir olarak düşün

Bölüm sonu alıştırmalarının ortak yöntemi, yalnızca bir ürün özelliğini seçmek değil, saldırı zincirinin hangi varsayımını kırdığını açıklamaktır. RELRO, kanarya, NX ve ASLR+PIE birlikte kullanıldığında saldırganın birden çok engeli aşması gerekir; yine de bilgi sızıntısı, bellek hatası ve uygulama mantığı ayrı ayrı incelenmelidir. Kalkanların varlığını yapılandırma/ikili üzerinden doğrulamadan “etkin” saymayın.

Bir servisin yalnızca 443 numaralı portu dinlemesi gerekiyorsa setuid root yerine dar capability veya ayrıcalık düşürme seçenekleri değerlendirilir; uygun mekanizma işletim sistemi ve dağıtım politikasına bağlıdır. Konteynerde `CAP_SYS_ADMIN` ve seccomp filtresinin olmaması, geniş yetki ve sistem çağrısı yüzeyini büyütür; namespace tek başına kaçış olasılığını yok etmez. TEE veya TPM’nin koruduğu anahtarın kurtarma, firmware ve yan kanal varsayımları da analiz edilir.

Sanitizer ile yalnızca test derlemesinin çökmesi, normal derlemede hatanın olmadığı anlamına gelmez; araç kusurlu yolu tetiklemiş olabilir. Doğru yanıt, sanitizer raporunu inceleyip kök nedeni düzeltmek ve regresyon testi eklemektir. Sınırlı zamanlı eski C sunucusunu güvenceye alırken önce dışa açık kritik hatalar ve yamalar, sonra derleme korumaları, izolasyon ve izleme ele alınır; uzun vadede bellek güvenli bileşene geçiş planlanır.

Açık kaynak bağımlılığın kaynağına bakmak tek başına Trusting Trust sorununu çözmez; derleme kaynağı, imza, CI ve artifact karşılaştırması önemlidir. Bölümün bağlayıcı modeli şudur: kök nedeni önle; kalan hatayı savunmalarla zorlaştır; çalışma zamanında algıla; yetkiyi sandbox ile sınırla; güvenilir açılış ve üretim zincirini doğrula; yamala ve denetle. Bu, önceki ağ ve uygulama güvenliği derslerindeki katmanlı savunma, en az ayrıcalık ve tedarik zinciri fikirlerini işletim sistemi düzeyinde birleştirir.

### منطق المسائل التطبيقية

| السيناريو                                 | طريقة التفكير                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| تجاوز في خادم محمي                        | كل من الكناري وNX وPIE/ASLR وRELRO يصعّب مرحلة مختلفة؛ افحص احتمال تسريب معلومات أيضاً.                              |
| خدمة تحتاج المنفذ 443                     | افحص صلاحية ضيقة مثل `CAP_NET_BIND_SERVICE` بدل منح root كاملاً عبر setuid.                                         |
| حاوية ذات امتيازات واسعة                  | أزل `CAP_SYS_ADMIN` غير الضروري، وأضف seccomp وuser namespace وسياسة MAC؛ وقد يلزم VM لعمل غير موثوق.              |
| قرص مفتاحه مربوط إلى TPM                  | تغيير الجهاز أو الإقلاع قد يمنع تحرير المفتاح وفق سياسة PCR؛ تبقى مفاتيح الاستعادة وهجمات وقت التشغيل ضمن النموذج. |
| ASan يكشف UAF في الاختبار                 | العطل حقيقي حتى لو لم ينهَر البناء العادي؛ أصلح دورة حياة الكائن وأضف اختبار تراجع.                                 |
| خدمة C قديمة ووقت محدود                   | ابدأ بالترقيع وحمايات المترجم، ثم أقل الامتياز والعزل والتسجيل؛ خطط لاحقاً لمكوّن آمن للذاكرة.                       |
| المصدر المفتوح نظيف والملف التنفيذي مشبوه | افحص أدوات البناء ومصدر artifact وإمكان إعادة إنتاجه مستقلاً؛ مراجعة المصدر وحدها لا تكفي.                          |

أسئلة المراجعة الثمانية تختبر الروابط نفسها: حد المستخدم/النواة، أثر تجاوز المكدس على العودة، اختلاف DEP/NX وROP وASLR، كيف يكشف تسريب المعلومات قيمة الكناري، أثر setuid، مشاركة النواة بين الحاوية والمضيف، الفرق بين Secure Boot والإقلاع المقاس، وحدود الثقة بالمترجم. رتّب الإجابة: الشرط المسبق، الأصل المحمي، سبب الخلل، الدفاع، ثم الخطر المتبقي.
