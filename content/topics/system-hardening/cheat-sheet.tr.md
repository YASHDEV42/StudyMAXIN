## Sınav özeti

- Saldırı yüzeyi = erişilebilir kod, servis, arayüz ve yapılandırma alanı; gereksiz servisleri azalt.
- Yama döngüsü: envanter, öncelik, test, dağıtım, doğrulama, istisna takibi.
- WannaCry: yamalanmamış bilinen açıklık + yayılım koşulları etkiyi büyüttü.
- CIS Benchmark güvenli taban sunar; ortama göre test/istisna gerekir.
- Günlükler görünürlük sağlar, tek başına önleme değildir; bütünlük, erişim ve zaman eşleme önemlidir.
- Allowlisting onaylı yazılımı sınırlar; istisna/bakım yönetimi gerekir.

Örnek inceleme adımları (dağıtım ve erişim planına göre uyarlanır):

```sh
systemctl list-unit-files --type=service --state=enabled
ufw default deny incoming
ufw allow 22/tcp
find / -perm -4000 -type f 2>/dev/null
```

Firewall kuralını etkinleştirmeden önce yönetim erişimini ve kurtarma yolunu doğrula. Kaynaktaki auditd örnekleri `/etc/shadow` yazma girişimlerini ve `setuid`/`setgid` çağrılarını izleyecek şekilde kuruludur; günlükleri korunan merkezi sisteme aktar.
