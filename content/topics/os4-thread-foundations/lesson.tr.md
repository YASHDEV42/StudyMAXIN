## Thread (iş parçacığı) nedir?

**Thread (iş parçacığı)**, bir **process (işlem)** içindeki yürütme akışıdır. Bir process, en az bir yürütme akışıyla başlar; program ek thread'ler oluşturabilir. Kelime işlemci örneğinde bir thread klavyeden veri alırken diğeri yazım denetimi veya ekran güncellemesi yapabilir. Slaytlardaki web server şemasında bir thread yeni bağlantıları kabul ederken farklı thread'ler istemci isteklerini işler.

## Aynı process içinde ne paylaşılır?

| Ortak kaynaklar | Her thread'e özgü durum |
| --- | --- |
| Code/text, global data, heap, adres alanı ve açık dosya kaynakları | Program counter, CPU registers, stack ve thread'e özgü yürütme durumu |

Bu nedenle thread'ler birbirinin **shared data (paylaşılan veri)** alanlarına erişebilir. Ancak bir thread'in *yerel değişkeni* veya stack'i otomatik olarak ortak değildir. Slaytta geçen “thread'ler her şeyi paylaşır” cümlesi basitleştirmedir.

**Process vs thread:** Ayrı process'ler çoğunlukla ayrı sanal adres alanları ve daha güçlü izolasyon kullanır. Aynı process'in thread'leri adres alanını paylaşır; bir thread'deki yanlış bellek yazımı diğerlerini de etkileyebilir. Thread oluşturmanın ve aynı process içindeki thread context switch'in maliyeti birçok durumda daha düşük olabilir; bu mutlak performans garantisi değildir.

## Dört fayda (slayt 7)

1. **Responsiveness (yanıt verebilirlik):** Uzun süren iş varken uygulama başka istekleri karşılamaya devam edebilir.
2. **Resource sharing (kaynak paylaşımı):** Thread'ler aynı process'in verisini ve kaynaklarını doğrudan kullanabilir.
3. **Economy (ekonomiklik):** Kaynak oluşturma ve geçiş maliyeti process düzeyine göre azalabilir.
4. **Scalability (ölçeklenebilirlik):** Multicore CPU'da ayrı thread'ler farklı çekirdeklerde paralel çalışabilir.

Slaytın Solaris için verdiği “30 kat thread oluşturma, 5 kat context-switch” oranları tarihsel platform ölçümleridir; her sistemde geçerli sabit oranlar değildir.

## Server örneğinin sınırı

Kaynak, her istek için ayrı thread açan tasarımı gösterir. Bu model aşırı yük altında çok thread oluşturabilir; daha sonra anlatılan **thread pool (iş parçacığı havuzu)** bu maliyeti sınırlamaya yardımcı olur. Sunucu her kabul ettiği bağlantı için zorunlu olarak yeni bir TCP portu kullanmaz; dinleme portu aynı kalabilir.

**Kaynak dışı örnek:** Aynı process'teki iki thread ortak sayaç üzerinde `counter++` yapıyorsa sonuç için synchronization gerekebilir.
