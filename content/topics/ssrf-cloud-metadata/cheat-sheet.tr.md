SSRF, kullanıcının denetlediği URL nedeniyle sunucunun kendi ağından istek göndermesidir. Sunucu, iç ağa veya bulut metadata servisine güvenilir konumdan erişebilir.

- **Yanıtlı SSRF:** hedef yanıtı kullanıcıya döner. **Kör SSRF:** yanıt dönmez; dış gözlem, zamanlama veya iç yan etki yine mümkün olabilir.
- Metadata zinciri: SSRF → metadata hizmetine erişim → geçici rol kimlik bilgisi → rolün izinleri kadar etki. Sonuç otomatik değildir; erişim, kimlik bilgisi ve rol kapsamına bağlıdır.
- DNS rebinding: denetim anındaki DNS sonucu ile gerçek bağlantıdaki sonuç farklı olabilir (TOCTOU). IP’yi kontrol etmek tek başına yetmez; doğrulanan IP’ye güvenli biçimde bağlan.
- Şemayı, hostu, portu ve çözümlenen IP’yi sınırla; loopback, özel, link-local ve ayrılmış IPv4/IPv6 hedeflerini engelle. Her redirect’i yeniden denetle.
- **Allowlist**, değişken saldırgan girdilerini kara listeyle saymaya çalışmaktan daha güvenilirdir.
- AWS IMDSv2’de token için PUT ve sonraki istekte özel başlık gerekir; basit GET SSRF’sine direnç sağlar. SSRF düzeltmesinin veya ağ kısıtlamasının yerine geçmez.
- En az bulut rolü, egress filtreleme, metadata koruması ve izleme katmanlarını birlikte kullan.
- TLS, bağlantıyı şifreler; URL hedefinin izinli olduğunu kanıtlamaz.
