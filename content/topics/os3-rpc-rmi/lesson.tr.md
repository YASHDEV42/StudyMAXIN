## RPC: Remote Procedure Call (uzak prosedür çağrısı)

**RPC**, başka bir adres alanındaki (genellikle ağ üzerindeki) prosedürü çağırmayı daha çok yerel bir fonksiyon çağrısına benzer hale getirir. Ancak network hataları, gecikme, timeout, serialization ve yetkilendirme kaybolmaz: çağrı uzaktan yürütülür ve yerel çağrıdan farklı failure modes taşır.

Slayttaki **RPC flow**: Client uygulaması → **client stub (istemci vekili)** → argümanların paketlenmesi (**marshalling / parametre paketleme**) → transport/network → **server stub (sunucu vekili)** → gerçek prosedür → sonuç paketleme → client'a dönüş. Stub ayrıntıları soyutlar. Bir server birden fazla concurrent RPC isteği alabilir.

## Java RMI: Remote Method Invocation (uzak metot çağırma)

**RMI**, Java'da uzaktaki nesnelerin metotlarını çağırmak için kullanılır. RPC'nin genel prosedür çağrısı yaklaşımına karşılık, RMI **object/method (nesne/metot)** etkileşimi ve Java interface'leri üzerinden anlatılır. Slaytta **`RemoteDate extends Remote`** interface'i, **`getDate() throws RemoteException`**, sunucuda **`RemoteDateImpl extends UnicastRemoteObject`**, **`Naming.rebind("DateServer",dateServer)`**, istemcide **`Naming.lookup("rmi://127.0.0.1/DateServer")`** ve `getDate()` gösterilir.

## Katmanlar ve terimler

**Stub:** Client'ın uzaktaki metodu yerel arayüzle çağırmasını sağlar. **Skeleton:** Kaynakta server tarafı yönlendirme ve parametre çözme görevini gösteren tarihsel bileşen. **Remote reference:** Uzak nesne tanıtıcısı/başvuru mekanizması. **Transport:** İletişim bağlantısı ve veri aktarımı. Bu katman gösterimi eski RMI şemalarına aittir; modern Java sürümlerinde her zaman ayrı skeleton sınıfı beklenmez.

## RPC ve RMI karşılaştırması
- **RPC:** Prosedür/fonksiyon çağrısını ağ üzerinde soyutlar; belirli dile zorunlu olarak bağlı değildir.
- **RMI:** Java nesnesinin uzaktaki metodunu çağırır; Java Remote interface ve remote object kavramını kullanır.
- **İkisinde de:** Client–server, parametre paketleme, iletişim, hata/timeout senaryoları vardır.

**Kaynak dışı örnek:** TypeScript backend'in HTTP üzerinden diğer servise istek göndermesi RPC ile aynı sözleşme değildir; ancak uzaktan iş tetikleme fikrini anlamaya yardımcı olabilir.
