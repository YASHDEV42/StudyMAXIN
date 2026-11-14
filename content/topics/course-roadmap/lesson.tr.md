## Dersin Yol Haritası: Temellerden Operasyonlara

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, bölüm 1.12, `teori-1-43-89.pdf`, fiziksel sayfa 7 (basılı sayfa 38); 1.11’in sonu ile 1.13’ün başlangıcı arasında. Aşağıdaki çizelge haftaları ve başlıkları kaynakta verildiği biçimde korur; aralarındaki bağlantılar ek öğretim yorumudur.

## Temellerden uygulama alanlarına

Güvenlik zihniyeti ve ortak sözlük kurulduktan sonra kaynak, dersin kalan haftaları için bir yol haritası sunar. Bu, tek başına sınav konusu listesi değildir; her haftanın bir öncekinin tüm ayrıntılarını bitirmeden başlayamayacağı anlamına da gelmez. Planın gösterdiği, güvenliğin farklı katmanlara ve çalışma biçimlerine yayıldığıdır: matematik ve algoritmalar, kimlik ve yetki, uygulamalar ve ağlar; ardından operasyon, risk ve yönetişim.

| Haftalar | Kaynaktaki başlık                                   | Belirtilen konular                                                  |
| -------- | --------------------------------------------------- | ------------------------------------------------------------------- |
| 2–3      | Kriptografi                                         | Simetrik ve asimetrik kriptografi, PKI, kuantum sonrası kriptografi |
| 4        | Kimlik ve erişim                                    | Passkeys, OAuth, sıfır güven                                        |
| 5–6      | Web güvenliği                                       | OWASP Top 10, API güvenliği                                         |
| 7–8      | Ağ ve sistem güvenliği                              | Bellek güvenliği, sistem sertleştirme (hardening)                   |
| 9–10     | Kötücül yazılım, bulut ve konteyner güvenliği       | Kötücül yazılım analizi/savunması, bulut ve konteynerler            |
| 11–12    | Gizlilik teknolojileri ve yapay zekâ güvenliği      | Gizlilik teknolojileri, ardından güvenlik ve yapay zekâ             |
| 13–14    | Saldırı/savunma operasyonları, yönetişim ve gelecek | Güvenlik operasyonları, yönetişim, ileriye bakış                    |

## Başlıklar nasıl birbirine bağlanıyor?

2–4. haftalar veriyi anahtarlarla korumaktan, sisteme kimin girdiğini ve ne yapabildiğini belirlemeye geçer. 5–8. haftalar uygulama, API, ağ ve hizmetleri çalıştıran sistemleri ele alır. Bu dizilim, [şifrelemenin](glossary:encryption) tek başına yeterli olmadığını gösterir: uygulama doğru anahtarı yanlış kullanabilir veya kullanıcıya gereğinden fazla yetki verebilir.

9–12. haftalarda farklı tehdit ve ortamlar öne çıkar: kötücül yazılım, bulut/konteyner, mahremiyet ve yapay zekâ. 13–14. haftalar ise güvenliğin işletilmesine ve yönetilmesine yaklaşır. Olaylar için izleme ve müdahale, kurum içinse sorumluluklar, politikalar ve kabul edilebilir risk gerekir. Böylece [güvenlik yönetişimi](glossary:security-governance) teknik çalışmadan kopuk bir idari başlık olarak kalmaz; önceki risk ve kültür konularına bağlanır.

Kaynak, PKI, OAuth, OWASP ve hardening gibi bazı başlıkları yalnızca haftalık konu olarak sayar. Bu yol haritası onların mekanizmasını öğretmez; ayrıntı ilgili haftada ele alınır. Bu yüzden tabloyu dersin yönünü ve tekrar planını görmek için kullanın, gelecekteki konuların içeriğini varsaymak için değil.

**Ek öğretim yorumu:** Gerçek bir güvenlik sorunu haftalık sınırlara uymaz. Örneğin yazılım güncelleme zinciri kriptografiye, kimliğe, web ve bulut altyapısına, yönetişime aynı anda dokunabilir. Haftalara bölmek öğrenmeyi kolaylaştırır; önceki en az yetki, tehdit modelleme ve risk yönetimi ilkeleri farklı konularda da işe yarar.
