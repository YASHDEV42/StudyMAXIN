## RPC (uzak prosedür çağrısı)

الـ **Remote Procedure Call (uzak prosedür çağrısı)** هي طريقة تنادي Function موجودة ضمن Process أو Machine ثانية وكأنها Call عادي قدر الإمكان. بس تحت الغطاء في Network (ağ) وSerialization (serileştirme) وLatency (gecikme) وFailures (hatalar)، فمو مطابقة تمامًا لاستدعاء Local Function.

## شو بيصير بالـ RPC؟

1. **Client (istemci)** بتنادي Function.
2. **Client Stub (istemci vekili)** بيغلف الـ Parameters عبر **Marshalling (parametre paketleme)**.
3. الطلب بيروح على Network Transport (ağ taşıması).
4. **Server Stub (sunucu vekili)** بيفك المعاملات وبينادي الدالة الحقيقية.
5. النتيجة بترجع بالعكس للـ Client.

المخطط بالصفحة 61 بيعرض هالمسار ومعه إمكانية تنفيذ Requests متزامنة.

## Java RMI (uzak metot çağırma)

الـ **Remote Method Invocation (uzak metot çağırma)** هو نموذج Java لاستدعاء Method من **Remote Object (uzak nesne)**. السلايدات فيها Interface اسمها `RemoteDate` وفيها `getDate() throws RemoteException`. Server بينشر الـ Object باستخدام `Naming.rebind`، والـ Client بيلاقيه باستخدام `Naming.lookup("rmi://127.0.0.1/DateServer")`، وبعدين بينادي `getDate()`.

الرسومات التاريخية بتظهر **Stub (istemci vekili)** و**Skeleton (sunucu istek yönlendiricisi)** وRemote Reference وTransport Layers. مهم نعرف إن Skeleton المنفصل جزء من تصميم وإصدارات RMI الأقدم، مو لازم يكون فئة منفصلة بكل Java حديثة.

## RPC vs RMI

**RPC:** غالبًا إجراء أو Function بعيد عن Process الحالي. **RMI:** استدعاء Method على Java Remote Object باستخدام Interfaces. الاتنين فيهم Parameters وResult، وبيعتمدوا على Communication Link (iletişim bağlantısı)، وبيحتاجوا Error Handling.

**مثال خارج المصدر:** Microservice بتنادي خدمة بعيدة. حتى لو API بتشبه Function Call، لازم تفكّر بTimeout وRetries، بعكس Function محلية.
