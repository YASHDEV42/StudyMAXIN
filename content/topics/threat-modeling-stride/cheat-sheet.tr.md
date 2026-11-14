> **Kapsam:** 1.5 başlangıcı + 1.5.1; fiziksel PDF 27–29 / basılı 16–18. Önceki 1.4 ve sonraki DREAD hariç. Sınır/sertifika/çoklu kategori uyarıları yazar açıklamasıdır.

## Dört soru ve dört DFD öğesi

**Döngü:** Neyi koruyoruz? → Kimden? → Nasıl saldırabilirler? → Yeterince iyi savunuyor muyuz? → Sistem değiştikçe tekrar.

DFD: **dış varlık, süreç, veri deposu, veri akışı**. Güven sınırı, güven varsayımının değiştiği geçiştir; beşinci veri işleme öğesi değildir.

## STRIDE eşlemesi

| Harf | Tehdit                                   | Güvenlik hedefi   | Kaynakta azaltım örnekleri                                      |
| ---- | ---------------------------------------- | ----------------- | --------------------------------------------------------------- |
| S    | Spoofing / Kimlik taklidi                | Kimlik doğrulama  | Passkey/MFA, TLS sunucu kimliği, güvenli oturum çerezi          |
| T    | Tampering / Kurcalama                    | Bütünlük          | Sunucu doğrulaması, HMAC, dosya izinleri, değişmez altyapı      |
| R    | Repudiation / İnkâr                      | İnkâr edilemezlik | Korunan audit log, dijital imza, zaman damgası                  |
| I    | Information disclosure / Bilgi ifşası    | Gizlilik          | Jenerik hata, alan düzeyi izin, şifreleme, en az veri           |
| D    | Denial of service / Hizmet dışı bırakma  | Erişilebilirlik   | Hız sınırı, kota, CDN/DDoS koruması, ölçekleme                  |
| E    | Elevation of privilege / Yetki yükseltme | Yetkilendirme     | En az yetki, sağlam izin denetimi, güncelleme, ayrıcalık ayrımı |

Örnekler: sahte banka alan adı/çalınmış çerez (S), fiyat veya ayar değişimi (T), kanıtsız işlem inkârı (R), hata mesajı/fazla API alanı (I), pahalı sorgu/bant genişliği tüketimi (D), normal kullanıcıdan yöneticiye geçiş (E).

## STRIDE-per-element

| DFD öğesi   | Sorulacak harfler |
| ----------- | ----------------- |
| Dış varlık  | S, R              |
| Süreç       | S, T, R, I, D, E  |
| Veri deposu | T, R (log), I, D  |
| Veri akışı  | T, I, D           |

1. DFD ve güven sınırlarını çiz.
2. Her öğeye uygun harflerden somut senaryolar üret.
3. Etkilenen hedefi ve azaltımı kaydet.
4. Önceliklendir, kontrolü değerlendir, değişiklikte modeli yenile.

**Karıştırma:** STRIDE sınıflandırır/buldurur; DREAD puanlar; saldırı ağacı yolları modeller; PASTA süreci yönetir. Bir olay birden çok kategoriye girebilir. Tablodaki çizgi “imkânsız tehdit” kanıtı değildir. Geçerli sertifika tek başına doğru banka alan adında olunduğunu kanıtlamaz; imzada kimlik–anahtar bağı gerekir.

[Önceliklendirme](topic:threat-prioritization-methods) · [Ağaçlar ve portal modeli](topic:attack-trees-portal-model)
