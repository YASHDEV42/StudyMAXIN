## Sınav özeti

- Hash: her boyuttaki girdiden sabit boyutlu özet; şifreleme değildir, anahtarsızdır.
- **Preimage:** özete uyan girdi bulma direnci.
- **Second preimage:** verilen girdiye eş özetli başka girdi bulma direnci.
- **Collision:** herhangi iki farklı girdinin eş özetini bulma direnci.
- n bit çıktı için çakışma araması yaklaşık `2^(n/2)`; SHA-256 yaklaşık 128 bit çakışma güvenliği verir.
- SHA-2: Merkle–Damgård; SHA-3: sponge. Naif `H(secret‖message)` Merkle–Damgård’da length extension’a açık olabilir.
- SHA-256/SHA-512/SHA-3 güvenli seçenekler; MD5 ve SHA-1 kırık, güvenlik için kullanılmaz.
- Dosya hash’i tek başına kaynağı doğrulamaz; güvenilir referans/MAC/imza gerekir.
- Parola saklamada hızlı SHA-256 uygun değildir; benzersiz salt ve yavaş parola karma fonksiyonu kullanılır.
