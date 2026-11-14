## Sınav özeti

- **SSO:** Kullanıcı IdP'de bir kez doğrulanır; güvenilen SP'ler bu kimlik beyanını kabul eder.
- Kazanımlar: merkezî MFA/politika, kolay hesap kapatma, daha az tekrar parola girişi.
- Risk: IdP yüksek değerli tek bağımlılıktır; ele geçirilmesi çok hizmeti etkileyebilir.
- **Kerberos:** KDC (AS + TGS), istemci, hedef hizmet.
- Akış: kullanıcı doğrulanır → TGT → hizmet bileti → hizmete sunulur.
- TGT hizmete doğrudan erişim bileti değildir; TGS'den hizmete özel bilet almaya yarar.
- Biletler zaman sınırlıdır; çalıntı bilet ve uç cihaz riskleri yine değerlendirilir.
- **Federasyon:** kurumlar arası güven ilişkisiyle kimlik beyanı paylaşımı.
- SAML/OIDC federatif kimlik doğrulamada; OAuth sınırlı yetki devrinde kullanılır.
- SSO kimlik kanıtını merkezîleştirir; her hizmetin kaynak yetkilendirmesi yine gerekir.
