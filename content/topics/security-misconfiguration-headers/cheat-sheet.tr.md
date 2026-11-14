Güvenlik yanlış yapılandırması: kod değişmeden varsayılan/üretim ayarı (debug, parola, açık servis, bulut izinleri) riski oluşturur. Güvenli varsayılan ve düzenli yapılandırma denetimi uygula.

| Başlık                              | Amaç                                | Hatırla                                                    |
| ----------------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| HSTS                                | Tarayıcıda HTTPS kullanımını zorlar | İlk ziyaret/preload ve TLS doğruluğu ayrı koşuldur         |
| CSP                                 | Kaynak/script yüklemesini sınırlar  | XSS etkisini azaltabilir; çıktı kodlamasının yerine geçmez |
| X-Frame-Options / `frame-ancestors` | Frame içinde gösterimi sınırlar     | Clickjacking azaltımı                                      |
| X-Content-Type-Options: `nosniff`   | MIME tahminini kapatır              | İçeriği doğrulamaz                                         |
| Referrer-Policy                     | Referer bilgisini sınırlar          | Diğer sızıntıları çözmez                                   |

- Başlıklar katmanlı savunmadır; erişim kontrolü veya kök neden düzeltmesi değildir.
- CSP çok gevşekse etkisiz, çok katıysa uygulamayı bozabilir; test ederek yapılandır.
- HSTS, tarayıcı politikayı öğrendikten sonra düşürmeyi önler; ilk HTTP ziyaretinde preload gerekebilir.
- CORS/HSTS CSRF’yi çözmez; CSP tek başına XSS’i önlemez.
