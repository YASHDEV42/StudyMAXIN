## Tehdit Aktörleri — Sınav Özeti

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, 1.8, `teori-1-1-42.pdf`, fiziksel sayfa 41–42 (basılı 30–31).

## Üç değerlendirme boyutu

- **Motivasyon:** Neden saldırıyor? (para, ideoloji, istihbarat, intikam vb.)
- **Yetenek:** Hangi teknik beceri, araç ve kaynaklara sahip?
- **Israr:** Hedefe ne kadar zaman ve emek ayırabilir?

Savunmayı aktörün gerçek hedef olma olasılığına ve kurumun riskine göre boyutlandır; en güçlü aktörün her kurumu hedef aldığını varsayma.

## Aktör karşılaştırması

| Aktör                       | Motivasyon                              | Yetenek / ısrar                        | Tipik hedef / davranış                                   |
| --------------------------- | --------------------------------------- | -------------------------------------- | -------------------------------------------------------- |
| Script kiddie               | Merak, itibar, eğlence                  | Düşük / düşük                          | Kolay, zayıf korunan sistem                              |
| Siber suçlu                 | Para                                    | Orta–yüksek / orta                     | Kârlı kurumlar; fidye yazılımı ve çalıntı veri ekonomisi |
| Hacktivist                  | İdeoloji, mesaj                         | Değişken / düşük–orta                  | Görünür hedef; tahrifat, DDoS                            |
| İç tehdit                   | Öç, para, dikkatsizlik                  | Kurum içi erişimle yükselir / değişken | Kendi kurumu                                             |
| Güvenlik araştırmacısı      | Etik biçimde savunmayı geliştirme       | Teknik bilgisi yüksek / odaklı         | İzinli sistem, bug bounty                                |
| APT / devlet destekli aktör | İstihbarat, sabotaj, stratejik üstünlük | Çok yüksek / çok yüksek                | Stratejik hedefler, kritik altyapı                       |

## APT ve grup adları

**APT = Advanced Persistent Threat**: _Advanced_ (ileri beceri), _Persistent_ (uzun süre ısrar), _Threat_ (örgütlü kaynaklı tehdit). Hedefe özgü çalışma, uzun süre gizli kalma; istihbarat/sabotaj/stratejik üstünlük amaçlarıyla ilişkilendirilir.

| Kaynakta verilen şema          | Örnek                                            |
| ------------------------------ | ------------------------------------------------ |
| Mandiant/FireEye: APT + numara | APT28, APT29, APT41                              |
| CrowdStrike: hayvan            | Bear, Panda, Kitten, Chollima, Spider            |
| Microsoft (2023–): hava olayı  | Typhoon, Blizzard, Sandstorm, Sleet              |
| Genel/basın takma adı          | Fancy Bear (=APT28), Cozy Bear (=APT29), Lazarus |

Adlar sağlayıcılar arasında değişebilir. Savunmada davranış örüntüsü ve **TTP** (taktik, teknik, prosedür) isim ezberinden daha kullanışlıdır.

## İç tehdit türleri

1. **Kötü niyetli:** bilerek veri çalar veya sabotaj yapar.
2. **Dikkatsiz:** kötü niyet olmadan yanlış gönderim, oltalamaya kanma veya güvensiz kopyalama yapar. Kaynak bu türü en yaygın sayar.
3. **Ele geçirilmiş:** dış saldırgan, çalınmış meşru hesapla içeriden görünür.

Birlikte kullanılan kontroller: en az yetki, görevlerin ayrılığı, denetim kayıtları, sağlıklı kurum kültürü.

## Kaynak örnekleri ve ayrımlar

- **SolarWinds (2020):** yazılım güncelleme yoluna arka kapı, üretici imzası, çok sayıda kuruma dağıtım, aylar süren fark edilmeden kalma → tedarik zinciri saldırısı ve APT ısrarı örneği.
- **Script kiddie ≠ zararsız:** hazır araçlar düşük beceriyle de zarar verebilir.
- **Güvenlik araştırmacısı ≠ izinsiz saldırgan:** izin ve sorumlu açıklama belirleyicidir; bug bounty araştırmayı teşvik edebilir.
- **Grup etiketi ≠ kişi kimliği:** atıf için tek başına ad yeterli kanıt değildir.
