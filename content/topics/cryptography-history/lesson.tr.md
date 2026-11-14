## Sezar’dan Enigma’ya: Şifreleme tarihinin dersleri

## Şifreleme neden ortaya çıktı?

Uzakta bulunan bir komutana gönderilen emir, yolda düşmanın eline geçebilir. Mesajı yalnız hedeflenen alıcının okuyabileceği biçime dönüştürme ihtiyacı kriptografinin başlangıç sorusudur. Okunabilir içerik **açık metin**, dönüştürülmüş içerik **şifreli metin**, dönüşüm **şifreleme**, geri dönüş **şifre çözme**, işlemi yöneten gizli parametre ise **anahtar**dır. Kriptografi güvenli yöntem tasarlar; kriptanaliz anahtarı bilmeden bu yöntemleri çözmeye çalışır. Birlikte kriptolojiyi oluştururlar. Önceki haftadaki güvenlik zihniyetinin burada karşılığı, yalnızca “nasıl çalışıyor?” değil “hangi varsayım bozulursa kırılır?” diye sormaktır.

## İki yapı taşı: sembolü değiştirmek ve yerini değiştirmek

**Yerine koyma (substitution)** bir sembolü başka sembolle değiştirir; sembolün kimliği gizlenir. **Yer değiştirme (transposition)** sembolleri koruyup sıralarını karıştırır; konum gizlenir. Spartalıların **skitalası (scytale)**, yazının şerit silindire sarılıyken enine yazıldığı, şerit açılınca harflerin karıştığı bir yer değiştirme aracıdır. Doğru çaplı silindire tekrar sarma düzeni geri getirir; silindir fiziksel anahtar gibi davranır. Sezar şifresi ise yerine koymadır: alfabeyi sabit miktarda kaydırır.

Sezar’ın anahtar seçenekleri çok azdır: 26 kaydırma. Örneğin `PHUKDED` şifreli metnini üç harf geri kaydırınca `MERHABA` elde edilir. En fazla 25 anlamlı olmayan kaydırmayı denemek yeterlidir. Daha genel tek alfabeli yerine koymada her harfe farklı bir harf eşlemek teorik olarak 26! tablo verir; ancak bu sayı tek başına güvenlik sağlamaz. Dilin harf sıklıkları korunur. Şifreli metinde sık görülen harfler, dilde sık görülen harflere işaret eder. **Frekans analizi** bu örüntülerden anahtarı çıkarabilir. El-Kindî dokuzuncu yüzyılda yöntemi sistematik biçimde tanımlamıştır. Dolayısıyla büyük anahtar uzayı gerekli olabilir ama yeterli değildir; açık metnin istatistiksel yapısı da gizlenmelidir.

## Çok alfabeli şifre ve Vigenère

Alberti’nin 15. yüzyıldaki döner alfabeli şifre diski, şifreleme boyunca kullanılan alfabeyi değiştirme fikrini somutlaştırdı. Vigenère şifresi bu fikri tekrarlanan anahtar sözcükle uygular. Harfleri A=0,…,Z=25 sayarsak şifreleme `C=(P+K) mod 26` biçimindedir. `MERHABA` ve `KEYKEYK` için sonuç `WIPREZK` olur. Aynı açık harfin farklı konumlarda farklı harflere dönüşmesi basit frekans izini dağıtır.

Fakat anahtar sözcük kısa ve tekrar ediyorsa örüntü tekrar geri döner. Babbage ve Kasiski’nin 19. yüzyılda geliştirdiği yaklaşımda, şifreli metindeki yinelenen dizilerin aralıkları incelenir. Aralıkların ortak bölenleri anahtar uzunluğuna dair ipucu verir. Metin bu uzunluğa göre sütunlara ayrılınca her sütun ayrı Sezar şifresi gibi frekans analiziyle çözülebilir. Bir yöntemin uzun süre “kırılamaz” bilinmesi, güvenli olduğunun kanıtı değildir; saldırganın yeterli veri ve yönteme henüz sahip olmayabileceğini gösterir.

## Enigma: makine, insan ve tasarım kısıtları

İkinci Dünya Savaşı’nda kullanılan elektromekanik Enigma’da rotorlar her tuş basımında döner ve kullanılan eşleme değişirdi. Günlük ayarlar; rotor seçimi ve sırası, başlangıç konumları, bağlantı panosu kablolamaları gibi unsurlardan oluşuyordu. Böylece tekrar eden anahtar sözcüğün yerine sürekli değişen çok büyük ayar uzayı vardı. Yine de sistem yenilmez değildi. Standart mesaj başlangıçları ve sonları, hava raporlarının kalıpları, tekrar seçilen rotor konumları gibi **işletim alışkanlıkları** tahmin edilebilir parçalar sağladı. Ayrıca reflektör hiçbir harfi kendisine eşlemiyordu; bu tasarım kısıtı olası eşleşmeleri eliyordu. Güvenlik yalnız matematikten ibaret değildir: kullanım disiplini ve tasarımın yan etkileri de saldırı yüzeyidir.

## Bletchley Park, Bombe ve Colossus

Bletchley Park’taki ekip, Polonyalı kriptologların savaş öncesi çalışmalarını da temel alarak Enigma ayarlarını aradı. Alan Turing’in katkı verdiği **Bombe**, mesajda bulunması muhtemel sözcük parçası (**crib**) üzerinden çelişkili ayarları elektromekanik olarak eleyen bir makineydi; genel amaçlı bilgisayar değildi. Daha karmaşık Lorenz trafiğini çözmek için Tommy Flowers’ın öncülüğünde, binlerce vakum tüplü programlanabilir elektronik dijital **Colossus** yapıldı. Colossus istatistiksel taramayı hızlandırdı. Bu tarih, kriptanaliz gereksiniminin hesaplama teknolojisini nasıl ilerlettiğini gösterir.

## Kırılmalardan kalan tasarım dersleri

Sezar’ın küçük anahtar uzayı kaba kuvveti; tek alfabeli eşleme dil istatistiğini; Vigenère tekrarlanan anahtar örüntüyü; Enigma ise tahmin edilebilir kullanım ve tasarım kısıtlarını açığa çıkardı. Modern kriptografi bu nedenle yöntemlerin açıkça incelenmesine, güçlü matematiksel tasarıma ve saldırganın gerçekçi yeteneklerinin modellenmesine dayanır. Bu son ilkeler bir sonraki bölümde Kerckhoffs ilkesi ve saldırı modelleriyle biçimsel hâle gelir. Bu dersteki AES bağlantısı da aynı tarihsel fikri gösterir: modern blok şifreleri sembol yerine koyma ve konum karıştırma işlemlerini çok turlu biçimde birleştirir.

**Kaynak temelli içerik:** Tarihsel olaylar, şifre mekanizmaları, örnek ve kaynakta verilen çıkarımlar PDF’den aktarılmıştır. Açık metin/şifreli metin gösterimi, işlem formülü ve açıklayıcı bağlantılar öğretim amacıyla düzenlenmiştir.
