## Socket (soket)

**Socket**, network iletişiminin uç noktasıdır. Slaytlar uç noktayı **IP address (IP adresi) + port number (port numarası)** ile açıklar. Örnek: istemci **146.86.5.20:1625**, sunucu **161.25.19.8:80**. Gerçek bağlantı, protokol ve iki uç noktanın bilgileri birlikte ele alınarak ayırt edilir; her bağlantı için sunucuda eşsiz yeni port şart değildir. Sunucu aynı porttan birden çok bağlantı kabul edebilir.

## TCP vs UDP

- **TCP (Transmission Control Protocol):** Connection-oriented (bağlantı odaklı), sırayı ve güvenilir byte-stream aktarımını sağlar.
- **UDP (User Datagram Protocol):** Connectionless (bağlantısız), datagram temelli; teslim/sıra garantisi sağlamaz. “Unreliable” etiketi protokol garanti düzeyi içindir, uygulamanın mutlaka başarısız olacağı anlamına gelmez.

Slaytlar HTTP için port **80**, FTP control için **21** örneğini verir. Bunlar well-known default port'lardır; her servis daima bu portlarla sınırlı değildir.

## Java socket örneği

Kaynakta bir **date server** TCP **6013** portunu **ServerSocket** ile dinler; `accept()` bağlantıyı kabul eder ve `PrintWriter` tarih/saat bilgisini yazar. **Client** `new Socket("127.0.0.1",6013)` ile aynı makinedeki sunucuya bağlanır; `BufferedReader` ile yanıtı okur. **127.0.0.1 (loopback / geri döngü adresi)** local host'u temsil eder.

## Ayrım

**IP** host arayüzünü; **port** host üzerindeki servis/iletişim ucunu seçer. TCP bağlantısı kurmak ile uygulama protokolünün istek–yanıt mesajlarını yönetmek ayrı düzeylerdir.

**Kaynak dışı örnek:** Aynı web sunucusu 80 numaralı portu dinlerken farklı istemci portlarından gelen çok sayıda bağlantıyı işleyebilir.
