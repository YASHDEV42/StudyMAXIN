> **Kapsam:** 1.3–1.3.3, fiziksel PDF 21–25 / basılı 10–14; önceki tarihçe ve sonraki 1.3.4 hariç. Ayrıntılı yıllık kesinti hesabı yazar açıklamasıdır.

## CIA: hedef, kontrol, ihlal

| Hedef                          | Tanım                                    | Kontroller                                                                          | İhlal                                                          |
| ------------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Confidentiality / Gizlilik     | Yalnız yetkili özne okuyabilir           | At rest/in transit şifreleme; erişim kontrolü; sınıflandırma, maskeleme             | Sızıntı, dinleme, yan kanal, açık bulut deposu, aşırı yetki    |
| Integrity / Bütünlük           | Yetkisiz değişimi önleme veya saptama    | Hash, HMAC, dijital imza; sürüm kontrolü; WORM                                      | Not/hesap değişimi; MITM; tedarik zinciri kurcalaması; bit rot |
| Availability / Erişilebilirlik | Yetkili kişi ihtiyaç anında kullanabilir | Yedeklilik, yük dengeleme, coğrafi dağıtım, yedekleme, DDoS koruması, hız sınırlama | DoS/DDoS, fidye yazılımı, kaynak tükenmesi, tek nokta arızası  |

## Sınavda karıştırma

- Veriyi kopyalamak orijinali bozmaz: uygulamanın çalışması gizlilik kanıtı değildir.
- **Hash ≠ kaynak doğrulama.** Beklenen özet güvenilir olmalı; saldırgan dosyayı ve özeti birlikte değiştirebilir.
- HMAC: ortak gizli anahtar; bütünlük ve anahtarı bilen taraftan gelme. Aynı anahtarı bilen iki kişiyi üçüncü tarafa ayırt ettirmez.
- Dijital imza: özel anahtarla imzalama, açık anahtarla doğrulama. Doğru anahtar/kimlik bağı ve anahtar güvenliği gerekir. İmzalı paket zararlı olabilir.
- Herkese açık bir dosyada da bütünlük gereklidir.
- DoS tek kaynaktan olabilir; DDoS dağıtıktır. Az sayıda pahalı sorgu da DoS oluşturabilir.
- Fidye şifrelemesi → erişilebilirlik; ayrıca veri çalma → gizlilik. Yedekten dönüş sızıntıyı geri almaz.
- Elektrik, donanım, yazılım, insan ve doğal afet kaynaklı kesintiler de kapsamdadır.
- Tek kontrol birden çok hedefe katkı sağlar; tek olay birden çok hedefi ihlal edebilir.

## Erişilebilirlik hesabı

365 günlük yıl, tüm süre dâhil varsayımı:

`Yıllık kesinti (dakika) = 525600 × (1 − oran)`

| Oran    | Yaklaşık kesinti             |
| ------- | ---------------------------- |
| %99,999 | 5,26 dakika/yıl              |
| %99,9   | 525,6 dakika ≈ 8,76 saat/yıl |

Kaynak ikinci süreyi yaklaşık sekiz buçuk saat olarak verir. Ölçüm dönemi ve bakım kapsamı belirtilmeli.

**Denge sorusu:** “Bu kontrol hangi hedefi güçlendirirken hangisini zorlaştırıyor?” Aşırı izolasyon erişilebilirliği düşürebilir.

Bağlantılar: [kimlik ve yetki](topic:identity-access-accountability), [temel terimler](topic:security-core-vocabulary).
