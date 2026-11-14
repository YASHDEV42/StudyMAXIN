> **Kaynak kapsamı:** 1.3.4, `teori-1-1-42.pdf` fiziksel sayfa 25–26 / basılı 14–15. Sayfa 25’in CIA tartışması önceki derste; sayfa 26’da başlayan 1.4 sonraki derstedir. Üniversite otomasyonu örneği ve imzanın koşulları hakkındaki açıklamalar yazar ekidir.

## Giriş yapmış olmak neden her şeye izin vermez?

[CIA hedeflerini](topic:cia-security-goals) tanıdık: yalnız yetkili kişi okuyabilsin, içerik bozulmasın, hizmet kullanılabilsin. Fakat “yetkili kişi” kim? Bir uygulama bunu belirlemek için farklı soruları ayrı ayrı yanıtlamalıdır.

Üniversite sistemine öğrenci hesabınla girdiğini düşün. Sistem senin kimliğini kabul eder; yine de başka birinin notunu değiştirmene izin vermemelidir. **Kimlik doğrulama** (_authentication_) ile **yetkilendirme** (_authorization_) arasındaki fark bu kadar somuttur. İlk kontrolün başarıyla geçilmesi, ikincinin otomatik olarak olumlu yanıtlanacağı anlamına gelmez.

## Kimlik doğrulama: iddia edilen kimliği sınamak

[Kimlik doğrulama](glossary:authentication), öznenin iddia ettiği kişi veya sistem olduğunu doğrulamayı amaçlar. Kaynak parola, passkey ve biyometriyi örnekler. Kimlik yönetimindeki üç faktör sınıfı şunlardır:

| Sınıf                 | Kaynak örnekleri                       | Sınadığı şey                                |
| --------------------- | -------------------------------------- | ------------------------------------------- |
| Bildiğin bir şey      | Parola, PIN                            | Bilgiye sahip olma                          |
| Sahip olduğun bir şey | Telefon, donanım anahtarı, akıllı kart | Bir nesne veya doğrulama aracını bulundurma |
| Olduğun bir şey       | Parmak izi, yüz                        | Biyometrik özellik                          |

[MFA — Çok faktörlü kimlik doğrulama](glossary:multi-factor-authentication), bu sınıflardan en az ikisini birleştirir. Mantık, bir faktörün kaybının tek başına yeterli olmamasıdır. Parola çalınmış olsa bile başka bir sınıftaki kanıt istenir.

**Ek açıklama:** Parola ile PIN’in ikisini sormak, iki ayrı bilgi sormaktır; iki ayrı faktör sınıfı değildir. Aynı sınıftaki kontrol sayısını artırmakla MFA’yı karıştırma. Burada mekanizmanın temelini öğreniyoruz; her yöntemin oltalamaya veya cihaz ele geçirilmesine dayanıklılığı bu kısa kaynak bölümünde ayrıntılandırılmıyor.

## Yetkilendirme: hangi kaynakta hangi işlem?

[Yetkilendirme](glossary:authorization), bir öznenin hangi kaynak üzerinde hangi işlemleri yapabileceğini belirler. Kimlik, kararın girdilerinden biridir; kararın kendisi değildir. Kaynak kavramsal sırayı “önce kimlik, sonra izin” olarak açıklar.

**Yazar örneği:** Öğrenci kendi notunu okuyabilir; öğretim elemanı verdiği dersin notunu girebilir; idari görevli farklı bir kayıt işlemine yetkili olabilir. “Sisteme girdi” bilgisi bu üç kişiye aynı izinleri vermez. Kaynak ve işlem birlikte düşünülmelidir: bir kaydı okumak ile aynı kaydı değiştirmek farklı yetkilerdir. Bu ayrım, gizliliği ve bütünlüğü farklı biçimlerde korur.

## Hesap verebilirlik: sonradan neyi açıklayabiliyoruz?

[Hesap verebilirlik](glossary:accountability), eylemleri belirli bir özneyle ilişkilendirebilmektir. Kaynak bunu denetim kayıtlarıyla bağlar: olaydan sonra ne olduğunu ve kimin yaptığını anlayabilmeliyiz. Bunun için kimlik doğrulama yeterince sağlam, kayıtlar da kurcalamaya karşı korunmuş olmalıdır.

Not örneğine devam edersek, bir değişikliğin yalnızca “başarılı” olduğunu bilmek yeterli değildir. **Ek öğretici açıklama:** Hangi hesabın, hangi kaydı, hangi zamanda değiştirdiğini anlamak olayın yeniden kurulmasını sağlar. Ortak kullanılan tek bir hesap, eylemi bir hesaba bağlayabilir fakat gerçek kişiler arasında ayırt etmeyi zorlaştırır. Bir kayıt mekanizmasının varlığı ile o kaydın güvenilirliği ayrı sorulardır.

AAA kısaltması **Authentication, Authorization, Accounting** açılımıyla kullanılır. Kaynak bunu kimlik doğrulama, yetkilendirme ve hesap verebilirlikle birlikte sunar. Accounting, bu bağlamda eylemlerin kayıt/izleme boyutunu ifade eder; “hesap verebilirlik” daha geniş bir sonuçtur.

## Dijital imza neyi kanıtlar, neyi tek başına çözmez?

[İnkâr edilemezlik](glossary:non-repudiation), eylemin kaynağına ilişkin, sonradan reddetmeye karşı kullanılabilecek kanıt üretme hedefidir. Kaynak dijital imzayı bu hedefin kriptografik aracı olarak anlatır ve sıradan bir uygulama kaydıyla karşılaştırır. Bir uygulama kaydı sistemin tuttuğu kayıttır; dijital imza ise bir anahtarla mesaj arasındaki bağı matematiksel olarak doğrulamayı sağlar.

**Kaynak ifadesine açıklık getiren yazar notu:** İmza doğrulaması, ilgili özel anahtarla imzalanmış içeriğin değişmediğine dair kanıt verir. Bu anahtarın belirli bir kişiye doğru bağlandığına, anahtarın korunmuş olduğuna ve imzalama sürecinin güvenilirliğine de bakılmalıdır. Anahtar çalınmışsa veya yanlış kimliğe bağlanmışsa doğrulanan eşitlik, belirli insanın bilinçli olarak onay verdiğini kendi başına kanıtlamaz. Bu nedenle kaynakta geçen mutlak “sonradan reddedemez” anlatımını koşulsuz bir sonuç olarak ezberleme. Burada hukuki bir sonuç vaat edilmiyor.

Bu ayrım [bütünlük](topic:cia-security-goals) dersindeki uyarıyla tutarlıdır: imza, imzalanan yazılımın iyi niyetli olduğunu söylemez. Hangi anahtarın hangi veriyi imzaladığını söyler; o bağın anlamını güven süreci belirler.

## CIA bir başlangıç modeli

Kaynak, CIA’nin tek model olmadığını hatırlatıp **Parker altılısını — Parkerian hexad** anar. CIA’nin gizlilik, bütünlük ve erişilebilirlik hedeflerine **sahiplik/denetim**, **gerçeklik — authenticity** ve **yararlılık — utility** boyutlarını ekleyerek ayrımları görünür kılar. Kaynak bu kısa bölümde ayrıntıya girmez; bu ders de altılı modeli kapsamlı biçimde işlendi diye sunmaz.

**Ek örnek:** Şifreli dosyanın kopyası elinde durabilir ama anahtarı kaybedersen onu kullanamazsın. “Dosya bende” ile “dosya işime yarıyor” aynı şey değildir. Modeller bu tür ayrımları düşünmemize yardım eder.

Bir sistemi değerlendirirken sırayla sor: Hangi kimlik iddiasını sınadık? Hangi kaynağa hangi izni verdik? Eylemin izini güvenilir biçimde tutabiliyor muyuz? Gerekliyse üçüncü kişilerin denetleyebileceği hangi kanıt var? Bu soruları tek bir “giriş başarılı” mesajına indirgememek, güvenlik tasarımını netleştirir.
