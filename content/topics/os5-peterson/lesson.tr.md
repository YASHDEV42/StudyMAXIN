## Peterson's Solution (Peterson çözümü)

Slayt 14–15, **iki process** için yazılım tabanlı kritik-bölüm algoritmasını gösterir. Paylaşılan değişkenler `boolean flag[2]` ve `int turn`'dür.

```text
do {
  flag[i] = true;
  turn = j;
  while (flag[j] && turn == j) { }
  // critical section
  flag[i] = false;
  // remainder section
} while (true);
```

**flag[i]=true**: P_i kritik bölüme girmek istiyor. **turn=j**: İki taraf yarışıyorsa önce P_j'ye fırsat veriliyor. **while**: Diğer taraf da istiyorsa ve sıra ondaysa bekle. Çıkarken **flag[i]=false** kendi isteğini kaldırır; diğerinin flag'ini zorla değiştirmez.

İki process aynı anda isterse `turn` son atamanın işaret ettiği taraf lehine bekleme kararı doğurur; öteki girebilir. Klasik modelde algoritma **mutual exclusion, progress ve bounded waiting** gereksinimlerini karşılamak için tasarlanmıştır.

## Modern uygulama uyarısı

Slayt 16'nın da belirttiği gibi, yalın okuma/yazma ve derleyici/CPU yeniden sıralaması üzerinde modern makinelerde bu pseudocode tek başına güvenli olmayabilir. Doğru memory ordering, atomics veya mutex gerekir. Algoritma bir **teorik çözüm** olarak öğrenilir.

**Kaynak hatası:** Slayt 15'te `turn=i` ise mutlaka `P_i` girer gibi ifadeler geneldir; `flag[j]` koşulunu da birlikte değerlendirmek gerekir. Bir process diğerinin flag'ini false yapmaz, **kendi flag'ini temizler**.

**Kaynak dışı örnek:** İki worker ortak tabloyu değiştirirken Peterson modelinde sıranın nasıl belirlendiğini adım adım takip edebiliriz.
