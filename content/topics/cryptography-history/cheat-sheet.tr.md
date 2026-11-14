## Klasik Şifrelerden Enigma’ya — Sınav Özeti

- **Açık metin:** okunabilir ileti. **Şifreli metin:** dönüşmüş ileti. **Şifreleme / çözme:** ileri / ters dönüşüm. **Anahtar:** dönüşümü belirleyen gizli parametre.
- **Kriptografi** güvenli sistem tasarlar; **kriptanaliz** anahtarsız çözüm arar; birlikte **kriptoloji**.
- **Yerine koyma:** sembol kimliğini değiştirir (Sezar). **Yer değiştirme:** sembolü korur, sırasını karıştırır (skytale). Modern blok şifreleri bu fikirleri çok turda birleştirir.
- **Sezar:** 26 kaydırma; PHUKDED → 3 geri kaydırma → MERHABA. En fazla 25 alternatif deneme.
- **Tek alfabeli ikame:** 26! anahtar tablosu olsa da harf sıklıkları korunur. **Frekans analizi** dil istatistiğinden yararlanır; el-Kindî 9. yy’da sistemleştirmiştir.
- **Vigenère:** tekrarlanan anahtar, çok alfabeli kaydırma. A=0,…,Z=25 için `C=(P+K) mod 26`; MERHABA + KEYKEYK = WIPREZK.
- Vigenère kırılması: tekrar eden diziler arası uzaklıklardan anahtar uzunluğu tahmin edilir (Kasiski); metin uzunluk kadar sütuna ayrılır; her sütuna frekans analizi uygulanır. Tekrarlanan kısa anahtar örüntü sızdırır.
- **Enigma:** rotorlar her tuşta ilerler; günlük ayarlar rotor türü/sırası, başlangıç konumu, bağlantı panosu kablolarını içerir. Aynı harf her zaman aynı harfe dönüşmez.
- Enigma zayıflıkları: tahmin edilebilir mesaj kalıpları ve operatör alışkanlıkları; reflektör nedeniyle hiçbir harf kendisine dönüşmez.
- **Crib:** mesajda beklenen sözcük parçası. **Bombe:** crib ile Enigma ayarlarını eleyen elektromekanik makine; bilgisayar değildi.
- **Colossus:** Tommy Flowers öncülüğünde Lorenz analizi için geliştirilen programlanabilir elektronik dijital bilgisayar; istatistiksel taramayı hızlandırdı.
- Tarihsel çıkarımlar: küçük anahtar uzayı → kaba kuvvet; dil örüntüsü → analiz; tekrarlanan anahtar → periyodik sızıntı; öngörülebilir işletim/tasarım kısıtı → saldırı ipucu.
- “Uzun süre kırılmadı” güvenlik kanıtı değildir. Güvenlik; açıkça incelenebilir sağlam tasarım, anahtar koruması ve gerçekçi saldırgan modeline dayanır.

**Kaynak:** `teori-1-43-89.pdf`, fiziksel s. 14–20 (basılı s. 44–50), bölüm 2.1.
