## Tuzak → önlem

| Tuzak                  | Risk                                     | Temel önlem                         |
| ---------------------- | ---------------------------------------- | ----------------------------------- |
| Dolgusuz RSA           | Belirlenimcilik / şekillendirilebilirlik | OAEP şifreleme, PSS imza            |
| ECDSA nonce tekrarı    | Gizli anahtar sızıntısı                  | Güvenli nonce / denetlenmiş Ed25519 |
| Zayıf RNG              | Tahmin edilebilir anahtar                | CSPRNG                              |
| Kimlik doğrulamasız DH | Ortadaki adam                            | İmzalı ve sertifikalı değişim       |
| Zayıf DH parametresi   | Logjam/downgrade                         | Güncel grup veya X25519             |
| Değişken zaman/hata    | Yan kanal / padding oracle               | Sabit zaman, tutarlı hata           |
| Anahtar kodda          | Gizli anahtar sızıntısı                  | KMS/HSM, erişim kontrolü, rotation  |
| Eski protokol          | Bilinen saldırı yüzeyi                   | Desteklenen TLS yapılandırması      |
| Kendi kriptonu yazmak  | Denetlenmemiş açıklar                    | Sınanmış kütüphane ve doğru API     |

Kütüphane kullanmak doğru parametre seçme ve anahtar yönetiminin yerini tutmaz.
