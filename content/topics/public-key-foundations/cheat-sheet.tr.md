## Sınav özeti

- **Anahtar dağıtım problemi:** Ortak gizli anahtarı, önceden güvenli kanal yokken paylaşma sorunu.
- n kişi için çiftlere özgü simetrik anahtar sayısı `n(n−1)/2`; açık anahtar yaklaşımında yaklaşık `2n` anahtar.
- **Merkle bilmeceleri:** Açık kanalda ortak sır; dinleyene daha yüksek hesap maliyeti. Tarihsel fikir, tek başına güncel protokol değil.
- **Tek yönlü fonksiyon:** İleri hesap kolay, tersine çevirme pratikte zor.
- **Tuzak kapılı fonksiyon:** Gizli bilgi ters işlemi kolaylaştırır; RSA’da p ve q faktörleri.
- **Modüler aritmetik:** Kalanlarla işlem; `10+5 ≡ 3 (mod 12)`.
- **Modüler üs alma:** `gˣ mod p`; kare al ve çarp ile yaklaşık üs bit sayısına bağlı sayıda adımda.
- **Ayrık logaritma:** `g`, `p`, `gˣ mod p` veriliyken `x`’i bulma; DH/ECC güvenlik varsayımlarından biri.
- Küçük örnek: `5ˣ ≡ 8 (mod 23)` için `x=6`; bu sayı gerçek anahtar için güvenli değildir.
- RSA’nın dayanağı ayrık logaritma değil, büyük `n=pq`’yu çarpanlarına ayırma zorluğudur.
- Açık anahtar şifrelemede kilitler, özel anahtar çözer; imzada özel anahtar imzalar, açık anahtar doğrular.
