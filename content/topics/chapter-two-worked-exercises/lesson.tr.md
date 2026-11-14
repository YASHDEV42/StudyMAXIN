## Çalışma yöntemi

Her soruyu önce kendiniz çözün; sonra aşağıdaki adımlarla karşılaştırın. Kaynağın 2.11 bölümü 12 çözümlü örnek, dokuz öz sınav sorusu ve cevap anahtarı ile hafta özetini içerir. Bu not sonuçları yeniden öğretir; bölüm 2.10’un kuantum karşılaştırmasıyla ilişkisini de kurar.

## On iki çözümlü örneğin mantığı

1. **Sezar:** `VHODP` üç harf geri kaydırılır: `SELAM`. Küçük anahtar uzayı tüm kaydırmaları denemeyi mümkün kılar.
2. **OTP tekrar kullanımı:** `C₁⊕C₂=(M₁⊕K)⊕(M₂⊕K)=M₁⊕M₂`. Anahtar birbirini götürür; aynı OTP anahtarı tekrar edilmez.
3. **Mesajlaşma kipi:** Gizlilik ve değiştirmeyi reddetme için AES-GCM veya ChaCha20-Poly1305 gibi AEAD; her mesajda benzersiz nonce. ECB örüntüyü sızdırır, yalın CTR/CBC bütünlük sağlamaz.
4. **Parola saklama:** SHA-256 hızlıdır; saltsız eşit parolalar eşit özet verir. Benzersiz salt + yavaş/bellek maliyetli Argon2id kullanılır.
5. **Özet çakışması:** n bit çıktı için yaklaşık `2^(n/2)` arama gerekir. SHA-256 yaklaşık 128 bit çakışma payı; MD5 yapısal saldırılarla kırılmıştır.
6. **GF(2⁸) çarpımı:** `0x13=0x01⊕0x02⊕0x10`. `0x57·0x02=0xAE`, `0x57·0x10=0x07`; sonuç `0x57⊕0xAE⊕0x07=0xFE`.
7. **Feistel’i çözme:** `Lᵢ=Rᵢ₋₁` önceki sağ yarıyı verir; `Lᵢ₋₁=Rᵢ⊕F(Lᵢ,Kᵢ)`. F’yi ters çevirmek gerekmez.
8. **CBC bit hatası:** `Cᵢ` bozulursa `Pᵢ` AES ters dönüşümü nedeniyle bütünüyle bozulur; `Pᵢ₊₁` içinde aynı konumdaki bit çevrilir. Bu nedenle CBC’ye MAC gerekir.
9. **GCM nonce tekrarı:** aynı akış iki kez kullanılır; şifreli metinlerin XOR’u açık metinlerin XOR’unu verir. GCM doğrulaması da tehlikeye girebilir.
10. **Doğum günü sayıları:** 128 bit rastgele değerlerde eşleşme ölçeği yaklaşık `2^64`; 32 bit özet için yaklaşık `2^16=65.536` deneme. 32 bit parmak izi güçlü bütünlük sağlamaz.
11. **HMAC:** `SHA256(secret‖message)` length extension’a açık olabilir. HMAC-SHA256 iç içe karma ile bunu önler.
12. **Argon2id ayarı:** bellek, zaman ve paralellik parametreleri gerçek donanımda kalibre edilir. Meşru doğrulama makul kalırken her parola tahmininin pahalı olması hedeflenir.

## Öz sınav ve kısa yanıtlar

Kerckhoffs ilkesi, OTP’nin pratik sınırı, saldırgan modellerinin gücü, ECB örüntü sızıntısı, GCM’in CTR’ye katkısı, hash çakışma hesabı, HMAC’in length extension’a yanıtı, parola saklama ve Grover/Shor farkını açıklayın. Temel yanıtlar: algoritma açık olabilir, anahtar gizli kalır; OTP anahtarı mesaj kadar uzun, rastgele ve tek kullanımlık olmalıdır; seçilmiş açık metin saldırgana denetimli örnekler verir; ECB eş blokları eş şifreler; GCM etiketi değişikliği yakalar; n bit hash yaklaşık n/2 bit çakışma direnci verir; HMAC anahtarlı iç/dış yapıdır; parola için salt ve yavaş fonksiyon gerekir; Grover simetrik aramayı hızlandırır, Shor RSA/DH/ECC matematiğini tehdit eder.

## Hesapları bağlamında değerlendirin

Kaynağın nonce örneğindeki yaklaşık değerler uzunluğa ve mesaj sayısına bağlıdır; belirli bir sayıyı tüm uygulamalar için genel güvenlik garantisi saymayın. Argon2id kodundaki parametreler de örnektir; güncel kütüphane ve gerçek donanıma göre ayarlanmalıdır. Kaynak fiziksel sayfa 11’de hafta özetini bitirir; sayfa 12 yeni 3. hafta bölüm ayıracıdır ve bu kapsamın dışındadır.
