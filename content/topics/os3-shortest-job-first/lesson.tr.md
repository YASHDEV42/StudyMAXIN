## SJF nedir?

**Shortest Job First — SJF (en kısa iş önce)**, hazır kuyruğundaki işler arasından tahmini en kısa CPU burst süresine sahip olanı seçer. Kaynağın PPTX **51–55. slaytlarındaki** örnek açıkça **non-preemptive SJF (kesmesiz SJF)** kullanır. Bir iş başladıktan sonra, daha kısa yeni iş gelse bile çalışan işi kesmez.

## Kaynak slaytındaki veri tablosu

| Process | CPU burst | Arrival time |
| ------- | --------: | -----------: |
| P1      |         5 |            0 |
| P2      |         4 |            0 |
| P3      |         7 |            0 |
| P4      |         3 |            0 |
| P5      |         2 |            4 |

Dört process `t=0` anında hazırdır; **P5 t=4'te gelir**. Hazır olan en kısa iş önce seçildiğinde çizelge şöyledir:

`0–3: P4 | 3–7: P2 | 7–9: P5 | 9–14: P1 | 14–21: P3`

Önemli karar **t=4**: P2 çalışırken P5 (2 birimlik) gelir. P2'nin 3 birimi kalmıştır; **non-preemptive** olduğu için P2 kesilmez ve P5 t=7'de başlar.

## Hesaplama

**Turnaround time (tamamlanma süresi)** = Completion − Arrival. **Waiting time (bekleme süresi)** = Turnaround − Burst.

| Process | Completion | Turnaround | Waiting |
| ------- | ---------: | ---------: | ------: |
| P1      |         14 |         14 |       9 |
| P2      |          7 |          7 |       3 |
| P3      |         21 |         21 |      14 |
| P4      |          3 |          3 |       0 |
| P5      |          9 |          5 |       3 |

**Average waiting time = (9+3+14+0+3)/5 = 5.8.** **Average turnaround time = (14+7+21+3+5)/5 = 10.**

## Özellikler ve sınırlar

SJF, hazır işler için kısa CPU burst'lerini öne alır ve ortalama waiting time'ı azaltabilir. Burst süresi gelecekte kesin olarak bilinmeyebilir; tahmin gerekir. Uzun işler, sürekli kısa işler gelirse **starvation (aç kalma)** riski yaşayabilir. **SRTF (Shortest Remaining Time First / en kısa kalan süre önce)** preemptive çeşididir ve bu örnekte uygulanmamıştır.

**Öğretici çıkarım:** SJF “en kısa işi önce seçer”; “çalışan işi her zaman daha kısa gelenle değiştirir” ifadesi yalnız preemptive varyantına uygun olabilir.
