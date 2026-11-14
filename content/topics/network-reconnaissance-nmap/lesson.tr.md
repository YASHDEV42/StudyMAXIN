## Keşif ve saldırı yüzeyi

Port taraması ayakta hostları, dinleyen portları ve bu portların arkasındaki servisleri belirlemeye yardım eder. Saldırgan bunu hedef seçmek için, savunmacı ise dışarıdan görünen envanteri doğrulamak için kullanabilir. Açık port bir hizmetin erişim yüzeyidir; gereksiz servisi kapatmak riski azaltır.

## Nmap sonuçlarını yorumlama

`-sS` SYN gönderir. SYN‑ACK yanıtı açık portla, RST kapalı portla uyumludur; yanıtsızlık filtreleme veya paket kaybı anlamına gelebilir. SYN‑ACK’ten sonra RST göndererek tam bağlantıyı tamamlamaması nedeniyle yarı açık tarama denir. `-sT` tam TCP connect kullanır; root yetkisi gerektirmeyebilir ve daha görünürdür. Hiçbiri görünmezlik garantisi vermez.

`-sn` yalnızca host keşfi yapar; `-sU` UDP portlarını sınar; `-sV` açık servisin sürümünü tahmin eder; `-O` yığın davranışından işletim sistemi çıkarımı yapar; `-p-` tüm 65.535 TCP portunu tarar. Sürüm bilgisi CVE araştırmasını hedefler, ancak banner eşleşmesi tek başına sistemin savunmasız olduğunu kanıtlamaz: dağıtım yamaları sürüm metnini değiştirmeden açığı kapatabilir; ağ koşulları da ölçümü etkiler.

Tarama sadece sahibinin olduğun ya da açık izin aldığın sistemlerde yapılmalıdır. Bu, teknik bir ayrıntı değil, test kapsamının ve yetkilendirmenin parçasıdır.
