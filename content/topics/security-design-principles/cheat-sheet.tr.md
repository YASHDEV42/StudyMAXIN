## Güvenlik Tasarım İlkeleri — Sınav Özeti

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, 1.7, `teori-1-1-42.pdf`, fiziksel sayfa 38–40 (basılı 27–29).

## Saltzer ve Schroeder’in sekiz klasik ilkesi

| İlke                                                               | Sınavlık tanım / sonuç                                                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **En az yetki** (_least privilege_)                                | Kullanıcı, süreç ve bileşen yalnızca işi için gereken en düşük yetkiyi alır; ihlal etkisini sınırlar.              |
| **Yetkilerin ayrılığı** (_separation of privilege / duties_)       | Kritik işlem birden fazla bağımsız yetki veya kişinin katılımını gerektirir; tek kişinin suistimalini zorlaştırır. |
| **Güvenli varsayılan** (_secure by default / fail-safe defaults_)  | Açık izin yoksa reddet; hata durumunda güvenli tarafa düş. Varsayılan açık sistem savunmasız başlar.               |
| **Açık tasarım** (_open design / Kerckhoffs_)                      | Güvenlik tasarım gizliliğine değil gizli anahtara dayanır. Tasarım bilinince çöken yaklaşım güvenlik değildir.     |
| **Tam aracılık** (_complete mediation_)                            | Her erişim isteğini denetle; ilk izin veya önbelleğe alınmış eski karar sonsuza dek yeterli değildir.              |
| **Mekanizma ekonomisi** (_economy of mechanism_)                   | Gereksiz karmaşıklığı azalt; küçük ve anlaşılır tasarım denetlenebilirliği artırır.                                |
| **En az ortak mekanizma** (_least common mechanism_)               | Kullanıcılar arası paylaşılan kaynakları azalt ve ayır; ortak mekanizma sızıntı/etkileşim yolu olabilir.           |
| **Psikolojik kabul edilebilirlik** (_psychological acceptability_) | Güvenlik kullanışlı olmalı; aşırı zorluk kullanıcıyı etrafından dolaşmaya iter.                                    |

## Sık karıştırılanlar

- **Derinlemesine savunma**, Saltzer ve Schroeder’in klasik sekiz ilkesinden biri değildir; katmanlı ve tamamlayıcı bir yaklaşımdır.
- Katman çizimindeki ögeler: **insan → cihaz → ağ → uygulama → veri/politika**. Bir katman başarısız olsa da diğerleri korumayı sürdürmelidir.
- **Açık tasarım ≠ güvenlik açığı:** tasarımın bilinmesi güvenliği bozmamalıdır. Güvenliği tasarımı saklamaya bağlamak _security by obscurity_’dir.
- **Yetkilerin ayrılığı ≠ en az yetki:** ilki kritik görevi bağımsız parçalara ayırır; ikincisi her öznenin kapsamını küçültür.
- **Tam aracılık ↔ sıfır güven:** her isteği kontrol etme, sıfır güvenin dayandığı temel sezgilerden biridir; kavramlar aynı ad değildir.

## Tamamlayıcı güncel yaklaşımlar

1. **Sıfır güven:** ağ içi/dışı konumdan bağımsız olarak her isteği doğrula.
2. **Saldırı yüzeyini küçültme:** gereksiz portları, hizmetleri, hesapları ve özellikleri kapat.
3. **Tasarımda güvenlik/mahremiyet:** bu gereksinimleri sistemin ilk tasarımından itibaren ele al.

**Tasarım kontrol soruları:** En az yetki var mı? Varsayılan kapalı mı? Her istekte yetki kontrol ediliyor mu? Tasarım açık olsa güvende kalır mı? Gereksiz karmaşıklık veya ortak kaynak var mı? Kullanıcılar güvenli yolu gerçekten kullanabilir mi?
