## Yapı neden önemlidir?

**Operating system structure**, kernel ve yardımcı servislerin nasıl ayrılıp haberleştiğini belirler. Tasarım, bakım, güvenilirlik, güvenlik ve performans arasında ödünleşimler içerir.

## Simple structure — MS-DOS

MS-DOS, tarihsel olarak modüler sınırları yeterince ayrıştırılmamış basit yapı örneğidir. Bazı uygulamalar düşük seviyeli I/O rutinlerine erişebilir. Bu, koruma ve hata yalıtımını zayıflatır; bir programın hatası sistemi etkileyebilir.

## Monolithic structure — geleneksel UNIX

**Monolithic kernel**, dosya sistemi, bellek yönetimi, CPU scheduling, aygıt sürücüleri ve başka birçok işlevi kernel alanında, çoğunlukla aynı adres alanında yürütür. UNIX diyagramında kullanıcı ve shell'ler → sistem çağrısı arayüzü → kernel servisleri → donanım bulunur.

**Avantaj:** Kernel içi doğrudan çağrılarla düşük iletişim maliyeti. **Dezavantaj:** Büyük ve ayrıcalıklı kod tabanında hataların yalıtılması zorlaşabilir.

## Layered approach (katmanlı yaklaşım)

Layer 0 donanım; layer N kullanıcı arayüzü olarak çizilir. Her katman, yalnız altındaki katmanların işlevlerini kullanır. **Avantaj:** Modülerlik, bağımsız debugging/test/doğrulama. **Dezavantaj:** Katman sınırlarını doğru belirlemek güçtür ve katmanlar arası geçişler ek yük getirebilir. Her şeyi tek katmanda toplamak da doğru çözüm değildir; uygun ayrım önemlidir.

## Microkernel — Mach

**Microkernel**, gereksiz servisleri kernel'den user space'e taşır; kernel temel IPC, scheduling ve bellek hizmetlerinin çekirdeğini sürdürür. Servisler **message passing** ile haberleşebilir. Mach, dersin tarihsel örneğidir.

**Avantajlar:** Daha dar kernel güven sınırı, servis yalıtımı, genişletme kolaylığı. **Dezavantajlar:** Mesajlaşma ve context switching maliyeti; performans uygulama tasarımına bağlıdır.

## Karşılaştırma

| Yapı        | Örnek         | Güçlü yön                       | Zorluk                        |
| ----------- | ------------- | ------------------------------- | ----------------------------- |
| Simple      | MS-DOS        | Başlangıç basitliği             | Zayıf izolasyon               |
| Monolithic  | Original UNIX | Kernel içi hızlı doğrudan çağrı | Hata yalıtımı                 |
| Layered     | Katman 0..N   | Test ve doğrulama               | Katman sınırı / geçiş ek yükü |
| Microkernel | Mach          | Modülerlik/izolasyon            | IPC/context-switch maliyeti   |

**Öğretici ek:** Loadable kernel modules desteği, tek başına bir işletim sistemini microkernel yapmaz.
