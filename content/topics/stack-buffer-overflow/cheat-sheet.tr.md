## Sınav özeti

- Kök neden: yerel tampon kapasitesinden uzun veriyi sınır kontrolü olmadan yazmak.
- Sonuç, çerçeve alanlarının bozulması, çökme veya koşullara bağlı kontrol akışı etkisi olabilir; çökme=kod çalıştırma kanıtı değildir.
- Yığın düzeni ABI/derleyici/optimizasyona bağlıdır; şemalar kavramsaldır.
- DEP/NX: veri sayfasında yürütmeyi kısıtlar. ASLR: adresleri değiştirir. PIE: ana çalıştırılabilir dosyayı yeniden konumlandırmaya izin verir. Canary: bazı stack overwrite’ları dönüş öncesi algılar.
- ROP mevcut kodu yeniden kullanabilir; tekil azaltımlar yeterli değildir.
- Güvenli kapasite denetimi, bellek güvenli dil, sanitizer, fuzzing ve kısıtlı sandbox birlikte uygulanır.
- `gdb` yerel tanılama aracıdır; kontrollü örneklerde kullanılır.

- Kaynakta güvenli örnek `snprintf(dst, sizeof dst, "%s", input)` biçimindedir; kırpılma ayrıca ele alınır. `strncpy` her durumda NUL sonlandırma garantisi vermez. `gets` sınır kabul etmez ve standarttan çıkarılmıştır.
