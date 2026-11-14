## Kod doğru olsa da yapılandırma açık bırakabilir

Güvenlik yanlış yapılandırması, güvenlik açığının hatalı koddan değil ayardan doğmasıdır. Varsayılan yönetici parolası, üretimde açık debug modu, internete açık yönetim endpoint’i, herkese açık bulut deposu veya kullanılmayan eski servis örnekleridir. Güvenli varsayılan yaklaşımı, gereksiz özellikleri kapalı ve izinleri dar başlatır; koruma sonradan hatırlanacak bir seçenek olarak kalmaz.

## HTTP güvenlik başlıkları ne sağlar?

Sunucu yanıt başlıkları, tarayıcıya ek davranış kuralları verir. Genellikle eklenmeleri kolaydır; yine de tek başlarına kök nedeni çözmez, erişim kontrolü veya güvenli çıktı kodlamasının yerini tutmazlar.

| Başlık                                    | Temel işlev                                                      | Sınır                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| HSTS (`Strict-Transport-Security`)        | Tarayıcının sonraki bağlantılarda HTTPS kullanmasını ister       | İlk ziyaret için politika henüz bilinmeyebilir; preload ve TLS kurulumu ayrı koşullardır |
| CSP (`Content-Security-Policy`)           | Script ve diğer kaynakların nereden yüklenebileceğini sınırlar   | Bazı XSS etkilerini azaltır; güvenli HTML üretiminin yerine geçmez                       |
| `X-Frame-Options` / CSP `frame-ancestors` | Sayfanın başka origin tarafından frame içine alınmasını sınırlar | Clickjacking azaltımı; meşru gömme ihtiyacıyla uyum gerekir                              |
| `X-Content-Type-Options: nosniff`         | Tarayıcının MIME türünü tahmin etmesini sınırlar                 | İçeriğin güvenli olduğunu kanıtlamaz                                                     |
| `Referrer-Policy`                         | Referer ile gönderilecek bağlamı sınırlar                        | Diğer veri sızıntılarını çözmez                                                          |

HSTS, tarayıcı politikayı öğrendikten sonra HTTP’ye düşürme riskini azaltır. İlk düz HTTP isteğinin korunması, preload gibi ek koşullara bağlı olabilir; HSTS yanlış TLS sertifikasını düzeltmez. CSP kaynakları kısıtlar ve XSS’in etkisini düşürebilir. Ancak fazla geniş kaynak izni korumayı zayıflatır; aşırı katı ve sınanmamış kural da uygulamayı bozabilir. Politika gerçek kaynak akışına göre tasarlanmalı ve test edilmelidir.

Frame kısıtları clickjacking riskini azaltır; `nosniff` içeriğin yanlış türde yorumlanması ihtimalini düşürür; Referrer-Policy dış hedeflere giden referans bilgisini sınırlar. Her başlığın ayrı amacı vardır. Başlık denetiminden geçmek sistemin bütün güvenlik gereksinimlerinin karşılandığı anlamına gelmez.

Üretim yapılandırmasını ayrıca denetleyin: debug kapalı mı, yönetim servisleri gereksiz yere açık mı, depolama izinleri dar mı, varsayılan kimlik bilgileri değiştirilmiş mi? Yanıt başlıklarını incelemek faydalıdır; CSP’nin doğru olduğunu veya sayfanın XSS’siz olduğunu tek başına kanıtlamaz.

[TLS 1.3](topic:tls-13) kanalın gizlilik/bütünlüğünü sağlar; HSTS tarayıcıyı HTTPS kullanmaya yönlendirir. [XSS](topic:cross-site-scripting) için bağlama uygun çıktı kodlama temel önlemdir, CSP ek savunmadır. [CSRF](topic:csrf) ise istek niyetini doğrular; CORS/HSTS bu kontrolün yerini almaz.

**Pedagojik ek:** Her başlık için hangi tehdidi, hangi koşullarda azalttığını ve hangi işlevi bozabileceğini sorun. Başlığın mevcut olması kadar doğru kapsam ve değerle ayarlanması da önemlidir.
