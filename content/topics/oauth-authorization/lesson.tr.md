## OAuth kimlik kanıtlamaz, izin devreder

Bir uygulamanın kullanıcı adına fotoğrafları okuması gerekiyorsa, kullanıcı parolasını o uygulamayla paylaşmamalıdır. OAuth 2.0, sınırlı ve geri alınabilir yetkinin devredilmesini sağlar. OAuth erişim jetonu bir capability gibi düşünülebilir: jetonu taşıyan taraf, kapsamı içindeki işlemleri yapabilir. Bu nedenle token, parola kadar hassas korunmalıdır. OAuth tek başına “bu kişi kim?” sorusunu yanıtlamaz; kimlik doğrulama için [OpenID Connect](topic:openid-connect-jwt) kullanılır.

Dört rol vardır: kaynak sahibi (kullanıcı), istemci (erişim isteyen uygulama), yetkilendirme sunucusu (kullanıcı onayıyla yetki kodu/token veren) ve kaynak sunucusu (korunan API). Authorization Code akışında istemci kullanıcıyı yetkilendirme sunucusuna yönlendirir. Kullanıcı orada giriş yapar ve istenen izinleri onaylar. Tarayıcı istemcinin kayıtlı callback adresine kısa ömürlü yetki koduyla döner. İstemci kodu token uç noktasında access token ile değiştirir; kaynak sunucusu bu token'ı denetler.

Tarayıcı veya mobil uygulama gibi public client, güvenilir biçimde saklayabileceği bir client secret'a sahip değildir. PKCE, başlangıçta üretilen verifier'ın türetilmiş challenge'ını isteğe bağlar ve kodu ele geçiren başka bir tarafın token almasını zorlaştırır. `state`, başlatılan akışla dönen yanıtı eşleştirip CSRF benzeri istek karıştırmalarını önlemeye yardımcı olur. Redirect URI önceden kaydedilmiş adresle tam eşleşmelidir; gevşek veya açık yönlendirme kodu saldırgana kaçırabilir.

Scope, devredilen yetkinin kapsamıdır. Yalnızca fotoğraf okumak isteyen istemciye silme veya tüm hesap erişimi verilmemelidir; bu [en az yetki](topic:access-control-models) ilkesinin token düzeyindeki karşılığıdır. Bearer token'ı kim sunarsa kullanabilir, bu nedenle URL, günlük veya tarayıcı geçmişine koymayın. Kısa süre, dar kapsam, güvenli saklama ve iptal/yenileme stratejisi önemlidir. TLS aktarım kanalını korur, ancak uç cihazda çalınan token'ı etkisizleştirmez.

_Öğretim örneği:_ Fotoğraf baskı uygulaması `photos.read` ister. Bu, kullanıcı parolasını vermekten ve tüm fotoğraf hesabına yetki tanımaktan daha sınırlıdır.
