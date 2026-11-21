## شو هو Socket (soket)؟

الـ **Socket (soket)** هو Endpoint (uç nokta) للتواصل بين Processes عبر Network. السلايدات بتعرّفه بعنوان **IP Address (IP adresi)** ورقم **Port (port numarası)**. مثال الرسم: Client عند `146.86.5.20:1625` وServer عند `161.25.19.8:80`. تمييز Connection عادة بيحتاج عنوان الطرفين والبروتوكول، مو Port لحاله.

## TCP vs UDP

**TCP (bağlantı odaklı iletişim)** Connection-oriented، بيوفّر Reliable Ordered Byte Stream. أما **UDP (bağlantısız iletişim)** فبيبعث Datagrams بدون ضمان وصول أو ترتيب. معنى Unreliable هون إنه البروتوكول ما بيعطي ضمانات بنفسه، مو إنه كل UDP Packet رح تضيع.

المصدر بيذكر HTTP على Port 80 وFTP Control على 21 كأمثلة Default Ports، مو أرقام ملزمة بكل Deployment.

## Java Client–Server Example

الـ **ServerSocket (sunucu soketi)** بيسمع على Port **6013**؛ `accept()` بتقبل Connection، وبعدين `PrintWriter` بيبعت Date/Time. الـ **Client Socket (istemci soketi)** بيتصل على `127.0.0.1:6013`، والـ **BufferedReader** بيقرأ الرد. `127.0.0.1` هو **Loopback Address (geri döngü adresi)** يعني نفس الجهاز.

## أهم فرق

IP بيحدد Network Interface، وPort بيساعد يحدد Service/Endpoint. ونقل Bytes عبر TCP غير منطق HTTP أو بروتوكول التطبيق.

**مثال إضافي:** Web Server ممكن يستخدم نفس Port 80 ليخدم Connections كثيرة، كل واحدة بعميل مختلف.
