## Ortak kök neden: verinin dile dönüşmesi

[SQL enjeksiyonu](topic:sql-injection) ve [XSS](topic:cross-site-scripting) ile gördüğümüz temel sorun, güvenilmeyen verinin komut veya kod olarak yorumlanmasıdır. Aynı hata nesne serileştirmede, XML ayrıştırmada ve sunucu tarafı şablon motorlarında da ortaya çıkar. Üçünü ayrı isimlerle öğrenmek yararlı olsa da, asıl savunma sorusu aynıdır: Hangi bileşen girdiyi hangi dilin sözdizimi olarak yorumluyor?

## Güvensiz serileştirme: nesne kurmak pasif değildir

Serileştirme, bellekteki bir nesneyi depolama veya aktarım için bayt dizisine dönüştürür; serileştirmeden çıkarma ise bu baytlardan nesne kurar. JSON gibi yalın veri biçimleri genellikle nesne grafiğini ve çalıştırılabilir davranışı yeniden üretmez. Buna karşılık `pickle` veya bazı dil içi nesne biçimleri, türleri ve nesne kurulurken otomatik çağrılan metotları yeniden oluşturabilir.

Güvenilmeyen bir çerezi bu tür mekanizmayla çözmek, saldırganın veriyi özel geri çağrıları tetikleyecek biçimde kurmasına yol açabilir. Python örneğinde `pickle` sırasında `__reduce__` davranışı; Java, PHP ve .NET örneklerinde nesne kurulum callback’leri veya gadget zincirleri açıklanır. Saldırganın kendi kodunu yüklemesi gerekmez: uygulamada zaten bulunan bileşenlerin çağrı sırasını beklenmedik biçimde tetikleyebilir. Sonuç, koşullara göre veri okuma, yetki kötüye kullanımı veya uzaktan kod çalıştırmaya kadar çıkabilir.

Temel kural, güvenilmeyen girdiyi zengin nesne serileştiricileriyle çözmemektir. Yalın veri biçimi kullanın; JSON’u da alan, tür, uzunluk ve beklenen değerler açısından şema ile doğrulayın. Verinin kurcalanmadığını doğrulamak gerekiyorsa, güvenilir anahtarla MAC veya imza kullanın. Şifreleme gizliliği sağlar; tek başına bütünlük sağlamaz. İmza/MAC kontrolü, tehlikeli serileştirme tasarımını güvenli hâle getirmek için mazeret değildir. Karşılaştırmada sabit zamanlı fonksiyon kullanın; anahtarı istemciye vermeyin.

## XXE: XML ayrıştırıcısının dış kaynak erişimi

XML’de varlıklar tekrar kullanılabilir; dış varlıklar bir dosyadan veya URL’den içerik çekebilir. XML parser’ı bu özellikleri güvenilmeyen belge için etkin bırakırsa, saldırgan ayrıştırıcıya dosya okutabilir ve uygulama yanıtı yansıtıyorsa içeriği sızdırabilir. Dış URL üzerinden veri çıkarma, yanıt görünmese bile gerçekleşebilir. Dış varlık bir iç ağa yönelirse XXE aynı zamanda [SSRF](topic:ssrf-cloud-metadata) davranışına dönüşebilir. İç içe büyüyen varlıklar da bellek/CPU tüketerek hizmet reddi yaratabilir.

Savunmada parser’ın DTD ve dış varlık çözümlemesini kapatın; ağ erişimini engelleyin ve güvenli varsayılanları doğrulanmış bir kütüphane kullanın. Girdi boyutu, ayrıştırma derinliği ve süre sınırları kaynak tüketimini sınırlar. JSON bazı senaryolarda daha basit bir taşıma biçimidir, ancak her biçimde şema doğrulaması gerekir. Eski kütüphanelerin varsayılanlarını güvenli kabul etmeyin.

## SSTI: kullanıcı metni şablon kaynağına karışıyor

Şablon motoru, sabit bir HTML kalıbındaki yer tutucuları veriyle doldurur. Güvenli düzende şablon uygulama tarafından kontrol edilir; kullanıcı adı gibi girdiler değer olarak aktarılır ve HTML bağlamına uygun kaçış uygulanır. Güvensiz düzende kullanıcı metni şablon kaynağına eklenir ve motor bu metni ifade olarak yorumlar. Basit bir matematik ifadesinin sonuç olarak görünmesi, girdinin veri değil şablon kodu olarak işlendiğini gösterebilir. Bazı motorlarda bu durum sunucu kaynaklarına veya kod çalıştırmaya kadar ilerleyebilir.

SSTI sunucu tarafında, şablon oluşturma sırasında çalışır; XSS ise genellikle tarayıcıda kullanıcı içeriği güvensiz biçimde gösterildiğinde çalışır. Bu nedenle savunma yeri de farklıdır. Sabit şablonu parametrelerle çağırın; otomatik HTML kaçışını koruyun ve bağlama uygun çıktı kodlaması kullanın. Kullanıcı tarafından yazılan şablon gerçekten gerekliyse, motorun erişebildiği nesneleri ve yetkileri en aza indirin, yalıtım uygulayın; sandbox’ı tek başına kusursuz güvenlik garantisi saymayın.

## Sınavda mekanizmayı karşılaştırın

| Açık                             | Güvenilmeyen girdi nerede yorumlanır?        | Temel etkiler                              | Öncelikli önlem                                                 |
| -------------------------------- | -------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------- |
| Güvensiz serileştirmeden çıkarma | Nesne kurucusu ve callback’ler               | Yan etki, gadget zinciri, olası RCE        | Yalın veri biçimi ve şema; zengin nesne çözümlemesinden kaçınma |
| XXE                              | XML parser’ının DTD/dış varlık çözümleyicisi | Dosya okuma, SSRF, kaynak tüketimi         | DTD, dış varlık ve ağ erişimini kapatma                         |
| SSTI                             | Şablon motorunun kaynak metni                | Sunucu bağlamında ifade yürütme, olası RCE | Sabit şablon; kullanıcı girdisini ayrı değer olarak geçme       |

Kimlik doğrulanmış kullanıcı girdisi de otomatik olarak güvenilir değildir. MAC, doğru anahtarla ve zamanında doğrulanırsa bütünlüğe yardım eder; gizlilik sağlamaz. Şifreleme ile bütünlük farklı özelliklerdir. Her koruma, kullanılan parser veya motorun gerçek davranışı ve yapılandırmasıyla eşleşmelidir.

**Ders notu:** Kaynaktaki saldırı kodları mekanizmayı açıklamak için verilmiştir. Bu ders, yetkisiz hedeflerde deneme yapmayı değil; kök nedeni, gerekli koşulları ve etkili azaltımı anlamayı amaçlar.
