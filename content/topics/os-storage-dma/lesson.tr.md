## Ana bellek ve kalıcı depolama
CPU, program komutlarını çalıştırabilmek için bunların bellekte bulunmasına ihtiyaç duyar. **RAM (ana bellek)** rastgele erişimli ve genellikle **volatile (uçucu)** depolamadır; elektrik kesildiğinde içeriği kaybolur. Kapasitesi sınırlıdır. **Secondary storage (ikincil depolama)** ise HDD ve SSD gibi kalıcı veri saklama aygıtlarını kapsar.

**Von Neumann mimarisinde** komutlar ve veriler bellekte tutulur; işlemci komutu getirir (**fetch**), çözümler (**decode**) ve yürütür (**execute**). Register'lar işlemci içindeki hızlı saklama alanlarıdır.

## Depolama hiyerarşisi
Genel sıralama: **Registers → Cache → RAM → SSD/HDD → Optical Disk → Magnetic Tape**. Üst seviyelerde erişim hızı ve bit başına maliyet genellikle artar, toplam kapasite azalır.

**Caching (önbelleğe alma)**, sık gereken bilginin daha hızlı bir depolama seviyesine kopyalanmasıdır. Önce önbellek kontrol edilir: veri varsa hızlı okunur; yoksa alt seviyeden getirilir. RAM, ikincil depolamanın önbelleği olarak da düşünülebilir.

## I/O ve Direct Memory Access
I/O tamamlanana kadar bekleyen ve tamamlanmadan yürütmeye dönebilen işlem biçimleri vardır. **System call**, kullanıcı programının OS hizmeti istemesini sağlar. **DMA**, aygıtla ana bellek arasında blok veri aktarımını, CPU'nun her veri birimini ayrı ayrı kopyalamasını gerektirmeden sağlar. Aygıt denetleyicisi buffer, adres ve sayaç bilgileriyle çalışır; iş bitince kesmeyle haber verebilir. CPU bu sırada başka işler yapabilir.

**Öğretici ek:** Büyük blokların aktarımında DMA, byte başına yoğun CPU katılımının doğuracağı ek yükü azaltır.
