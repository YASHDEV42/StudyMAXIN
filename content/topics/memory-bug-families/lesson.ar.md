## Aynı kök alan, farklı hata biçimleri

Bellek güvenliği tek bir taşma türünden ibaret değildir. Format string hatasında program, kullanıcı metnini biçim şablonu gibi yorumlar: `printf(kullanici)` ile `%` yönergeleri yorumlanırken, `printf("%s", kullanici)` sabit şablon kullanır. Etki kullanılan biçim belirteçlerine ve derleyici/çalışma zamanı korumalarına göre değişir; her format hatası aynı yetkiyi vermez.

Tamsayı taşması, bir uzunluk hesabının temsil edilebilen aralığı aşmasıyla yanlış boyut üretir. Örneğin `count * sizeof(item)` taşarsa küçük bir alan ayrılıp çok sayıda öğe yazılabilir. Önce `count <= SIZE_MAX / sizeof(item)` koşulu kontrol edilmeli, sonra ayırma ve döngü sınırları aynı doğrulanmış değerle yürütülmelidir. İşaretli tamsayının taşması C’de tanımsız davranış, işaretsiz aritmetikte modüler sarma olabilir; tür ve dil önemlidir.

Use-after-free, nesne serbest bırakıldıktan sonra eski işaretçiyle kullanılınca oluşur. Heap allocator aynı bölgeyi başka nesneye verebilir; eski başvurunun yeni içeriğe erişmesi bellek bozulması ya da gizli verinin açığa çıkmasına yol açabilir. Heap overflow ise dinamik nesnenin sınırını aşarak komşu tahsisleri bozabilir. Double-free ve heap metadata bozulmasıyla ilişkili hatalar farklı kök mekanizmalardır; hepsini “buffer overflow” diye birleştirmek tanı koymayı zorlaştırır.

Tarayıcı senaryosunda nesne yaşam döngüsü kritik: serbest bırakma, referansların geçersiz kılınması ve eşzamanlı olaylar doğru yönetilmelidir. Rust’ın sahiplik modeli bazı use-after-free durumlarını önlemeye yardım eder; C/C++’ta sahiplik kuralları, akıllı işaretçiler ve araçlar gerekir. Sanitizer’lar testte hatayı yakalar ama üretim politikasının yerine geçmez. Kaynaktaki karşılaştırmayı kök neden, etkilenen alan ve uygun önlem üzerinden oku; tek savunma her hata sınıfına uymaz.

### أخطاء قريبة وتسريب بالقراءة فقط

خطأ off-by-one يتجاوز الحد بعنصر واحد؛ حتى بايت واحد قد يفسد طولاً أو مؤشراً مجاوراً. أما double-free فيحرر الكتلة نفسها مرتين فيفسد محاسبة المخصص. تصفير المؤشر إلى `NULL` بعد التحرير يساعد على كشف استعماله مجدداً، لكنه لا يحل المشكلة إذا بقيت نسخ أخرى من المؤشر. وقراءة ذاكرة غير مهيأة قد تكشف بيانات بقيت من تخصيص سابق.

Heartbleed (CVE-2014-0160) نتج من عدم التحقق من أن طول البيانات المعلن في رسالة TLS heartbeat مدعوم فعلياً بطول الرسالة المستلمة؛ فأمكنت قراءة خارج حدود الذاكرة. لم يكن يلزم تنفيذ شيفرة كي تتسرب معلومات جلسة أو مادة مفتاح موجودة في ذاكرة الخادم، ويتوقف الأثر على البيانات الموجودة وقتها. تذكرنا الحالة بأن القراءة وحدها قد تكسر السرية، وأن كل حقل طول يحتاج تحققاً صريحاً.
