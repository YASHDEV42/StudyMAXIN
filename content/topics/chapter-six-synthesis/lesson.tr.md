## Sorularda kök nedeni, istismar yolunu ve etkiyi ayırın

Haftanın alıştırmaları aynı temel beceriyi ölçer: sistem neden başarısız oldu, başarısızlık nasıl kullanıldı ve sonuç ne olabilir? XML parser’ının dış varlık isteği yapması XXE kök nedenini SSRF etkisine bağlayabilir. Nesne kimliğini değiştirmek BOLA’nın keşif yöntemi olabilir; esas kusur sunucunun nesne yetkisini denetlememesidir. CSP’nin eksikliği savunma katmanını azaltır, fakat tek başına XSS bulunduğunu kanıtlamaz.

## Çözümlü alıştırmalar 1–6

1. **XXE mi SSRF mi?** XML faturasındaki dış varlık metadata adresine gidiyorsa, parser’ın dış varlıkları işlemesi XXE’dir; sunucunun iç hedefe istek göndermesi SSRF davranışıdır. DTD/harici entity’yi kapatın ve ağ çıkışını da sınırlayın.
2. **BOLA teşhisi:** Kullanıcının geçerli token’ı başka kullanıcının kart hareketlerini döndürüyor. Kök neden nesne düzeyi yetki kontrolünün yokluğudur. Her istekte kart sahipliğini kullanıcıyla karşılaştırın. UUID tahmini zorlaştırır ama sızan kimlikte erişimi engellemez.
3. **Doğru araç:** Kendi kodunuzdaki SQLi kalıbı için SAST; Log4Shell içeren bilinen bağımlılık için SCA; çalışan uygulamayı dışarıdan test için DAST. Araçların kapsamları farklıdır.
4. **Depodan silinen sır:** Eski commit’lerde veya klonlarda kalabilir. İlk adım anahtarı iptal etmek/döndürmektir; sonra kullanım kapsamını inceleyin, koddan kaldırın ve yeni sırrı güvenli kaynaktan sağlayın.
5. **CSP yokluğu:** Tek başına doğrudan XSS değildir; XSS varsa etkisini sınırlayabilecek ek katman eksiktir. Çıktı kodlaması temel korumadır, CSP savunma derinliğidir.
6. **JWT `alg=none`:** Zayıf doğrulama politikası imzasız veya değiştirilmiş token’ı kabul edebilir. Sunucu algoritmayı ve anahtarı sabitler, beklenmeyeni reddeder; imza ile `exp`, `iss`, `aud` ve gerekli claim’leri doğrular. Belirli kütüphane/sürüm koşullarını doğrulamadan bütün uygulamaların aynı şekilde açık olduğunu varsaymayın.

## Çözümlü alıştırmalar 7–12

7. **Aşırı veri ve toplu atama:** Yanıtta parola özeti/bakiye dönmesi aşırı veri açığa çıkarmadır; yalnızca izinli yanıt alanlarını seçin. İstekle `role=admin` yazılabilmesi mass assignment’tır; yalnızca izin verilen girdi alanlarını güncelleyin.
8. **Token bucket hesabı:** Nadir beş denemelik burst için `b=5`; uzun vadede dakikada bir deneme için `r=1/60` token/saniye seçilir. İlk dolu kova ve bir saatlik yenileme birlikte yaklaşık 65 denemeye izin verebilir; tam sayım zaman aralığının uç noktalarına bağlıdır. Dağıtık denemeyi azaltmak için hesap bazında da sınır koyun; IP sınırının NAT ve meşru kullanıcı etkisini değerlendirin.
9. **Şifrelenmiş pickle:** Şifreleme tek başına bütünlük sağlamaz; kimlik doğrulamalı şifreleme bile güvenilmeyen pickle’ı çözmenin riskini ortadan kaldırmaz. Güvenli tasarım yalın JSON verisi, şema doğrulaması ve gerekiyorsa MAC’tir.
10. **IMDSv2:** PUT ile token ve sonraki istekte özel başlık şartı, basit GET SSRF’sini metadata erişiminden alıkoyabilir. Bu, SSRF’nin kök nedenini kapatmaz; en az yetki ve ağ kısıtlaması da gerekir.
11. **Log4j envanteri:** Doğrudan eklenmeyen Log4j başka ürünün geçişli bağımlılığı olabilir. SCA ve SBOM envanter çıkarır; etkilenen sürüm/koşulu doğrulayın ve desteklenen düzeltmeyi dağıtılmış kopyalarla birlikte uygulayın. Kaynaktaki tarihsel sürüm ifadesini güncel yama tavsiyesi saymayın.
12. **CORS reflektörü:** Her Origin’i yansıtıp credentials izni vermek, uygun tarayıcı koşullarında saldırgan kaynağa kurbanın yanıtını okutabilir. Tam origin allowlist’i kullanın; CORS’u API authorization veya CSRF kontrolü sanmayın.

## Sekiz öz değerlendirme sorusu

1. `169.254.169.254`, bulut metadata hizmetinin link-local adresidir; rol kimlik bilgileri verebilir. Etki, SSRF erişimi ve rol izinlerine bağlıdır.
2. Kör SSRF; araştırmacının sunucusuna gelen istek, yanıt süresi farkı veya tetiklenen iç işlemle hâlâ zararlı olabilir.
3. BOLA başka nesneye erişim; BFLA yetkisiz işlev çağrısıdır.
4. Log4j geçişli bağımlılık olarak gizli kalabilir; SBOM bileşenleri listeler, fakat yamayı kendi başına uygulamaz.
5. `none`/algoritma hatası, sunucunun güvenilmeyen header’ı politika kabul etmesinden kaynaklanır; algoritmayı sunucu sabitlemeli ve imzayı/claim’leri doğrulamalıdır.
6. Git geçmişinde sır kalır; silmek yeterli değildir, önce credential iptal edilir/döndürülür.
7. HSTS HTTPS’e düşürmeyi azaltır; CSP izinli kaynakları sınırlandırıp bazı XSS etkilerini azaltır.
8. Shift-left güvenlik denetimini tasarım/koda erkene çeker; erken düzeltme genellikle daha kolaydır. Bilinen bağımlılık CVE’si için SCA uygundur.

## Haftanın sentezi

SSRF sunucunun ağ konumunu; güvensiz serileştirme, XXE ve SSTI bir yorumlayıcının davranışını; Log4Shell ve eski paketler paylaşılan bileşenleri hedef alır. API’de kimlik doğrulama, nesne/işlev yetkisi ve alan denetimi ayrı yapılmalıdır. Sırlar koddan ayrılmalı, sızıntıda iptal edilmeli ve döndürülmelidir. Güvenlik başlıkları ek bariyerlerdir. Secure SDLC, STRIDE ve otomatik araçlarla bu kontrolleri sürece bağlar; koordineli açıklama araştırmacı ve üretici arasında güvenli düzeltme yolu açar.

Ortak soru şudur: hangi bileşen kime güveniyor ve bu güven hangi sınırda doğrulanıyor? Sonraki hafta uygulama katmanından ağ katmanına geçer; paketler, bağlantılar ve protokoller incelenir. Aynı yeniden doğrulama ve en az yetki ilkeleri orada da geçerlidir.

**Kaynakla ilgili nitelendirme:** Alıştırma yanıtları bazı saldırı zincirlerini kısa anlatır. Burada koşullar ve uygulama farkları eklendi; özellikle JWT kabulü, IMDSv2 ve Log4Shell sürüm koşulları mutlaklaştırılmadı.
