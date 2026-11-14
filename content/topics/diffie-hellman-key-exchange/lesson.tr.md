## DH hangi sorunu çözer?

**Diffie–Hellman (DH) anahtar değişimi**, daha önce gizli anahtar paylaşmamış iki tarafın, konuşmaları dinlenirken ortak bir sır hesaplamasını sağlar. Taraflar sırrı ağdan göndermez. Saldırgan açık değerleri görür; ortak sırrı bulması, uygun parametrelerde ayrık logaritma problemini çözmesini gerektirir.

Boya karıştırma benzetmesinde taraflar ortak bir renge kendi gizli renklerini ekleyip karışımı değişir, sonra aldıkları karışıma kendi renklerini ekler. İkisi de ortak sonuca ulaşır; dinleyen ara karışımları görür ama bileşenleri kolayca ayıramaz. Bu, matematiksel kanıt değil, tek yönlülük sezgisidir.

## Hesap adımları

Taraflar açık bir grup ve parametrelerde, örneğin asal `p` ve taban `g` üzerinde anlaşır. Alice gizli `a` seçip `A=gᵃ mod p` hesaplar. Bob gizli `b` seçip `B=gᵇ mod p` hesaplar. `A` ve `B` açık kanaldan değişilir. Alice `Bᵃ mod p`, Bob `Aᵇ mod p` hesaplar; sonuç ikisinde de `gᵃᵇ mod p` olur.

Kaynağın küçük örneğinde `p=23`, `g=5`, `a=4`, `b=3`: `A=4`, `B=10`; ortak sonuç `10⁴ mod23=4³ mod23=18`. Bu sayılar elle izlenebilir ama güvenli değildir; saldırgan tüm olasılıkları deneyebilir.

## DH kimliği doğrulamaz

Ham DH, “karşımdaki kim?” sorusuna yanıt vermez. Ortadaki saldırgan Alice ile bir DH, Bob ile ayrı bir DH kurup trafiği aktarabilir. Bu **man-in-the-middle** saldırısıdır. DH değişimi, taraf kimliğini kanıtlayan sertifika ve imza ile doğrulanmalıdır. TLS 1.3, sunucunun geçici anahtar değişimini de içeren el sıkışma kaydını sertifikadaki imza anahtarıyla doğrulamasını sağlar.

Her oturum için yeni gizli değer üreten **DHE/ECDHE** kullanımı, oturum değerleri atılır ve doğru korunursa **ileri gizlilik (forward secrecy)** sağlar: kalıcı sunucu anahtarının gelecekte sızması tek başına kaydedilmiş eski oturumları çözmez. Bu özellik oturum sırrının veya istemci uç noktasının ele geçirilmesine karşı garanti değildir.

## Grup parametreleri ve uygulama

Güvenlik yalnızca gizli `a` ve `b` değerlerine bağlı değildir; grup, asal ve altgrup koşulları da önemlidir. Küçük veya zayıf parametre, paylaşılan eski grup ya da downgrade riski güvenliği düşürür. Kaynak, Logjam’in eski 512 bitlik dışa aktarma gruplarından yararlanmasını ve standartlaştırılmış FFDHE grupları ile X25519 gibi seçenekleri anlatır. Uygulamada onaylı kütüphane ve protokol parametreleri kullanın; açık değerleri protokolün kurallarına göre doğrulayın.

> **Pedagojik not:** 23 ve 5 yalnızca hesap mantığını gösterir. Kaynağın belirli grup boyutları dönemin uygulama tavsiyesidir; gerçek sistem için protokolün geçerli standart parametreleri izlenmelidir.
