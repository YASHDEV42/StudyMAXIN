## Sınav özeti

- Yatay: aynı seviyede başka kullanıcıya; dikey: daha yüksek yetkiye geçiş.
- Linux izinleri: sahip/grup/diğerleri; capabilities root yetkisini parçalara böler.
- setuid/setgid etkin kimliği değiştirebilir; ayrıcalıklı kodda girdi, PATH ve dosya izinleri kritik.
- Sticky bit ortak yazılabilir dizinde dosya silmeyi sınırlar.
- Windows token yetki bağlamını taşır; UAC yükseltilmiş işlemleri denetler.
- Dirty COW: tarihsel yerel kernel yarış kusuru; güncel sistemde yamalıdır.
- TOCTOU: kontrol ile kullanım arasında nesne değişir. Confused deputy: yetkili vekil isteği yapanı doğru bağlamaz.
- En az ayrıcalık, yamalar, dar capability, güvenli izinler ve atomik işlemler.

- Linux izin biti: `r=4`, `w=2`, `x=1`; `rwxr-xr-x` = `755` (sahip/grup/diğerleri).
- `CAP_NET_BIND_SERVICE`: ayrıcalıklı düşük porta bağlanma; `CAP_SYS_ADMIN` geniş riskli yetkidir. `CAP_DAC_OVERRIDE`, `CAP_SYS_PTRACE`, `CAP_SETUID` ayrıca gözden geçirilir.
- Windows access token SID/grup/ayrıcalık taşır; `SYSTEM` yüksek ayrıcalıklı hesaptır; UAC yükseltmeyi denetler, tek başına tüm saldırı yollarını kapatmaz.
- setuid root + güvensiz PATH/dosya/girdi işlemi, düşük ayrıcalıklı kullanıcıdan dikey yükseltme yolu olabilir.
