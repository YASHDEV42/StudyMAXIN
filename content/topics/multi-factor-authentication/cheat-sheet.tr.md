## Sınav özeti

- MFA, farklı faktör sınıflarından kanıt ister: bilinen / sahip olunan / kişiye ait özellik.
- Parola + güvenlik sorusu iki faktör değildir; ikisi de bilinen sırdır.
- **HOTP (RFC 4226):** paylaşılan anahtar + artan sayaç → HMAC → dinamik kesme → kısa kod.
- **TOTP (RFC 6238):** HOTP sayacı yerine zaman adımı kullanır: `T = ⌊(UnixTime − T0) / X⌋`; yaygın `X = 30` sn.
- Saat tolerans penceresi kullanılabilirliği artırır, geçerli kod penceresini ve saldırı fırsatını da büyütür.

| Yöntem       | Güç / temel sınırlama                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| SMS OTP      | SIM swap ve telekom bağımlılığı                                                 |
| Push         | MFA yorgunluğu; isteği göstermeden onaylatma                                    |
| TOTP         | Kod gerçek zamanlı oltalamada aktarılabilir                                     |
| FIDO/passkey | Alan adına bağlı; oltalamaya dayanıklı, kurtarma ve cihaz güvenliği yine önemli |

- MFA risk azaltır, hesabı ele geçirmenin imkânsız olduğunu garanti etmez.
- MFA, yetkilendirme veya oturum güvenliğinin yerine geçmez.
