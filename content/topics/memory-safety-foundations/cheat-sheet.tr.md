## Sınav özeti

- Bellek hataları: sınır dışı erişim, use-after-free, yanlış boyut hesabı/tamsayı taşması.
- C/C++’ta bellek ve işaretçi denetimi esnektir; tanımsız davranış belirli sonuç garantisi vermez.
- Java/Python/Go tipik olarak çalışma zamanı denetimi/GC; Rust sahiplik-ödünç alma kullanır. “Bellek güvenli” tüm uygulama güvenli demek değildir.
- Tipik adres alanı: kod, veri/BSS, heap (dinamik), stack (çağrı çerçevesi). Kesin düzen uygulamaya bağlıdır.
- NX/DEP veri sayfasında komut çalıştırmayı engeller; tek başına veri bozulmasını önlemez.
- Savunma katmanları: güvenli dil, sınır/taşma kontrolleri, statik/dinamik analiz, sanitizer, fuzzing, sandbox.
- Kaynaktaki yaklaşık %70 oranını ürün analizlerinin bağlamıyla aktar; evrensel oran diye ezberleme.
