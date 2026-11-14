## AES neyi şifreler?

**AES (Advanced Encryption Standard)** 128 bitlik bir bloğu işler. Anahtarı 128, 192 veya 256 bit olabilir; buna göre 10, 12 veya 14 tur uygulanır. AES tek başına uzun dosya şifreleme formatı değildir; blokları güvenli biçimde bağlamak için ayrıca bir çalışma modu gerekir.

## Baytların düzeni ve GF(2⁸)

16 giriş baytı sütun sütun 4×4 **durum (state)** tablosuna yerleştirilir. Bayt işlemleri sonlu alan GF(2⁸) üzerinde tanımlıdır: toplama XOR, çarpma ise indirgeme polinomu `0x11B` kullanılarak yapılan polinom çarpımıdır. Örneğin `xtime`, baytı bir basamak sola kaydırıp taşma varsa indirgeme uygular. Bu cebir, AES’in dönüşümlerini hem hesaplanabilir hem de kontrollü biçimde tersinir kılar.

## AES turu

Başlangıçta durum, ilk tur anahtarıyla XOR’lanır. AES-128’in dokuz tam turu dört adımdan oluşur:

- **SubBytes:** Her bayt doğrusal olmayan S-box ile değiştirilir. S-box, alan içindeki çarpımsal ters ve afin dönüşümle tanımlanır; `0x53 → 0xED` örneği bu eşlemeyi gösterir. Doğrusal olmama, basit denklem ilişkilerini bozar.
- **ShiftRows:** Satırlar sırasıyla 0, 1, 2 ve 3 bayt sola döndürülür. Bu, baytları sütunlar arasında dağıtır.
- **MixColumns:** Her sütun, GF(2⁸) üzerinde sabit bir matrisle çarpılır. Kaynak vektörü `(D4,BF,5D,30)` bu adım sonunda `(04,66,81,E5)` olur. Bir bayttaki fark sütun boyunca yayılır.
- **AddRoundKey:** Durum ilgili tur anahtarıyla XOR’lanır; gizli anahtarın dönüşüme katıldığı adımdır.

Son turda MixColumns yoktur. Çözme, bu işlemlerin terslerini ters sırada uygular; AddRoundKey değişmeden kalır, çünkü XOR kendi tersidir.

## Tur anahtarı nereden gelir?

AES-128 için dört başlangıç sözcüğü genişletilerek toplam 44 adet 32 bit sözcük üretilir. Her dördü bir tur anahtarıdır: başlangıç anahtarı ve on tur anahtarı. Normal adım `wᵢ = wᵢ₋₁ ⊕ wᵢ₋₄` biçimindedir. Her yeni turun ilk sözcüğünde önceki sözcüğe `RotWord`, S-box üzerinden `SubWord` ve `Rcon` sabiti uygulanır. Böylece tur anahtarları tek bir anahtarın kopyaları olmaz. Bir tur anahtarı sızarsa ana anahtarla ilişkisi bulunduğundan, o da hassas sırdır.

## AES güvenli, uygulama yine de önemli

Turların bileşimi bir bit değişikliğini yayarak çıktının yaklaşık yarısını değiştirebilir; buna **çığ etkisi (avalanche effect)** denir. AES’in geniş incelenmiş olması ve donanım hızlandırması, onu yaygın kılar. Açık algoritma güvenlikle çelişmez; koruma gizli anahtara dayanır. Buna rağmen ECB gibi güvensiz kip, nonce tekrarı veya doğrulama eksikliği güvenli blok şifresini yanlış kullanıma dönüştürebilir.
