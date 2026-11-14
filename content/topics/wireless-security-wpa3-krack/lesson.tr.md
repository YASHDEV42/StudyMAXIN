## Kablosuz ağın tehdit modeli

Radyo sinyali fiziksel kablonun dışına taşabildiği için saldırgan çerçeveleri yakalamak üzere aynı odaya girmek zorunda değildir. Wi‑Fi bağlantı katmanında kimlik doğrulama ve şifreleme gerekir. WEP, kısa/tekrarlı IV ile RC4 kullandığından yeterli trafik toplandığında istatistiksel anahtar çıkarımına açıktır ve terk edilmelidir. WPA2 daha güçlüdür; fakat zayıf parola yakalanan el sıkışma üzerinden çevrimdışı sözlük denemesine izin verebilir.

## WPA2 dört yönlü el sıkışma

İstemci ve erişim noktası PMK’yi bilir. Kişisel ev ağında PMK, parola ve SSID’den PBKDF2 ile türetilir; parola havadan gönderilmez. Erişim noktası ANonce yollar. İstemci SNonce üretir ve PMK, iki nonce ve tarafların MAC adreslerinden PRF ile PTK hesaplar; MIC göndererek anahtara sahip olduğunu kanıtlar. Erişim noktası da PTK’yi hesaplar. Üçüncü mesaj grup trafiği için GTK’yi ve anahtar kurulumunu taşır; dördüncü mesaj onaydır. Sayfa 299’daki zaman çizelgesi, dört mesajı ve şifreli veri akışının başlangıcını gösterir.

## KRACK ve WPA3

KRACK, şifre algoritmasını kırmaz; kayıp mesajın yeniden gönderilmesi davranışını ve bazı istemcilerin anahtarı tekrar kurarken nonce sayacını sıfırlamasını hedefler. Uygun MITM konumunda üçüncü mesajı yeniden oynatmak aynı anahtar/nonce çiftinin tekrar kullanımına yol açabilir; bu, akış şifrelerinde ve AEAD kullanımlarında ciddi gizlilik/bütünlük sorunudur. Etki istemci uygulamasına ve yamalara bağlıdır; WPA2 kullanan her cihazın her trafiğinin otomatik açıldığı anlamına gelmez.

WPA3-Personal, parola doğrulamalı anahtar değişimi SAE/Dragonfly kullanır. Kaydedilmiş el sıkışmaya karşı çevrimdışı parola adaylarını test etmeyi zorlaştırır; her deneme canlı etkileşim gerektirir ve hız sınırlamasına konu olabilir. SAE ileri gizliliği de destekler. Açık ağlarda OWE, kullanıcı başına fırsatçı şifreleme sağlayabilir; erişim noktası kimliğini doğrulamaz. Güncelleme, güçlü parola ve doğru yapılandırma hâlâ gerekir. Bu örnek, önceki kriptografi derslerindeki nonce benzersizliği ve durum makinesi tasarımının gerçek protokoldeki önemini gösterir.
