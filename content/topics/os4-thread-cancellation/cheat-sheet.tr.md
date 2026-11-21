## Cancellation
- **Asynchronous cancellation:** Thread aniden iptal edilebilir; lock/resource tehlikesi.
- **Deferred cancellation:** İptal güvenli cancellation point'te gerçekleşir.
- **`pthread_cancel(tid)`:** İptal isteği gönderir; bitişi kesin garanti etmez.
- **`pthread_join()`:** Thread tamamlanmasını beklemek için kullanılabilir.

| Mode | State | Type |
| --- | --- | --- |
| Off | Disabled | — |
| Deferred | Enabled | Deferred |
| Asynchronous | Enabled | Asynchronous |

**Sınav farkı:** Deferred = güvenli noktalarda; asynchronous = herhangi bir anda, riskli.
