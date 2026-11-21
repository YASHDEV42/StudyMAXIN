## Altı sistem çağrısı grubu

1. **Process control:** create/terminate, end/abort, load/execute, wait/signal, allocate/free memory, acquire/release lock.
2. **File management:** create/delete/open/close/read/write/reposition, attributes.
3. **Device management:** request/release device, read/write, attach/detach.
4. **Information maintenance:** time/date, system/process/device/file attributes.
5. **Communications:** connection, send/receive, **message passing** veya **shared memory**.
6. **Protection:** get/set permissions, grant/deny user access.

## Sınav karşılaştırmaları

- **MS-DOS:** Slaytta single-tasking örneği; **FreeBSD:** Multitasking, shell `fork()` + `exec()`, `exit()` status.
- **Message passing:** OS aracılığıyla mesaj; doğrudan veya mailbox.
- **Shared memory:** Ortak alan; veriye erişim eşzamanlanmalı.
- **Windows:** CreateProcess, CreateFile, CreatePipe.
- **UNIX:** fork/exec, open/read, pipe, getpid, chmod.
- **Memory dump:** Hata analizinde debugger'ın kullanabildiği bellek görüntüsü.

**Uyarı:** Slaytlardaki tüm İngilizce işlem adları her platformda gerçek ve aynı isimli kernel çağrıları değildir.
