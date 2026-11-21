## Thread cancellation (iş parçacığı iptali)

Slayt 39, tamamlanmadan thread'in çalışmasını sonlandırma isteğini **cancellation (iptal etme)** olarak tanıtır. Örnek: Kullanıcı uzun süren işlemi durdurur veya aranan sonuç bulununca kalan işçilerin çalışması gereksiz hale gelir.

## İki yaklaşım

- **Asynchronous cancellation (asenkron iptal):** Hedef thread dışarıdan, uygun anda hemen sonlandırılabilir. Bu, kilitler ve yarım kalmış veri güncellemeleri nedeniyle tehlikeli olabilir.
- **Deferred cancellation (ertelenmiş iptal):** Hedef thread cancellation isteğini belirli güvenli **cancellation points (iptal noktaları)** üzerinde işler; cleanup yapma olanağı vardır.

## Pthreads modları — kaynak tablosu

| Mode | State | Type | Anlamı |
| --- | --- | --- | --- |
| Off | Disabled | — | İptal isteği işlenmez |
| Deferred | Enabled | Deferred | İptal, cancellation point'te gerçekleşir |
| Asynchronous | Enabled | Asynchronous | İptal mümkün olan anda gerçekleşebilir |

`pthread_cancel(tid)` hedef thread'e iptal isteği gönderir; **fonksiyonun dönmesi thread'in derhal bitmiş olduğunu garanti etmez.** Tamamlanmayı kesin beklemek gerekiyorsa uygun join/cleanup gerekir.

Slayttaki “web sayfasını durdurmak bütün process thread'lerini iptal eder” ifadesi örneğin aşırı genellemesidir; uygulamaya bağlıdır.

**Kaynak dışı öneri:** Paylaşılan bir mutex veya dosya güncellemesi sırasında deferred/cooperative cancellation kaynakları güvenli temizlemeyi kolaylaştırır.
