## Paylaşılan sır yerine siteye bağlı anahtar

Parola, kullanıcıdan alınabilen ve başka yerde yeniden kullanılabilen bir sırdır. TOTP kodu da gerçek zamanlı aracı saldırısında yakalanıp asıl hizmete aktarılabilir. FIDO2/WebAuthn farklı bir kanıt modeli kurar: her hizmet için bir açık/özel anahtar çifti oluşturulur. Özel anahtar cihazda veya passkey deposunda korunur; sunucu açık anahtarı saklar. Bu, [açık anahtarlı kriptografinin](topic:public-key-foundations) kimlik doğrulamaya uygulanmasıdır.

Kayıt töreninde sunucu yeni bir challenge ve relying party bilgilerini gönderir. Tarayıcı ve kimlik doğrulayıcı, sitenin bağlamında bir anahtar çifti üretir; açık anahtar hesaba kaydedilir, özel anahtar cihazdan çıkarılmaz. Girişte sunucu yeni ve tahmin edilmesi zor bir challenge yollar. Kullanıcı yerel onay verir; cihaz challenge ve istemci verilerini özel anahtarla imzalar. Sunucu imzayı kayıtlı açık anahtarla doğrular ve challenge, origin, relying party ve kullanıcı doğrulama koşullarını denetler. Challenge tazeliği tekrar oynatmayı engellemeye yardım eder.

## Origin bağı ve güven sınırları

WebAuthn yanıtındaki istemci verisi, tarayıcının ziyaret edilen origin bilgisini içerir; imza bu bilgiye ve challenge'a bağlanır. Sahte benzer alan adı, gerçek site için geçerli imza alamaz. Kullanıcıdan taşınabilir bir sırrı sahte forma girmesi istenmediğinden, sıradan kimlik avına karşı güçlü bir tasarım özelliği elde edilir. TOTP'nin bu korumayı sağlamadığı [MFA](topic:multi-factor-authentication) ile karşılaştırıldığında fark belirgindir.

Bu özellik bütün hesap ele geçirme yollarını yok etmez. Ele geçirilmiş uç cihaz, oturum çerezi hırsızlığı, kötü tasarlanmış hesap kurtarma veya güvenilen hizmet hesabının ele geçirilmesi ayrı risklerdir. Cihaza bağlı passkey ile cihazlar arasında eşitlenen passkey'in tehdit modeli aynı değildir; eşitlenen türde bulut hesabı ve senkronizasyon zinciri de korunmalıdır. Kaybolan cihaz için yedek erişim planı gerekir.

WebAuthn, web sitesi ile tarayıcı arayüzünü; CTAP, istemci ile kimlik doğrulayıcı arasındaki iletişimi tanımlar. Passkey, kullanıcıya sunulan FIDO kimlik bilgisidir. Uygulama, yalnızca yanıt alanlarını okumakla yetinmemeli; challenge, beklenen origin/rpId, imza ve gerekli kullanıcı doğrulama bayraklarını sunucu tarafında doğrulamalıdır. Konu [dijital imzalar](topic:digital-signatures) ve [PKI](topic:pki-certificates) ile ilişkilidir, fakat sertifika zinciri yerine kayıtlı açık anahtar ve origin bağını kullanır.

_Kaynak düzeltmesi:_ Ders notundaki “oltalamayı imkânsız kılar” ifadesi, origin farklı olduğunda WebAuthn kimlik bilgisinin yeniden kullanılamamasını anlatan pedagojik kısaltmadır. Bütün hesap ele geçirme yöntemlerinin imkânsızlaştığı anlamına gelmez.
