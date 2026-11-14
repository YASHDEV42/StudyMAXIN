## Güvenlik Ekonomisi ve İnsan Boyutu — Sınav Özeti

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, 1.10, `teori-1-43-89.pdf`, fiziksel sayfa 2–5 (basılı 33–36).

## ROA: saldırganın ekonomik hesabı

- `E[kazanç] = p × V − Ca`
- `p`: saldırının başarı olasılığı; `V`: başarı hâlindeki kazanç; `Ca`: saldırganın maliyeti.
- `p × V > Ca` ise beklenen net kazanç pozitiftir.
- `ROA = (p × V) / Ca`; modelde `ROA > 1` saldırıyı ekonomik açıdan kârlı gösterir.
- Savunmacı: **`p`’yi düşürür**, **`V`’yi düşürür**, **`Ca`’yı artırır**. Gereksiz veriyi tutmamak `V`’yi azaltabilir; kontrol/iş faktörü `Ca`’yı artırabilir.
- Kaynak örneği: `V=1000`; parola `p=.5, Ca=100 → ROA=5`; MFA varsayımı `p=.05, Ca=500 → ROA=.1`. Saldırı imkânsız değil, daha az kârlı olur.
- **ROA ≠ ROSI:** ROA saldırganın getirisini, ROSI güvenlik yatırımının savunmacıya getirisini ölçer.

## Sosyal mühendislik

| Tür                | Tanım                                                     |
| ------------------ | --------------------------------------------------------- |
| Phishing           | Sahte görünen değil, meşru görünen mesaj/siteyle kandırma |
| Spear phishing     | Belirli kişiye göre hazırlanmış oltalama                  |
| Whaling            | Üst düzey yöneticileri hedefleme                          |
| Smishing / Vishing | SMS / sesli arama yoluyla oltalama                        |
| Pretexting         | Güven kazandıran sahte senaryo kurma                      |
| Baiting            | Merak veya açgözlülükle tuzağa çekme                      |
| Quid pro quo       | Yardım/hizmet karşılığında bilgi veya erişim isteme       |

**İkna etkenleri:** otorite, aciliyet, kıtlık, sosyal kanıt, sempati/yardımseverlik, tanıdık isim/markaya güven. Şüpheli acil isteği bağımsız ve bilinen ikinci kanaldan doğrula; parola veya gizli doğrulama kodunu paylaşma.

## Güvenlik kültürü

- Güvenlik, yönetici ve çalışanların ortak sorumluluğudur.
- Şüpheli mesajı ceza korkusu olmadan bildirme, eğitim, tatbikat ve açık bildirim kanalı güvenli davranışı destekler.
- SOC’ta teknoloji kadar uyarıları yorumlayan ve müdahale eden insanlar önemlidir.
- “Güvenlik bir ürün değil, bir süreçtir”: tehdit ve sistem değiştikçe kontrolleri gözden geçir.
