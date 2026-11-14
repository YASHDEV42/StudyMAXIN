## Sınav özeti

**Anahtar üretimi:** asal `p,q` → `n=pq` → `φ=(p−1)(q−1)` → `gcd(e,φ)=1` → `d=e⁻¹ modφ`. Açık `(e,n)`, özel `(d,n)`.

- Kaynak örneği: `p=61,q=53,n=3233,φ=3120,e=17,d=2753`; `m=65 → c=2790 → m=65`.
- Şifreleme `c=mᵉ mod n`; çözme `m=cᵈ mod n`.
- Square-and-multiply, büyük üssü ikilik bitler üzerinden hızlı hesaplar.
- **Textbook RSA güvensiz:** belirlenimci, şekillendirilebilir; küçük üs/kısa mesaj saldırıları.
- Şifreleme dolgusu **OAEP**; imza dolgusu **PSS**. Ham RSA’yı üretimde kullanma.
- RSA imzası gizlilik değildir: özel anahtar imzalar, açık anahtar doğrular.
- RSA yavaştır; hibritte asimetrik yöntem küçük anahtar malzemesi, AES büyük veri için.
- **CRT:** `p` ve `q` modüllerinde hesaplayıp birleştirerek özel işlem hızlanır.
- Bellcore: tek hatalı CRT imzası `gcd(s'ᵉ−m,n)` ile asal çarpan sızdırabilir; imzayı dışarı vermeden doğrula.
- Kaynak anahtar boyları ve hız oranları yaklaşık; küçük örnek yalnız öğretim amaçlıdır.
