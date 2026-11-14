## Sınav özeti

- FIDO2: WebAuthn (web sitesi–tarayıcı) + CTAP (istemci–kimlik doğrulayıcı).
- Kayıt: taze challenge ve RP bağlamı → anahtar çifti üretimi → açık anahtarı hesaba kaydetme; özel anahtar cihazda kalır.
- Giriş: yeni challenge → yerel kullanıcı onayı → challenge/origin verisini özel anahtarla imzalama → sunucuda açık anahtarla doğrulama.
- Origin/rpId bağı, başka alan adında kimlik bilgisinin kullanılmasını önleyerek kimlik avına dayanıklılık sağlar.
- Passkey sunucusu parola doğrulama sırrı yerine açık anahtarı tutar.
- TOTP gerçek zamanlı aracı saldırısında aktarılabilir; passkey bunu alan adına bağlayarak azaltır.

### Sınırlar ve kontroller

- Sunucu challenge tazeliğini, beklenen origin/rpId'yi, imzayı ve kullanıcı doğrulama gereğini kontrol etmelidir.
- Uç cihaz ele geçirilmesi, çalıntı oturum, zayıf hesap kurtarma ve senkronizasyon hesabı riski sürer.
- Cihaza bağlı passkey: cihaz kaybına karşı yedek gerekir. Eşitlenen passkey: bulut hesabı güvenliği önemlidir.
- “Oltalamaya dayanıklı” ifadesi, her saldırının imkânsız olduğu anlamına gelmez.
