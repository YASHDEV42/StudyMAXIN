## Sınav özeti

- Dijital imza: bütünlük + özel anahtarla ilişkili köken doğrulaması; **gizlilik sağlamaz**.
- Genel akış: belge özeti/hash → şema ile özel anahtar imzası → açık anahtarla doğrulama ve yeniden hash.
- İçerik değişirse doğrulama başarısız olur.
- “Hash’i özel anahtarla şifrelemek” yalnızca sezgisel kısaltmadır; RSA-PSS, ECDSA ve EdDSA gerçek imza şemalarıdır, genel özel-anahtar şifrelemesi değildir.
- RSA-PSS: RSA imzası için PSS kodlaması.
- ECDSA: nonce tekrarından/öngörülebilirliğinden özel anahtar sızabilir.
- Ed25519: EdDSA; deterministik nonce türetimi.
- RFC 6979, ECDSA için deterministik nonce üretimini de tanımlar.
- İmza doğrulaması bir anahtarın kullanıldığını gösterir; gerçek kişiyle bağ, sertifika/PKI ve anahtar yönetimine bağlıdır.
- Non-repudiation koşulsuz matematiksel/ hukuki garanti değildir; anahtar çalınması veya paylaşılması güveni etkiler.
