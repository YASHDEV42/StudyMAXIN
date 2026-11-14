## 4. Bölüm — Sınav özeti

### Temel akış

Tanımlama (hangi hesap?) → kimlik doğrulama (kanıt) → yetkilendirme (hangi kaynak/işlem?). Giriş başarılı olması her kaynağa izin vermez.

| Konu             | Hatırlanacak kural                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Parola entropisi | (H=L\log_2N); rastgelelik varsayılır. 8×36 ≈ 41,4 bit; 16×26 ≈ 75,2 bit.                                    |
| MFA              | Farklı faktör sınıfları gerekir; parola + güvenlik sorusu MFA değildir.                                     |
| HOTP/TOTP        | HOTP sayaç, TOTP zaman penceresi kullanır; pencere genişliği kullanılabilirlik ve tekrar riski dengesi.     |
| Passkey          | Site/origin'e bağlı imza; sıradan kimlik avına direnç. Cihaz/kurtarma/oturum riski sürer.                   |
| OAuth/OIDC       | OAuth yetki devri; OIDC kimlik doğrulama katmanı.                                                           |
| JWT              | `header.payload.signature`; kodlanmış payload okunabilir, imza doğrulanmalı.                                |
| Oturum           | Secure=HTTPS, HttpOnly=JS erişimini engeller, SameSite=çapraz site gönderimini sınırlar. Girişte ID yenile. |
| Erişim modeli    | DAC sahip, MAC merkezî etiket, RBAC rol, ABAC öznitelik/bağlam.                                             |
| Bilgi akışı      | Bell–LaPadula: gizlilik, no read up/no write down. Biba: bütünlük, no read down/no write up.                |
| Zero Trust       | Ağ konumu güven kanıtı değildir; her istek ve kaynak bağlamını değerlendir.                                 |

### Hata ayıklama soruları

- Çalınan parolalarla farklı hesaplara tek deneme: credential stuffing; karmaşıklık/hash bunu çözmez.
- TOTP gerçek zamanlı sahte sitede giriliyorsa aktarılabilir; passkey origin bağıyla korur.
- JWT'de algoritmayı istemci seçemez; imza, `iss`, `aud`, `exp` doğrulanır.
- Secure tek başına XSS/CSRF savunması değildir.
- RBAC sabit rol; ABAC bağlam değişkeni için daha uygundur.
- Yetkiyi dar tut; kritik işlemlerde görevleri ayır.
