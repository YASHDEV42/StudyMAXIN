## Sabit uzunluklu parmak izi

**Kriptografik özet fonksiyonu (cryptographic hash function)** her boyuttaki girdiyi sabit uzunlukta bir özete dönüştürür. SHA-256 her girdi için 256 bit verir. Aynı girdi aynı özeti üretir; girdide küçük bir değişiklik çıktıyı öngörülemez biçimde değiştirir. Özetleme şifreleme değildir: anahtar kullanmaz ve özetten özgün veriyi geri elde etmeyi amaçlamaz.

## Üç güvenlik özelliği

- **Ön görüntü direnci (preimage resistance):** Verilen bir özet için onu üreten herhangi bir girdiyi bulmak hesaplama açısından zor olmalıdır.
- **İkinci ön görüntü direnci:** Belirli bir girdi varken onunla aynı özeti veren farklı bir girdi bulmak zor olmalıdır.
- **Çakışma direnci:** Aynı özeti veren herhangi iki farklı girdi bulmak zor olmalıdır.

Sonlu çıktı uzayında çakışmalar matematiksel olarak kaçınılmazdır. Güvenlik iddiası, saldırganın bunları pratikte bulamamasıdır.

## Doğum günü sınırı

n bitlik özet için çakışma araması yaklaşık `2^(n/2)` denemede başarı şansına ulaşır. Sebep, belirli bir özeti hedeflemek yerine herhangi iki denemenin eşleşmesinin yeterli olmasıdır; deneme çiftleri hızla çoğalır. Bu yüzden SHA-256’nın çakışma güvenliği yaklaşık 128 bit düzeyindedir. MD5 için teorik sınır 64 bit olsa da yapısal saldırılar onu çok daha kolay kırmıştır. SHA-1 için de gerçek çakışma gösterilmiştir.

## Merkle–Damgård, sünger ve uzunluk uzatma

SHA-2 ailesi Merkle–Damgård yapısındadır: girdi bloklara ayrılır, sıkıştırma fonksiyonu zincir durumunu günceller ve son durum özet olur. Uzunluk bilgisi padding’e eklenir. SHA-3 ise **sünger (sponge)** yapısında veriyi iç duruma emer, sonra çıktı üretir; farklı yapı uzunluk uzatma davranışını önler.

Naif `H(secret || message)` MAC’i Merkle–Damgård ailesinde tehlikeli olabilir. Özet, devam ettirilebilir son durumu açığa çıkarabilir. Saldırgan bilinen mesajın arkasına SHA padding’i ve ek veri koyarak, gizli öneki bilmeden geçerli bir genişletilmiş etiketi hesaplayabilir. HMAC bunu uygun iç içe anahtarlı karma yapısıyla çözer; bunun için bir sonraki başlıkta MAC ve HMAC’e bakılır.

SHA-256/SHA-512 ve SHA-3 genel amaçlı özet ve dosya parmak izi için yaygın seçimlerdir. MD5 ve SHA-1 güvenlik amacıyla kullanılmamalıdır. Ayrıca dosya özeti tek başına göndereni doğrulamaz: saldırgan dosyayla birlikte özeti de değiştirebiliyorsa güvenilir bir referans, MAC veya dijital imza gerekir. Parola saklamak da ayrı bir amaçtır; hızlı genel amaçlı özet yerine tuzlu, yavaş parola karma fonksiyonu gerekir.
