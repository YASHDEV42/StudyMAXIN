## Rastgelelik, kriptografinin görünmeyen girdisidir

DH gizli değerleri, RSA asal sayıları, ECDSA nonce’u ve TLS oturum sırları öngörülemez değerler gerektirir. Saldırgan bu değerleri tahmin edebiliyorsa güçlü algoritmayı kırmasına gerek kalmaz.

Sıradan **PRNG**, bir başlangıç tohumu (seed) üzerinden belirlenimci dizi üretir; simülasyon veya oyun için yeterli olabilir ama iç durumu tahmin edilebilir. **CSPRNG**, gözlenen çıktılardan başka çıktıları çıkarmayı pratikte zorlaştırmak üzere tasarlanır ve işletim sisteminin topladığı entropiyle beslenir. Kriptografik değerleri `getrandom`, `/dev/urandom` veya `secrets` gibi sistem/kütüphane arayüzlerinden üretin. Genel amaçlı `random`, zaman damgası ya da PID’den anahtar üretmeyin.

## Debian OpenSSL olayı

Kaynağın anlattığı 2006 değişikliğinde, bir analiz aracının başlatılmamış bellek uyarısını gidermek amacıyla OpenSSL’in entropi girdisinin büyük bölümü kaldırıldı. Etkilenen Debian sistemlerinde PID yaklaşık tek girdi hâline geldi ve olası değer uzayı yaklaşık 32.768’e kadar daraldı. 2006–2008 döneminde üretilen bazı SSH anahtarları, TLS sertifikaları ve DH değerleri önceden oluşturulmuş adaylarla eşleştirilebildi. CVE-2008-0166 olarak yayımlanan olay, etkilenen anahtarların yenilenmesini gerektirdi. Ana ders: kriptografik RNG koduna yapılan küçük değişiklik bile güvenlik incelemesi ve dikkatli test ister.

## Dual EC DRBG: şüpheyi olgudan ayırmak

Kaynak ayrıca eliptik eğri temelli **Dual EC DRBG** standardını ele alır. Üretecin iki noktasının seçimi arasında gizli bir ilişki varsa, bu ilişkiyi bilen taraf bazı gözlenen çıktılardan sonraki durumu tahmin edebilir. Tasarım yayımlandığında kriptograflar parametre seçimi hakkında şüphe bildirmiş; 2013’teki açıklamalar bu kaygıları artırmış ve NIST üreteci 2014’te standartlarından çıkarmıştır. Bu, gizli arka kapının kim tarafından ve hangi niyetle eklendiğinin kesin olarak kanıtlandığı anlamına gelmez; mekanizmanın şüpheye yol açması ve standarttan çekilmesi ayrı olgulardır.

Güven, yalnızca standardı yayımlayan otoriteye değil, parametrelerin nasıl üretildiğinin açıklanabilmesine de bağlıdır. Curve25519’ın “nothing-up-my-sleeve” parametre kökeni bu denetlenebilirlik yaklaşımının örneği olarak anılır. Bununla birlikte doğru uygulama ve güvenilir RNG yine gerekir.

> **Pedagojik not:** Zaman damgası/PID’den anahtar üretmeme uyarısı genel uygulama açıklamasıdır. Dual EC tartışmasındaki şüphe, kaynakta aktarılan kanıt ve standarttan çekilme bağlamıyla sınırlıdır; niyet hakkında daha güçlü kesinlik iddia edilmez.
