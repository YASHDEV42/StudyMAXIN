> **Kaynak kapsamı:** 1.1.1–1.1.2 ve 1.2’den önceki etik uyarı; `teori-1-1-42.pdf` fiziksel sayfa 16–18 / basılı sayfa 5–7. Sayfa 16’daki Log4Shell sonu ve sayfa 18’de başlayan tarihçe hariçtir. Otopark kutusu ve uyarı görsel olarak okunmuştur. Gereksinim örnekleri, test kanıtının sınırları ve fail-safe/fail-closed ayrımı yazar açıklamalarıdır.

## Çalışması ile kötüye kullanılamaması ayrı sorular

Bir not sisteminin doğru öğrenciye doğru notu göstermesi işlevsel bir başarıdır. Ancak farklı kayıt kimliği gönderildiğinde başka öğrencinin verisini göstermemesi de gerekir. İkinci soruyu sormadan yalnız ilk davranışı denemek, güvenliğe ilişkin önemli bir boşluk bırakır.

Kaynak, **pozitif gereksinim** ile **negatif gereksinim** ayrımını böyle kurar. Pozitif gereksinim sistemin yapacağı işi, negatif gereksinim yapmaması gereken davranışı söyler. **Yazar örneği:** “Öğrenci kendi notunu görebilmeli” ile “öğrenci başka birinin notunu değiştirememeli” aynı gereksinim değildir. Başarılı bir meşru kullanım, yasak kullanımın engellendiğini tek başına kanıtlamaz.

Kaynak sıradan mühendisliği doğru girdi/doğru çıktı, güvenlik mühendisliğini kötü niyetli girdi/istenmeyen davranış üzerinden karşılaştırır. **Ek açıklama:** Bu, diğer mühendisliklerin hata veya emniyet düşünmediği iddiası değildir. Güvenlikte özellikle dikkat çeken unsur, karşı tarafın korumayı görüp davranışını değiştirebilmesidir.

## Rakip, koşullara uyum sağlar

Rüzgâr veya deprem, kurduğumuz savunmayı inceleyip yeni bir yöntem seçmez. Saldırgan ise motive, düşünebilen ve uyarlanan bir aktör olabilir. Bir yol kapanınca başka bir bağımlılığa, kurtarma sürecine veya insan kararına yönelebilir. Bu nedenle güvenlik bir defa çözülüp kaldırılan bir problem değildir.

Kaynak **savunma asimetrisini** vurgular: belirli bir hedefe ulaşmak için saldırgana bir uygun yol yetebilir; savunan ilgili yolların tamamını değerlendirmeye çalışır. “Savunan %99 başarılı olsa da kalan %1 yeter” benzetmesi, kapatılmamış bir yolun önemini anlatır. **Yazar açıklaması:** Bu oran gerçek bir saldırı olasılığı hesabı veya her durumda saldırganın kazanacağı matematiksel garanti değildir. Hangi hedef ve hangi yolları modellediğimiz belirtilmelidir.

[Log4Shell](topic:log4shell-trust-boundaries) bunun iyi örneğidir: uygulama kullanıcının metnini başarıyla kaydederken, kütüphanenin sonraki yorumlaması istenmeyen davranış yaratabiliyordu. İşlevin çalışması, güven sınırlarının korunduğu anlamına gelmedi.

## Güvenlik zihniyetinin üç refleksi

[Güvenlik zihniyeti — security mindset](glossary:security-mindset), sistemin amaç dışı kullanıma nasıl tepki vereceğini düzenli biçimde sormaktır. Kaynak bunu ezberlenecek saldırı listesi olarak değil, üç alışkanlık olarak anlatır:

1. **Varsayımları sorgula.** “Kullanıcı bu alanı değiştirmez”, “bu adım her zaman sırayla yapılır” veya “iç ağdaki taraf güvenilirdir” gibi kabul edilen önermeyi görünür kıl.
2. **Sınır durumlarını incele.** Girdi çok büyük, çok küçük, boş, negatif, tekrarlı veya beklenmeyen biçimdeyse ne olur? Başarılı sıradan örneklerin dışında neyin farklı işlendiğini ara.
3. **Güven ilişkilerini haritala.** Bileşen, kişi ve tedarikçilerden hangisine ne için güveniliyor? Birinin verdiği veri hangi yetkiyle kullanılacak?

Bu üçü birbirini besler. Önce varsayımı bulur, sonra onu bozabilecek durumu düşünür, ardından etkisinin hangi ilişki üzerinden yayıldığını takip ederiz. [Tehdit modellemedeki](topic:threat-modeling-stride) DFD ve güven sınırları, bu alışkanlığı kaydedilebilir bir yöntem hâline getirir.

## Otopark örneği, bir istismar tarifi değil bir tasarım incelemesi

Kaynağın otoparkında ilk 15 dakika ücretsizdir. Normal senaryo giriş, kısa iş ve çıkıştır. Güvenlik bakışı, iş kuralının hangi kimliğe ve hangi zaman/okuma varsayımına dayandığını inceler:

| Kaynağın sorusu                                            | Açığa çıkardığı varsayım                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| 14. dakikada çıkıp hemen dönmek nasıl sayılır?             | Tekrarlanan ziyaretlerin kimlik ve süreyle ilişkilendirilmesi |
| Aynı plaka arka arkaya tanınır mı?                         | Kayıtların birleştirilmesi ve tekrarın yorumu                 |
| Plaka okunamazsa ne yapılır; kirli plaka nasıl ele alınır? | Eksik kimlik verisinde hata politikası                        |
| İki araç çok yakın geçerse sistem ikisini ayırabilir mi?   | Algılama ile tek araç/tek izin ilişkisinin doğruluğu          |

Buradaki amaç, başkasının otoparkında bunları denemek değildir. Soruları tasarım, simülasyon veya izinli test kapsamında yanıtlamak, işlevin arkasındaki varsayımı ortaya çıkarır. Bir sensörün “okuma başarısız” cevabı yalnız teknik bir hata değildir; sonrasında seçilecek davranış güvenlik kararına dönüşür.

## Hata durumunda hangi tarafa düşüyoruz?

Kaynak üç değerlendirme sorusuyla alışkanlığı özetler: **Sistem neyi varsayıyor? Bu varsayım nasıl yanlışlanabilir? Yanlışlanınca güvenli mi tehlikeli mi davranıyor?** Burada [fail-closed — hata durumunda erişimi kapatma](glossary:fail-closed) önemli bir örnektir. Yetkiyi doğrulayamayan bir kayıt servisi, işlemi otomatik izinli sayarsa hata izin mekanizmasını aşmanın yoluna dönüşür. İzin vermeyi durdurmak bu durumda güvenli tercihtir; bu örnek yazar ekidir.

**Kaynaktaki terimleri ayıran açıklama:** Fail-closed, erişim kontrolünün başarısızlıkta kapalı davranışını anlatır. **Fail-safe**, genel olarak zarar açısından güvenli duruma geçmeyi amaçlar; her fiziksel ortamda kapıyı kilitlemekle eş anlamlı değildir. İnsan güvenliğinin önemli olduğu bir çıkış düzeninde “her hatada kilitle” yaklaşımı tehlikeli olabilir. Güvenli durum, korunacak hedefe ve sisteme göre tanımlanmalıdır. Kaynağın otopark benzetmesi, bu bağlam ayrımıyla okunmalıdır.

## Test bulgusu ile genel güvenceyi ayır

Normal testler beklenen durumları, güvenlik testleri ayrıca kötü niyetli, beklenmeyen ve sınır durumları araştırır. Bir istenmeyen davranış bulmak, bir güvenlik iddiasını çürütmeye yetebilir. Ama denediğimiz örneklerde kusur bulmamak, denenmemiş tüm durumlarda yokluğunu ispatlamaz. Kaynağın “yokluğu kanıtlamak daha zordur” vurgusu bu farkı öğretir.

**Ek açıklama:** Belirli bir model ve varsayım altında daha güçlü kanıt üretmek mümkündür; bu kısa bölüm böyle bir biçimsel ispat yaptığını iddia etmez. Testin kapsamını ve bilmediğimiz alanı söylemek, “bütün testler geçti, tamamen güvenliyiz” cümlesinden daha doğru bir sonuçtur.

Kaynağın kapanış uyarısı düşünmekle izinsiz müdahale etmeyi ayırır: öğrenilenleri yalnız kendine ait veya açıkça izin verilmiş sistemlerde uygula. Bu, dersin savunma amacıyla birlikte ele alınır. Bir kontrolü bozabilecek durumu zihinde kurmak, gerçek bir sisteme müdahale izni vermez.
