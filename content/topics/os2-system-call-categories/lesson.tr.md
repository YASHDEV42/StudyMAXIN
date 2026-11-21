## Altı kategori

**1. Process control (süreç kontrolü):** Process oluşturma/sonlandırma; end/abort; load/execute; process attributes; zaman/olay bekleme ve sinyal verme; bellek tahsisi ve serbest bırakma; paylaşılan veriyi **acquire lock/release lock** ile koruma. Hatalı sonlandırmalarda memory dump, debugger ile incelenebilir. **Single-tasking** MS-DOS örneği, **multitasking** FreeBSD örneğiyle karşılaştırılır. Güncel kitap slaytında Arduino'nun basit bootloader + sketch akışı ve FreeBSD'deki `fork()`, `exec()`, `exit()` yer alır.

**2. File management (dosya yönetimi):** Dosya oluştur/sil; aç/kapat; oku/yaz; konumu değiştir (reposition); nitelikleri getir/değiştir. `copy()` ve `move()` bazı slaytlarda işlevsel örneklerdir; her platformda doğrudan kernel system call sayılmaz.

**3. Device management (aygıt yönetimi):** Aygıt iste/serbest bırak; read/write/reposition; device attributes; mantıksal bağla/ayır.

**4. Information maintenance (bilgi bakımı):** Saat/tarih, sistem verisi, process/dosya/aygıt nitelikleri; sistem sürümü, boş disk/bellek gibi durum bilgileri. Timer interrupt ve dump araçları izlemeye yardımcı olabilir.

**5. Communications (iletişim):** Bağlantı oluştur/sil, mesaj gönder/al, durum aktar, uzak aygıt bağla/ayır. **Message passing** süreçler arasında doğrudan veya mailbox üzerinden mesaj aktarır. **Shared memory** süreçlere ortak bir bellek alanı sunar; veri eşzamanlaması uygulama tarafından sağlanmalıdır.

**6. Protection (koruma):** Erişim haklarını al/ayarla; kullanıcıya izin ver/reddet; kaynak erişimini yetkilendir.

## Windows–UNIX örnekleri (slayt tablosu)

| İşlev    | Windows örneği               | UNIX örneği                     |
| -------- | ---------------------------- | ------------------------------- |
| Process  | `CreateProcess()`            | `fork()`, `exec()`              |
| Dosya    | `CreateFile()`, `ReadFile()` | `open()`, `read()`              |
| Aygıt    | `SetConsoleMode()`           | `ioctl()`                       |
| Bilgi    | `GetCurrentProcessID()`      | `getpid()`                      |
| İletişim | `CreatePipe()`               | `pipe()`                        |
| Koruma   | Security API                 | `chmod()`, `umask()`, `chown()` |

Bu eşleştirmeler tam olarak aynı API sözleşmesini ifade etmez; işlevsel örneklerdir.

**Öğretici ek:** Shared memory üzerinde eşzamanlama yapılmazsa aynı sayaç değerini okuyan iki süreç birbirinin güncellemesini kaybedebilir.
