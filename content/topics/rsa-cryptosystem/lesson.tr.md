## RSA’nin matematiksel dayanağı

RSA, 1977’de Rivest, Shamir ve Adleman tarafından geliştirilen açık anahtarlı bir şemadır. İki büyük asal sayıyı çarpmak kolay, yeterince büyük ve rastgele seçilmiş çarpımları asal çarpanlarına ayırmak ise pratikte zordur. Bu asimetri, asal çarpanları gizli anahtarın tuzak kapısı hâline getirir.

## Anahtar üretimi

1. Büyük asallar `p` ve `q` seçilir.
2. `n=pq` hesaplanır; `n` açık modüldür.
3. `φ(n)=(p−1)(q−1)` hesaplanır ve gizli tutulur.
4. `gcd(e,φ)=1` olacak açık üs `e` seçilir; yaygın örnek 65537’dir.
5. `ed ≡ 1 (mod φ)` koşulunu sağlayan özel üs `d` bulunur.

Açık anahtar `(e,n)`, özel anahtar `(d,n)` biçimindedir. `p` ve `q` gizli kalır; bunları elde eden kişi φ ve dolayısıyla `d`’yi bulabilir.

## Kaynağın sayısal örneği

Eğitim için `p=61`, `q=53` seçilirse `n=3233`, `φ=3120` olur. `e=17` için `d=2753`, çünkü `17×2753=1+15×3120`. Mesaj sayısı `m=65` iken `c=65¹⁷ mod3233=2790`; çözme `2790²⁷⁵³ mod3233=65` sonucunu verir. Bu örnek mekanizmayı gösterir; küçük asal sayılar güvenli değildir.

Üs binlerce bit olabileceği için üs değerince tekrar çarpma yapılmaz. **Square-and-multiply (kare al ve çarp)**, ikilik üs gösterimini tarar; her adımda kare alır, bit 1 olduğunda çarpar ve mod alır. İşlem sayısı üs değerinden çok bit uzunluğuna bağlıdır.

## Neden textbook RSA kullanılmaz?

Dolgusuz **textbook RSA** belirlenimcidir: aynı mesaj her zaman aynı şifreli metni verir. Küçük mesaj kümesinde saldırgan tahminleri açık anahtarla şifreleyip karşılaştırabilir. RSA ayrıca matematiksel olarak şekillendirilebilir; şifreli metindeki bir çarpanla oynama, çözülmüş mesajı öngörülebilir biçimde etkileyebilir. Küçük üs ve kısa dolgusuz mesajlarda doğrudan kök alma riski de vardır.

Şifreleme için rastgelelik ve yapı ekleyen standart **OAEP**, imza için **PSS** kullanılır. Üretimde RSA işlemini doğrulanmış kriptografi kütüphanesine bırakın; kaynaktaki “sıfırdan RSA” kodu yalnızca eğitim içindir. İmza mekanizması bölüm 3.7’de ayrıntılanır: özel anahtarla imzalama, açık anahtarla doğrulama sağlar; gizlilik amacı taşımaz.

## Hibrit kullanım ve CRT uyarısı

RSA, AES’ten çok daha yavaştır ve büyük dosyaları doğrudan şifrelemek için uygun değildir. Hibrit tasarım asimetrik yöntemi küçük bir anahtar malzemesini kurmak/taşımak için, hızlı simetrik şifreyi de asıl veriyi korumak için kullanır. Böylece açık anahtar anahtar dağıtımındaki, AES ise toplu şifrelemedeki güçlü yanını sağlar.

Özel üs işlemi **Çin Kalan Teoremi (CRT)** ile `p` ve `q` modüllerinde ayrı hesaplanıp birleştirilerek hızlandırılır. Fakat bir donanım hatası CRT kollarından birini bozarsa Bellcore türü saldırı ortaya çıkabilir: hatalı imza `s'` ve bilinen mesaj `m` üzerinden `gcd(s'ᵉ−m,n)` gizli çarpanı verebilir. Bu nedenle CRT imzası dışarı verilmeden önce doğrulanmalı; kriptografik kütüphane kullanılmalıdır.

> **Kaynak ve ek açıklama:** Anahtar uzunluğu ve hız karşılaştırmaları kaynaktaki yaklaşık değerlerdir; güncel politika/parametre seçimi için kullanılan protokol ve standart izlenmelidir. Küçük sayısal örnek üretim anahtarı değildir.
