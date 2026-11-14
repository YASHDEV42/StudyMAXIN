## Üçlü el sıkışma neden var?

TCP veri göndermeden önce iki tarafın erişilebilir olduğunu ve başlangıç sıra numaralarını bildiğini doğrular. İstemci SYN ile x sıra numarasını yollar. Sunucu SYN‑ACK ile kendi y numarasını ve x+1 onayını döner. İstemci ACK içinde y+1 gönderir. Böylece iki uç bağlantı durumunu kurar; sıra ve onay numaraları kaybolan baytların yeniden gönderilmesi ve akışın sıralanması için kullanılır.

## SYN flood: yarım açık durumun maliyeti

Sunucu SYN alınca son ACK gelmeden yarı açık bağlantı kaydı ayırabilir. Saldırgan çok sayıda SYN gönderip el sıkışmayı tamamlamadığında backlog dolar; meşru yeni bağlantılar kabul edilemez. Kitaptaki örnekte 512 yuva ve saniyede 1000 SYN, basitçe 512/1000 = 0,512 saniyede kuyruğu doldurabilir. Bu kaba kapasite hesabıdır; gerçek sistemlerde kuyruk, zaman aşımı ve uygulama davranışı değişir. Ama saldırının özü, sunucu durum ayırırken istemcinin ucuz bir istek gönderebilmesindeki asimetridir.

SYN cookies, ilk SYN için tam bağlantı durumu tutmak yerine sunucu gizli anahtarına bağlı, doğrulanabilir bilgiyi SYN‑ACK sıra numarasına kodlar. Son ACK geldiğinde sunucu cookie’yi yeniden hesaplar ve geçerliyse bağlantı kaydını oluşturur. Bu, sahte veya yanıt vermeyen kaynakların yarattığı bellek baskısını azaltır; bazı TCP seçenekleri sınırlı kodlandığından her koşulda tüm normal seçenekler korunmayabilir. Kaynak adres doğrulaması (BCP 38 yaklaşımı) sağlayıcıların sahte kaynaklı paketleri ağdan çıkarmasını hedefler.

## RST enjeksiyonu ve oturum ele geçirme

RST, bağlantıyı sıfırlamak için kullanılır. Yoldaki saldırgan bağlantı adreslerini ve kabul edilebilir sıra numarasını biliyor ya da tahmin edebiliyorsa sahte RST gönderebilir. Oturum ele geçirme ise akışa veri eklemeyi amaçlar; öngörülemez sıra numaraları uzaktaki kör tahmini zorlaştırır, ancak trafiği gören saldırgana karşı gizlilik sağlamaz. TLS içerik bütünlüğü ve gizliliği sunar; yine de bağlantının kesilmesini veya kaynak tüketimini tek başına önlemez. Önceki kriptografi konularıyla bağlantı burada nettir: doğru protokol durum makinesi ve uçtan uca kimlik doğrulama birlikte gerekir.
