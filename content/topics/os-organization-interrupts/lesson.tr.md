## Bilgisayar-sistem organizasyonu

Genel amaçlı bilgisayarlar CPU, ana bellek ve ortak **bus (veri yolu)** üzerinden bağlanan aygıt denetleyicilerinden oluşur. **Device controller (aygıt denetleyicisi)** bir aygıt türünü yönetir; **device driver (aygıt sürücüsü)** işletim sistemiyle denetleyici arasındaki yazılım arayüzüdür. Yerel arabellekler geçici veri saklar. CPU ve denetleyiciler eşzamanlı çalışabilir ve belleğe erişimde yarışabilir.

## Bilgisayar açılışı

**Bootstrap programı** donanımı başlatır, kernel'i bulur ve ana belleğe yükler. Başlangıç kodu firmware içinde saklanır; ders slaytları ROM/EPROM/EEPROM örneklerini verir. Kernel başlatıldıktan sonra sistem programları ve daemon'lar devreye girer.

## Interrupt handling

İşletim sistemi olaylara kesmeler üzerinden yanıt verir. I/O tamamlandığında denetleyici CPU'ya **interrupt (kesme)** ile haber verebilir. CPU gerekli yürütme durumunu korur, **interrupt vector** yardımıyla uygun **ISR (Interrupt Service Routine)** adresini belirler ve hizmet rutinini çalıştırır. Sonrasında kesilen görevin yürütmesine uygun şekilde dönülebilir.

**Trap / exception**, yazılım isteği veya komutun yürütülmesinden kaynaklanan istisnai olayları kapsar. Sıfıra bölme ve geçersiz bellek erişimi örneklerdir. Donanım kesmesiyle aynı kökenden gelmek zorunda değildir.

**Öğretici ek:** Klavye girişi gibi bir olayda CPU'nun aygıtı sürekli sorgulaması yerine kesme mekanizmasının kullanılması gereksiz beklemeyi azaltabilir.
