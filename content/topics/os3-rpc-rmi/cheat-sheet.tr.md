## RPC
Client → Client stub → Marshalling → Transport → Server stub → Procedure → Response.
- **RPC:** Uzaktaki prosedürü çağırma soyutlaması.
- **Stub:** Uzaktan iletişim ayrıntılarını gizleyen vekil.
- **Marshalling:** Parametre/yanıt paketleme.
- **Remote call:** Gecikme, timeout, network failure içerebilir.

## Java RMI
- Java **remote object** metodu çağrılır.
- `RemoteDate extends Remote`, `getDate() throws RemoteException`.
- Server `Naming.rebind`; client `Naming.lookup` ve metot çağrısı.
- **Stub / Skeleton:** Kaynakta eski RMI mimari bileşenleri; skeleton güncel bütün sürümlerde ayrı sınıf değildir.

**Karşılaştırma:** RPC = uzak prosedür; RMI = Java uzak nesne metodu. İkisi de network hata senaryolarını yönetmeli.
