## Web’in saldırı yüzeyi neden geniş?

URL kaynakları adlandırır, HTTP taşır, HTML sunum yapar. Bu açık ve basit model Web’i büyüttü; aynı zamanda herkese açık uygulamaları kurumların büyük bir saldırı yüzeyi hâline getirdi. Kullanıcı girdisi iş mantığına ve veritabanına ulaştığında güvenlik kusurları doğabilir. Statik sayfalardan dinamik CGI/PHP’ye, AJAX ve SPA’lara, REST API’lere ve bulut mikroservislerine geçiş yeni sınırlar ve giriş noktaları yarattı. SQL enjeksiyonu ve XSS eski dinamik Web’den, API yetki hataları ve SSRF ise yeni mimarilerden beslenebilir.

### HTTP mesajını okumak

Bir HTTP isteği metot, yol ve sürüm satırıyla başlar; başlıklar gelir; boş satır başlıkları gövdeden ayırır. Yanıt durum satırı, başlıklar ve gövdeden oluşur. `Set-Cookie` oturum bilgisini iletir; HSTS tarayıcıya HTTPS kullanmasını söyler; CSP yüklenebilecek kaynakları sınırlar. HTTP/1.1 metin tabanlı görünür; HTTP/2 ve HTTP/3 ikili çerçeveler kullansa da istek/yanıt modeli sürer.

`GET` güvenli kabul edilir: sunucudaki durumu değiştirmemelidir. `POST`, `PUT`, `DELETE` gibi metotlar durum değiştirebilir. Güvenli olma ile idempotent olma aynı değildir; PUT yinelendiğinde aynı son durumu üretebilir ama salt okunur değildir. Para transferini GET ile gerçekleştirmek sözleşmeyi bozar; tarayıcı bağlantı, resim veya ön yükleme nedeniyle isteği kullanıcı fark etmeden gönderebilir. Durum değiştiren her işlem uygun metot, sunucu tarafı yetki denetimi ve gerekiyorsa CSRF savunması ister.

### Oturumlar ve taşıma güvenliği

HTTP durumsuzdur. Oturum için sunucu çoğunlukla rastgele bir tanımlayıcıyı cookie ile tarayıcıya verir; uygulama bağlamı sunucuda tutar. Tanımlayıcıyı ele geçirmek kullanıcıyı taklit etmeye yarayabilir. `HttpOnly` betiklerin cookie’yi okumasını, `Secure` HTTP üzerinden gönderilmesini sınırlar; `SameSite` çapraz site bağlamında gönderimi azaltır. Bunlar tek başına oturum güvenliği sağlamaz; giriş sonrası kimliği yenilemek ve her istekte yetkiyi denetlemek gerekir.

TLS taşıma sırasında gizlilik ve bütünlük sağlar ve sertifika doğrulandığında sunucu kimliğini destekler. Uygulamanın iş mantığını güvenli yapmaz; SQLi veya CSRF’i tek başına önlemez. HSTS, öğrenildikten sonra HTTP’ye düşürülmeyi engellemeye yardım eder.

### SOP ve CORS

Bir origin; şema, ana makine ve porttan oluşur. Same-Origin Policy, bir kökendeki betiğin başka kökendeki yanıtları okumasını kısıtlar. Bu, tüm çapraz site isteklerini engellemez. CORS sunucunun hangi kökenlere yanıtı okuma izni verdiğini bildiren tarayıcı mekanizmasıdır; kimlik doğrulama veya genel bir sunucu tarafı engeli değildir. Credential kullanılan yanıtlarda tüm kökenleri yansıtmak tehlikelidir.

Bu ayrım XSS ile CSRF’i anlamanın temelidir: XSS kodu güvenilir kökenin içine sokar; CSRF tarayıcının otomatik gönderdiği oturum bilgisinden yararlanır. [Oturum güvenliği](topic:session-security) ve [TLS 1.3](topic:tls-13) konularıyla birlikte düşün. Kaynaktaki HTTP ve mimari görselleri incelendi; örnekler öğretim amacıyla yeniden anlatılmıştır.
