## Çalışma modu neden önemlidir?

AES tek bir 128 bit bloğu dönüştürür. Daha uzun verinin blokları nasıl işleyeceğini **çalışma modu (mode of operation)** belirler. Güçlü bir algoritma, yanlış kip seçimini telafi etmez.

## ECB örüntüyü korur

**ECB (Electronic Codebook)** her bloğu bağımsız şifreler. Aynı açık metin bloğu aynı anahtar altında aynı şifreli bloğa dönüşür. Tekrarlanan içerik böylece görünür kalır. ECB ile şifrelenen Tux görselinde renkler değişse de penguenin ana hatlarının seçilmesi bu sızıntıyı gösterir. ECB gerçek veride kullanılmamalıdır.

## CBC zincirleme yapar, fakat doğrulamaz

**CBC (Cipher Block Chaining)** için `Cᵢ=Eₖ(Pᵢ⊕Cᵢ₋₁)` ve ilk blokta `C₀=IV` olur. Çözme `Pᵢ=Dₖ(Cᵢ)⊕Cᵢ₋₁` biçimindedir. Önceki şifreli blokla zincirleme, aynı açık bloğun farklı bağlamlarda farklılaşmasını sağlar. İlk blok için **başlatma vektörü (IV)** gerekir. IV gizli olmak zorunda değildir; ancak kipin güvenlik koşullarına uygun, taze ve öngörülemez olmalıdır. CBC blok boyuna tamamlamak için padding ister ve şifreleme sıralıdır. Padding hatalarını farklı biçimde bildiren sistemler **padding oracle** oluşturabilir. CBC kendi başına bütünlük sağlamaz; güvenli bir MAC düzeni gerekir.

## CTR sayaçtan akış üretir

**CTR (Counter mode)** her blokta nonce ile sayaç değerini AES’ten geçirir, sonucu açık metinle XOR’lar. Şifrelenen şey sayaçtır. Bloklar bağımsız olduğundan paralel işlenebilir, padding gerekmez ve rastgele erişim mümkündür. Bunun bedeli katı bir nonce kuralıdır: aynı anahtar altında sayaç girdisi tekrarlanırsa anahtar akışı da tekrar eder ve `C₁⊕C₂=P₁⊕P₂` olur. Ayrıca saldırgan CTR şifreli metninde bit çevirerek çözülen metni etkileyebilir; CTR gizlilik sağlar, doğrulama sağlamaz.

## AEAD/GCM doğrulanmış şifreleme

**AEAD (Authenticated Encryption with Associated Data)** gizlilikle birlikte şifreli metnin ve seçilen açık bağlamın bütünlüğünü doğrular. **AES-GCM**, CTR şifrelemesini GF(2¹²⁸) üzerinde GHASH etiketiyle birleştirir. Örneğin paket başlığı şifrelenmeden kalabilir, fakat associated data olarak etikete bağlanıp değişiklikte reddedilebilir. Alıcı etiketi doğrulamadan veriyi kabul etmemelidir. ChaCha20-Poly1305 de yaygın bir AEAD seçeneğidir.

GCM’de aynı anahtarla nonce tekrarı en kritik uygulama hatalarındandır: gizlilik sızıntısına ek olarak doğrulama yapısını da zayıflatabilir. Kitap örneğinde 96 bit nonce kullanılır; gerçek uygulamada doğrulanmış kütüphanenin API’sini izleyin. Anahtar, nonce ve associated data çözme sırasında doğru eşleşmeli; doğrulama başarısızsa veri reddedilmelidir.
