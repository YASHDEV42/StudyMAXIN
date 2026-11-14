## Neden sıra güvenliği etkiler?

Şifreleme gizlilik, MAC ise bütünlük ve anahtar üzerinden doğrulama sağlar. Bunları yanlış sırada birleştirmek, çözme sırasında oluşan hata veya zaman farklarını saldırgana bilgi verecek biçimde açabilir. Genel güvenli yaklaşım **encrypt-then-MAC (EtM)**: önce veriyi şifrele, sonra şifreli metin üzerinde MAC hesapla. Alıcı etiketi çözme işleminden önce doğrular; sahte veya değiştirilmiş veriyi çözmeye çalışmadan reddeder.

Bu sıra padding oracle gibi çözme davranışından sızan bilgi riskini azaltır. MAC’in hangi alanları kapsadığı, etiketin nasıl karşılaştırıldığı ve hata yanıtının nasıl verildiği de protokolün parçasıdır. Elle yeni bir birleştirme tasarlamayın; doğrulanmış protokol ve kriptografi kütüphanesi kullanın.

## AEAD ile tek arayüz

AES-GCM ve ChaCha20-Poly1305 gibi **AEAD** kipleri gizlilik ve doğrulamayı tek işlemde birleştirir. GCM’in GHASH’i doğrulama etiketi üretir; ChaCha20, Poly1305 ile eşleşir. Bu yapı geliştiricinin ayrı şifreleme/MAC sıralaması hatası yapma olasılığını azaltır. Yine de her kipin nonce kuralları kritiktir; GCM’de aynı anahtarla nonce tekrar edilmemelidir. Bu bölüm kaynakta anlatılan tasarım ilkesidir, tüm protokol ayrıntılarının yerine geçmez.
