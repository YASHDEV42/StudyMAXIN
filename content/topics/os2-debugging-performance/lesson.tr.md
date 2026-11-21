## Debugging

**Debugging (hata ayıklama)**, program veya işletim sistemi hatalarının nedenlerini bulma ve giderme sürecidir. Hatalar kullanıcı programında, I/O yolunda veya kernel içinde oluşabilir. Slaytlar hata ayıklamanın **performance tuning (performans ayarı)** ile de ilişkili olduğunu vurgular.

## Hata analizi

Bir process çöktüğünde işletim sistemi hatayı **log dosyasına (günlük kaydı)** yazabilir. **Memory dump / core dump**, hata anındaki yürütme/bellek durumunun incelenmesine yardımcı olan kayıttır. **Debugger**, dump, çağrı yığını ve hata bilgisiyle bug'ın nedenini analiz eder. **Kernel crash**, ayrıcalıklı çekirdek kodundaki ciddi hata nedeniyle sistemin çökmesi anlamına gelebilir. Her hata için otomatik dump oluşması garanti değildir.

## Performance tuning

Sistem performansını artırmak için önce **monitoring (izleme)** yapılır. CPU, RAM, disk, ağ kullanımı ve işlem yükü gözlenir; **bottleneck (darboğaz)** saptanır. Slaytlar Windows Task Manager ile CPU ve diğer kaynakların incelenmesini örnekler. Kaynak tüketimi tek başına hata kanıtı değildir; kullanım örüntüsü ve bağlamı önemlidir.

**Debugging ve tuning farkı:** Debugging yanlış sonuç/çökme nedenini bulur; performance tuning doğru çalışan sistemdeki verimlilik ve tepki süresi sorunlarını çözer. Hatalı bir kod performansı da düşürebildiği için bazen birlikte yürütülür.

## Slayttaki ödev

Hafta 2 kaynağının son sayfasında **kernel debugging hakkında araştırma ödevi** istenir. Ayrıntılı bir debugger kurulum prosedürü verilmez; ödev konusu ile ders içeriğini karıştırmamak gerekir.

**Öğretici ek:** Sürekli artan bellek kullanımı izleme ile saptanır; dump/profiler ise sızıntının kaynak kod yerini bulmaya yardımcı olabilir.
