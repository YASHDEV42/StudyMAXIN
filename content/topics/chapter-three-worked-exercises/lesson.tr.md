## Alıştırmaları çalışma yöntemi

Önce soruyu çöz, sonra işlemleri denetle. Küçük modüllü örnekler hesap yöntemini öğretir; gerçek sistemde kullanılacak parametre değildir.

### 1) Anahtar sayısı

200 kişi için simetrik anahtar sayısı `200×199/2=19.900` olur. Açık anahtar sisteminde kişi başına açık ve gizli anahtar: `2×200=400`. 201. kişi gelince 200 yeni simetrik çift anahtarı gerekir; açık anahtarlı modelde yeni kişi kendi çiftini üretir.

### 2) Diffie–Hellman

`p=23,g=5,a=6,b=15`. `A=5⁶ mod23=8`, `B=5¹⁵ mod23=19`. Ortak sır `19⁶ mod23=2`; kontrol olarak `8¹⁵ mod23=2`. Dinleyen saldırgan ayrık logaritmayı çözmelidir.

### 3) RSA anahtarı

`n=11×13=143`; `φ(n)=10×12=120`. `gcd(7,120)=1`, dolayısıyla `e=7` geçerli. `7d≡1 mod120` denklemi için `d=103`, çünkü `721=6×120+1`.

### 4) Şifreleme ve imza anahtarı

Gizlilik için gönderen alıcının açık anahtarıyla şifreler; alıcı kendi gizli anahtarıyla çözer. Kaynak doğrulama ve bütünlük için gönderen kendi gizli anahtarıyla imzalar; doğrulayan gönderenin açık anahtarını kullanır.

### 5–7) Sertifika, ileri gizlilik, PQC önceliği

5. Tarayıcı yaprak sertifikayı ara CA’ya, oradan yerel güven deposundaki köke kadar doğrular; ad, süre, imza ve iptal koşullarını da denetler. Kök ağaçta önceden güvenilir olmalıdır.

6. TLS 1.3 ECDHE geçici sırlarını oturum sonunda siler. Sunucunun kalıcı imza anahtarı sonradan çalınsa bile geçmiş oturum sırrını tek başına vermez.

7. Elli yıl gizli kalması gereken genom verisi, yarın kamuya açılacak bildiriden ve 30 günlük çerezden daha önceliklidir. Ölçüt gizlilik ömrüdür.

### 8–10) Hesap ve nonce

8. `13=1101₂=8+4+1`. Mod 11’de `7²=5`, `7⁴=3`, `7⁸=9`; `7¹³=9×3×7≡2`. Üç kareleme ve iki ek çarpma, ardışık yöntemdeki 12 çarpmadan azdır.

9. Textbook RSA deterministiktir; saldırgan açık anahtarla iki oy seçeneğinin ciphertext’ini önceden üretip karşılaştırır. Ayrıca `c'=c×2^e mod n` çözüldüğünde `2m mod n` olur; bu şekillendirilebilirliktir. OAEP uygun rastgele dolguyla bu textbook kullanım kusurlarını giderir.

10. ECDSA’da nonce `k` tekrar edilirse imzaların `r` değeri aynıdır. `s_i=k⁻¹(h_i+rd) mod q` eşitliklerinin farkından `k=(h1-h2)(s1-s2)⁻¹ mod q`; sonra `d=(s1k-h1)r⁻¹ mod q` bulunur. Gizli imza anahtarı çıkar.

### 11–15) TLS ve eğri hesabı

11. `TLS_AES_128_GCM_SHA256`: AES-128, GCM ile gizlilik+bütünlük, SHA-256. TLS 1.3 anahtar değişimi ve sertifika imzasını suite adına yazmaz; geçici ECDHE ileri gizlilik verir.

12. CRL toplu liste, OCSP doğrudan sorgu, stapling sunucunun güncel yanıtı eklemesidir. Kısa ömürlü sertifika iptal yükünü azaltır; ACME otomatik yenileme sağlar.

13. Eğri `y²=x³+2x+2 mod17`; `2P=(6,3)`, `P=(5,1)`. Eğim `λ=(-2)(-1)⁻¹≡2`; `x3=4-6-5≡10`; `y3=2(6-10)-3≡6`. `3P=(10,6)`. Kontrol: `6²≡2`, `10³+2·10+2=1022≡2 mod17`.

14. RSA-CRT’de yalnız bir dal hatalıysa bozuk imza bir asal modülünde doğru kalabilir. `gcd(s'^e-m,n)` bir çarpanı açığa çıkarabilir. İmza yayımlanmadan açık anahtarla doğrulanmalıdır.

15. HKDF el sıkışma/uygulama anahtarlarını ve iki yönün anahtarlarını ayırır. Aynı AEAD anahtarıyla nonce tekrarı güvenliği bozar. TLS 1.3 IV ve artan kayıt numarasından nonce üretir.

**Öğretici ek:** Örneklerin küçük sayıları yöntem göstermek içindir; üretim güvenliği sağlamaz.

İlişkili konular: [açık anahtar temelleri](topic:public-key-foundations) · [eliptik eğri kriptografisi](topic:elliptic-curve-cryptography) · [TLS 1.3](topic:tls-13).
