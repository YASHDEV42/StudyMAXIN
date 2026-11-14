## Bellek kusurlarını kök nedene göre ayırın

Format string açığında program, dış girdiyi biçim dizgesi olarak yorumlar. `printf(user_input)` kullanımı denetimi kullanıcıya bırakır; sabit biçim (`printf("%s", user_input)`) girdiyi veri olarak işler. Tamsayı taşmasında uzunluk veya tahsis boyutu yanlış hesaplanır. Örneğin öğe sayısıyla öğe boyutunu çarpmadan önce üst sınır kontrol edilmeli; ayrılan kapasite ile döngüde kullanılan sayı aynı doğrulanmış değerden türetilmelidir. İşaretli ve işaretsiz taşmanın dil kuralları farklıdır.

Use-after-free, serbest bırakılmış nesneye eski işaretçiyle erişmektir. Alan yeniden tahsis edilip başka veri tutabilir; böylece eski başvuru beklenmeyen nesneyi okur veya değiştirir. Heap overflow dinamik ayrılan nesnenin sınırını aşarak komşu alanları etkileyebilir. Double-free ve heap metadata hataları da ilişkili, fakat ayrı mekanizmalardır. Hata sınıfını doğru adlandırmak, uygun düzeltmeyi seçmek için önemlidir.

Her kusurda saldırganın girdiye ne ölçüde hâkim olduğunu, alanın ne zaman oluştuğunu, hangi bellek/nesneye ulaştığını ve güvenlik sonucunu ayrı değerlendirin. Örneğin tarayıcıda olay sırası nesneyi serbest bırakıp hemen yeniden kullanıma sokabilir; ancak gerçek sömürü, ayırıcı düzeni ve çalışma zamanı gibi koşullara bağlıdır. Sahiplik modeli ve güvenli API’ler önleyebilir; sanitizer’lar testlerde saptayabilir; yalıtım etkiyi sınırlayabilir. Hiçbiri otomatik, tek başına çözüm değildir.

Bu sınıflandırma önceki yığın taşması konusunu genişletir: ikisi de bellek güvenliği ihlalidir, ancak hata yeri ve düzeltme stratejisi farklı olabilir.

Kusurları engelleyen ve istismarı zorlaştıran katmanlar [savunma bölümünde](topic:exploit-mitigations) karşılaştırılır.

### Yakın akraba kusurlar ve salt okunur sızıntı

Off-by-one, sınırın yalnızca bir eleman aşılmasıdır; tek bayt bile komşu uzunluk veya işaretçi verisini etkileyebilir. Double-free aynı tahsisi iki kez serbest bırakır ve ayırıcının muhasebesini bozabilir. Serbest bırakma sonrası işaretçiyi `NULL` yapmak tekrar aynı işaretçiden erişimi yakalamaya yardım eder, fakat başka kopya işaretçiler varsa tek başına yaşam döngüsü sorununu çözmez. Başlatılmamış bellek okuma, önceki tahsisten kalan veriyi sızdırabilir.

Heartbleed (CVE-2014-0160), TLS heartbeat uygulamasında bildirilen uzunluğun gerçekten gelen veriyle desteklenmesini denetlememe hatasıyla belleğin sınır dışı okunmasına yol açtı. Saldırgan kod yürütmeden de bellek içindeki oturum verisi veya anahtar materyalini açığa çıkarabilirdi; etki, sunucunun belleğinde o sırada hangi verinin bulunduğuna bağlıydı. Örnek, güvenlik hatalarının yalnızca yazma/denetim akışı olmadığını ve bir uzunluk alanının doğrulanmasının neden kritik olduğunu gösterir.
