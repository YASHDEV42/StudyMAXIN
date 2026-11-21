## Eşzamanlama neden gerekli?
**Cooperating processes (işbirlikçi işlemler)** paylaşılan bellek veya dosyalar yoluyla birbirini etkileyebilir. Ortak veriye denetimsiz eşzamanlı erişim tutarsız sonuçlara yol açabilir (slayt 2).

## Producer–consumer (üretici–tüketici)
**Producer** ürünü **bounded buffer (sınırlı tampon)** içine koyar; **consumer** hazır ürünü alır. Kaynak slayt 3/6 kodunda **counter** dolu öğe sayısı, **in** bir sonraki yazma, **out** sonraki okuma konumudur. Dairesel indis `(index+1)%BUFFER_SIZE` ile ilerler. Producer `counter==BUFFER_SIZE` iken, consumer `counter==0` iken bekler. **0 ≤ counter ≤ BUFFER_SIZE** olmalıdır. Slayt 4 kapasitesi 10, sesli anlatımın devamı 5 örneği verir; kapasite değişebilir.

## Birden çok producer/consumer
Slayt 5, aynı hücreye iki producer yazması veya iki consumer'ın aynı öğeyi alması riskini tartışır. **Mutual exclusion (karşılıklı dışlama)** ve doğru boş/dolu bekleme koşulları birlikte gerekir.

**Kaynak düzeltmesi:** `while(counter==...)` tek başına thread-safe değildir: `counter++/--` atomik olmayabilir; erişim ayrıca korunmalıdır. Slayttaki busy-wait “bariyeri” gerçek synchronization barrier değildir. Thread'ler bütün stack yerel değişkenlerini paylaşmaz.

**Kaynak dışı örnek:** Video encoder'ın ürettiği frame'ler kuyruğu doldurursa üretici bekler; oynatıcı boş kuyruktan okuyamaz.
