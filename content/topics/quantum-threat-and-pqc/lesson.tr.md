## Klasik açık anahtar varsayımı

RSA, Diffie–Hellman ve ECC; çarpanlara ayırma veya ayrık logaritma gibi klasik bilgisayarlarda hesaplanması zor problemlere dayanır. Kuantum bilgisayar, kübitleri ve belirli algoritmaları kullanarak bazı problem sınıflarında farklı bir hesaplama yolu açar; her işlemde sihirli bir hız artışı sağlamaz.

Peter Shor’un 1994’te geliştirdiği algoritma çarpanlara ayırmayı periyot bulmaya indirger. Bir `a` seçip `a, a², a³, ... (mod n)` dizisinin tekrar aralığı `r` bulunursa `a^r ≡ 1 (mod n)` olur; uygun koşullarda `gcd(a^(r/2)-1,n)` ve `gcd(a^(r/2)+1,n)` asal çarpanları verebilir. Kuantum hesaplama süperpozisyon ve kuantum Fourier dönüşümüyle periyodu verimli bulmayı hedefler. Ayrık logaritmaya uyarlamalar da RSA’nın yanı sıra DH ve ECC’yi tehdit eder. Bunun için büyük, kararlı ve hata düzeltmeli bir kuantum makinesi gerekir; tehdit bugünkü cihazların mevcut kapasitesiyle aynı şey değildir.

Grover algoritması simetrik anahtarlara yönelik kaba kuvvet aramasını yaklaşık karesel hızlandırır; güvenlik etkisi kabaca bit güvenliğini yarıya indirmek şeklinde sezilebilir. Bu nedenle AES-256 geniş bir güvenlik payı sağlar; RSA/DH/ECC’nin Shor karşısındaki durumu daha köklüdür.

## Neden geçişi bugünden düşünmeli?

“Şimdi topla, sonra çöz” (harvest now, decrypt later) saldırısında rakip bugün şifreli trafiği saklar ve daha güçlü kuantum hesaplama gelişirse yıllar sonra çözmeye çalışır. Sırrın korunma süresi uzunsa risk de yüksektir: sağlık/genom verileri, devlet bilgisi, biyometrik veya uzun vadeli fikrî mülkiyet kısa ömürlü bir oturum bilgisinden daha önce önceliklendirilebilir. Kurumların kriptografik envanter çıkarması ve geçişi planlaması zaman alır.

**Öğretici ek:** Kuantum donanımının ne zaman belirli bir anahtarı kırabileceğine ilişkin sayılar varsayımlara bağlı tahminlerdir; takvim garantisi olarak kullanılmamalıdır.

İlişkili konular: [eliptik eğri kriptografisi](topic:elliptic-curve-cryptography) · [kuantumun simetrik kriptografiye etkisi](topic:quantum-symmetric-impact).
