## Modern kriptografide güvenlik ne demektir?

Klasik şifrelerde yöntemi saklamak çoğu zaman güvenliğin parçasıydı. Auguste Kerckhoffs’un 19. yüzyılda ortaya koyduğu ilke bunun tersini söyler: sistem, düşman algoritmayı bilse bile güvenli kalmalı; gizli tutulması gereken şey anahtardır. Algoritma sızabilir veya tersine mühendislikle öğrenilebilir. Anahtar değiştirilebilir; bütün algoritmayı gizli tutmak ve her açığa çıktığında sistemi yenilemek sürdürülebilir değildir. AES gibi standartların açıkça yayımlanıp incelenebilmesi bu yaklaşımın sonucudur. Bu, ilk haftada ele alınan belirsizliğe dayalı güvenlikten ayrılır.

“Güvenli” sözü ancak saldırganın yetenekleri belirtilince anlam kazanır. Zayıftan güçlüye saldırı modelleri şunlardır: **yalnız şifreli metin** (saldırgan yalnız şifreleri görür), **bilinen açık metin** (bazı açık/şifreli çiftleri bilir), **seçilmiş açık metin** (istediği açık metni şifreletebilir) ve **seçilmiş şifreli metin** (seçtiği şifreleri çözdürebilir). Gerçek servisler çoğu zaman saldırgana veri şifreletme imkânı verir. Bu nedenle modern tasarım, güçlü ve gerçekçi saldırganı varsayar. Hedef, saldırganın şifreli çıktıyı rastgele bir çıktıdan ayırt edememesidir (**ayırt edilemezlik**). Enigma’da tahmin edilebilir mesaj kalıpları bilinen açık metin benzeri ipuçları sağlamıştı.

## Mükemmel gizlilik: one-time pad

Gilbert Vernam’ın 1917’de geliştirdiği, Claude Shannon’ın 1949’da mükemmel gizlilik kanıtı sunduğu **one-time pad**, açık mesaj kadar uzun, gerçekten rastgele bir anahtarı bit bit XOR’lar. XOR’da bitler aynıysa 0, farklıysa 1 çıkar; işlem kendi tersidir: `P ⊕ K = C` ve `C ⊕ K = P`. Kaynak örneği: `0x41 (01000001) ⊕ 0x1F (00011111) = 0x5E (01011110)`; aynı anahtarla tekrar XOR, `0x41` değerini verir.

Mükemmel gizlilik için anahtar (1) mesaj kadar uzun, (2) gerçek rastgele, (3) yalnız bir kez kullanılmalıdır. Bu koşullarda her açık metin şifreli metinle tutarlı olabilir; şifre saldırgana mesaj hakkında bilgi vermez ve sınırsız hesaplama gücü de işe yaramaz. Fakat uzun gizli anahtarı önceden güvenli biçimde paylaşmak zordur. Anahtar tahmin edilebilirse gizlilik gider; tekrar kullanılırsa iki şifreli metnin XOR’unda anahtar yok olur ve içerik ilişkileri açığa çıkar. Sovyet anahtar şeritlerinin yeniden kullanımı Venona çözümlemelerine yol açmıştır. OTP teorik ölçüt olarak önemlidir, yaygın pratik çözüm değildir.

## Hesaplamalı güvenlik ve anahtar boyu

Modern uygulamalar çoğunlukla **hesaplamalı güvenliği** hedefler: saldırı matematiksel olarak imkânsız olmayabilir, fakat mevcut ve öngörülebilir hesaplama kaynaklarıyla makul sürede yapılamamalıdır. Her anahtar biti olasılıkları iki katına çıkarır; kaba kuvvet maliyeti üstel büyür. Kaynağın kıyaslamasında 56 bit DES artık yetersiz, 128 bit AES klasik bilgisayarlara karşı pratikte kırılamaz, 192 bit daha geniş pay, 256 bit daha da geniş pay sağlar.

Büyük anahtar uzayı tek başına gerçek güvenlik değildir. 128 bit AES anahtarını zayıf bir paroladan türetmek saldırgana 2^128 seçenek değil, olası parolaları deneme fırsatı verir. Benzer biçimde yanlış çalışma modu örüntü sızdırabilir. Güvenlik; algoritma, anahtar üretimi ve kullanımı, mod ve tüm sistemin en zayıf halkasına bağlıdır. Kaynağın kuantum/Grover notu sonraki bölüme köprüdür; anahtar bit sayısına bakmak kadar anahtarın niteliği ve kullanım koşulları da önemlidir.

**Kaynak ve açıklama:** İlke, saldırı sınıfları, OTP koşulları, Venona örneği ve anahtar boyu karşılaştırması kaynak kapsamındadır. XOR gösterimi öğretim amacıyla matematiksel olarak düzenlenmiştir; güvenlik ifadeleri bölümün kavramsal çerçevesidir.
