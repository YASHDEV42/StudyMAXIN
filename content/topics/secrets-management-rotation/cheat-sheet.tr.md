Sırları (parola, API anahtarı, bulut credential’ı, imza anahtarı) kaynak koduna veya Git deposuna koyma.

- Git geçmişinden sonraki commit’te silmek eski değeri yok etmez. Depoya girdiyse **ifşa olmuş varsay**, hemen iptal et/döndür; sonra kapsamı ve kullanımı incele.
- `.env` dosyasını ignore et; ayrıca dosyanın önceden tracked olmadığını ve web kökünden sunulmadığını doğrula.
- Secret scanning geçmişi de taramalı; pre-commit/CI kontrolleri yeni sızıntıları engellemeye yardım eder.
- Sır kasası: merkezi şifreli depolama, kimlik tabanlı erişim, denetim. Uygulama yalnızca ihtiyacı olan sırrı alsın.
- Kısa ömürlü/dinamik sır ve rotation, çalınan credential’ın işe yaradığı süreyi azaltır.
- Kesintisiz geçiş: yeni credential üret → tüketicileri güncelle/doğrula → eski credential’ı iptal et.
- En az ayrıcalık etkiyi sınırlar. Environment variable kolaylık sağlar ama log/process/CI sızıntılarına karşı tek başına yeterli değildir.
- Kasa, yetkili uygulama ele geçirilmesini tek başına önlemez; erişim politikası ve izleme gerekir.
