## Socket
- İletişim uç noktası; IP address + port.
- Örnek: client **146.86.5.20:1625**, server **161.25.19.8:80**.
- Bir TCP connection iki uç + protokol bilgisiyle ayırt edilir.

## Protokoller
- **TCP:** Connection-oriented, reliable ordered byte stream.
- **UDP:** Connectionless datagram, teslim ve sıra garantisi yok.
- HTTP 80, FTP 21 slayttaki varsayılan port örnekleri.

## Java örneği
- Server `ServerSocket(6013)`, `accept()`, `PrintWriter`.
- Client `Socket("127.0.0.1",6013)`, `BufferedReader`.
- **127.0.0.1:** Loopback (kendi host'u).

**Sınav:** Socket ≠ yalnız port; TCP ≠ UDP; server tek portla birçok bağlantıyı yönetebilir.
