## Dijital imza hangi güvenceleri verir?

Dijital imza, imzalanan içeriğin değişmediğini ve imzanın belirli bir açık anahtarla doğrulandığını gösterir. Şifreleme değildir: doğrulama açık anahtarla yapılabilir, dolayısıyla imza içeriği gizlemez. Temel amaç bütünlük ve özel anahtarla ilişkili mesaj kökenidir.

## Hash ve imza adımları

Öğretici özetle belge için bir hash hesaplanır; imza şeması bu özeti özel anahtarla imzalar. Alıcı, belge hash’ini kendisi hesaplar ve imzayı açık anahtarla doğrular. İçerik değişmişse yeni özet imzanın bağlandığı özetten farklı olur ve doğrulama başarısız olur. Hash sabit uzunluklu olduğu için uzun bir belgeyi doğrudan açık anahtar işlemiyle işlemek gerekmez.

Kaynağın “özeti özel anahtarla şifrelemek” anlatımı yalnız sezgisel bir kısaltmadır. **RSA-PSS**, RFC 8017’de tanımlı imza kodlaması ve imza işlemini kullanır; imzayı genel bir “özel anahtarla şifreleme” gibi düşünmek doğru değildir. ECDSA ve EdDSA da tersine çevrilebilir şifreleme değildir. Üretimde imza API’si kullanın; imza şeması ile şifreleme şemasını karıştırmayın.

## RSA-PSS, ECDSA ve Ed25519

- **RSA-PSS:** RSA tabanlı modern imza düzeni; PSS kodlaması ve parametreleri imza şemasının parçasıdır.
- **ECDSA:** Eliptik eğri imzası; her imza için nonce güvenli ve tekrar etmeyen şekilde yönetilmelidir. Aynı nonce’un iki farklı mesajda kullanılması özel anahtarı açığa çıkarabilir.
- **Ed25519:** EdDSA ailesinin imzası; RFC 8032’deki deterministik yöntem nonce’u mesaj ve anahtar malzemesinden üretir.

Kaynak, PlayStation 3 imzalama sistemindeki sabit ECDSA nonce’unun özel anahtarı açığa çıkardığı vakayı anlatır. ECDSA için de RFC 6979 deterministik nonce üretimini tanımlar; bu ek standart notu, kaynağın Ed25519 karşılaştırmasını geçersiz kılmaz. Kütüphane kullanımında şema ve anahtar türüyle uyumlu API’yi seçin.

## Kimlik ve inkâr edilemezliğin sınırı

İmza, bir belgenin değişmediğini ve doğrulama anahtarına karşılık gelen özel anahtarla imzalandığını gösterir. Ancak anahtarın gerçek hayatta hangi kişiye ait olduğu ayrı bir bağlama problemidir. Sertifika/PKI bu bağı kurmaya çalışır; özel anahtar çalınmış veya paylaşılmışsa imzanın kişi hakkında söylediği şey sınırlanır. Bu yüzden **non-repudiation (inkâr edilemezlik)** kriptografik kanıtla ilişkilidir ama tek başına kişiyi veya hukuki sonucu matematiksel kesinlikle belirlemez.

> **Kaynak düzeltmesi ve ek açıklama:** “Özel anahtarla hash’i şifrelemek” ifadesi imza şemalarının genel algoritması değildir. İmza, şemaya özgü kodlama ve imza/doğrulama işlemleridir. Kaynağın “matematiksel kesinlikle inkâr edilemezlik” ifadesi de anahtarın güvenli tutulması ve kimlikle doğru eşleştirilmesi koşullarına tabidir.
