## Parola gücü ve entropi

Parola güvenliği, rastgeleliği hatırlama zorluğuyla dengelemeye çalışır. Uzunluğu `L` olan ve her konumu gerçekten rastgele biçimde `N` sembolden seçilen bir parolanın aday sayısı `N^L`, entropisi ise `H = L × log₂(N)` bittir. Örneğin 36 sembollü bir kümeden seçilen 8 karakter yaklaşık `8 × log₂(36) ≈ 41,4` bit; yalnız küçük harflerden seçilen 16 karakter yaklaşık `16 × log₂(26) ≈ 75,2` bit verir. Daha dar alfabe daha uzun kullanıldığında daha geniş alfabeli kısa paroladan güçlü olabilir.

Bu hesap, her karakterin bağımsız ve rastgele seçildiğini varsayar. İnsanların oluşturduğu parolalar bu varsayımı çoğu zaman karşılamaz: büyük harfi başa, rakamı sona koymak gibi kalıplar saldırganların tahmin sırasını iyileştirir. Bu nedenle yalnızca büyük/küçük harf, sayı ve sembol şartı aramak gerçek entropiyi garanti etmez. Uzun ve her hizmette farklı parolalar üretmek için parola yöneticisi kullanmak, hatırlanabilirlik yükünü azaltır. Parolanın veritabanında nasıl korunacağını [parola saklama](topic:password-storage) konusu ele alır; güçlü saklama, parolanın başka yerde tekrar kullanılmasını engellemez.

## Saldırı türleri ve doğru savunma

Kaba kuvvet saldırısı olası kombinasyonları sistematik dener. Sözlük saldırısı yaygın veya sızmış parolaları önce dener; kural tabanlı varyantlar bunlara yıl, büyük harf veya sembol ekler. Kimlik bilgisi doldurma (credential stuffing), başka bir hizmette sızan doğru kullanıcı adı/parola çiftlerini yeni hizmetlerde otomatik sınar. Parola püskürtme (password spraying) ise tek veya az sayıda yaygın parolayı çok sayıda hesaba dener; böylece tek hesapta art arda hatalı denemelerden kaçınır. Bu iki saldırının yönü farklıdır.

Kimlik avı, tuş kaydedici ve gerçek zamanlı aracı saldırısı parolayı tahmin etmek yerine kullanıcıdan veya cihazdan alır. Dolayısıyla uzunluk tek başına bunlara karşı korumaz. Parola yöneticisi benzersiz parola ve sahte alan adında otomatik doldurmama yoluyla yardımcı olabilir; passkey alan adına bağlı imzayla daha güçlü bir savunma sağlar. [MFA](topic:multi-factor-authentication) çalınan parolanın tek başına yeterli olmasını önler; ancak TOTP kodu da gerçek zamanlı oltalamada aktarılabilir. Passkey ve donanım anahtarı bu yüzden ayrı değerlendirilmelidir.

İyi politika kullanıcının gerçek davranışına göre tasarlanır: uzunluğu destekle, sızmış parolaları reddet, kopyala-yapıştır ve parola yöneticilerine izin ver, gereksiz sıklıkta değiştirmeyi ve tahmin edilebilir karmaşıklık kurallarını dayatma. Hız sınırlama ve risk sinyalleri çevrimiçi denemeleri azaltır; benzersiz parolalar kimlik bilgisi doldurmanın etkisini keser; oltalamaya dayanıklı doğrulama ise çalınan sırrın kullanılmasını zorlaştırır.

_Öğretim notu:_ Entropi formülü olasılık uzayını açıklar; gerçek kırılma süresi değildir. Çevrimiçi hız sınırı, çevrimdışı parola karması ve insan seçimi farklı saldırı koşullarıdır.
