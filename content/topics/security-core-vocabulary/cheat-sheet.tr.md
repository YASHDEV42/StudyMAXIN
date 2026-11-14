> **Kapsam:** 1.4, fiziksel PDF 26–27 / basılı 15–16; 1.3.4 sonu ve 1.5 başlangıcı hariç. Riskin birimleri, IOC bağlamı ve zero-day tespiti hakkındaki notlar yazar açıklamalarıdır.

## Temel sözlük

| Terim                    | İngilizce               | Ayırt edici anlam                                                                       |
| ------------------------ | ----------------------- | --------------------------------------------------------------------------------------- |
| Varlık                   | Asset                   | Korunmaya değer veri, para, itibar, süreklilik, insan hayatı                            |
| Tehdit                   | Threat                  | Zarar verebilecek olay veya aktör                                                       |
| Zafiyet                  | Vulnerability           | Kullanılabilecek zayıflık                                                               |
| Sömürü                   | Exploit                 | Zayıflığı kullanan somut teknik/kod                                                     |
| Risk                     | Risk                    | Giriş modeli: gerçekleşme olasılığı × olası etki                                        |
| Saldırı yüzeyi           | Attack surface          | Temas edilebilir noktaların bütünü; harita                                              |
| Saldırı vektörü          | Attack vector           | Belirli ulaşma yolu/yöntemi; rota                                                       |
| Tehdit istihbaratı       | Threat intelligence     | Aktör/kampanya/araç/yöntem bilgisinin işlenmiş, eyleme dönük hâli                       |
| Uzlaşma göstergesi (IOC) | Indicator of compromise | Ele geçirilmiş olabileceğine işaret eden dosya karması, IP, alan adı, kayıt defteri izi |
| Sıfırıncı gün            | Zero-day                | Kaynağın kullanımıyla: henüz yaması olmayan, çoğu zaman üreticinin bilmediği açık       |

## Bir olayı ayır

Kaynak örneği: **kart verisi** varlık; **suç grubu** tehdit; **SQL enjeksiyonu** zafiyet; **betik** sömürü; **ödeme formu** vektör; **olasılık × etki** risk; görülen **IP/User-Agent** bir IOC olabilir.

Kaynakta azaltım: parametreli sorgu + WAF + kart verisi yerine tokenizasyon. Bunlar farklı savunma noktalarıdır; WAF kök nedeni düzeltme garantisi vermez.

## Kritik ayrımlar

- Zafiyet ≠ onu kullanan exploit. Bilinen exploit olmaması güvenlik kanıtı değildir.
- Yüzey = tüm temas noktaları; vektör = belirli yol. E-posta, açık port, USB, API birer örnek yol olabilir.
- Nitel “yüksek × yüksek”, kendiliğinden parasal kayıp değildir. Sayısal hesapta dönem/birim/varsayım gerekir.
- IOC tek başına kesin ihlal hükmü değildir; IOC eşleşmemesi temiz sistem kanıtı değildir.
- Zero-day için hazır imza/IOC bulunmayabilir; bu, davranıştan tespit edilemez demek değildir.
- Sorumlu bildirim ve yama süreciyle açık bilinen “n’inci gün” açıklığına dönüşür; kullanılan tanımın sınırını belirt.
- [CIA](topic:cia-security-goals) “hangi hedef zarar görüyor?”, bu sözlük “hangi varlığa nasıl zarar gelebilir?” sorusunu düzenler.
