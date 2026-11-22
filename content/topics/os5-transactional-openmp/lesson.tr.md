## Transactional memory (işlemsel bellek) — slayt 34–35

Klasik `acquire → update shared data → release` yerine bir **atomic transaction (atomik işlem bloğu)** tanımlanabilir:

```text
atomic {
  // modify shared data
}
```

Amaç, birden çok paylaşılmış veri değişikliğini tek mantıksal işlem gibi değerlendirmektir. Uygulamaya göre çakışan transaction abort/retry yapabilir; maliyet ve destek sınırları bulunur.

**Kaynak düzeltmesi:** Slayt “lock olmadan, deadlock olmadan işlem tamamlanır” der. Transactional memory bazı lock-order deadlock'larını azaltabilir ama bütün platformlarda kesin ilerleme, sınırsız hız veya çakışmasız tamamlama garantisi değildir. İşlemsel blok içinde yapılan I/O veya dış dünya etkileri de sınırlamalara tabi olabilir.

## OpenMP critical — slayt 36

OpenMP, C/C++/Fortran'ın shared-memory parallel programming araçlarından biridir. Slayttaki örnek:

```c
void update(int value) {
  #pragma omp critical
  {
    counter += value;
  }
}
```

**`#pragma omp critical`**, aynı adlandırılmış critical region'ı bir seferde yalnız bir OpenMP thread'in yürütmesini sağlar. Diğer bağımsız thread işleri devam edebilir. Bu directive'in etkisi, bütün erişimlerin doğru korunmasına bağlıdır; korumasız `counter` yazan başka kod varsa yarış yine mümkündür.

## Kısa karşılaştırma

| Yöntem                   | Koruma biçimi              | Dikkat                                       |
| ------------------------ | -------------------------- | -------------------------------------------- |
| **Mutex**                | Acquire/release kilidi     | Kilidi unutma veya ters sıra deadlock        |
| **Transactional memory** | Atomik işlem bloğu         | Retry/abort/implementation sınırları         |
| **OpenMP critical**      | Compiler/runtime directive | Paralel code ve aynı veriye erişim kuralları |

**Kaynak dışı not:** Transactional memory modelini gerçek bir uygulamada kullanmadan derleyici/runtime desteği ve başarısızlık davranışı doğrulanmalıdır.
