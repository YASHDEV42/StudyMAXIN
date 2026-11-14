## Sır neden kaynak kodunda durmamalı?

Uygulama veritabanı parolası, bulut kimliği, üçüncü taraf API anahtarı ve imza anahtarı gibi sırlar kullanır. Bu değerleri kaynak koda yazmak, kodla beraber Git geçmişine, kopyalara, inceleme sistemlerine ve bazen herkese açık depolara taşır. Otomatik tarayıcılar herkese açık depolardaki anahtarları hızla bulabilir. Güvenlik, sırrın uzun görünmesine veya deponun şu anda özel olmasına dayanamaz.

## Git geçmişi ve sızıntı anındaki karar

Bir sırrı sonraki commit’te silmek önceki commit’leri yok etmez. Depo geçmişi, klonlar ve build kayıtları değeri saklamış olabilir. `.env` dosyasını `.gitignore` ile hariç tutmak yararlıdır, ama daha önce izlemeye alınmış bir dosyayı geri almaz ve web kök dizinine konmuş dosyayı korumaz. Depo taraması commit geçmişini de kapsamalı; pre-commit ve CI kontrolleri yeni sızıntıları erkenden durdurmalıdır.

Bir sır depoya girdiyse, onu ifşa olmuş kabul edin. İlk iş credential’ı iptal etmek veya döndürmektir; yalnızca metni silmek yeterli değildir. Sonra hangi servis ve kaynaklara erişebildiğini, kullanılıp kullanılmadığını inceleyin. Tarihi temizlemek sonraki kopyaları azaltabilir ama daha önce alınmış kopyaları geri çağıramaz.

## Ayır, kasala, döndür

Küçük kurulumlarda sırlar kontrollü çalışma ortamından sağlanabilir. Kurumsal ölçekte sır kasası (secrets vault), merkezi şifreli depolama, erişim politikası ve denetim kaydı sağlar. Uygulama önce kendi kimliğiyle kasaya erişir, yalnızca ihtiyacı olan sırrı alır. Dinamik ve kısa ömürlü kimlik bilgileri, sabit ve uzun ömürlü anahtarların maruz kaldığı süreyi azaltabilir.

Döndürme, eski credential’ı yenisiyle değiştirmek ve eskisini iptal etmektir. Sızıntı şüphesinde planlı dönemi beklemeyin. Hizmet kesintisini önlemek için yeni credential’ı üretin, tüketicileri geçirin ve doğrulayın, ardından eskisini iptal edin. Erişimleri kaydedin, olağandışı kullanımı izleyin ve her uygulamaya yalnızca gerekli izinleri verin.

Ortam değişkenleri koddan ayrım sağlar ama tek başına kasanın bütün özelliklerini sunmaz; loglara, process dökümlerine veya CI çıktısına sızabilir. Kasa da yetkili uygulama ele geçirilirse erişimi sihirli biçimde engellemez. Kimlik, en az ayrıcalık, denetim ve ağ sınırları birlikte gerekir.

## Önceki konularla ilişki

[Anahtar yönetimi yaşam döngüsündeki](topic:key-management-lifecycle) üretme, dağıtma, saklama, döndürme ve imha adımları parolalar ve API anahtarları için de geçerlidir. [SSRF](topic:ssrf-cloud-metadata), bulut iş yükünün kimlik bilgilerine erişiminin başka kaynaklara uzanabileceğini gösterir; bu yüzden dar rol izinleri önemlidir. JWT imza anahtarı sızarsa token güveni etkilenebilir; anahtarları amaç ve hizmet kapsamına göre ayırın, şüphede döndürün.

**Pedagojik ek:** Sızıntı müdahalesi sırası: anahtarı iptal et/döndür, erişim kapsamını ve kayıtları incele, tüketicileri güvenli biçimde geçir, tekrarını önle ve gereksiz yetkileri azalt. Sızmış değeri olay kaydına kopyalamayın.
