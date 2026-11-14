## PQC’nin matematiksel sezgisi

Kafes tabanlı yöntemlerin önemli sezgilerinden biri Learning With Errors (LWE) problemidir. Hatasız `As=b` doğrusal denklem sistemi çözülebilir. Küçük hata vektörü eklenince `As+e=b` elde edilir; hedef, gürültü içindeki gizli `s` değerini bulmaktır. Boyut büyüdükçe bu tür kafes problemlerinin bilinen çözümü zorlaşır. Bu, mutlak olarak çözülemezlik değil, standartların dayandığı ve sürekli incelenen hesaplama varsayımıdır.

NIST’in 2024’te yayımladığı standartlar farklı görevler içindir: FIPS 203 **ML-KEM**, açık iletişim kanalında ortak sır kuran anahtar kapsülleme mekanizmasıdır; FIPS 204 **ML-DSA** dijital imza üretir/doğrular; FIPS 205 **SLH-DSA** stateless hash tabanlı imzadır. ML-KEM, CRYSTALS-Kyber; ML-DSA, CRYSTALS-Dilithium; SLH-DSA ise SPHINCS+ tasarımlarından türemiştir. KEM veri şifrelemenin kendisi değildir; ortak sırrı kurar, ardından simetrik algoritma veri trafiğini korur. Standart ayrıntıları için [NIST’in duyurusu](https://csrc.nist.gov/News/2024/postquantum-cryptography-fips-approved/) ve [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final), [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final), [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final) incelenebilir.

SLH-DSA, kafes varsayımından farklı bir hash tabanlı güven varsayımı sunar. Merkle ağacı sezgisinde tek kullanımlık imza anahtarları hash bağlantılarıyla ortak köke bağlanır. Stateless tasarım önce kullanılan yaprak durumunu saklama zorunluluğunu azaltır; imzalar daha büyük olabilir.

## Boyut maliyeti

Kaynağın yaklaşık 128-bit düzey için verdiği örneklerde X25519 açık anahtarı 32 bayt, ML-KEM-768 açık anahtarı 1184 bayttır. Ed25519 açık anahtarı/imzası 32/64 bayt; ML-DSA-65 değerleri 1952/3309 bayttır. Büyük anahtar ve imzalar sertifika zincirlerini, TLS el sıkışmalarını ve ağ paketlerini büyütür. Düşük bant genişlikli veya gömülü sistemlerde geçiş performans ve uyumluluk mühendisliği gerektirir. Boyut değerlerini algoritma-parametre çiftiyle birlikte vermek gerekir.

## Hibrit anahtar değişimi

Hibrit tasarım klasik X25519 ile post-kuantum ML-KEM’den iki sır üretir; HKDF bağlamı belirten bir etiketle ikisini oturum anahtarına birleştirir. Amaç, bir bileşenin zayıflığı durumunda diğerinden koruma almaktır. Bileşim kodu ve protokolü doğru tasarlanmalı; güvenlik otomatik olarak her türlü birleştirmede elde edilmez.

## Kripto-çeviklik

Kripto-çeviklik, algoritma seçimini sabit kodlamak yerine değiştirilebilir yapılandırma/anlaşma katmanında tutar. Kurumlar önce kriptografik envanter çıkarmalı, uzun ömürlü sırları ve eski cihazları belirlemeli, sonra kademeli geçiş planı kurmalıdır. Kaynaktaki 2030 ve 2035 tarihleri hazırlık çıpalarıdır, kesin küresel son tarihler değildir; güncel politika için NIST’in son rehberine bakılmalıdır.

**Kaynak nüansı:** NIST, ML-KEM’in güvenliğini Module-LWE zorluğuyla ilişkilendirir. LWE’nin “çözülemez” olduğu kesin matematiksel ispat değildir; bilinen saldırılara göre güvenlik varsayımıdır. Kitaptaki TLS hibrit dağıtım notu tüm sağlayıcılara genellenmemelidir.

İlişkili konular: [kuantum tehdidi](topic:quantum-threat-and-pqc) · [TLS 1.3](topic:tls-13).
