## Thread modelleri

- **User thread:** Runtime/library yönetimi.
- **Kernel thread:** OS scheduler tarafından zamanlanır; user-mode kod da yürütebilir.

| Model            | Harita | Avantaj                                                           | Dezavantaj                                                 |
| ---------------- | ------ | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| **Many-to-one**  | M:1    | Hafif user-space yönetim                                          | Bloklayan çağrı tüm yürütmeyi durdurabilir; paralellik yok |
| **One-to-one**   | 1:1    | Multicore parallelism, bir thread bloklansa diğerleri çalışabilir | Thread/kernel overhead                                     |
| **Many-to-many** | M:N    | Esnek sayıda user thread + N kernel worker                        | Karmaşık mapping                                           |

**Sınav:** Java Thread her platformda “yalnız user thread” değildir. Kernel thread'in yalnız kernel-mode kod çalıştırdığı iddiası doğru değildir.
