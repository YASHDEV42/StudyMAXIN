## Bölümün katmanları

Bölümün ana ayrımı “kimsin?” ile “ne yapmaya izinlisin?” sorularıdır. Tanımlama hesabı seçer, kimlik doğrulama kanıtı sınar, yetkilendirme kaynak ve işlem bazında izin verir. Parola tahmin ve sızıntıya açıktır; [güvenli saklama](topic:password-storage) çevrimdışı tahmin maliyetini artırır, benzersiz parola ise credential stuffing'i sınırlar. MFA farklı kanıt sınıflarını birleştirir; TOTP kodu gerçek zamanlı aktarılabilir. Passkey origin'e bağlı imza üretir, ancak cihaz, oturum ve hesap kurtarma riskleri devam eder.

SSO/Kerberos kimliği hizmetler arasında yeniden kullanır ve IdP'yi kritik hale getirir. OAuth uygulamaya belirli kaynak erişimi devreder; OIDC kullanıcı kimliğini taşır. JWT çoğunlukla imzalı ama okunabilir bir token biçimidir. Algoritma, imza ve `iss`, `aud`, `exp` claim'leri doğrulanmalıdır. Girişten sonra cookie veya token taşıyan oturum da çalınabilir bir kimlik kanıtıdır. Son aşamada ACL, DAC/MAC/RBAC/ABAC gibi araçlar yetkilendirme yapar; en az yetki ve görevler ayrılığı zararı sınırlar. Zero Trust, her talebi kullanıcı, cihaz, kaynak ve bağlam üzerinden değerlendirmeye çalışır.

Bu konular [önceki kriptografi bilgisini](topic:chapter-three-review) kimlik yönetimiyle birleştirir. Şifreleme, imza ve karma farklı amaçlara hizmet eder; MFA, oturum ve yetkilendirme de birbirinin yerine geçmez.

## Çözümlü uygulamalar

**Entropi karşılaştırması.** 36 sembolden rastgele 8 karakter için `8 × log₂(36) ≈ 41,4` bit; 26 küçük harften rastgele 16 karakter için `16 × log₂(26) ≈ 75,2` bit. İkinci parola daha geniş arama uzayına sahiptir. Bu sonuç yalnızca gerçekten rastgele seçim varsayımında geçerlidir.

**Parola ve güvenlik sorusu MFA mı?** Hayır. İkisi de bilinen şey faktörüdür. Bağımsız bir sahip olunan faktör veya biyometrik kanıt gerekir; fakat SMS gibi kanalların tehditleri de hesaba katılmalıdır.

**JWT imzası atlanırsa.** İmzasız token'a veya doğrulanmamış `role` claim'ine güvenmek, saldırganın kendi rolünü yükseltmesine yol açabilir. Sunucu algoritmayı sabitlemeli, imzayı doğrulamalı ve beklenen issuer, audience ve süre claim'lerini denetlemelidir. `none` değerini kabul etmemelidir.

**Argon2id maliyetini ayarlama.** 5 ms ölçümünü 250 ms hedefe çıkarmak için kaba oran 50'dir. Bu yalnızca başlangıç hesabıdır; gerçek süre donanım, bellek ve paralelliğe bağlıdır. `time_cost` doğrudan 50 ile çarpılmadan önce gecikme ve kapasite ölçülmelidir.

**TOTP tolerans penceresi.** Saat farkında komşu zaman dilimini kabul etmek erişilebilirliği artırır ama kodun denenebileceği aralığı genişletir. Süre dolmadan tekrar kullanım, sunucu aynı kodu kabul etmeye devam ediyorsa mümkün olabilir; tek başına zaman adımı tekrar oynatmayı kanıtlı biçimde engellemez.

**Cookie bayrakları.** Yalnız Secure, yalnızca HTTPS aktarımını sınırlar. HttpOnly yoksa JavaScript cookie'yi okuyabilir; SameSite yoksa çapraz site istekleri cookie taşıyabilir. Uygun üç bayrağı birlikte kullanın ve girişten sonra oturum kimliğini değiştirin.

**Sızmış kimlik bilgileri.** Çok sayıda hesaba az sayıda denemeyle doğru parolayla giriş, credential stuffing göstergesidir. Güçlü parola karması doğru parolayı durdurmaz; benzersiz parola, passkey/MFA, sızıntı denetimi ve bot/risk takibi gerekir.

**RBAC/ABAC seçimi.** “Muhasebeci rolü” gibi sabit görev RBAC ile kolay yönetilir. Cihaz sağlığı, saat ve kaynak hassasiyeti gibi dinamik koşullar ABAC'a uygundur. Zero Trust bağlam değerlendirmesine yakındır, fakat tek başına erişim modeli değildir.

**Bell–LaPadula.** “Gizli” analist “Çok Gizli” raporu okuyamaz (yukarı okuma yok) ve gizli özeti “Herkese Açık” panoya yazamaz (aşağı yazma yok); iki kural gizliliği korur.

Bir sistemi incelerken şu soruları sırayla sorun: Kullanıcı hangi kanıtla doğrulanıyor? İkinci faktör bağımsız mı ve kimlik avına dayanıklı mı? Token kimlik mi yoksa API yetkisi mi taşıyor? Oturum iptal edilebilir mi? Her istek hangi kaynak ve işlem için yetkilendiriliyor? Hangi bağlam yeniden değerlendirilmelidir?

_Teknik niteleme:_ Alıştırmalar prensipleri gösterir. OTP toleransı, token ömrü ve cookie davranışı uygulama ve protokol yapılandırmasına bağlıdır; örnek değerler evrensel güvenlik ayarı değildir.
