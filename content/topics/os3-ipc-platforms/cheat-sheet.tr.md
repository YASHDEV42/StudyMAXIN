## IPC platform örnekleri

- **System V shared memory:** `shmget` → `shmat` → read/write → `shmdt`.
- **Kaynak düzeltmesi:** Slayt “POSIX” diyor ama bu fonksiyonlar **System V IPC**; POSIX `shm_open/mmap` farklıdır.
- **Mach:** Message/port tabanlı; `msg_send`, `msg_receive`, `msg_rpc`, `port_allocate` tarihsel örnekler.
- **Windows XP LPC:** Aynı sistemde port + handle ile client-server iletişimi.
- **Shared memory ≠ otomatik synchronization.**
- **Eski OS API örneklerini güncel sürüm garantisi olarak ezberleme.**
