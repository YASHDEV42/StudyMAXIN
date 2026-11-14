> **Kapsam:** 1.5.4–1.5.6; fiziksel PDF 32–34 / basılı 21–23, 1.6 hariç. Maliyet/kapı ve kontrol sınırları yazar açıklamalarıyla açıklaştırılmıştır.

## Saldırı ağacı kuralları

- **Kök:** nihai amaç. **Dal:** alt hedef/yol. **Yaprak:** somut adım.
- **VEYA (OR):** bir alt yol yeterli; basit en-ucuz-maliyet modelinde `min`.
- **VE (AND):** tüm alt adımlar gerekli; toplamsal maliyet modelinde `sum`.
- Yaprağa maliyet, başarı olasılığı veya beceri niteliği eklenebilir; min/toplam kuralları burada **maliyet** içindir, olasılığa aynen uygulanmaz.

| Kaynağın e-posta örneği                     | Hesap            | Maliyet |
| ------------------------------------------- | ---------------- | ------- |
| Parola: oltalama VE tuş kaydedici           | 100+400          | 500     |
| Oturum: XSS ile çerez çalma                 | 700              | 700     |
| Kurtarma: SIM değiştirme VE güvenlik sorusu | 300+50           | 350     |
| Kök VEYA                                    | min(500,700,350) | **350** |

VE kapıları örneğin varsayımıdır; oltalama ve tuş kaydedici her gerçek saldırıda birlikte gerekli değildir. Sayılar gerçek fiyat değildir. Eksik yollar/bağımlılıklar sonucu değiştirebilir.

## Savunmayı doğru dala bağla

- Öğretim üyesi hesabını ele geçirme → **MFA + farkındalık**.
- Yetkilendirme/IDOR yolu → **RBAC + sunucu tarafı nesne/işlem izni**.
- Yalnız MFA, nesne düzeyindeki izin hatasını düzeltmez. Yalnız rol kontrolü her kayıt için erişim hakkını garanti etmez.
- Kontrol modelde var diye etkili olduğu doğrulanmış sayılmaz; kalan alternatif yolları incele.

## Portal örneğinin sırası

1. **Varlıklar:** not bütünlüğü, öğrenci verisi gizliliği, sınav zamanı erişilebilirlik.
2. **DFD:** tarayıcı (dış varlık) ↔ HTTPS ↔ web sunucusu (süreç) ↔ SQL ↔ veritabanı (depo). Sınırlar: internet–sunucu, sunucu–veritabanı.
3. **STRIDE:** oturum taklidi; not kurcalama; değişikliği inkâr; SQL ifşası; yük/DoS; öğrenci rolünden öğretim üyesine yükselme.
4. **Öncelik:** ham DREAD DoS’u öne çıkarır; Damage×2 eşitler, ×3 not değişimini öne alır. İş bağlamını gerekçelendir.
5. **Azalt → risk kaydına yaz → değerlendir → değişince yinele.**

## Örnek risk kaydı

| Tehdit                  | Hedef / öncelik        | Azaltım                                 |
| ----------------------- | ---------------------- | --------------------------------------- |
| Kendi notunu değiştirme | Bütünlük / yüksek      | Sunucuda izin + RBAC + audit log        |
| Başkasının notunu görme | Gizlilik / yüksek      | Nesne düzeyi izin, IDOR koruması        |
| Oturum ele geçirme      | Kimlik / orta          | MFA + güvenli çerez/oturum              |
| Sınav gecesi DoS        | Erişilebilirlik / orta | Yük dengeleme, önbellekleme, hız sınırı |
| Hata ifşası             | Gizlilik / düşük       | Jenerik hata                            |

Öncelikler bu kaynak senaryosunundur; evrensel ölçüm değildir. **Risk kaydı:** tehdit + hedef + öncelik + azaltım. Bulgu kaydı, uygulanmış/doğrulanmış savunma ile aynı şey değildir.

[STRIDE](topic:threat-modeling-stride) · [DREAD ve PASTA](topic:threat-prioritization-methods)
