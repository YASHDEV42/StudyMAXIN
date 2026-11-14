## Bölüm 1 Çözümlü Alıştırmalar — Sınav Özeti

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, 1.13; `teori-1-43-89.pdf`, fiziksel sayfa 7–11 (basılı 38–42). Bölüm özeti fiziksel 11’de biter.

### Hızlı kararlar: 15 alıştırma

1. **Hastane fidye yazılımı:** erişilebilirlik kesin etkilenir; gizlilik ancak veri sızdıysa; bütünlük ancak veri değişti/yok olduysa.
2. **Gizli algoritma:** algoritmanın gizliliği güvenlik kanıtı değildir. Kerckhoffs’a göre anahtar gizli kalmalıdır.
3. **Saldırı yüzeyi:** gereksiz API, SDK izinleri ve geniş WebView yetkilerini kapat/sınırla.
4. **STRIDE eşlemesi:** yetki yükseltme → yetkilendirme; inkâr → güvenilir denetim izi ve kanıt.
5. **Veri akışı:** T/I/D tipik akış tehditleri; R günlüklerle ilişkilidir. Öğeye uymayan STRIDE harfini zorla atama.
6. **DREAD:** eşit ağırlıkta X=26, Y=36; Damage×2: 35/40; ×3: 44/44; ×4: 53/48. Kitabın ×3’te X öne geçer açıklaması aritmetik olarak tutarsızdır.
7. **Nicel risk:** `SLE=30.000`, `ARO=4` ise `ALE=120.000`; ARO=1 olunca ALE=30.000, azalma 90.000. Maliyet 40.000 ise `ROSI=(90.000−40.000)/40.000=%125`.
8. **Gereksiz kimlik fotokopileri:** silip saklama gereğini kaldırmak riskten kaçınmadır.
9. **Muhasebe firması:** finansal amaçlı siber suçlu makul hipotezdir; APT çekiciliği kesin dışlanamaz. Yedek ve temel hijyen uygulanır.
10. **ROA:** parola: `(0,4×2000)/200=4`; passkey varsayımında `(0,02×2000)/800=0,05`.
11. **Acil BT telefonu:** otorite, aciliyet, korku → pretexting/vishing. Kapat, bilinen resmî numaradan doğrula, bildir.
12. **Tek güvenlik duvarı:** katman ekle (EDR, bölümleme, MFA/sıfır güven, yedek, kayıt); biri başarısız olunca etki sınırlansın.
13. **OR saldırı ağacı:** portal notu değiştirme maliyetleri 100/300/500 → en ucuz dal 100, oltalama. Maliyet örnek birimidir.
14. **Dalları savunma:** oltalama → MFA/farkındalık; IDOR → nesne başına sunucu tarafı yetki; SQLi → parametreli sorgu ve en az yetkili DB hesabı.
15. **Kill Chain kesme:** teslimde filtre/ek tarama/farkındalık; C2’de dış trafik ve DNS izleme/engelleme.

### Formüller ve ayrımlar

- CIA: **gizlilik**, **bütünlük**, **erişilebilirlik**; bir olay birden fazlasını etkileyebilir.
- `SLE=AV×EF`; `ALE=SLE×ARO`; **ROSI** kontrolün risk azalmasını kontrol maliyetiyle karşılaştırır.
- `ROA=p×V/Ca`: başarı olasılığı `p` veya varlık değeri `V` düşürülür, saldırı maliyeti `Ca` yükseltilir.
- Risk yanıtları: **azaltma**, **aktarma**, **kabul**, **kaçınma**. Gereksiz veriyi silmek kaçınmadır.
- STRIDE tehdit sınıflandırır; DREAD göreli öncelik verir (öznel); saldırı ağacı yolları/gate’leri modeller; PASTA süreci düzenler.
- OR ağacında en ucuz dal `min`; AND düğümünde gerekli maliyetler toplanır. Gate varsayımı ve maliyet ölçeği açık olmalıdır.
- APT: **Advanced** (ileri yetenek), **Persistent** (ısrarcı/uzun süreli), **Threat** (tehdit aktörü). Bu kısaltma tek başına saldırgan kimliğini kanıtlamaz.

### Kendini Sına — sekiz kısa yanıt

1. Hastane olayında erişilebilirlik kesin; gizlilik sızıntıya, bütünlük değişim/kurtarmaya bağlı.
2. Güvenlik belirsiz tasarıma değil gizli anahtara dayanır (Kerckhoffs).
3. Depo/akış bağlamında T, I, D; R günlüklerde. S/E kaynak sınıflamasında veri deposunun kendi tehdidi değildir.
4. DREAD özneldir ve eşit ağırlık varsayabilir; ortak ölçek ve gerekçeli ağırlık kullan.
5. SLE olay başına; ALE yıllık kayıp; ROSI kontrol getirisini maliyetle karşılaştırır.
6. Risk yanıtları azalt, aktar, kabul et, kaçın.
7. ROA’yı düşürmek için `p` ve/veya `V` azaltılır, `Ca` artırılır.
8. APT’de Advanced ileri yetenek, Persistent uzun süreli ısrar, Threat örgütlü/kaynaklı tehdit anlamındadır.

**Kaynak düzeltme:** 6. alıştırmada verilen sayılar Damage üç kat ağırlıklandırıldığında X=Y=44 verir; kaynak metindeki X’in öne geçeceği iddiası bu sayılarla uyuşmaz.
