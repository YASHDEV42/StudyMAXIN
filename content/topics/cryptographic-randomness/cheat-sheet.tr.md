## Sınav özeti

- Kriptografik sırlar: DH özel değerleri, RSA asal sayıları, ECDSA nonce’u, TLS oturum anahtarları.
- PRNG deterministiktir; CSPRNG kriptografik öngörülemezlik hedefler ve sistem entropisiyle beslenir.
- Anahtar/nonce/salt için sistem CSPRNG’si: `getrandom`, `/dev/urandom`, `secrets`. `random`, zaman ve PID kullanma.
- Debian OpenSSL: entropi girdisi azaltıldı; etkilenen sistemlerde PID yaklaşık tek girdi oldu; yaklaşık 32.768 olası değer; CVE-2008-0166.
- Dual EC DRBG: nokta parametreleri arasındaki gizli ilişki biliniyorsa çıktılar tahmin edilebilir; şüpheler sonrası NIST 2014’te standardından çıkardı.
- Tasarım şüphesi ile arka kapıyı kimin/niçin eklediğinin kesin kanıtını ayır.
- Parametre kökeninin açıklanabilir ve denetlenebilir olması güveni destekler; doğru uygulama yine şarttır.
