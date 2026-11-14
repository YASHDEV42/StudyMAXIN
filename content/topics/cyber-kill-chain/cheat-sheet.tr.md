## Cyber Kill Chain — Sınav Özeti

**Kaynak:** _Bilgi Sistemleri ve Güvenliği_, 1.9, `teori-1-43-89.pdf`, fiziksel sayfa 1–2 (basılı 32–33); 1.10’dan önce.

## Yedi aşama

| Sıra | Aşama                                               | Amaç / örnek                                           |
| ---: | --------------------------------------------------- | ------------------------------------------------------ |
|    1 | **Keşif — Reconnaissance**                          | Hedef bilgisi toplama: portlar, çalışanlar, e-postalar |
|    2 | **Silahlandırma — Weaponization**                   | Zararlı yük hazırlama: ör. tuzaklı belge               |
|    3 | **Teslim — Delivery**                               | Yükü ulaştırma: oltalama e-postası, USB                |
|    4 | **Sömürü — Exploitation**                           | Açıklığı tetikleyip kod çalıştırma                     |
|    5 | **Kurulum — Installation**                          | Kalıcılık kurma: arka kapı                             |
|    6 | **Komuta ve kontrol — C2**                          | Saldırgan için uzaktan yönetim kanalı                  |
|    7 | **Hedefe yönelik eylemler — Actions on Objectives** | Veri sızdırma, şifreleme, sabotaj                      |

**Sıra:** bilgi topla → yük hazırla → teslim et → açığı kullan → kalıcılık kur → uzaktan yönet → hedefte eylem yap.

## Savunma ve yorum

- Kaynağın verdiği durdurma örnekleri: **teslim** aşamasında oltalama filtresi; **sömürü** aşamasında güncel yama; **C2** aşamasında anormal giden trafiği tespit etme.
- Her aşama bir müdahale fırsatıdır; zincirin herhangi bir halkası kesilirse saldırı hedefe ulaşamayabilir.
- Keşif aşamasını tespit etmek zor olabilir.
- Model **doğrusal** olduğu için iç tehdit ve bulut ortamlarının her tür davranışına tam uymaz.
- **MITRE ATT&CK**, saldırgan davranışlarını daha ayrıntılı tekniklere ayıran karşılaştırma çerçevesidir; kaynak bunu 13. haftaya bırakır.
- **Kill Chain:** aşama/süreç sırası. **Saldırı ağacı:** hedefe ulaşan alternatif yollar. İkisi birbirini tamamlar; aynı model değildir.
