## Neden parola özeti tek başına yetmez?

Parolayı düz metin saklamak veri tabanı sızıntısında parolaları açığa çıkarır. `SHA-256(parola)` saklamak daha iyi görünür; fakat SHA-256 dosya özeti için hızlı tasarlanmıştır. Saldırgan ele geçirdiği özete karşı GPU ile çok sayıda parola tahmini deneyebilir. Tuz kullanılmazsa aynı parola aynı özeti verir ve önceden hesaplanmış gökkuşağı tabloları işe yarar.

## Salt ve pepper

**Salt (tuz)** her parola için üretilen benzersiz rastgele değerdir; gizli değildir ve özetle birlikte saklanır. Fonksiyon parolayı bu tuzla işler. Aynı parolayı seçen iki kullanıcı artık farklı özetlere sahip olur; saldırgan her tuz için yeniden hesaplama yapmak zorunda kalır. Tuz, tahmin başına maliyeti artırmaz.

**Pepper (biber)** veri tabanından ayrı tutulan ek bir sırdır. Veri tabanı tek başına sızdığında ek koruma sunabilir; fakat ayrı sır yönetimi gerekir ve tuzun veya parola karma fonksiyonunun yerini tutmaz.

## Parolaya özgü yavaş fonksiyonlar

Parola karma fonksiyonları saldırganın her tahminini özellikle pahalı yapar. PBKDF2, HMAC’i yineleyerek ağırlıklı olarak CPU maliyeti oluşturur. bcrypt maliyeti `2^cost` yönünde artırır ve 72 bayt giriş sınırına sahiptir. scrypt ve Argon2 bellek kullanımını da artırarak GPU/ASIC paralelliğini pahalılaştırır. **Argon2id**, veri bağımsız ve veri bağımlı bellek erişimi yaklaşımlarını dengeler; bellek, zaman ve paralellik parametrelerini ayarlamaya izin verir.

Kayıt çoğunlukla algoritma tanımlayıcısını, parametreleri, rastgele tuzu ve sonucu içerir. Böylece doğrulamada aynı ayarlarla yeniden hesap yapılır ve daha sonra parametre yükseltilebilir. Kütüphaneler genellikle salt üretimini ve doğrulamayı kendileri yönetir; ham hash’i elle kurmayın.

Maliyet, gerçek sunucuda meşru giriş için kabul edilebilir bir gecikme yaratacak şekilde ölçülür ve donanım geliştikçe güncellenir. Kaynaktaki örnek `19 MiB`, iki zaman turu ve tek paralellik ayarıdır; her sistem için değişmez öneri değildir. Güncel kütüphane yönergelerine göre kalibre edin.

## Uygulama ilkesi

Parolaları doğrudan MD5 veya SHA-256 ile saklamayın. Benzersiz salt ve uygun maliyetli Argon2id gibi parola karması kullanın. Bu tasarım veri tabanı sızıntısının etkisini azaltır, ancak zayıf parolayı güçlü yapmaz; ek giriş korumaları da gerekir.
