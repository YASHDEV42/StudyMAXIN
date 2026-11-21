## Beş önemli multicore zorluğu

Slayt 12–15'te işletim sistemi tasarımcısının **scheduling (zamanlama)** tasarlaması ve uygulama geliştiricisinin işi paralel yürütmeye uygun bölmesi gerektiği açıklanır.

1. **Identifying tasks (görevleri belirleme):** Birbirinden bağımsız yürüyebilen işi seçmek. Her fonksiyon otomatik paralelleştirilemez.
2. **Balance (iş yükünü dengeleme):** Eşzamanlı görevlerin iş miktarını dengeli dağıtmak. Dört thread'in üçü 1 saniyede, biri 70 saniyede bitiyorsa toplam iş bu uzun kola takılır.
3. **Data splitting (veri bölümleme):** Diziyi/matrisi, veri iletişimini ve cache erişimini düşünerek core'lara bölmek.
4. **Data dependency (veri bağımlılığı):** B'nin sonucu A için gerekiyorsa A'nın B'yi beklemesi gerekir. Her veri parçası bağımsız değildir.
5. **Testing and debugging (test ve hata ayıklama):** Yarışlar ve zamanlamaya bağlı hatalar tekrarlanması güç sonuçlar doğurabilir.

## Data vs task parallelism (slayt 16)

**Data parallelism (veri paralelliği):** Aynı operasyonu farklı veri parçalarına uygular. Örnek: N elemanlı dizinin ilk yarısını core 1, kalanını core 2 toplar.

**Task parallelism (görev paralelliği):** Farklı thread'ler farklı işlevleri yürütür. Aynı veri üzerinde farklı hesaplar (örneğin ortalama ve maksimum bulmak) veya ayrı verilerle farklı işlemler yapılabilir.

| Özellik      | Data parallelism                  | Task parallelism                        |
| ------------ | --------------------------------- | --------------------------------------- |
| Bölünen      | Veri kümesi                       | Yapılacak görevler                      |
| İşlem        | Çoğunlukla aynı                   | Genellikle farklı                       |
| Slayt örneği | Diziyi parçalara ayırarak toplama | Aynı dizide farklı istatistik hesapları |

**Kaynak dışı not:** Paralelleştirme kararını vermeden önce işin seri bağımlılıklarını ve veri aktarma maliyetini ölçmek gerekir.
