## Sınav özeti

1. Açık grup parametreleri `p,g` üzerinde anlaşılır.
2. Alice `a` seçer, `A=gᵃ mod p` gönderir; Bob `b` seçer, `B=gᵇ mod p` gönderir.
3. Alice `Bᵃ mod p`, Bob `Aᵇ mod p` hesaplar; ikisi `gᵃᵇ mod p` bulur.
4. Güvenlik varsayımı: açık değerlerden gizli üssü bulmak (ayrık logaritma) uygun parametrelerde zordur.

- Kaynak örneği: `p=23, g=5, a=4, b=3`; `A=4`, `B=10`, ortak değer `18`. Güvenli parametre değildir.
- Ham DH **kimlik doğrulamaz**; aradaki adam her tarafla ayrı sır kurabilir.
- Sertifika/imza, DH değişimini taraf kimliğine bağlar. DH sır kurar; imza kimlik kanıtlar.
- DHE/ECDHE her oturum için taze gizli değer kullanır. Değerler atılırsa kalıcı anahtarın sonraki sızıntısı eski oturumları tek başına açmaz (**ileri gizlilik**).
- Küçük/zayıf grup, altgrup veya downgrade riski; standart grup ve kütüphane kullan.
- Logjam: eski zayıf DH parametrelerinin desteklenmesi riski.
- Açık parametre örneği ve boya benzetmesi pedagojiktir; güvenlik kanıtı veya gerçek parametre önerisi değildir.
