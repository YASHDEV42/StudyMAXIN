## Rastgelelik neden güvenliğin temelidir?

Güçlü AES anahtarı tahmin edilebilir biçimde üretilmişse saldırganın işi kolaylaşır. **Entropi (entropy)**, saldırganın bir değeri tahmin etmekteki belirsizliğini ifade eder. Bilgisayarlar deterministiktir; işletim sistemleri donanım gürültüsü ve olay zamanlamaları gibi kaynaklardan başlangıç entropisi toplar, bunu güvenli bir üreteçte kullanır.

**Kriptografik olarak güvenli sözde rastgele sayı üreteci (CSPRNG)**, öngörülemez bir seed’den uzun çıktılar üretir. Güvenli tasarımda çıktılar gelecek değerleri tahmin etmeyi veya geçmişi geri hesaplamayı kolaylaştırmamalı; üreteç yeni entropiyle beslenebilmelidir. Uygulama işletim sistemi arayüzünü kullanır: Linux’ta `getrandom` veya `/dev/urandom`; Python’da `secrets` ya da `os.urandom`; Java’da `SecureRandom`.

Python `random` modülü ve Mersenne Twister simülasyon/oyunlar içindir. Kriptografik sır üretiminde iç durumu tahmin edilebilir olabilir. Zaman damgası, işlem kimliği veya sayaçtan kendi “rastgele” değerinizi üretmeyin.

## Hangi değerler güvenli rastgelelik ister?

Gizli anahtarlar, nonce/IV, parolalara ait salt’lar ve oturum/sıfırlama token’ları. Salt gizli olmayabilir ama her parola için benzersiz olmalıdır. Nonce’un gizliliği gerekmeyebilir; yine de kipin benzersizlik koşulu zorunludur. Örneğin GCM’de aynı anahtar altında nonce tekrarı ciddi sızıntılara yol açar.

Cloudflare’ın lav lambası duvarı, fiziksel kaosu ek entropi olarak kullanmanın öğretici bir örneğidir; her sistemin bu duvara ihtiyacı olduğu iddiası değildir. Pratik kural, kendi üreticinizi icat etmek yerine platformun CSPRNG’sini kullanmaktır.
