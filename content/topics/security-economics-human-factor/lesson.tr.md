## Güvenlik Ekonomisi ve İnsan: Saldırıyı Değersiz Kılmak

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.10 ve 1.10.1–1.10.3, `teori-1-43-89.pdf`, fiziksel sayfa 2–5 (basılı sayfa 33–36). Ek öğretim açıklamaları ayrıca belirtilmiştir.

## Kaynakları sınırlı iki tarafın hesabı

Güvenlik yalnızca kriptografi ve koddan ibaret değildir. Aynı zamanda ekonomik ve insani bir sorundur: saldırganın da savunmacının da zamanı, bütçesi ve kaynakları sınırlıdır; her taraf diğerinin hesabını değiştirmeye çalışır. Kaynak, Kevin Mitnick’i sosyal mühendisliğe örnek verir. İhlallerin hepsi teknik deha gerektirmez; ikna edici bir telefon, pahalı bir güvenlik duvarının çevresinden dolaşabilir. PDF’deki fotoğraf ve açıklama bir biyografi örneğidir, teknik kanıt değildir.

Basitleştirilmiş bir rasyonel saldırgan modelinde saldırının başarı olasılığı `p`, başarı hâlindeki kazanç `V`, saldırganın maliyeti `Ca` olsun. Beklenen net kazanç şöyle yazılır:

`E[kazanç] = p × V − Ca`

`p × V > Ca` ise modelde net kazanç pozitiftir. Saldırının getiri oranı **ROA — Return on Attack** ise:

`ROA = (p × V) / Ca`

`ROA > 1`, modelin varsayımlarına göre saldırının ekonomik getirisinin maliyetini aştığını; `ROA < 1` ise beklenen getirinin maliyetin altında kaldığını gösterir. Bu **basitleştirilmiş bir karar modelidir**; her saldırganı kusursuz biçimde rasyonel veya yalnızca maddi çıkarla hareket ediyor saymaz. Olasılıklar, değer ve maliyet tahminlerdir.

Savunmacı oranı üç değişkenden etkileyebilir:

1. **`p`’yi düşürmek:** örneğin [çok faktörlü kimlik doğrulama](glossary:multi-factor-authentication) gibi kontrollerle başarı ihtimalini azaltmak.
2. **`V`’yi düşürmek:** gereksiz veriyi toplamamak veya saklamamak; tokenizasyon ya da şifrelemeyle çalınan verinin saldırgana değerini azaltmak.
3. **`Ca`’yı yükseltmek:** saldırıyı daha uzun, pahalı veya riskli kılmak. Saldırganın hedefe ulaşmak için harcadığı çabaya **iş faktörü — Work factor (İngilizce kaynak terimi; Türkçe: iş faktörü)** denir.

Kaynağın hesabında bir hesabı ele geçirmenin değeri `V=1000` birimdir. Yalnız parola varken `p=0,5` ve `Ca=100` varsayılır; `ROA=5` çıkar. MFA sonrasında örnek `p=0,05` ve `Ca=500` kabul eder; `ROA=0,1` olur. Hesap ele geçirilemez hâle gelmemiştir; verilen varsayımlarla saldırı daha az çekici olmuştur. Pratik amaç çoğu zaman kusursuz bir kale kurmak değil, saldırıyı zahmete değmeyecek hâle getirmektir.

Aynı kaynak kıtlığı savunmacı için de geçerlidir. Önceki bölümdeki [ROSI](glossary:return-security-investment), risk azalmasını kontrol maliyetiyle karşılaştırmaya yardım eder. Savunmacı saldırganın ROA’sını azaltırken savunma yatırımlarının getirisini de gözetir. Bunlar ilişkili ama farklı ölçülerdir: ROA saldırganın getiri hesabı, ROSI güvenlik yatırımının savunmacıya getirisidir.

## Sosyal mühendislik: sistemden önce insanı hedef almak

**Sosyal mühendislik — Social engineering (Türkçe: sosyal mühendislik)**, doğrudan teknik açıktan çok insan psikolojisinden yararlanan saldırı sınıfıdır. Bir insanı kandırmak bazen sistemi kırmaktan daha ucuz ve kolaydır. Türleri ayırt etmek, hangi davranışın hedeflendiğini fark etmeyi sağlar:

- **Oltalama — Phishing:** Meşru görünen e-posta, mesaj veya siteyle kimlik bilgisi almaya ya da zararlı bağlantı açtırmaya çalışma.
- **Hedefli oltalama — Spear phishing:** Belirli kişi ve bağlama göre hazırlanmış mesaj.
- **Balina avı — Whaling:** Üst düzey yöneticileri hedefleyen oltalama.
- **SMS oltalaması — Smishing:** Kısa mesaj üzerinden kandırma.
- **Sesli oltalama — Vishing:** Telefon veya sesli arama üzerinden kandırma.
- **Bahane uydurma — Pretexting:** Güven kazanmak için inandırıcı senaryo kurma; örneğin “bilgi işlemden arıyorum.” Kaynağın Mitnick örneği bu türe yakındır.
- **Yemleme — Baiting:** Merak veya açgözlülükten yararlanma; kaynak, “maaş bordroları” etiketli virüslü USB örneğini verir.
- **Karşılıklılık — Quid pro quo:** Yardım veya hizmet karşılığında bilgi ya da erişim isteme.

Kaynak, sosyal mühendislerin kullandığı psikolojik etkenleri şöyle sıralar: **otorite** (“genel müdür istedi”), **aciliyet** (“hesap bir saatte kapanacak”), **kıtlık** (“son üç fırsat”), **sosyal kanıt** (“herkes yaptı”), **sempati/yardımseverlik** ve **tanıdık bir isim ya da markaya duyulan güven**. Bunlar hızlı ve otomatik kararları tetiklemeye çalışır. Bir mesaj aniden korku veya aceleyle hareket etme dürtüsü yaratıyorsa durup “Bu istek neden beni şimdi harekete zorluyor?” diye sormak işe yarar.

Kaynak ayrıca büyük dil modellerinin kişiye özel ve doğal görünen mesajlar hazırlamayı, ses klonlamanın da vishing aramalarını daha inandırıcı kılmayı kolaylaştırabileceğini söyler. Bu, kaynakta anlatılan araç eğilimidir; ölçülmüş başarı oranı veya her kusursuz mesajın sahte olduğu iddiası değildir. Kaynağın önerdiği davranış **ikinci kanaldan doğrulamadır**: telefonu kapatıp bilinen resmî numarayı aramak veya isteği kurumun bağımsız kanalından teyit etmek.

## Güvenlik kültürü teknik kontrolleri günlük davranışa taşır

**Güvenlik kültürü — Security culture**, güvenliğin yöneticiden stajyere kadar herkesin paylaştığı sorumluluk olmasıdır. PDF’deki görsel bir Güvenlik Operasyon Merkezi’ni (SOC) gösterir. Alt yazı, teknolojinin önemli olduğunu; ancak uyarıları izleyen, yorumlayan ve zamanında müdahale eden insanlarla kültürün savunmanın omurgasını oluşturduğunu vurgular.

Sağlıklı kültürde çalışan şüpheli e-postayı ceza korkusu olmadan bildirebilir; hata yaptığında gizlemek yerine hemen haber vermesi desteklenir. Farkındalık eğitimi, oltalama tatbikatları ve açık bildirim kanalı bu davranışı besler. Suçlayıcı kültür ise hataların saklanmasına yol açabilir; küçük bir olay böylece büyüyebilir. İnsan tek başına “en güçlü” ya da “en zayıf” halka değildir; kurumun verdiği teşvikler onun nasıl davranacağını etkiler.

Kaynak, Bruce Schneier’in **“Güvenlik bir ürün değil, bir süreçtir”** sözünü bölümün özeti olarak kullanır. Sistemler ve tehditler değiştiği için güvenlik bir kere satın alınıp rafa kaldırılan ürün değildir; tekrar tekrar gözden geçirilen yaşayan bir uygulamadır. Bu fikir önceki [risk yönetimi](glossary:risk-treatment) ve [tehdit aktörü](glossary:threat-actor) konularını da birleştirir: kontroller, risk ve hedef değiştikçe gözden geçirilmelidir.

**Ek öğretim notu:** ROA örneğindeki `p`, `V` ve `Ca` eğitim varsayımlarıdır. Varsayımlar değişirse sonuç değişir; gerçek bir kurumun riski bu örnek sayılarla ölçülemez.
