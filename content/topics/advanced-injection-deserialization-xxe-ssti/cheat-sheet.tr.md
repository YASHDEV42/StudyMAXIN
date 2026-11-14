Üç açıkta ortak hata, güvenilmeyen girdinin veri olarak kalmayıp bir yorumlayıcı tarafından davranış/kod olarak ele alınmasıdır.

| Açık                             | Kök neden                                                                                  | Olası sonuç                                                    | Savunma                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Güvensiz serileştirmeden çıkarma | `pickle`/benzeri zengin biçimlerin nesne kurarken callback çalıştırması; gadget zincirleri | Yan etki, veri erişimi, koşullara göre RCE                     | Güvenilmeyen girdide kullanma; JSON gibi yalın biçim + şema doğrulaması |
| XXE                              | XML parser’ında DTD ve dış varlıkların etkin olması                                        | Yerel dosya ifşası, SSRF/OOB, “billion laughs” kaynak tüketimi | DTD/harici entity/ağ erişimini kapat; boyut ve süre sınırla             |
| SSTI                             | Kullanıcı metninin şablon kaynağına eklenmesi                                              | Sunucu tarafı ifade yürütme; olası RCE                         | Sabit şablon, kullanıcı girdisini değer olarak ver, bağlama göre kaçış  |

- Serileştirme veriyi bayta; serileştirmeden çıkarma baytı nesneye dönüştürür. Nesne kurulumu pasif olmayabilir.
- Şifreleme gizlilik sağlar; bütünlük için MAC/imza gerekir. MAC anahtarı istemcide bulunmamalı; karşılaştırma sabit zamanlı olmalı.
- XXE ve SSRF kesişebilir: XML parser dış URL’ye gidebilir. Dış varlık kapatmak temel önlemdir.
- SSTI sunucuda, XSS tarayıcıda yürür; bağlam ve düzeltme yeri farklıdır.
- Girişin oturum açmış kullanıcıdan gelmesi onu güvenilir yapmaz. Parser varsayılanlarını ayrıca denetle.
