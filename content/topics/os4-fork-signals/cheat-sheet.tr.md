## fork / exec

- Multithreaded `fork()` (POSIX): Child'da **yalnız çağıran thread** kalır.
- **`exec()`:** Var olan process image'ını değiştirir; process veya thread duplicate etmez.
- Fork sonrası diğer thread'lerden kalan kilitler sorun olabilir.

## Signal handling

- **Synchronous signal:** İşlemi yapan thread'de oluşan hata/olay.
- **Asynchronous signal:** Harici olay, Ctrl+C/SIGINT örneği.
- **`kill(pid,sig)`:** Process/process group'a signal.
- **`pthread_kill(tid,sig)`:** Belirli thread'e signal.
- Teslim politikası signal türü ve masking'e bağlıdır.

**Sınav tuzağı:** `exec` = replace, duplicate değildir; `kill` her zaman terminate anlamına gelmez.
