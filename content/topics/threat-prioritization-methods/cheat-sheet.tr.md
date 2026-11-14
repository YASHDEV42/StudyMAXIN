> **Kapsam:** 1.5.2–1.5.3; fiziksel PDF 30–31 / basılı 19–20. Ağırlıklı ortalama ve birim uyarıları ek öğretici açıklamadır; sayılar kaynak örneğidir.

## DREAD hesabı

**D**amage (zarar), **R**eproducibility (tekrar), **E**xploitability (sömürülebilirlik), **A**ffected users (etkilenen kullanıcı), **D**iscoverability (keşif).

Her boyut 1–10: `Toplam = D_zarar + R + E + A + D_keşif` → **5–50**. `Ortalama = Toplam / 5` → **1–10**. Aynı ölçek ve eşit ağırlıkta sıra değişmez.

| Tehdit                     | D/R/E/A/D | Toplam | Ortalama |
| -------------------------- | --------- | ------ | -------- |
| A: Kendi notunu değiştirme | 9/7/6/5/6 | 33     | 6,6      |
| B: Sınav gecesi DoS        | 5/8/7/9/8 | 37     | 7,4      |
| C: SQL yapısı ifşası       | 3/9/5/4/7 | 28     | 5,6      |

- Ham sıra: **B > A > C**.
- Zarar ×2: A=42, B=42, C=31 → **A=B**, A tek başına öne geçmez.
- Zarar ×3: A=51, B=47, C=34 → **A > B > C**.
- Ağırlıklı toplamın aralığı değişir. Ortalama için ağırlık toplamına böl: sırasıyla 6 veya 7.
- Sınırlar: eşit ağırlık iş etkisini kaçırabilir; puanlar özneldir. Ölçeği/gerekçeyi ortaklaştır.
- **7,4 ≠ %74 olasılık veya parasal kayıp.** DREAD karar desteğidir, nesnel kayıp ölçümü değildir.

## PASTA’nın yedi aşaması

**Process for Attack Simulation and Threat Analysis**:

1. İş hedefleri ve yükümlülükler.
2. Teknik kapsam: bileşen/bağımlılık/altyapı envanteri.
3. Uygulama ayrıştırma: DFD, girişler, akışlar, güven sınırları.
4. Tehdit analizi: aktör, yöntem, istihbarat.
5. Zafiyet analizi: CVE, yanlış ayar, tasarım kusuru; tehditlerle eşleme.
6. Saldırı modelleme: ağaçlar ve simülasyonlar.
7. Risk/iş etkisi ve maliyet-fayda; azaltım önceliği.

## Yöntemlerin farkı

| Yöntem        | İşlev                      | Kaynak ölçek rehberi |
| ------------- | -------------------------- | -------------------- |
| STRIDE        | Tehdit sınıflandırma/bulma | Küçük–orta           |
| DREAD         | Öncelik puanlama           | Her ölçek            |
| Saldırı ağacı | Yol ve maliyet modelleme   | Orta                 |
| PASTA         | İş odaklı uçtan uca süreç  | Büyük/kritik         |

STRIDE ve ağaçlar PASTA içinde kullanılabilir. Kapsam büyüdükçe süreç yararlı olabilir; küçük projede yükü orantısız olabilir. Ölçek rehberi zorunlu kullanım kuralı değildir.

[STRIDE](topic:threat-modeling-stride) · [Ağaçlar ve işlenmiş örnek](topic:attack-trees-portal-model)
