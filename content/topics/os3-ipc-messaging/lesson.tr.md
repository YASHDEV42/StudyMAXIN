## Message Passing (mesaj iletimi)

İşlemler arası iletişim için ortak bir değişkene erişmek yerine **send(message)** ve **receive(message)** kullanılır. İki süreç arasında **communication link (iletişim bağlantısı)** gerekir. Mesaj boyutu sabit veya değişken olabilir. Bağlantı tek yönlü veya çift yönlü kurulabilir.

## Direct Communication (doğrudan iletişim)

Süreçler birbirini açıkça isimlendirir: `send(P, message)`, `receive(Q, message)`. Kaynaktaki modelde bağlantı bir süreç çiftini ilişkilendirir ve otomatik oluşabilir.

## Indirect Communication (dolaylı iletişim)

Mesajlar **mailbox / port (posta kutusu / port)** aracılığıyla iletilir: `send(A, message)`, `receive(A, message)`. Aynı mailbox'ı ikiden fazla process paylaşabilir. **P1** kutuya mesaj gönderirken **P2** ve **P3** alıcıysa, kimin alacağı tanımlanmalıdır: tek alıcıya izin verme, iki süreç sınırı koyma veya OS'nin alıcı seçip göndereni bilgilendirmesi gibi politikalar.

## Synchronous ve Asynchronous

- **Blocking send (bloklayan gönderim):** Gönderici, gerekli teslim/alım koşulu sağlanana kadar bekler.
- **Nonblocking send (bloklamayan gönderim):** Gönderici çağrıdan sonra devam edebilir.
- **Blocking receive (bloklayan alım):** Mesaj gelene kadar alıcı bekler.
- **Nonblocking receive (bloklamayan alım):** Mesaj varsa alır; yoksa boş/null benzeri sonuç döner.

Bu kavramlar **senkron / asenkron iletişim (synchronous/asynchronous messaging)** ile ilişkilidir, fakat gerçek API davranışları sistemlere göre değişir; blocking send daima uygulama düzeyinde bir *yanıt* beklemek demek değildir.

## Buffering (tamponlama)

**Zero capacity:** Kuyrukta mesaj tutulmaz, gönderici/alıcı aynı anda buluşur (**rendezvous**). **Bounded capacity:** Kuyruk n mesaj tutar, dolarsa gönderici bekleyebilir. **Unbounded capacity:** Teorik modelde kapasite sınırı yoktur, gönderici doluluk nedeniyle beklemez.

**Öğretici ek:** İş kuyruğuna mesaj yollayan worker modelinde mesajın *alınması* ile *işin tamamlanması* farklı olaylardır.
