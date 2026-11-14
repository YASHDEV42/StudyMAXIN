## Sınav özeti

- **Kimlik:** Sistemdeki kullanıcı temsili; tek başına kanıt değildir.
- **Tanımlama:** Kullanıcının hangi hesap olduğunu ileri sürmesi.
- **Kimlik doğrulama:** İddianın kanıtla sınanması; “Kim?”
- **Yetkilendirme:** Doğrulanmış öznenin kaynak ve işlemler üzerindeki izni; “Neye izinli?”
- Akış: tanımlama → kimlik doğrulama → yetkilendirme. Doğru parola, her kaynağa erişim hakkı vermez.

### Faktörler ve biyometri

| Faktör             | Örnek                | Temel sınırlama                   |
| ------------------ | -------------------- | --------------------------------- |
| Bilinen şey        | Parola, PIN          | Tahmin, sızıntı, unutma           |
| Sahip olunan şey   | Telefon, akıllı kart | Çalınma veya kaybolma             |
| Kişiye ait özellik | Parmak izi, yüz      | Değiştirilemez; gizli olmayabilir |

- Aynı faktör sınıfından iki kanıt MFA oluşturmaz.
- Biyometrik doğrulama 1:1; tanımlama 1:N aramadır.
- FAR: yetkisizin yanlış kabul edilmesi. FRR: yetkilinin yanlış reddedilmesi.
- Eşiği sıkılaştırmak FAR'ı azaltabilir, FRR'yi artırabilir.
- Biyometri tercihen cihazda kalır ve korunan anahtarı açar; sunucuya parola gibi gönderilmez.
- Yetkilendirme denetimi her kaynak/işlem için yapılmalıdır; bu, en az yetkiyi destekler.
