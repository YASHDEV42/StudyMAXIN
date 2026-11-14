## Neden ECC?

RSA ve klasik sonlu alan DH’de belirli güvenlik düzeylerine çıkmak için büyük anahtarlar gerekir. **Eliptik eğri kriptografisi (ECC)**, başka bir matematiksel probleme dayanarak benzer güvenlik düzeylerini daha kısa anahtarlarla sağlayabilir. Küçük anahtar; daha az veri aktarımı, depolama, hesaplama ve pil tüketimi demektir. Kaynak tablosunda 128 bit güvenlik için 256 bit ECC ile 3072 bit RSA eşleştirilir; bunlar yaklaşık güvenlik eşdeğerlikleridir, birebir garanti değildir.

## Nokta toplama ve ECDLP

Eliptik eğri çoğunlukla `y²=x³+ax+b` biçiminde anlatılır. Kriptografik uygulama gerçek düzlem çizimiyle değil, sonlu alan üzerinde çalışır. Geometrik sezgide iki noktadan geçen doğru eğriyi üçüncü kez keser; o kesişim x eksenine göre yansıtılarak iki noktanın toplamı elde edilir. Aynı noktayı toplarken doğrunun yerini teğet alır. Sonlu alanda “bölme”, modüler çarpımsal tersi almaktır.

Bir üreteç noktasını `k` kez toplamak `Q=kG` **skaler çarpımıdır**; ikiye katla ve topla yöntemiyle hızlı hesaplanır. Ancak `G` ve `Q` verildiğinde `k`’yı bulmak **eliptik eğri ayrık logaritma problemi (ECDLP)**dir ve güvenli eğri/parametrelerde pratikte zordur.

Kaynağın oyuncak örneğinde eğri `y²=x³+2x+2 (mod17)`, `P=(5,1)`. Nokta ikiye katlanırken eğim `λ=(3·5²+2)·(2·1)⁻¹ mod17=13` çıkar. Koordinat formülleri `2P=(6,3)` verir. Kontrol için `3²≡6³+2·6+2≡9 (mod17)`. Bu, sonlu alan nokta hesabını gösterir; güvenli anahtar değildir.

## ECDH, X25519 ve ileri gizlilik

**ECDH**, DH fikrini eğri grubuna taşır: Alice `aG`, Bob `bG` yayımlar; Alice `a(bG)`, Bob `b(aG)` hesaplayarak aynı `abG` ortak sırrına ulaşır. **ECDHE** oturum başına yeni özel değer kullanır; bunlar oturum sonunda atılırsa ileri gizlilik sağlar. **X25519**, Curve25519 tabanlı anahtar değişimi seçeneğidir. Eğri tabanlı imza için kullanılan **Ed25519** ile aynı şey değildir.

## ECDSA nonce hatası

**ECDSA**, eliptik eğri tabanlı imza şemasıdır. Her imza için gizli ve benzersiz bir `k` nonce’u gerekir. Aynı `k` iki imzada yeniden kullanılırsa, imza denklemleri arasındaki fark `k`’yı ve ardından özel anahtarı açığa çıkarabilir. Kaynak, PlayStation 3’ün sabit nonce kullanımıyla imza anahtarının elde edilmesi vakasını anlatır. **Ed25519**, nonce’u mesaj ve özel anahtardan belirlenimci biçimde türeterek kötü RNG kaynaklı bu hata sınıfını önler. Bununla birlikte uygulamada yine güvenilir kütüphane ve doğru protokol gerekir.

> **Ek açıklama:** Eğri çizimi sezgisel anlatımdır; gerçek hesap sonlu alanda yapılır. Kaynaktaki anahtar boyu eşleştirmeleri yaklaşık değerlerdir ve tek başına güncel üretim parametresi seçimi değildir.
