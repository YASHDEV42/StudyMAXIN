## Kuyruklar
- **Job queue:** Sisteme gönderilen işler.
- **Ready queue:** CPU bekleyen çalıştırılabilir process'ler.
- **Device queue:** I/O tamamlanmasını bekleyenler.
- **Ready → Running:** Scheduler seçer, dispatcher geçirir.
- **Running → Waiting → Ready:** I/O isteği → I/O tamamlanması.

## Scheduler türleri
- **Long-term:** Job admission; multiprogramming derecesini etkiler.
- **Short-term:** Ready'den CPU'ya; sık ve hızlı.
- **Medium-term:** Swapping (swap out / swap in).

## İş yükleri
**CPU-bound:** Uzun CPU burst. **I/O-bound:** Kısa CPU burst, sık I/O bekleme.

**Sınav farkı:** Scheduler = hangi süreç? Dispatcher = CPU'ya geçişi kim yapar?
