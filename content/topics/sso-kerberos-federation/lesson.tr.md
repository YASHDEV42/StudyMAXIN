## SSO neden kullanılır?

Kullanıcı gün içinde çok sayıda uygulamaya giriş yapar. Her uygulamada ayrı parola istemek kullanıcı yükünü, parola tekrarını ve yeni saldırı fırsatlarını artırır. Tek oturum açma (Single Sign-On, SSO), kullanıcının bir kimlik sağlayıcıda (Identity Provider, IdP) kimliğini doğrulamasını; güven ilişkisi kurulan hizmet sağlayıcıların (Service Provider, SP) bu doğrulamaya dayanmasını sağlar. MFA, parola politikası ve çalışan ayrılışında hesabı kapatma merkezî biçimde yönetilebilir.

Merkezileşme, IdP'yi kritik bağımlılığa dönüştürür: IdP ele geçirilirse veya hizmet dışı kalırsa bağlı uygulamalar etkilenebilir. Bu nedenle IdP güçlü doğrulama, izleme, yüksek erişilebilirlik ve dikkatli hesap kurtarma ile korunmalıdır. SSO, uygulamaların yetkilendirme kararlarını ortadan kaldırmaz; her SP kendi kaynakları için doğru izinleri vermelidir.

## Kerberos bilet akışı

Kerberos, parola bilgisini her hizmete tekrar göndermeden ağda kimlik doğrulamayı amaçlayan bir sistemdir. Anahtar Dağıtım Merkezi (Key Distribution Center, KDC), kimlik doğrulama hizmeti (AS) ve bilet verme hizmeti (TGS) rollerini yürütür. Kullanıcı başlangıçta doğrulanır ve Ticket-Granting Ticket (TGT) alır. Bir hizmete erişmek istediğinde TGT ile TGS'den o hizmete özgü bilet ister. İstemci, hizmet biletini hedef hizmete sunar. Süre sınırlı ve korumalı biletler, parolanın her istekle taşınması ihtiyacını azaltır.

Biletin çalınması geçerlilik süresi boyunca risk yaratabilir; zaman damgası tek başına her tekrar kullanım veya uç cihaz saldırısını yok etmez. Bilet süreleri, istemci/sunucu saat eşleşmesi, KDC güvenliği ve iptal/yenileme tasarımı önemlidir.

## Federasyon ve protokol ayrımı

Federasyon, farklı kurumların önceden tanımlanmış güven ve protokol kurallarıyla kimlik beyanlarına dayanmasıdır. SAML ve OpenID Connect federatif girişte kullanılabilir. OAuth ise esas olarak bir uygulamaya kullanıcı adına sınırlı kaynak erişimi devreder; kimlik doğrulama ile yetki devrini karıştırmamak gerekir. Ayrıntı için [OAuth yetkilendirmeye](topic:oauth-authorization) bakın. Her protokolde güven, doğru yapılandırma ve taraflar arası doğrulama koşullarına bağlıdır.

_Öğretim örneği:_ Çalışan IdP'de doğrulanıp İK uygulamasına giriş yapar. Hesabı kapatma yeni girişleri durdurabilir; mevcut oturum ve biletlerin yaşam döngüsü ayrıca ele alınmalıdır.
