## Sınav özeti

- WEP: RC4 + kısa/tekrarlı IV; trafik biriktikçe anahtar çıkarımı; terk edilmiştir.
- WPA2-Personal PMK: parola + SSID’den PBKDF2. PMK havadan gönderilmez.
- PTK = PRF(PMK, ANonce, SNonce, AP MAC, istemci MAC).
- 4-way handshake: (1) ANonce (2) SNonce + MIC, PTK türetme (3) GTK + MIC/kurulum (4) ACK.
- KRACK: bazı istemcilerde 3. mesaj tekrar kurulunca nonce sayacının sıfırlanması; algoritma kırma değil, durum/nonce tekrar kullanımı. Etki sürüm ve yama koşullarına bağlı.
- WPA3 SAE/Dragonfly (PAKE) çevrimdışı sözlük tahminini sınırlar; canlı deneme gerekir; ileri gizlilik.
- OWE açık ağlarda fırsatçı şifreleme sunar, AP kimliğini doğrulamaz.
- Güncel standart + yama + güçlü parola ve doğru yapılandırma birlikte gerekir.
