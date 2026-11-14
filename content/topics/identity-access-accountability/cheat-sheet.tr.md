> **Kapsam:** 1.3.4, fiziksel PDF 25–26 / basılı 14–15. İmzanın koşulları ve aynı sınıftaki iki bilgi örneği, kaynağı açıklayan yazar notlarıdır.

## Dört soru

| Kavram                              | Soru                                                       | Temel araç / dikkat                                                      |
| ----------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| Authentication / Kimlik doğrulama   | İddia ettiğin kişi/sistem misin?                           | Parola, passkey, biyometri; başarılı giriş sınırsız izin vermez          |
| Authorization / Yetkilendirme       | Hangi kaynakta hangi işlemi yapabilirsin?                  | İzin kararı; okuma ve değiştirme ayrı işlemler                           |
| Accountability / Hesap verebilirlik | Eylemi hangi özneyle ilişkilendirebiliriz?                 | Güçlü kimlik doğrulama + kurcalamaya karşı korunmuş denetim kayıtları    |
| Non-repudiation / İnkâr edilemezlik | Kaynağa ilişkin sonradan reddetmeye karşı hangi kanıt var? | Dijital imza; kimlik–anahtar bağı ve özel anahtar güvenliği koşullarıyla |

## MFA ve AAA

- Bilgi: parola, PIN.
- Sahiplik: telefon, donanım anahtarı, akıllı kart.
- Biyometri: yüz, parmak izi.
- **MFA:** en az iki farklı faktör sınıfı. Parola + PIN iki bilgi; tek sınıf.
- **AAA:** Authentication, Authorization, **Accounting**. Sonuncu, eylemlerin kayıt/izleme boyutudur; hesap verebilirliği destekler.
- Kavramsal sıra: kimliği doğrula → ilgili kaynak/işlem için yetkiyi denetle → güvenilir iz bırak.

## İmza için koşulları unutma

Geçerli imza → ilgili özel anahtarla imzalanmış içerik bağı. Doğru kişiyle ilişkilendirmek için doğru açık anahtar/kimlik bağı, korunmuş özel anahtar ve güvenilir imzalama süreci gerekir. **İmzalı ≠ zararsız**; çalınmış anahtar, kişinin bilinçli onayını kanıtlamaz.

## CIA dışındaki boyutlar

**Parker altılısı:** gizlilik, bütünlük, erişilebilirlik + sahiplik/denetim, gerçeklik (authenticity), yararlılık (utility). Kaynak burada modeli ayrıntılandırmaz.

[Ön koşul: CIA](topic:cia-security-goals) · [Olay sözlüğü](topic:security-core-vocabulary)
