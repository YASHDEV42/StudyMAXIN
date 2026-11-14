> **Kapsam:** 1.2–1.2.3; fiziksel PDF 18–21 / basılı 7–10. Önceki etik uyarı ve sonraki 1.3 hariç. MS17-010/FIPS ayrımları ve belirsizlik notları yazar doğrulama ekleridir.

## Kronoloji ve neden önemli?

| Dönem / olay                                 | Öğrenilecek bağ                                                             |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| 1960’lar, zaman paylaşımı                    | Pahalı işlemciyi paylaş; kullanıcıların dosya/bellek haklarını ayır         |
| 1965 Multics                                 | Koruma halkaları, ACL, bellek yalıtımı, güvenliğin baştan tasarımı          |
| Unix çizgisi                                 | Ken Thompson/Dennis Ritchie; kullanıcı–grup–diğer izinleri; dosya yaklaşımı |
| 1970 Ware Raporu                             | Sistematik güvenlik mühendisliği                                            |
| 1983 Orange Book / TCSEC                     | Güvenilir sistemleri ölçütlerle değerlendirme                               |
| 2 Kasım 1988 Morris                          | Birden çok giriş yolu + yeniden bulaşma → kaynak tüketimi                   |
| Olay sonrası CERT/CC                         | Teknik yamaya ek koordineli müdahale ve bilgi paylaşımı                     |
| 1990’lar web/ticarileşme                     | Tarayıcı, e-ticaret, bankacılık → büyüyen yüzey                             |
| 2000’ler suç ekonomisi                       | Kimlik/kart dolandırıcılığı, spam, maddi motivasyon                         |
| 2003 Slammer                                 | Otomasyonun küçük kusurları büyütmesi                                       |
| 2010 Stuxnet                                 | Endüstriyel yazılımın fiziksel süreci etkilemesi                            |
| 2013 Snowden                                 | Kitlesel gözetim / mahremiyet                                               |
| 2017 WannaCry ve NotPetya                    | Küresel hizmet etkisi; WannaCry’da EternalBlue/SMBv1 + fidye                |
| 2020 SolarWinds; 2021 Log4Shell; 2023 MOVEit | Ortak tedarik/bağımlılık etkisi; teknik yolları aynı değildir               |

## Morris mekanizması

- Eski Unix: e-posta hata ayıklama yolu, ağ hizmeti taşması, zayıf parola.
- “Zaten bulaşmış” yanıtını taklit eden savunmayı aşmak için bazı durumlarda yeniden kopyalanma → aynı makinede çok kopya → hizmet aksaması.
- Yaklaşık **6.000 / 60.000 ≈ %10**, kesin envanter değildir. İleri sürülen niyet ile gözlenen etkiyi ayır.
- CERT = Computer Emergency Response Team; CSIRT = Computer Security Incident Response Team. Kaynak USOM/TR-CERT’i örnekler.
- Morris’in daha sonra MIT’de akademisyen olması ve 1986 CFAA kapsamındaki ilk mahkûmiyet tarihsel notlardır. [Olay doğrulaması](https://www.fbi.gov/history/cases-and-criminals/morris-worm), [CERT/CC tarihi](https://www.sei.cmu.edu/history-of-innovation/fostering-growth-in-professional-cyber-incident-management/).

## Şekiller ve terim tuzakları

- Stuxnet şeması: USB → WinCC/SCADA → S7-300/S7-400 PLC katmanı → I/O/fiziksel süreç. Şema her donanımın aynı biçimde etkilendiğinin kanıtı değildir. USB giriş yolu kaynakta olasılıklı anlatılır.
- WannaCry haritası ölçeği gösterir; kesin ülke/cihaz sayısı vermez.
- [MS17-010](https://learn.microsoft.com/en-us/security-updates/securitybulletins/2017/ms17-010) tek CVE değil, birden çok SMB kusurunu kapsayan bülten/güncellemedir.
- Kaynağın 2025–2026 çerçevesi: bulut/konteyner, AI saldırı ve savunması, sıfır güven, kuantum sonrası hazırlık.
- [ML-KEM/FIPS 203](https://csrc.nist.gov/pubs/fips/203/final): anahtar kapsülleme; [ML-DSA/FIPS 204](https://csrc.nist.gov/pubs/fips/204/final): dijital imza.
- **Ana ilişki:** paylaşım/bağımlılık değişir → güven sınırını yeniden değerlendir. Yeni dönem, eski yalıtım ve izin ihtiyacını kaldırmaz.

[CIA](topic:cia-security-goals) · [Güvenlik zihniyeti](topic:security-mindset) · [Log4Shell](topic:log4shell-trust-boundaries)
