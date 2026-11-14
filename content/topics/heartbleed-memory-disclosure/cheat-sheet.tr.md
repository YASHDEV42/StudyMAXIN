## Heartbleed özeti

- CVE-2014-0160: OpenSSL heartbeat işlevindeki sınır denetimi açığı.
- Mesaj: tür + 2 bayt `payload_length` + gerçek payload + en az 16 bayt padding.
- Hata: beyan edilen uzunluk, gerçek TLS kayıt uzunluğuna karşı sınanmadı; bellek dışına okuma oldu.
- Sonuç: başka oturumlara ait çerez, parola veya anahtar verisi sızabilirdi; yaklaşık 64 KiB/istek üst sınırı (16 bit uzunluk).
- Düzeltme: minimum yapı ve `payload + padding` kayda sığıyor mu denetle; uymayan mesajı reddet.
- RSA/AES/SHA/TLS matematiği kırılmadı. Hatalı uygulama sınır denetimiydi.
- Genel ilke: kullanıcı girdisindeki uzunluk değerini gerçek veri sınırına göre doğrula.
