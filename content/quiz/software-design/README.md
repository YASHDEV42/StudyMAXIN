# Yazılım Tasarımı — slayt sorularından beş seçenekli çalışma bankası

## Durum
Bu klasör, dersin altı özgün PDF'inden uyarlanmış **105 Türkçe beş seçenekli** soru içerir:
- `structural-source-questions.json`: 34 soru, yapısal tasarım desenleri
- `creational-source-questions.json`: 45 soru, yaratımsal tasarım desenleri
- `foundations-source-questions.json`: 26 soru, mimari, Class Diagram, Use Case/Sequence ve SOLID

Her kayıtta sabit `id`, `courseId`, sorunun kaynak PDF dosya adı ve **fiziksel PDF sayfası** (`source.page`), seçenekler, sıfır tabanlı `correctIndex`, `origin` ve kısa açıklama bulunur. Sorular öğretim materyalindeki mevcut test/etkinlik/hızlı-kontrol sorularından uyarlanmıştır; yanlış seçenekler beşe tamamlamak için yeniden yazılmıştır. Aynı kavramın farklı etkinliklerde tekrar etmesi korunmuştur.

## Önemli sınırlamalar
**Bu klasör şu an quiz trainer'a bağlı DEĞİLDİR.** Mevcut `src/lib/quiz/bank.ts` şeması ve kurs rotaları bu dosyaları otomatik yüklemez. Dersin mevcut dokümantasyon sayfaları ve diğer quiz bankaları değiştirilmedi. Kullanıcı arayüzünde görünürlük veya deploy başarısı iddia edilmemelidir.

- Doğru seçenekler beş harfe dağıtılmıştır; yine de her distractor için öğretmen düzeyinde mantıksal denetim yapılmalıdır. Özellikle `foundations-source-questions.json` seçenekleri diğer soruların doğru cevaplarından türetilmiş ilk taslaktır, final sınav kalitesi değildir.
- `explanation` kısa cevap ve sayfa bilgisi içerir; pedagojik gerekçeli açıklamalar henüz tamamlanmadı.
- Belirli slaytlardaki bazı sorular bu ilk derlemede bulunmayabilir. Özellikle açık uçlu etkinlikler ve görsel/diagram tabanlı sorular tam kapsamlı bir tek-tek denetim gerektirir. **'Tüm slayt soruları çıkarıldı' iddiası yoktur.**
- PDF'ler telif ve izin durumu nedeniyle repoya yüklenmedi; kullanıcı tarafından özel olarak sağlandı.
- Kaynak SHA-256: Hafta1 `7a6856ad90692350862b9dfeafe6abe973f53f6ede7c09c9cd5eaced58ac4543`; Hafta2A `c086c77b315223b9bdd88caff24aad44c718d00239b77d4887376db4dcd9b758`; Hafta2B `cbc812029c6aea72b72a7a130292e493bee4c0e22fcb0f4f8b64a981b36efcbb`; SOLID `27e6743fa9af6ecafe7bbd3f3fc58e03e4d01577f92b9715c621c7a5227667f2`; Structural `38c0e433d2e8e422fc0811a94a23eaa27e9b31b5c6108f40a641241c7829f4f5`; Creational `39710e64c982b00c1f4e727e081a7e9eccd601bb798bc903fd1e3262518a9a0c`.

## Sonraki işler
1. Tüm 295 fiziksel PDF sayfasında test/etkinlik/hızlı-kontrol soru envanteri çıkarıp bu 105 kayıtla karşılaştır; eksik veya yinelenenleri belirle.
2. Her soru için kaynak sayfa, tek doğru yanıt, beş ayrı makul seçenek ve bağımsız Türkçe açıklamayı gözden geçir.
3. `software-design` kurs manifesti, geçerli kaynak/audit kayıtları ve mevcut quiz schema/loader/routes içinde ayrı kurs desteği ekle. Mevcut Operating Systems/Database Management kurslarını bozma.
4. Örnek sınav modunu kullanıcının söylediği **50 soru / 60 dakika** formatı ile ayrıca planla; yaklaşık 25 senaryo sorusunu ayrı etikete bağla. Bu sınav parametreleri henüz uygulanmadı.
5. Node 24 ile `npm ci`, `npm run check` ve e2e doğrulama yap. Bu çalışma sırasında CI/build/deployment çalıştırılmadı.

## Durdurma noktası
GitHub main branch üzerinde üç JSON dosyası ve bu doküman hazırlandı. UI entegrasyonu yapılmadı; yeni değişiklikleri canlı yayına çıkmış kabul etme.
