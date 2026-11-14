## PGP neyi bir araya getirir?

Phil Zimmermann, 1991’de **PGP (Pretty Good Privacy)**’yi yayımlayarak güçlü kriptografiyi e-posta kullanıcılarına ulaştırdı. PGP hibrit bir düzendir: mesajı hızlı simetrik anahtarla şifreler, bu anahtarı alıcının açık anahtarıyla korur ve mesajı gönderenin özel anahtarıyla imzalar. Alıcı simetrik anahtarı açar, mesajı çözer ve imzayı doğrular. OpenPGP açık standart, GnuPG özgür uygulamadır. Kaynaktaki `gpg` komutları iş akışını örnekler; tek başına alıcının/gönderenin kimliğini doğruladığı varsayılmamalıdır.

## Merkezi PKI ve web of trust

**Web of trust (güven ağı)**, açık anahtarın sahibine ait olduğunu tek bir merkezi otoritenin söylemesi yerine kullanıcıların birbirlerinin anahtarlarını yüz yüze/parmak izi kontrolüyle doğrulayıp imzalamasına dayanır. Başkalarının imzaları, tanımadığınız bir anahtara giden güven yolunu değerlendirmeye yardım eder. Merkezi CA’nın tek hata noktası yoktur; buna karşılık kullanıcı anahtar parmak izlerini doğrulamalı ve hangi güven yollarını kabul edeceğine karar vermelidir. Bu yük ölçeklenmeyi zorlaştırır.

Web PKI’sında **sertifika otoritesi (CA)** bir açık anahtarı alan adı gibi kimliğe bağlar; tarayıcı kök CA deposuna dayanır. Bu model çok sayıda web sitesinde kolay çalışır ama güvenilen CA’nın ele geçirilmesi sahte sertifika riski yaratır. İki yaklaşım da dijital imza kullanır; ayrım, anahtar-kimlik bağını kimin verdiği ve güvenin nasıl yayıldığıdır. Bir araçta “Good signature” görmek, anahtar sahibinin beklenen kişi olduğunu tek başına kanıtlamaz; doğru anahtar parmak izini doğrulamak gerekir.

| Boyut                        | Merkezi PKI                                   | PGP güven ağı                                                   |
| ---------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| Güven kaynağı                | Güvenilen kök CA’lar                          | Kullanıcıların birbirini imzalaması                             |
| Ölçek                        | Web/tarayıcıda kolay ve görünmez              | Elle doğrulama ve yol değerlendirme gerekir                     |
| Yapısal risk                 | Ele geçirilen CA birçok kimliği etkileyebilir | Tek merkez yok; kullanıcı hatası ve çalıntı anahtar riski sürer |
| Kaynakta verilen yaygın alan | HTTPS/web                                     | E-posta/teknik topluluklar                                      |

## Kripto savaşlarının dersi

Kaynak 1990’lardaki ABD ihracat kısıtlamalarını ve PGP’nin internet üzerinden dağıtılmasının ardından Zimmermann hakkında açılan, sonradan dava açılmadan kapanan soruşturmayı anlatır. **Clipper Chip** önerisi iletişimi şifreleyip anahtar kopyasını devlette emanet tutmayı (**key escrow**) öngörüyordu; muhalefet sonrası terk edildi. İhracat sınıfı zayıf şifreler daha sonra FREAK ve Logjam gibi saldırılarda eski protokol seçenekleri olarak sorun yarattı. Tasarıma bilinçli zayıflık koymak tüm kullanıcıları etkileyebilir.

> **Kaynak sınırı:** Bu bölüm tarihsel tartışmayı özetler; güncel ihracat hukukunu açıklamaz ve güncel PGP kurulum rehberi değildir. Merkezi noktanın olmaması, güven ağının risksiz olduğu anlamına gelmez.
