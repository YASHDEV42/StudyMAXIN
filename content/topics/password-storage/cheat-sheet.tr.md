## Sınav özeti

- Düz parola saklama: veri tabanı sızıntısında doğrudan ifşa.
- `SHA-256(parola)` yetersiz: hızlı tahmin, GPU/ASIC; saltsız eşit parolalar eşit özet.
- **Salt:** her parolaya benzersiz rastgele, gizli olmayan değer; gökkuşağı tablolarını engeller, tahmini yavaşlatmaz.
- **Pepper:** veri tabanından ayrı tutulan ortak sır; salt yerine geçmez.
- **PBKDF2:** yinelemeli HMAC, ağırlıklı CPU maliyeti.
- **bcrypt:** cost yaklaşık `2^cost`; 72 bayt girdi sınırı.
- **scrypt:** N/r/p parametreleri ve bellek maliyeti.
- **Argon2id:** bellek, zaman, paralellik ayarlanır; salt genellikle otomatik.
- Parametreleri gerçek donanım ve güncel kütüphane önerileriyle kalibre et; örnek ayarlar evrensel değildir.
- Kayıt: algoritma + parametreler + salt + karma; girişte yeniden hesapla ve doğrula.
