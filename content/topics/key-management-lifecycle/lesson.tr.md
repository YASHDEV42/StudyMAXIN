## Anahtar yaşam döngüsü

Kriptografik algoritmanın gücü, gizli anahtarın korunmasına bağlıdır. Anahtar yönetimi üretimden imhaya kadar tüm süreci kapsar: CSPRNG ile üretim, güvenli saklama, yalnız yetkili kullanıma dağıtma, kullanım, düzenli döndürme ve süresi dolunca güvenli imha. Kaynak koduna veya Git deposuna düz metin sır koymak sık görülen ciddi hatadır. Döndürme, anahtar ele geçirilirse saldırganın kullanabileceği süreyi sınırlar. Eski anahtarın imhası gereklidir; oturum sonunda geçici ECDHE sırrını silmek de aynı ilkenin protokol örneğidir.

## Donanım koruması

HSM (Hardware Security Module), anahtarı kendi içinde üreten, saklayan ve imza gibi işlemleri gerçekleştiren kurcalamaya dayanıklı cihazdır. Tasarım hedefi anahtarın ana sunucu belleğine düz metin olarak çıkmamasıdır. TPM, Secure Enclave ve donanım destekli mobil anahtar depoları benzer yaklaşımı cihazlara taşır. Ancak HSM, yetkisiz uygulamanın modüle imza isteği göndermesini kendiliğinden engellemez; erişim yetkisi ve denetim de gerekir.

## Kök anahtar töreni

Kök CA anahtarı çok sayıda sertifika zincirinin güven temelidir. Çevrimdışı HSM’de saklanır; kullanımı tanıklı, kayda alınan ve betiklerle denetlenen bir törenle yapılır. Split knowledge veya M-of-N yaklaşımında belirli sayıda görevlinin kartı/katkısı olmadan işlem etkinleşmez. Böylece tek çalışanın veya ele geçirilmiş hesabın tek başına anahtarı kullanması zorlaşır. DNSSEC kök anahtar törenlerinde de benzer ortak sorumluluk ilkesi görülür.

Güvenlik, tek bir kişiye kusursuz davranacağı için güvenmekten çok süreç, ayrılmış görevler, denetim ve kurtarma planı kurmaktır.

**Öğretici ek:** HSM anahtarın kopyalanmasını zorlaştırır; doğru yetkilendirme olmadan çağrılan kriptografik işlemleri tek başına önleyemez.

İlişkili konular: [kriptografik rastgelelik](topic:cryptographic-randomness) · [PKI sertifikaları](topic:pki-certificates).
