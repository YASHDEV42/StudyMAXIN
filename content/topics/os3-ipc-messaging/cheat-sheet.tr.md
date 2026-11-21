## Model farkları

- **Direct:** Process adıyla `send(P,m)` / `receive(Q,m)`; kaynakta pair-to-pair link.
- **Indirect:** Mailbox/port adıyla `send(A,m)` / `receive(A,m)`; birden çok alıcı olabilir.
- **Shared mailbox:** P2/P3 aynı kutuyu okuyorsa alıcı seçimi politikası gerekir.

## Synchronization

- **Blocking send:** Gönderici teslim/alım koşulunu bekler.
- **Nonblocking send:** Beklemeden dönebilir.
- **Blocking receive:** Mesajı bekler.
- **Nonblocking receive:** Mesaj ya da boş sonuç döner.
- **Blocking send ≠ mutlaka yanıt bekleme.**

## Buffer

- **Zero capacity:** Rendezvous.
- **Bounded capacity:** n mesaj; doluyken gönderici bekleyebilir.
- **Unbounded capacity:** Teorik sınırsız kuyruk.
