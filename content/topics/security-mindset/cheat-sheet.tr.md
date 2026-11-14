> **Kapsam:** 1.1.1–1.1.2 + etik uyarı; fiziksel PDF 16–18 / basılı 5–7, 1.2 hariç. Fail-safe ayrımı ve test sınırı ek açıklamadır.

## Temel ayrımlar

| Kavram             | Sorduğu şey                                                       |
| ------------------ | ----------------------------------------------------------------- |
| Pozitif gereksinim | Sistem ne yapmalı?                                                |
| Negatif gereksinim | Sistem neyi yapmamalı?                                            |
| İşlevsel test      | Beklenen durumda doğru sonuç var mı?                              |
| Güvenlik testi     | Kötü niyetli/beklenmeyen/sınır girdide yasak davranış doğuyor mu? |

- Başarılı meşru işlem, bütün yasak işlemlerin engellendiğini kanıtlamaz.
- Saldırgan uyum sağlar; bir yol kapanınca başka güven ilişkisini arayabilir.
- Savunma asimetrisi: belirli hedef için tek uygun yol yetebilir. “%99/%1” bir benzetmedir, ölçülmüş olasılık değildir.

## Zihniyetin üç refleksi

1. **Varsayımları sorgula:** kullanıcı davranışı, işlem sırası, güvenilen taraf.
2. **Sınır durumunu ara:** büyük/küçük, boş, negatif, tekrarlı, beklenmeyen girdi.
3. **Güveni haritala:** bileşen, kişi, tedarikçi; ne için ve hangi yetkiyle güveniliyor?

Üç takip sorusu: **Hangi varsayım? Nasıl yanlışlanır? Yanlışlanınca güvenli mi tehlikeli mi davranır?**

Otopark örneği: ilk 15 dakika ücretsiz; 14. dakikada tekrar ziyaret, aynı plakanın ardışık tanınması, okunamayan/kirli plaka, çok yakın iki araç. Amaç kimlik/süre/hata/algılama varsayımlarını izinli tasarım incelemesinde açığa çıkarmaktır.

## Hata politikası ve kanıt

- **Fail-closed:** izin doğrulanamıyorsa erişim/işlem kapalı kalır.
- **Fail-safe:** zarar açısından güvenli duruma geçme; her ortamda “kapıyı kilitle” demek değildir. Fiziksel emniyet bağlamını ayır.
- Kusurlu bir örnek güvenlik iddiasını çürütebilir. Kusur bulunmayan sınırlı testler evrensel yokluk ispatı değildir.
- Test kapsamını ve varsayımları söyle; “tam güvenlik” sonucu çıkarma.
- Öğrenilenleri yalnız kendine ait veya açıkça izinli sistemlerde uygula. Düşünmek/analiz etmek izinsiz müdahale izni değildir.

[Log4Shell](topic:log4shell-trust-boundaries) · [Tehdit modelleme](topic:threat-modeling-stride)
