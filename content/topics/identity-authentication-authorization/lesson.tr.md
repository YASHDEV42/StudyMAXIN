## Dört soruyu birbirinden ayırmak

Bir kişi “Ben Ayşe’yim” dediğinde bu, sistemdeki bir kimlik (identity) iddiasıdır. Kullanıcı adıyla hangi hesabı kastettiğini belirtmesi tanımlamadır (identification). Sistem iddiayı parola, donanım anahtarı veya başka bir kanıtla sınarsa kimlik doğrulama (authentication) yapar. Doğrulama başarılı olduktan sonra hangi kaynağa hangi işlemin yapılabileceğini belirlemek ise yetkilendirmedir (authorization). Pasaport kontrolü kimliği doğrulamaya benzer; uçağın hangi koltuğuna oturulabileceğini bilet ve kurallar belirler. Kimliği kanıtlamak, her kaynağa erişim izni kazanmak anlamına gelmez.

Bu ayrım güvenli uygulama tasarımının temelidir. Parolası doğru olan kullanıcı yine de başka bir öğrencinin kaydını değiştirememelidir. Sunucu yalnızca oturum açmayı değil, her kaynak ve işlem için yetkiyi denetlemelidir. Aksi durumda kimlik doğrulaması güçlü olsa bile yetki yükseltme veya bozuk erişim denetimi ortaya çıkar. Bu konu [kimlik ve hesap verebilirlik](topic:identity-access-accountability), [CIA güvenlik hedefleri](topic:cia-security-goals) ve [erişim kontrol modelleri](topic:access-control-models) ile bağlantılıdır.

## Kimlik doğrulama faktörleri

Kanıtlar üç ana grupta düşünülür: bilinen sır (parola veya PIN), sahip olunan nesne (telefon, akıllı kart, güvenlik anahtarı) ve kişiye ait biyometrik özellik (parmak izi, yüz). İki parola ya da parola ile güvenlik sorusu iki ayrı faktör sayılmaz; ikisi de “bilinen şey” sınıfındadır ve benzer saldırılarla ele geçirilebilir. Farklı kategorilerden kanıt istemek, bir engelin aşılmasının diğerini otomatik olarak aşmamasını sağlar. Konum ve yazma ritmi gibi sinyaller karar bağlamını güçlendirebilir, ancak her zaman bağımsız kimlik faktörü değildir. Ayrıntı için [çok faktörlü kimlik doğrulamaya](topic:multi-factor-authentication) bakın.

Biyometrik doğrulama 1:1 karşılaştırmadır: örnek, iddia edilen kişinin kayıtlı örneğiyle kıyaslanır. Biyometrik tanımlama 1:N aramadır ve çok sayıda kayıt içinden eşleşme arar; arama kümesi büyüdükçe yanlış eşleşme olasılığı önem kazanır. Sistemler benzerlik eşiği kullanır. Yanlış kabul oranını (FAR) azaltacak kadar katı eşik, gerçek kullanıcıyı reddetme oranını (FRR) yükseltebilir. Dolayısıyla doğruluk, güvenlik ve kullanım kolaylığı birlikte değerlendirilir.

## Biyometri parola değildir

Biyometrik özellikler değiştirilemeyen ve çoğu zaman gizli olmayan özelliklerdir. Bu nedenle parmak izini ağ üzerinden sunucuya parola gibi göndermek iyi bir model değildir. Daha güvenli kullanımda biyometri cihazdan çıkmaz; cihazın korunan özel anahtarını yerel olarak kullanıma açar. Passkey yaklaşımı bu fikri uygular, ancak cihazın ele geçirilmesi, hesap kurtarma ve oturum hırsızlığı gibi riskleri ortadan kaldırmaz. Akıllı kart ve EMV örneğinde kartın ürettiği kriptografik kanıt “sahip olunan şey”, PIN ise “bilinen şey” olabilir.

_Kaynak dışı öğretim notu:_ Havalimanı benzetmesi kavramları sezgisel kılmak için kullanılmıştır. Biyometrik eşiklerin sonucu ürüne, örneklem ve uygulama koşullarına bağlıdır; hiçbir yöntemin hatasız olduğu varsayılmamalıdır.
