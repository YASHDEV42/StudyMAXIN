## Kullanıcıya yönelik servisler
- **UI:** CLI, GUI, batch, touch.
- **Program execution:** Belleğe yükle → çalıştır → normal/hatalı sonlandır.
- **I/O operations:** OS aracılığıyla aygıt erişimi.
- **File-system manipulation:** Oluştur, sil, aç, oku, yaz, adlandır, izin yönet.
- **Communication:** Shared memory / message passing.
- **Error detection:** Donanım, I/O, program hatalarını bul, raporla, mümkünse düzelt.

## Verimlilik/güvenlik servisleri
- **Resource allocation:** CPU, bellek, disk, aygıt kaynaklarını dağıt.
- **Accounting / logging:** Kullanıcının kaynak kullanımını izle ve kaydet.
- **Protection:** Kaynaklara yetkili erişimi denetle.
- **Security:** Sistemi yetkisiz erişim ve saldırılara karşı koru.
- **Şema:** User/application → UI → system calls → OS services → hardware.

**Karıştırma:** Resource allocation ≠ accounting; protection ≠ error detection.
