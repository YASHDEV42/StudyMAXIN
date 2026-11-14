## Anahtar yönetimi özeti

- Yaşam döngüsü: CSPRNG ile üret → güvenli sakla → yetkili dağıt/kullan → döndür → süresi dolunca güvenli imha.
- Kod/konfigürasyon deposuna düz metin anahtar koyma; sızıntı etkisini azaltmak için rotation uygula.
- HSM anahtarı cihaz içinde üretip saklar ve işlem yapar; amaç anahtarın dışarı çıkmamasıdır.
- TPM/Secure Enclave: kişisel cihazlarda donanım destekli anahtar koruması.
- HSM, kötüye kullanım yetkisini otomatik çözmez; erişim kontrolü ve denetim gerekir.
- Kök CA anahtarı çevrimdışı ve törenle kullanılır.
- Split knowledge / M-of-N: işlem için birden fazla görevlinin katkısı gerekir; tek kişiye bağlılığı azaltır.
