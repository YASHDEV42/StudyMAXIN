## Simetrik şifrelemenin çözemediği soru

AES gibi simetrik şifreler veriyi hızlı korur; ancak gönderen ve alıcı aynı gizli anahtara sahip olmalıdır. Bu anahtarı dinlenebilen bir ağdan göndermek, korumanın kendisini saldırgana vermektir. **Anahtar dağıtım problemi**, önceden ortak sır paylaşmamış tarafların açık bir kanal üzerinden nasıl güvenli anahtar kuracağını sorar.

Sorun kullanıcı sayısıyla büyür. Her kişinin diğer her kişiyle ayrı anahtarı varsa gereken anahtar sayısı `n(n−1)/2` olur: 10 kişi için 45, 1000 kişi için 499.500. Açık anahtarlı yaklaşımda herkes bir açık ve bir özel anahtara sahiptir; toplam anahtar sayısı `2n` ölçeğindedir. Açık anahtarlı kriptografi güven yönetimini bütünüyle ortadan kaldırmaz; fakat her çift arasında önceden gizli anahtar kurma zorunluluğunu kaldırır.

## Merkle’den tek yönlü fonksiyona

Merkle’nin bilmeceleri, iki tarafın açık kanalda ortak sır bulurken dinleyenin daha fazla hesaplama yapmasını sağlayan erken bir fikirdi. Alıcı bir bilmeceyi çözer; dinleyenin hangisinin seçildiğini bulmak için daha fazla bilmeceyi çözmesi gerekir. Kaynak bu avantajı yaklaşık karesel fark olarak açıklar. Yeterli pratik güvenlik sağlamasa da hesaplama maliyetiyle taraflar arasında asimetri kurma fikrini gösterdi.

Kaynağın tarih çizelgesi, GCHQ içindeki gizli çalışmaları da açık akademik yayınlardan ayırır: Ellis’in 1970’teki fikri, Cocks’un 1973’te bulduğu RSA benzeri şema ve Williamson’ın 1974’te bulduğu DH benzeri değişim daha sonra açıklanmıştır. Çizelge bunları DH, RSA, ECC, PGP, Shor, TLS ve post-kuantum standartlarına bağlar.

**Tek yönlü fonksiyon (one-way function)** ileri yönde kolay hesaplanır, fakat çıktısından girdiyi bulmak pratikte zordur. **Tuzak kapılı fonksiyon (trapdoor function)**, belirli bir gizli bilgiye sahip olana ters işlemi kolaylaştırır. RSA’da asal çarpanlar bu gizli kapıdır. Açık anahtar mesajı kilitlemek için dağıtılabilir; özel anahtar çözme yetkisini tutar. Dijital imzada özel anahtar imzalar, açık anahtar imzayı doğrular.

## Modüler aritmetik ve ayrık logaritma

**Modüler aritmetik**, sayıların bir modüle bölümünden kalanlarla işlem yapar. Saat örneğinde `10+5 ≡ 3 (mod 12)`; çünkü 12’yi geçince sayım başa döner. Kriptografide modül çoğunlukla çok büyük asal veya başka bir uygun cebirsel yapıdır. Mod almak sayıları sınırlı tutar.

`gˣ mod p` hesaplamak, üs binlerce bit olsa da **kare al ve çarp** ile verimli yapılır: üs ikilik gösterimde okunur, her adımda taban karelenir ve ilgili bit 1 ise sonuçla çarpılır; her işlemde mod alınır. Buna karşılık `g`, `p` ve `gˣ mod p` verildiğinde `x`’i bulmak **ayrık logaritma problemi**dir. Kaynağın oyuncak örneğinde `5ˣ ≡ 8 (mod 23)` deneme listesiyle `x=6` verir; büyük, güvenli parametrelerde aynı listeleme yaklaşımı uygulanabilir değildir. Bu tek yönlü davranış DH’nin ve klasik ECC’nin dayanaklarından biridir. RSA ise çarpanlara ayırma zorluğuna dayanır.

> **Pedagojik not:** Saat ve küçük sayı örnekleri sezgi içindir; güvenli protokol parametresi değildir. Gerçek uygulamada standartlaştırılmış grup ve kütüphaneler kullanılır.
