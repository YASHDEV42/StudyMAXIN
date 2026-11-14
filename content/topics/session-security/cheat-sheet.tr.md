## Sınav özeti

| Özellik       | Durumlu cookie oturumu         | Durumsuz JWT                            |
| ------------- | ------------------------------ | --------------------------------------- |
| Oturum durumu | Sunucu deposunda               | İmzalı token içinde                     |
| İptal         | Kayıt silinerek hızlı          | Ek mekanizma yoksa sona erene kadar zor |
| Dağıtım       | Ortak depo/eşgüdüm gerekebilir | Yerel doğrulama kolaylığı               |
| Başlıca risk  | Çerez hırsızlığı, fixation     | Uzun ömür, iptal ve doğrulama hatası    |

- `Secure`: yalnız HTTPS.
- `HttpOnly`: JS cookie'yi okuyamaz; XSS'in tüm etkilerini durdurmaz.
- `SameSite`: çapraz site cookie gönderimini sınırlar; CSRF azaltımına yardım eder.
- Session fixation: saldırganın bildiği oturum kimliği girişten sonra da kalır.
- Savunma: giriş/yetki değişiminde kimliği yenile ve eskiyi geçersizleştir.
- Zaman aşımı koy; çıkışta sunucu oturumunu iptal et; hassas işlemde yeniden doğrula.
- MFA oturum cookie hırsızlığını otomatik çözmez; her istekte kaynak bazlı yetkilendirme yap.
