## İç ağda olmak neden yeterli değil?

Geleneksel çevre güvenliği, interneti tehlikeli; güvenlik duvarı veya VPN'in içini güvenilir kabul eder. Ancak çalınmış VPN parolası veya ele geçirilmiş bir dizüstü bilgisayar saldırgana içeri giriş sağlayabilir. Ağ içinde yatay hareket mümkünse tek bir ihlal çok sayıda kaynağa yayılır. Zero Trust, ağ konumunu tek başına güven kanıtı saymaz: her erişim isteği kullanıcı, cihaz, kaynak ve bağlam üzerinden değerlendirilir.

“Asla güvenme, daima doğrula” her tıklamada parolayı baştan yazdırmak değildir. Kalıcı ve örtük ağ güvenini azaltıp erişim kararlarını talep ve risk bağlamında vermektir. Güçlü [kimlik doğrulama](topic:identity-authentication-authorization), cihaz sağlık sinyalleri, kaynağın hassasiyeti ve [ABAC benzeri politika](topic:access-control-models) bir arada kullanılabilir. Yetki yalnızca gerekli kaynak ve işlem için verilmelidir.

Mikro-segmentasyon, ağı veya hizmetleri daha küçük güvenlik bölgelerine ayırır ve aralarındaki iletişimi sınırlar. Böylece bir sistem ele geçirilse bile saldırganın yatay hareketi zorlaşır. Ders notundaki BeyondCorp örneği, çalışanın uygulamaya erişimini fiziksel ofis/VPN konumuna değil, kimlik ve cihaz güvenlik durumuna bağlar. Uygun koşulları sağlayan çalışan halka açık ağdan erişebilir; yine de yalnızca ihtiyacı olan uygulama ve işlemlere izin alır.

Zero Trust tek başına bir ürün veya mutlak güvenlik garantisi değildir. Kimlik sağlayıcı, uç cihazlar, ağ bölümlendirmesi, politika motoru, kayıt ve müdahale süreçleri birlikte çalışmalıdır. Hatalı cihaz sinyali, ele geçirilmiş hesap veya çalınmış oturum kötü karara yol açabilir. Amaç örtük güveni ve olası ihlalin etki alanını küçültmektir. Sıfır güven ifadesi, hiçbir kanıt veya güven ilişkisinin olmadığı anlamına gelmez; güven her istekte doğrulanan koşullara bağlanır.

_Öğretim örneği:_ Ofis ağındaki yönetilmeyen cihazın hassas veritabanına erişimi reddedilir; yönetilen cihazdaki doğrulanmış kullanıcıya da yalnızca görevinde gereken sorgu izni verilir.
