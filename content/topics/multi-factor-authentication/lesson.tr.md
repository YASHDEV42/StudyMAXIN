## MFA hangi sorunu çözer?

Parola tek kanıt olduğunda çalınması hesabın açılmasına yetebilir. Çok faktörlü kimlik doğrulama (MFA), farklı kategorilerden kanıt ister: bilinen sır, sahip olunan nesne veya kişiye ait özellik. Bağımsızlık önemlidir; parola ile güvenlik sorusu aynı “bilinen şey” sınıfındadır. MFA saldırganın işini zorlaştırır, fakat her ikinci faktör aynı saldırılara direnmez.

## HOTP ve TOTP'nin üretim mantığı

Tek kullanımlık parola (OTP), tekrar oynatmayı zorlaştıran kısa ömürlü veya tek seferlik bir koddur. HOTP (RFC 4226), paylaşılan gizli anahtar ile artan sayacı HMAC'e verir. HMAC çıktısından standart dinamik kesme (dynamic truncation) ile kısa sayısal kod elde edilir. TOTP (RFC 6238), sayacın yerine zamanı kullanır: `T = ⌊(UnixTime − T0) / X⌋`. Yaygın adım `X = 30` saniyedir. Kurulumda telefon ve sunucu aynı gizli anahtarı edinir; sonra aynı zaman dilimini ve HMAC işlemini kullanarak kodu bağımsız hesaplar. HMAC'in bütünlük ve doğrulama rolü için [mesaj doğrulama kodlarına](topic:message-authentication) bakın.

Telefon saati sunucuyla tam eşleşmeyebilir. Sunucu önceki veya sonraki zaman dilimini de kabul ederek kullanılabilirliği artırabilir; ancak bu, kodun geçerli olduğu pencereyi genişletir. HOTP sayaç senkronizasyonuna, TOTP ise saat uyumuna dayanır. TOTP kodu ağdan ele geçirilirse, saldırgan süre dolmadan kullanabilir; bu yüzden “tek kullanımlık” ifadesi gerçek zamanlı aktarıma karşı mutlak koruma anlamına gelmez.

## İkinci faktörleri tehditlerine göre seçmek

SMS kodları SIM swap ve telekom altyapısına bağlı riskler taşır. Push onayları kullanıcıya isteği açıkça göstermiyorsa, sürekli bildirimle onay aldırtmaya çalışan MFA yorgunluğu saldırısına açık olur. TOTP, telefon numarasına bağımlılığı azaltır; ancak gerçek zamanlı aracı (adversary-in-the-middle) saldırısı kullanıcıdan hem parolayı hem kodu alıp hemen iletebilir. Donanım güvenlik anahtarı ve passkey, doğrulamayı alan adına bağlayarak bu tip kimlik avını yapısal olarak zorlaştırır; mekanizma [FIDO2/WebAuthn](topic:phishing-resistant-authentication) konusunda açıklanır.

MFA, parola saldırılarının etkisini azaltan bir katmandır; yetkilendirme denetiminin, güvenli oturum yönetiminin veya hesap kurtarma sürecinin yerine geçmez. Güçlü bir giriş faktörü olsa bile oturum çerezi çalınabilir ya da kullanıcıya gereğinden fazla izin verilebilir. Tasarım, hesap önemine göre faktör seçimi, yedek erişim ve cihaz güvenliğini birlikte ele almalıdır.

_Öğretim notu:_ RFC'lerdeki kod üretimi HMAC ve kesme adımlarını tanımlar. Zaman toleransı, kabul penceresi ve yeniden kullanım denetimi sunucunun güvenli uygulama kararlarıdır.
