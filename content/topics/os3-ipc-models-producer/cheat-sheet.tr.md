## IPC
- **Independent:** Diğer process'lerden etkilenmez.
- **Cooperating:** Paylaşım/bağımlılık; information sharing, speedup, modularity, convenience.
- **Shared memory:** Ortak alan; hızlı olabilir ama synchronization gerekir.
- **Message passing:** `send` / `receive`; ortak değişken gerekmez.

## Producer–Consumer
- **Producer:** Buffer'a yazar.
- **Consumer:** Buffer'dan okur.
- **Bounded:** Kapasite sınırlı.
- **Unbounded:** Sınır varsayılmaz.
- Dairesel buffer: `in` sonraki yazma; `out` sonraki okuma.
- Bir hücre boş modelinde: **boş `in==out`**, **dolu `(in+1)%N==out`**, **kapasite `N-1`**.
- Java `insert/remove` ve `count` farklı tampon örneği.

**Uyarı:** Eşzamanlama yapılmazsa race condition olur; busy wait örneği tek başına tüm concurrency sorunlarını çözmez.
