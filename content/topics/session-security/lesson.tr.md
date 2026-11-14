## Girişten sonra oturum kanıtı

Sunucunun her istekte parolayı yeniden sorması pratik değildir. Başarılı girişten sonra sunucu bir oturum açar ve tarayıcıya genellikle cookie içinde rastgele bir oturum kimliği verir. Sonraki istekler bu kimliği taşır. Bu cookie fiilen hesabın kanıtına dönüştüğünden çalınması, parola bilinmeden oturum ele geçirmeye yol açabilir.

Durumlu (stateful) oturumda anlamsız ve rastgele kimlik sunucu tarafındaki oturum kaydına işaret eder. Kayıt silinerek oturum hemen iptal edilebilir; dağıtık sistemlerde ortak depo veya eşgüdüm gerekir. Durumsuz JWT yaklaşımında claims token içindedir ve sunucu imzayı doğrular. Ölçekleme kolaylaşabilir, ancak token iptali zordur; token genellikle süresi dolana kadar geçerli kalır. Kısa ömürlü access token ile sunucuda denetlenen yenileme kaydını birleştirmek olası bir tasarımdır. JWT'nin imzalı olması, içeriğinin gizli veya kolayca iptal edilebilir olduğu anlamına gelmez.

## Cookie bayrakları ve saldırılar

- `Secure`: cookie yalnızca HTTPS bağlantısında gönderilir.
- `HttpOnly`: JavaScript'in cookie değerini okumasını engeller; XSS'in bütün etkilerini engellemez.
- `SameSite`: çapraz site isteklerinde cookie gönderimini sınırlar; CSRF riskini azaltır.

Bayraklar farklı riskleri azaltır ve birlikte değerlendirilir. Session fixation saldırısında saldırgan kurbanın kullanacağı oturum kimliğini önceden belirler; kullanıcı giriş yaptığında aynı kimlik geçerli kalırsa saldırgan da oturumu kullanabilir. Başarılı girişte ve yetki düzeyi değiştiğinde oturum kimliğini yenilemek, eski kimliği geçersiz kılmak temel savunmadır. Makul zaman aşımı, çıkışta sunucu tarafında iptal ve hassas işlem öncesi yeniden doğrulama da önemlidir.

Oturumun geçerli olması kullanıcının her kaynağa erişebileceğini göstermez. Her istek, hedef kaynak ve işlem için [yetkilendirme](topic:access-control-models) denetiminden geçmelidir. MFA giriş kanıtını güçlendirir; çalınmış oturum belirtecini kendiliğinden etkisizleştirmez.

_Öğretim örneği:_ `Secure` tek başına XSS kaynaklı JavaScript erişimini veya CSRF'yi önlemez; bu yüzden HttpOnly ve uygun SameSite davranışı da gerekir.
