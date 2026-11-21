## Independent ve Cooperating Processes

**Independent process (bağımsız işlem)** diğer süreçlerin verisini etkilemez veya onlardan etkilenmez. **Cooperating process (işbirlikçi işlem)** ise ortak bilgi paylaşır veya diğer süreçlere bağımlı çalışır. Neden işbirliği? **Information sharing, computation speedup, modularity, convenience**. Bunun için **IPC (Interprocess Communication / işlemler arası iletişim)** gerekir.

## İki IPC modeli

**Shared memory (paylaşımlı bellek):** OS, iki process'in erişebildiği ortak bölgeyi oluşturur/eşler; süreçler bu bölgede okuyup yazar. Kopyalama maliyeti az olabilir ama **synchronization (eşzamanlama)** ve erişim hakları kritik. Shared memory'nin *daima* daha hızlı olduğu mutlak değildir; kaynak slaytı bunu basitleştirir.

**Message passing (mesaj iletimi):** Süreçler `send` ve `receive` ile mesaj aktarır, paylaşılan değişkene gerek duymaz; kernel/iletişim altyapısı aktarımda rol oynayabilir. Dağıtık ortamlarda uygundur.

## Producer–Consumer (üretici–tüketici)

**Producer (üretici)** ürün/veri oluşturur, ortak buffer'a (tampon bellek) yazar. **Consumer (tüketici)** buffer'dan öğe alır. İki yaklaşım:

- **Unbounded buffer (sınırsız tampon):** Öğeler için pratik kapasite sınırı varsayılmaz.
- **Bounded buffer (sınırlı tampon):** Kapasite sabittir; doluyken üretici, boşken tüketici beklemelidir.

Slayttaki klasik **circular buffer (dairesel tampon)** örneğinde **in** sonraki yazma konumu, **out** sonraki okuma konumu. Bir hücre boş bırakılan modelde **empty: in == out**, **full: (in + 1) % BUFFER_SIZE == out**, ve kullanılabilir kapasite **BUFFER_SIZE - 1**. Başka bir Java örneği `count` ile kapasiteyi izler ve `insert(E)` / `remove()` kullanır.

**Önemli sınırlama:** Slayttaki busy-wait/yalın `count` örneği, birden fazla eşzamanlı producer/consumer için tek başına güvenli synchronization garantisi değildir; race condition önlemleri ayrıca gerekir.

**Öğretici ek:** Web sunucusu gelen işleri kuyruğa koyar, worker süreçleri/iş parçacıkları kuyruktan alabilir.
