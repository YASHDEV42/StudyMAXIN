## Temel kavramlar
- **CPU + controller + bus + memory:** Bilgisayar-sistem organizasyonunun temel bileşenleri.
- **Device controller:** Donanımsal aygıt kontrolü.
- **Device driver:** OS ile controller arasında yazılım arayüzü.
- **Local buffer:** Denetleyicide geçici veri tutma alanı.
- **Bootstrap:** Donanımı başlat → kernel'i belleğe yükle → kernel'i çalıştır → sistem servislerini başlat.
- **Interrupt:** CPU'ya bir olayın bildirilmesi.
- **ISR / Interrupt Handler:** Kesmeye yanıt veren rutin.
- **Interrupt Vector:** Kesme türünden uygun hizmet rutini adresine yönlendirir.
- **Trap / Exception:** Yazılım isteği veya komut yürütmesinden doğan istisnai olay.

## Kesme akışı
Olay/kesme → yürütme durumunu koruma → ISR seçimi → kesmeyi işleme → uygun yürütmeye dönüş.

**Dikkat:** Controller ile driver aynı şey değildir. Kesmede programın devamı için yeterli CPU durum bilgisi korunmalıdır.
