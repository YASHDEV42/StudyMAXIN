## Multithreaded process'te fork() ve exec()

Slayt 37, UNIX sistemlerde multithreaded process üzerinde `fork()` için tarihsel iki farklı davranıştan söz eder: tüm thread'leri kopyalayan veya yalnız çağıran thread'i yeni child'da oluşturan yaklaşım.

**Düzeltme:** Güncel POSIX `fork()` için multithreaded parent'tan doğan **child process yalnız fork'u çağıran thread'i içerir**. Diğer thread'lerin synchronization durumundan kalma mutex kilitleri sorun yaratabileceği için, child'ın `exec` öncesi güvenli davranması önemlidir.

**`exec()`** yeni process oluşturmaz ve tüm thread'leri “duplicate” etmez: var olan process image'ını yeni programla değiştirir; başarılı `exec` sonrası eski thread'ler devam etmez. Bu nokta slayttaki yanlış genellemeyi düzeltir.

## Signals (sinyaller)

UNIX **signal (sinyal)**, bir olay bildirimidir. **Synchronous signal (senkron sinyal)** çoğunlukla belirli thread'in yaptığı hatalı işlemden kaynaklanır (örneğin invalid memory access / sıfıra bölme) ve ilgili thread'i hedefler. **Asynchronous signal (asenkron sinyal)** başka process, kullanıcı eylemi veya sistem olayı ile gelebilir (Ctrl+C ve SIGINT).

Slayt 38'de signal teslimi için farklı hedefler belirtilir: olayın gerçekleştiği thread, belirli/uygun thread, process'e iletilen signal'ı alacak uygun thread veya kurallara göre thread grubunun tamamı. Somut davranış signal türüne ve OS'ye bağlıdır.

## Fonksiyonlar

- **`kill(pid, sig)`:** Process veya process group'a signal gönderir; adı “kill” olsa da her signal süreci öldürmez.
- **`pthread_kill(thread, sig)`:** Belirli Pthreads thread'ine signal gönderir.
- **Signal handling (sinyal işleme):** Signal yakalama, bloklama, görmezden gelme gibi policy'ler; her signal yakalanabilir değildir.

**Örnek (kaynak dışı):** Bir kullanıcı terminalde Ctrl+C'ye bastığında process'e SIGINT gönderilebilir, ancak hangi thread'in işleyeceği mask ve disposition gibi kurallara bağlıdır.
