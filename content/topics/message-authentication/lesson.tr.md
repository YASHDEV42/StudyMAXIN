## Şifreleme neden mesaj doğrulama değildir?

Şifreleme içeriği gizler; alıcının verinin değişmediğini veya yetkili bir taraftan geldiğini tek başına kanıtlamaz. **Mesaj doğrulama kodu (MAC)**, gizli ve paylaşılan anahtar ile mesajdan etiket üretir. Alıcı aynı anahtarla etiketi yeniden hesaplar; eşleşme yoksa mesajı reddeder. MAC, aynı sırrı bilen taraflar arasında bütünlük ve köken doğrulaması sağlar. İki taraf da etiket üretebildiği için dijital imza gibi inkâr edilemezlik sağlamaz.

## HMAC’in yapısı

**HMAC**, standart bir hash fonksiyonunu anahtarlı biçimde kullanır: `H((K ⊕ opad) || H((K ⊕ ipad) || m))`. İç hash anahtarın iç dolgusuyla mesajı işler; dış hash anahtarın dış dolgusu ile iç sonucu yeniden işler. Böylece Merkle–Damgård hash’inin devam ettirilebilir durumunu açığa çıkaran naif `H(secret || message)` yaklaşımındaki uzunluk uzatma sorunu oluşmaz. Anahtar hazırlama, blok boyu ve etiket doğrulama ayrıntılarını elle uygulamayın; güvenilir kriptografi kütüphanesi kullanın.

## Şifreleme ile MAC’i birleştirme

Gizlilik ve bütünlük birlikte gerekiyorsa **encrypt-then-MAC (EtM)** genel güvenli sıradır: önce açık metin şifrelenir, sonra şifreli metin MAC ile doğrulanır. Alıcı önce etiketi doğrular, geçersiz veriyi çözme işlemine sokmadan reddeder. Bu, padding oracle gibi çözme davranışından bilgi sızdıran hataları önlemeye yardımcı olur.

Güncel uygulamalarda AES-GCM veya ChaCha20-Poly1305 gibi **AEAD** kipleri iki amacı tek doğrulanmış arayüzde birleştirir. GCM’in GHASH’i ve ChaCha20-Poly1305’in Poly1305’i doğrulama etiketi üretir. Bunlar farklı yapılar olduğundan birinin kurallarını diğerine taşımayın. GCM nonce’u aynı anahtarla tekrarlanmamalıdır. Doğrulama etiketi gizlilik sağlamaz; şifreleme hâlâ ayrı gerekliliktir.
