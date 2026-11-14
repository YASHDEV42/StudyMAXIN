## İki kuantum algoritması, iki farklı etki

Kuantum tehdidi simetrik ve açık anahtarlı kriptografide aynı değildir. **Grover algoritması**, simetrik anahtar aramasını yaklaşık karekök kadar hızlandırır. Klasik olarak `2^128` olasılık gerektiren arama kabaca `2^64` kuantum adımına iner. Bu teorik karşılaştırma gerçek donanım maliyetini bütünüyle anlatmaz; yine de güvenlik payını azaltır. AES-128’in kuantum arama karşılığı kabaca AES-64 düzeyine yaklaşırken AES-256, bu basit modelde yaklaşık AES-128 klasik güvenlik payı sunar. Savunma, simetrik anahtar uzunluğunu artırmaktır; sonuç AES-256’nın bugün kırıldığı değildir.

**Shor algoritması** farklı bir sınıfı etkiler: RSA’nın çarpanlara ayırma, DH ve ECC’nin ayrık logaritma varsayımları. Yeterince büyük ve kararlı kuantum bilgisayar bu matematik problemlerini verimli çözebilirse, mevcut açık anahtarlı sistemler için yalnızca anahtarı büyütmek çözüm olmaz; farklı matematiksel temellere geçmek gerekir. NIST’in ML-KEM, ML-DSA ve SLH-DSA gibi standartları bu post-kuantum geçişine örnektir; burada yalnızca bağlam olarak anılır.

## “Şimdi topla, sonra çöz”

Kuantum bilgisayarlar bugün RSA-2048’i kıracak kapasitede değildir. Ancak saldırgan uzun ömürlü sırları içeren şifreli trafiği şimdi toplayıp, ileride yeterli donanım çıkarsa çözmeye çalışabilir. Bu **harvest now, decrypt later** tehdidi, verinin gizli kalması gereken sürenin olası geçiş takviminden uzun olduğu durumlarda hazırlığı bugünden anlamlı kılar. Tehdit, tüm mevcut şifrelemenin bugün kırıldığı anlamına gelmez; büyük ve hataya dayanıklı kuantum donanım varsayımına bağlıdır.
