## Windows
- **One-to-one thread model** (normal user threads).
- **ETHREAD:** Executive thread info / parent process.
- **KTHREAD:** Scheduling, synchronization, kernel stack.
- **TEB:** User-mode thread environment, ID, TLS / stack.

## Linux
- Thread/process → Kernel **task**, represented by `task_struct`.
- **`fork()`:** Child process.
- **`clone()`:** Child task with controllable resource sharing flags.
- **CLONE_FS:** File-system context.
- **CLONE_VM:** Address space.
- **CLONE_SIGHAND:** Signal dispositions.
- **CLONE_FILES:** Open file descriptor table.

**Sınav:** CLONE_VM ortak bellek, CLONE_FILES ortak dosya descriptor tablosu demektir; aynı kavram değildir.
