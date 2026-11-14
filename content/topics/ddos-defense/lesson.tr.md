## DDoS ve botnet

Dağıtık hizmet engelleme saldırısında çok sayıda ele geçirilmiş cihaz hedefe eşzamanlı trafik gönderir. Dağıtıklık toplam kapasiteyi büyütür ve tek bir kaynak adresini engelleyerek saldırıyı durdurmayı zorlaştırır. Mirai’nin varsayılan parolalı IoT cihazlarını botnet’e katması, ucuz ve unutulmuş cihazların başkalarına zarar verebileceğini gösterir.

## Üç saldırı sınıfı

- **Hacimsel:** İnternet bağlantısının bant genişliğini doldurur; UDP flood ve amplification örnektir.
- **Protokol:** Ağ cihazının bağlantı durumu gibi kaynakları tüketir; SYN flood örnektir.
- **Uygulama:** Meşru görünen ama pahalı HTTP işlemlerini yoğunlaştırarak uygulama kaynaklarını yorar.

Amplifikasyonda saldırgan, küçük UDP sorgusuna büyük cevap veren yanlış yapılandırılmış servise kurbanın kaynak IP’sini yazar. Yanıt kurbana yönlenir. 20 Mbit/s sorgu × 50 kat ≈ 1000 Mbit/s (1 Gbit/s) hedef trafiği verir; bu kaba oran hesabıdır. BCP 38 kaynak doğrulaması sahte kaynaklı paketleri sağlayıcı ağında filtrelemeyi amaçlar. DNS, eski NTP monlist, SSDP ve açık memcached gibi servisler tarihsel örneklerdir; tablodaki oranlar yaklaşık ve yapılandırmaya bağlıdır.

## Katmanlı savunma

CDN dağıtık kapasite sunar ve gerçek sunucu adresinin gizlenmesine yardım eder. Scrubbing merkezleri şüpheli trafiği süzer. Hız sınırlama ve davranış kontrolleri uygulama katmanındaki aşırı isteklere yanıt verir. Kaynak adres doğrulaması saldırı altyapısındaki spoofing’i azaltır. Her yöntem farklı darboğaza yöneliktir; SYN cookie hacimsel saldırının tamamını çözmez, CDN de pahalı veritabanı sorgusunu kendiliğinden ucuzlatmaz. Önceki SYN flood konusundaki kuyruk tüketimi, burada daha geniş kaynak türlerine ölçeklenmiştir.
