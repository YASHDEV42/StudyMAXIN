## AES’in yeri

**AES (Advanced Encryption Standard / Gelişmiş Şifreleme Standardı)**, 128 bitlik bloklarla çalışan bir blok şifresidir. Anahtar uzunluğu 128, 192 veya 256 bit olabilir; tur sayısı sırasıyla 10, 12 ve 14’tür. AES bir çalışma modu değildir: tek bloğu dönüştürür; çok bloklu veride güvenliği doğru mod belirler.

## Durum tablosu ve bayt cebiri

Girdi 16 bayttır ve sütun öncelikli 4×4 **durum (state)** tablosuna yerleştirilir. AES’in aritmetiği baytları GF(2⁸) alanının elemanları gibi işler. Toplama XOR’dur; çarpma polinom aritmetiği ve indirgeme polinomu `x⁸+x⁴+x³+x+1` (hex 0x11B) ile yapılır. `xtime` bir baytı x ile çarpmayı, gerekirse polinoma göre indirgemeyi ifade eder. Bu yapı, baytlar üzerinde terslenebilir ve iyi analiz edilmiş dönüşümler kurmaya yarar.

## Dört adım: karışıklık ve yayılma

AES-128 önce başlangıç anahtarını durumla XOR’lar. Ardından dokuz tam turda:

1. **SubBytes:** Her bayt, doğrusal olmayan S-box eşlemesiyle değiştirilir. S-box, GF(2⁸)’de çarpımsal ters ve ardından afin dönüşüm fikrine dayanır. Örneğin `0x53` baytı `0xED` olur. Bu doğrusal olmayan adım cebirsel ilişkiyi karmaşıklaştırır.
2. **ShiftRows:** Dört satır sırasıyla 0, 1, 2 ve 3 bayt sola döngüsel kaydırılır. Değerler değişmez; konumlar değişir ve farklı sütunlardan gelen baytlar yan yana taşınır.
3. **MixColumns:** Her sütun GF(2⁸)’de sabit bir matrisle çarpılır. Toplamalar XOR, katsayı çarpmaları alan çarpımıdır. Kaynak örneğinde `(D4,BF,5D,30)` sütunu `(04,66,81,E5)` olur. Tek bayt farkı sütunun dört çıktısına yayılır.
4. **AddRoundKey:** Durum, tur anahtarıyla XOR’lanır. Anahtarın dönüşüme girdiği adımdır.

Onuncu ve son turda MixColumns uygulanmaz. Şifre çözme ters S-box, ters satır kaydırma ve ters sütun dönüşümünü ters sırayla uygular; XOR yine kendi tersidir.

## Anahtar genişletme

AES-128’in 16 bayt anahtarı dört 32 bit sözcükten oluşur. **Anahtar genişletme (key schedule)** toplam 44 sözcük, yani başlangıç dahil 11 tur anahtarı üretir. Genel adım önceki sözcük ile dört önceki sözcüğün XOR’udur; her dördüncü sözcükte `RotWord`, `SubWord` ve tura bağlı `Rcon` eklenir. Bu doğrusal olmayan dönüşüm turların anahtar ilişkilerini çeşitlendirir. Tur anahtarları da sır olduğundan korunmalıdır.

## Güvenlik ve kullanım

Bir girdi bitindeki değişiklik birkaç tur içinde çıktının yaklaşık yarısını etkiler; bu **çığ etkisi (avalanche effect)** olarak bilinir. AES’in açık olması Kerckhoffs ilkesiyle uyumludur: gizli kalması gereken algoritma değil anahtardır. AES donanım komutlarıyla hızlı çalışır. Ancak sağlam AES, yanlış mod veya tekrar kullanılan nonce yüzünden güvensiz kullanımı kurtaramaz. 3DES gibi eski şifrelerin küçük blok sınırları da ayrı risk doğurur.

## مصطلحات تركية وملاحظة المصدر

المصطلحات التركية: durum (حالة AES)، sonlu alan (حقل منتهٍ)، yerine koyma kutusu / S-kutusu (صندوق الاستبدال)، satır kaydırma (إزاحة الصفوف)، sütun karıştırma (خلط الأعمدة)، anahtar genişletme (توسيع المفتاح)، çığ etkisi (تأثير الانهيار).

الحسابات والتمثيل اللفظي للمصفوفات شروح تعليمية مشتقة من أمثلة المصدر؛ لم تُنسخ صور المصدر.
