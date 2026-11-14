## İmzayı doğrula, sonra bağlamı denetle

JWT header ve payload bölümleri istemciden gelen veridir; biçimlerinin okunabilir olması onları güvenilir yapmaz. Sunucu, kabul edeceği algoritmayı kendi güvenilir yapılandırmasından seçmeli ve imzayı doğrulamalıdır. Algoritmayı token header'ına bırakmak, `alg: none` veya anahtar türünü yanlış yorumlayan algoritma karıştırma hatalarına yol açabilir. İmza doğrulanmadan payload içindeki `role`, `sub` veya başka bir claim yetki kararı için kullanılmamalıdır.

İmza geçtikten sonra bağlam denetimi sürer. `exp` token'ın süresinin dolmadığını, `iss` beklenen düzenleyeni, `aud` token'ın bu hizmet için düzenlendiğini gösterir. Uygulama gereken claim'lerin hem mevcut hem uygun olduğunu kontrol etmelidir. Başka API'ye düzenlenmiş, süresi geçmiş veya beklenmeyen issuer'dan gelen geçerli imzalı token reddedilir. HMAC kullanılıyorsa sır tahmin edilemeyecek güçte olmalı; asimetrik anahtarlar da güvenli saklanıp döndürülmelidir.

OIDC ID token'ı istemciye kimlik bilgisi taşır; OAuth access token'ı kaynak sunucusuna yetki taşır. Hedef kitle ve kullanım farklıdır, bu nedenle birini diğerinin yerine kabul etmeyin. Ayrıntı için [OIDC ve JWT yapısına](topic:openid-connect-jwt) bakın. JWT imzası payload'ı şifrelemez ve token'ın erken iptalini kendiliğinden sağlamaz; yaşam döngüsü [oturum yönetimiyle](topic:session-security) birlikte tasarlanır.

_Kaynak senaryosunun açıklaması:_ `alg=none` saldırısı, doğrulamanın atlandığı veya yanlış yapılandırıldığı durumda anlamlıdır. Sağlam yapılandırmada beklenmeyen algoritma reddedilir; yalnızca payload'ı değiştirip header'ı değiştirmek geçerli imza üretmez.
