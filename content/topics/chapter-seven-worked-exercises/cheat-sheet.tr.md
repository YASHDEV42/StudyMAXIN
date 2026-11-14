## Çözümlü örneklerin kısa yanıtları

1. **Kafe MITM:** Katman 2 ARP zehirleme; ARP kimlik doğrulamaz. TLS içeriği korur.
2. **SYN flood:** 512/1000 ≈ 0,512 saniyede kuyruk dolar; SYN cookie durumu ACK doğrulanana dek erteler.
3. **DNS gizliliği + doğruluk:** DoH/DoT sorguyu şifreler; DNSSEC imzayı doğrular. Birlikte gerekir.
4. **Nmap sürümü:** `-sV` olası CVE araştırmasını hedefler; sürüm metni açık kanıtı değildir.
5. **SYN cookie:** sunucu gizli anahtarlı doğrulama alanını sıra numarasına kodlar; geçerli ACK’te yeniden hesaplar.
6. **WireGuard/IPsec:** sabit modern takım ve Noise el sıkışması seçenek/yapılandırma riskini azaltır; X25519 ortak sır içindir. Mutlak ürün üstünlüğü iddiası değildir.
7. **KRACK:** üçüncü el sıkışma mesajının yeniden oynatılması bazı istemcilerde anahtar/nonce sayacını yeniden kurar; algoritma kırılması değildir.
8. **Amplification:** `20 × 50 = 1000 Mbit/s`; spoofing yanıtı kurbana yöneltir, BCP 38 kaynağı doğrular.
9. **IDS eşiği:** düşük hızla eşik altı kalma; uzun pencere, hesap analizi ve anomali katmanı.
10. **Katman eşlemesi:** SYN flood–taşıma; ARP poisoning–ağ erişimi; DNS poisoning–uygulama; kaynak IP spoofing–internet.

## Öz-test konuları

- SYN flood hangi el sıkışma adımını ve hangi kaynağı tüketir?
- ARP saldırısı neden yerel ağ konumu ister? TLS neyi korur?
- DNSSEC ile DoH/DoT hangi farklı hedeflere hizmet eder?
- `-sS` ile `-sT` el sıkışma ve görünürlük açısından nasıl ayrılır?
- İmza ve anomali tespitinin birer güçlü/zayıf yanı nedir?
- WireGuard hangi Noise kalıbı/eğriyi kullanır; `AllowedIPs` neyi bağlar?
- Amplification neden spoofing’e dayanır; BCP 38 nerede uygulanır?
- WPA2 PTK girdileri ve KRACK’in durum hatası nelerdir?

## Bölüm özeti

Katmanlar farklı adresleri ve saldırı yüzeylerini taşır; IP/TCP başlıkları kriptografik kimlik kanıtı değildir. SYN cookies, ARP kontrolleri, DNSSEC ve şifreli DNS farklı problemlere yanıt verir. Wireshark gözlem, nmap envanter, firewall politika, IDS/IPS tespit ve engelleme içindir. VPN tüneli ve WPA3 kablosuz bağlantıyı güçlendirir; DDoS için dağıtık ve katmanlı kapasite gerekir. Tek bir kontrol tüm ağı veya tüm CIA hedeflerini korumaz. Bölüm 8’de bu ağ sınırları host ve işletim sistemi güvenliğiyle birleşir.
