## VPN tüneli neyi korur?

VPN, güvensiz ağ üzerinde iki uç arasında şifreli bir tünel kurar. İç paket dış IP taşımasına kapsüllenebilir; yoldaki gözlemci dış adresleri ve trafik örüntülerini görse de içeriği okuyamaz. Uzaktan kullanıcı kurum ağına, iki ofis birbirine bağlanabilir. VPN yalnızca cihaz–VPN geçişini korur; VPN çıkışından sonraki bağlantı için HTTPS/TLS gibi uçtan uca koruma gerekir.

## IPsec

IPsec, IP katmanındaki protokol ailesidir; IKE kimlik doğrulama ve anahtar değişimiyle güvenlik ilişkilerini kurar. Transport mode üst katman yükünü korurken mevcut IP başlığı yönlendirmede kalır; tunnel mode tüm iç paketi yeni dış IP başlığına sarar ve gateway-gateway bağlantıda kullanılır. AH bütünlük ve kaynak doğrulaması sağlar, şifrelemez. ESP şifreleme ve bütünlük/kimlik doğrulamayı birlikte sağlayabilir ve yaygın kullanılır. Seçenek ve politika zenginliği esneklik getirir, fakat yapılandırma ve uygulama karmaşıklığını artırır.

## WireGuard

WireGuard Noise `IKpsk2` el sıkışma kalıbını kullanır. Karşı tarafın kalıcı açık anahtarını önceden bilmek kimliği bağlar; geçici X25519 anahtarları oturum sırrına katkı vererek ileri gizliliği destekler. Kaynaktaki akışta başlatıcı geçici anahtar, şifreli kimlik ve zaman damgası yollar; yanıtlayıcı geçici anahtar ve doğrulama yanıtı verir. Veri için ChaCha20‑Poly1305 AEAD, el sıkışma karması için BLAKE2s, türetme için HKDF kullanılır. Sabit takım zayıf algoritma seçimini azaltır; uygulama veya yapılandırma hatasını imkânsız kılmaz.

`PublicKey` peer kimliğini, `AllowedIPs` ise o anahtardan gelebilecek/tünele yönlenecek adres aralıklarını tanımlar. `0.0.0.0/0` tüm IPv4 trafiğini tünele gönderir (full tunnel); yalnız kurum alt ağı split tunnel’dır. Bu cryptokey routing, kimlik ile yönlendirmeyi ilişkilendirir. IPsec ve WireGuard’ın güvenliğini yalnız satır sayısı veya performansla kesin sıralamayın; kullanım senaryosu, yapılandırma, kod denetimi ve güncel işletim de önemlidir.
