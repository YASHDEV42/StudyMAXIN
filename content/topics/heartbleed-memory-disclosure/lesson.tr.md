## Matematik değil, uygulama hatası

Heartbleed (CVE-2014-0160), 2014’te OpenSSL’in TLS heartbeat işlevinde bulunan bir bellek okuma açığıydı. RSA, AES veya TLS’in matematiksel tasarımı kırılmadı. Heartbeat, bağlantının canlı olduğunu sınamak için gönderilen küçük verinin geri yankılanmasını sağlar.

Mesajda tür, iki baytlık `payload_length`, gerçek payload ve en az 16 bayt padding bulunur. Uzunluk alanı gönderenin beyanıdır; alıcı bunu gerçek kayıt boyutuyla karşılaştırmalıdır. Etkilenen kod uzunluğu okuyor, bu boyda yanıt tamponu ayırıyor ve belirtilen kadar baytı kopyalıyordu. Gerçek payload bu kadar uzun değilse kopyalama mesajın sınırını aşarak komşu süreç belleğini okuyordu.

## Hatalı beyanın sonucu

Kaynağın örneğinde TLS kaydının heartbeat gövdesi yalnızca üç bayttır: istek türü ve `0x4000` (=16384) uzunluk iddiası; gerçek payload yoktur. Sunucu 16384 baytı geri göndermeye çalışırken yakındaki bellek içeriğini de sızdırabilir. Başka oturumlara ait çerez, parola veya anahtar malzemesi açığa çıkabilir. 16 bitlik uzunluk alanı istek başına en çok yaklaşık 64 KiB sızıntı olanağı verir; istek yinelenebilir.

Düzeltme önce başlık ve zorunlu padding’in gerçekten bulunduğunu, ardından `başlık + payload + padding` toplamının alınan kayıt sınırını aşmadığını denetler. Uymayan mesaj atılır. Güvenlik kuralı geneldir: karşı tarafın bildirdiği boyut doğrulanana kadar yalnızca iddiadır.

## Neden yıkıcıydı?

Sızıntı geçerli görünen TLS trafiğinin içinde oluşabildiğinden günlüklerde fark edilmesi zor olabilirdi. Açık ortaya çıkınca anahtarların sızmış olabileceği varsayımı sertifika ve parola yenileme kararlarını etkiledi. Heartbleed, güvenliğin algoritma, protokol, kütüphane, rastgelelik, anahtar saklama ve yapılandırma halkalarının tümüne bağlı olduğunu gösterir.

**Öğretici ek:** Etkilenme, belirli OpenSSL sürümleri ve heartbeat kullanımına bağlıydı. Bu tarihsel açıklama güncel sistemlerdeki sürüm denetiminin yerine geçmez.

İlişkili konular: [TLS 1.3](topic:tls-13) · [anahtar yönetimi](topic:key-management-lifecycle).
