> **Kaynak kapsamı:** 1.3 ve 1.3.1–1.3.3; `teori-1-1-42.pdf` fiziksel sayfa 21–25, basılı sayfa 10–14. Sayfa 21’deki önceki tarihçe ve sayfa 25’te başlayan 1.3.4 bu dersin kapsamında değildir. Aşağıdaki öğrenci sistemi örneği ve sayısal hesap, anlatımı açmak için yazar tarafından eklenmiştir.

## “Güvenli” derken hangi sonucu istiyoruz?

Bir üniversitenin not sistemini düşün. Başka öğrencilerin notunu herkes okuyabiliyorsa sorun var. Notları yalnızca doğru kişiler görüyor ama birisi değerleri gizlice değiştirebiliyorsa yine sorun var. Veriler doğru ve gizli olsa bile not itirazının son günü sisteme girilemiyorsa sistem görevini yapmıyor. Aynı uygulamayı üç farklı soruyla değerlendirdik: **kim okuyabilir, bilgiye güvenebilir miyiz, ihtiyaç anında kullanabilir miyiz?**

CIA üçlüsü bu sorulara ad verir: **Confidentiality — Gizlilik**, **Integrity — Bütünlük**, **Availability — Erişilebilirlik**. Kaynaktaki üçgenin ortasında bilgi varlığı, köşelerinde bu üç hedef vardır. Şeklin öğretici yanı, tek bir varlığı aynı anda üç açıdan düşünmeye zorlamasıdır. CIA bir saldırı listesi veya ürün adı değildir; hangi güvenlik sonucunu kaybettiğimizi açıklayan bir çerçevedir.

## Gizlilik: okuma hakkını sınırlandırmak

[Gizlilik](glossary:confidentiality), bilginin yalnızca erişim yetkisi olan öznelerce okunabilmesidir. “Özne” bir insan, uygulama veya başka bir sistem olabilir. Bir dosyanın gizlice kopyalanması orijinali bozmaz; bu nedenle uygulamanın düzgün çalışması, sızıntı olmadığına kanıt değildir.

Kaynak üç mekanizma grubunu birlikte ele alır. **Şifreleme**, anahtarı olmayanın içeriği anlamasını engellemeyi amaçlar. Diskte saklanan veriye _at rest_, ağda taşınan veriye _in transit_ denir. İkisi farklı koruma noktalarıdır: ağ bağlantısını TLS ile korumak, diskteki dosyaların da şifreli olduğunu söylemez. **Erişim kontrolü**, dosya izinleri, veritabanı rolleri ve ağ kurallarıyla kimlerin erişebileceğini sınırlar. **Sınıflandırma ve maskeleme**, hangi verinin ne kadar hassas olduğunu belirler ve gerektiğinden fazlasını göstermemeyi sağlar; kartın yalnızca son dört hanesini göstermek buna örnektir.

Bu kontroller birbirinin yerine geçmez. Şifreli bir veritabanını uygulama açabiliyorsa, uygulamanın gereğinden fazla yetki vermesi gizlilik ihlaline yol açabilir. Kaynak; şifrelenmemiş trafiğin dinlenmesini, zamanlama veya güç tüketimi gibi yan kanallardan sır öğrenilmesini, yanlışlıkla herkese açık bırakılmış bulut deposunu ve aşırı çalışan yetkilerini farklı sızıntı yolları olarak verir. Ortak sonuç, yetkisiz kişinin bilgi öğrenmesidir.

## Bütünlük: değişikliği önlemek ve fark etmek

[Bütünlük](glossary:integrity), bilginin yetkisiz veya beklenmeyen biçimde değiştirilmemesini, değişirse bunun saptanabilmesini hedefler. Herkese açık bir yazılım güncellemesinin gizli olması gerekmez; fakat doğru güncelleme olması gerekir. Gizlilik ile bütünlüğün ayrı hedefler olmasının nedeni budur.

Bir [karma fonksiyonu](glossary:hash-function), değişken uzunluktaki veriden sabit uzunlukta bir özet üretir. SHA-256 ile indirilen dosyanın özetini hesaplayıp **güvenilir bir yerden alınmış** beklenen özetle karşılaştırabiliriz. Dosya değiştiğinde özetin de değişmesi beklenir. Ancak saldırgan hem dosyayı hem karşılaştırma değerini değiştirebiliyorsa, iki değerin eşleşmesi güven oluşturmaz. Hash, tek başına göndericinin kimliğini doğrulamaz.

HMAC, paylaşılan bir gizli anahtarla mesaj bütünlüğünü ve anahtarı bilen bir taraftan geldiğini doğrulamayı sağlar. Dijital imza ise özel anahtarla üretilir, karşılık gelen açık anahtarla denetlenir. **Yazar açıklaması:** HMAC, aynı anahtarı bilen iki kişiden hangisinin mesajı ürettiğini üçüncü kişiye kanıtlamaz. İmzanın güvenilirliği de doğru açık anahtara güvenmeye ve özel anahtarın korunmasına bağlıdır. “Kriptografi var” demek bu koşulları ortadan kaldırmaz; bu ayrım [kimlik ve hesap verebilirlik](topic:identity-access-accountability) dersinde açılır.

Bütünlük yalnızca saldırganla ilgili değildir. Kaynak; havaledeki alıcı hesabının değiştirilmesini, bir pakete arka kapı eklenmesini, sınav notlarının kurcalanmasını ve donanım hatasıyla oluşan _bit rot_ durumunu örnekler. Sürüm kontrolü, değişikliklerin izlenmesini; WORM depolama (_write once, read many_), yazılmış kaydın değiştirilememesini destekler. SolarWinds örneğinin burada öğrettiği, meşru biçimde imzalanmış bir paketin bile üretim zincirinde zararlı hâle getirilmiş olabileceğidir. İmza, içeriğin zararsızlığını kendi başına garanti etmez.

## Erişilebilirlik: yetkili kişi ihtiyaç anında kullanabiliyor mu?

[Erişilebilirlik](glossary:availability), bilgi ve hizmetin gerektiğinde yetkili kullanıcıya sunulabilmesidir. Kaynaktaki veri merkezi fotoğrafının çevresindeki açıklama; birden çok sunucu, coğrafi dağıtım ve düzenli yedeklerin bu hedefe katkısını vurgular. Amaç yalnızca “sunucu açık” demek değildir; hizmet gerçekten kullanılabilir olmalıdır.

Kazara kesintilere donanım arızası, yazılım hatası, elektrik kesintisi, insan hatası ve doğal afetler neden olabilir. Yedeklilik, yük dengeleme, farklı konumlara dağıtım ve yedekleme, farklı arıza türlerine karşı çalışır. Tek bir bileşenin arızalanması tüm hizmeti durduruyorsa o bileşen bir **tek nokta arızasıdır** (_single point of failure_).

Kasıtlı kesintide DoS, hizmeti gerçek kullanıcılara yanıt veremez hâle getirmeyi amaçlar. DDoS, saldırının çok sayıda kaynaktan dağıtık gelmesidir. Her DoS yüksek trafik hacmi gerektirmez: az sayıda çok pahalı sorgu da işlem kaynaklarını tüketebilir. Kaynak ayrıca bant genişliğinin doldurulmasını ve randevu kontenjanlarının otomatik tüketilmesini örnekler. Hız sınırlama ve DDoS koruması, yedekliliği tamamlayan kontrollerdir.

Fidye yazılımının veriyi şifrelemesi erişilebilirliği hedef alır. Bu, şifrelemenin kendiliğinden “güvenlik” anlamına gelmediğini gösterir: anahtar yetkili kullanıcıda değilse veri ona kapalıdır. Veriyi ayrıca çalıp yayımlamakla tehdit eden çifte şantaj, gizliliği de hedefler. Yedekten dönmek, çalınmış kopyayı geri almaz.

### Yüzdelerin arkasındaki zaman

Kaynak, %99,999 erişilebilirliğin yılda yaklaşık beş dakika; %99,9’un yaklaşık sekiz buçuk saat kesintiye karşılık geldiğini belirtir. **Ek hesap açıklaması:** 365 günlük yıl ve toplam zamanın payda olduğu varsayımıyla `kesinti = 525 600 dakika × (1 − erişilebilirlik oranı)`. Böylece %99,999 için yaklaşık 5,26 dakika, %99,9 için 525,6 dakika, yani 8,76 saat çıkar. Kaynaktaki ikinci değer yuvarlaktır. Ölçüm penceresi ve planlı bakımın hesaba katılıp katılmadığı belirtilmeden bu yüzde tek başına yeterli değildir.

## Kontrolü hedefle eşleştirmek

| Hedef           | Kaynakta ele alınan mekanizmalar                                           | Tipik ihlal                                                    |
| --------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Gizlilik        | Durgun/hareketli veri şifreleme, erişim kontrolü, sınıflandırma, maskeleme | Sızıntı, dinleme, yan kanal                                    |
| Bütünlük        | Hash, HMAC, dijital imza, sürüm kontrolü, WORM                             | Kurcalama, araya girip değiştirme, tedarik zinciri enjeksiyonu |
| Erişilebilirlik | Yedeklilik, yük dengeleme, yedekleme, DDoS koruması, hız sınırlama         | DoS/DDoS, fidye yazılımı, kaynak tükenmesi                     |

Bir kontrol birden fazla hedefe katkı sağlayabilir. Aynı olay da birden fazla hedefi ihlal edebilir. Bu tabloyu tek seçimli bir sınıflandırma gibi kullanma.

Kaynağın son uyarısı bir tasarım sorusudur: bir kontrol hangi hedefi güçlendirirken hangisini zorlaştırıyor? Not sistemini tamamen çevrimdışı tutmak bazı sızıntı yollarını azaltabilir; öğrencinin notuna ulaşmasını da engeller. İyi karar, ihtiyaç ve riske göre denge kurar. Sonraki adım, bu hedefleri sağlayacak [kimlik ve yetki ayrımını](topic:identity-access-accountability) ve olayları anlatacağımız [temel güvenlik sözlüğünü](topic:security-core-vocabulary) anlamaktır.
