## Simetrik şifreleme hangi sorunu çözer?

**Simetrik şifreleme (symmetric encryption)** aynı gizli anahtarı hem şifrelemede hem çözmede kullanır. Gönderen ve alıcı anahtarı önceden güvenli biçimde paylaşmalıdır. Bu yöntemler çok hızlı olduğu için disk, dosya, veri tabanı ve ağ trafiğinin büyük bölümünü korur. Anahtarın daha önce tanışmamış taraflara nasıl ulaştırılacağı ayrı bir problemdir; açık anahtarlı kriptografi bu dersin dışındaki sonraki haftada ele alınır.

## Blok ve akış şifreleri

Bir **blok şifresi (block cipher)** sabit uzunluktaki girdiyi aynı uzunlukta çıktıya dönüştürür. AES 128 bitlik bloklar işler. Uzun bir dosyada çok sayıda blok vardır; bunların nasıl bağlanacağını **çalışma modu (mode of operation)** belirler.

Bir **akış şifresi (stream cipher)** anahtar ve çoğunlukla benzersiz bir nonce kullanarak sözde rastgele bir **anahtar akışı (keystream)** üretir. Şifreleme `C = M ⊕ K`, çözme `M = C ⊕ K` biçimindedir; XOR’un kendisi ters işlemdir. Fakat aynı anahtar ve nonce tekrar kullanılırsa aynı K akışı oluşur. İki şifreli metnin XOR’u `M1 ⊕ M2` olur ve dil yapısı ya da bilinen bir mesaj parçası diğerini açığa çıkarabilir. Dolayısıyla nonce benzersizliği bir biçim kuralı değil, güvenlik koşuludur.

ChaCha20, 256 bit anahtar, 96 bit nonce ve sayaçtan 512 bitlik bloklar üretir. Çekirdeği 32 bitlik sözcüklerde toplama, döndürme ve XOR’dan (ARX) oluşur. Bir çeyrek tur dört sözcük arasında belirli sırada bu işlemleri uygular; toplam yirmi tur karıştırmayı güçlendirir. RC4’ün ilk çıktı baytlarındaki istatistiksel yanlılıklar eski WEP gibi kullanımları zayıflattı; RC4 artık güvenli tercih değildir. ChaCha20 hızlı ve özellikle donanım AES hızlandırması olmayan cihazlarda kullanışlıdır.

Akış şifresinin XOR yapısı **değiştirilebilirlik (malleability)** doğurur: saldırgan şifreli metindeki belirli biti değiştirdiğinde, çözülen metinde karşılık gelen biti öngörülebilir biçimde değişebilir. ChaCha20 bu yüzden tek başına bırakılmaz; Poly1305 ile birleştirilen ChaCha20-Poly1305, gizlilik ve doğrulamayı birlikte sunan bir AEAD yapısıdır.

## Feistel yapısı neden çözülür?

Feistel turunda `Lᵢ = Rᵢ₋₁`, `Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁,Kᵢ)` olur. Çıktının sol yarısı önceki sağ yarıyı doğrudan verir. Böylece F’nin girdisi ve çıktısı yeniden hesaplanır; XOR aynı terimle ikinci kez yapılarak önceki sol yarı elde edilir. F’nin tersinir olması gerekmez. Şifre çözme, tur anahtarlarını ters sırada uygular.

DES tarihsel bir Feistel şifresidir; 56 bit anahtarı kaba kuvvete karşı yetersiz kaldı. 3DES şifreleme ve çözmeyi üç aşamada kullansa da küçük 64 bit blok boyutunu korudu ve güncel sistemlerden çekildi. AES ise sonraki derste incelenecek SPN mimarisini kullanır.

## Sonuç

Simetrik şifreleme içerik gizliliği için hızlı ve etkilidir; ancak anahtar paylaşımı ve bütünlük ayrıca çözülmelidir. Akış şifrelerinde anahtar-nonce çiftini yinelememek gerekir. Şifreli veriyi yetkisiz değişime karşı korumak için MAC veya doğrulanmış şifreleme, yani AEAD kullanılır.
