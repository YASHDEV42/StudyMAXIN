## Alternatifler
- **Transactional memory:** `atomic { ... }`; ortak veri güncellemelerini tek mantıksal transaction olarak ifade eder.
- Çatışma durumunda retry/abort olabilir; her uygulamada ilerleme veya deadlock yokluğu mutlak garanti değildir.
- **Mutex:** `acquire → critical → release` ile manuel kilit.
- **OpenMP:** C/C++/Fortran shared-memory parallel API.
- **`#pragma omp critical`:** Aynı critical region için bir anda tek thread.
- Slayt örneği: `counter += value` korunan block içinde.
- **Sınav:** Mutex = lock API; Transactional memory = atomic block; OpenMP critical = compiler/runtime ile mutual exclusion.
