## Sınav özeti

- Recursive resolver önbelleğe alır; çözümleme kök → TLD → authoritative sunucu zincirini izler.
- Cache poisoning: sahte DNS yanıtını önbelleğe yerleştirme. Kaminsky (2008): rastgele alt alan sorgularıyla yarışları tekrarlama ve sahte NS/glue denemesi.
- DNSSEC: dijital imza zinciriyle yanıt bütünlüğü/kaynak doğrulama; gizlilik sağlamaz.
- Kayıtlar: DNSKEY = bölge açık anahtarı; DS = üst bölgenin alt anahtar bağı; RRSIG = kayıt kümesi imzası; `ad` = resolver veriyi doğruladı.
- DoT: TLS, çoğunlukla TCP/853. DoH: HTTPS, çoğunlukla TCP/443. Sorgu taşımasını gizler; tek başına DNSSEC imza doğrulaması değildir.
- DNSSEC + DoH/DoT tamamlayıcıdır; şifreli DNS bağlanılan IP’yi tamamen gizlemez.
