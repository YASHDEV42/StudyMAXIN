## Bellek
- **RAM:** Ana bellek; genellikle volatile; komutların yürütülmesi için gereklidir.
- **Secondary storage:** HDD/SSD gibi kalıcı veri saklama.
- **Hiyerarşi:** Registers → Cache → RAM → SSD/HDD → Optical Disk → Tape.
- **Yukarı çıkıldıkça:** Hız ↑, bit başına maliyet ↑, kapasite genellikle ↓.
- **Von Neumann:** Komut ve veri bellekte; fetch → decode → execute.
- **Caching:** Bilgiyi yavaş depolamadan hızlı seviyeye kopyala; erişimde önce cache'i kontrol et.

## I/O
- **Blocking/waiting I/O:** Kontrol I/O tamamlanınca döner.
- **Nonblocking/asynchronous çalışma:** Kontrol tamamlanma beklenmeden dönebilir.
- **DMA:** Controller cihaz ile bellek arasında veri bloğunu doğrudan taşır.
- **Avantaj:** CPU'nun bayt başına müdahalesi ve kesme yükü azaltılabilir; CPU başka işlere devam edebilir.
- **Bitiriş:** Controller işlemin tamamlandığını interrupt ile bildirir.
