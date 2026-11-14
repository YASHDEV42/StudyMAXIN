## Yan kanal neyi ölçer?

Yan kanal saldırısı, kriptografik algoritmanın matematiğini çözmek yerine onun çalışırken açığa çıkardığı gözlenebilir etkileri kullanır. İşlem süresi, güç tüketimi, elektromanyetik yayılım ve işlemci önbelleği erişimleri bu etkilere örnektir. Algoritma doğru çıktı üretebilir, fakat gizli girdiye göre değişen uygulama izi sır hakkında bilgi taşıyabilir.

Erken çıkan parola karşılaştırması ilk yanlış karakterde durur. Ölçüm yeterince hassassa doğru tahmin edilen önek daha uzun çalışma süresi verir. Benzer biçimde kare al-çarp üs alma yöntemi gizli üs bitine göre ek çarpma yaparsa süre farkı bitleri sızdırabilir. Paul Kocher zamanlama saldırılarını 1996’da tanımladı.

## Sabit zaman ve hata kanalları

Sabit zamanlı kod, gizli veriye göre dallanmayı ve belleğe farklı erişimi önlemeye çalışır. Güvenli karşılaştırma ilk uyuşmazlıkta çıkmaz. Bu, her makinede fiziksel sürenin mutlak olarak eşit olacağı iddiası değildir; sırla ilişkili ölçülebilir farkı azaltma yöntemidir. Curve25519 gibi tasarımlar sabit zamanlı uygulamayı kolaylaştırır.

Bir sistem şifreli metnin dolgusunun doğru olup olmadığına farklı hata, yanıt veya gecikmeyle karşılık verirse padding oracle oluşur. Saldırgan bu yanıtları kullanarak şifreli metni adım adım çözebilir. Bleichenbacher’in 1998 RSA PKCS#1 v1.5 saldırısı ve TLS CBC’deki Lucky Thirteen (2013) bu sınıftadır. Güç analizi, elektromanyetik sızıntı ve cache erişim örüntüleri de ek kanallardır; akıllı kartlar ve donanım anahtarları bunlara karşı fiziksel önlem gerektirebilir.

Koruma algoritma seçimiyle bitmez: sabit zamanlı uygulama, hata yanıtlarının dikkatli tasarımı ve donanım/platform analizi gerekir.

**Öğretici ek:** Heartbleed bellek sınırı hatasıydı; yan kanal ise hesaplama sırasında açığa çıkan dolaylı izlerden bilgi çıkarır.

İlişkili konular: [Heartbleed](topic:heartbleed-memory-disclosure) · [RSA sistemi](topic:rsa-cryptosystem).
